import request from 'supertest'
import sgMail from '@sendgrid/mail'
import app from '../app'
import { EmailResponse } from 'types/Email'

jest.mock('@sendgrid/mail')

const { ROUTE_VERSION = '/v1' } = process.env
const route = (path: string) => [ROUTE_VERSION, path].join('')

describe('POST /contact', () => {
   it('returns 400 status code on invalid input', async () => {
      const response: EmailResponse = {
         success: false,
         emails: {
            response: -1,
            info: -1
         },
         errors: {
            firstName: 'Missing first name',
            lastName: 'Missing last name',
            email: 'Missing email',
            message: 'Missing message'
         }
      }

      await request(app)
         .post(route('/contact'))
         .expect(400)
         .expect((res) => {
            expect(sgMail.send).toBeCalledTimes(0)
            expect(res.body).toEqual(response)
         })
   })

   it('returns 200 status code on valid input', async () => {
      const mockSend = sgMail.send as jest.Mock
      const response: EmailResponse = {
         success: true,
         emails: {
            response: 202,
            info: 202
         },
         errors: {}
      }

      // Mock a reponse for SendGrid as if the emails were sent successfully
      mockSend.mockResolvedValue([{ statusCode: 202 }, null])

      await request(app)
         .post(route('/contact'))
         .send({
            firstName: 'john',
            lastName: 'doe',
            email: 'test@test.com',
            phone: '360-123-1234',
            message: 'some message'
         })
         .expect(200)
         .expect((res) => {
            expect(sgMail.send).toBeCalledTimes(2)
            expect(res.body).toEqual(response)
         })
   })
})
