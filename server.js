const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pg = require('pg')
const ENV = require('./environment')
const path = require('path')
const PATH = path.resolve(__dirname, '.env.' + ENV)
const rateLimiter = require('./rateLimiter')

require('dotenv').config({ path: PATH })

const app = express()

// we use this variable to identify user for rateLimiter middleware
// this should be replaced in the future with a user name or other unique ids
const name = 'serika'

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers',
             'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// this use of the middleware generally is not suitable for deployment
// app.use(rateLimiter({ name }))

const pool = new pg.Pool({ connectionString:process.env.DATABASE_URL })

const queryHandler = (req, res, next) => {

  // trying to release clients to see if bug on Heroku goes away
  // pool.query(req.sqlQuery).then((r) => {
  //   res.json(r.rows || [])
  //   }).catch(next)
  //   pool.connect()
  //   .then( client => {
  //     return client
  //       .query(req.sqlQuery)
  //       .then((r) => {
  //         client.release()
  //         res.json(r.rows || [])
  //       }).catch(next)
  //   })
  pool.query(req.sqlQuery).then((r) => {
    res.json(r.rows || [])
  }).catch(next)
}

// app.get('/', (req, res) => {
//   res.send('Welcome to EQ Works 😎')
// })

app.get('/events/hourly', rateLimiter(name), (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/events/daily', rateLimiter(name), (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler)

app.get('/stats/hourly', rateLimiter(name), (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/stats/daily', rateLimiter(name), (req, res, next) => {
  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler)

app.get('/poi', rateLimiter(name), (req, res, next) => {
  req.sqlQuery = `
    SELECT  p.poi_id, p.name, p.lat, p.lon,
            SUM(impressions) AS impressions,
            SUM(clicks) AS clicks,
            SUM(revenue) AS revenue,
            SUM(events) AS events
    FROM public.poi p
    INNER JOIN public.hourly_stats s
    ON p.poi_id = s.poi_id
    INNER JOIN public.hourly_events e
    ON s.poi_id = e.Poi_id
    GROUP BY p.poi_id, p.name, p.lat, p.lon
    ORDER By SUM(revenue) DESC;
  `
  return next()
}, queryHandler)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
