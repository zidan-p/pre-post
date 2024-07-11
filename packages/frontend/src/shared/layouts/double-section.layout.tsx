import { ReactNode } from "react";





export interface DoubleSectionLayoutProps{
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  navbarSlot?: ReactNode;
  footerSlot?: ReactNode;
}



export function DoubleSectionLayout(props: DoubleSectionLayoutProps){

  return (
    <div className="bg-secondary-light flex justify-center gap-10">
      {props.leftSlot}
      <div className="w-[600px] ">
        <header className="mb-1 bg-secondary-light ">
          {props.navbarSlot}
        </header>
        <main className="min-h-screen">
          {props.rightSlot}
        </main>
        {props.footerSlot}
      </div>
    </div>
  )
}