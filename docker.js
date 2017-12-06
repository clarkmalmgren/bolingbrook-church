let EZDocker = require('ezdocker').default;
let { 'version': version } = require('./package.json');

EZDocker.createFromArgs()
  .repository('971947037958.dkr.ecr.us-east-1.amazonaws.com/bolingbrook-church/website')
  .buildImage()
  .with.tag(version)
  .and.path('docker')
  .and.path('dist', 'dist');
