const { exec } = require('child_process');
const chokidar = require('chokidar');

const commitMessage = 'Auto commit by watcher script';

const watcher = chokidar.watch('.', {
  ignored: /node_modules|\.git/,
  persistent: true,
});

let timer = null;

watcher.on('all', (event, path) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    exec('git add . && git commit -m "' + commitMessage + '" && git push', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
      } else {
        console.log(`Git commit & push done:\n${stdout}`);
      }
    });
  }, 2000); // wait 2 seconds after last change
});

console.log('Watching files for changes...');
