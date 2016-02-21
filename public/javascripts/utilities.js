/**
 * Created by gromi on 2/21/2016.
 */
var waymarkApp = waymarkApp || {};

waymarkApp.namespace = function (nsString) {
    var parts = nsString.split('.'),
        parent = waymarkApp,
        i;
    if (parts[0] === "waymarkApp") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

waymarkApp.namespace('waymarkApp.utilities.ajaxHelper');
waymarkApp.utilities.ajaxHelper = (function (jQuery, t) {
    var getDefaultParams = function() {
            return {
                traditional: true,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                cache: false
            }
        },
        ajax = function (ajaxOptions, type, options) {
            var d = jQuery.Deferred();
            var params = getDefaultParams();
            jQuery.extend(params, ajaxOptions);
            jQuery.ajax({
                url: ajaxOptions.url,
                type: type,
                data: ajaxOptions.data,
                traditional: params.traditional,
                dataType: params.dataType,
                contentType: params.contentType,
                cache: params.cache
            }).done(function (result) {
                if (result) {
                    d.resolve(result);
                } else {
                    d.reject(result);
                }
            }).fail(function () {
                t.error(window.messages.errorOccured);
                d.reject();
            });

            return d;
        };
    return {
        post: function (ajaxOptions, options) {
            return ajax(ajaxOptions, "POST", options);
        },
        get: function (ajaxOptions, options) {
            return ajax(ajaxOptions, "GET", options);
        },
        delete: function (ajaxOptions) {
            return ajax(ajaxOptions, "DELETE")
        }
    };
})($, toastr);