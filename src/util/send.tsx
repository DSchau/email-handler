import * as React from 'react';
import * as nodeMailer from 'nodemailer';
import * as EmailTemplate from '@dschau/email-template';

import { toJson } from './to-json';
import { inky } from './inky';
import { htmlTemplate } from './html-template';
import { validator } from './validator';

import { EmailBody } from '../interfaces';

export async function send(body: string): Promise<nodeMailer.SentMessageInfo> {
  const data: EmailBody = toJson(body);
  
  await validator.validate(data);

  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dustinschau+website@gmail.com',
      pass: process.env['GMAIL_PASSWORD']
    }
  });

  const html = await htmlTemplate(EmailTemplate, data);
  const options = {
    from: `"${data.name}" <${data.email || 'dustinschau@gmail.com'}>`,
    to: 'dustinschau+website@gmail.com',
    subject: data.subject || 'Hello from dustinschau.com',
    html
  };

  return (await new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  })) as nodeMailer.SentMessageInfo;
}
