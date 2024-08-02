const buf1 = Buffer.alloc(8); // 8 bytes
buf1[0] = 100;
buf1[1] = 'm'.charCodeAt();
console.log(buf1);
console.log(buf1.toString());
