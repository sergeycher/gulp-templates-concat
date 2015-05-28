# gulp-templates-concat
### Sample src/templates/ structure:
~~~
index.html
layouts/
  main.html
~~~
### Gulp task
~~~
gulp.task('templates', function () {
    gulp.src("src/templates/**/*.html")
        .pipe(templatesBuilder('build/templates.js', {
            root: 'src/templates/',
            var: "_templates"
        }))
        .pipe(gulp.dest('build/'));
});
~~~
### result in build/templates.js file
~~~
_templates = {"index":"<div></div>", "layouts.main":"<div></div>"};
~~~
