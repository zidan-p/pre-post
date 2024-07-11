import { Link } from "react-router-dom"
import { Post } from "../../entities/post/model"
import { User, UserCard } from "../../entities/user"
import { PostCard } from "@entities/post/ui/post-card"
import { DoubleSectionLayout } from "@shared/layouts/double-section.layout"
import { Navbar } from "@widget/navbar/navbar"
import { Footer } from "@widget/footer/footer"


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


function LeftContent(){
  return (
    <UserCard 
      user={dummyUser}
      descriptionSlot={<p>12 Post</p>}
    />
  )
}

function RightContent(){
  return (
    <>
    <Link to={"/posts/test"}>
      <PostCard post={dummyPost} className="mb-10" />
    </Link>
  </>
  )
}

export function UserPage(){

  return (
    <DoubleSectionLayout
     footerSlot={<Footer />}
     leftSlot={<LeftContent />}
     rightSlot={<RightContent />}
     navbarSlot={<Navbar />}
     />
  )
}