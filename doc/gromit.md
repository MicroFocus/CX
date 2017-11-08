# Adding Gromit to a CX Project

[Gromit](https://github.com/Gromit-Soft/gromit) is the OAuth2 client that we use for CX projects.  This works well with OSP the Micro Focus OAuth2 provider.

Gromit is packaged as a JAR file.  You can find the latest version on the [Sonatype Nexus server](https://oss.sonatype.org/#nexus-search;quick~gromit).  

If you start with the Hello World! project or one of the other CX sample projects then Gromit will be automatically included.  If you want to make a new project from scratch then follow the instructions in this page to add Gromit to your project.

## Add the Gromit project dependency

The easiest way to get Gromit in your project is to add it to the `package.json` file.  First you need to add a dependency for the `unjar-from-url` project like this:

```
"devDependencies": {
    "unjar-from-url": "1.1.1"
```

Once you have done that you need to add the configuration to tell the `unjar-from-url` plugin to get the Gromit JAR file and expand it into your project like this:

```
"unjar-from-url-config": [
    {
      "directory": "gromit",
      "url": "https://oss.sonatype.org/service/local/repositories/releases/content/org/gromitsoft/gromit/1.0.3/gromit-1.0.3.jar"
    }
  ]
```

Lastly, you need to make sure this gets run as part of your regular install by add this to the `scripts` section:

```
"scripts": {
    "postinstall": "unjar-from-url"
```

Now just run `npm install` and you should have the Gromit files in the `node_modules/unjar-from-url/node_modules/gromit` directory under your project.

## Add Gromit to your build

Now that you have the Gromit dependencies in your `node_modules` directory you need to make sure they get added to your built project.  This happens in the `gulpfile.js` file in your project.

Add the following two custom tasks to `gulpfile.js`:

```
gulp.task('copy:gromit', function() {
    return gulp
        .src(path.resolve(cwd, 'node_modules/unjar-from-url/node_modules/gromit/**/*'))
        .pipe(gulp.dest(path.resolve(cwd, 'dist/gromit')));
});

gulp.task('copy:oauth', function() {
    return gulp
        .src(path.resolve(cwd, 'node_modules/unjar-from-url/node_modules/gromit/html/oauth.html'))
        .pipe(gulp.dest(path.resolve(cwd, 'dist/')));
});
```

The first task will take the files in your `node_modules/unjar-from-url/node_modules/gromit` directory and copy them to the `dist/gromit` directory.  The second task will copy the `oauth.html` file to the root of your `dist` folder.  This file is needed when we handle the login process in Gromit.

Next you want to make sure these two tasks are run by default when you run Gulp.  Add these two lines to your `gulpfile.js` file:

```
gulp.tasks['default'].dep.push('copy:gromit');
gulp.tasks['default'].dep.push('copy:oauth');
```

Now these two tasks will run every time you run the `gulp` command.

## Import the Gromit scripts

Now we have the Gromit code getting included in your project.  The next step is to import the Gromit scripts in your HTML file.

All you need to do is add the following line to your `index.html` file:

```
<script type="application/javascript" src="gromit/js/gromit-all-min.js"></script>
```

## Add the Gromit module to your project

The last step is to call the `gromit.init` function somewhere in your project.  You need to call this before you call Gromit to make a REST call.  We often do this in the services code.  

The `gromit` object is in your window scope so you just need to make this call somewhere in your project:

```
gromit.init();
```

And that's it.  Now you're ready to start calling Gromit.