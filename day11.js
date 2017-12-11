const _ = require('lodash');
const d3 = require('d3-array');
const fs = require('fs');

const input = fs.readFileSync('./day11-input.txt', 'utf8').split(',');
// const input = 'ne,ne,ne'.split(',');
// const input = 'ne,ne,sw,sw'.split(',');
// const input = 'se,sw,se,sw,sw'.split(',');
// const input = 'n,ne,nw'.split(',');

const cl = console.log;
const json = obj => JSON.stringify(obj, null, 2);

cl( 'PART 1: ' + json(p1(input)));
cl( 'PART 2: ' + p2(input));

// #$&*#@^$&#*@($^(*(#*))) //
// PART 1
// #$&*#@^$&#*@($^(*(#*))) //

function p1(input) {
  return _.flow(
    getDirCounts,
    cancelDirs,
    snipTriangles,
    _.values,
    d3.sum
  )(input);
}

function getDirCounts(arr) {
  const f = s => arr.filter(arr => arr === s).length;
  return {
    n: f('n'),
    ne: f('ne'),
    nw: f('nw'),
    s: f('s'),
    se: f('se'),
    sw: f('sw'),
  };
}

function snipTriangles(counts) {
  // ne, n sw
  const f = (d0,d1,d2) => c => {
    const min = d3.min([c[d1], c[d2]]);
    c[d0] += min;
    c[d1] -= min;
    c[d2] -= min;
    return c;
  };

  return [
    f('ne','n','se'),
    f('se','s','ne'),
    f('s','se','sw'),
    f('sw','s','nw'),
    f('nw','n','sw'),
    f('n','ne','nw'),
  ].reduce((counts, f) => {
    return f(counts);
  }, counts);
}

function cancelDirs(counts) {
  const NS = d3.min([counts.n, counts.s]);
  const NeSw = d3.min([counts.ne, counts.sw]);
  const NwSe = d3.min([counts.nw, counts.se]);
  return {
    n: counts.n - NS,
    ne: counts.ne - NeSw,
    nw: counts.nw - NwSe,
    s: counts.s - NS,
    se: counts.se - NwSe,
    sw: counts.sw - NeSw,
  };
}

// #$&*#@^$&#*@($^(*(#*))) //
// PART 1
// #$&*#@^$&#*@($^(*(#*))) //

function p2(input) {
  return d3.max(input.map((d,i) => p1(input.slice(0,i))));
}