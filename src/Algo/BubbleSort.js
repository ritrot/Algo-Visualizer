export default function getBubbleSortSteps(arr) {
  
  const steps = [];
  const newArr = [...arr];
  const n = newArr.length;

  for (let i = 0; i < n ; i++) {
    for (let j = 0; j <n-i-1; j++) {
      if (newArr[j] > newArr[j+1]) {
        [newArr[j], newArr[j+1]] = [newArr[j+1], newArr[j]];
        steps.push({
          array: [...newArr],
          highlighted: [j, j+1]
        });
      }
    }
  }
  return steps;
}
