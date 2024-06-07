import { ObjectArrayableValue } from "~/common/types/object";

export type PostSequelize = {
  id: string;
  date_time_created: Date;
  date_time_posted: Date;
  is_published: boolean;
  owner_id: boolean;
  content: string;
  image_id: string;
  title: string;
}

export type ArrayablePostSequelize = ObjectArrayableValue<PostSequelize>;
