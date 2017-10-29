(function() {
	var $searchInput = $('.search-input');
	var $bannerContainer = $('.banner-container');

	// When the user starts typing, enable search mode
	$searchInput.on('keyup', function() {
		$bannerContainer.addClass('search-mode');
	});

	// When the user stops typing, and there is no search term, disable search
	// mode
	$searchInput.on('focusout', function() {
		if (!$searchInput.val().length) {
			$bannerContainer.removeClass('search-mode');
		}
	});
})();
