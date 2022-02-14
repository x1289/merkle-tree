import MerkleTree from '../dist/merkle-tree.js';

const mt = new MerkleTree();

mt.addLeaf('Something');
mt.addLeaf('Something else');
mt.addLeaf('Something else..');
mt.addLeaf('Something else...');

console.log(mt);
mt.buildTree();
console.log(mt.toString());
