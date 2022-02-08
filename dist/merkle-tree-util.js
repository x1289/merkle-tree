"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var hash = (0, crypto_1.createHash)('sha256');
/**
 * Represents a Merkle Tree
 */
var MerkleTree = /** @class */ (function () {
    /**
     *
     */
    function MerkleTree() {
        this.merkleRoot = null;
        this.layers = [];
        this.leafs = [];
    }
    /**
     * Custom toString for objects of this class.
     * @return {String} String with basic object information.
     */
    MerkleTree.prototype.toString = function () {
        if (!this.merkleRoot)
            return "Merkle Tree - Tree not built.";
        return "Merkle Tree - tree height: ".concat(this.layers.length, ",     merkle root: '").concat(this.merkleRoot, "'");
    };
    /**
     * Adds an element to the leafs of the tree.
     * @param {String | Object} element Element to be added to the tree leafs.
     */
    MerkleTree.prototype.addLeaf = function (element) {
        this.leafs.push(element);
    };
    /**
     * Computes the SHA256 hash of a value.
     * @param {String} element String representation of value to be hashed.
     * @return {String} hash of the element parameter
     */
    MerkleTree.prototype._hash = function (element) {
        return hash.copy().update(element).digest('hex');
    };
    /**
     * Builds the merkle tree from the leafs currently added.
     * @return {void} no return value. Sets object member variables.
     */
    MerkleTree.prototype.buildTree = function () {
        var _this = this;
        if (this.leafs.length === 0)
            return;
        if (this.leafs.length % 2 !== 0) {
            this.leafs.push(this.leafs[this.leafs.length - 1]);
        }
        this.layers.push(this.leafs.map(function (leaf) { return _this._hash(leaf); }));
        var currentLayer = this.layers[0];
        while (currentLayer.length > 1) {
            currentLayer = this.buildNewLayer(currentLayer);
            this.layers.push(currentLayer);
        }
        if (this.layers.length > 0)
            this.merkleRoot = this.layers.at(-1)[0];
    };
    /**
     * Builds the next layer above the current layer in the tree.
     * @param {Array<String>} currentLayer The current layer in the tree.
     * @return {Array<String>} The layer on top of the current layer.
     */
    MerkleTree.prototype.buildNewLayer = function (currentLayer) {
        var newLayer = [];
        for (var i = 0; i < currentLayer.length; i += 2) {
            var element = currentLayer[i];
            if (!element)
                break;
            var element2 = currentLayer[i + 1];
            if (!element2)
                element2 = element;
            newLayer.push(this._hash("".concat(element).concat(element2)));
        }
        return newLayer;
    };
    /**
     * Getter for a layer in the merkle tree by index.
     * @param {number} layerIndex index for desired layer.
     * @return {Array<String> | undefined} array of hashes for this layer.
     */
    MerkleTree.prototype.getLayer = function (layerIndex) {
        if (layerIndex === void 0) { layerIndex = 0; }
        if (typeof layerIndex !== 'number')
            return;
        if (layerIndex < 0 || layerIndex > this.layers.length)
            return;
        return this.layers[layerIndex];
    };
    return MerkleTree;
}());
module.exports = MerkleTree;
//# sourceMappingURL=merkle-tree-util.js.map
