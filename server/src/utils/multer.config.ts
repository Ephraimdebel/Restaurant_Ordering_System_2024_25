import { diskStorage } from 'multer';
import { join } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', // Folder to save images
    filename: (req, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
};

export const fileFilter = (req, file, callback) => {
  if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    callback(null, true); // Accept file
  } else {
    callback(new Error('Only image files are allowed!'), false); // Reject file
  }
};
