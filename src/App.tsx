import React, { useEffect, useState } from 'react';
import { initCommunity, runSchellingModel } from './algorithms.ts';
import FormControl from './FormControl.tsx';
import SchellingModelChart from './SchellingModelChart.tsx';

function App() {
  const [n, setN] = useState(16);
  const [typeCount, setTypeCount] = useState(2);
  const [threshold, setThreshold] = useState(.5); // threshold == 1-τ
  const [snapshots, setSnapshots] = useState<number[][][]>([]);
  const [snapshotIdx, setSnapshotIdx] = useState(0);
  function handleMatrixLength(event: any) {
    setN(+event.target.value);
  }
  function handleTypeCount(event: any) {
    setTypeCount(+event.target.value)
  }
  function handleThreshold(event: any) {
    setThreshold(+event.target.value);
  }
  function handleSnapshotIdx(event: any) {
    setSnapshotIdx(+event.target.value);
  }
  function handleSimulate() {
    const newCommunity = initCommunity(typeCount, n);
    const newSnapshots = runSchellingModel(newCommunity, threshold);
    setSnapshots(newSnapshots);
    setSnapshotIdx(0);
  }
  useEffect(() => {
    handleSimulate();
  }, []);
  return (
    <form className='h-full w-full p-4 flex flex-col items-center gap-2'>
      <fieldset className='w-[50%] p-2 border border-black rounded-lg'>
        <legend className='px-2 font-bold text-center'>Schelling Model Simulator</legend>
        <div className='flex gap-2'>
          <output className='w-[60%] aspect-square border rounded-md p-2 flex flex-col justify-between'>
            <h1 className='font-semibold text-sm text-center'>Output</h1>
            <div className='grow p-2 flex flex-col justify-center item-center'>
              {snapshots.length > 0 && <SchellingModelChart snapshot={snapshots[snapshotIdx]} />}
            </div>
            <FormControl
              labelText='Snapshot Number:'
              outputText={snapshotIdx}
              inputAttr={{ type: 'range', min: 0, max: snapshots.length - 1, value: snapshotIdx, step: 1, onChange: handleSnapshotIdx }}
            />
          </output>
          <div className='grow p-2 flex flex-col gap-2 border rounded-md'>
            <FormControl
              labelText='Matrix Length:'
              outputText={n}
              inputAttr={{ type: 'range', min: 4, max: 64, value: n, step: 1, onChange: handleMatrixLength,
              }}
            />
            <FormControl
              labelText='Type Count:'
              outputText={typeCount}
              inputAttr={{ type: 'range', min: 1, max: 4, value: typeCount, step: 1, onChange: handleTypeCount }}
            />
            <FormControl
              labelText='Threshold:'
              outputText={threshold}
              inputAttr={{ type: 'range', min: 0, max: 1, value: threshold, step: .1, onChange: handleThreshold }}
            />
            <FormControl
              inputAttr={{ type: 'button', value: 'Simulate', onClick: handleSimulate,
                className: 'hover:bg-gray-100 active:bg-gray-200 text-sm px-2 py-1 border border-gray-400 rounded ml-auto'
              }}
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
}

export default App;
