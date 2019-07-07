'use strict';

// // Import the Dialogflow module from the Actions on Google client library.
// const {dialogflow} = require('actions-on-google');

// Import the Dialogflow module and response creation dependencies from the 
// Actions on Google client library.
const {
    dialogflow,
    Suggestions,
  } = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

const welcome_intent = 'Default Welcome Intent';
const fallback_intent = 'Default Fallback Intent';
// I know this looks terrible, will fix later.
const instrument_excuse = 'Default Welcome Intent - yes - yes';

app.intent(welcome_intent, (conv) => {
    conv.ask('Hi There! Do you have an event coming up which you would like to avoid?');
    conv.ask(new Suggestions('Yes', 'No'));
});

// User does not need an excuse. 
app.intent('Default Welcome Intent - no', (conv) => {
    // End conversation. 
    conv.close('Okay. Goodbye!');
});

// User needs an excuse.
app.intent('Default Welcome Intent - yes', (conv) => {
    conv.ask('Okay. Would you like an excuse about musical instruments?');
});

// User has chosen an excuse about musical instruments.
app.intent(instrument_excuse, (conv) => {
    conv.close('Alright. You could say that you need to tune your guitar.');
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
