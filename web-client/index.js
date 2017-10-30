(function() {
	var $searchInput = $('.search-input');
	var $main = $('main');

	// When the user starts typing, enable search mode
	$searchInput.on('keyup', function() {
		if ($searchInput.val().length) {
			$main.addClass('search-mode');
		}
	});

	// When the user stops typing, and there is no search term, disable search
	// mode
	$searchInput.on('focusout', function() {
		if (!$searchInput.val().length) {
			$main.removeClass('search-mode');
		}
	});

	// Allow the user to press enter to unfocus the search input
	$searchInput.on('keydown', function(e) {
		if (e.which === 13) {
			this.blur();
		}
	});
})();
