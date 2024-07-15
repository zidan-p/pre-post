import { Link, useParams } from "react-router-dom"
import { UserCard } from "../../entities/user"
import { PostCard } from "@entities/post/ui/post-card"
import { DoubleSectionLayout } from "@shared/layouts/double-section.layout"
import { Navbar } from "@widget/navbar/navbar"
import { Footer } from "@widget/footer/footer"
import { useGetOneUser } from "@entities/user/fetcher/use-get-one-user"
import { useGetListPostByOwner } from "@entities/post/fetcher/use-get-list-by-owner"




/** @todo move to separate file */
function LeftContent({userId}: {userId?: string}){

  const result = useGetOneUser(userId!, {isEnabled: !!userId});

  if(result.isLoading) return (
    <>
    <h1 className="text-secondary">Loading.....</h1>
    </>
  )

  if(result.isError) return (
    <h1 className="text-red-800">{result.error.message}</h1>
  )

  if(!result.data?.data) return ( <p> Pending....</p>)

  return (
    <UserCard 
      user={result.data?.data}
      descriptionSlot={<p>12 Post</p>}
    />
  )
}

/** @todo move to separate file */
function RightContent({userId}: {userId?: string}){

  const result = useGetListPostByOwner(userId!);
  

  if(result.isLoading) return (
    <h1>Loading......</h1>
  )

  if(result.isError){
    console.log(result.error);
    return (
      // eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
      // @ts-expect-error just not error
      <h1 className="text-red-800">{result.error?.response?.data?.message}</h1>
    )
  }

  if(result.data?.data.length === 0) return ( <p className="text-center text-xl font-semibold"> No Post</p> )

  return (
    <>
      {result.data?.data?.map((post) => (
        <Link to={"/posts/" + post.id}>
          <PostCard post={post} className="mb-10" key={post.id}/>
        </Link>
      ))}
    </>
  )
}

export function UserPage(){

  const { userId } = useParams();


  return (
    <DoubleSectionLayout
     footerSlot={<Footer />}
     leftSlot={<LeftContent userId={userId} />}
     rightSlot={<RightContent userId={userId} />}
     navbarSlot={<Navbar />}
     />
  )
}