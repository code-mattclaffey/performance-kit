# Lazy Loading

Lazy loading is a great method to use for when you want to only load images in view i.e (the fold)[]. When you scroll through the page, images will load as they come into view.

Why is lazy loading so good?

- Reduces page requests
- Reduces the page weight
- Removes any images from render blocking the page

## Senario: Photograpghy website

A photograpghy website is a very image heavy site because the images will be large files & there will be a lot of them displaying on the page.

In this example I have 5 images on my page. The total file size is around `1.2mb` and it takes `13.90s` for the page to be fully loaded on a `regular 3G (100ms, 750kb/s, 250kb/s)`.

## Solution

HTML without lazy loading:

```html
<picture class="picture picture--xs-4-x-3 picture--md-16-x-9">
	<source srcset="/_assets/images/responsive/sunset--large.jpg" media="(min-width: 769px)">
	<source srcset="/_assets/images/responsive/sunset--med.jpg" media="(min-width: 480px) and (max-width: 769px)">
	<source srcset="/_assets/images/responsive/sunset--small.jpg" media="(max-width: 480px)">
	<img src="/_assets/images/responsive/sunset--large.jpg" class="img" alt="Sunset photograpghy" />
</picture>
```

I have used a tool call [LazySizes](https://github.com/aFarkas/lazysizes) in this example. It is really easy to setup all you have to do is add the script to the head of your document:

```html
  <script src="https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/lazysizes.min.js" async=""></script>
  <script>
    window.lazySizesConfig = window.lazySizesConfig || {};
  </script>
```

HTML with lazy loading:

```html
<picture class="picture picture--xs-4-x-3 picture--md-16-x-9">
	<!--[if IE 9]><video style="display: none;><![endif]-->
	<source data-srcset="/_assets/images/responsive/sunset--large.jpg" media="(min-width: 769px)">
	<source data-srcset="/_assets/images/responsive/sunset--med.jpg" media="(min-width: 480px) and (max-width: 769px)">
	<source data-srcset="/_assets/images/responsive/sunset--small.jpg" media="(max-width: 480px)">
	<!--[if IE 9]></video><![endif]-->
	<img data-src="/_assets/images/responsive/sunset--large.jpg" class="img lazyload" alt="Sunset photograpghy" />

	<noscript>
		<source srcset="/_assets/images/responsive/sunset--large.jpg" media="(min-width: 769px)">
		<source srcset="/_assets/images/responsive/sunset--med.jpg" media="(min-width: 480px) and (max-width: 769px)">
		<source srcset="/_assets/images/responsive/sunset--small.jpg" media="(max-width: 480px)">
		<img src="/_assets/images/responsive/sunset--large.jpg" class="img" alt="Sunset photograpghy" />
	</noscript>
</picture>
```

Now we have our HTML setup, we now need to add in the css to get that fade in effect.

```css
.lazyload,
.lazyloading {
	opacity: 0;
}
.lazyloaded {
	opacity: 1;
	transition: opacity 300ms;
}
```

**Note:** The lazy loading may not work correctly if you do not set the correct sizes for your placeholders. Images that have no height will be loaded on the page at the wrong time because they may sit further up the fold.

## Results
> Regular 3G (100ms, 750kb/s, 250kb/s)

|Desktop Results     |      |       |
|--------------------|:----:|:-----:|
|Before              | 389ms| 13.90s|
|After               | 550ms|  6.28s|


|Mobile Results      |      |       |
|--------------------|:----:|:-----:|
|Before              | 412ms|  8.42s|
|After               | 494ms|  4.01s|

[Example of it in use - before.html](https://cdm.rawgit/code-mattclaffey/performance-kit/master/demos/04/before.html)

[Example of it in use - after.html](https://cdm.rawgit/code-mattclaffey/performance-kit/master/demos/04/after.html)

[Chapter 6 - Image Compression](https://github.com/code-mattclaffey/performance-kit/tree/master/06-Image-compression/readme.md)
