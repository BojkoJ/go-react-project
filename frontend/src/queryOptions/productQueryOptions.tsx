import { queryOptions } from '@tanstack/react-query'
import { getProduct } from '../api/products/getProduct'

export const productQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['posts', { postId }],
    queryFn: () => getProduct(postId),
  })
