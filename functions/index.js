// Apologies for hurting any eyes due to my current ignorance of JavaScript style

'use strict';

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
const animal_excuse = 'Default Welcome Intent - yes - animals';
const instrument_excuse = 'Default Welcome Intent - yes - instruments';
const instrument_excuse_good = 'Default Welcome Intent - yes - instruments - yes';

app.intent(welcome_intent, (conv) => {
    conv.ask('Hi There! Do you have an event coming up which you would like to avoid?');
    conv.ask(new Suggestions('Yes', 'No'));
});

// User does not need an excuse. 
app.intent('Default Welcome Intent - no', (conv) => {
    // End conversation. 
    conv.close('Okay. Goodbye!');
});

// User would like an excuse.
// Ask User for excuse about instruments or animals.
app.intent('Default Welcome Intent - yes', (conv) => {
    conv.ask('Okay. Would you like an excuse about musical instruments or animals?');
});

// User chose animal excuse.
app.intent(animal_excuse, (conv) => {
    conv.close('Alright. You could say that you need to give your cat a bath.');
});

// User chose instrument excuse. 
app.intent(instrument_excuse, (conv) => {
    conv.ask('Alright. You could say that you need to tune your guitar. \
    Is this excuse satisfactory?');
});

// User is satisfied with instrument excuse. End conversation.
app.intent(instrument_excuse_good, (conv) => {
    conv.close('Great. Good luck!');
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
