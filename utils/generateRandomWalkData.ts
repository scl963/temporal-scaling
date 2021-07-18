export function generateRandomWalkData() {
  const initialData = [{ x: 0, y: 0 }];
  let prevValue = 0;

  for (let i = 1; i < 1000; i++) {
    const rand = Math.random();
    let newVal = null;

    if (prevValue === 0) {
      newVal = rand > 0.5 ? 1 : 0;
    } else {
      if (rand > 0.66) {
        newVal = prevValue + 1;
      } else if (rand > 0.33) {
        newVal = prevValue;
      } else {
        newVal = prevValue - 1;
      }
    }

    prevValue = newVal;
    initialData.push({ x: i, y: newVal });
  }

  return initialData;
}
