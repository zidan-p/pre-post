import { User, UserCard } from "@entities/user"
import { Link } from "react-router-dom"



const dummyUser: User = {
  id: "hdhd-askwm23-23nd",
  email: "user@email.com",
  username: "user",
  role: "USER"
}


export function UserListPage(){


  return (
    <>
      <Link to={"/users/test"} >
        <UserCard user={dummyUser} className="mb-5"/>
      </Link>
      <Link to={"/users/test"} >
        <UserCard user={dummyUser} className="mb-5"/>
      </Link>
      <Link to={"/users/test"} >
        <UserCard user={dummyUser} className="mb-5"/>
      </Link>
      <Link to={"/users/test"} >
        <UserCard user={dummyUser} className="mb-5"/>
      </Link>
    </>
  )
}