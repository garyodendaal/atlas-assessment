import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import env from '../env';

// TODO: CHANGE ETHEREAL EMAIL CREDENTIALS

let email = env.SMTP_EMAIL;
let password = env.SMTP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: email,
    pass: password,
  },
});

/**
 * Send an email from AWS SES
 * @param {string|string[]} toEmail - The email address to send to
 * @param {string} emailHtml - The HTML content of the email
 * @param {string} subject - The subject of the email
 * @param {string} attachments - The attachments of the email
 * @returns {Promise<SendEmailResponse | null>} - The response from the AWS SES send email command
 */
const sendEmail = async (
  toEmail: string | string[],
  emailHtml: string,
  subject: string,
  attachments: Mail.Attachment[] = []
): Promise<SMTPTransport.SentMessageInfo> => {
  return await transporter.sendMail({
    from: email,
    to: toEmail,
    subject,
    html: emailHtml,
    attachments,
  });
};

const NodeMailer = {
  sendEmail,
};

export default NodeMailer;
