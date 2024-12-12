const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

//Middleware: el middleware se encarga de las tareas de gestión de datos, servicios de aplicaciones, mensajería, autenticación y gestión de API. ⠀⠀⠀ Ayuda a los desarrolladores a diseñar aplicaciones con mayor eficiencia. Además, actúa como hilo conductor entre las aplicaciones, los datos y los usuarios.
app.use(express.json());
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));//Middleware para CORS

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

routerApi(app);

//Middleware de tipo error, siempre se deben hacer despues del routing
app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`corriendo en el port: http://localhost:${port}`);
});
