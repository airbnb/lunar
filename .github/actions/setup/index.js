const { exec } = require('child_process');

function handleResult(error, stdout, stderr) {
  if (error) {
    throw error;
  }

  if (stdout) {
    console.log(stdout);
  }

  if (stderr) {
    console.error(stderr);
  }
}

function install(done) {
  exec('yarn install --frozen-lockfile --ignore-engines', (error, stdout, stderr) => {
    handleResult(error, stdout, stderr);
    done();
  });
}

function build(done) {
  exec('yarn run build', (error, stdout, stderr) => {
    handleResult(error, stdout, stderr);
    done();
  });
}

install(() => {
  build(() => {
    console.log('Done!');
  });
});
