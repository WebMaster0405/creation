import express from 'express'
import cors from 'cors';
import morgan from 'morgan'
import {router} from './routes/router'



const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(morgan())

export default app
