// @ts-check

const Async = require('./async');

describe('Async', () => {
	describe('setTimeout', () => {
		test('Вызывает функцию только один раз при установки с одинаковым лейблом', async () => {
			const
				async = new Async();

			let counter = 0;

			await new Promise((res) => {
				async.setTimeout(() => {
					counter++;
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
				}, 0, {label: 'timeout-1'});
	
				async.setTimeout(() => {
					counter++;
					res(undefined);

				}, 10, {label: 'timeout-2'});
			});


			expect(counter).toBe(2);
		});
	});

	describe('setInterval', () => {
		// ...
	});

	describe('promise', () => {
		// ...
	});

	describe('setTimeout, setInterval, promise', () => {
		// ...
	});
});