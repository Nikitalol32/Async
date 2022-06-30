// @ts-check

const
	Async = require('./async'),
	fetch = require('node-fetch');

describe('Async promise', () => {
	test('Реджектит первый при регистрации промиса с таким же лейблом', async () => {
		const
			async = new Async()

		const res = await new Promise((res) => {
			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {label: 'fetch'})
				.catch((err) => {
					res(err.reason);
				})

			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {label: 'fetch'})
		});

		expect(res).toBe('collision');
	});

	test('Реджектит первый при регистрации промиса с одинаковой группой и одинаковым лейблом', async () => {
		const
			async = new Async()

		const res = await new Promise((res) => {
			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {group: 'group', label: 'fetch'})
				.catch((err) => {
					res(err.reason);
				})

			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {group: 'group', label: 'fetch'})
		});

		expect(res).toBe('collision');
	});

	test('Выполняет два промиса промиса без лейбла и без группы', async () => {
		const
			async = new Async()

		const res = await new Promise((res) => {
			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'))

			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'))
				.then(() => res('good'))
				
		});

		expect(res).toBe('good');
	});


	test('Реджектится при вызове clearPromise с лейблом без группы', async () => {
		const
			async = new Async()

		const pr = new Promise((res) => {
			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {label: 'fetch'})
				.catch((err) => {
					res(err.reason); // {reason: 'clear'}
				})
		});

		async.clearPromise({label: 'fetch'});

		const
			res = await pr;


		expect(res).toBe('clear');
	})

	test('Реджектится оба промиса при вызове clearPromise без инструкций', async () => {
		const
			async = new Async()

		const pr = new Promise((res) => {
			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {label: 'fetch'})
				.catch((err) => {
					res(err.reason); // {reason: 'clear'}
				})

			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {label: 'fetch1'})
				.catch((err) => {
					res(err.reason); // {reason: 'clear'}
				})
		});

		async.clearPromise();

		const
			res = await pr;


		expect(res).toBe('clear');
	})

	test('Вызывает два промиса с одинаковыми группами и разными лейблами', async () => {
		const
			async = new Async()

		const pr = new Promise((res) => {
			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {label: 'fetch', group: 'group'})

			async.promise(fetch('https://jsonplaceholder.typicode.com/todos/2'), {label: 'fetch2', group: 'group'})
				.then(() => res('good'))
		});

		const
			res = await pr;


		expect(res).toBe('good');
	})
});
