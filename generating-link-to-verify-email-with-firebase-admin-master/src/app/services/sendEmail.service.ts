import sendgrid from '@sendgrid/mail';
import nodemailer from 'nodemailer'


const apiKey = process.env.SENDGRID_APIKEY
sendgrid.setApiKey(apiKey);

const transporter = nodemailer.createTransport({
  host: "host",
  port: 333,
  auth: {
    user: "user",
    pass: "password"
  }
})
export const sendEmail = async  (email, message) => {
  try {
    const sended = await transporter.sendMail({
      from: "Francisco Inoque",
      to: email,
      subject: "Email Verification",
      html: `${message}`
    })

    return await sended
  } catch (error) {
    return await error
  }              
}


