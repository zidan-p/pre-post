import { useQuery } from "@tanstack/react-query"
import { POST } from "../model/const"
import { getListPost } from "@services/prepost.backend/post"
import { PrePostGetListResponse } from "@services/prepost.backend/response"
import { Post } from "../model"
import { RemoteQueryFilter } from "@services/prepost.backend/query"





export const useGetListPost = (params?: RemoteQueryFilter<Post>) => {
  return useQuery<PrePostGetListResponse<Post>>({
    queryKey: [POST, params],
    queryFn: () => getListPost()
  })
}