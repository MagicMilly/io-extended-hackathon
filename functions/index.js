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
const instrument_excuse_bad = 'Default Welcome Intent - yes - instruments - no';
const animal_excuse_good = 'Default Welcome Intent - yes - animals - yes';
const animal_excuse_bad = 'Default Welcome Intent - yes - animals - no';

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
    conv.ask('Okay. Please choose an excuse category: Musical Instruments or Animals?');
    conv.ask(new Suggestions('Musical Instruments', 'Animals'));
});

// User chose animal excuse.
app.intent(animal_excuse, (conv) => {
    conv.ask('Alright. You could say that you need to give your cat a bath. Is this \
    excuse satisfactory?');
    conv.ask(new Suggestions('Yes', 'No'));
});

// User is satisfied with animal excuse.
app.intent(animal_excuse_good, (conv) => {
    conv.close('Great choice. Good luck and have fun!');
});

// User is not satisfied with animal excuse.
app.intent(animal_excuse_bad, (conv) => {
    conv.close('I am afraid the only other excuse I have to offer at this time is \
    that you need to tune your guitar. Good luck!');
});

// User chose instrument excuse. 
app.intent(instrument_excuse, (conv) => {
    conv.ask('Alright. You could say that you need to tune your guitar. \
    Is this excuse satisfactory?');
    conv.ask(new Suggestions('Yes', 'No'));
});

// User is satisfied with instrument excuse. End conversation.
app.intent(instrument_excuse_good, (conv) => {
    conv.close('Great. Good luck!');
});

// User is not satisfied with the instrument excuse, so give them the cat bath excuse.
// End conversation.
app.intent(instrument_excuse_bad, (conv) => {
    conv.close('Well, the only other excuse I can suggest at this time is that you have \
    to give your cat a bath. Good luck!');
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
