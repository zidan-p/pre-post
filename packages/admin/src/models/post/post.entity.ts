



export interface PostEntity{
  id?: string;
  title: string;
  content: string;
  image: string | null;

  /** hold new image value when you want to update it */
  // postImage?: PostImage;
  // newPostImage?: PostImage;
  ownerId: string;

  isPublished: boolean;
  dateTimeCreated: Date;
  dateTimePosted?: Date | null; 
}