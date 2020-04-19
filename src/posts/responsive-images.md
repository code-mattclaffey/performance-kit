---
title: 'Hidden images'
description: 'When the image is set to display: none; at a certain breakpoint, the image still gets loaded in the browser making the page weight bigger than what it needs to be.'
layout: layouts/post.njk
---

If I had an image that was 1600px x 900px on desktop and it was around 250kb - 300kb I wouldn't really want that to load on mobile especially when my mobile breakpoint is 480px. Resizing the image for the mobile view port will get the size down by around 66% because the image would be 3x smaller.

A standard responsive image will tend to look like this:

```html
<picture>
  <source srcset="/path/to/image--large.jpg" media="(min-width: 1025px)" />
  <source srcset="/path/to/image--medium.jpg" media="(min-width: 768px) and (max-width: 1024px)" />
  <source srcset="/path/to/image--small.jpg" media="(min-width: 481px) and (max-width: 767px)" />
  <source srcset="/path/to/image--xs.jpg" media="(max-width: 480px)" />
  <img src="/path/to/image--large" alt="Hello World" />
</picture>
```

The key property here is the `media` property. What this will do is it will find out what thew view port width is and then load the image based on the rules we have set in the source tag.

Tip: CDN's normally have default support for responsive images. Normally it is just a query string parameter called `width` & `height`, for example `/my/image?width=1600&height=900`.

## Conclusion

That is pretty much it! I hope that made sense. If not, please raise an issue on my [github page](https://github.com/code-mattclaffey/performance-kit/issues) and I will sort it out asap.
