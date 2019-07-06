'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// // Import the Dialogflow module and response creation dependencies from the 
// // Actions on Google client library.
// // const {
// //     dialogflow,
// //     Permission,
// //     Suggestions,
// //     BasicCard,
// //   } = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

const welcome_intent = 'Default Welcome Intent';
const fallback_intent = 'Default Fallback Intent';
const need_excuse_intent = 'NeedExcuse';

app.intent(welcome_intent, (conv) => {
    conv.ask("Hi There! Do you have an event coming up which you would like to avoid?");
});

app.intent('Default Welcome Intent - no', (conv) => {
    // I am just trying to hard code something that will actually work, please work 
    conv.close('Okay. Goodbye!');
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
