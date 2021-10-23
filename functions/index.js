const functions = require("firebase-functions");
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});


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

admin.initializeApp ()
/* if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
} */

let transporter = nodemailer.createTransport({
    host: "mail.softwareconsentido.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: "info@softwareconsentido.com",
        pass: "a1e2i3o4u5R102088",
    }
});
exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        const {body} = req;
    const isValidMessage = body.message && body.to && body.subject;

    if(!isValidMessage){
        return res.status(400).send({message: 'invalid request'});
    }
    
    const fileID = body.fileName;

        const mailOptions = {
            from: process.env.EMAIL,
            to: body.to,
            subject: body.subject,
            text: body.message,
            attachments: [
                files[fileID],
            ]
        }


        return transporter.sendMail(mailOptions,( err, data)=>{
                if(err){
                    return res.status(500).send({message: 'Error' + err.message});
                }
                return res.send({message:'Correo Enviado'});
            });
    
    
    });
});


