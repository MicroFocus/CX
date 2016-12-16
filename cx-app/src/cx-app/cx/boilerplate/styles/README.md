## Re-branding/Creating a Theme

## Prerequisites
 - Set up a virtual path on your server to point to './styles'.  This is currently set in the connect:devLocal task.
 - Create a theme.css file to drop into ./styles

You can make this theme files as complex as you'd like.
IMPORTANT: The end point to be read though will be "theme.css" in this "styles" folder
You can use any pre-processor you'd like, the example here is in SCSS

### Compilation
If you do want the theme to be in build process you can use the 'sass:theme' task to compile the theme directory

### Image Replacement:

This replaces the built in image (logo-image in nav) with theme image.
Use these rules to replace any image in the app.
Use any CSS selector to grab the image; current common IDs are:
  - #logo-img - main logo up in Global Navigation Bar.

