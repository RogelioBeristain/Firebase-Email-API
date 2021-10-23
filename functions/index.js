const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const app = express();
app.post('/',(req,res)=>{
    const {body} = req;
    const isValidMessage = body.message && body.to && body.subject;
    
    const fileID = body.fileName;
    if(!isValidMessage){
        return res.status(400).send({message: 'invalid request'});
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com ',
        port: 465,
        service: 'gmail',
        auth: {
            user: "rogelio26.dev@gmail.com",
            pass: "a1e2i3o4u5R"
        }
    });

    const files = {
        'file1': {
            filename:'MateralPro.doc',
            path:'doc-test/Doc1.docx'
        },
        'file2': {
            filename:'MateralPro.doc',
            path:'doc-test/Doc1.docx'
        },
        'file3': {
            filename:'MateralPro.doc',
            path:'doc-test/Doc1.docx'
        },
        'file4': {
            filename:'MateralPro.doc',
            path:'doc-test/Doc1.docx'
        }
    
    }

    const mailOptions = {
        from: process.env.EMAIL,
        to: body.to,
        subject: body.subject,
        text: body.message,
        attachments: [
            files[fileID],
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
app.use(cors());

exports.mailer = functions.https.onRequest(app);
