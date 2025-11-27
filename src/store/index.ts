import { create } from 'zustand';

type Store = {
  counter: number;
}

type Actions = {
  increment: () => void;
}

export const useStore = create<Store & Actions>((set) => ({
  counter: 1,
  increment: () => set((prevState) => ({ counter: prevState.counter + 1 })),
}));
