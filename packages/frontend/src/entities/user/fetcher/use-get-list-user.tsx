import { RemoteQueryFilter } from "@services/prepost.backend/query"
import { User } from "../model/type"
import { useQuery } from "@tanstack/react-query"
import { PrePostGetListResponse } from "@services/prepost.backend/response"
import { USER } from "../model/const"
import { getListUser } from "@services/prepost.backend/user"





export const useGetListUser = (params?: RemoteQueryFilter<User>) => {
  return useQuery<PrePostGetListResponse<User>>({
    queryKey: [USER, params],
    queryFn: () => getListUser()
  })
}