# Lazy Loading

Lazy loading is a great method to use for when you want to only load images in view i.e [the fold](https://www.optimizely.com/optimization-glossary/above-the-fold/). When you scroll through the page, images will load as they come into view.

Why is lazy loading so good?

- Reduces page requests
- Reduces the page weight
- Removes any images from render blocking the page

In our example we have 10 images on the page. The total file size is around `424kb` and it takes `10.26s` for the page to be fully loaded on a `Regular 3G (100ms, 750kb/s, 250kb/s)`.


I have used a tool called [LazySizes](https://github.com/aFarkas/lazysizes) in this example. It is really easy to setup all you have to do is add the script to the head of your document:

```html
  <script src="https://cdn.rawgit.com/aFarkas/lazysizes/gh-pages/lazysizes.min.js" async=""></script>
  <script>
    window.lazySizesConfig = window.lazySizesConfig || {};
  </script>
```

HTML without lazy loading:

```html
<picture class="picture picture--xs-4x3">
  <source srcset="/_assets/images/responsive/blow-dryer--large.jpg" media="(min-width: 1024px)">
  <source srcset="/_assets/images/responsive/blow-dryer--medium.jpg" media="(min-width: 768px) and (max-width: 1023px)">
  <source srcset="/_assets/images/responsive/blow-dryer--small.jpg" media="(min-width: 481px) and (max-width: 767px)">
  <source srcset="/_assets/images/responsive/blow-dryer--xs.jpg" media="(max-width: 480px)">
  <img src="/_assets/images/responsive/blow-dryer--large.jpg" class="image" alt="title" />
</picture>
```

HTML with lazy loading:

```html
<picture class="picture picture--xs-4x3">
	<!--[if IE 9]><video style="display: none;><![endif]-->
	<source data-srcset="/_assets/images/responsive/blow-dryer--large.jpg" media="(min-width: 1024px)">
	<source data-srcset="/_assets/images/responsive/blow-dryer--medium.jpg" media="(min-width: 768px) and (max-width: 1023px)">
	<source data-srcset="/_assets/images/responsive/blow-dryer--small.jpg" media="(min-width: 481px) and (max-width: 767px)">
	<source data-srcset="/_assets/images/responsive/blow-dryer--xs.jpg" media="(max-width: 480px)">
	<!--[if IE 9]></video><![endif]-->
	<img data-src="/_assets/images/responsive/blow-dryer--large.jpg" class="image lazyload" alt="title" />
	<noscript>
		<source srcset="/_assets/images/responsive/blow-dryer--large.jpg" media="(min-width: 1024px)">
		<source srcset="/_assets/images/responsive/blow-dryer--medium.jpg" media="(min-width: 768px) and (max-width: 1023px)">
		<source srcset="/_assets/images/responsive/blow-dryer--small.jpg" media="(min-width: 481px) and (max-width: 767px)">
		<source srcset="/_assets/images/responsive/blow-dryer--xs.jpg" media="(max-width: 480px)">
		<img src="/_assets/images/responsive/blow-dryer--large.jpg" class="image" alt="title" />
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

> Cable

|Desktop Results     |      |       |
|--------------------|:----:|:-----:|
|Before              | 816ms| 2.25s|
|After               | 767ms|  1.34s|

> Regular 3G (100ms, 750kb/s, 250kb/s)

|Mobile Results      |      |       |
|--------------------|:----:|:-----:|
|Before              | 1.15s|  10.26s|
|After               | 1.08s|  9.19s|

[before lazy loading](http://performance-kit.surge.sh/03/after.html)

[after lazy loading](http://performance-kit.surge.sh/04/after.html)

[Chapter 5 - Image Compression](https://github.com/code-mattclaffey/performance-kit/tree/master/05-Image-compression/readme.md)
