const gulp = require('gulp');
const utility = require('simple-logger-pkg');
const packageJson = require('./package.json');
const fs = require('fs');

gulp.task('default', [], () => {
  console.log('running default task');
});
gulp.task('versionUp', [], () => {
  console.log('running versionUp task');
  const newVersion = utility.versionUp(packageJson.version, 'Patch'); // "Major" | "Minor" | "Patch"
  console.log('New version is ' + newVersion);
  packageJson.version = newVersion;
  fs.writeFile('package.json', JSON.stringify(packageJson), (err) => {
    if (err) return console.log(err);
    // console.log(JSON.stringify(file));
    return console.log('writing to package.json, version: ' + newVersion);
  });
});
