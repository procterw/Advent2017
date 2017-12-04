const cl = console.log;

const myCode = 368078;

cl( 'PART 1: ' + p1(myCode) );
cl( 'PART 2: ' + p2(myCode) );

// #$&*#@^$&#*@($^(*(#*))) //
// PART 1
// #$&*#@^$&#*@($^(*(#*))) //

function p1(n) {
  const cornerRoot = closestOddRoot(n);
  const mids = findMids(cornerRoot);
  const closestMid = closestN(n, mids);
  const radius = getRadius(cornerRoot);
  return getMagnitude(closestMid, n) + radius;
}

// find the closest odd number squared
function closestOddRoot(n) {
  let i = 1;
  while(true) {
    const sq = Math.pow(i, 2);
    if (sq >=n) return sq;
    i+=2
  }
}

function getRadius(n) {
  return (Math.sqrt(n) - 1) / 2;
}

function getMagnitude(n1, n2) {
  return Math.abs(n1 - n2);
}

function findMids(n) {
  const radius = getRadius(n);
  return [
    n - radius,
    n - radius * 3,
    n - radius * 5,
    n - radius * 7,
  ];
}

// returns [c1, c2, c3, c4]
// 9 -> [3,5,7,9]
function findCorners(n) {
  const sideLength = Math.sqrt(n);
  const stepSize = sideLength - 1;
  return [
    n,
    n - stepSize,
    n - stepSize * 2,
    n - stepSize * 3,
    n - stepSize * 4,
  ];
}

function closestN(n, numbers) {
  const diffs = numbers.map(n1 => Math.abs(n1 - n));
  const smallest = Math.min(...diffs);
  return numbers[diffs.indexOf(smallest)];
}

// #$&*#@^$&#*@($^(*(#*))) //
// PART 2
// #$&*#@^$&#*@($^(*(#*))) //

function p2(n) {

  const store = {
    '0': {
      '0': 1,
    },
  };

  let pos = { x: 0, y: 0};
  let gridSize = 1;
  while (true) {
    const relPos = getGridRelPos(pos, gridSize);
    if (relPos === 'br') gridSize += 2;
    pos = stepPos(pos, relPos);

    const newVal = sumNeighbors(store, pos);
    if (newVal > n) return newVal;

    // update store
    if (!store[pos.x]) store[pos.x] = {};
    store[pos.x][pos.y] = newVal;

  }
}

// cl( getGridRelPos({ x:0, y:0 }, 1) );
// cl( getGridRelPos({ x:1, y:0 }, 9) );
// cl( getGridRelPos({ x:1, y:1 }, 9) );
// cl( getGridRelPos({ x:0, y:1 }, 9) );
// cl( getGridRelPos({ x:-1, y:1 }, 9) );
// cl( getGridRelPos({ x:-1, y:0 }, 9) );
// cl( getGridRelPos({ x:-1, y:-1 }, 9) );
function getGridRelPos(pos, size) {
  const r = (size - 1) / 2;
  const bounds = {
    t: r,
    r: r,
    b: -r,
    l: -r,
  };
  // right
  if (pos.x === bounds.r) {
    if (pos.y === bounds.b) return 'br';
    if (pos.y === bounds.t) return 'tr';
    return 'r';
  }
  // left
  if (pos.x === bounds.l) {
    if (pos.y === bounds.b) return 'bl';
    if (pos.y === bounds.t) return 'tl';
    return 'l';
  }
  // top
  if (pos.y === bounds.t) return 't';
  // bottom
  if (pos.y === bounds.b) return 'b';
}

// cl( stepPos({ x:0, y: 0 }, 'br') );
// cl( stepPos({ x:0, y: 0 }, 'r') );
// cl( stepPos({ x:0, y: 0 }, 'tr') );
// cl( stepPos({ x:0, y: 0 }, 't') );
// cl( stepPos({ x:0, y: 0 }, 'tl') );
// cl( stepPos({ x:0, y: 0 }, 'l') );
// cl( stepPos({ x:0, y: 0 }, 'bl') );
// cl( stepPos({ x:0, y: 0 }, 'b') );
function stepPos(pos, relPos) {
  return {
    br: { ...pos, x: pos.x+1 },
    r: { ...pos, y: pos.y+1 },
    tr: { ...pos, x: pos.x-1 },
    t: { ...pos, x: pos.x-1 },
    tl: { ...pos, y: pos.y-1 },
    l: { ...pos, y: pos.y-1 },
    bl: { ...pos, x: pos.x+1 },
    b: { ...pos, x: pos.x+1 },
  }[relPos];
}


function sumNeighbors(store, pos) {
  const adjacents = [
    { x: pos.x+1, y: pos.y-1 }, // br
    { x: pos.x+1, y: pos.y }, // r
    { x: pos.x+1, y: pos.y+1 }, // tr
    { x: pos.x, y: pos.y+1 }, // t
    { x: pos.x-1, y: pos.y+1 }, // tl
    { x: pos.x-1, y: pos.y }, // l
    { x: pos.x-1, y: pos.y-1 }, // bl 
    { x: pos.x, y: pos.y-1 }, // b
  ];
  return adjacents.map(({ x, y }) => {
    if (!store[x]) return;
    if (!store[x][y]) return;
    return store[x][y];
  })
    .filter(Boolean)
    .reduce((acc, cur) => acc + cur, 0);
}