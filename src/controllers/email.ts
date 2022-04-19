import sgMail from '@sendgrid/mail'
import type { NextFunction, Request, Response } from 'express'
import type { EmailResponse } from 'types/Email'

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
async function sendMail(req: Request, res: Response, next: NextFunction) {
   const response: EmailResponse = {
      success: false,
      errors: {},
      emails: {
         info: -1,
         response: -1
      }
   }

   if (!req.body.firstName) {
      response.errors.firstName = 'Missing first name'
   }
   if (!req.body.lastName) {
      response.errors.lastName = 'Missing last name'
   }
   if (!req.body.email || req.body.email === '@') {
      response.errors.email = 'Missing email'
   }
   if (!req.body.message) {
      response.errors.message = 'Missing message'
   }

   if (Object.keys(response.errors).length > 0) {
      res.status(400).send(response)
      return next()
   }

   try {
      const [result, err] = await sgMail.send(createEmail(req, 'response'))

      if (!err) {
         response.emails.response = result.statusCode
      }
   } catch (err) {
      console.error(err)
   }

   try {
      const [result, err] = await sgMail.send(createEmail(req, 'info'))

      if (!err) {
         response.emails.info = result.statusCode
      }
   } catch (err) {
      console.error(err)
   }

   response.success = response.emails.response <= 202 || response.emails.info <= 202

   res.status(response.success ? 200 : 400).send(response)
}

export default sendMail
