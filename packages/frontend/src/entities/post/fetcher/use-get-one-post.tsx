import { useQuery } from "@tanstack/react-query"
import { POST } from "../model/const"
import { getOnePost } from "@services/prepost.backend/post"






export const useGetOnePost = (postId: string) => {
  return useQuery({
    queryKey: [POST, postId],
    queryFn: () => getOnePost(postId)
  })
}