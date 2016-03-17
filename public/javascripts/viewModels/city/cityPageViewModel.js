/**
 * Created by gromi on 3/3/2016.
 */
function CityPageViewModel(serverModel) {
    var self = this,
        mapping = {
            'cities': {
                create: function (options) {
                    return new window.CityViewModel(options.data, serverModel.countries);
                }
            },
            'countries': {
                create: function (options) {
                    return new window.CountryViewModel(options.data);
                }
            }
        };

    self.cities = ko.observableArray();
    self.countries = ko.observableArray();

    self = ko.mapping.fromJS(serverModel, mapping);

    self.newCity = ko.observable(new CityViewModel());

    self.addCity = function () {
        self.newCity().id(0);
        waymarkApp.utilities.ajaxHelper.post({
            url: window.actions.city.add,
            data: ko.mapping.toJSON(self.newCity)
        }).done(function (city) {
            self.cities.push(city);
            self.newCity(new CityViewModel());
            toastr.success(window.messages.successMessage);
        });
    };

    self.deleteCity = function (city) {
        if (confirm(window.messages.deleteConfirmation)) {
            waymarkApp.utilities.ajaxHelper.delete({
                url: window.actions.city.delete.replace('{id}', city.id())
            }).done(function () {
                self.cities.remove(city);
                toastr.success(window.messages.successMessage);
            });
        }
    };

    return self;
};