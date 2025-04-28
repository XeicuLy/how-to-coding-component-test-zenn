import { fetchTitle } from '@/services/chapter-11/useTitleService';

export const useTestStore = defineStore('test', {
  state: () => ({
    title: '',
  }),
  actions: {
    async fetchTitle() {
      const title = await fetchTitle();
      this.title = title;
    },
  },
});
