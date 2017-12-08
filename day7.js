// Okay using lodash and d3 when I need them
const _ = require('lodash');
const d3 = require('d3-array');
const input = require('./day7-input');

const cl = console.log;
const json = obj => JSON.stringify(obj, null, 2);

cl( 'PART 2: ' + json(p2(input)));

// #$&*#@^$&#*@($^(*(#*))) //
// PART 1
// #$&*#@^$&#*@($^(*(#*))) //

// I used command-f in the browser to find the root

// #$&*#@^$&#*@($^(*(#*))) //
// PART 2
// #$&*#@^$&#*@($^(*(#*))) //
function p2(input, rootName='vgzejbd') {
  const weighted = aggregateWeights(rootName);
  return dive(weighted);

  function aggregateWeights(nodeName) {
    const node = getNode(nodeName);
    const children = (node.c || []).map(aggregateWeights);
    return {
      ...node,
      c: children,
      aw: d3.sum([node.w, ...children.map(c => c.aw)]),
    };
  }

  function getNode(name) {
    return _.find(input, ['n', name]);
  }

}

function dive(node) {
  const children = node.c;
  if (!children) return node;
  const badBranch = findBadBranch(children);
  if (!!badBranch) {
    return dive(findBadBranch(children));
  }
  return node.w - node.diff;
}

function findBadBranch(nodes) {
  const q = d3.quantile(nodes.map(n => n.aw), 0.5);
  const weird = nodes.filter(n => n.aw !== q)[0];
  if (!weird) return;
  return {
    ...weird,
    diff: Math.abs(weird.aw - q),
  };
}