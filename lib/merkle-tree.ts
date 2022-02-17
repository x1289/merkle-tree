import {createHash} from 'crypto';
const hash = createHash('sha256');

/**
 * Represents a Merkle Tree
 */
export default class MerkleTree {
  merkleRoot: string;
  layers: Array<Array<string>>;
  leafs: Array<string>;

  /**
   * Initializes member variables.
   */
  constructor() {
    this.merkleRoot = null;
    this.layers = [];
    this.leafs = [];
  }

  /**
   * Computes the SHA256 hash of a value.
   * @param {string} element String representation of value to be hashed.
   * @return {string} hash of the element parameter
   */
  private _hash(element) {
    return hash.copy().update(element).digest('hex');
  }


  /**
   * Builds the next layer above the current layer in the tree.
   * @param {Array<string>} currentLayer The current layer in the tree.
   * @return {Array<string>} The layer on top of the current layer.
   */
  private buildNewLayer(currentLayer: Array<string>) {
    const newLayer = [];
    for (let i = 0; i < currentLayer.length; i += 2) {
      const element = currentLayer[i];
      if (!element) break;
      let element2 = currentLayer[i + 1];
      if (!element2) element2 = element;
      newLayer.push(this._hash(`${element}${element2}`));
    }
    return newLayer;
  }

  /**
   * Custom toString for objects of this class.
   * @return {string} String with basic object information.
   */
  toString() {
    if (!this.merkleRoot) return `Merkle Tree - Tree not built.`;
    return `Merkle Tree - tree height: ${this.layers.length}, \
merkle root: '${this.merkleRoot}'`;
  }

  /**
   * Adds an element to the leafs of the tree.
   * @param {string} element Element to be added to the tree leafs.
   */
  addLeaf(element: string) {
    this.leafs.push(element);
  }

  /**
   * Builds the merkle tree from the leafs currently added.
   * @return {void} no return value. Sets object member variables.
   */
  buildTree() {
    if (this.leafs.length === 0) return;
    if (this.leafs.length === 1) {
      const result = this._hash(this.leafs[0]);
      this.layers.push([result]);
      this.merkleRoot = result;
      return;
    }
    if (this.leafs.length % 2 !== 0) {
      this.leafs.push(this.leafs[this.leafs.length - 1]);
    }

    this.layers.push(this.leafs.map((leaf) => this._hash(leaf)));
    let currentLayer = this.layers[0];

    while (currentLayer.length > 1) {
      currentLayer = this.buildNewLayer(currentLayer);
      this.layers.push(currentLayer);
    }
    if (this.layers.length > 0) this.merkleRoot = this.layers.at(-1)[0];
  }

  /**
   * Getter for a layer in the merkle tree by index.
   * @param {number} layerIndex index for desired layer.
   * @return {Array<string> | undefined} array of hashes for this layer.
   */
  getLayer(layerIndex = 0): Array<string> | undefined {
    if (typeof layerIndex !== 'number') return;
    if (layerIndex < 0 || layerIndex > this.layers.length) return;
    return this.layers[layerIndex];
  }
}
