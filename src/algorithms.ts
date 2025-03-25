function shuffleArray(arr: number[]) {
  if (arr.length >= 2) {
   let i = arr.length - 1;
   while (i > 0) {
    const randI = Math.floor(Math.random() * i--);
    [arr[i], arr[randI]] = [arr[randI], arr[i]];
   } 
  }
}

function initNeighbors(typeCount: number, n: number) {
  const length = typeCount > 0 ? n**2 : 0;
  const arr = Array.from({ length }, (_, i) => i % typeCount);
  shuffleArray(arr);
  const matrix: number[][] = [];
  for (let i = 0; i < n**2; i += n) matrix.push(arr.slice(i, i + n));
  return matrix;
}

function getVacancies(matrix: number[][]) {
  const vacancies = [];
  
}

export {
  initNeighbors,
};