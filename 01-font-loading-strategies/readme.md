# Font loading Strategies

Fonts are a critical asset on your websites however if not loaded correctly, it can provide a very bad user expierence. A browsers default behaviour towards a new custom font will hide the content until the font is downloaded. This is known as flash of invisible text (FOIT) [See example](https://cloud.githubusercontent.com/assets/1369170/19876828/0aa7d0d6-9f97-11e6-86c8-b7e2c80a9986.gif).

When debugging this issue on a website, a good way to check whether this happens is on a waterfall diagram:

![waterfall diagram of FOIT](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/01-font-loading-strategies/default-font-loading.png)

We have two problems to overcome:

- FOIT
- remove the dependency for the CSS file to load before the font.

Let's start by fixing that flash...

## Flash begone you fool ⚡️!

There is a really good CSS property called [font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) that decides how a font is displayed based on if the custom font is downloaded on the page. It is really simple to implement:

```scss
@font-face {
  font-family: myFont;
  src: url(/path/to/fonts/myFont.woff2) format('woff2'),
    url(/path/to/fonts/myFont.woff) format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap; // font display for the win!
}
```

We have removed our FOIT. What should happen now is you will see something similiar to this [gif](https://cloud.githubusercontent.com/assets/1369170/19876827/0aa5c8d6-9f97-11e6-81a2-13fa35f6bbc9.gif)


### What do I do if I need to get this working in Edge & IE?
![browser support for font-display](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/01-font-loading-strategies/font-display-browser-support.png)

Sadly, browser support for `font-display` does not cover all major browsers but deciding whether to support IE & Edge with this feature is completely up to you! In terms of progressive enhancement you can just leave the `font-display` to work in the browsers that support it and then have the FOIT on Edge & IE. If you want to support those browsers there is another way to get it working. Let me introduce you to the FontFaceObserver.

### FontFace Observer
The FontFace Observer is a fast web font loader which allows you to add extra control around your websites font loading behaviour. Here is a simple example of how this is done:

```js
var myFont = new FontFaceObserver('myFont');

font.load().then(function() {
  document.body.classList.add('myFont-loaded');
});
```

Then in the css it would be scoped like this:

```css
body {
  font-family: Arial, 'sans-serif';
}

.myFont-loaded {
  font-family: myFont, Arial, 'sans-serif';
}
```

## Let's speed these fonts up
Even though FOUT is setup on our page, a new problem has occured. Previously the content was invisible until the font has loaded. Now we have arial displaying as our fallback font it still will take a few seconds for our fonts to load especially on a 3G connection. As mentioned above, the css file needs to be downloaded before the fonts is requested because the `@font-face` lives in the css file.

### Option one - Inline @font-face
Firt thing to do is to inline the CSS that requests those fonts to the page. When the browser is parsing the DOM it will stop when the style embed tag appears in the html. Once parsed, the browser will request those fonts. Here is an example:

```html
<style>
  @font-face {
    font-family: myFont;
    src: url(/path/to/fonts/myFont.woff2) format('woff2'),
      url(/path/to/fonts/myFont.woff) format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap; // font display for the win!
  }

  body {
    font-family: myFont;
    font-weight: 400;
  }
</style>
```

The downside of this will be the fact that you are inlining CSS in your HTML. You cannot cache that CSS unless the HTML response is cached. This is not a game changer though as it is a tiny bit of CSS.

### Option two - Preload all the things!!!

Resource hints are extremely useful and very simple to implement. All we have to do is add this line of code in the head:

```html
<link rel="preload" href="/path/to/fonts/myFont.woff2" as="font" type="font/woff2" crossorigin="">
```

Preload is only supported in Safari & Chrome. MS Edge status is in development & Firefox has the feature behind a flag.

**Note:** make sure you add cross origin as an attribute on fonts. More information [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content#Cross-origin_fetches)

Both options are valid and work together. They both return the same result which is loading the font before the CSS file has loaded. Now our fonts load with our CSS instead of waiting for the CSS to be ready then load fonts.

![end result of preloading fonts](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/01-font-loading-strategies/preloading-and-font-display.png)

[Chapter 2 - Hidden Images](https://github.com/code-mattclaffey/performance-kit/tree/master/02-hidden-images/readme.md)


