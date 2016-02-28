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

messages = {
    errorOccured: 'The request has failed. An error occured.',
    successMessage: 'The request successfully processed.',
    deleteConfirmation: 'Are you sure you want to delete this record?',
};

window.actions = actions;
window.consts = consts;
window.messages = messages;