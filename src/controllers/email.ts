import sgMail from '@sendgrid/mail'
import type { Request, Response } from 'express'

if (!process.env.SENDGRID_API_KEY) {
   throw new Error('No SendGrid API key provided')
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function createEmail(req: Request, type: 'info' | 'response') {
   const { firstName, lastName, email, phone, message } = req.body

   return {
      to: type === 'info' ? 'Contact@whitelist-crypto.io' : email,
      from: 'no-reply@whitelist-crypto.io',
      templateId:
         type === 'info'
            ? 'd-88ac0331c39c4ca59ea1f74fb46e771b'
            : 'd-d9012c8e67134bee83a6d1da131bcc1a',
      dynamic_template_data: {
         firstName,
         lastName,
         email,
         phone,
         message
      }
   }
}

/**
 * Send the emails. Will return a response to indicate success or failure.
 * If the value for the email is null, then it was successful. If failed,
 * it will return the error object.
 */
async function sendMail(req: Request, res: Response) {
   const response = await sgMail
      .send(createEmail(req, 'response'))
      .then(() => null)
      .catch((err) => err)
   const info = await sgMail
      .send(createEmail(req, 'info'))
      .then(() => null)
      .catch((err) => err)

   if (info) {
      console.error(info)
   }

   if (response) {
      console.error(response)
   }

   if (info && response) {
      res.status(400)
   } else {
      res.status(200)
   }

   res.send({
      info,
      response
   })
}

export default sendMail
