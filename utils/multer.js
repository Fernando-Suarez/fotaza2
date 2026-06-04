//Multer
import multer from 'multer';

// guarda en el disco, en la ruta seleccionada
/* const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/imagenes');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
}); */
const storage = multer.memoryStorage();                 //   guarda un buffer para guardar el blob en la bd
export const upload = multer({ storage });
