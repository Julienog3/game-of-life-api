import express from 'express'
import routes from './routes/index.js'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cookieParser())

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.use('/api', routes)

app.listen(+port, hostname, () => {
	console.log(`Serveur démarré sur http://${hostname}:${port}`);
});