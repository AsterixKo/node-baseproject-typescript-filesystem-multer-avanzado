import bodyParser from 'body-parser';
import express from 'express';
import { authorRoutes } from './routes/authors.routes';
import { bookRoutes } from './routes/books.routes';
import { userRoutes } from './routes/users.routes';
import multer from 'multer';
import path from 'path';

// Instance the express framework
const app = express();

// Setting the port of aplication server
app.set('port', 3000);

// Middlewares
app.use(express.json()); // Poder interpretar json en las peticiones

// Load the file routes users
app.use('/users', userRoutes.router);
app.use('/books', bookRoutes.router);
app.use('/authors', authorRoutes.router);

//Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
//Inicializamos multer, con la configuracion de guardado previamente definida
const upload = multer({ storage: storage });

app.post('/upload-file', upload.single('file'), async (req, res) => {
    try {
        res.send(req.file);
    } catch (err) {
        res.sendStatus(400);
    }
});

//ponemos maximo 2 archivos
app.post('/photos/upload', upload.array('file', 2), async (req, res) => {
    try {
        res.send(req.files);
    } catch (err) {
        res.sendStatus(400);
    }
});

//que descargue una imagen
app.get('/images/:name', async (req, res) => {
    try {
        res.download(path.join('uploads', req.params.name));
    } catch (err) {
        res.sendStatus(404);
    }
});

// Start the server, using the port defined
app.listen(app.get('port'), () => {

    console.log('New console.log');
    console.log('New console.log 1');
    console.log(`Ther server is running on port ${app.get('port')}`);

});

