import { useStore } from '@/store';
import { Button } from '../Button';

export function Counter() {
  console.log('Counter rendered!');

  const { counter, increment } = useStore();

  return (
    <div className='space-y-2'>
      <h1>counter: {counter}</h1>
      <Button type='button' onClick={increment}>
        Incrementar
      </Button>
    </div>
  );
}
