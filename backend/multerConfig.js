import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';
    if (file.fieldname === 'photo_document') {
      folder = 'uploads/photoUploads';
    } else if (file.fieldname === 'adharcard_document') {
      folder = 'uploads/adharCardUploads';
    } else if (file.fieldname === 'certification_document') {
      folder = 'uploads/certificationUploads';
    }
    
    // Ensure the directory exists
    fs.mkdirSync(folder, { recursive: true }); // Create folder if it doesn't exist
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

export const upload = multer({ storage }).fields([
  { name: 'photo_document', maxCount: 1 },
  { name: 'adharcard_document', maxCount: 1 },
  { name: 'certification_document', maxCount: 1 }
]);
