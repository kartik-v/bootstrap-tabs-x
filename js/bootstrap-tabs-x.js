/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 1.0.0
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
function kvExtendTabs($el, reduce) {
    var $parent = $el.closest('.tabbable'),
        chk2 = ($parent.hasClass('tabs-left') || $parent.hasClass('tabs-right')),
        chk1 = chk2 && $parent.hasClass('sideways');
    if (chk1) {
        var $tabs = $parent.find('.nav-tabs'), $pane = $parent.find('.tab-pane.active'),
            $content = $parent.find('.tab-content'),
            tabHeight = $tabs.outerHeight(), paneHeight = $pane.outerHeight(),
            h = tabHeight > paneHeight ? tabHeight : paneHeight + 20;
        if ($el.is(':last-child') && tabHeight > paneHeight && reduce) {
            $parent.height(h + 1);
        } else {
            $parent.height(h);
        }
    } else if (chk2) {
        var $tabs = $parent.find('.nav-tabs'), $pane = $parent.find('.tab-pane.active'),
            $content = $parent.find('.tab-content'),
            tabHeight = $tabs.outerHeight(), paneHeight = $pane.outerHeight(),
            tabWidth = $tabs.outerWidth(),
            h = tabHeight > paneHeight ? tabHeight : paneHeight + 20;
        if ($parent.hasClass('tabs-left') && $content.hasClass('tab-bordered')) {
            $content.attr('style', 'margin-left: ' + tabWidth + 'px');
        } else if ($parent.hasClass('tabs-right') && $content.hasClass('tab-bordered')) {
            $content.attr('style', 'margin-right: ' + tabWidth + 'px');
        }
        if ($el.is(':last-child') && tabHeight > paneHeight && reduce) {
            $parent.height(h - 2);
        } else {
            $parent.height(h);
        }
    }
}
$(document).on('ready', function(){
    $('.nav-tabs [data-toggle="tab"]').on('shown.bs.tab', function(ev) {
        kvExtendTabs($(this), false);
    });
    $('.nav-tabs li.active [data-toggle="tab"]').each(function(ev) {
        kvExtendTabs($(this), true);
    });
    $('.nav-tabs li  [data-toggle="tab"]').each(function(ev) {
        var  $el = $(this), linkTxt = $el.text(), $parent = $el.closest('.tabbable'),
            chk = ($parent.hasClass('tabs-left') || $parent.hasClass('tabs-right')) && $parent.hasClass('sideways');

        if (chk && linkTxt.length > 12 && isEmpty($el.attr('title'))) {
            $el.attr('title', linkTxt);
        }
    });
});