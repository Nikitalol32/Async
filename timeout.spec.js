// @ts-check

const Async = require('./async');

describe('Async setTimeout', () => {
	test('Вызывает функцию только один раз при установке с одинаковым лейблом', async () => {
		const
			async = new Async();

		let counter = 0;

		await new Promise((res) => {
			async.setTimeout(() => {
				counter++;
				res(undefined);

			}, 0, {label: 'timeout'});

			async.setTimeout(() => {
				counter++;
				res(undefined);

			}, 10, {label: 'timeout'});
		});


		expect(counter).toBe(1);
	});

	test('Вызывает функцию два раза при установки с разным лейблом', async () => {
		const
			async = new Async();

		let counter = 0;

		await new Promise((res) => {
			async.setTimeout(() => {
				counter++;

			}, 10, {label: 'timeout-1'});

			async.setTimeout(() => {
				counter++;
				res(undefined);

			}, 10, {label: 'timeout-2'});
		});


		expect(counter).toBe(2);
	});

	test('Вызывает функцию 3 раза с разными лейблами и группами', async () => {
		const
			async = new Async();

		let counter = 0;

		await new Promise((resolve) => {
			async.setTimeout(() => {
				counter++;
			}, 0, {label: 'timeout-1', group: 'group-1'});
			
			async.setTimeout(() => {
				counter++;
			}, 10, {label: 'timeout-2', group: 'group-2'})
			
			async.setTimeout(() => {
				counter++;
				resolve(undefined);
			}, 20, {label: 'timeout-3', group: 'group-3'})
		})


		expect(counter).toBe(3);
	});

	test('Вызывает функцию 1 раз с разными лейблами, но одинаковыми группами', async () => {
		const
			async = new Async();

		let counter = 0;

		await new Promise((resolve) => {
			async.setTimeout(() => {
				counter++;

			}, 0, {label: 'timeout-1', group: 'group'});
			
			async.setTimeout(() => {
				counter++;
				resolve(undefined);

			}, 0, {label: 'timeout-2', group: 'group'})
		})


		expect(counter).toBe(2);
	});

	test('Вызывает функцию 1 раз, когда передал только группу', async () => {
		const
			async = new Async();

		let counter = 0;

		await new Promise((resolve) => {
			async.setTimeout(() => {
				counter++;
				resolve(undefined);

			}, 0, {group: 'group'});
		})


		expect(counter).toBe(1);
	});

	test('Вызывает функцию 2 раз, когда передал только группу', async () => {
		const
			async = new Async();

		let counter = 0;

		await new Promise((resolve) => {
			async.setTimeout(() => {
				counter++;

			}, 0, {group: 'group'});

			async.setTimeout(() => {
				counter++;
				resolve(undefined);

			}, 0, {group: 'group'});
		})

		expect(counter).toBe(2);
	});

	//test clearTimeout

	test('Выключает timeout при вызове clearTimeout с лейблом', async () => {
		const
			async = new Async();

		let counter = [];

		await new Promise((res) => {
			async.setTimeout(() => {
				counter.push('a');
				res(undefined);

			}, 50, {label: 'timeoutR'});

			async.setTimeout(() => {
				counter.push('c')
				res(undefined);

			}, 50, {label: 'offLabel'});

			async.clearTimeout({label: 'timeoutR'})
		});


		expect(counter).toEqual(['c']);
	});

	test('Выключает timeout при вызове clearTimeout без группы и лейбла', async () => {
		const
			async = new Async();

		let counter = [];

		await new Promise((res) => {
			async.setTimeout(() => {
				counter.push('a');
				res(undefined);

			}, 10, {label: 'timeoutR'});


			async.setTimeout(() => {
				counter.push('c')
				res(undefined);

			}, 50, {label: 'offLabel'});

			async.clearTimeout()

			async.setTimeout(() => {
				counter.push('s')
				res(undefined);

			}, 50, {label: 'offLabel2'});

		});


		expect(counter).toEqual(['s']);
	});

	test('Выключает timeout при вызове clearTimeout c группой и без лейбла', async () => {
		const
			async = new Async();

		let counter = [];

		await new Promise((res) => {
			async.setTimeout(() => {
				counter.push('a');
				res(undefined);

			}, 10, {group: 'group', label: 'timeoutR'});

			async.setTimeout(() => {
				counter.push('c')
				res(undefined);

			}, 50, {group: 'group', label: 'offLabel'});

			async.clearTimeout({group: 'group'})

			async.setTimeout(() => {
				counter.push('s')
				res(undefined);

			}, 50, {label: 'offLabel2'});

		});


		expect(counter).toEqual(['s']);
	});
});