import { Post } from "../model"


interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard(props: PostCardProps){

  return (
    <div className={"flex justify-between mb-5 gap-3 bg-gray-100 p-2 rounded"} >
      <div className="">
        <div className="text-xl font-bold">{props.post.title}</div>
        <div className=" text-gray-500">{
          String(props.post.content).slice(0, 200) + "..."
        }</div>
      </div>
      <div className="">
        <div className={"overflow-hidden rounded max-h-40 w-24 "}>
          <img src="/img/dummy-img.png" alt="" />
        </div>
      </div>
    </div>
  )
}