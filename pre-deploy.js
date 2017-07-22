const targz = require('tar.gz'),
      fs    = require('fs');

let tarball = targz({}, { fromBase: true });
let read = tarball.createReadStream('dist');
let write = fs.createWriteStream('release.tar.gz');

read.pipe(write);
read.on('end', () => {
  console.log('Done Creating Stream!');
});
