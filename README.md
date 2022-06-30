# Async
Модуль Async предоставляет API для управления асинхронными операциями.

## Начало использования

``` javascript
const
	Async = require('./async'),
	async = new Async();
```

## Timeout
---

``` javascript
async.setTimeout(() => {
	// ...
}, 1000, {group: 'group', label: 'label'});
```

## Promise
---

``` javascript
async.promise(() => {
	fetch('https://jsonplaceholder.typicode.com/todos/2')
}, {group: 'group', label: 'label'});
```

## Interval
---

``` javascript
async.setInterval(() => {
	// ...
}, 1000, {group: 'group', label: 'label'});
```

## Группы и лейблы
---

Группы и лейблы служат ключем для контроля операций. Когда вы назначете нескольким операциям одинаковые группу и лейбл, то операция с таким же ключом и группой будет удалена.

``` javascript
// Первый удаляется
async.setTimeout(() => {
	// ...
}, 1000, {group: 'group', label: 'label'});

// Следующий выполняется
async.setTimeout(() => {
	// ...
}, 1000, {group: 'group', label: 'label'});
```

> Если установить только group, то label установится автоматически, но со случайным ключем

``` javascript
async.setTimeout(() => {
	// ...
}, 1000, {group: 'group', /*[[DEFAULT_LABEL]]_Math.random*/});
```

> Если установить только label, то группа установится автоматически

``` javascript
async.setTimeout(() => {
	// ...
}, 1000, {label: 'label', /*[[DEFAULT_GROUP]]*/});
```

> Установка лейбла и группы не является обязательным, в таком случае можно создание операций не будет приводить к коллизии имен.

``` javascript
async.setTimeout(() => {
	// ...
}, 1000, {/*[[DEFAULT_LABEL]]_Math.random*/, /*[[DEFAULT_GROUP]]*/});
```

## Очистка
---

### Очистка Timeout

``` javascript
async.setTimeout(() => {
	// ...
}, 1000, {group: 'group', label: 'label'});

async.clearTimeout({group: 'group', label: 'label'});
```

#### Очистка Promise

``` javascript
async.promise(() => {
	// ...
}, 1000, {group: 'group', label: 'label'});

async.clearPromise({group: 'group', label: 'label'});
```

#### Очистка Interval

``` javascript
async.setInterval(() => {
	// ...
}, 1000, {group: 'group', label: 'label'});

async.clearInterval({group: 'group', label: 'label'});
```

#### Удаление всех установленных интервалов.

``` javascript
async.setInterval(() => {
	// ...
}, 1000, {group: 'group', label: 'label'});

async.setInterval(() => {
	// ...
}, 1000, {group: 'group2', label: 'label2'});

async.setInterval(() => {
	// ...
}, 1000, {group: 'group3', label: 'label3'});

async.clearInterval();
// Так же можно удалять timeout и promise
```

#### Удаление всех установленных async операций

``` javascript
async.setTimeout(() => {
	// ...
}, 1000, {group: 'group', label: 'label'});

async.setInterval(() => {
	// ...
}, 1000, {group: 'group2', label: 'label2'});

async.promise(() => {
	// ...
}, 1000, {group: 'group3', label: 'label3'});

async.clearAll();
```

## Тестирование
---

### Timeout

``` javascript
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
});
```

### Promise

``` javascript
const Async = require('./async');

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
});
```

### Interval

``` javascript
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
});
```
