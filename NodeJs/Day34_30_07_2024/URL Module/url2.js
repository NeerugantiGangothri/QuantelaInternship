//creating own url
const url=require('url');
const urlObject={
    protocol: 'http',
  hostname: 'localhost',
  port: 3000,
  pathname: '/pathname',
  query: { search: 'test' },
  hash: '#hash'
};

const myURL=url.format(urlObject);
console.log(myURL)



