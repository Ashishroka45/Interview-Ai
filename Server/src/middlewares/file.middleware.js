import multer from "multer"
import AppError from "../utils/AppError.js"

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{fileSize :4*1024*1024 },
    fileFilter:(req,file,cb) => {
        if(file.mimetype=="application/pdf")
        {
            cb(null,true);
        }
        else{
            cb(new AppError("Only PDF resumes are allowed.", 400, "INVALID_FILE_TYPE"), false)
        }
    }
})

export default upload;