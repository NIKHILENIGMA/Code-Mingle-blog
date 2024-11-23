import nodemailer from 'nodemailer'


export const tranformer = nodemailer.createTransport({
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }   
})

