// Not Recommend
const buf1 = new Buffer('Hello World');
console.log(buf1);

const buf2 = Buffer.from('Hello World');
console.log(buf2);

const buf3 = Buffer.from('你好');
console.log(buf3);
console.log(buf3.toString());

const buf4 = Buffer.from('你好', 'utf16le');
console.log(buf4);
console.log(buf4.toString('utf16le'));
