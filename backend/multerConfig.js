import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Updated file size limits
const MAX_PHOTO_SIZE = 500 * 1024; // 500KB for photos
const MAX_PDF_SIZE = 2 * 1024 * 1024; // 2MB for PDFs

// Set up storage configuration
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
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'photo_document') {
    // Only accept image files (JPEG, PNG)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg and .png images are allowed for the photo document'));
    }
  } else if (file.fieldname === 'adharcard_document' || file.fieldname === 'certification_document') {
    // Only accept PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for the adhar card and certification documents'));
    }
  } else {
    cb(new Error('Unknown field'));
  }
};

// Set multer limits for file size
const limits = {
  fileSize: (req, file, cb) => {
    if (file.fieldname === 'photo_document') {
      return MAX_PHOTO_SIZE; // 500KB for photos
    } else if (file.fieldname === 'adharcard_document' || file.fieldname === 'certification_document') {
      return MAX_PDF_SIZE; // 2MB for PDFs
    }
    return undefined;
  }
};

// Configure multer with storage, fileFilter, and limits
export const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: (req, file, cb) => {
      if (file.fieldname === 'photo_document') {
        return MAX_PHOTO_SIZE; // 500KB for photos
      } else if (file.fieldname === 'adharcard_document' || file.fieldname === 'certification_document') {
        return MAX_PDF_SIZE; // 2MB for PDFs
      }
      return undefined;
    },
  }
}).fields([
  { name: 'photo_document', maxCount: 1 },
  { name: 'adharcard_document', maxCount: 1 },
  { name: 'certification_document', maxCount: 1 }
]);
