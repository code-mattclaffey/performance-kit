# Preloading

Preload is a great way to get an asset to load in priority over the other assets. A lot of developers preload assets that are above the fold to improve percieved performance. We are using preload instead of prefetch because we always need this asset so it must be requested.

## Browser Support

![Preloading browser support](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/09-preload/screenshots/preload-bs.png)

Preload is not yet widely supported by most browsers however it is something that should still be implemented as it will do nothing if the browser does not support it. Always think to yourself "How well does it fail?".

What can we do as a fallback to preload? Prefetch!

## Prefetching

If we are certain that a specific resource will be required we can ask the browser to request the asset and store it in the cache as a future reference. For the logo, we are not going to change it unless we do a brand change so I am more than happy caching it so it loads in a little quicker than normal.

![Prefetch browser support](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/09-preload/screenshots/prefetch-bs.png)


On our page we are looking quite good for getting the content to the user but we have no logo.

![After.html](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/02-fouc-vs-foic/screenshots/FOUC.png)

As you can see in our example our `Hello` appears but it does not look like our logo at all. We could of lazy loaded the font using the method in chapter 2 but we would see more of that ugly hello text. I think it is acceptable for FOIC to be used in this senario.

![Waterfall network image](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/09-preload/screenshots/waterfall-image.png)

As you can see the `lemonbird-regular-webfont` is loading quite late. We need to add in this HTML in the head of the document:

```html
<link rel="preload" href="/_assets/fonts/lemonbird-regular-webfont.ttf">
<link rel="prefetch" href="/_assets/fonts/lemonbird-regular-webfont.ttf">
```

We have gone from the hello text looking ugly:

![After.html](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/02-fouc-vs-foic/screenshots/FOUC.png)

to:

![Filmstrip](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/09-preload/screenshots/film-strip-preload.png)

[Chapter 10 - Preconnect](https://github.com/code-mattclaffey/performance-kit/tree/master/10-preconnect/readme.md)
