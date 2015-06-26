bootstrap-tabs-x
=====================

[![Bower version](https://badge.fury.io/bo/bootstrap-tabs-x.svg)](http://badge.fury.io/bo/bootstrap-tabs-x)
[![Latest Stable Version](https://poser.pugx.org/kartik-v/bootstrap-tabs-x/v/stable)](https://packagist.org/packages/kartik-v/bootstrap-tabs-x)
[![License](https://poser.pugx.org/kartik-v/bootstrap-tabs-x/license)](https://packagist.org/packages/kartik-v/bootstrap-tabs-x)
[![Packagist Downloads](https://poser.pugx.org/kartik-v/bootstrap-tabs-x/downloads)](https://packagist.org/packages/kartik-v/bootstrap-tabs-x)
[![Monthly Downloads](https://poser.pugx.org/kartik-v/bootstrap-tabs-x/d/monthly)](https://packagist.org/packages/kartik-v/bootstrap-tabs-x)

Extended Bootstrap Tabs with ability to align tabs in multiple ways, add borders, rotated titles, load tab content via ajax including caching, and more. This plugin includes various CSS3 styling enhancements
and various tweaks to the core [Bootstrap 3 Tabs plugin](http://getbootstrap.com/javascript/#tabs).

![Bootstrap Tabs X Screenshot](https://lh3.googleusercontent.com/-vWD5-6XoYp4/U9zmysBfbEI/AAAAAAAAALo/-Hkbe-YAB6k/w678-h551-no/bootstrap-tabs-x.jpg)

> NOTE: The latest version of the plugin v1.3.2 has been released. Refer the [CHANGE LOG](https://github.com/kartik-v/bootstrap-tabs-x/blob/master/CHANGE.md) for details.

## Features  

The plugin offers these enhanced features:

- Supports various tab opening directions: `above` (default), `below`, `right`, and `left`.
- Allows you to box the tab content in a new `bordered` style. This can work with any of the tab directions above.
- Allows you to align the entire tab content to the `left` (default), `center`, or `right` of the parent container/page.
- Automatically align & format heights and widths for bordered tabs for `right` and `left` positions.
- Allows a rotated `sideways` tab header orientation for the `right` and `left` tab directions.
- Auto detect overflowing header labels for `sideways` orientation (with ellipsis styling) and display full label as a title on hover.
- Ability to load tab content via ajax call.
- With release v1.3.0, you can use this like an enhanced jQuery plugin using the function `$fn.tabsX` on the `.tabs-x` parent element.

## Demo

View the [plugin documentation](http://plugins.krajee.com/tabs-x) and [plugin demos](http://plugins.krajee.com/tabs-x/demo) at Krajee JQuery plugins. 

## Pre-requisites  

1. [Bootstrap 3.x](http://getbootstrap.com/) (Requires bootstrap `tabs.js`)
2. Latest [JQuery](http://jquery.com/)
3. Most browsers supporting CSS3 & JQuery. 

## Installation

### Using Bower
You can use the `bower` package manager to install. Run:

    bower install bootstrap-tabs-x

### Using Composer
You can use the `composer` package manager to install. Either run:

    $ php composer.phar require kartik-v/bootstrap-tabs-x "@dev"

or add:

    "kartik-v/bootstrap-tabs-x": "@dev"

to your composer.json file

### Manual Install

You can also manually install the plugin easily to your project. Just download the source [ZIP](https://github.com/kartik-v/bootstrap-tabs-x/zipball/master) or [TAR ball](https://github.com/kartik-v/bootstrap-tabs-x/tarball/master) and extract the plugin assets (css and js folders) into your project.

## Usage

### Load Client Assets

You must first load the following assets in your header. 

```html
<link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet">
<link href="path/to/css/bootstrap-tabs-x.min.css" media="all" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.js"></script>
<script src="path/to/js/bootstrap-tabs-x.min.js" type="text/javascript"></script>
```

If you noticed, you need to load the `bootstrap.min.css`, `jquery.min.js`, and `bootstrap.min.js` in addition to the `bootstrap-tabs-x.min.css` and `bootstrap-tabs-x.min.js` for
the plugin to work with default settings. 

> Note: The plugin extends the **bootstrap tabs plugin** and hence the `bootstrap.min.js` must be loaded before `bootstrap-tabs-x.min.js`.

### Markup

You just need to setup the markup for the extended bootstrap tabs to work now. Refer documentation for details.

```html
<legend>Tabs Above Centered (Bordered)</legend>
<!-- tabs -->
<div class="tabs-x align-center tabs-above tab-bordered">
    <ul class="nav nav-tabs">
        <li class="active"><a href="#one2" data-toggle="tab">One</a></li>
        <li><a href="#two2" data-toggle="tab">Two</a></li>
        <li><a href="#three2" data-toggle="tab">Three</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="one2">Lorem ipsum dolor sit amet, charetra varius quam sit amet
            vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero.
        </div>
        <div class="tab-pane" id="two2">Secondo sed ac orci quis tortor imperdiet venenatis. Duis elementum
            auctor accumsan. Aliquam in felis sit amet augue.
        </div>
        <div class="tab-pane" id="three2">Thirdamuno, ipsum dolor sit amet, consectetur adipiscing elit. Duis
            pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae.
        </div>
    </div>
</div>
```

### Via Javascript

The javascript methods and events available in the core bootstrap tabs plugin will be available here as well. In addition, the `tabsX` plugin function behavior is auto-initialized if you set the CSS class `tabs-x` on a container element on the page (e.g. `div`). You can optionally enable tabsX behavior manually via javascript. For example if your markup is like below:

```html
<div id="tabs-container" class="align-center">
    <ul class="nav nav-tabs">
        ...
    </ul>
    <div class="tab-content">
        ...
    </div>
</div>
```

You can enable the tabsX plugin via javascript like below:

```js
$("#tabs-container).tabsX({
    enableCache: true,
    maxTitleLength: 10
});
```

## Documentation

The entire tabs behavior can be controlled through HTML markup. The various markup options available for the `bootstrap-tabs-x` plugin are mentioned below:


### Tabs X Container

This is the most important part of setting up your extended tabs behavior. You must wrap the default bootstrap tabs markup within a div container with a `tabs-x` class.
In addition, you can add positioning classes (e.g. `tabs-above`) and alignment classes (e.g. `align-center` ) to this container. You can also add the `sideways` orientation 
class to rotate the tab headers sideways for the `tabs-right` and `tabs-left` positions.

```html
<!-- tabs-x container -->
<div class="tabs-x align-{center|right} tabs-{above|below|right|left} {tab-sideways} {tab-bordered} {tab-height-(xs|sm|md|lg}">
    <ul class="nav nav-tabs">
        ...
    </ul>
    <div class="tab-content">
        ...
    </div>
</div>
```

### Ajax Tabs

With release v1.1.0, the plugin supports loading content via ajax. You can configure the following properties to each tab link, for ajax loading:

- `data-url`: the server url that will process the ajax response and return a json encoded html
- `data-loading-class`: the css class to be applied to the tab header when content is loading. Defaults to `kv-tab-loading`.

For example: 

```html
<ul class="nav nav-tabs">
    <li class="active"><a href="#one2" data-toggle="tab">One</a></li>
    <li><a href="#two2" data-toggle="tab" data-url="/site/loadTab.php">Two</a></li>
    <li><a href="#three2" data-toggle="tab">Three</a></li>
</ul>
```

#### Caching Ajax Tabs

The plugin by default includes a caching object to cache the content generated via Ajax. Refer `enableCache` and `cacheTimeout` plugin options for details.

### Tabs X Positions (Directions)

You can set four different positions for your tabs - by adding one of the following CSS classes to your tabs container.

- `tabs-above`: The default tabs position - the navigation tabs will be placed above the tab content.
- `tabs-below`: The navigation tabs will be placed below the tab content.
- `tabs-left`: The navigation tabs will be placed left of the tab content.
- `tabs-right`: The navigation tabs will be placed right of the tab content.

### Tabs X Alignment

By default the tabs are aligned/floated to the `left` of the parent container. In addition, you can set the following alignment options, by adding 
one of the following CSS classes to your tabs container.

- `tab-align-center`: Align the entire tabs widget to the `center` of your parent container.
- `tab-align-right`: Align the entire tabs widget to the `right` of your parent container.

> NOTE: These alignments makes sense for working only with the `tabs-above` and `tabs-below` positions. It is recommended not to use them with the `tabs-right` and `tabs-left` positions.

### Tabs X Bordered

You can add the `tab-bordered` class to the tabs container to make it boxed within a border. The border radius and box format will automatically 
be adjusted based on your tab position.

### Tabs X Fixed Height Sizes

By default each of the tab pane heights are automatically calculated. When using the `tab-bordered` style, you may wish to set fixed heights, so the tab
widget dimensions are consistent for all tabs. For this you can add one of the following fixed height classes to your tabs container:

- `tab-height-xs`: Maintains a fixed tab pane height to an **extra small** height specification of `135 px`, and overflows the extra content to scrollable.
- `tab-height-sm`: Maintains a fixed tab pane height to a **small** height specification of `195 px`, and overflows the extra content to scrollable.
- `tab-height-sm`: Maintains a fixed tab pane height to a **medium** height specification of `280 px`, and overflows the extra content to scrollable.
- `tab-height-lg`: Maintains a fixed tab pane height to a **large** height specification of `400 px`, and overflows the extra content to scrollable.

> NOTE: You can add your own custom classes (names beginning with `tab-height-`) and the plugin will automatically format the vertical tabs borders 
 (`tabs-left` and `tabs-right`) based on this. Note in this case your custom class must modify the `tab-content` height like shown below:

```css
/* custom fixed height class */
.tab-height-500 .tab-content {
    height: 500px!important;
    overflow: auto;
}
```

### Tabs X Sideways Orientation

For the `tabs-left` and `tabs-right` positions, you can rotate the tab header labels to show it `sideways`. For this you can add the `tab-sideways` class
to your tabs container. In this case the tab header label width is fixed. Any long label text overflowing will not be wrapped and shown along with an ellipsis.
The plugin will automatically set the title attribute to show the complete label on hovering the tab header.

> NOTE: The sideways orientation makes sense for working only with the `tabs-left` and `tabs-right` positions. It is recommended not to use them with the `tabs-above` and `tabs-below` positions.

### Tabs X Plugin Options

The plugin options can also be set as HTML5 data attributes on the tabs-x main container.

#### enableCache
_boolean_, whether to enable caching of ajax generated tab pane content. Defaults to `true`.

#### cacheTimeout
_integer_, timeout in milli-seconds after which cache will be refreshed. Defaults to `300000` (i.e. `5` minutes).

#### maxTitleLength
_integer_, the maximum length of characters in each tab pane title for sideways text orientation only. Text overflowing beyond this limit will be hidden with an ellipsis (and displayed on mouse hover of the tab title). Defaults to `9`.

#### ajaxSettings
_object_, the additional ajax options that you wish to send when submitting an ajax response and is applicable only for ajax tabs.

#### successCallback
_object_, the callback function settings (only for ajax tabs) that will be triggered after successful rendering of the ajax content in the ajax tabs. You must set this as an associative array of key value pairs, where each key points to the tab pane identifier. For example if your tabs markup is as below:

```html
<div id="tabs-container" class="align-center">
    <ul class="nav nav-tabs">
        <li class="active"><a href="#pane-1" data-toggle="tab">One</a></li>
        <li><a href="#pane-2" data-toggle="tab" data-url="/site/loadTab.php">Two</a></li>
        <li><a href="#pane-3" data-toggle="tab">Three</a></li>
    </ul>
</div>
```

you can then setup a successCallback for each tab pane this way:

```js
$("#tabs-container).tabsX({
    enableCache: true,
    maxTitleLength: 10,
    successCallback: {
        'pane-1': function (data, status, jqXHR) {
            // callback code
        },
        'pane-2': function (data, status, jqXHR) {
            // callback code
        },
        'pane-3': function (data, status, jqXHR) {
            // callback code
        }        
    }
});
```

#### errorCallback
_object_, the callback function settings (only for ajax tabs) that will be triggered after an error is received in rendering of the ajax content in the ajax tabs. You must set this as an associative array of key value pairs, where each key points to the tab pane identifier. For example if your tabs markup is as below:

```html
<div id="tabs-container" class="align-center">
    <ul class="nav nav-tabs">
        <li class="active"><a href="#pane-1" data-toggle="tab">One</a></li>
        <li><a href="#pane-2" data-toggle="tab" data-url="/site/loadTab.php">Two</a></li>
        <li><a href="#pane-3" data-toggle="tab">Three</a></li>
    </ul>
</div>
```

you can then setup a `errorCallback` for each tab pane this way:

```js
$("#tabs-container).tabsX({
    enableCache: true,
    maxTitleLength: 10,
    errorCallback: {
        'pane-1': function (jqXHR, status, message) {
            // callback code
        },
        'pane-2': function (jqXHR, status, message) {
            // callback code
        },
        'pane-3': function (jqXHR, status, message) {
            // callback code
        }        
    }
});
```

#### addCss
_string_, the additional CSS class to add to the tabs-x main container. This defaults to `tabs-krajee`. The `tabs-krajee` CSS class is included with the inbuilt CSS file and adds specific sizing and alignment for **left** and **right** positioned tabs.

### Tabs X Plugin Events

The `bootstrap-tabs-x` plugin triggers additional events in addition to the events triggered by the parent bootstrap tabs plugin. The event is triggered on each tab link containing `[data-toggle=tab]`. The following events are available:

#### tabsX.click
This event is triggered on clicking each tab and after content is typically shown in the tab. 

```js
$('div.tabs-x .nav-tabs [data-toggle="tab"]').on('tabsX.click', function (event) {
    console.log('tabsX.click event');
});
```

For ajax tabs, this event is triggered after the content is loaded in the tab pane. The following parameters are available with this event for ajax enabled tabs:

- `jqXHR`: _object_, the `jQuery XMLHttpRequest` object used for the ajax transaction.
- `status`: _string_, the status text received from the server via ajax response.

```js
$('div.tabs-x .nav-tabs [data-toggle="tab"]').on('tabsX.click', function (event, jqXHR, status) {
    console.log('tabsX.click event');
});
```

#### tabsX.beforeSend
This event is triggered before sending an ajax call to the server. It is applicable only for ajax tabs when you set a `data-url` attribute on your tab link. The following parameters are available with this event:

- `jqXHR`: _object_, the `jQuery XMLHttpRequest` object used for the ajax transaction.
- `settings`: _object_, the settings object for jquery ajax before send.

```js
$('div.tabs-x .nav-tabs [data-toggle="tab"]').on('tabsX.beforeSend', function (event, jqXHR, settings) {
    console.log('tabsX.beforeSend event');
});
```

#### tabsX.success
This event is triggered after successful completion of an ajax call to the server. It is applicable only for ajax tabs when you set a `data-url` attribute on your tab link. The following additional parameters are available with this event:

- `data`: _string_, the output data retrieved from the server via ajax response.
- `status`: _string_, the status text received from the server via ajax response.
- `jqXHR`: _object_, the `jQuery XMLHttpRequest` object used for the ajax transaction.

```js
$('div.tabs-x').on('tabsX.beforeSend', function (event, data, status, jqXHR) {
    console.log('tabsX.beforeSend event');
});
```

> Note: Check the `successCallback` option of the plugin for an alternative easier way to configure callbacks on ajax success for all tab panes.

#### tabsX.error
This event is triggered after an ajax processing error. It is applicable only for ajax tabs when you set a `data-url` attribute on your tab link. The following additional parameters are available with this event:

- `jqXHR`: _object_, the `jQuery XMLHttpRequest` object used for the ajax transaction.
- `status`: _string_, the status text received from the server via ajax response.
- `message`: _string_, the error exception message thrown.

```js
$('div.tabs-x').on('tabsX.error', function (event, jqXHR, status, message) {
    console.log('tabsX.error event with message = "' + message + '"');
});
```

> Note: Check the `errorCallback` option of the plugin for an alternative easier way to configure callbacks on ajax error for all tab panes.

## License

**bootstrap-tabs-x** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.