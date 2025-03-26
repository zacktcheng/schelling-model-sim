import './App.css';
import React, { useState } from 'react';
import { initCommunity, runSchellingModel } from './algorithms.ts';
import SchellingModelChart from './SchellingModelChart.tsx';

function App() {
  // const [community, setCommunity] = useState([]);
  // const [threshold, setThreshold] = useState(.5);
  // const [snapshots, setSnapshots] = useState([]);
  const [n, setN] = useState(10);
  const [typeCount, setTypeCount] = useState(2);
  const community = initCommunity(2, 10);
  const threshold = 1 - 4/8; // threshold == 1−τ
  const snapshots = runSchellingModel(community,  threshold);
  function handleStartNew() {
    console.log('start new')
  }
  function handleMatrixLength(event: any) {
    setN(event.target.value);
  }
  function handleTypeCount(event: any) {
    setTypeCount(event.target.value)
  }
  return (
    <form className='h-full w-full p-4 flex flex-col items-center gap-2'>
      <fieldset className='w-[50%] p-2 border border-black rounded-lg'>
        <legend className='px-2 font-bold text-center'>Schelling Model Simulator:</legend>
        <div className='flex gap-2'>
          <output className='w-[60%] aspect-square border rounded-md p-2'>
            output
            <div></div>
          </output>
          <div className='grow p-2 flex flex-col gap-2 border rounded-md'>
            <div className='flex flex-col gap-1'>
              <div className='flex justify-end gap-1 text-xs'>
                <label htmlFor='n'>Matrix Length:</label>
                <output>{n}</output>
              </div>
              <input type='range' id='n' min={4} max={16} defaultValue={10} step={1} onChange={handleMatrixLength} /> 
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex justify-end gap-1 text-xs'>
                <label htmlFor='type-count'>Type Count:</label>
                <output>{typeCount}</output>
              </div>
              <input type='range' id='type-count' min={1} max={4} defaultValue={2} step={1} onChange={handleTypeCount} /> 
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset className='w-[50%] bg-red-400 p-2 border border-black rounded-lg'>
        <legend className='px-2 font-semibold text-center'>Simulation Snapshots</legend>
        {/* <div className='h-[700px]'></div> */}
      </fieldset>
    </form>
  );
}

export default App;
