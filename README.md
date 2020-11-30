### Práctica con subida de imágenes

1. Crea un endpoint/ruta de subida de imágenes con multer (Tipo POST)
Implementa dicha ruta desde el controlador de usuarios, la ruta debe llamarse con /users/:id/avatar
2. Guarda las imágenes de forma organizada
Cada imagen que se suba, debe alojarse en una carpeta específica del usuario, cada carpeta de usuarios debe llamarse con el ID de la base de datos del usuario. 
Recoge el ID de la URL para determinar el destino de la imagen de subida.
3. Permite sólo la subida de archivos PNG,  JPG o JPEG (Investiga cómo hacerlo)
https://www.npmjs.com/package/multer
4. Permite sólo una imagen por usuario, si se sube una nueva elimina la antigua
