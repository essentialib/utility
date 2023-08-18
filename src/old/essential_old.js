let typename = require('./old_functions/util/typename.js');
let equal = require('./old_functions/util/equal.js');

const HAS_INDEX = [Array, String];
const HAS_KEY = [Array, Object, String, Map];
const HAS_VALUE = [Array, Object, String, Map, Set];
const CAN_MATH = [Array, Set];

function importf(path, supportTypes) {
	let f = function () {
		if (typename(supportTypes) === "Function") {
			supportTypes = [supportTypes];
		}
		
		let isConstructor = f => {
			try {
			  new f();
			} catch (err) {
				return false;
			}
			return true;
		}

		let constructorToName = f => {
			if (f == null)
				return "undefined";
			else
				return f.name;
		};

		if (!supportTypes.every(isConstructor))
			throw new TypeError("`supportTypes` should be constructor function");

		if (equal(supportTypes, []) || supportTypes.map(constructorToName).includes(typename(this.wrap))) {
			let func = require(path);
			let result = func.apply(this, arguments);

			if (this.chaining) {
				this.wrap = result;
				return this;
			} else {
				return result;
			}
		}
		else {
			let pathSplited = path.split('/');
			let funcName = pathSplited[pathSplited.length - 1].split('.')[0];
			throw new TypeError("`" + funcName + "` function only supports " + supportTypes.map(e => e.name) + " typename, not " + typename(this.wrap) + " typename");
		}
	};

	f.toString = () => "function " + path.split('/')[path.split('/').length - 1].split('.')[0] + "() { [code] }";
	
	return f;
}

const array = {
	flattenAll: importf('./old_functions/array/flattenAll.js', Array),
	flattenDepth: importf('./old_functions/array/flattenDepth.js', Array),
	flatten: importf('./old_functions/array/flatten.js', Array),
	getDepth: importf('./old_functions/array/getDepth.js', Array),
	push: importf('./old_functions/array/push.js', Array),
	append: importf('./old_functions/array/push.js', Array),
	pushAll: importf('./old_functions/array/pushAll.js', Array),
	appendAll: importf('./old_functions/array/pushAll.js', Array),
	chuck: importf('./old_functions/array/chuck.js', Array),
	unique: importf('./old_functions/array/unique.js', Array),
	uniqueBy: importf('./old_functions/array/uniqueBy.js', Array),
	pull: importf('./old_functions/array/pull.js', Array),
	pullAll: importf('./old_functions/array/pullAll.js', Array)
}

const string = {
	trim: importf('./old_functions/string/trim.js', String),
	trimLeft: importf('./old_functions/string/trimLeft.js', String),
	trimRight: importf('./old_functions/string/trimRight.js', String),
	format: importf('./old_functions/string/format.js', String),
	f: importf('./old_functions/string/format.js', String),
	toCaseFormat: importf('./old_functions/string/toCaseFormat.js', String),
	toUpper: importf('./old_functions/string/toUpper.js', String),
	toLower: importf('./old_functions/string/toLower.js', String)
}

const func = {

}

const indexed = {
	at: importf('./old_functions/indexed/at.js', HAS_INDEX),
	nth: importf('./old_functions/indexed/at.js', HAS_INDEX),
	head: importf('./old_functions/indexed/head.js', HAS_INDEX),
	first: importf('./old_functions/indexed/head.js', HAS_INDEX),
	front: importf('./old_functions/indexed/head.js', HAS_INDEX),
	tail: importf('./old_functions/indexed/tail.js', HAS_INDEX),
	last: importf('./old_functions/indexed/tail.js', HAS_INDEX),
	back: importf('./old_functions/indexed/tail.js', HAS_INDEX),
	pop: importf('./old_functions/indexed/pop.js', HAS_INDEX),
	drop: importf('./old_functions/indexed/pop.js', HAS_INDEX),
	find: importf('./old_functions/indexed/find.js', HAS_INDEX),
	rfind: importf('./old_functions/indexed/rfind.js', HAS_INDEX),
	slice: importf('./old_functions/indexed/slice.js', HAS_INDEX),
	replace: importf('./old_functions/indexed/replace.js', HAS_INDEX),
	repeat: importf('./old_functions/indexed/repeat.js', HAS_INDEX),
	startsWith: importf('./old_functions/indexed/startsWith.js', HAS_INDEX),
	endsWith: importf('./old_functions/indexed/endsWith.js', HAS_INDEX),
	pad: importf('./old_functions/indexed/pad.js', HAS_INDEX),
	padStart: importf('./old_functions/indexed/padStart.js', HAS_INDEX),
	padEnd: importf('./old_functions/indexed/padEnd.js', HAS_INDEX),
}

const collection = {
	each: importf('./old_functions/collection/each.js', HAS_VALUE),
	forEach: importf('./old_functions/collection/each.js', HAS_VALUE),
	reach: importf('./old_functions/collection/reach.js', HAS_VALUE),
	rforEach: importf('./old_functions/collection/reach.js', HAS_VALUE),
	map: importf('./old_functions/collection/map.js', HAS_VALUE),
	transform: importf('./old_functions/collection/map.js', HAS_VALUE),
	filter: importf('./old_functions/collection/filter.js', HAS_VALUE),
	filterNot: importf('./old_functions/collection/filterNot.js', HAS_VALUE),
	every: importf('./old_functions/collection/every.js', HAS_VALUE),
	some: importf('./old_functions/collection/some.js', HAS_VALUE),
	count: importf('./old_functions/collection/count.js', HAS_VALUE),
	countBy: importf('./old_functions/collection/countBy.js', HAS_VALUE),
	keys: importf('./old_functions/collection/keys.js', HAS_KEY),
	values: importf('./old_functions/collection/values.js', HAS_VALUE),
	items: importf('./old_functions/collection/items.js', HAS_KEY),
	pairs: importf('./old_functions/collection/items.js', HAS_KEY),
	compact: importf('./old_functions/collection/compact.js', HAS_VALUE),
	truthly: importf('./old_functions/collection/compact.js', HAS_VALUE),
	add: importf('./old_functions/collection/add.js', HAS_VALUE),
	has: importf('./old_functions/collection/has.js', HAS_VALUE),
	includes: importf('./old_functions/collection/has.js', HAS_VALUE),
	contains: importf('./old_functions/collection/has.js', HAS_VALUE),
	freq: importf('./old_functions/collection/freq.js', HAS_VALUE)
}

const math = {
	sum: importf('./old_functions/math/reduce.js', CAN_MATH),
	sumBy: importf('./old_functions/math/sumBy.js', CAN_MATH),
	product: importf('./old_functions/math/product.js', CAN_MATH),
	productBy: importf('./old_functions/math/productBy.js', CAN_MATH),
	max: importf('./old_functions/math/max.js', CAN_MATH),
	maxBy: importf('./old_functions/math/maxBy.js', CAN_MATH),
	min: importf('./old_functions/math/min.js', CAN_MATH),
	minBy: importf('./old_functions/math/minBy.js', CAN_MATH)
}

const util = {
	isOf: importf('./old_functions/util/isOf.js', []),
	chain: importf('./old_functions/util/chain.js', []),
	isConstructor: importf('./old_functions/util/isConstructor.js', [])
}

const self = {
	equal: equal,
	len: require('./old_functions/util/len.js'),
	range: require('./old_functions/util/range.js'),
	typename: typename,
	pretty: require('./old_functions/util/pretty.js')
}

function Essential_old(wrap) {
	if (wrap.constructor.name === "Essential_old")
		return wrap;

	this.wrap = wrap;
	this.equalf = equal;
	this.chaining = false;
}

function Essentialf(obj) {
	return new Essential_old(obj);
}

Essential_old.prototype = Object.assign(Essential_old.prototype, array, string, func, indexed, collection, math, util);
Essentialf = Object.assign(Essentialf, self);

module.exports = Essentialf;