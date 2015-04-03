/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 1.3.1
 *
 * Bootstrap Tabs Extended - Extended Bootstrap Tabs with ability to align tabs 
 * in multiple ways, add borders, rotated titles, and more.
 *
 * For more JQuery/Bootstrap plugins and demos visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    "use strict";
    var isEmpty = function (value, trim) {
            return value === null || value === undefined || value.length === 0 || (trim && $.trim(value) === '');
        },
        kvTabsCache = {
            timeout: 300000,
            data: {},
            exist: function (key) {
                return !!kvTabsCache.data[key] &&
                ((new Date().getTime() - kvTabsCache.data[key]) < kvTabsCache.timeout);
            },
            set: function (key) {
                delete kvTabsCache.data[key];
                kvTabsCache.data[key] = new Date().getTime();
            }
        },
        TabsX = function (element, options) {
            var self = this;
            self.$element = $(element);
            self.init(options);
            self.listen();
        };

    TabsX.prototype = {
        constructor: TabsX,
        init: function (options) {
            var self = this, $el = self.$element, chk;
            $.each(options, function (key, val) {
                self[key] = val;
            });
            chk = self.enableCache;
            self.enableCache = chk === true || chk === "true" || parseInt(chk) === 1;
            self.$pane = $el.find('.tab-pane.active');
            self.$content = $el.find('.tab-content');
            self.$tabs = $el.find('.nav-tabs');
            self.isVertical = ($el.hasClass('tabs-left') || $el.hasClass('tabs-right'));
            self.isVerticalSide = self.isVertical && $el.hasClass('tab-sideways');
            kvTabsCache.timeout = self.cacheTimeout;
        },
        format: function ($tabLink, initialize) {
            var self = this, $el = self.$element, $pane = self.$pane, $content = self.$content,
                isVertical = self.isVertical, isVerticalSide = self.isVerticalSide, $tabs = self.$tabs,
                tabHeight = $tabs.outerHeight(), paneHeight = $pane.outerHeight(), tabWidth = $tabs.outerWidth(),
                h = (tabHeight > paneHeight ? tabHeight : paneHeight + 20), contentHeight = $content.outerHeight(),
                isFixed = $el.is('[class^="tab-height-"]'), parentHeight;
            if (isVerticalSide) {
                if (isFixed) {
                    if (tabHeight < contentHeight) {
                        $tabs.height(contentHeight);
                    }
                    return;
                }
                if ($tabLink.is(':last-child') && tabHeight > paneHeight && initialize) {
                    $el.height(h + 1);
                } else {
                    $el.height(h);
                }
            } else {
                if (isVertical) {
                    h = tabHeight > paneHeight ? tabHeight : paneHeight + 32;
                    if ($el.hasClass('tabs-left')) {
                        $content.css('margin-left', tabWidth + 'px');
                    } else {
                        if ($el.hasClass('tabs-right')) {
                            $content.css('margin-right', tabWidth + 'px');
                        }
                    }
                    if (isFixed) {
                        if (tabHeight < contentHeight) {
                            $tabs.height(contentHeight);
                        }
                        return;
                    }
                    $el.css('min-height', h + 'px');
                    contentHeight = $content.outerHeight();
                    parentHeight = $el.outerHeight();
                    if (contentHeight > tabHeight) {
                        h = contentHeight < h ? contentHeight : parentHeight;
                        $tabs.css('min-height', h + 'px');
                    } else {
                        $content.css('min-height', h + 'px');
                    }
                }
            }
        },
        setTitle: function ($el) {
            var self = this, txt = $.trim($el.text()), isVertical = self.isVertical,
                maxLen = isEmpty($el.data('maxLength')) ? self.maxTitleLength : $el.data('maxLength');
            ;
            if (isVertical && txt.length > maxLen - 2 && isEmpty($el.attr('title'))) {
                $el.attr('title', txt);
            }
        },
        listen: function () {
            var self = this, $element = self.$element;
            $element.find('.nav-tabs [data-toggle="tab"]').on('shown.bs.tab', function () {
                self.format($(this), false);
            });
            $element.find('.nav-tabs li.active [data-toggle="tab"]').each(function () {
                self.format($(this), true);
            });
            $element.find('.nav-tabs li [data-toggle="dropdown"]').each(function () {
                self.setTitle($(this));
            });
            $element.find('.nav-tabs li [data-toggle="tab"]').each(function () {
                var $el = $(this);
                self.setTitle($el);
                $el.on('click', function (e) {
                    var vUrl = $(this).attr("data-url"), vHash = this.hash, cacheKey = vUrl + vHash, settings;
                    if (isEmpty(vUrl) || self.enableCache && kvTabsCache.exist(cacheKey)) {
                        $el.trigger('tabsX.click');
                        return;
                    }
                    e.preventDefault();
                    var $tab = $(vHash), $pane = $(this), $paneHeader = $pane,
                        css = $(this).attr("data-loading-class") || 'kv-tab-loading',
                        $element = $pane.closest('.dropdown'),
                        cbSuccess = self.successCallback[vHash] || null,
                        cbError = self.errorCallback[vHash] || null;
                    if (!isEmpty($element.attr('class'))) {
                        $paneHeader = $element.find('.dropdown-toggle');
                    }
                    settings = $.extend({
                        type: 'post',
                        dataType: 'json',
                        url: vUrl,
                        beforeSend: function (jqXHR, settings) {
                            $tab.html('<br><br><br>');
                            $paneHeader.removeClass(css).addClass(css);
                            $el.trigger('tabsX.beforeSend', [jqXHR, settings]);
                        },
                        success: function (data, status, jqXHR) {
                            setTimeout(function() {
                                $tab.html(data);
                                $pane.tab('show');
                                $paneHeader.removeClass(css);
                                self.format($el, false);
                                if (self.enableCache) {
                                    kvTabsCache.set(cacheKey);
                                }
                                if (cbSuccess && typeof cbSuccess === "function") {
                                    cbSuccess(data, status, jqXHR);
                                }
                                $el.trigger('tabsX.success', [data, status, jqXHR]);
                            }, 300);
                        },
                        error: function (jqXHR, status, message) {
                            if (cbError && typeof cbError === "function") {
                                cbError(jqXHR, status, message);
                            }
                            $el.trigger('tabsX.error', [jqXHR, status, message]);
                        },
                        complete: function (jqXHR, status) {
                            $el.trigger('tabsX.click', [jqXHR, status]);
                        }
                    }, self.ajaxSettings);
                    $.ajax(settings);
                });
            });
        }
    };

    $.fn.tabsX = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('tabsX'),
                options = typeof option === 'object' && option;
            if (!data) {
                data = new TabsX(this, $.extend({}, $.fn.tabsX.defaults, options, $(this).data()));
                $this.data('tabsX', data);
            }
            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.tabsX.Constructor = TabsX;

    $.fn.tabsX.defaults = {
        enableCache: true,
        cacheTimeout: 300000,
        maxTitleLength: 9,
        ajaxSettings: {},
        successCallback: {},
        errorCallback: {}
    };

    $(document).on('ready', function () {
        $('.tabs-x').tabsX({});
    });
}(window.jQuery));