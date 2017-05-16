
(function($) {
	"use strict";

	$(document.body).removeClass('no-js');
	$(document.body).addClass('js');
}(jQuery));

(function() {
	"use strict";

	var NAV_TOGGLE = 'data-nav-toggle';
	var NAV_STATE = 'data-nav-state';

	var $el_nav_btn = $('[' + NAV_TOGGLE + ']');

	function toggleNavState(event) {
		event.preventDefault();

		var $el_body = $('body');
		var navState = $el_body.attr(NAV_STATE);

		navState === 'open' ? $el_body.attr(NAV_STATE, '') : $el_body.attr(NAV_STATE, 'open');
	}

	$el_nav_btn.on('click', toggleNavState);

}());

(function() {
	'use strict';

	var $el_youtube = $('[data-youtube]');


	var YouTubeComponent = function($component, i) {
		var buttons = $component.find('[data-youtube-button]');

		function createIframe(event) {
			var url = $(event.target).attr('data-youtube-button');

			var htmlString = '<div class="picture picture--xs-16x9 picture--md-4x3"> <iframe class="iframe" src="' + url + '?autoplay=1"></iframe></div>';

			$component.hide();
			$component.before(htmlString);
			$component.remove();
		}

		buttons.on('click', createIframe);
	}

	$el_youtube.each(function(i, el) {
		YouTubeComponent($(el), i);
	});

}());
