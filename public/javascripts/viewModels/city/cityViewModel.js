/**
 * Created by gromi on 3/3/2016.
 */
function CityViewModel(serverModel, countries) {
    var self = this;
    self.id = ko.observable();
    self.name = ko.observable();
    self.countryId = ko.observable();

    if (serverModel != null) {
        ko.mapping.fromJS(serverModel, {}, self);
    }

    self.countryName = ko.computed(function () {
        if (countries == null || countries.length == 0) {
            return '';
        }

        var searchResults = ko.utils.arrayFilter(countries, function (item) {
            return item.id == self.countryId();
        });

        if (searchResults.length > 0) {
            return searchResults[0].name;
        }

        return '';
    });

    return self;
}