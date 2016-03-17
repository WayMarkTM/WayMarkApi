/**
 * Created by gromi on 3/17/2016.
 */
function PointPageViewModel(serverModel) {
    var self = this,
        mapping = {
            'points': {
                create: function (options) {
                    return new window.PointViewModel(options.data);
                }
            },
            'languages': {
                create: function (options) {
                    return new window.LanguageViewModel(options.data);
                }
            }
        };

    self.points = ko.observableArray();
    self.languages = ko.observableArray();

    self = ko.mapping.fromJS(serverModel, mapping);

    self.newPoint = ko.observable(new PointViewModel());

    self.addPoint = function () {
        self.newPoint().id(0);
        waymarkApp.utilities.ajaxHelper.post({
            url: window.actions.point.add,
            data: ko.mapping.toJSON(self.newPoint)
        }).done(function (point) {
            self.points.push(point);
            self.newPoint(new PointViewModel());
            toastr.success(window.messages.successMessage);
        });
    };

    self.deletePoint = function (point) {
        if (confirm(window.messages.deleteConfirmation)) {
            waymarkApp.utilities.ajaxHelper.delete({
                url: window.actions.point.delete.replace('{id}', point.id())
            }).done(function () {
                self.points.remove(point);
                toastr.success(window.messages.successMessage);
            });
        }
    };

    self.loadPoint = function (point) {
        self.newPoint(point);
    };

    return self;
};