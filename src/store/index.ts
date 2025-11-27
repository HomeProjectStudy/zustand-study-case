import { create } from 'zustand';

type Store = {
  counter: number;
  user: {
    username: string;
  }
}

type Actions = {
  increment: () => void;
  setUsername: (username: string) => void;
}

export const useStore = create<Store & Actions>()((set) => ({
  counter: 1,
  user: {
    username: 'gabriel-jesusvix'
  },
  increment: () => set((prevState) => ({ counter: prevState.counter + 1 })),
  setUsername: (username: string) => set({ user: { username }}),
}));
