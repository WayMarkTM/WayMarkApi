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
                beforeSend: function (req) {
                    req.setRequestHeader("Authorization", "Bearer 12345")
                },
                type: type,
                data: ajaxOptions.data,
                traditional: params.traditional,
                dataType: params.dataType,
                contentType: params.contentType,
                cache: params.cache
            }).done(function (result) {
                if (result) {
                    if (result.isNotAuthenticated && result.redirectTo) {
                        window.location.href = result.redirectTo;
                        d.resolve();
                        return;
                    }

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

waymarkApp.namespace('waymarkApp.utilities.cookieHelper');
waymarkApp.utilities.cookieHelper = (function () {
    return {
        getCookie: function(name) {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        },
        setCookie: function (name, value, options) {
            options = options || {};

            var expires = options.expires;

            if (typeof expires == "number" && expires) {
                var d = new Date();
                d.setTime(d.getTime() + expires * 1000);
                expires = options.expires = d;
            }
            if (expires && expires.toUTCString) {
                options.expires = expires.toUTCString();
            }

            value = encodeURIComponent(value);

            var updatedCookie = name + "=" + value;

            for (var propName in options) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];
                if (propValue !== true) {
                    updatedCookie += "=" + propValue;
                }
            }

            document.cookie = updatedCookie;
        },
        deleteCookie: function (name) {
            setCookie(name, "", {
                expires: -1
            })
        }
    };
})();