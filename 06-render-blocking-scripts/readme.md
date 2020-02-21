# Render Blocking Scripts
jQuery jQuery jQuery.... such a love hate relationship. Love side, I really like the simplicity of it. Hate side, It is quite a large file & it has to load in the head of the page if third party scripts that rely on it.

If you haven't got any third party scripts that rely on jQuery then you can do this.

## Async jQuery

To remove jQuery from being a render blocking resource, the script will need an `async` attribute adding to the element.

```html
<script src="https://code.jquery.com/jquery-1.12.3.min.js" async></script>
```

Next we need to add a script to the bottom of the page that will add our main.js when the page has loaded.

```html

<script>
(function() {
	window.addEventListener('load', function() {
		var script = document.createElement('script');
		script.src = '/_assets/scripts/main.js';

		document.body.appendChild(script);
	});
}());
</script>

```

**Note:** - This could have an impact on out `LoadFonts` function because it requires jQuery to run on the page. What we will do is convert our code to just plain JS.

```js
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

	LoadFont('/_assets/fonts/Roboto-Bold-webfont.ttf', 'roboto-bold-loaded');
	LoadFont('/_assets/fonts/Roboto-Light-webfont.ttf', 'roboto-light-loaded');
}());
```

This really makes a big impact on our website. Here is an example of what our filmstrip was like before we had render blocking scripts.

Before:

![Before](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/06-render-blocking-scripts/screenshots/lazy-load-filmstrip.png)


After:

![After](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/06-render-blocking-scripts/screenshots/render-blocking-scripts.png)


[Chapter 7 - Preload](https://github.com/code-mattclaffey/performance-kit/tree/master/07-preload/readme.md)
