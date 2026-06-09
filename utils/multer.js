//Multer
import multer from 'multer';

const storage = multer.memoryStorage();                 //   guarda un buffer para guardar el blob en la bd
export const upload = multer({ 
	storage,
	limits:{
		fileSize: 20 * 1024 *1024
	} 
});
