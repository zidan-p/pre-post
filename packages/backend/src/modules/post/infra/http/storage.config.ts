import multer from "multer"
import {extname, join, resolve} from "path"
import { appConfig } from "~/config/index";
import { POST_IMAGE_GROUP } from "../../domain/post-image.entity";


const postImagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // check if storage exist
    // `storage/post/postImage` make sure this directory is exist
    cb(null, join(appConfig.root, "storage" , POST_IMAGE_GROUP));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = (new Date()).toISOString() + '-' + Math.round(Math.random() * 1E9)
    console.log(uniqueSuffix);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  },
  
})

export const uploadImagePost = multer({ storage: postImagestorage }) 