# node-base64
Base64 Package for Node.js

Encoding and decoding in pure Javascript - no Buffers.

### Basic Usage:

```javascript

var base64 = require('base64');

var string = 'String to be encoded';
var encoded = base64.encode(string);  // 'U3RyaW5nIHRvIGJlIGVuY29kZWQ='
var decoded = base64.decode(encoded); // 'String to be encoded'

```
