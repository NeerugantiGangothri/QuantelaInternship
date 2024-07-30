var url=require('url');
var adr="https://www.youtube.com/watch?v=Nt-AsZh5woE&list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo&index=8";
var q=url.parse(adr,true);
console.log(q.host);
console.log(q.pathname);
console.log(q.search);
console.log(q.query);

// Output:PS C:\Users\Gangothri N\Desktop\NodeJs> node url.js
// www.youtube.com
// /watch
// ?v=Nt-AsZh5woE&list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo&index=8
// [Object: null prototype] {
//   v: 'Nt-AsZh5woE',
//   list: 'PLinedj3B30sDby4Al-i13hQJGQoRQDfPo',
//   index: '8'
// }

