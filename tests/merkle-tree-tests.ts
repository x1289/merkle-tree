import {expect} from 'chai';
import MerkleTree from '../lib/merkle-tree';

describe('MerkleTree tests', () => {
  it('should have a class to import', () => {
    expect(MerkleTree).to.not.be.undefined;
  });
  it('should initialize members correctly', () => {
    const mt = new MerkleTree();
    expect(mt.merkleRoot).to.equal(null);
    expect(mt.layers).to.eql([]);
    expect(mt.leafs).to.eql([]);
  });
  it('should add leafs to leafs member accordingly', () => {
    const mt = new MerkleTree();
    const someLeaf = 'something';
    mt.addLeaf(someLeaf);
    expect(mt.leafs.length).to.equal(1);
    expect(mt.leafs[0]).to.equal(someLeaf);
  });
  it('should not build a tree without leafs', () => {
    const mt = new MerkleTree();
    mt.buildTree();
    expect(mt.merkleRoot).to.equal(null);
    expect(mt.layers).to.eql([]);
    expect(mt.leafs).to.eql([]);
  });
  it('should build a tree with 1 layer when there is just 1 leaf', () => {
    const mt = new MerkleTree();
    mt.addLeaf('something');
    mt.buildTree();
    expect(mt.merkleRoot).to.not.equal(null);
    expect(mt.layers.length).to.equal(1);
    expect(mt.layers[0].length).to.equal(1);
  });
  it('should add a duplicate leaf on uneven # of leafs', () => {
    const mt = new MerkleTree();
    mt.addLeaf('something');
    mt.addLeaf('something2');
    mt.addLeaf('something3');
    mt.buildTree();
    expect(mt.merkleRoot).to.not.equal(null);
    expect(mt.layers.length).to.equal(3);
    expect(mt.layers[0].length).to.equal(4);
    expect(mt.layers[1].length).to.equal(2);
    expect(mt.layers[2].length).to.equal(1);
  });
  it('should get layers by index correctly', () => {
    const mt = new MerkleTree();
    mt.addLeaf('something');
    mt.addLeaf('something2');
    mt.buildTree();
    const layer0 = mt.getLayer(0);
    const layer1 = mt.getLayer(1);
    expect(layer0).to.eql(mt.layers[0]);
    expect(layer1).to.eql(mt.layers[1]);
  });
  it('should return undefined for invalid layer index', () => {
    const mt = new MerkleTree();
    mt.addLeaf('something');
    mt.addLeaf('something2');
    mt.buildTree();
    const someLayer = mt.getLayer('invalid' as any);
    const negativeLayer = mt.getLayer(-1);
    expect(someLayer).to.be.undefined;
    expect(negativeLayer).to.be.undefined;
  });
  it('should stringify a MerkleTree object correctly', () => {
    const mt = new MerkleTree();
    const notBuiltTreeString = mt.toString();
    expect(notBuiltTreeString).to.equal('Merkle Tree - Tree not built.');
    mt.addLeaf('something');
    mt.buildTree();
    const builtTreeString = mt.toString();
    expect(builtTreeString).to.include('Merkle Tree - tree height: ');
  });
});
