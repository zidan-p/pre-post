import { IUserAuth } from "~/common/core/user.auth.interface";
import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { PostImage } from "~/modules/post/domain/post-image.entity";

export interface GetPostBannerFiles{}

export interface GetPostBannerBody{}

export interface GetPostBannerParams{
  postId: string;
}

export interface GetPostBannerQuery{}

export interface GetPostBannerDTORequest {
  params?: Partial<GetPostBannerParams>;
  user?: IUserAuth;
}

export interface GetPostBannerDTOResponse{
  banner: PostImage;
}

export interface GetPostBannerDTOEnd<TBanner = any>{
  banner: PostImage;
}