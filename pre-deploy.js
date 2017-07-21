var pkg = require('./package.json'),
    ncp = require('ncp').ncp,
    fs  = require('fs');

var target = 'deploy/' + pkg.version;

fs.mkdirSync('deploy');
fs.mkdirSync(target);

ncp('dist', target, function(err) {
  if (err) {
    throw new Error(err);
  }

  console.log('Created ' + target)
});
