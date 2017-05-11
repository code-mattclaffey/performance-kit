# Preconnect
Before we talk about Preconnect we need to know what a DNS prefetch is. DNS prefetch alerts the browser that there is an asset we will need later from a specific URL so the browser can resolve the DNS as quickly as it can. This is useful to use with any external libraries or third party scripts becuase the DNS prefetch can warm up these connections before they get requested therefore reducing how long it takes to request them.

Preconnect is an extension of DNS prefetch but it will make the TCP handshake and optional TLS negotiation.

## Browser Support
![Browser Support for preconnect](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/10-preconnect/screenshots/preconnect.png)

Like preload, it is not massively support everywhere yet but this doesnt mean we should'nt add this feature in because as time goes on more browsers will support this feature. As a fallback we can use the `dns-prefetch` feature to still speed up the connections between different urls. DNS prefetch is widely supported in nearly every browser:

![Browser Support for dns-prefetch](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/10-preconnect/screenshots/dns-prefetch.png)

We have a couple of assets that are loaded in from a different URL:

- Picturefill - https://cdn.rawgit.com/
- Lazyload - https://cdn.rawgit.com/
- jQuery - https://code.jquery.com/

We just need to add in this snippet og HTML into the head of the page:

```html
<link rel="preconnect" href="https://cdn.rawgit.com">
<link rel="preconnect" href="https://code.jquery.com">
<link rel="dns-prefetch" href="//cdn.rawgit.com">
<link rel="dns-prefetch" href="//code.jquery.com">
```


[Chapter 11 - Cleanup](https://github.com/code-mattclaffey/performance-kit/tree/master/11-cleanup/readme.md)
