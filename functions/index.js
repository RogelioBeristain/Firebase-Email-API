const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const app = express();

app.use(cors({origin: true}));

app.post('/',(req,res)=>{
    const {body} = req;
    const isValidMessage = body.message && body.to && body.subject;
    
    const fileID = body.fileName;
    if(!isValidMessage){
        return res.status(400).send({message: 'invalid request'});
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const files = {
        'file1': {
            filename:'MateralPro.doc',
            filePath:'doc-test/Doc1.docx'
        },
        'file2': {
            filename:'MateralPro.doc',
            filePath:'doc-test/Doc1.docx'
        },
        'file3': {
            filename:'MateralPro.doc',
            filePath:'doc-test/Doc1.docx'
        },
        'file4': {
            filename:'MateralPro.doc',
            filePath:'doc-test/Doc1.docx'
        }
    
    }

    const mailOptions = {
        from: process.env.EMAIL,
        to: body.to,
        subject: body.subject,
        text: body.message,
        attachments: [
            {   // file on disk as an attachment
                filename: files.file1.filename,
                path: 'doc-test/Doc1.docx' // stream this file
            },
            {   // file on disk as an attachment
                filename: 'MaterialPremium.pdf',
                path: 'doc-test/Doc1.pdf' // stream this file
            },
            
        ]
    }

    transporter.sendMail(mailOptions, 
        ( err, data)=>{
            if(err){
                return res.status(500).send({message: 'Error' + err.message});
            }
            return res.send({message:'Correo Enviado'});
        });


})

exports.mailer = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
