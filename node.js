const express = require('express');
const session = require('express-session');
const { spawn } = require("child_process");

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

// Nueva ruta para decir "Hola desde Node" en formato JSON
app.get('/hola', (req, res) => {
    res.json({ mensaje: 'Hola desde Node' });
});

//MENSAJE DESDE PYTHON
//Para hacer graficos instalar esto 

//pip install matplotlib
//npm install express child_process

app.post("/python", (req, res) => {
    try {
        //PROCESO QUE EJECUTAR EL COMANDO PYTHON
        const processoPython = spawn("py", ["index.py"]);

        let resultado = '';

        // Manejar la salida del script Python
        processoPython.stdout.on("data", (data) => {
            console.log("Resultado del script");
            res.json({ result: data.toString() });
            resultado += data.toString();
        });

        // Manejar errores del script Python
        processoPython.stderr.on("data", (error) => {
            console.log("Error en el srcipt", error.toString());
            res.status(500).json({ error: "FALLO SRICPT" });
        });

        // Finalizar la ejecución del script Python
        processoPython.on("close", (code) => {
            console.log("PROCESO DE PYHTON FINALIZADO");
            res.json({result: `${resultado}`})
        });

    } catch (error) {
        console.error("Error en la solicitud desde Python:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
