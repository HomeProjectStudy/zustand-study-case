import { useStore } from '@/store';
import { Button } from '../Button';
import { useShallow } from 'zustand/react/shallow';

export function Counter() {
  console.log('Counter rendered!');

  const { counter, increment } = useStore(useShallow(state => ({
    counter: state.counter,
    increment: state.increment
  })));


  return (
    <div className='space-y-2'>
      <h1>counter: {counter}</h1>
      <Button type='button' onClick={increment}>
        Incrementar
      </Button>
    </div>
  );
}
