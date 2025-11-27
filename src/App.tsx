import { Button } from './components/button';
import { useStore } from './store';

export function App() {
  const {counter, increment} = useStore();


  return (
    <div>
      <h1>counter: {counter}</h1>
      <Button type='button' onClick={increment}>
        Incrementar
      </Button>
    </div>
  );
}

export default App;
