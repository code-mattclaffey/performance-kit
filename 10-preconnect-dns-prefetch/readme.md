# Preconnect & DNS Prefetch

Before we talk about Preconnect we need to know what a DNS prefetch is. DNS prefetch alerts the browser that there is an asset we will need later from a specific URL so the browser can resolve the DNS as quickly as it can. This is useful to use with any external libraries or third party scripts becuase the DNS prefetch can warm up these connections before they get requested therefore reducing how long it takes to request them.

Preconnect is an extension of DNS prefetch but it will make the TCP handshake and optional TLS negotiation.

## Preconnect Browser Support
![Browser Support for preconnect](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/10-preconnect-dns-prefetch/screenshots/preconnect.png)

Like preload, it is not massively support everywhere yet but it is under consideration in the at [MS](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/preconnectresourcehints/).

## DNS Prefetch Browser Support

The browser bupport is a lot better than preconnect so for now we are going to use this method instead until preconnect is more widely supported.

![Browser Support for dns-prefetch](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/10-preconnect-dns-prefetch/screenshots/dns-prefetch.png)

We have a couple of assets that are loaded in from a different URL:

- Picturefill
- Lazyload
- jQuery
- YouTube

We just need to add the HTML into the head of the page:

```html
<link rel="dns-prefetch" href="//cdn.rawgit.com">
<link rel="dns-prefetch" href="//code.jquery.com">
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link rel="dns-prefetch" href="//static.doubleclick.net">
<link rel="dns-prefetch" href="//i.ytimg.com">
<link rel="dns-prefetch" href="//s.ytimg.com">
```

## How to measure the value
Since preconnect & dns-prefetch will reduce the round trips it makes to other URLS it will reduce the page load on the website.

If you put [our previous example](http://performance-kit.surge.sh/09/after.html) in webpage test and look at the connection view we have our dns lookups happening at different times.

![Connection view before](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/10-preconnect-dns-prefetch/screenshots/connection-view-before.png)

![Connection view after](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/10-preconnect-dns-prefetch/screenshots/connection-view-after.png)

As you can see the DNS lookups all start early on. This have reduce our page load by **1.3s**.

[Chapter 11 - Cleanup](https://github.com/code-mattclaffey/performance-kit/tree/master/11-cleanup/readme.md)


[Useful article on resourec hints](https://www.keycdn.com/blog/resource-hints/)
