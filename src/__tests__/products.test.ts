import request from 'supertest'
import app from '../app'
import db from '../database'
import type { QueryResult } from 'pg'

jest.mock('../database')

const { ROUTE_VERSION = '/v1' } = process.env
const route = (path: string) => [ROUTE_VERSION, path].join('')
const mockQuery = db.query as jest.Mock

// Reset the information for the mock so that we can determine that the query
// is only run once per request
afterEach(mockQuery.mockClear)

describe('GET /products', () => {
   it('returns array of products', async () => {
      const mockResult: Partial<QueryResult> = {
         rows: [1, 2, 3],
         rowCount: 3
      }

      mockQuery.mockResolvedValue(mockResult)

      await request(app)
         .get(route('/products'))
         .expect(200)
         .expect((res) => {
            expect(db.query).toBeCalledTimes(1)
            expect(res.body).toEqual(mockResult.rows)
         })
   })
})

describe('GET /products/:id', () => {
   it('returns 204 status code on invalid ID', async () => {
      const mockResult: Partial<QueryResult> = {
         rows: [],
         rowCount: 0
      }

      mockQuery.mockResolvedValue(mockResult)

      await request(app)
         .get(route('/products/SOME_BAD_ID'))
         .expect(204)
         .expect((res) => {
            expect(db.query).toBeCalledTimes(1)
            expect(res.body).toEqual({})
         })
   })

   it('valid ID param returns array with single item', async () => {
      const mockResult: Partial<QueryResult> = {
         rows: [1],
         rowCount: 1
      }

      mockQuery.mockResolvedValue(mockResult)

      await request(app)
         .get(route('/products/SOME_VALID_ID'))
         .expect(200)
         .expect((res) => {
            expect(db.query).toBeCalledTimes(1)
            expect(res.body).toEqual(mockResult.rows)
         })
   })
})
