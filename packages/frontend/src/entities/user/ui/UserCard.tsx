import { ReactNode } from "react";
import { User } from "../model/type"



interface UserCardProps {
  user: User;
  descriptionSlot?: ReactNode;
  className?: string;
}



export function UserCard(props: UserCardProps){


  return (
  <div className={props.className}>
    <div className="sticky p-2 bg-gray-100 min-w-[300px] rounded top-24">
      <div className={"border-b pb-4 mb-4 " + !props.descriptionSlot && "border-b-gray-300"}>
        <div className="flex justify-between">
          <h3 className="text-primary font-bold">{props.user.username}</h3>
          <p className="text-secondary-light text-sm">{props.user.role}</p>
        </div>
        <p className="">{props.user.email}</p>
        <p className="text-secondary"># {props.user.id}</p>
      </div>
      {props.descriptionSlot}
    </div>
  </div>
  )
}