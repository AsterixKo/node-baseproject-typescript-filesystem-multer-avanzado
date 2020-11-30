import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

//Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            fs.mkdirSync(path.join('uploads/', req.params.id));
        } catch (err) {
            console.log(err);
        }

        cb(null, path.join('uploads/', req.params.id));
    },
    filename: function (req, file, cb) {
        // cb(null, file.originalname);
        // cb(null, 'avatar' + path.extname(file.originalname));
        cb(null, 'avatar');
    }
});
//Inicializamos multer, con la configuracion de guardado previamente definida
var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        ext = ext.toLowerCase();
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
});

class UsersRoutes {

    public router: Router = Router();

    constructor() {
        this.router.get('/show', usersController.show);

        this.router.get('/', usersController.index);
        this.router.get('/:id', usersController.showById);
        this.router.post('/', usersController.create);
        this.router.delete('/:id', usersController.delete);
        this.router.put('/:id', usersController.update);

        this.router.get('/providers', usersController.providers);

        this.router.post('/:id/avatar', upload.single('file'), usersController.uploadAvatar);
    }
}

export const userRoutes = new UsersRoutes();
