var initTemplate = require('./initTemplate');

module.exports = function (optimist, argv, convertOptions) {
  // Help
  if (argv.help) {
    optimist.showHelp();
    process.exit(-1);
  }
  // Init
  if (argv.hasOwnProperty('init')) {
    if (argv.init === '') {
      console.log('Input a specfic path or name');

    } else {
      initTemplate(argv.init)
    }
    process.exit(-1);
  }
  // Run
  if (argv.hasOwnProperty('run')) {
    if (!['dev', 'build', 'serve'].includes(argv.run)) {
      console.log('Run dev or build or serve');
      process.exit(-1);
    }
  }

  return argv
};
