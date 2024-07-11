import { Link } from "react-router-dom";





export function Navbar(){

  return (
    <nav className="flex justify-between p-2 pt-4 pb-1">
    <div className="flex gap-9">
      <Link to={"/"} className="text-secondary font-light">
        Prepost Blog
      </Link>
      {/* <ul className="flex gap-6 font-semibold">
      </ul> */}
    </div>
    
  </nav>
  )
} 