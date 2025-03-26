import './App.css';
import { useState } from 'react';
import { initCommunity, runSchellingModel } from './algorithms.ts';
import SchellingModelChart from './SchellingModelChart.tsx';

function App() {
  // const [community, setCommunity] = useState([]);
  // const [threshold, setThreshold] = useState(.5);
  // const [snapshots, setSnapshots] = useState([]);
  const community = initCommunity(2, 10);
  const threshold = 1 - 4/8; // threshold == 1−τ
  const snapshots = runSchellingModel(community,  threshold);
  function handleStartNew() {
    console.log('start new')
  }
  return (
    <form className='h-full w-full p-4 flex flex-col items-center gap-2'>
      <fieldset className='w-[50%] p-2 border border-black rounded-sm'>
        <legend className='px-2 font-bold text-center'>Schelling Model Simulator:</legend>
        <div className='flex gap-2'>
          <output className='w-[60%] bg-green-300 aspect-square'>
            output
          </output>
          <div className='grow bg-red-300'>
           <button type='button' onClick={handleStartNew}>Start New</button>
          </div>
        </div>
      </fieldset>
      <fieldset className='grow p-2 border border-black rounded-sm'>
        <legend className='px-2 font-semibold text-center'>Simulation Snapshots</legend>
      </fieldset>
    </form>
  );
}

export default App;
