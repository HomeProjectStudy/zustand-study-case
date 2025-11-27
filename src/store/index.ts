import { create } from 'zustand';

export const useStore = create((set) => ({
  counter: 1,
  increment: () => set((prevState) => ({ counter: prevState.counter + 1 })),
}));
