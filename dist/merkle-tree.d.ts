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
    constructor();
    /**
     * Computes the SHA256 hash of a value.
     * @param {string} element String representation of value to be hashed.
     * @return {string} hash of the element parameter
     */
    private _hash;
    /**
     * Builds the next layer above the current layer in the tree.
     * @param {Array<string>} currentLayer The current layer in the tree.
     * @return {Array<string>} The layer on top of the current layer.
     */
    private buildNewLayer;
    /**
     * Custom toString for objects of this class.
     * @return {string} String with basic object information.
     */
    toString(): string;
    /**
     * Adds an element to the leafs of the tree.
     * @param {string} element Element to be added to the tree leafs.
     */
    addLeaf(element: string): void;
    /**
     * Builds the merkle tree from the leafs currently added.
     * @return {void} no return value. Sets object member variables.
     */
    buildTree(): void;
    /**
     * Getter for a layer in the merkle tree by index.
     * @param {number} layerIndex index for desired layer.
     * @return {Array<string> | undefined} array of hashes for this layer.
     */
    getLayer(layerIndex?: number): Array<string> | undefined;
}
