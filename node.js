const express = require('express');
const session = require('express-session');

const app = express();

let usuario ="";

// Configuración del middleware de sesión
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
}));

// Ruta para establecer la sesión
app.get('/establecer', (req, res) => {
  req.session.usuario = 'Kevin'; // Puedes almacenar cualquier información en la sesión
  usuario = req.session.usuario;
  res.json({session :'Sesión establecida'});
});

// Ruta para obtener información de la sesión
app.get('/obtener', (req, res) => {
  usuario = req.session.usuario;
  res.json({usuarios:`Usuario en sesión: ${usuario}`});
});

// Ruta para destruir la sesión
app.get('/cerrar', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.json({Error:'Error al cerrar la sesión'});
    } else {
      res.json({result:`Sesión cerrada correctamente: ${usuario}`});
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
