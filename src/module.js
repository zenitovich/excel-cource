console.log('module.js');

async function start() {
  return Promise.resolve('async working');
}

start().then(console.log);
