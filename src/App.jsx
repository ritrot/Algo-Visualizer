import { useState, useEffect } from 'react';
import getLinearSortSteps from './Algo/LinearSort';
import getBubbleSortSteps from './Algo/BubbleSort';
import getQuickSortSteps from './Algo/QuickSort';

function App() {
  const [data, setData] = useState([]);
  const [highlightedIndices, setHighlightedIndices] = useState([]);

  useEffect(() => {
    generateNewData();
  }, []);

  const generateNewData = () => {
    const rand = Array.from({ length: 50 }, () => Math.floor(Math.random() * 500));
    setData(rand);
    setHighlightedIndices([]);
  };

  const HandleLinearSort = async () => {
    const steps = getLinearSortSteps(data);
    for (let step of steps) {
      setData(step.array);
      setHighlightedIndices(step.highlighted);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setHighlightedIndices([]); // clear after animation
  };
  const HandleBubbleSort = async () => {
    const steps = getBubbleSortSteps(data);
    
    for (let step of steps) {
      setData(step.array);
      setHighlightedIndices(step.highlighted);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setHighlightedIndices([]);
  };
  const HandleQuickSort = async () => {
    const steps = getQuickSortSteps(data);
    
    for (let step of steps) {
      setData(step.array);
      setHighlightedIndices(step.highlighted);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setHighlightedIndices([]); 
  };

  return (
    <div className="p-4">
      <div className="flex items-end h-[500px] border mb-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`w-[10px] mx-[1px] ${
              highlightedIndices.includes(index) ? 'bg-red-500' : 'bg-blue-400'
            }`}
            style={{ height: `${item}px` }}
          ></div>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={generateNewData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate New Data
        </button>
        <button
          onClick={HandleLinearSort}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Animate Linear Sort
        </button>
        <button
          onClick={HandleBubbleSort}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Animate Bubble Sort
        </button>
        <button
          onClick={HandleQuickSort}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Animate Quick Sort
        </button>
      </div>
    </div>
  );
}

export default App;
