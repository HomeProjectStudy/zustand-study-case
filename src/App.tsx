import { Counter } from './components/app/Counter';
import { UserProfile } from './components/app/UserProfile';

export function App() {


  return (
    <div className='min-h-screen p-6 grid place-content-center'>
      <div className="space-y-10">
        <Counter />
        <UserProfile />
      </div>
    </div>
  );
}

export default App;
