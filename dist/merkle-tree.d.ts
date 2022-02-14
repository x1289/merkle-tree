/**
 * Represents a Merkle Tree
 */
export default class MerkleTree {
    merkleRoot: String;
    layers: Array<Array<String>>;
    leafs: Array<String>;
    /**
     * Initializes member variables.
     */
    constructor();
    /**
     * Computes the SHA256 hash of a value.
     * @param {String} element String representation of value to be hashed.
     * @return {String} hash of the element parameter
     */
    private _hash;
    /**
     * Builds the next layer above the current layer in the tree.
     * @param {Array<String>} currentLayer The current layer in the tree.
     * @return {Array<String>} The layer on top of the current layer.
     */
    private buildNewLayer;
    /**
     * Custom toString for objects of this class.
     * @return {String} String with basic object information.
     */
    toString(): string;
    /**
     * Adds an element to the leafs of the tree.
     * @param {String} element Element to be added to the tree leafs.
     */
    addLeaf(element: String): void;
    /**
     * Builds the merkle tree from the leafs currently added.
     * @return {void} no return value. Sets object member variables.
     */
    buildTree(): void;
    /**
     * Getter for a layer in the merkle tree by index.
     * @param {number} layerIndex index for desired layer.
     * @return {Array<String> | undefined} array of hashes for this layer.
     */
    getLayer(layerIndex?: number): Array<String> | undefined;
}
