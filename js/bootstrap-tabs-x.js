/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 1.1.0
 *
 * Bootstrap Tabs Extended - Extended Bootstrap Tabs with ability to align tabs 
 * in multiple ways, add borders, rotated titles, and more.
 *
 * For more JQuery/Bootstrap plugins and demos visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
var isEmpty = function (value, trim) {
    return value === null || value === undefined || value == []
        || value === '' || trim && $.trim(value) === '';
};
var kvFormatTabs = function ($el, initialize) {
    var $parent = $el.closest('.tabs-x'),
        isVertical = ($parent.hasClass('tabs-left') || $parent.hasClass('tabs-right')),
        isVerticalSide = isVertical && $parent.hasClass('tab-sideways'), $tabs = $parent.find('.nav-tabs'),
        $pane = $parent.find('.tab-pane.active'), $content = $parent.find('.tab-content'),
        tabHeight = $tabs.outerHeight(), paneHeight = $pane.outerHeight(), tabWidth = $tabs.outerWidth(),
        h = tabHeight > paneHeight ? tabHeight : paneHeight + 20, contentHeight = $content.outerHeight(),
        isFixed = $parent.is('[class^="tab-height-"]');

    if (isVerticalSide) {
        if (isFixed) {
            if (tabHeight < contentHeight) {
                $tabs.height(contentHeight);
            }
            return;
        }
        if ($el.is(':last-child') && tabHeight > paneHeight && initialize) {
            $parent.height(h + 1);
        } else {
            $parent.height(h);
        }
    } else if (isVertical) {
        h = tabHeight > paneHeight ? tabHeight : paneHeight + 32;
        if ($parent.hasClass('tabs-left')) {
            $content.css('margin-left', tabWidth + 'px');
        } else if ($parent.hasClass('tabs-right')) {
            $content.css('margin-right', tabWidth + 'px');
        }
        if (isFixed) {
            if (tabHeight < contentHeight) {
                $tabs.height(contentHeight);
            }
            return;
        }
        $parent.css('min-height', h + 'px');
        var contentHeight = $content.outerHeight(), parentHeight = $parent.outerHeight();
        if (contentHeight > tabHeight) {
            h = contentHeight < h ? contentHeight : parentHeight;
            $tabs.css('min-height', h + 'px');
        } else {
            $content.css('min-height', h + 'px');
        }
    }
}
$(document).on('ready', function () {
    $('.nav-tabs [data-toggle="tab"]').on('shown.bs.tab', function (ev) {
        kvFormatTabs($(this), false);
    });
    $('.nav-tabs li.active [data-toggle="tab"]').each(function (ev) {
        kvFormatTabs($(this), true);
    });
    $('.nav-tabs li a').each(function (ev) {
        var $el = $(this), linkTxt = $el.text(), $parent = $el.closest('.tabs-x'),
            isVertical = ($parent.hasClass('tabs-left') || $parent.hasClass('tabs-right')) && $parent.hasClass('tab-sideways'),
            maxLen = isEmpty($el.data('maxLength')) ? 9 : $el.data('maxLength');

        if (isVertical && linkTxt.length > maxLen && isEmpty($el.attr('title'))) {
            $el.attr('title', linkTxt);
        }
    });
    $('.nav-tabs li a').click(function (e) {
        var vUrl = $(this).attr("data-url");
        if (isEmpty(vUrl)) {
            return;
        }
        e.preventDefault();
        var $tab = $(this.hash), $pane = $(this),
            css = $(this).attr("data-loading-class") || 'kv-tab-loading';
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: vUrl,
            beforeSend: function() {
                $pane.removeClass(css).addClass(css);
            },
            success: function(data) {
                $tab.html(data.responseJSON);
                $pane.tab('show');
                $pane.removeClass(css);
            }
        });
    });

// load first tab content
$('#home').load($('.active a').attr("data-url"),function(result){
  $('.active a').tab('show');
});

});