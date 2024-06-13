import multer from "multer"
import {extname} from "path"


const postImagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/post/postImage')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  }
})

export const uploadImagePost = multer({ storage: postImagestorage }) 