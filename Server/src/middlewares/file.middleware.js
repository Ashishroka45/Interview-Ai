import multer from "multer"


const upload = multer({
    storage:multer.memoryStorage(),
    limits:{fileSize :4*1024*1024 },
    fileFilter:(req,file,cb) => {
        if(file.mimetype=="application/pdf")
        {
            cb(null,true);
        }
        else{
            cb(null,false)
        }
    }
})

export default upload;