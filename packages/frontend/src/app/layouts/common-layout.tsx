import { Outlet } from "react-router-dom";
import { PostListLayout } from "../../shared/layouts/post-list.layout";
import { Navbar } from "../../widget/navbar/navbar";




export function CommonLayout(){

  return (
    <PostListLayout
      mainSlot={<Outlet />}
      navbarSlot={<Navbar />}
    />
  )
}