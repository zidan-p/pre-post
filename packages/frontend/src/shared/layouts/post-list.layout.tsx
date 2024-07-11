import { ReactNode } from "react"



interface PostListProps{
  mainSlot: ReactNode;
  navbarSlot: ReactNode;
  footerSlot?: ReactNode;
}


export function PostListLayout(props: PostListProps){


  return (
    <div className="bg-secondary-light">
      <div className="w-[600px] mx-auto ">
        <header className="mb-1 bg-secondary-light ">
          {props.navbarSlot}
        </header>
        <main className="min-h-screen">
          {props.mainSlot}
        </main>
        {props.footerSlot}
      </div>
    </div>
  )
}