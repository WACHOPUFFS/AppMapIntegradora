const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());


// Conexion a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/mapas', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Se ha conectado a MongoDB con exito');
});

// Configurar la ruta para servir imágenes subidas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  nombreUsuario: String,
  nombreCompleto: String,
  correo: String,
  contraseña: String,
});

// Crear el modelo User basado en el esquema
const User = mongoose.model('User', userSchema, 'users');


// ruta para el registro
app.post('/registrar', async (req, res) => {
    console.log('Solicitud recibida:', req.body);
  const { nombreUsuario, nombreCompleto, correo, contraseña } = req.body;

  const newUser = new User({
    nombreUsuario,
    nombreCompleto,
    correo,
    contraseña,
  });

  try {
    await newUser.save();
    res.status(200).send('Usuario registrado con exito');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al registrar el usuario');
  }
});


// ruta para inicio de sesion
app.post('/iniciarSesion', async (req, res) => {
  const { correo, contraseña } = req.body;
  console.log('Solicitud recibida:', req.body);


  try {
    
    const user = await User.findOne({ correo, contraseña });

    if (user) {
      res.status(200).json({ success: true, user }); // Enviar los datos del usuario al cliente
    } else {
      res.status(200).json({ success: false });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error al iniciar sesión' });
  }
});

// Configurar multer para manejar la carga de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
  },
});

const upload = multer({ storage: storage });

// Definir el modelo con Mongoose
const publicacionSchema = new mongoose.Schema({
  titulopublicacion: String,
  subtitulopublicacion: String,
  descripcionpublicacion: String,
  fechapublicacion: String,
  imagen: String,
});

// Crear el modelo Publicacion basado en el esquema
const Publicacion = mongoose.model('Publicacion', publicacionSchema, 'publicaciones');

// Ruta para crear una nueva publicación
app.post('/publicar', upload.single('imagen'), async (req, res) => {
  console.log('Solicitud recibida:', req.body);
  const { titulopublicacion, subtitulopublicacion, descripcionpublicacion, fechapublicacion } = req.body;
  const imagenPath = req.file.path; // Ruta de la imagen en el servidor

  // Crea un nuevo objeto para la publicación utilizando el modelo Publicacion
  const nuevaPublicacion = new Publicacion({
    titulopublicacion, 
    subtitulopublicacion, 
    descripcionpublicacion, 
    fechapublicacion,
    imagen: imagenPath, // Guarda la ruta de la imagen en la base de datos
  });

  try {
    await nuevaPublicacion.save();
    res.status(200).json({ message: 'Publicación creada con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear la publicación' });
  }  
});


// Ruta para obtener todas las publicaciones
app.get('/obtenerPublicaciones', async (req, res) => {
  try {
    const publicaciones = await Publicacion.find(); // Buscar todas las publicaciones en la base de datos

    // Mapear las publicaciones para incluir la URL completa de la imagen
    const publicacionesConImagenes = publicaciones.map(publicacion => {
      return {
        ...publicacion._doc, // Copiar todas las propiedades de la publicación
        imagen: `http://localhost:3000/${publicacion.imagen}`
      };
    });

    res.status(200).json(publicacionesConImagenes); // Devolver las publicaciones con URLs de imágenes en formato JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener las publicaciones' });
  }
});


// Ruta para obtener los datos del usuario
app.get('/user-data', async (req, res) => {
  try {
    // Aquí debes obtener los datos del usuario -- NO ESTA TERMINADO AL 100
    // y luego enviarlos como respuesta
    const user = await User.findOne({ /* condiciones para buscar el usuario - NO ESTA AL 100 */ });

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(200).json({ success: false, message: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error al obtener los datos del usuario' });
  }
});


app.listen(port, () => {
  console.log(`Servidor alojado en http://localhost:${port}`);
});