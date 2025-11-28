import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type Store = {
  counter: number;
  user: {
    name: string;
    email: string;
    username: string;
  }
}

type Actions = {
  increment: () => void;
  setUsername: (username: string) => void;
}


export const useStore = create<Store & Actions>()(
  devtools(
    immer(
      (set) => ({
        counter: 1,
        user: {
          name: 'Gabriel Jesus',
          email: 'gabriel.dev@mail.com',
          username: 'gabriel-jesusvix'
        },
        increment: () => set((prevState) => ({ counter: prevState.counter + 1 })),
        setUsername: (username: string) => set(prevState => {
          prevState.user.username = username;
        }),
      })
    ),
    {
      enabled: import.meta.env.DEV,
    }
  ),
);
