const DomainError = require('../errors/DomainError');

/**
 * @example
 * assert(1 === 1)
 * // => undefined
 * assert(1 === 2)
 * // => DomainError: Assertion failed.
 * assert(1 === 2, '1 is not equal to 2')
 * // => DomainError: 1 is not equal to 2
 */
module.exports = function assert(condition, failMessage) {
	if (!condition) {
		throw new DomainError(failMessage || 'Assertion failed.');
	}
	
	return undefined;
}