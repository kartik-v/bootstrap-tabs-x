/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 1.3.0
 *
 * Bootstrap Tabs Extended - Extended Bootstrap Tabs with ability to align tabs 
 * in multiple ways, add borders, rotated titles, and more.
 *
 * For more JQuery/Bootstrap plugins and demos visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    isEmpty = function (value, trim) {
        return value === null || value === undefined || value == []
            || value === '' || trim && $.trim(value) === '';
    };
    
    kvTabsCache = {
        timeout: 300000,
        data: {},
        remove: function (url) {
            delete kvTabsCache.data[url];
        },
        exist: function (url) {
            return !!kvTabsCache.data[url] && ((new Date().getTime() - kvTabsCache.data[url]._) < kvTabsCache.timeout);
        },
        get: function (url) {
            return kvTabsCache.data[url].data;
        },
        set: function (url, cachedData, callback) {
            kvTabsCache.remove(url);
            kvTabsCache.data[url] = {
                _: new Date().getTime(),
                data: cachedData
            };
            if ($.isFunction(callback)) callback(cachedData);
        }
    };
            
    TabsX = function (element, options) {
        var self = this;
        self.$element = $(element);
        self.init(options);
        self.listen();
    };

    TabsX.prototype = {
        constructor: TabsX,
        init: function (options) {
            var self = this;
            self.options = options;
            $element = self.$element;
            self.$pane = $element.find('.tab-pane.active');
            self.$content = $element.find('.tab-content');
            self.$tabs = $element.find('.nav-tabs');
            self.isVertical = ($element.hasClass('tabs-left') || $element.hasClass('tabs-right'));
            self.isVerticalSide = self.isVertical && $element.hasClass('tab-sideways');
            kvTabsCache.timeout = options.cacheTimeout;
        },
        format: function ($tabLink, initialize) {
            var self = this, $element = self.$element, $pane = self.$pane, $content = self.$content,
                isVertical = self.isVertical, isVerticalSide = self.isVerticalSide, $tabs = self.$tabs,
                tabHeight = $tabs.outerHeight(), paneHeight = $pane.outerHeight(), tabWidth = $tabs.outerWidth(),
                h = tabHeight > paneHeight ? tabHeight : paneHeight + 20, contentHeight = $content.outerHeight(),
                isFixed = $element.is('[class^="tab-height-"]');

            if (isVerticalSide) {
                if (isFixed) {
                    if (tabHeight < contentHeight) {
                        $tabs.height(contentHeight);
                    }
                    return;
                }
                if ($tabLink.is(':last-child') && tabHeight > paneHeight && initialize) {
                    $element.height(h + 1);
                } else {
                    $element.height(h);
                }
            } else if (isVertical) {
                h = tabHeight > paneHeight ? tabHeight : paneHeight + 32;
                if ($element.hasClass('tabs-left')) {
                    $content.css('margin-left', tabWidth + 'px');
                } else if ($element.hasClass('tabs-right')) {
                    $content.css('margin-right', tabWidth + 'px');
                }
                if (isFixed) {
                    if (tabHeight < contentHeight) {
                        $tabs.height(contentHeight);
                    }
                    return;
                }
                $element.css('min-height', h + 'px');
                var contentHeight = $content.outerHeight(), parentHeight = $element.outerHeight();
                if (contentHeight > tabHeight) {
                    h = contentHeight < h ? contentHeight : parentHeight;
                    $tabs.css('min-height', h + 'px');
                } else {
                    $content.css('min-height', h + 'px');
                }
            }
        },
        listen: function() {
            var self = this, $element = self.$element, opts = self.options;
            $element.find('.nav-tabs [data-toggle="tab"]').on('shown.bs.tab', function (ev) {
                self.format($(this), false);
            });
            $element.find('.nav-tabs li.active [data-toggle="tab"]').each(function (ev) {
                self.format($(this), true);
            });
            $element.find('.nav-tabs li [data-toggle="tab"]').each(function (ev) {
                var $el = $(this), linkTxt = $el.text(), isVertical = self.isVertical,
                    maxLen = isEmpty($el.data('maxLength')) ? opts.maxTitleLength : $el.data('maxLength');

                if (isVertical && linkTxt.length > maxLen && isEmpty($el.attr('title'))) {
                    $el.attr('title', linkTxt);
                }
                $el.on('click', function (e) {
                    var vUrl = $(this).attr("data-url"), cacheData;
                    if (isEmpty(vUrl)) {
                        $el.trigger('tabsX.click');
                        return;
                    }
                    e.preventDefault();
                    var $tab = $(this.hash), $pane = $(this), $paneHeader = $pane,
                        css = $(this).attr("data-loading-class") || 'kv-tab-loading',
                        $element = $pane.closest('.dropdown');
                    if (!isEmpty($element.attr('class'))) {
                        $paneHeader = $element.find('.dropdown-toggle');
                    }
                    self.parseCache();
                    $.ajax({
                        type: 'post',
                        dataType: 'json',
                        url: vUrl,
                        cache: true,
                        beforeSend: function() {
                            $tab.html('<br><br><br>');
                            $paneHeader.removeClass(css).addClass(css);
                            $el.trigger('tabsX.beforeSend');
                        },
                        success: function(data) {
                            setTimeout(function() {
                                $tab.html(data);
                                $pane.tab('show');
                                $paneHeader.removeClass(css);
                            }, 100);
                            $el.trigger('tabsX.success', [data]);
                        },
                        error: function(request, status, message) {
                             $el.trigger('tabsX.error', [request, status, message]);
                        },
                    });
                    $el.trigger('tabsX.click');
                });        
            });
            
        },
        parseCache: function(vUrl) {
            var self = this, opts = self.options;
            if (!opts.enableCache) {
                return false;
            }
            $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                if (options.cache) {
                    var beforeSend = originalOptions.beforeSend || $.noop,
                        success = originalOptions.success || $.noop,
                        url = originalOptions.url;
                    //remove jQuery cache as we have our own kvTabsCache
                    options.cache = false;
                    options.beforeSend = function () {
                        beforeSend();
                        if (kvTabsCache.exist(url)) {
                            success(kvTabsCache.get(url));
                            return false;
                        }
                        return true;
                    };
                    options.success = function (data) {
                        kvTabsCache.set(url, data, success);
                    };
                }
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
                $this.data('tabsX', (data = new TabsX(this, $.extend({}, $.fn.tabsX.defaults, options, $(this).data()))));
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.tabsX.defaults = {
        enableCache: true,
        cacheTimeout: 300000,
        maxTitleLength: 9
    };
    
    $(document).on('ready', function () {
        $('.tabs-x').tabsX({});
    });
}(jQuery)); 