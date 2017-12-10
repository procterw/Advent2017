const _ = require('lodash');
const d3 = require('d3-array');

const input = [165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153];

const cl = console.log;

cl( 'PART 1: ' + p1(input));
cl( 'PART 2: ' + p2(input));

// #$&*#@^$&#*@($^(*(#*))) //
// PART 1
// #$&*#@^$&#*@($^(*(#*))) //

function p1(input) {
  const list = createList(256);
  const initialState = { list, curPos: 0, skipSize: 0 };
  const hashed = input.reduce(knot, initialState).list;
  return hashed[0] * hashed[1];
}

function createList(n) {
  return Array.apply(null, {length: n}).map(Number.call, Number);
}

// Move array over
// [0,1,2], 0  => [0,1,2]
// [0,1,2], 1  => [1,2,0]
// [0,1,2], -1 => [2,0,1]
function shiftArray(arr, n) {
  if (n==0) return arr;
  if (n<0) return [
    ...arr.slice(arr.length+n, arr.length),
    ...arr.slice(0, arr.length+n),
  ]
  if (n>0) return [
    ...arr.slice(n, arr.length),
    ...arr.slice(0, n),
  ]
}

function knot(state, length) {
  let { list, curPos, skipSize } = state;

  const list1 = shiftArray(list, curPos);
  const list2 = shiftArray([
    ...list1.slice(0, length).reverse(),
    ...list1.slice(length, list1.length),
  ], curPos * -1);

  return {
    list: list2,
    curPos: (curPos + length + skipSize) % list2.length,
    skipSize: skipSize + 1,
  };
}

// #$&*#@^$&#*@($^(*(#*))) //
// PART 2
// #$&*#@^$&#*@($^(*(#*))) //

function p2(input) { 
  const lengths = _.flatten(createList(64).map(x=>arrToBytes(input)));
  const list = createList(256);
  const initialState = { list, curPos: 0, skipSize: 0 };
  const spareHash = lengths.reduce(knot, initialState).list;
  const denseHash = densifyHash(spareHash);
  return hexify(denseHash);
}

function densifyHash(hash) {
  const denseHash = [];
  for (let i=0; i<hash.length; i+=16) {
    const chunk = hash.slice(i, i+16);
    denseHash.push(chunk.reduce((acc, n) => acc^n, 0));
  }
  return denseHash;
}

function hexify(arr) {
  return arr.map(n => n.toString(16))
    .map(n => n.length < 2 ? '0' + n : n)
    .join('');
}

function arrToBytes(arr) {
  return [
    ...arr.join(',').split('').map(cToBtye),
    ...[17, 31, 73, 47, 23],
  ];
}

function cToBtye(c) {
  return {
    ',': 44,
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
  }[c];
}