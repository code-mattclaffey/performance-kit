# Preloading

Preload is a great way to get an asset to load in priority over the other assets. We need to preload assets that are above the fold to improve percieved performance. We are using preload instead of prefetch because we always need this asset so it must be requested.

## Browser Support

![Preloading browser support](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/07-preload/screenshots/preload-bs.png)

[Preload Browser Support](http://caniuse.com/#search=preload)

Preload is not yet widely supported by most browsers however it is something that should still be implemented as it will do nothing if the browser does not support it. Always think to yourself "How well does it fail?". Adding preload into the solution does not break the page if it isnt supported. The browser will just ignore it.


## Prefetching

If we are certain that a specific resource will be required we can ask the browser to request the asset and store it in the cache as a future reference.

![Prefetch browser support](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/07-preload/screenshots/prefetch-bs.png)

[Prefetch Browser Support](http://caniuse.com/#search=prefetch)

On our page we are looking quite good for getting the content to the user but we have no logo.

![Filmstrip of render blocking scripts](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/06-render-blocking-scripts/screenshots/render-blocking-scripts.png)

As you can see the `logo` is loading quite late.

![Waterfall network image](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/07-preload/screenshots/waterfall-image.png)

We need to add in this HTML in the head of the document:

```html
<link rel="preload" href="/_assets/images/logo.png" as="image">
```

![Waterfall view of preload](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/07-preload/screenshots/waterfall-image-preload-after.png)

[Chapter 8 - Preconnect & DNS Prefetch](https://github.com/code-mattclaffey/performance-kit/tree/master/08-preconnect-dns-prefetch/readme.md)
