export interface TitleAPIResponse {
  title: string;
}

export default defineEventHandler<TitleAPIResponse>(() => ({
  title: 'Hello World',
}));
