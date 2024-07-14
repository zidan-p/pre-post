import { getListPostByUser } from "@services/prepost.backend/post"
import { IPaginate } from "@services/prepost.backend/query"
import { POST } from "../model/const"
import { PrePostGetListResponse } from "@services/prepost.backend/response"
import { Post } from "../model"
import { useQuery } from "@tanstack/react-query"





export const useGetListByOwner = (ownerId: string, params: Partial<IPaginate>) => {
  return useQuery<PrePostGetListResponse<Post>>({
    queryKey: [POST, params],
    queryFn: () => getListPostByUser(ownerId, params)
  })
}