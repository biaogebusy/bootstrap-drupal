/*eslint-env node */
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat'); // 把多个js文件合并
var uglify = require('gulp-uglify'); // 压缩
var babel = require('gulp-babel'); // es6转换
var sourcemaps = require('gulp-sourcemaps'); // 源映射


gulp.task('default', ['styles', 'scripts'], function () {
  gulp.watch('scss/**/*.scss', ['styles']);
});

/**
 * 设置开发生成任务
 */
gulp.task('dist', [
  'styles',
  'scripts-dist'
]);

gulp.task('scripts', function () {
  gulp.src('js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('init.js'))
    .pipe(gulp.dest('build/'));
})

gulp.task('scripts-dist', function () {
  gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('init.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
})

/**
 * 新建一个styles的任务，并执行第二个参数的匿名函数
 */
gulp.task('styles', function () {
  // 获取源文件
  gulp.src('scss/**/*.scss')
  // 有了这些文件就可以加入管道，使用sass进行处理，并转换成css
  // 当sass源文件写法错误时，监听错误并输出，并不冲断构建，体验更好
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    // 在css生成之前，进行添加前缀处理，并指定浏览器
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    // 再使用gulp.dest()把生成的文件放到./css目录
    .pipe(gulp.dest('build/'));
});
