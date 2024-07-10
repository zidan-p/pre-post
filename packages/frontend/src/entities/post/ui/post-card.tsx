import { Post } from "../model"


interface PostCardProps {
  post: Post;
}

export function PostCard(props: PostCardProps){
  return (
    <div className="bg-light rounded p-7">
      <div className="text-xl font-bold">{props.post.title}</div>
      <div className=" text-gray-500">{props.post.content}</div>
    </div>
  )
}