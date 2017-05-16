# "Woff Woff"
Using Woff & Woff2 instead of tff makes a massive improvement to our page weight.

## Browser Support on Woff
![Browser Support Woff](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/10-woff2/screenshots/woff.png)
[Woff Browser Support](http://caniuse.com/#search=woff)


## Browser Support on Woff2
![Browser Support Woff2](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/10-woff2/screenshots/woff2.png)

[Woff2 Browser Support](http://caniuse.com/#search=woff2)


## Implementation
We are using some code that the [filamentgroup](https://github.com/filamentgroup/woff2-feature-test/blob/master/woff2.js) made to check if woff2 is supported in the browser.

```js

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
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.querySelectorAll('html')[0].classList.add(className);
			}
		};
		xhr.send();
	}

	if(supportsWoff2) {
		LoadFont('/_assets/fonts/Roboto-Bold-webfont.woff2', 'roboto-bold-loaded');
		LoadFont('/_assets/fonts/Roboto-Light-webfont.woff2', 'roboto-light-loaded');
	} else {
		LoadFont('/_assets/fonts/Roboto-Bold-webfont.woff', 'roboto-bold-loaded');
		LoadFont('/_assets/fonts/Roboto-Light-webfont.woff', 'roboto-light-loaded');
	}

}());

```

We already have the files in our solution we just need to set the `@font-face` to use woff & woff2.

```css
@font-face {
    font-family: 'lemon_birdregular';
    src: url('/_assets/fonts/lemonbird-regular-webfont.woff2') format('woff2'),
        url('/_assets/fonts/lemonbird-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
```

So now we have gone from 48kb of fonts to 36kb using woff2.


[Chapter 11 - Critical CSS](https://github.com/code-mattclaffey/performance-kit/tree/master/11-critical-css/readme.md)
