$.domReady(function() {
	UI.init();
});

var UI = {

	init: function() {

		$(".js-toggle-menu").bind("click", function(e) {
			$(".js-header__nav").toggleClass("content--show");
			e.stop();
		});

	}

};