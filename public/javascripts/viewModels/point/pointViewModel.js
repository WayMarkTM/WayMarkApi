/**
 * Created by gromi on 3/17/2016.
 */
function PointViewModel(serverModel) {
    var self = this,
        mapping = {
            'LocalizedPoints': {
                create: function (options) {
                    return new window.LocalizedPointViewModel(options.data);
                }
            }
        };

    self.id = ko.observable();
    self.latitude = ko.observable();
    self.longitude = ko.observable();
    self.LocalizedPoints = ko.observableArray();

    if (serverModel != null) {
        ko.mapping.fromJS(serverModel, mapping, self);
    }

    self.availableLanguages = ko.computed(function () {
        return self.LocalizedPoints().map(function (item) { return item.language(); }).join(', ');
    });

    self.addLocalization = function () {
        self.LocalizedPoints.push(new LocalizedPointViewModel())
    };

    return self;
};