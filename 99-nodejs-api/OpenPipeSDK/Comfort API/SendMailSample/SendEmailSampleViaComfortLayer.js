'use strict';
var ConnectRuntime = require('../Bindings/njs/opn.js');  /*import Comfort api*/
const nodemailer = require('nodemailer');  /* Node Js Module*/
const fs = require('fs');
const path = require('path');
const smptOptions = JSON.parse(fs.readFileSync(path.normalize(path.join('.', 'smtpServerOptions.json'))).toString());
if (!smptOptions.proxy) { // take proxy from env when it is not set in options
	smptOptions.proxy =  process.env.http_proxy;
}

// used to collect the tag values needed within the email
let emailText = "";	
var tagsReadCompleted = []; // Array to store read tags received from runtime
var tagsToRead = [];   // Array to store to be read tags
tagsToRead.push("Otto");
tagsToRead.push("Franz");



/* Connect To runtime*/
ConnectRuntime.Connect((runtimeClass) => {
	let runtime = runtimeClass.Runtime;
	runtime.on('NotifySubscribeTag',(tagsList, cookie) => {
		
		for (let tagobject of tagsList) {
			if (tagobject.Name == 'TriggerTag1') {
				runtime.ReadTag(tagsToRead, "ReadTagCookie");
			}
		}
		
	});
	runtime.on('NotifyReadTag',(tagsList, cookie)  => {				
				SendEmailHandler(tagsList);							
	});
	/* Subscribe Tag*/
	runtime.SubscribeTag(['TriggerTag1'],"SubscribeTagCookie");
});



/*Send Email function*/
function SendEmailHandler(tagsList)
{
	/* Since this sample is written with 'SetOption EnableExpertMode' via comfort layer, then response will be always in JSON mode */
	if (tagsList) 
	{	
			
		for (let tagData of tagsList) {
		//Preparing email text
		emailText += 'Tag '+tagData.Name+'= '+tagData.Value+'\n';
		tagsReadCompleted.push(tagData.Name);
		}
		
		/*Check whether all tags read or not, if read send e-mail*/
		if(compare(tagsReadCompleted,tagsToRead))
		{
			console.log("Emailtext : "+emailText);
			tagsReadCompleted = [];
		
			let params = {
				from: 'arvindse2019@gmail.com',
				to: 'ananda.cs@siemens.com',
				subject: 'Demo for sending an email from OpenPipe',
				body: 'This is a test\n\n' + emailText
			};
			
			sendEmail(params).then((error) => {
				console.log(`Send Email succeeded`);
				
				
			}).catch((error) => {
				console.log(`Send Email failed, error ${error}`);
				
			});
			emailText = "";
		}

		// ****************************************************************************
	}
		
}
// async function, returns Promise
function sendEmail(params) {
    return new Promise(function (resolve, reject) {
        let transporter = nodemailer.createTransport(smptOptions);
        transporter.sendMail({ from: params.from, to: params.to, subject: params.subject, text: params.body },
            function (err) {
                if (err) {
                    console.log(`send: err = ${err}`);
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

/*Array Compare function*/
function compare(a, b) {
	a.sort();
	b.sort();
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length != b.length) return false;

	for (var i = 0; i < a.length; ++i) {
	if (a[i] !== b[i]) return false;
	}
	return true;
}