// @ts-check

const
	Async = require('./async'),
	fetch = require('node-fetch');

describe('Async setTimeout, setInterval, promise', () => {
	test('Вызывает timeout, interval, promise', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise ((res, rej) => {
			async.setTimeout(() => {
				counter.push('a');

			}, 50, {group: 'group', label: 'label'})

			async.setInterval(() => {
				counter.push('b');
				async.clearInterval({group: 'group', label: 'label'})

			}, 50, {group: 'group', label: 'label'})

			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {
				group: 'group', label: 'label'
			}).then(() => {
				counter.push('c');
				res(undefined);

			})
		});

		expect(counter).toEqual(['a', 'b', 'c']);
	});
	
	test('Вызывает по 2 (timeout, interval, promise) c разными лейблами и одинаковыми группами', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise ((res, rej) => {
			async.setTimeout(() => {
				counter.push('a');

			}, 50, {group: 'group', label: 'label'});

			async.setTimeout(() => {
				counter.push('a');
			}, 50, {group: 'group', label: 'label2'});


			async.setInterval(() => {
				counter.push('b');
				async.clearInterval({group: 'group', label: 'label'});

			}, 50, {group: 'group', label: 'label'});

			async.setInterval(() => {
				counter.push('b');
				async.clearInterval({group: 'group', label: 'label2'});

			}, 50, {group: 'group', label: 'label2'});

			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {
				group: 'group', label: 'label'
			})
				.then(() => counter.push('c'))
				.catch(err => err)

			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {
				group: 'group', label: 'label2'
			})
				.then(() => {
					counter.push('c');
					res(undefined);
				})
		});

		expect(counter).toEqual(['a', 'a', 'b', 'b', 'c', 'c']);
	});

	test('Очищает (timeout, intreval, promise) по группе и лейблу', async () => {
		const
			async = new Async(),
			counter = [];

		await new Promise ((res, rej) => {
			async.setTimeout(() => {
				counter.push('a');
				res(undefined);

			}, 50, {group: 'group', label: 'label'})

			async.setInterval(() => {
				counter.push('b');
				res(undefined);
				async.clearInterval({group: 'group', label: 'label'});

			}, 50, {group: 'group', label: 'label'});

			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {
				group: 'group', label: 'label'
			})
				.then(() => counter.push('c'))
				.catch(err => err)

			async.clearAll({group: 'group', label: 'label'});

			async.setTimeout(() => {
				counter.push('I');
				res(undefined);

			}, 100, {group: 'group1', label: 'label1'});
		})


		expect(counter).toEqual(['I']);
	});
});
