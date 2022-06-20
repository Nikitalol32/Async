
const async = new Async();

/**
 * Разные группы + одинаковые лейблы - сосуществуют
 */

async.setTimeout(() => {

}, 50, {label: 'someLabel', group: 'grouped'});


async.setTimeout(() => {

}, 50, {label: 'someLabel', group: 'group-1'});

async.setTimeout(() => {

}, 50, {label: 'someLabel', group: 'goup-2'});


/**
 * Одинаковые лейблы - удаляются (остается только последний)
 */

 async.setTimeout(() => {

}, 50, {label: 'someLabel'});


async.setTimeout(() => {

}, 50, {label: 'someLabel'});

async.setTimeout(() => {

}, 50, {label: 'someLabel'});

/**
 * Разные лейблы - сосуществуют
 */

async.setTimeout(() => {

}, 50, {label: 'someLabel-1'});


async.setTimeout(() => {

}, 50, {label: 'someLabel0-2'});

async.setTimeout(() => {

}, 50, {label: 'someLabel-3'});

/**
 * Удаление всего по лейблу
 */

async.clearAll({label: /somelabel/});

/**
 * Удаление всего по лейблу строкой
 * (удаляются все "потоки" то есть и timeout и interval и promise)
 */
async.clearAll({label: 'someLabel-1'});

/**
 * Удаление всего по группе
 * (удаляются все "потоки" то есть и timeout и interval и promise)
 */
 async.clearAll({group: 'somegroup'});

/**
 * Разные потоки сосуществуют
 */

async.setTimeout(() => {

}, 50, {label: 'someLabel-1'});

async.setInterval(() => {

}, 50, {label: 'someLabel-1'});


/**
 * Удаление всего!
 */

async.clearAll();
