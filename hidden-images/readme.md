# Hidden Images
In some senarios, you may need to hide an image for a certain breakpoint so you may get something like this:

## Example Senario: Navigation with images

`On mobile I would like to see no images in the navigation but have images displaying on desktop...` - I know right :persevere:

This will still affect our page load even if we just set `display: none;` for the breakpoint.

So our html would look something like this:

```html

<!--
	Nav items
-->

<li>
	<a href="/">
		<img src="/_assets/images/image-home.jpg" alt="My Image" class="image image--hidden-mobile"/>
		Home
	</a>
</li>
<li>
	<a href="/about">
		<img src="/_assets/images/image-about.jpg" alt="My Image" class="image image--hidden-mobile"/>
		About
	</a>
</li>
```

## The Problem

- Creating wasteful page weight on mobile
- Adding a wasted http requests to the page

![Before network panel in developer tools](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/hidden-images/screenshots/before-html-network.png)

## The Solution
So lets say each image is around 85kb-90kb & imagine there are 10 nav items. THAT'S 850kb-900kb loading on mobile which is complete waste & its a render blocking resource.

We can use the picture element to our advantage here using a source element like so:

```html
<li>
	<a href="/">
		<picture>
			<source srcset="/_assets/images/image-home.jpg" media="(min-width: 30em)">
			<source srcset="/_assets/images/image-hidden.jpg" media="(max-width: 30em)">
			<img src="/_assets/images/image-home.jpg" alt="My Image"/>
		</picture>
		Home
	</a>
</li>
<li>
	<a href="/about">
		<picture>
			<source srcset="/_assets/images/image-about.jpg" media="(min-width: 30em)">
			<source srcset="/_assets/images/image-hidden.jpg" media="(max-width: 30em)">
			<img src="/_assets/images/image-about.jpg" alt="My Image"/>
		</picture>
		About
	</a>
</li>

```

Now you have yourself a hidden image which is around 300 btyes (1/3 of 1kb) & you have also reduced the image requests too since you're askings for one image-hidden.

![Before network panel in developer tools](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/hidden-images/screenshots/after-html-network.png)

[Example of it in use - before.html](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/hidden-images/before.html)

[Example of it in use - after.html](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/hidden-images/after.html)
