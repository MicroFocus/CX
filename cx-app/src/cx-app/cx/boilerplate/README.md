# NG-Boilerplate

Dashboard framework with Angular.js and Twitter Bootstrap.  
https://secmgmtgit.provo.novell.com:8443/projects/IOSI/repos/ng-boilerplate/browse

This component accepts contributions and performs releases under an [Inner Source](http://wiki.esecurity.net:8090/display/IS/Inner+Source+Home) model.

### Benefits

The Angular Dashboard Framework provides a customizable dashboard/widget based interface that is easy to extend and provide a wide-reach of information collection.  Delivered through a series of Angulard Directives; ADF can easily be integrated into many situations.

## Component Resources

*   The main branch of the source for this component is available in this git repository (see [the CONTRIBUTOR guide](CONTRIBUTOR.md) if you'd like to contribute to its development)
*   **Wiki** is available at [http://wiki.esecurity.net:8090/display/IS/Angular+Dashboard+Framework+(ADF)](http://wiki.esecurity.net:8090/display/IS/Angular+Dashboard+Framework+(ADF))
*   **Releases** are available at TBD.
*   **Nightly** builds are available at <Link to Build server>.
*   **API documentation** is available within <location of documentation>.

### Issue Tracking

As a component governed by an inner source constitution, **the engineering team of the product consuming this component is expected to fix issues** in this component on the timeline they require it.  The product engineering team is welcome to recruit training or coding assistance from the community using this component, including the SC, to help get the issue fixed, however, product team must understand the community or SC may be busy with other things and may not be able to assist on the timeline the product team requires it.  Product teams that rely heavily or critically on this component are encouraged to built expertise in this component's code and nominate a member of their team to be voted into the SC in order to streamline the acceptance of their pull requests.

Customers of products that use this component should file support requests and bugs directly against the product. Each product that uses this component should create a functional sub-area category in its bug tracking system that incorporates this component. The product team is responsible for triaging any newly reported bugs and determining whether the issue resides within the main product, the product's integration of this component, or this component itself. If the latter, then the product engineering team should clone the reported issue to this component's issue tracker and set up a dependency link. We need to have issues filed both under the product and the component for proper tracking.

*   This components issue tracker is at: [<TBD>](<Project Defect Tracking URL>) 
*   Bugzilla will be used to track the issues.  Tracker TBD.

### Project Discussions

This project maintains a wiki page for discussions between the users and developers of this component.

*   [http://wiki.esecurity.net:8090/display/IS/ADF+Discussions](http://wiki.esecurity.net:8090/display/IS/ADF+Discussions) in the mean time email people, such as the steering committee, directly.

### Verifying Binaries

<How To Verify Binaries>

## Building This Component

The Steering Committee of this component maintains a build server to enable the community to quickly create builds of code submitted to the authoritative repository.  See the "Component Resources" section of this document for links to the build server.

This section explains how to build from source if you wish to perform a build without using the build server.  The steps below assume you've already created a local clone of the repository.

### Linux

#### Prerequisites

*   Bower
*   Gulp

#### To build

```
*   npm install
*   gulp build
```

### Windows

#### Prerequisites

*   Bower
*   Gulp

## Coding Standards

Boilerplate follows the [Coding Standards](http://siem-ui.esecurity.net/coding-standards/).

## Application Structure

        app                             - front end
        ├── node_modules                - dev libraries (not for distribution, build and support)
        ├── app                         - application source
        │   ├── _assets
        │   │   └── bower               - vendor libraries (possible Micro Focus if registered as bower package)
        │   │   └── css                 - If any global css files need to be included; here is where they will go.  Also the end directory for SASS compiliation.
        │   │   └── data                - stored local JSON files.
        │   │   └── img                 - site images
        │   │   └── sass                - application sass files.
        │   │       └── app.scss        - application styles index
        │   │       └── vendor.scss     - vendor styles index
        │   │   
        │   ├── components
        │   │   └── featureA            - feature folder
        │   ├── core                    - non sharable app core (config, ...)    
        │   ├── layout                  - layout
        │   │   └── global              - sub module for global navigation
        │   │   └── sidebar             - sub module for sidebar navigation
        │   ├── app.config.js           - app config block
        │   ├── app.run.js              - app run block                        
        │   ├── app.module.js           - main app module
        │   └── index.html              - SPA main page
        ├── build                        - production version build
        ├── i18n                        - generated i18n files (grunt i18n task)
        ├── docs                        - generated docs
        ├── .tmp                        - temporary build folder
        ├── .gitignore                  - git settings - files not submitted the source control
        ├── .editorconfig               - style guide config
        ├── .jscsrc                     - style guide config
        ├── .jshintrc                   - style guide config
        ├── .sass-lint.yml              - style guide config
        ├── .scss-lint.yml              - style guide config
        ├── bower.json                  - client dependencies
        ├── config.json                 - application/dev config
        ├── package.json                - package info, dev dependencies
        ├── gruntfile.js                - Grunt config and bootstrap
        ├── tasks                       - Grunt main tasks
        │   └── options                 - Grunt tasks settings        
        └── test                        - e2e tests, settings, coverage and support files
        

## Requirements

* [Node JS](https://nodejs.org/)
* [Bower](http://bower.io/)
* Java
* Python
* (Optional)[LiveReload browser extension](http://livereload.com/extensions/)
* NOTE FOR WINDOWS USERS: 
  prior to pulling any source code please run `git config --global core.eol lf` to force line endings to a format that won't fail JSCS.

## Setup

### Prerequisites
- On Mac or Linxu:
  1. Install [Node](https://nodejs.org)
  2. [install Bower](http://bower.io/#install-bower)  - `npm install -g bower`
  3. Run `npm install`
  4. (local dev only, not CI) prepare Bower dependencies setting file - `grunt replace:bower` (updates the `bower.json` by replacing the environment variable with actual URL)
    WARNING: use the point 4. as convenience method to update your local `bower.json` DO NOT submit these changes back to the codebase. (make sure not to stage `bower.json` for commit)
  5. Install Bower dependencies - `bower install`
  6. Run `grunt` tasks.


- On Windows:
  1. Install **Node.js**
    - [Node.js version 0.12.13](https://nodejs.org/download/release/v0.12.13/) is recommended. Higher version may not work with Visual C++ 2010 which is included in Microsoft Windows SDK v7.1.
    - Either x86 or x86_64 version should work.
  2. Install **Bower**
     ```console
       $ npm install -g bower
     ```
  3. Install **Python**
    - [v2.7.11](https://www.python.org/downloads/release/python-2711/) recommended, v3.x.x is not supported
    - Make sure that you have a PYTHON environment variable, and it is set to drive:\path\to\python\python.exe not to a folder
    - Make sure that drive:\path\to\python folder is in the path.
  4. Configure **Git**
    - Add these configurations to your Git so the line endings will not fail JSCS and some tasks in javascripts.
      ```console
        $ git config --global core.autocrlf input
        $ git config --global core.eol lf
      ```
    - If you are using SourceTree, make sure the Git that SourceTree uses has the right settings.
    - Configure Git to use 'wincred' for authentication.
      - Use stored Windows credentials to avoid failure while pulling down the modules that hosted in local Stash server.
        ```console
          $ git config --global credential.helper wincred
        ```
      - Create Windows credentials in Control Panel->User Accounts->Credential Manager for `git+https://USERNAME@secmgmtgit.provo.novell.com:8443`
  5. Install **Microsoft Windows SDK for Windows 7 and .NET Framework 4**
    - Download [Microsoft Windows SDK for Windows 7 and .NET Framework 4](https://www.microsoft.com/en-us/download/details.aspx?id=8279)
    - SDK can only be installed on top of .NET 4. So change the registry to work around it if you have newer version of .NET already installed.
      - Start `regedit` and change the following setttings to to "4.0.30319" temporarily:
        ```console
        HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\NET Framework Setup\NDP\v4\Full\Version
        HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\NET Framework Setup\NDP\v4\Client\Version
        ```
    - Install SDK with default options. You can skip Help Library installation.
  6. Check out **Sentinel Web UI source code**
    - **The Windows API imposes a maximum filename length such that a filename, including the file path to get to the file, can't exceed between 255-260 characters. Nested node_modules will very likely hit this limitation. So use the mapped drive to your UI development folder and work from there.** Otherwise, you will see many weird 'npm install' errors.
    - Map Sentinel Web UI source code folder to a new drive letter.
      - Start a command prompt (no admin privileges needed)
      - Use cd to navigate to the folder you want to work, for example, C:\path\to\sentinel-platform\jclient\WebConsole\main-ui\src\main\webapp\main-ui
      - Type `subst K: .` to create the drive letter association. You can also use the full path instead of dot.
      - Go to command prompt or Windows Explorer to work on your UI code.
      - To remove the drive, go to cmd prompt and type `subst /d K:`
  7. Install **NPM modules**
    - Launch 'cmd' prompt window through Start menu
**Start->All Programs->Microsoft Windows SDK v7.1->Windows SDK 7.1 Command Prompt**
    - **If you are running x86 version of Node.js, type `setenv /x86`**
    - Run `npm install`
    - **If you have multiple Visual Studio installed and got errors, you can try `npm install -msvs_version=2010`.**
    - Alerternatively, you can start the 'cmd' prompt in command line:
      ```console
         $ call "C:\Program Files\Microsoft SDKs\Windows\v7.1\bin\Setenv.cmd" /Release /x86
         $ call "C:\Program Files\Microsoft SDKs\Windows\v7.1\bin\Setenv.cmd" /Release /x64
      ```
  8. Install **Bower components**
    - (local dev only, not CI) prepare Bower dependencies setting file - `grunt replace:bower` (updates the `bower.json` by replacing the environment variable with actual URL)
    WARNING: use this step as convenience method to update your local `bower.json` DO NOT submit these changes back to the codebase. (make sure not to stage `bower.json` for commit)
    - *Alternatively* you can can manually change the bower.json paths for `mf-angular-dashboard-framework` and `mf-sortable` to `https://USERNAME@secmgmtgit.provo.novell.com:8443/scm/sen/REPONAME.git` (change names where appropriate)
    - Run `bower install`
  9. (For 'bower removal' brach only) Install **Ruby** and **sass**
    - Install [Ruby version 2.2.4](http://rubyinstaller.org/downloads/)
    - Install **sass** and **sass-globbing**
      sass version 3.3.8 version is recommended for backward compatability for old angularui build with bourbon.
      ```console
        $ gem install sass -v 3.3.8
        $ gem install sass-globbing
      ```
  10. Run `grunt` tasks.

  
*NOTE* The current `dev local` process requires you to mount the mainui volume to `diskutil unmountDisk force /Volumes/webappui` or through a SAMBA interface.


## Project Phases

Tasks included in the project:

    +------------------+-----------+----------+----------
                            dev        prod       dist
     lint                    X          X          X
     debug[1]                X          X
     bundle files[2]         X          X          X
     ~compress files                               X
     local server            X          X          X
     unit test               X          X          X
     e2e                                           X
     ~API docs               X          X          X
     localize[3]             X          X          X
    +------------------+-----------+----------+----------

    (~ upcoming)
    [1] facilitates, not concrete task
    [2] concats, minifies files (dev does not minify)
    [3] dev extract task, prod and dist does both extract and compile


The top 3 workflow tasks differ in:

 - frequency of use
 - execution time
 - production phase (when they are required)


The default task is `dist` which creates the distribution version.

### Development Workflow

#### During development

 - code is linted
 - unit test with coverage is run
 - local server serve files
 - code is debuggable 

1. (Optional) Adjust your local environment settings (`env.dev.local`) in `config.json`.
2. Start the local server: `grunt connect:devlocal` (separate terminal window)
3. Grunt Tasks: `grunt dev`
4. Repeat the `grunt dev` as you develop.

Creates `build` folder (uses temporary `.tmp` folder).
Serves the i18n from original folder. Serves the bower components (if needed).

#### Production Check

Allows to check and debug production version.

Start the local server: `grunt connect:prodlocal` (separate terminal window)
Grunt Tasks: `grunt prod`

Creates `build` folder (uses temporary `.tmp` folder). 
Serves the `build` folder.


#### Distribution Build 

Production version ready for distribution. 
Final distribution changes and optimizations performed.
E2E test performed.

Start the local server: `grunt connect:distlocal` (separate terminal window) 
(Currently dist and prod servers are identical, you don't need to start one if you have the other running,
i.e. checking between dist and prod version)
Grunt Tasks: `grunt dist`

Creates `dist` folder (uses temporary `.tmp` folder).
Serves the `build` folder.


## Adding New Features

Start new feature folder under `app/components`. 
Follow the [coding standards](http://siem-ui.esecurity.net/coding-standards/) including naming. Include init and e2e
test.


## Localization

### During Development

Annotate English strings that need to be translated using `translate` directive or `gettext` function.

    <h1 translate>Hello!</h1>

    var translated = gettext("Hello");

    {
      greetings: gettext("Hello");
    }

### Translation

Run `i18n:extract` task to extract the strings to `*.pot` file.  Send the POT file to localization team for
translation. The returned translated files with PO extension are checked back into Sentinel source.

If you want to see the translation within the app run `i18n:compile` to compile returned PO file(s) into JSON 
translation file(s).

Running `i18n` which inclines both subtasks (extract and compile) should not cause any errors (if PO file is missing
the translated file just don't get created).


### Distribution Build

`grunt dist` compiles the PO file(s) into JSON file(s) that are used for translation.

More information under [Localization Process](http://wiki.esecurity.net:8090/display/SENT/Angular+Localization+Infrastructure)



## 508 Compliance

The Section 508 Standards apply to electronic and information technology procured by the federal government, including 
computer hardware and software, websites, phone systems, and copiers.  They were issued under section 508 of the 
Rehabilitation Act which requires access for both members of the public and federal employees to such technologies 
when developed, procured, maintained, or used by federal agencies. The Section 508 Standards are part of the Federal 
Acquisition Regulation (FAR) and address access for people with physical, sensory, or cognitive disabilities.  They 
contain technical criteria specific to various types of technologies and performance-based requirements which focus on 
functional capabilities of covered products.  Specific criteria cover software applications and operating systems, 
web-based information and applications, computers, telecommunications products, video and multi-media, and 
self-contained closed products.

More Information can be found from: 
  - [http://wiki.esecurity.net:8090/display/SENT/508+Compliance](http://wiki.esecurity.net:8090/display/SENT/508+Compliance)
  - [https://docs.angularjs.org/guide/accessibility](https://docs.angularjs.org/guide/accessibility)


## Resources for Newcomers

*   [CONTRIBUTOR guide](CONTRIBUTOR.md)
*   [Component GOVERNANCE](GOVERNANCE.md)

## Current Core Project Team Members

The core project team comprises a group of core committers and a sub-group that forms the _Steering Committee_ (SC) which governs the project. For more information about the governance of this project, see [the GOVERNANCE guide](GOVERNANCE.md) for this project.

*   **Tony Stephens** (_UI Developer_) [tony.stephens@microfocus.com](<tony.stephens@microfocus.com>)
*   **Tapas Adhikary** (_Manager_) [tapas.adhikary@microfocus.com](<tapas.adhikary@microfocus.com>)
*   **Puthali H.B.** (_Developer_) [Puthali.H.B@microfocus.com](<Puthali.H.B@microfocus.com>)
*   **Saloni Desai** (_Developer_) [Saloni.Desai@microfocus.com](<Saloni.Desai@microfocus.com>)
*   **Jan Vorsek** (_Developer_) [Jan Vorsek@microfocus.com](<Jan.Vorsek@microfocus.com>)


