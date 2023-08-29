const indices = require("../functions/indices");

function IndexError(indexer, curIdx) {
	this.name = "IndexError";
	this.message = this.name + ": " + curIdx + " is out of range " + indices(indexer);
	this.stack = (new Error()).stack;
}
IndexError.prototype = Object.create(Error.prototype);
IndexError.prototype.constructor = IndexError;

module.exports = IndexError;