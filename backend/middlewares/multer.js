import multer from "multer";

// storage ayuu noo si qabanaa
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 *1024 // 5 MB
    }
});

export default upload;

