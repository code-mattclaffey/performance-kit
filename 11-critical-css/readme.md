# Critical CSS

# Critical CSS
Do you ever wonder why you webpage is taking so long to load on a slow connection? One of the biggest render blockers on the page is your css. When the page is rendering it will load the page until it hits a render blocking resource. When it does hit the resource the page will make a http request to the server to get that file but it wont carry on rendering the page until this file is loaded. This is where critical css is involved.

So the most important metric we need to look at in this tutorial is the **time to first byte**. Time to first byte is when your page is not fully loaded but it loads enough content to keep the user engaged. **on mobile, 40% of users will leave the site if the page takes longer than 3 seconds to load.** If you imagine your company making **£40,000** a day on their website. They could potentially be losing out on **£16,000** just becuase their page is taking so long to load.

Here is a baseline metric from [Patrick Hamann](https://twitter.com/patrickhamann) which is what I try to follow myself when I am optimising my websites.

| 3G EM  | 3G  | Cable  |
|---|---|---|
| 3secs  | 2secs  | 1secs  |

In our example we do not have a lot of css so we are going to add all of our css into the head of the document. However I can show you how to do it if we was working with larger css files.

```html

<title>Critical CSS</title>
<style>
/***
    See demos/11/after.html
***/
</style>
```

What we are going to do next is to asyncronously load the css into the page.

```html
<link rel="preload" href="./styles.css" as="style">
```

For browsers that support `rel=preload` use add `onload="this.rel='stylesheet'"` to the html element so we can apply the styles since preload does not apply the css when it is loaded.

Since this is all javascript we need to add a noscript fallback to the page.

```html
<noscript><link rel="stylesheet" href="./styles.css"></noscript>
```

The final thing we need to do is add a LoadCSS polyfill underneath the noscript tag. To trigger the load function we have to call `loadCSS( "./styles.css" );`. This will get the css if the `rel="preload"` is not supported by the browser.

```html
<script>
!function(e){"use strict";var n=function(n,t,o){function i(e){return a.body?e():void setTimeout(function(){i(e)})}function r(){l.addEventListener&&l.removeEventListener("load",r),l.media=o||"all"}var d,a=e.document,l=a.createElement("link");if(t)d=t;else{var s=(a.body||a.getElementsByTagName("head")[0]).childNodes;d=s[s.length-1]}var f=a.styleSheets;l.rel="stylesheet",l.href=n,l.media="only x",i(function(){d.parentNode.insertBefore(l,t?d:d.nextSibling)});var u=function(e){for(var n=l.href,t=f.length;t--;)if(f[t].href===n)return e();setTimeout(function(){u(e)})};return l.addEventListener&&l.addEventListener("load",r),l.onloadcssdefined=u,u(r),l};"undefined"!=typeof exports?exports.loadCSS=n:e.loadCSS=n}("undefined"!=typeof global?global:this);

loadCSS( "/_assets/11/styles.css" );
</script>

```

On our page here is a before and after of the waterfall view after we have implemented critical css.

![Before](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/11-critical-css/screenshots/critical-css.png)

![After](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/11-critical-css/screenshots/after-critical-css.png)

[Chapter 12 - Final](https://github.com/code-mattclaffey/performance-kit/tree/master/12-final/readme.md)
