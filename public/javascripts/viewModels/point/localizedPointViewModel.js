/**
 * Created by gromi on 3/17/2016.
 */
function LocalizedPointViewModel(serverModel) {
    var self = this;
    self.id = ko.observable();
    self.name = ko.observable();
    self.language = ko.observable();
    self.description = ko.observable();

    if (serverModel != null) {
        ko.mapping.fromJS(serverModel, {}, self);
    }

    return self;
};