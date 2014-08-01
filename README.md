bootstrap-tabs-x
=====================

Extended Bootstrap Tabs with ability to align tabs in multiple ways, add borders, rotated titles, and more. This plugin includes various CSS3 styling enhancements
and some tweaks to the core [Bootstrap 3 Tabs plugin](http://getbootstrap.com/javascript/#tabs).

## Features  

The plugin offers these enhanced features:

- Supports various tab opening directions: `above` (default), `below`, `right`, and `left`.
- Allows you to box the tab content in a new `bordered` style. This can work with any of the tab directions above.
- Allows you to align the entire tab content to the `left` (default), `center`, or `right` of the parent container/page.
- Allows a rotated sideways tab header orientation for the `right` and `left` tab directions.

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

    $ php composer.phar require kartik-v/bootstrap-tabs-x "dev-master"

or add:

    "kartik-v/bootstrap-tabs-x": "dev-master"

to your composer.json file

### Manual Install

You can also manually install the plugin easily to your project. Just download the source [ZIP](https://github.com/kartik-v/bootstrap-tabs-x/zipball/master) or [TAR ball](https://github.com/kartik-v/bootstrap-tabs-x/tarball/master) and extract the plugin assets (css and js folders) into your project.

## Usage

### Load Client Assets

You must first load the following assets in your header. 

```html
<link href="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
<link href="path/to/css/bootstrap-tabs-x.min.css" media="all" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.js"></script>
<script src="path/to/js/bootstrap-tabs-x.min.js" type="text/javascript"></script>
```

If you noticed, you need to load the `bootstrap.min.css`, `jquery.min.js`, and `bootstrap.min.js` in addition to the `bootstrap-tabs-x.min.css` and `bootstrap-tabs-x.min.js` for
the plugin to work with default settings. 

> Note: The plugin extends the **bootstrap tabs plugin** and hence the `bootstrap.min.js` must be loaded before `bootstrap-tabs-x.min.js`.

### Markup

You just need to setup the markup for the extended bootstrap tabs to work now.

```html
<legend>Tabs Above Centered (Bordered)</legend>
<!-- tabs -->
<div class="tabbable align-center tabs-above ">
    <ul class="nav nav-tabs">
        <li class="active"><a href="#one2" data-toggle="tab">One</a></li>
        <li><a href="#two2" data-toggle="tab">Two</a></li>
        <li><a href="#three2" data-toggle="tab">Three</a></li>
    </ul>
    <div class="tab-content tab-bordered">
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

The javascript methods and events available in the core bootstrap tabs plugin will be available here as well.


## License

**bootstrap-tabs-x** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.
