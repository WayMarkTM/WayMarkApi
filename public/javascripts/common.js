/**
 * Created by gromi on 2/21/2016.
 */
var app = 'http://localhost:3000/';
    consts = {},
    actions = {},
    messages = {};

actions.country = {
    get: app + 'country',
    add: app + 'country',
};

messages = {
    errorOccured: 'The request has failed. An error occured.',
    successMessage: 'The request successfully processed.',
};

window.actions = actions;
window.consts = consts;
window.messages = messages;