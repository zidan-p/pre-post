import { Link, useParams } from "react-router-dom"
import { useGetOnePost } from "@entities/post/fetcher/use-get-one-post"
import { ImageWithAuth } from "@shared/components/image/image-with-auth"
import { useGetOneUser } from "@entities/user/fetcher/use-get-one-user"





function OwnerLink(props: {ownerId?: string}){
  const ownerResult = useGetOneUser(props.ownerId!, {isEnabled: !!props.ownerId});

  if(ownerResult.isLoading) return (
    <h1>Loading......</h1>
  )

  if(ownerResult.isError) return (
    <h1 className="text-red-800">{ownerResult.error.message}</h1>
  )

  return (
    <Link to={"/users/" + ownerResult.data?.data?.id}> 
      <div className="text-secondary hover:underline">{ownerResult.data?.data?.username}</div>
    </Link>
  )
}


export function PostPage(){

  const { postId } = useParams();
  const result = useGetOnePost(postId!);
  

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

  return (
    <>
      <div className="p-2">
        <h2 className="text-3xl font-semibold mb-5">{result.data?.data.title}</h2>
        {/* <img src="/img/dummy-img.png" alt="post image" className="rounded mb-2" /> */}
        {
          result.data?.data?.image 
          ? <ImageWithAuth className="rounded mb-2 w-full" url={result.data?.data?.image} /> 
          : <img src="/img/dummy-img.png" alt="" />
        }
        <div className="flex justify-between mb-2">
          <OwnerLink ownerId={result.data?.data?.ownerId} />
          <div className="text-secondary ">{result.data?.data.dateTimeCreated.toDateString()}</div>
        </div>
        <p>{result.data?.data.content}</p>
      </div>
    </>
  )
}