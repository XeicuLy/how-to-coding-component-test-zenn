export const useTestStore = defineStore('test', {
  state: () => ({
    count: 0,
  }),
  getters: {
    isEven({ count }) {
      return count % 2 === 0;
    },
  },
  actions: {
    incrementCount() {
      this.count++;
    },
  },
});
