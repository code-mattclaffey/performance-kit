# Image Compression
Imagine you have around 1.2mb of images and we set our quality setting to 70. We are reducing our page weight by 400kb just from setting the quality to 70.

On our site we are using [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) but there're other ways you can compress your images such as:

- Photoshop
- Imageresizing.net

On our example we have made a nice 44kb reduction on our page without the quality defects.

```js
gulp.task('imagemin', function() {
  return gulp.src('./_assets/images/**/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/_assets/images-compressed'));
});
```

[previous demo](http://performance-kit.surge.sh/05/after.html) which is 425kb.

[minified demo](http://performance-kit.surge.sh/05/after.html) which is 381kb.

## Using imageresizing.net

Some CDN's have the ability for you to set the quality on the image url. On some projects I have worked on in the past I used imageresizing.net. I only had to add `/path/to/image.jpg?quality=70` to the end of the image to get a smaller filesize image but with very minor quality defects.

For our client this has reduced the page weight from around 1.2mb of images to 900kb.

## Progressive jpegs
Not really a performance imrpovment in temrs of page speed, however it does improve the percieved performance of the site. Here is an example from [IMGonline.com.ua](https://www.imgonline.com.ua/eng/make-jpeg-progressive-without-compression.php) that shows how a progressive image would look when it is 50% downloaded.

![Orginal](https://www.imgonline.com.ua/examples/original-2.jpg)![baseline jpeg](https://www.imgonline.com.ua/examples/progressive-no.jpg) ![progressive jpeg](https://www.imgonline.com.ua/examples/progressive-yes.jpg)

I like this approach because we do not see half an image loading on the page. We just see the whole image but then the quality of the image gradually gets better and better.

## Webp
Webp is a fairly new image format for the web that provdides better lossless and lossy compression for images on the web. WebP reduces our images down to a further 26%. Here is an example to how WebP could of chopped our image weight down:

![Blow Dryer Jpg](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/_assets/images/blow-dryer.jpg)

Original - 81kb

> Look at image in Chrome

![Blow Dryer WebP](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/_assets/images/blow-dryer.webp)

WebP - 14kb

[Chapter 7 - Render Blocking Scripts](https://github.com/code-mattclaffey/performance-kit/tree/master/07-render-blocking-scripts/readme.md)
