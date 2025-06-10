export default function getLinearSortSteps(arr) {
  const steps = [];
  const newArr = [...arr];
  const n = newArr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (newArr[i] > newArr[j]) {
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        steps.push({
          array: [...newArr],
          highlighted: [i, j]
        });
      }
    }
  }

  return steps;
}
