import { UserCard } from "@entities/user"
import { useGetListUser } from "@entities/user/fetcher/use-get-list-user";
import { Link } from "react-router-dom"


export function UserListPage(){

  const result = useGetListUser();

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
      {result.data?.data?.map((user) => (
        <Link to={"/users/" + user.id}>
          <UserCard user={user} className="mb-5"/>
        </Link>
      ))}
    </>
  )
}