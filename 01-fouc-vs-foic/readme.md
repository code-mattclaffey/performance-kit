# FOUC vs FOIC

## FOIC (“flash of invisible content”)
In a nutshell, FOIC is when the browser is loading a font it does not have. While this is happening, the browser will paint all the text but it will appear hidden on the page until the font has loaded. Once loaded, the browser will re-paint the text correctly. [See example](https://cloud.githubusercontent.com/assets/1369170/19876828/0aa7d0d6-9f97-11e6-86c8-b7e2c80a9986.gif)

## FOUC (“flash of unstyled content”)
FOUC paints the fallback font and waits until the font has loaded. Once loaded the browser will re-paint. [See example](https://cloud.githubusercontent.com/assets/1369170/19876827/0aa5c8d6-9f97-11e6-81a2-13fa35f6bbc9.gif)

In my personal opinion, I believe that FOUC is better than FOIC for one simple reason. We are getting the content to the user faster and we are progressively enhancing our website by serving our fallback font first.

## Implementing FOUC

In [our example](http://performance-kit.surge.sh/01/after.html) we are going to lazy load our body copy for the page. We are currently using `Roboto`. At the minute we are following the FOIC method.

```css
body {
  font-family: 'robotolight', Helvetica, Arial, sans-serif;
}

.h1, h1, .h2, h2, .btn {
  font-family: 'robotobold', Helvetica, Arial, sans-serif;
}

```
Firstly to get our fonts loading FOUC we have to remove `robotolight/robotobold` from the css properties. After we have done that we need to add a css class as a wrapper around the elements that need the font.

```css
body,
.h1, h1, .h2, h2, .btn {
  font-family: Helvetica, Arial, sans-serif;
}

.h1, h1, .h2, h2, .btn {
  font-weight: bold;
}

.roboto-light-loaded body {
  font-family: 'robotolight', Helvetica, Arial, sans-serif;
}

.roboto-bold-loaded .h1,
.roboto-bold-loaded h1,
.roboto-bold-loaded .h2,
.roboto-bold-loaded h2,
.roboto-bold-loaded .btn {
  font-family: 'robotobold', Helvetica, Arial, sans-serif;
}

```

Without any render blocking, we have to make an `async` http request to the server to load the assets on the page. Once the class has been added to the `<html>` element, the styles will re-paint the new font styles.

```js

function LoadFont(url, className) {
	$.get(url).done(function() {
		$('html').addClass(className);
	});
}

LoadFont('/_assets/fonts/Roboto-Bold-webfont.ttf', 'roboto-bold-loaded');
LoadFont('/_assets/fonts/Roboto-Light-webfont.ttf', 'roboto-light-loaded');

```

## Implementing FOUC with Typekit

Typekit makes FOUC really easy to implement. The library has [font events](https://helpx.adobe.com/typekit/using/font-events.html) that adds the class name `wf-active` to the html element. All we need to do is wrap the `wf-active` class around our elements that use requires the font.

```css
body,
.h1, h1, .h2, h2, .btn {
  font-family: Helvetica, Arial, sans-serif;
}

.h1, h1, .h2, h2, .btn {
  font-weight: bold;
}

.wf-active body {
  font-family: 'robotolight', Helvetica, Arial, sans-serif;
}

.wf-active .h1,
.wf-active h1,
.wf-active .h2,
.wf-active h2,
.wf-active .btn {
  font-family: 'robotobold', Helvetica, Arial, sans-serif;
}

```

### In Sass ...

Useful mixin in SASS:

With TypeKit:

```scss
$f-roboto-light: 'robotolight';

@mixin font-loaded($fName) {
  font-family: Helvetica, Arial, sans-serif;

  .wf-active & {
	  font-family: $fName, Helvetica, Arial, sans-serif;
  }
}

body {
  @include font-loaded($f-roboto-light);
}

```

Without:

```scss
$f-roboto-light: 'robotolight';

@mixin font-loaded($fName, $className) {
	font-family: Helvetica, Arial, sans-serif;

	.#{$className} & {
		font-family: $fName, Helvetica, Arial, sans-serif;
	}
}

body {
	@include font-loaded($f-roboto-light, 'roboto-light-loaded');
}

```

I found this pretty handy especially if you work on a project that uses `font-family` everywhere. :worried:

## How to measure the value

Measuring the value for this would be to compare a before/after film strip from [Web Page Test](https://www.webpagetest.org).

**Tip:** - in DevTools use the capture screenshots button to view a filmstrip of the page load. This is similliar to Web Page Test but not as accurate.


## Results

FOIC content did not appear on the page until 5.5 seconds whereas with FOUC our content appear in 4.5 seconds.

Before.html

![Before.html](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/01-fouc-vs-foic/screenshots/foic.png)

After.html

![After.html](https://raw.githubusercontent.com/code-mattclaffey/performance-kit/master/01-fouc-vs-foic/screenshots/fouc.png)

[Chapter 2 - Hidden Images](https://github.com/code-mattclaffey/performance-kit/tree/master/02-hidden-images/readme.md)


