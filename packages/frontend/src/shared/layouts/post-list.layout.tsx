import { ReactNode } from "react"



interface PostListProps{
  mainSlot: ReactNode;
  navbarSlot: ReactNode;
  footerSlot?: ReactNode;
}


export function PostListLayout(props: PostListProps){


  return (
    <div className="bg-secondary-light min-h-screen">
      <div className="w-[820px] mx-auto ">
        <header className="mb-1 bg-secondary-light ">
          {props.navbarSlot}
        </header>
        <main>
          {props.mainSlot}
        </main>
        {props.footerSlot}
      </div>
    </div>
  )
}