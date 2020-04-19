---
title: 'Lazy Loading images'
description: 'Lazy loading is a great method to use for when you want to only load images in view i.e the fold. When you scroll through the page, images will load as they come into view.'
layout: layouts/post.njk
---

## Why is lazy loading so good?

- Reduces page requests
- Reduces the page weight

In our example we have 10 images on the page. The total image size is around `424kb` and it takes `10.26s` for the page to be fully loaded on a `Regular 3G (100ms, 750kb/s, 250kb/s)`.

![Load times before](https://performance-kit.netlify.app/img/load-time-lazy-load.png)

## Implementing lazy loading

My go-to plugin is called [LazySizes](https://github.com/aFarkas/lazysizes) because it is really easy to setup, has multiple addons and features that extend the current functionality and it is lightweight. It has a mixture of ways of how to implement the script but in this example I am just loading it from git CDN.

```html
<script src="https://cdn.rawgit.com/aFarkas/lazysizes/gh-pages/lazysizes.min.js" async=""></script>
```

Before implementing lazy loading we have two images, a plain img tag and a responsive image:

```html
<img src="/_assets/images/example-image--large.jpg" alt="title" />

<picture class="picture picture--xs-4x3">
  <source srcset="/_assets/images/example-image--medium.jpg" media="(min-width: 768px) and (max-width: 1023px)" />
  <source srcset="/_assets/images/example-image--small.jpg" media="(min-width: 481px) and (max-width: 767px)" />
  <source srcset="/_assets/images/example-image--xs.jpg" media="(max-width: 480px)" />
  <img src="/_assets/images/example-image--large.jpg" alt="title" />
</picture>
```

When implementing lazy loading for a standalone image it is pretty straight forward. All we need to do is add the `lazyload` class name to the image and then provide a fallback image for no JavaScript. We do this so SEO is not impacted by making the site faster.

```html
<img data-src="/_assets/images/responsive/blow-dryer--large.jpg" class="lazyload" alt="title" />
<noscript>
  <img src="/_assets/images/responsive/blow-dryer--large.jpg" alt="title" />
</noscript>
```

With picture elements it is a little different because you need to apply new attributes to the source elements as they will load the image in regardless of the src on the image tag. For example:

```html
<picture class="picture picture--xs-4x3">
  <source data-srcset="/_assets/images/responsive/blow-dryer--large.jpg" media="(min-width: 1024px)" />
  <source data-srcset="/_assets/images/responsive/blow-dryer--medium.jpg" media="(min-width: 768px) and (max-width: 1023px)" />
  <source data-srcset="/_assets/images/responsive/blow-dryer--small.jpg" media="(min-width: 481px) and (max-width: 767px)" />
  <source data-srcset="/_assets/images/responsive/blow-dryer--xs.jpg" media="(max-width: 480px)" />
  <img data-src="/_assets/images/responsive/blow-dryer--large.jpg" class="lazyload" alt="title" />
  <noscript>
    <source srcset="/_assets/images/responsive/blow-dryer--large.jpg" media="(min-width: 1024px)" />
    <source srcset="/_assets/images/responsive/blow-dryer--medium.jpg" media="(min-width: 768px) and (max-width: 1023px)" />
    <source srcset="/_assets/images/responsive/blow-dryer--small.jpg" media="(min-width: 481px) and (max-width: 767px)" />
    <source srcset="/_assets/images/responsive/blow-dryer--xs.jpg" media="(max-width: 480px)" />
    <img src="/_assets/images/responsive/blow-dryer--large.jpg" alt="title" />
  </noscript>
</picture>
```

**Note:** The lazy loading may not work correctly if you do not set the correct sizes for your placeholders. Images that have no height will be loaded on the page at the wrong time because they may sit further up the fold. To work around this, find out what aspect ratio the image is for each breakpoint and maintain the [aspect ratio](https://css-tricks.com/aspect-ratio-boxes/).

## IE11 glitch

Sometimes a really weird thing can happen in IE11 where the image gets stuck on `lazy-loading` state and the image just does not load at all. If you have this issue, the fix is to set your image element from `data-src` to `data-srcset`. It does get confused when you add a source element with a media that has a min width. More info [here](https://github.com/afarkas/lazysizes/issues/311).

## CSS

When the images lazy load on slower connections they can just flash on the page and it does not look amazing so try adding some fade in effects to would make it look really nice.

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

Another feature we have to add is the no-js fallback. We need this so the images display when the user comes to a browser with no JavaScript or a Google bot is crawling the site.

```css
.lazyload .no-js {
  display: none;
}
```

## The future of lazy loading plugins?

Lazy load plugins has a new kid on the block which is called `native lazy loading`. Native lazy loading is a feature first released by Google Chrome which allows you to set lazy loading on your image. It is also now supported in the last two versions of Edge which leads to around 63% global coverage across all browsers.

It is really easy to implement to, all you have to do is add an attribute on the img called `loading` and define one of the following as its value:

- `auto` - default lazy loading behavior of the browser which is the same as not including the attribute
- `lazy` - defer loading of the resource until it is reached in the viewport
- `eager` - load the resource as soon as behavior regardless of where it sits on the page

```html
<img src="/_assets/images/responsive/blow-dryer--large.jpg" alt="title" loading="lazy" />
```

Is it time to stop using lazy loading plugins? I don't think so, loading prop only works for images and iframes but does not support background images. In some cases we still need these tools but I reckon in the next 2-4 years when loading attribute is globally supported it will be used everywhere. A lot of users use IOS devices over Android so I think waiting until Apple catches up would be the best approach.

## Conclusion

When this is done on pages that have a ton of images this can be really effective to users initial page load.

![Load times before](https://performance-kit.netlify.app/img/load-time-lazy-load-after.png)

If not, please raise an issue on my github page - https://github.com/code-mattclaffey/performance-kit/issues and I will sort it out asap.
