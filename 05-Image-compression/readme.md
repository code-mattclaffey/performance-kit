# Image Compression
On our site we are using [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) but there're other ways we can compress our images such as:

- Photoshop
- Imageresizing.net
- gulp-imagemin
- kraken.io

In our example we have made a nice 44kb reduction on our page without the quality defects but there're is a lot more we can do with the images before we pass them through imagemin.

```js
gulp.task('imagemin', function() {
  return gulp.src('./_assets/images/**/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/_assets/images-compressed'));
});
```

[previous demo](http://performance-kit.surge.sh/04/after.html) which is 425kb.

[minified demo](http://performance-kit.surge.sh/05/after.html) which is 381kb.

## Using imageresizing.net

imageresizing.net has the ability for you to set the quality on the image url. I only had to add `/path/to/image.jpg?quality=70` to the end of the image to get a smaller file size with very minor quality drops.

For our client this has reduced the page weight from around 1.2mb of images to 900kb (avg across site).

## Progressive jpegs
Not really a performance imrpovement in terms of page speed, however it does improve the perceived performance. Here is an example from [IMGonline.com.ua](https://www.imgonline.com.ua/eng/make-jpeg-progressive-without-compression.php) that shows how a progressive image would look when it is 50% downloaded.

![Orginal](https://www.imgonline.com.ua/examples/original-2.jpg)![baseline jpeg](https://www.imgonline.com.ua/examples/progressive-no.jpg) ![progressive jpeg](https://www.imgonline.com.ua/examples/progressive-yes.jpg)

I like this approach because we do not see half an image loading on the page. We just see the whole image but then the quality of the image gradually gets better and better.

## Webp
Webp is a fairly new image format for the web that provides better lossless and lossy compression for images on the web. This is stil quite new tech but its something to add to our future roadmaps.

![WebP Browser Support](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/05-Image-compression/screenshots/webp-bs.png)

[Caniuse - WebP Support](http://caniuse.com/#search=webp)

WebP can dramatically reduce our page weight down just from changing the format:

![Blow Dryer Jpg](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/_assets/images/blow-dryer.jpg)

Original - 81kb

![Blow Dryer WebP](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/_assets/images/blow-dryer.webp)

WebP - 27kb

WebP is clearly something to look into soon in the future. It does not look like MS is planning to add in anytime soon. :worried:

[Support on WebP](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/webpimageformat/)

[Chapter 6 - Render Blocking Scripts](https://github.com/code-mattclaffey/performance-kit/tree/master/06-render-blocking-scripts/readme.md)
