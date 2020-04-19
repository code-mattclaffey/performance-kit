---
title: 'Compress Images'
description: 'No brainer right? Wrong! Still to this day people do not compress their images before putting them on the web.'
layout: layouts/post.njk
---

## Why not?

There are many reason why this can happen and it normally falls down to a mixture of things such as the client not educated on image optimization, platform restrictions or lack of care. It all comes down to thinking what can we as developers can do to prevent that 1mb image from getting out there to the world and impacting performance. It is our responsibility as well as the clients to make our images web friendly.

## What is out there already?

### Progresssive jpegs

A progressive jpeg is a good go-to to use on your website, although they are a little larger than the average jpeg they load a little different which makes the "perceived performance" a lot nicer.

![Progressive jpeg example](https://performance-kit.netlify.app/img/progressive-jpeg.jpeg)

This technique is useful for really big full screen background images.

### Webp

Webp image formats were introduced by Google Chrome a few years ago. At the time they were the only browser that supported this format which felt like it was not quite ready to fully use in our web applications. In 2020, we are now looking at around 78% of browser coverage which is amazing! The benefits Webp can reduce image page weight by up to 66%.

Implementing Webp is quite simple, all we need to do is add a new source attribute to out picture element and define what type of image that is.

```html
<picture>
  <source srcset="/_assets/images/webp/example-image--large.webp" type="image/webp" />
  <source srcset="/_assets/images/example-image--large.jpg" type="image/jpeg" />
  <img src="/_assets/images/example-image--large.jpg" alt="Alt Text!" />
</picture>
```

This is easy but on large scale websites it not effective use of time. The best implementation I have seen of this is to use the CDN to return a Webp image if the user agent is one fo the following. For example:

1. User hits the website in Chrome
2. Network will fetch a jpeg
3. CDN will check if the browser supports Webp
4. Returns the Webp version of that image

If setup properly this implementation works really nicely with CMS (content management sites) as the user is the one in control of what is uploaded.

[Caniuse Webp][https://caniuse.com/#feat=webp]

### Squoosh

When I want to compress my own images I use this app as it is really easy to use and has a wide variety of options to choose from - [Squoosh][https://squoosh.app/].
