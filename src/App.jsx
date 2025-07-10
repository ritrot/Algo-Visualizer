import { useState } from 'react';
import Sorting from './Sorting';
import Graph from './Graph';
import TreeCanvas from './Tree';
import TreeLayout from './TreeLayout';
function App() {
  const [DropDownSort, setDropDownSort] = useState(false);
  const [fxname, setFxname] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [mode, setMode] = useState('graph'); // 'graph' or 'sort'

  const SortList = [
    { fx: "HandleBubbleSort", name: "BubbleSort" },
    { fx: "HandleQuickSort", name: "QuickSort" },
    { fx: "HandleLinearSort", name: "LinearSort" }
  ];

  const handleSortSelect = (item) => {
    setFxname(item.fx);
    setDropDownSort(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col items-center font-mono">
      {/* Navbar */}
      <div className="w-full flex items-center justify-between p-4 bg-slate-800 shadow-md">
        <div className="flex gap-4 items-center">
          {/* Mode Toggle */}
          <button
            onClick={() => setMode('graph')}
            className={`px-4 py-2 rounded ${mode === 'graph' ? 'bg-indigo-600' : 'bg-slate-700'} hover:bg-indigo-500`}
          >
            Pathfinding
          </button>
          <button
            onClick={() => setMode('sort')}
            className={`px-4 py-2 rounded ${mode === 'sort' ? 'bg-indigo-600' : 'bg-slate-700'} hover:bg-indigo-500`}
          >
            Sorting
          </button>
          <button
            onClick={() => setMode('tree')}
            className={`px-4 py-2 rounded ${mode === 'tree' ? 'bg-indigo-600' : 'bg-slate-700'} hover:bg-indigo-500`}
          >
            Tree
          </button>

          {/* Sort Dropdown */}
          {mode === 'sort' && (
            <div className="relative">
              <button
                onClick={() => setDropDownSort(!DropDownSort)}
                className="ml-4 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded"
              >
                Choose Sort
              </button>
              {DropDownSort && (
                <ul className="absolute mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
                  {SortList.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSortSelect(item)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="text-xl font-bold tracking-wide">Algo Visualizer 🚀</div>

        <button
          onClick={() => setAnimate(!animate)}
          className={`bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded ${
            inProcess ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={inProcess}
        >
          {mode === 'graph' ? 'Start Pathfinding' : 'Generate New Data'}
        </button>
      </div>

      {/* Visualizer Area */}
      <div className="w-full flex justify-center items-center p-8">
        {mode === 'graph' && <Graph startAnimation={animate} />}
        {mode === 'tree' && <TreeLayout/>}
        {mode === 'sort' && (
          <Sorting
            fx={fxname}
            animate={animate}
            inProcess={inProcess}
            setInProcess={setInProcess}
          />
        )}
      </div>
    </div>
  );
}

export default App;
