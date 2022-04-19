import request from 'supertest'
import app from '../app'
import db from '../database'
import type { QueryResult } from 'pg'

jest.mock('../database')

const { ROUTE_VERSION = '/v1' } = process.env
const route = (path: string) => [ROUTE_VERSION, path].join('')

describe('GET /products', () => {
   it('returns array of products', async () => {
      ;(db.query as jest.Mock).mockResolvedValue({
         rows: [1, 2, 3],
         rowCount: 3
      } as Partial<QueryResult>)

      await request(app)
         .get(route('/products'))
         .expect(200)
         .expect((res) => {
            expect(db.query).toBeCalledTimes(1)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body).toHaveLength(3)
         })
   })
})

describe('GET /products/:id', () => {
   it('returns 204 status code on invalid ID', async () => {
      ;(db.query as jest.Mock).mockResolvedValue({
         rows: [],
         rowCount: 0
      } as Partial<QueryResult>)

      await request(app).get(route('/products/SOME_BAD_ID')).expect(204, {})
   })

   it('valid ID param returns array with single item', async () => {
      ;(db.query as jest.Mock).mockResolvedValue({
         rows: [1],
         rowCount: 1
      } as Partial<QueryResult>)

      await request(app)
         .get(route('/products/SOME_VALID_ID'))
         .expect(200)
         .expect((res) => {
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body).toHaveLength(1)
         })
   })
})
