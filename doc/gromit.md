# Adding Gromit to a CX Project

Gromit is the OAuth2 client that we use for CX projects.  This client is specifically configured to work with Micro Focus OSP.  

Gromit comes as a JAR file.  You can find the latest version on the [Sonatype Nexus server](https://oss.sonatype.org/#nexus-search;quick~gromit).  

If you start with the Hello World! project or one of the other CX sample projects then you will get Gromit automatically in your project.  If you want to make a new project from scratch then follow the instructions in this page to add Gromit to your project.

## Add the Gromit project dependency

The easiest way to get Gromit in your project is to add it to the `package.json` file in your project.  First you need to add a dependency on the `unjar-from-url` project like this:

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

Now just run `npm install` and you should have the Gromit project in the `node_modules/unjar-from-url/node_modules/gromit` directory.

## Add Gromit to your build

Now that you have the Gromit dependencies in your `node_modules` directory you need to make sure they get added to your built project.  This happens in the `gulpfile.js` file in your project.

Add the following custom task to `gulpfile.js`:

```
gulp.task('copy:gromit', function() {
    return gulp
        .src(path.resolve(cwd, 'node_modules/unjar-from-url/node_modules/gromit/**/*'))
        .pipe(gulp.dest(path.resolve(cwd, 'dist/gromit')));
});
```

This will take the files in your `node_modules/unjar-from-url/node_modules/gromit` directory and copy them to the `dist/gromit` directory when you run `gulp`.  Because this is happening as part of the `copy` task in Gulp you don't need to do anything special to make it happen in the build.

## Import the Gromit scripts

Now we have the Gromit code getting included in your project.  The next step is to import the Gromit scripts in your HTML file.

All you need to do is add the following line to your `index.html` file:

```
<script type="application/javascript" src="gromit/js/gromit-all-min.js"></script>
```

## Add the Gromit module to your project

The last step is to call the `gromit.init` function somewhere in your project.  You just need to call this before you actually call Gromit.  We often do this in the services code.  

The `gromit` object is in your window scope so you just need to make this call somewhere in your project:

```
gromit.init();
```

And that's it.  Now you're ready to start calling Gromit.