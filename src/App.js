import './App.css';
import { useState } from 'react';
import { initCommunity, runSchellingModel } from './algorithms.ts';

function App() {
  // const [community, setCommunity] = useState([]);
  // const [threshold, setThreshold] = useState(.5);
  // const [snapshots, setSnapshots] = useState([]);
  const community = initCommunity(2, 10);
  const threshold = 1 - 4/8; // threshold == 1−τ
  const snapshots = runSchellingModel(community,  threshold);
  console.log(snapshots)
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  );
}

export default App;
