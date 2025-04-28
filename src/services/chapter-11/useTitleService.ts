import type { TitleAPIResponse } from '@/server/api/title';

export const fetchTitle = async (): Promise<TitleAPIResponse['title']> => {
  const response = await $fetch<TitleAPIResponse>('/api/title');
  return response.title;
};
