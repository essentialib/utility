const isRange = require("./isRange");

module.exports = function _in(item, iterable) {
	if (iterable instanceof Range) {
		return Number.isInteger(item) && (iterable.start <= item && item < iterable.end);
	} else {
	
	}
	// implement
}