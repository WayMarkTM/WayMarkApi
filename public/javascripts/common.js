/**
 * Created by gromi on 2/21/2016.
 */
var app = 'http://localhost:3000/api/';
    consts = {},
    actions = {},
    messages = {};

actions.country = {
    get: app + 'country',
    add: app + 'country',
    delete: app + 'country/{id}',
};

actions.city = {
    get: app + 'city',
    add: app + 'city',
    delete: app + 'city/{id}',
};

actions.point = {
    get: app + 'point',
    add: app + 'point',
    delete: app + 'point/{id}'
};

messages = {
    errorOccured: 'The request has failed. An error occured.',
    successMessage: 'The request successfully processed.',
    deleteConfirmation: 'Are you sure you want to delete this record?',
};

window.actions = actions;
window.consts = consts;
window.messages = messages;