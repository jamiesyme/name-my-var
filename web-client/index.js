(function() {
	var $varTab         = $('#variables-tab');
	var $varTabButton   = $('#variables-tab-button');
	var $funcTab        = $('#functions-tab');
	var $funcTabButton  = $('#functions-tab-button');
	var $classTab       = $('#classes-tab');
	var $classTabButton = $('#classes-tab-button');

	function clearTabSettings() {
		$varTab.hide();
		$funcTab.hide();
		$classTab.hide();
		$varTabButton.removeClass('active');
		$funcTabButton.removeClass('active');
		$classTabButton.removeClass('active');
	}

	// The variables, functions, and classes tabs are all identical, but need to
	// hold independent data that we can switch between them using the tab UI.
	$varTab.children().clone().appendTo($funcTab);
	$varTab.children().clone().appendTo($classTab);

	// Tab switching functionality
	$varTabButton.click(function(e) {
		e.preventDefault();
		clearTabSettings();
		$varTab.show();
		$varTabButton.addClass('active');
	});
	$funcTabButton.click(function(e) {
		e.preventDefault();
		clearTabSettings();
		$funcTab.show();
		$funcTabButton.addClass('active');
	});
	$classTabButton.click(function(e) {
		e.preventDefault();
		clearTabSettings();
		$classTab.show();
		$classTabButton.addClass('active');
	});
})();

var updateSearch;
(function() {
	var $searchResults       = $('#search-results');
	var $searchError         = $('#search-error');
	var $normalizedQuery     = $('#normalized-query');
	var $varTab              = $('#variables-tab');
	var $funcTab             = $('#functions-tab');
	var $classTab            = $('#classes-tab');
	var $alternatives        = $('#alternatives');
	var $relatedTerms        = $('#related-terms');
	var $commonUses          = $('#common-uses');
	var $specificityCategory = $('#specificity-category');
	var $specificityValue    = $('#specificity-value');
	var $specificityBrief    = $('#specificity-brief');
	var $examples            = $('#examples');
	var currentSearchTerm    = null;
	var currentSearchResults = null;

	function getSpecificityCategory(value) {
		if (value < -0.4) {
			return 'generic';
		}
		if (value > 0.4) {
			return 'specific';
		}
		return 'neutral';
	}

	function getSpecificityBrief(category) {
		var briefs = {
			'generic': 'lifetime/scope should be kept as small as possible',
			'neutral': 'could be better, but if you\'re stuck, this name should suffice',
			'specific': 'leaves little room for ambiguity; good choice'
		};
		return briefs[category];
	}

	function loadSearchResults(results) {
		currentSearchResults = results;

		// Set the noramlized query text, so the user know what results they're
		// looking at (not always immediately clear, due to the normalization
		// process).
		$normalizedQuery.text(results.searchTerm);

		// Clear all previous results
		[$varTab, $funcTab, $classTab].forEach(function($tab) {
			$tab.find('.alternatives').empty();
			$tab.find('.related-terms').empty();
			$tab.find('.common-uses').empty();
			$tab.find('.specificity-value').html('');
			$tab.find('.specificity-category').html('');
			$tab.find('.specificity-brief').html('');
			$tab.find('.examples').empty();
		});

		// Load the results
		results.resultTerms.forEach(function(termData) {
			var $tab = null;
			if (termData.type === 'variable') {
				$tab = $varTab;
			} else if (termData.type === 'function') {
				$tab = $funcTab;
			} else if (termData.type === 'class') {
				$tab = $classTab;
			} else {
				console.log('unknown term type:', termData);
				return;
			}

			termData.alternatives.forEach(function(altTerm) {
				$tab.find('.alternatives').append(
					$('<li/>').append(
						$('<button/>', {
							'class': 'term',
							text: altTerm
						})
					)
				);
			});

			termData.relatedTerms.forEach(function(relTerm) {
				$tab.find('.related-terms').append(
					$('<li/>').append(
						$('<button/>', {
							'class': 'term',
							text: relTerm
						})
					)
				);
			});

			termData.commonUses.forEach(function(use) {
				$tab.find('.common-uses').append(
					$('<li/>', { text: use })
				);
			});

			var sValue = termData.specificity;
			var sCategory = getSpecificityCategory(sValue);
			var sBrief = getSpecificityBrief(sCategory);
			$tab.find('.specificity-value').html(sValue);
			$tab.find('.specificity-category').html(sCategory);
			$tab.find('.specificity-brief').html(sBrief);

			termData.examples.forEach(function(ex) {
				$tab.find('.examples').append(
					$('<li/>')
						.append(
							$('<a/>', {
								href: ex.projectUrl,
								text: ex.projectName
							})
						)
						.append(
							$('<span/>', { html: ' &ndash; ' })
						)
						.append(
							$('<a/>', {
								href: ex.exampleUrl,
								text: ex.exampleName
							})
						)
				);
			});
		});
	}
	
	updateSearch = function(term) {
		if (currentSearchTerm === term) {
			return;
		}
		currentSearchTerm = term;

		$searchError.hide();
		$.getJSON('//dev-nmv:8001/search', {q: term})
			.done(function(results) {
				// If there was a long delay in our request for some reason, and
				// another search started before we finished, we don't want these
				// results; let the other search go through.
				if (currentSearchTerm !== term) {
					return;
				}
				loadSearchResults(results);
				$searchResults.removeClass('hidden');
			})
			.fail(function(jqXHR, textStatus, error) {
				if (currentSearchTerm !== term) {
					return;
				}

				console.log('search failed:', jqXHR, textStatus, error);
				$searchError.html('uh-oh, there was a problem with the search');
				$searchError.show();

				// Reset the search term, so if the user tries the same search
				// again in a couple minutes, the search will go through.
				currentSearchTerm = null;
			});

	}
})();

(function() {
	var $searchError         = $('#search-error');
	var $searchResults       = $('#search-results');
	var $searchInput         = $('#search-input');
	var $main                = $('main');
	var instantSearchDelay   = 500; // ms
	var instantSearchTimeout = null;

	// When the user starts typing, enable search mode
	$searchInput.on('input', function() {
		var term = $searchInput.val();

		// Every time the user types, we fade the previous results. This is to
		// cleanly transition between searches (which is especially important
		// with instant search).
		$searchResults.addClass('hidden');
		$searchError.hide();

		// If the term is empty, we have nothing to search
		if (term.length) {

			// If this is the users first search since page load, we need to hide
			// the banner header
			$main.addClass('search-mode');

			// We want to implement instant search so users can get their results
			// asap. However, we don't want to make an API request for each and
			// every keypress, so instead we use a timeout. If the user stops
			// typing for X milliseconds, we're allowed to make a request.
			clearTimeout(instantSearchTimeout);
			instantSearchTimeout = setTimeout(function() {
				updateSearch(term);
			}, instantSearchDelay);
		}
	});

	// When the search box loses focus, the search results should be updated. If
	// there is no search term (the user has cleared the input), disable search
	// mode.
	$searchInput.on('focusout', function() {
		if (!$searchInput.val().length) {
			$main.removeClass('search-mode');
			$searchError.hide();
		} else {
			updateSearch($searchInput.val());
		}
	});

	// Allow the user to press enter to complete the search
	$searchInput.on('keydown', function(e) {
		if (e.which === 13) {
			this.blur();
		}
	});
})();
