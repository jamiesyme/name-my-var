(function() {
	function toggleSidebar() {
		$sidebar = $('.sidebar');
		if ($sidebar.hasClass('sidebar-open')) {
			$sidebar.removeClass('sidebar-open');
		} else {
			$sidebar.addClass('sidebar-open');
		}
	}

	$('.nav-menu-button').click(function(e) {
		e.preventDefault();
		toggleSidebar();
	});
})();
