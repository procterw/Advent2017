const input = require('./day2-input');
const cl = console.log;

const sm = arr => arr.sort((a,b) => a-b)[0];
const lg = arr => arr.sort((a,b) => b-a)[0];
const sum = arr => arr.reduce((a,c) => a+c, 0);

cl('PART 1: ' + p1(input));
cl('PART 2: ' + p2(input));

function p1(s) {
  return sum(s.map(r=>lg(r)-sm(r)))
}

function p2(input) {
  const divs = input.map(row => {
    for (let i=0; i<row.length; i++) {
      for (let j=0; j<row.length; j++) {
        const n1 = row[i];
        const n2 = row[j];
        if ((n1/n2) % 1 === 0 && n1 !== n2) return n1/n2;
      }
    }
  });
  return sum(divs);
}