function DomainError(message) {
	this.name = this.constructor.name;
	this.message = this.name + ": " + (message || "domain error");
	this.stack = (new Error()).stack;
}
DomainError.prototype = Object.create(Error.prototype);
DomainError.prototype.constructor = DomainError;

module.exports = DomainError;