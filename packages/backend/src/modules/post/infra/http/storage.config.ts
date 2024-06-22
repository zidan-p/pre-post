import multer from "multer"
import {extname, join, resolve} from "path"
import { appConfig } from "~/config/index";
import { POST_IMAGE_GROUP } from "../../domain/post-image.entity";
import { fileNameCreator } from "~/common/utils/filename-creator";


const postImagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // check if storage exist
    // `storage/post/postImage` make sure this directory is exist
    cb(null, join(appConfig.root, "storage" , POST_IMAGE_GROUP));
  },
  filename: function (req, file, cb) {
    cb(null, fileNameCreator(file.fieldname, extname(file.originalname)));
  },
  
})

export const uploadImagePost = multer({ storage: postImagestorage }) 