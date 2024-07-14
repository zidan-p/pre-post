import { Link } from "react-router-dom";
import { PostCard } from "../../entities/post/ui/post-card";
import { useGetListPost } from "@entities/post/fetcher/use-get-list-post";



export function HomePage(){

  const result = useGetListPost();

  if(result.isLoading) return (
    <>
    <h1 className="test-xl font-bold">Loading........</h1>
    </>
  )

  if(result.isError) return (
    <>
    <h1 className="test-xl font-bold">Error........</h1>
    {result.error.message}
    </>
  )

  return (
    <>
      {result.data?.data?.map((post) => (
        <Link to={"/posts/" + post.id}>
          <PostCard post={post} className="mb-10" key={post.id}/>
        </Link>
      ))}
      {/* <Link to={"/posts/test"}>
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
      </Link> */}
    </>
  )
}