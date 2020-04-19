---
title: 'Hidden images'
description: 'When the image is set to display: none; at a certain breakpoint, the image still gets loaded in the browser making the page weight bigger than what it needs to be.'
layout: layouts/post.njk
---

## How does this happen?

There are many factors to why this can happen such as time contraints, just doing a quick fix/change and lack of understanding of what will happen if its done that way. Even though these images are visually hidden they still get requested & downloaded by the browser.

## Navigation images is a prime example

Some designs have images in the navigation on desktop screens and then hide them on mobile devices. What tends to happen then is that these images that are desktop quality will then get downloaded on mobile which will impact page load.

![Navigation Images on Load](https://performance-kit.netlify.app/img/before-html-network.png)

Fixing this problem is quite straight forward. The first thing to do is put our image in a picture tag and then whatever the breakpoint your hiding the image on, add a source element in the picture element which is a generic global image that is 1px x 1px. For example:

```html
<picture>
  <source srcset="/_assets/images/image-hidden.jpg" media="(max-width: 48em)" />
  <img class="image" src="/_assets/images/home.jpg" alt="Home" />
</picture>
```

What will happen now is the image that was loading on mobile has now go down to about 1kb and because the image is a global image everytime that image is requested it will get cached which means the requests are reduced in the network to only one.

![Navigation Images after Load](https://performance-kit.netlify.app/img/after-html-network.png)

## Browser support

If you do not support IE11 on your site then don't worry about this but if you need to then this polyfill is really useful to use as it checks which browser your user is in and then returns a bundle back based on what features you have requested

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=HTMLPictureElement"></script>
```
