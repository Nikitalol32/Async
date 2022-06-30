// @ts-check

const Async = require('./async');

describe('Async interval', () => {
	test('Оба интервала с разными label должны быть вызваны', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise((resolve) => {
			async.setInterval(() => {
				counter.push('a');

			}, 50, {label: "label"});
			
			async.setInterval(() => {
				counter.push('b');
				resolve(undefined);

			}, 50, {label: "label2"});
		})


		expect(counter).toEqual(['a', 'b']);
	});

	test('Два интервала с одиннаковыми label - вызывается только один', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise((resolve) => {
			async.setInterval(() => {
				counter.push('a');

			}, 50, {label: "l"});
			
			async.setInterval(() => {
				counter.push('b');
				resolve(undefined);

			}, 50, {label: "l"});
		})


		expect(counter).toEqual(['b']);
	});

	test('Два интервала с двумя одинаковыми лейблами, но разными группами', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise((resolve) => {
			async.setInterval(() => {
				counter.push('a');

			}, 50, {label: "label", group: "group"});
			
			async.setInterval(() => {
				counter.push('b');
				resolve(undefined);

			}, 50, {label: "label", group: "group2"});
		})


		expect(counter).toEqual(['a', 'b']);
	});

	test('Два интервала с разными лейблами, но одинаковыми группами', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise((resolve) => {
			async.setInterval(() => {
				counter.push('a');

			}, 50, {label: "label", group: "group"});
			
			async.setInterval(() => {
				counter.push('b');
				resolve(undefined);

			}, 50, {label: "label1", group: "group"});
		})


		expect(counter).toEqual(['a', 'b']);
	});

	test('Два интервала без лейблов, но с одинаковыми группами', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise((resolve) => {
			async.setInterval(() => {
				counter.push('a');

			}, 50, {group: "group"});
			
			async.setInterval(() => {
				counter.push('b');
				resolve(undefined);

			}, 50, {group: "group"});
		})


		expect(counter).toEqual(['a', 'b']);
	});


	test('Два интервала без лейблов, но с разными группами', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise((resolve) => {
			async.setInterval(() => {
				counter.push('a');

			}, 50, {group: "group"});
			
			async.setInterval(() => {
				counter.push('b');
				resolve(undefined);

			}, 50, {group: "group2"});
		})


		expect(counter).toEqual(['a', 'b']);
	});

	// test clearInterval

	test('Выключает interval с переданным лейблом и группой', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise((resolve) => {
			async.setInterval(() => {
				counter.push('a');
				resolve(undefined);

			}, 50, {group:'group', label: "label1"});
			
			async.clearInterval({group:'group', label: "label1"})

			async.setInterval(() => {
				counter.push('b');
				resolve(undefined);

			}, 50, {label: 'label'});
		})


		expect(counter).toEqual(['b']);
	});


	test('Выключает interval с переданным лейблом без группы', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise((resolve) => {
			async.setInterval(() => {
				counter.push('a');
				resolve(undefined);

			}, 50, {label: "label1"});
			
			async.clearInterval({label: 'label1'})

			async.setInterval(() => {
				counter.push('b');
				resolve(undefined);

			}, 50, {label: 'label'});
		})


		expect(counter).toEqual(['b']);
	});

	test('Выключает interval с переданной группой без лейбла', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise((resolve) => {
			async.setInterval(() => {
				counter.push('a');
				resolve(undefined);

			}, 50, {group: "group"});
			
			async.clearInterval({group: 'group'})

			async.setInterval(() => {
				counter.push('b');
				resolve(undefined);

			}, 50, {label: 'label'});
		})


		expect(counter).toEqual(['b']);
	});

	test('Выключает все interval, тк ничего не передано', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise((resolve) => {
			async.setInterval(() => {
				counter.push('a');
				resolve(undefined);

			}, 50, {group: "group"});
		
			async.setInterval(() => {
				counter.push('a');
				resolve(undefined);

			}, 50, {group: "group1"});

			async.clearInterval()

			async.setInterval(() => {
				counter.push('b');
				resolve(undefined);

			}, 50, {label: 'label'});
		})


		expect(counter).toEqual(['b']);
	});
});
