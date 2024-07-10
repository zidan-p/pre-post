import { useState } from "react";
import { Post } from "../model"


interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard(props: PostCardProps){

  const [isExpand, setIsExpand] = useState(false);

  return (
    <div className={props.className}>
      <div onClick={() => setIsExpand(!isExpand)} className="p-1 rounded mb-2 bg-light">
        <div className={"overflow-hidden " + (isExpand ? "" : "max-h-20")}>
          <img src="/img/dummy-img.png" alt="" />
        </div>
        <div className="flex gap-2 p-1">
          <p className="text-secondary">{props.post.ownerId}</p>
          <p className="text-secondary">{props.post.dateTimeCreated?.toDateString()}</p>
        </div>
      </div>
      <div className="text-xl font-bold">{props.post.title}</div>
      <div className=" text-gray-500">{props.post.content}</div>
    </div>
  )
}