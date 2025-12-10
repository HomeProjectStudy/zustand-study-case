# 🐻 Zustand Study Case
Este repositório reúne um estudo de caso para a utilização de Zustand com React + TypeScript + Vite. O objetivo é servir como base simples, clara e escalável para implementar gerenciamento de estado em projetos reais.

---

## ✅ Por que usar Zustand

- Zustand é uma solução leve, minimalista e performática para gerenciamento de estado. Não exige providers/contextos — basta usar um hook.
zustand.site
+1

- Com TypeScript, você tem tipagem forte para estado e ações, garantindo segurança e autocompletar no desenvolvimento.
zustand.docs.pmnd.rs
+1

- Adequado tanto para apps pequenos quanto para aplicações maiores, com possibilidade de crescer de forma organizada.
zustand.site
+1
---

📦 Instalação

```bash
npm install zustand
# ou
yarn add zustand
# ou
pnpm add zustand

```

---

## 🧠 Criando o Store (loja de estado)

A base do Zustand é um store, criado via create. Você define o estado inicial e as ações para alterá-lo. *Importante dizer que a
documentação do zustand indica apenas uma criação de store. Porém podemos adotar estratégias para que possamos usar mais stores dedicadas a cada contexto. Vamos abordar ao longo dessa seção;


## Exemplo básico (contador)

```ts
// src/store/useCounterStore.ts
import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

## Por que esse formato

- Definimos uma interface CounterState, o que dá clareza sobre o que existe no estado e quais são as ações.

- A função set do Zustand atualiza o estado imutavelmente — ou seja, não precisamos usar reducers, muito menos contexto ou boilerplate pesado.
GitHub
+1

- Fácil de entender e manter, ideal para casos simples ou como ponto de partida para casos mais complexos.

---

## 🧩 Uso no componente React

```ts
// src/components/Counter.tsx
import React from "react";
import { useCounterStore } from "../store/useCounterStore";

export function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

```
## Explicação

- Não há necessidade de Provider, Context ou wrappers — o hook useCounterStore já está apto para uso direto.
GitHub
+1

- Ao selecionar apenas o pedaço do estado ou a ação com o hook, o componente reage automaticamente a mudanças — re-render apenas quando necessário. Isso mantém a performance eficiente.
zustand.site
+1
---


## 🧰 Exemplo mais “real”: store de autenticação / usuário logado

```ts
// src/store/useAuthStore.ts
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  // ... outros campos que seu app usar
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

```

## Uso no componente:

```ts
// e.g. src/components/Header.tsx
import React from "react";
import { useAuthStore } from "../store/useAuthStore";

export function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header>
      {user ? (
        <>
          <span>Olá, {user.name}</span>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <span>Você não está logado</span>
      )}
    </header>
  );
}

```
Esse padrão é bem similar ao de “login state” usado em muitos apps — simples, direto e com tipagem explícita.
buildingapps
+1
---
## 🧩 Quando e como escalar: múltiplos slices / stores, middlewares, persistência

- À medida que a aplicação cresce, pode fazer sentido:

- separar stores por “fatias” de domínio (ex: auth, ui, data, settings, etc);

- usar middlewares (persistência, devtools, etc);

- criar ações assíncronas (fetch de API, etc);

- compor stores de forma organizada.
zustand.docs.pmnd.rs
namastedev.com

## Exemplo simplificado com “slice” para tarefas (todos)

```ts
// src/store/useTodoStore.ts
import { create } from "zustand";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (title) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: String(Date.now()), title, completed: false },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));

```
