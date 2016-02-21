/**
 * Created by gromi on 2/21/2016.
 */
function CountryViewModel(serverModel) {
    var self = this;
    self.id = ko.observable();
    self.name = ko.observable();
    self.abbreviation = ko.observable();

    if (serverModel != null) {
        ko.mapping.fromJS(serverModel, {}, self);
    }

    return self;
};