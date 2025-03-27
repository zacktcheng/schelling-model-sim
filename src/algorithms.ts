function shuffleArray(arr: number[]) {
  if (arr.length >= 2) {
    let i = arr.length - 1;
    while (i > 0) {
      const randI = Math.floor(Math.random() * i--);
      [arr[i], arr[randI]] = [arr[randI], arr[i]];
    }
  }
}

function reAssignTypes(community: number[][], typeCount: number) {
  const vacancies = getVacancies(community);
  const n = community.length;
  const length = n ** 2;
  const arr = Array.from({ length }, (_, i) => (i % typeCount) + 1);
  shuffleArray(arr);
  const matrix: number[][] = [];
  for (let i = 0; i < n; i++) matrix.push(arr.slice(n * i, n * (i + 1)));
  for (const vacancy of vacancies) matrix[vacancy[0]][vacancy[1]] = 0;
  return matrix;
}

function initCommunity(typeCount: number, n: number) {
  const length = typeCount > 0 ? n ** 2 : 0;
  const vacancyCount = Math.round(length * 0.1);
  const arr = Array.from({ length }, (_, i) =>
    i < vacancyCount ? 0 : (i % typeCount) + 1,
  );
  shuffleArray(arr);
  const matrix: number[][] = [];
  for (let i = 0; i < n; i++) matrix.push(arr.slice(n * i, n * (i + 1)));
  return matrix;
}

function getVacancies(community: number[][]) {
  const vacancies: number[][] = [];
  for (let row = 0; row < community.length; row++) {
    for (let col = 0; col < community[row].length; col++) {
      if (community[row][col] === 0) {
        vacancies.push([row, col]);
      }
    }
  }
  return vacancies;
}

function relocate(
  row: number,
  col: number,
  vacancies: number[][],
  community: number[][],
) {
  const vacancy = vacancies[Math.floor(Math.random() * vacancies.length)];
  community[vacancy[0]][vacancy[1]] = community[row][col];
  community[row][col] = 0;
  vacancy[0] = row;
  vacancy[1] = col;
}

function getNeigbors(row: number, col: number, community: number[][]) {
  const max = community.length - 1,
    min = 0;
  const leftCol = col > 0 ? col - 1 : max;
  const rightCol = col < max ? col + 1 : min;
  const bottomRow = row > 0 ? row - 1 : max;
  const topRow = row < max ? row + 1 : min;

  const topLeft = community[topRow][leftCol];
  const top = community[topRow][col];
  const topRight = community[topRow][rightCol];
  const left = community[row][leftCol];
  const right = community[row][rightCol];
  const bottomLeft = community[bottomRow][leftCol];
  const bottom = community[bottomRow][col];
  const bottomRight = community[bottomRow][rightCol];
  return [topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight];
}

function relocateAndCountDiffs(community: number[][], threshold: number) {
  let diffs = 0;
  for (let row = 0; row < community.length; row++) {
    for (let col = 0; col < community[row].length; col++) {
      const neighbors = getNeigbors(row, col, community);
      const home = community[row][col];
      const fellowCount = neighbors.filter(
        (neighbor) => neighbor === home,
      ).length;
      const satisfactory = fellowCount / 8;
      if (satisfactory < threshold) {
        diffs++;
        relocate(row, col, getVacancies(community), community);
      }
    }
  }
  return diffs;
}

function runSchellingModel(community: number[][], threshold: number) {
  const vacancyCount = Math.round(community.length ** 2 * 0.1); // equilibrium
  const snapshots = [JSON.parse(JSON.stringify(community))];
  let diffs = relocateAndCountDiffs(community, threshold);
  while (diffs > vacancyCount) {
    diffs = relocateAndCountDiffs(community, threshold);
    snapshots.push(JSON.parse(JSON.stringify(community)));
  }
  snapshots.push(JSON.parse(JSON.stringify(community)));
  return snapshots;
}

export { reAssignTypes, initCommunity, runSchellingModel };
