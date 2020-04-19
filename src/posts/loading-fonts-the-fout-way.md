---
title: 'Loading Fonts The FOUT Way'
description: 'Fonts are a critical asset on a website however, if not loaded correctly it can provide a very bad user expierence. A browsers default behaviour towards a new custom font will hide the content until the font is downloaded. This is known as flash of invisible text (FOIT)'
layout: layouts/post.njk
---

## How a font works in the browser?

Fonts have the potential to be extremly slow. The more you include the more it can impact multiple metrics such as page weight, page load, first paint and first contentful paint.

## Chain requests

A chain request is when a resource that is required by another file instead of the document. When you add font-face inside a css file like below it will have a dependency on the css file to load before it can apply the font style. This can be a problem especially on slow connections because the HTML could take a second to load, then a second for your CSS and then an extra 1-2 seconds for the fonts to load. That is a total of 4 seconds where the user has not seen any text.

```css
@font-face {
  font-family: 'myFont';
  src: url(/path/to/fonts/myFont.woff2) format('woff2'), url(/path/to/fonts/myFont.woff) format('woff');
  font-weight: 400;
}
```

When the fonts are slow you can tell all of a sudden seeing no text and then a "blink" and they all appear in the browser. Which is known as FOIT (flash of invisible text).

## What is FOIT

Flash of invisible text is when the text on a website is invisible and then when the fonts have loaded they appear on the page. The text is rendered on the page ready but the browser does not know what font to use until they have loaded. When loaded, the the browser will "re-paint" the screen and show the new font, here is an ![example](https://cloud.githubusercontent.com/assets/1369170/19876828/0aa7d0d6-9f97-11e6-86c8-b7e2c80a9986.gif).

We want to remove this "blink" effect and try to have some form of content there so the user can get a feel for what message the website is trying to send quicker than having to wait for the font to load. This is called FOUT (Flash of unstyled text).

## What is FOUT

Flash of unstyled text is a popular concept where the user will see a font when the css has loaded but it will likely be a web safe font such arial or sans-serif depending on what you set as the previous font in your font-family property. For example:

```css
html {
  font-family: arial, sans-serif;
}

.wf-loaded {
  font-family: 'Avenir Next', arial, sans-serif;
}
```

It will use arial until the `wf-loaded` class name is added to the page. Without any spoilers in this section, I will show you how to implement FOUT the fastest and most effcient way.

## Implementing FOUT on your website

So the easiest and quickest way on implementing FOUT is by using a css property called `font-display`. Font display is added to the font-face and it tells the browser what to do with the font when it is loading. You have a few values that you can have on this property but the main ones we want to do are:

- swap - forces the browser to swap the font familys out
- auto - do what the browser would do by default

I prefer forcing the browser to swap the font so it is consistent across the board but I think it comes down to personal preference on that one. Now let's see what that would look like in our code:

```css
@font-face {
  font-family: 'myFont';
  src: url(/path/to/fonts/myFont.woff2) format('woff2'), url(/path/to/fonts/myFont.woff) format('woff');
  font-weight: 400;
  font-display: swap;
}

html {
  font-family: 'myFont', arial, sans-serif;
}
```

and that will result in ![this effect](https://cloud.githubusercontent.com/assets/1369170/19876827/0aa5c8d6-9f97-11e6-81a2-13fa35f6bbc9.gif).

## Extra bonus points!

That is amazing we now get fonts in a little faster but if you are like me and want to make it blazingly fast lets dive deeper into what we can do. So the way the fonts load now is still the same. As mentioned above we have a chain request where the fonts are dependant on the css loading before it can load itself. Lets sort that out...

### Embedding CSS

First thing we can do is embed our font-face css in the html document. Downside to this is not being able to cache the embed code but if your fonts are about 10-30 lines of css then it is not a massive problem.

Example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      @font-face {
        font-family: 'myFont';
        src: url(/path/to/fonts/myFont.woff2) format('woff2'), url(/path/to/fonts/myFont.woff) format('woff');
        font-weight: 400;
        font-display: swap;
      }

      html {
        font-family: 'myFont', arial, sans-serif;
      }
    </style>
    <link href="/path/to/style.css" type="text/css" rel="stylesheet" />
  </head>
  <body>
    <!-- content -->
  </body>
</html>
```

Now what will happen is that the font will load regardless of the css. When the css has loaded, if the font has loaded by then it will swap the font font out faster.

### Resource hints

The next thing we can do is use a resource hint called "preload". Preloading a font will tell the network that this font wants to be loaded before anything else. The network will then treat the font as a critical resource and prioritize it when loading assets. Preloading is your friend, but preloading everything has the opposite effect and can make the site load normal again so make sure you prioritize which fonts you want to load. A good starting point is headings and body copy.

Example:

```html
<head>
  <link rel="preload" href="/path/to/fonts/myFont.woff2" as="font" type="font/woff2" crossorigin />
  <style>
    @font-face {
      font-family: 'myFont';
      src: url(/path/to/fonts/myFont.woff2) format('woff2'), url(/path/to/fonts/myFont.woff) format('woff');
      font-weight: 400;
      font-display: swap;
    }

    html {
      font-family: 'myFont', arial, sans-serif;
    }
  </style>
  <link href="/path/to/style.css" type="text/css" rel="stylesheet" />
</head>
```

Preload is awesome to use on more than just fonts, the browser support is pretty good it is just ie 11 and Firefox that do not support the feature. Firefox does have this feature if you enable the feature under a flag in dev tools see more on [caniuse](https://caniuse.com/#search=preload).

## Hidden gems

### Local property

This is a gamer changer! Especially if you are using fonts such as Helvetica on your website. On apple devices Helvetica is installed locally so when the user comes to your website you can tell your css to pick the local font over the one on your server. How neat right?

For example:

```css
@font-face {
  font-family: 'myFont';
  src: local('myFont'), url(/path/to/fonts/myFont.woff2) format('woff2'), url(/path/to/fonts/myFont.woff) format('woff');
  font-weight: 400;
  font-display: swap;
}

html {
  font-family: 'myFont', arial, sans-serif;
}
```

Note: make sure you add local first because the order is important on the src property.

## Conclusion

You have learned how to load fonts in the page ultra fast and understood the definition between FOUT and FOIT. I hope that made sense. If not, please raise an issue on my [github page](https://github.com/code-mattclaffey/performance-kit/issues) and I will sort it out asap.
