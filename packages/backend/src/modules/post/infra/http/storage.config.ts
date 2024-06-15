import multer from "multer"
import {extname, join, resolve} from "path"
import { appConfig } from "~/config/index";
import { POST_IMAGE_GROUP, POST_IMAGE_IMAGE_TYPE } from "../../domain/post-image.entity";


const postImagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // check if storage exist
    // `storage/post/postImage` make sure this directory is exist
    cb(null, join(appConfig.root, "storage", POST_IMAGE_IMAGE_TYPE , POST_IMAGE_GROUP));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  }
})

export const uploadImagePost = multer({ storage: postImagestorage }) 