import { ReactNode } from "react"



interface PostListProps{
  navbarSlot: ReactNode;
  footerSlot?: ReactNode;
}


export function PostList(props: PostListProps){


  return (
    <div className="bg-gray-300 min-h-screen dark:bg-gray-700">
      <div className="w-[820px] mx-auto ">
        <header className="mb-1 bg-gray-300 dark:bg-gray-700">
          {props.navbarSlot}
        </header>
          {props.footerSlot}
      </div>
    </div>
  )
}