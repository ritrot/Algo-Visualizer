import { useState, useEffect } from 'react';
import getLinearSortSteps from './Algo/LinearSort';
import getBubbleSortSteps from './Algo/BubbleSort';
import getQuickSortSteps from './Algo/QuickSort';
import { motion } from 'framer-motion';

const Sorting = ({ animate, fx, inProcess, setInProcess }) => {
  const [data, setData] = useState([]);
  const [highlightedIndices, setHighlightedIndices] = useState([]);

  const generateNewData = () => {
    const rand = Array.from({ length: 50 }, () => Math.floor(Math.random() * 450 + 50));
    setData(rand);
    setHighlightedIndices([]);
  };

  useEffect(() => {
    if (!inProcess) {
      generateNewData();
    }
  }, [animate]);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const HandleLinearSort = async () => {
    setInProcess(true);
    const steps = getLinearSortSteps(data);
    for (let step of steps) {
      setData(step.array);
      setHighlightedIndices(step.highlighted);
      await sleep(40);
    }
    setInProcess(false);
    setHighlightedIndices([]);
  };

  const HandleBubbleSort = async () => {
    setInProcess(true);
    const steps = getBubbleSortSteps(data);
    for (let step of steps) {
      setData(step.array);
      setHighlightedIndices(step.highlighted);
      await sleep(40);
    }
    setInProcess(false);
    setHighlightedIndices([]);
  };

  const HandleQuickSort = async () => {
    setInProcess(true);
    const steps = getQuickSortSteps(data);
    for (let step of steps) {
      setData(step.array);
      setHighlightedIndices(step.highlighted);
      await sleep(40);
    }
    setInProcess(false);
    setHighlightedIndices([]);
  };

  const sortFunctions = {
    HandleBubbleSort,
    HandleQuickSort,
    HandleLinearSort,
  };

  useEffect(() => {
    if (fx && sortFunctions[fx] && !inProcess) {
      sortFunctions[fx]();
    }
  }, [fx, animate, inProcess]);

  return (
    <div className="flex items-end justify-center h-[500px] w-full bg-slate-900 border-t border-slate-800 px-2 gap-[2px]">
      {data.map((value, index) => {
        const isHighlighted = highlightedIndices.includes(index);

        return (
          <motion.div
            key={index}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3 }}
            className="w-[1.5%] rounded-sm"
            style={{
              height: `${value}px`,
              backgroundColor: isHighlighted ? '#f43f5e' : '#3b82f6',
            }}
          />
        );
      })}
    </div>
  );
};

export default Sorting;
