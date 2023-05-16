let typename = require('./functions/util/typename.js');
let equal = require('./functions/util/equal.js');

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
	flattenAll: importf('./functions/array/flattenAll.js', Array),	
	flattenDepth: importf('./functions/array/flattenDepth.js', Array),	
	flatten: importf('./functions/array/flatten.js', Array),	
	getDepth: importf('./functions/array/getDepth.js', Array),	
	push: importf('./functions/array/push.js', Array),	
	append: importf('./functions/array/push.js', Array),	
	pushAll: importf('./functions/array/pushAll.js', Array),	
	appendAll: importf('./functions/array/pushAll.js', Array),	
	chuck: importf('./functions/array/chuck.js', Array),	
	unique: importf('./functions/array/unique.js', Array),	
	uniqueBy: importf('./functions/array/uniqueBy.js', Array),	
	pull: importf('./functions/array/pull.js', Array),	
	pullAll: importf('./functions/array/pullAll.js', Array)
}

const string = {
	trim: importf('./functions/string/trim.js', String),	
	trimLeft: importf('./functions/string/trimLeft.js', String),	
	trimRight: importf('./functions/string/trimRight.js', String),	
	format: importf('./functions/string/format.js', String),	
	f: importf('./functions/string/format.js', String),	
	toCaseFormat: importf('./functions/string/toCaseFormat.js', String),	
	toUpper: importf('./functions/string/toUpper.js', String),	
	toLower: importf('./functions/string/toLower.js', String)
}

const func = {

}

const indexed = {
	at: importf('./functions/indexed/at.js', HAS_INDEX),	
	nth: importf('./functions/indexed/at.js', HAS_INDEX),	
	head: importf('./functions/indexed/head.js', HAS_INDEX),	
	first: importf('./functions/indexed/head.js', HAS_INDEX),	
	front: importf('./functions/indexed/head.js', HAS_INDEX),	
	tail: importf('./functions/indexed/tail.js', HAS_INDEX),	
	last: importf('./functions/indexed/tail.js', HAS_INDEX),	
	back: importf('./functions/indexed/tail.js', HAS_INDEX),	
	pop: importf('./functions/indexed/pop.js', HAS_INDEX),	
	drop: importf('./functions/indexed/pop.js', HAS_INDEX),	
	find: importf('./functions/indexed/find.js', HAS_INDEX),	
	rfind: importf('./functions/indexed/rfind.js', HAS_INDEX),	
	slice: importf('./functions/indexed/slice.js', HAS_INDEX),	
	replace: importf('./functions/indexed/replace.js', HAS_INDEX),	
	repeat: importf('./functions/indexed/repeat.js', HAS_INDEX),	
	startsWith: importf('./functions/indexed/startsWith.js', HAS_INDEX),	
	endsWith: importf('./functions/indexed/endsWith.js', HAS_INDEX),	
	pad: importf('./functions/indexed/pad.js', HAS_INDEX),	
	padStart: importf('./functions/indexed/padStart.js', HAS_INDEX),	
	padEnd: importf('./functions/indexed/padEnd.js', HAS_INDEX),	
}

const collection = {
	each: importf('./functions/collection/each.js', HAS_VALUE),	
	forEach: importf('./functions/collection/each.js', HAS_VALUE),	
	reach: importf('./functions/collection/reach.js', HAS_VALUE),	
	rforEach: importf('./functions/collection/reach.js', HAS_VALUE),	
	map: importf('./functions/collection/map.js', HAS_VALUE),	
	transform: importf('./functions/collection/map.js', HAS_VALUE),	
	filter: importf('./functions/collection/filter.js', HAS_VALUE),	
	filterNot: importf('./functions/collection/filterNot.js', HAS_VALUE),	
	every: importf('./functions/collection/every.js', HAS_VALUE),	
	some: importf('./functions/collection/some.js', HAS_VALUE),	
	count: importf('./functions/collection/count.js', HAS_VALUE),	
	countBy: importf('./functions/collection/countBy.js', HAS_VALUE),	
	keys: importf('./functions/collection/keys.js', HAS_KEY),	
	values: importf('./functions/collection/values.js', HAS_VALUE),	
	items: importf('./functions/collection/items.js', HAS_KEY),	
	pairs: importf('./functions/collection/items.js', HAS_KEY),	
	compact: importf('./functions/collection/compact.js', HAS_VALUE),	
	truthly: importf('./functions/collection/compact.js', HAS_VALUE),	
	add: importf('./functions/collection/add.js', HAS_VALUE),	
	has: importf('./functions/collection/has.js', HAS_VALUE),	
	includes: importf('./functions/collection/has.js', HAS_VALUE),	
	contains: importf('./functions/collection/has.js', HAS_VALUE),	
	freq: importf('./functions/collection/freq.js', HAS_VALUE)
}

const math = {
	sum: importf('./functions/math/sum.js', CAN_MATH),	
	sumBy: importf('./functions/math/sumBy.js', CAN_MATH),	
	product: importf('./functions/math/product.js', CAN_MATH),	
	productBy: importf('./functions/math/productBy.js', CAN_MATH),	
	max: importf('./functions/math/max.js', CAN_MATH),	
	maxBy: importf('./functions/math/maxBy.js', CAN_MATH),	
	min: importf('./functions/math/min.js', CAN_MATH),	
	minBy: importf('./functions/math/minBy.js', CAN_MATH)
}

const util = {
	isOf: importf('./functions/util/isOf.js', []),
	chain: importf('./functions/util/chain.js', []),
	isConstructor: importf('./functions/util/isConstructor.js', [])
}

const self = {
	equal: equal,
	len: require('./functions/util/len.js'),
	range: require('./functions/util/range.js'),
	typename: typename,
	pretty: require('./functions/util/pretty.js')
}

function Essential(wrap) {
	if (wrap.constructor.name === "Essential")
		return wrap;

	this.wrap = wrap;
	this.equalf = equal;
	this.chaining = false;
}

function Essentialf(obj) {
	return new Essential(obj);
}

Essential.prototype = Object.assign(Essential.prototype, array, string, func, indexed, collection, math, util);
Essentialf = Object.assign(Essentialf, self);

module.exports = Essentialf;