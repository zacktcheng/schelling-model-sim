import './App.css';
import { initNeighbors } from './algorithms.ts';

function App() {
  const nn = initNeighbors(2, 10);
  console.log(nn)
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  );
}

export default App;
