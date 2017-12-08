// Okay using lodash and d3 when I need them
const _ = require('lodash');
const d3 = require('d3-array');
const input = require('./day8-input');

const cl = console.log;
const json = obj => JSON.stringify(obj, null, 2);

let p2 = 0;

cl( 'PART 1: ' + p1(input));
cl( 'PART 2: ' + p2);

function p1(input) {
  const clean = cleanInput(input);
  const registers = getRegisters(clean);
  clean.forEach(row => {
    const { cn, op } = row;
    if (compare(cn.com, registers[cn.r], cn.n)) {
      registers[op.r] = operate(op.op, registers[op.r], op.n)
    }
    // PART 2
    p2 = d3.max([p2, ..._.values(registers)]);
  });
  // PART 1
  return d3.max(_.values(registers));
}

function cleanInput(input) {
  return input
    .map(str => str.split(' '))
    .map(arr => ({
      cn: {
        r: arr[4], // register
        com: arr[5], // comparator
        n: +arr[6],
      },
      op: {
        r: arr[0], // register
        op: arr[1], // operation
        n: +arr[2],
      },
    }));
}

function getRegisters(input) {
  let rej = {};
  _.uniq(_.flatten(input.map(d => [d.cn.r, d.op.r])))
    .forEach(r => rej[r] = 0);
  return rej;
}

function operate(op, r, n) {
  return {
    'inc': r + n, 
    'dec': r - n,
  }[op];
}

function compare(com, r, n) {
  // console.log(com, r, n)
  return {
    '>': r > n,
    '>=': r >= n,
    '==': r === n,
    '<=': r <= n,
    '<': r < n,
    '!=': r !== n,
  }[com];
}