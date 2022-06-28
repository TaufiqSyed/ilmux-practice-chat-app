import http from 'http'
import apiRouter from './api'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './sequelize'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

/** Get port from environment and store in Express. */
const port = process.env.PORT || '3001'
app.set('port', port)

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', apiRouter)

/** Catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist',
  })
})

/** Create HTTP server. */
const server = http.createServer(app)
/** Listen on provided port, on all network interfaces. */
server.listen(port)
/** Event listener for HTTP server "listening" event. */
server.on('listening', () => {
  sequelize.authenticate().then(async () => {
    try {
      await sequelize.sync({ force: true })
    } catch (err: any) {
      console.error(err.message)
    }
  })

  console.log(`Listening on port:: http://localhost:${port}/`)
})
