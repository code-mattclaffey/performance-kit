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


[Chapter 7 - Webpack Analyser](https://github.com/code-mattclaffey/performance-kit/tree/master/07-webpack-analyser/readme.md)
