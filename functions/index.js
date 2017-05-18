var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

var admin = require('firebase-admin');

var moment = require('moment');
var nodemailer = require('nodemailer');

admin.initializeApp(functions.config().firebase);

var emailSender = require('./modules/emails/sender');

exports.saveUser = functions.auth.user().onCreate(function(event){
    var user = event.data;

    var userData = {
        email: user.email,
        registrationDate: moment().format("YYYY-MM-DD HH:mm"),
        lastLoginDate: moment().format("YYYY-MM-DD HH:mm"),
        isPremiumAccount: true,
        premiumExpirationDate: moment().add(1, 'month').format("YYYY-MM-DD")
    }

    emailSender.sendWelcomeEmail(userData.email);

    return admin.database().ref('users/' + user.uid).set(userData);

});

exports.cleanupUserData = functions.auth.user().onDelete(function(event) {
    var uid = event.data.uid;

    admin.database().ref('users/' + uid).remove();
    admin.database().ref('userDb/' + uid).remove();
});

exports.sendEmail = functions.https.onRequest(function(req, res){

});
