function partition(arr, low, high, steps) {
  const pivot = arr[high]; // last element as pivot
  let i = low;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      steps.push({
        array: [...arr],
        highlighted: [i, j]
      });
      i++;
    }
  }

  [arr[i], arr[high]] = [arr[high], arr[i]];
  steps.push({
    array: [...arr],
    highlighted: [i, high]
  });

  return i;
}

function quickSortHelper(arr, low, high, steps) {
  if (low < high) {
    const pi = partition(arr, low, high, steps);
    quickSortHelper(arr, low, pi - 1, steps);
    quickSortHelper(arr, pi + 1, high, steps);
  }
}

export default function getQuickSortSteps(arr) {
  const steps = [];
  const newArr = [...arr];
  quickSortHelper(newArr, 0, newArr.length - 1, steps);
  return steps;
}
