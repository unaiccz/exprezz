// Importamos las librerías necesarias
const express = require('express'); // Express es un framework para Node.js que simplifica el desarrollo de aplicaciones web.
const Sequelize = require('sequelize'); // Sequelize es un ORM para manejar bases de datos SQL en Node.js.
const cors = require('cors'); // CORS es un paquete de Node.js para proporcionar un middleware de CORS.

// Creamos una nueva aplicación Express
const app = express();

// Usamos el middleware de CORS para permitir solicitudes de origen cruzado
app.use(cors());

// Usamos el middleware de express.json() para analizar las solicitudes con cuerpos de tipo JSON
app.use(express.json());

// Creamos una nueva instancia de Sequelize para la conexión a la base de datos
const sequelize = new Sequelize('backend', 'root', '011110', {
    host: 'localhost',
    dialect: 'mysql' // Especificamos que vamos a usar MySQL como nuestro gestor de base de datos
});

// Definimos un modelo de "Post" con Sequelize
const Post = sequelize.define('post', {
    title: Sequelize.STRING, // El título del post es un string
    content: Sequelize.TEXT // El contenido del post es un texto
}, {
    timestamps: false // No queremos las columnas de timestamps por defecto (createdAt, updatedAt)
});

// Definimos una ruta GET para '/posts' que devuelve todos los posts
app.get('/posts', async (req, res) => {
    const posts = await Post.findAll(); // Usamos el método findAll de Sequelize para obtener todos los posts
    res.json(posts); // Enviamos los posts como respuesta en formato JSON
});

// Definimos una ruta POST para '/posts' que crea un nuevo post
app.post('/posts', async (req, res) => {
    const newPost = await Post.create({ // Usamos el método create de Sequelize para crear un nuevo post
        title: req.body.title, // El título del post viene en el cuerpo de la solicitud
        content: req.body.content // El contenido del post viene en el cuerpo de la solicitud
    });
    res.json(newPost); // Enviamos el nuevo post como respuesta en formato JSON
});

// Hacemos que nuestra aplicación Express escuche en el puerto 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000'); // Imprimimos un mensaje cuando el servidor está corriendo
    sequelize.sync({ force: true }).then(() => { // Sincronizamos los modelos con la base de datos
        console.log('Database & tables created!'); // Imprimimos un mensaje cuando la base de datos y las tablas han sido creadas
    });
});