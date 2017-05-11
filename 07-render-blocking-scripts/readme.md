# Render Blocking Scripts
jQuery jQuery jQuery.... such a love hate relationship I have with jQuery. Love side, I really like the simplicity of it. Hate side, It is quite a large file & it has to load in the head of the page if you have third party scripts that rely on it.

This improvement would depend on if you had any third party scripts that relied on jQuery being loaded before it has or not.

## Async jQuery

So to remove jQuery from render blocking the page we need to add `async` to our script tag.

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

**Note:** - We need to add our LoadFonts function into main.js because that requires jQuery.

This really makes a big impact on our website. Here is an example of what our filmstrip was like before we had render blocking scripts.

Before:
![Before](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/07-render-blocking-scripts/screenshots/render-blocking-scripts-before.png)


After:
![After](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/07-render-blocking-scripts/screenshots/render-blocking-scripts-after.png)


[Chapter 8 - YouTube Player](https://github.com/code-mattclaffey/performance-kit/tree/master/08-youtube-player/readme.md)
