# YouTube Player
Now we have a really fast First time to byte we can now focus on the long page load. Adding a YouTube component straight into the page can be easily done without hasitation. YouTube does not render block the page but the page load does take a big hit from all of the assets YouTube is bringing with it.

In the [previous example](http://performance-kit.surge.sh/10/after.html) we have all of these assets loading from YouTube:

- OUB6zKc-Tos - 22.5kb (11.5kb Gzip)
- www-embed-player-sprite-mode-2x.css 256kb (43.4kb Gzip)
- www-embed-player 92.4kb (34.3kb Gzip)
- base.js 1.2mb (405kb Gzip)
- Roboto font 13kb
- sddefault.jpg 36.8kb
- player-cougar-2x-id.png 98.6kb

That is pretty massive in filesize even though it is async it is adding around 635kb to our page weight.

## Lazy Loading Approach

The first alternative would be to lazyload the iFrame with [LazySizes](https://github.com/aFarkas/lazysizes). The benefit to this is that its very quick to implement. All we have to do is add the following HTML to the head of the document:


```html
  <script src="https://cdn.rawgit.com/aFarkas/lazysizes/gh-pages/lazysizes.min.js" async=""></script>
  <script>
    window.lazySizesConfig = window.lazySizesConfig || {};
  </script>
```

Then change our iFrame HTML from:

```html
<iframe class="iframe" src="https://www.youtube.com/embed/OUB6zKc-Tos" frameborder="0" allowfullscreen></iframe>
```

to:

```html
<iframe class="iframe lazyload" data-src="https://www.youtube.com/embed/OUB6zKc-Tos" frameborder="0" allowfullscreen></iframe>
<noscript>
	<iframe class="iframe" src="https://www.youtube.com/embed/OUB6zKc-Tos" frameborder="0" allowfullscreen></iframe>
</noscript>
```

The problem with this is that if the YouTube video is too near the fold on initial page load then the YouTube video will still load.

## Image Placeholder

My preffered option would be to use the thumbnail for the image and then have button that will load the YouTube iFrame into the solution. We do not need that much css at all to write this since we already have our `image & picture` css in place.

```html
<div class="youtube picture picture--xs-16x9 picture--md-4x3" data-youtube>
	<img data-src="https://i.ytimg.com/vi/OUB6zKc-Tos/sddefault.jpg" class="image lazyload" alt="Our Wedding"/>
	<noscript>
		<img src="https://i.ytimg.com/vi/OUB6zKc-Tos/sddefault.jpg" class="image" alt="Our Wedding"/>
	</noscript>
	<button class="youtube__button" data-youtube-button="https://www.youtube.com/embed/OUB6zKc-Tos">
		Play YouTube Video...
	</button>
</div>
```

Here is the css we would need:

```css
.youtube .image {
	height: 100%;
	object-fit: cover;
}

.youtube__button {
	background: url('/_assets/images/youtube-button-red.png') no-repeat;
	background-position: center;
	background-size: 75px 65px;
	border: 0;
	cursor: pointer;
	height: 100%;
	left: 0;
	position: absolute;
	text-indent: -9999px;
	top: 0;
	transition: 		transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
	-webkit-transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
	-moz-transition: 	transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
	-ms-transition: 	transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
	-webkit-appearance: none;
	width: 100%;
}

.youtube:hover .youtube__button,
.youtube__button:focus,
.youtube__button:active {
	background: url('/_assets/images/youtube-button-black.png') no-repeat;
	background-position: center;
	background-size: 75px 65px;
	transform: 			scale(0.8);
	-webkit-transform: 	scale(0.8);
	-moz-transform: 	scale(0.8);
	-ms-transform: 		scale(0.8);
}
```


**Optional:** For this example we get a blank image when the youtube button is hovered on. This is because the image is being requested as the hover takes place. The work around for this will be to set a `prefetch` in the head of the document.

```html
<link rel="prefetch" href="/_assets/images/youtube-button-black.png">
```

The JavaScript required for the YouTube player is very minimal. This is all you have to do:

```js
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
```

## No-js fallback

The fallback would be to just include the iframe within a noscript. We need to hide the YouTube component when there is no-js on the page.


```css
/*
	Hide youtube component on no-js
*/

.no-js .youtube {
	display: none;
}

```

iframe fallback:

```html
<noscript>
	<div class="picture picture--xs-16x9 picture--md-4x3">
		<iframe class="iframe" src="https://www.youtube.com/embed/OUB6zKc-Tos"></iframe>
	</div>
</noscript>
```

## How to measure the value
In our previous example our page load was:

![Youtube Before](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/10-youtube-player/screenshots/youtube-before.png)

now it is:

![Youtube After](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/10-youtube-player/screenshots/youtube-after.png)


[Chapter 11 - Cleanup](https://github.com/code-mattclaffey/performance-kit/tree/master/11-cleanup/readme.md)
