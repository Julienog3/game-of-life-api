import express from 'express'
import routes from './routes/index.js'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/error.js';
import cors from 'cors'

const app = express();
app.use(cookieParser())
app.use(cors())

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.use('/api', routes)
app.use(errorHandler)

app.listen(+port, hostname, () => {
	console.log(`Serveur démarré sur http://${hostname}:${port}`);
});