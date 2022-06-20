// @ts-check

/**
 * @typedef AsyncOpts
 * @property [label]
 * @property [group]
 */

module.exports = class Async {
	/**
	 *
	 * @param {Promise} promise 
	 * @param {AsyncOpts} asyncOpts 
	 */
	promise(promise, asyncOpts) {
		// ...
	}

	/**
	 * 
	 * @param {Function} fn 
	 * @param {number} time 
	 * @param {AsyncOpts} [asyncOpts] 
	 */
	setTimeout(fn, time, asyncOpts) {

	}

	/**
	 * 
	 * @param {Function} fn 
	 * @param {number} time 
	 * @param {AsyncOpts} [asyncOpts] 
	 */
	setInterval(fn, time, asyncOpts) {

	}

	/**
	 * @param {AsyncOpts} [asyncOpts] 
	 */
	clearAll(asyncOpts) {

	}
}
