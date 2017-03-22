  gulp.task('scripts', function () {
    return gulp.src('src/*.js')
      .pipe(gulp.dest('dist'))
      .pipe($.size({title: '[ default size ]:'}))
      .pipe($.uglify())
      .pipe($.rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest('dist'))
      .pipe($.size({title: '[ minimize size ]:'}));
  });
