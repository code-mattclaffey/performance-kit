window.lazySizesConfig = window.lazySizesConfig || {};

var supportsWoff2 = (function( win ){
	if( !( "FontFace" in win ) ) {
		return false;
	}

	var f = new FontFace('t', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAADcAAoAAAAAAggAAACWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABk4ALAoUNAE2AiQDCAsGAAQgBSAHIBtvAcieB3aD8wURQ+TZazbRE9HvF5vde4KCYGhiCgq/NKPF0i6UIsZynbP+Xi9Ng+XLbNlmNz/xIBBqq61FIQRJhC/+QA/08PJQJ3sK5TZFMlWzC/iK5GUN40psgqvxwBjBOg6JUSJ7ewyKE2AAaXZrfUB4v+hze37ugJ9d+DeYqiDwVgCawviwVFGnuttkLqIMGivmDg" ) format( "woff2" )', {});
	f.load()['catch'](function() {});

	return f.status == 'loading' || f.status == 'loaded';
})( this );
(function() {
		'use strict';

	function LoadFont(url, className) {
		$.get(url).done(function() {
			$('html').addClass(className);
		});
	}

	if(supportsWoff2) {
		LoadFont('/_assets/fonts/Roboto-Bold-webfont.woff2', 'roboto-bold-loaded');
		LoadFont('/_assets/fonts/Roboto-Light-webfont.woff2', 'roboto-light-loaded');
	} else {
		LoadFont('/_assets/fonts/Roboto-Bold-webfont.woff', 'roboto-bold-loaded');
		LoadFont('/_assets/fonts/Roboto-Light-webfont.woff', 'roboto-light-loaded');
	}

}());
