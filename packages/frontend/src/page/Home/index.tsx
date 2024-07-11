import { Link } from "react-router-dom";
import { Post } from "../../entities/post/model";
import { PostCard } from "../../entities/post/ui/post-card";




const dummyPost: Post = {
  id: "lorem-ipsum",
  title: "Judulnya di judul judulkan",
  content: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:",
  image: null,
  ownerId: "ipsum-lorem",
  isPublished: true,
  dateTimeCreated: new Date()
}

export function HomePage(){

  return (
    <>
      <Link to={"/posts/test"}>
        <PostCard post={dummyPost} className="mb-10" />
      </Link>
      <Link to={"/posts/test"}>
        <PostCard post={dummyPost} className="mb-10" />
      </Link>
      <Link to={"/posts/test"}>
        <PostCard post={dummyPost} className="mb-10" />
      </Link>
      <Link to={"/posts/test"}>
        <PostCard post={dummyPost} className="mb-10" />
      </Link>
      <Link to={"/posts/test"}>
        <PostCard post={dummyPost} className="mb-10" />
      </Link>
      <Link to={"/posts/test"}>
        <PostCard post={dummyPost} className="mb-10" />
      </Link>
    </>
  )
}