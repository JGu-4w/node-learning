为什么需要使用 Buffer

- 在需要对二进制进行操作的时候可以试用 Buffer

readFile/writeFile 与 stream 的区别

- fs 方式直接读写文件，无法控制细节操作，如读取位置，读取字节，暂停读取，继续读取等，大文件也不合适一次性读取；
