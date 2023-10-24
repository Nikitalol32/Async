// @ts-check

/**
 * @typedef AsyncOpts
 * @property [label]
 * @property [group]
 */

module.exports = class Async {

	#timeouts = new Map()
	#intervals = new Map()
	#promises = new Map()

	/**
	 *
	 * @param {Promise} originalPromise
	 * @param {AsyncOpts} [asyncOpts]
	 * @returns {Promise}
	 */
	promise(originalPromise, asyncOpts = {}) {
		asyncOpts.group ??= '[[DEFAULT_GROUP]]';
		asyncOpts.label ??= `[[DEFAULT_LABEL]]_${Math.random() * 1e3}`;

		const
			{label, group} = asyncOpts,
			promises = this.#promises;

		let
			groupMap = promises.get(group);

		if (groupMap) {
			const
				promiseData = groupMap.get(label);

			if (promiseData) {
				promiseData.rejector({reason: 'collision'});
				groupMap.delete(label);
			}

		} else {
			promises.set(group, groupMap = new Map());
		}

		const newPromiseData = {
			promise: originalPromise,

			/**
			 * @type {Function | undefined}
			 */
			rejector: undefined,

			/**
			 * @type {Function | undefined}
			 */
			resolver: undefined
		}

		const pr = new Promise((res, rej) => {
			newPromiseData.rejector = rej;
			newPromiseData.resolver = res;

			originalPromise.then((value) => res(value));
			originalPromise.catch((err) => rej(err));
		});

		groupMap.set(label, newPromiseData);

		return pr;
	}

	/**
	 * 
	 * @param {Function} fn
	 * @param {number} time
	 * @param {AsyncOpts} [asyncOpts]
	 */
	setTimeout (fn, time, asyncOpts = {}) {
		asyncOpts.group ??= '[[DEFAULT_GROUP]]';
		asyncOpts.label ??= `[[DEFAULT_LABEL]]_${Math.random() * 1e3}`;

		const
			{label, group} = asyncOpts,
			timeouts = this.#timeouts;

		let
			groupMap = timeouts.get(group);

		const
			originalTimeout = setTimeout(fn, time);

		if (timeouts.get(group)) {
			const
				timeoutData = groupMap.get(label);

			if (timeoutData) {
				timeoutData.rejector();
				groupMap.delete(label);
			}
		} else {
			timeouts.set(group, groupMap = new Map());
		}

		const
			newTimeoutData = {
				timeout: originalTimeout,
				rejector: () => {
					clearTimeout(originalTimeout);
				}
			}

		groupMap.set(label, newTimeoutData);
	}

	/**
	 * 
	 * @param {Function} fn
	 * @param {number} time
	 * @param {AsyncOpts} [asyncOpts]
	 */
	setInterval(fn, time, asyncOpts = {}) {
		asyncOpts.group ??= '[[DEFAULT_GROUP]]';
		asyncOpts.label ??= `[[DEFAULT_LABEL]]_${Math.random() * 1e3}`;

		const
			{label, group} = asyncOpts,
			intervals = this.#intervals;

		let
			groupMap = intervals.get(group);

		const
			originalTimeout = setInterval(fn, time);

		if (intervals.get(group)) {
			const timeoutData = groupMap.get(label);

			if (timeoutData) {
				timeoutData.rejector();
				groupMap.delete(label);
			}
		} else {
			intervals.set(group, groupMap = new Map());
		}

		const
			newIntervalData = {
				interval: originalTimeout,
				rejector: () => {
					clearTimeout(originalTimeout);
				}
			}

		groupMap.set(label, newIntervalData);
	}

	/**
	 * @param {AsyncOpts} [asyncOpts] 
	 */
	clearAll(asyncOpts) {
		this.clearInterval(asyncOpts);
		this.clearPromise(asyncOpts);
		this.clearTimeout(asyncOpts);
	}

	/**
	 * @param {AsyncOpts} [asyncOpts]
	 */
	clearInterval(asyncOpts) {
		this.#clear('interval', asyncOpts);
	}

	/**
	 * @param {AsyncOpts} [asyncOpts] 
	 */
	clearPromise(asyncOpts = {}) {
		this.#clear('promise', asyncOpts);
	}

	/**
	 * @param {AsyncOpts} [asyncOpts] 
	 */
	clearTimeout(asyncOpts = {}) {
		this.#clear('timeout', asyncOpts);
	}

	/**
	 * @param {AsyncOpts} [asyncOpts] 
	 * @param {String} [type] 
	 */
	#clear(type, asyncOpts = {}) {

		const
			giveAsyncOpts = Boolean(asyncOpts.group || asyncOpts.label);

		asyncOpts.group ??= '[[DEFAULT_GROUP]]';

		const mapByType = {
			interval: this.#intervals,
			timeout: this.#timeouts,
			promise: this.#promises,
		}

		const
			{group, label} = asyncOpts,
			groups = mapByType[type];

		// На случай, если группы еще не были созданы или переданы
		if (!groups.get(group)) {
			return;
		}

		console.log('not stopping')

		if (giveAsyncOpts) {

			if (label) {
				groups.get(group).get(label).rejector({reason: 'clear'});
				groups.delete(groups.get(group).get(label));

			} else {
				for (let [label, value] of groups.get(group)) {

					value.rejector({reason: 'clear'});
					groups.delete(label);
				}
			}
		} else {
			for (let [groupName, labelMap] of groups) {
				for (let [labelName, labelData] of labelMap) {
					labelData.rejector({reason: 'clear'});
					groups.delete(groups.get(groupName).get(labelName));
				}

				groups.delete(groups.get(groupName));

				}
		}

	}
}
