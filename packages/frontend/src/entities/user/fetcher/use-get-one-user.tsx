import { useQuery } from "@tanstack/react-query"
import { USER } from "../model/const"
import { getOneUser } from "@services/prepost.backend/user"







export const useGetOneUser = (userId: string) => {
  return useQuery({
    queryKey: [USER, userId],
    queryFn: () => getOneUser(userId)
  })
}