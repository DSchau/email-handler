import * as React from 'react';
import * as nodeMailer from 'nodemailer';
import * as EmailTemplate from '@dschau/email-template';

import { toJson } from './to-json';
import { inky } from './inky';
import { htmlTemplate } from './html-template';
import { validator } from './validator';

interface Body {
  name: string;
  message: string;
  email?: string;
  subject?: string;
}

export async function send(body: string): Promise<nodeMailer.SentMessageInfo> {
  const data: Body = toJson(body);
  const required = ['name', 'message'];
  const valid = validator(data, required);
  if (!valid) {
    return Promise.reject(
      new Error('[Data Validation]: Required fields not present')
    );
  }

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
