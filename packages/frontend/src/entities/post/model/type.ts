


export interface Post{
  id: string;
  title: string;
  content: string;
  image:  null | string;
  ownerId: string;
  isPublished: boolean;
  dateTimeCreated: Date;
  dateTimePosted?: Date | null; 
}