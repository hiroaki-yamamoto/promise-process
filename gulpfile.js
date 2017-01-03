((r) => {
  'use strict';
  let g = r('gulp');
  let plumber = r('gulp-plumber');
  let notify = r('gulp-notify');
  let eslint = r('gulp-eslint');
  let cov = r('gulp-istanbul');
  let mocha = r('gulp-mocha');

  g.task('test.pre', () => {
    g.src(['lib/**/*.js', 'index.js']).pipe(cov()).pipe(cov.hookRequire());
  });

  g.task('stylecheck', () => {
    g.src(['lib/**/*.js', 'tests/**/*.js', 'index.js']).pipe(plumber({
      'errorHandler': notify.onError('<%= error.message %>'),
    })).pipe(eslint()).pipe(eslint.format()).pipe(
      eslint.failAfterError()
    );
  });

  g.task('test', ['stylecheck', 'test.pre'], () => {
    g.src(['tests/**/*.js']).pipe(plumber({
      'errorHandler': notify.onError('<%= error.message %>'),
    })).pipe(mocha()).pipe(
      cov.writeReports()
    ).pipe(
      cov.enforceThresholds({'thresholds': 70})
    );
  });

  g.task('default', ['test'], () => {
    g.watch(['lib/**/*.js', 'tests/**/*.js', 'index.js'], ['test']);
  });
})(require);
