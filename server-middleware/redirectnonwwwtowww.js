module.exports = function (req, res, next) {
    const host = req.headers.host
    const url = req.url
    const env = process.env.NODE_ENV
    const forceDomain = 'https://www.deussearch.fr'
  
    if (env === 'production' && host !== 'www.deussearch.fr') {
      res.writeHead(301, { Location: forceDomain + url })
      return res.end()
    }
  
    return next()
  }