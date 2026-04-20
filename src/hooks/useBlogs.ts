import { useQuery } from '@tanstack/react-query';
import { blogsAPI } from '@/lib/api';

type BlogParams = Parameters<typeof blogsAPI.getAll>[0];

const FIVE_MINUTES = 5 * 60 * 1000;

export function useBlogs(params?: BlogParams) {
  return useQuery({
    queryKey: ['blogs', params ?? {}],
    queryFn: () => blogsAPI.getAll(params),
    staleTime: FIVE_MINUTES,
  });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogsAPI.getById(id),
    enabled: !!id,
    staleTime: FIVE_MINUTES,
  });
}
