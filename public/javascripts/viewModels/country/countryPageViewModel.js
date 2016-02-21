/**
 * Created by gromi on 2/21/2016.
 */
function CountryPageViewModel(serverModel) {
    var self = this,
        mapping = {
            create: function (options) {
                return new window.CountryViewModel(options.data);
            }
        };

    self.countries = ko.observableArray();
    self.countries = ko.mapping.fromJS(serverModel, mapping);

    self.newCountry = ko.observable(new CountryViewModel());

    self.addCountry = function () {
        self.newCountry().id(0);
        waymarkApp.utilities.ajaxHelper.post({
            url: window.actions.country.add,
            data: ko.mapping.toJSON(self.newCountry)
        }).done(function (country) {
            self.countries.push(country);
            self.newCountry(new CountryViewModel());
            toastr.success(window.messages.successMessage);
        });
    };

    self.deleteCountry = function (country) {
        if (confirm(window.messages.deleteConfirmation)) {
            waymarkApp.utilities.ajaxHelper.delete({
                url: window.actions.country.delete.replace('{id}', country.id())
            }).done(function () {
                self.countries.remove(country);
                toastr.success(window.messages.successMessage);
            });
        }
    };

    return self;
};