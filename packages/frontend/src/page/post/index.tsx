import { Post } from "../../entities/post/model"
import { User } from "../../entities/user"




const dummyPost: Post = {
  id: "lorem-ipsum",
  title: "Judulnya di judul judulkan",
  content: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  image: null,
  ownerId: "ipsum-lorem",
  isPublished: true,
  dateTimeCreated: new Date()
}


const dummyUser: User = {
  id: "hdhd-askwm23-23nd",
  email: "user@email.com",
  username: "user",
  role: "USER"
}

export function PostPage(){

  return (
    <>
      <div className="p-2">
        <h2 className="text-3xl font-semibold mb-5">{dummyPost.title}</h2>
        <img src="/img/dummy-img.png" alt="post image" className="rounded mb-2" />
        <div className="flex justify-between mb-2">
          <div className="text-secondary ">{dummyUser.username}</div>
          <div className="text-secondary ">{dummyPost.dateTimeCreated.toDateString()}</div>
        </div>
        <p>{dummyPost.content}</p>
      </div>
    </>
  )
}