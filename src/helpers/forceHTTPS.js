/**
 * Redirects all requests that are unsecured to use SSL unless we are in
 * development mode
 */
export default function (req, res, next) {
   // The 'x-forwarded-proto' check is for Heroku
   console.log('[Heroku Header]:', req.get('x-forwarded-proto'))
   if (
      req.get('x-forwarded-proto') !== 'https' &&
      process.env.NODE_ENV !== 'development'
   ) {
      return res.redirect('https://' + req.get('host') + req.url)
   }
   next()
}
