import { v2 as cloudinary } from 'cloudinary';
import { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET_KEY } from './config.js';

// Configuration
 cloudinary.config({ 
        cloud_name: CLOUD_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET_KEY
});

export default cloudinary;


