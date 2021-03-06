# Hidden Images
When the image is set to `display: none;` at a certain breakpoint, we tend to forget is that the image is still loading in our browser making it very slow for the breakpoint not using the image. There are many factors to why this can happen such as time contraints, just doing a quick fix/change and lack of understanding of what will happen if its done that way.

Even though these images are hidden visually, they are still being requested & downloaded by the browser. I call this wasteful page weight.

## Senario: Navigation Images

In some senarios, we may need to hide an image for a certain breakpoint. Sometimes we might get something like this:

`On desktop I would like to see images in the navigation but have images hidden on mobile...` - I know right :persevere:

In [our previous example](http://performance-kit.surge.sh/01/after.html) the HTML would look something like this:

```html

<!--
	Nav items
-->

<li>
	<a href="#" class="site-header__nav-link">
		<img class="site-header__nav-image" src="/_assets/images/home.jpg" alt="Home" />
		Home
	</a>
</li>
```

## The Problem

- Creating wasteful page weight on mobile
- Adding a wasted http requests to the page

![Before.html network panel in developer tools](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/02-hidden-images/screenshots/before-html-network.png)

## The Solution
Each image is around 56kb-100kb. THAT'S 211kb loading on mobile which is a complete waste & its a render blocking resource. :worried:

We can use the picture element to our advantage here using a source element like so:

```html
<li>
	<a href="#" class="site-header__nav-link">
		<picture class="site-header__nav-image">
			<source srcset="/_assets/images/home.jpg" media="(min-width: 48em)">
			<source srcset="/_assets/images/image-hidden.jpg" media="(max-width: 48em)">
			<img class="image" src="/_assets/images/home.jpg" alt="Home"/>
		</picture>
		Home
	</a>
</li>
```

**Note:** We need to add the `picturefill` library for browsers that dont support the `picture` element. We can add this in the head of the document with the `async` attribute to prevent render blocking.

```html
  <script src="https://cdn.rawgit.com/scottjehl/picturefill/master/dist/picturefill.min.js" async></script>
```

We have now cut down the image page weight of 214kb on mobile.

![After.html network panel in developer tools](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/02-hidden-images/screenshots/after-html-network.png)

[Chapter 3 - Responsive Images](https://github.com/code-mattclaffey/performance-kit/tree/master/03-responsive-images/readme.md)
