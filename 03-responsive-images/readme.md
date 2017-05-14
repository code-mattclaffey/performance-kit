# Responsive Images
Responsive images can be very useful for when we want to have a different image aspect ratio on different breakpoints. The reason why responsive images should be in the performance kit is because it can significantly reduce the page weight down on mobile.

If I had an image that was 1600px x 900px on desktop and it was around 250kb - 300kb I would'nt really want that to load on mobile especially when my mobile breakpoint is 480px. We could probably get the size down by 66% on mobile because the image we would use would be 3x smaller.

I have 3 standard breakpoints.

- 1024
- 768
- 480

This will make my picture elements look like:

```html
	<picture>
		<source srcset="/path/to/image--large.jpg" media="(min-width: 1025px)">
		<source srcset="/path/to/image--medium.jpg" media="(min-width: 768px) and (max-width: 1024px)">
		<source srcset="/path/to/image--small.jpg" media="(min-width: 481px) and (max-width: 767px)">
		<source srcset="/path/to/image--xs.jpg" media="(max-width: 480px)">
		<img src="/path/to/image--large" alt="Hello World"/>
	</picture>
```

![No Placeholder](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/03-responsive-images/screenshots/no-placeholder.png)

Next we need to add a placeholder background to represent the size of the image when the image has not loaded yet. Adding a placeholder will prevent the browser from triggering a layout change when the image has loaded. When we are looking at our website on a slow connection we will see something that represents an image rather than a white screen.

After:

![With Placeholder](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/03-responsive-images/screenshots/with-placeholder.png)

Here is an example to how the css works for image placeholders:

```css
:root {
	--16-x-9: calc(9  / 16 * 100%);
}

.picture {
	background-color: #eee;
	display: block;
	margin-bottom: 20px;
	position: relative;
	overflow: hidden;
	width: 100%;
}

.img {
	display: block;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
}

/*
	16 x 9 image
*/

.picture--16-x-9 {
	padding-top: var(--16-x-9);
}

```

This will now add the padding top which will represent the size of the image. The image will load without the browser having to re-calculate the page layout.

**Tip:** You can set different aspect ratios for different breakpoints if your image changes aspect ratio on different breakpoints.

```css
.picture--xs-16-x-9 {
	padding-top: var(--16-x-9);
}

@media screen and (min-width: 480px) and (max-width: 767px) {
	.picture--sm-16-x-9 {
		padding-top: var(--16-x-9);
	}
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
	.picture--md-16-x-9 {
		padding-top: var(--16-x-9);
	}
}
```

[Our example](http://performance-kit.surge.sh/03/after.html) does not show a massive improvement because the images are roughly the same sizes on each breakpoint. However we won't have to worry about that too much - [Chapter 4 - Lazy Loading](https://github.com/code-mattclaffey/performance-kit/tree/master/04-lazy-loading/readme.md)
