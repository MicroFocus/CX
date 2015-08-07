# Contributing to <Project Name>

## Reporting Issues

When opening new issues or commenting on existing issues on this repository please make sure discussions are related to concrete technical issues with this software.

Discussion of non-technical topics including subjects like intellectual property, trademark, and high level project questions should move to the forum described in the Project Discussions section of the [README](README.md).

## Code Contributions

This project is improved and maintained using an [Internal Open Source](http://wiki.esecurity.net:8090/display/ENG/Internal+Open+Source) model and welcomes new contributors. Individuals making significant and valuable contributions are made _Committers_ and given commit-access to the project. See the [GOVERNANCE](GOVERNANCE.md) document for more information about how this works.

It is suggested that, before you begin work on a code contribution, you open an issue or enhancement at [<Project Defect Tracking URL>](<Project Defect Tracking URL>) or start a discussion on the forum described in the Project Discussions section of the [README](README.md), especially if you plan to work on something big. Nothing is more frustrating than seeing your hard work go to waste because your vision does not align with the project core team.

This document will guide you through the contribution process.

### Step 1: Clone

Clone the repository from the git server in order to establish a local copy of the repository where you'll make your changes:

Using Stash Web UI:

1.  Log in to Stash Web UI, and go to the URL: [<Project Source Code URL>](<Project Source Code URL>)
2.  Select the 'Clone' option, then copy the URL provided and use your local Git client to clone that URL, for example:
    1.  `git clone https://username@<Project Source Code URL> <example directory name>`
    2.  `cd <example directory name>`

#### Which branch?

For most work that you contribute to this project, you will be working on a bugfix or adding a new feature. Depending on which type of thing you'll be working on, you will start from a different branch point: new features will go against the 'master' or mainline development branch, bugfixes will go against a recent release version (usually the version where the bug was found). You can see the list of branches in Stash by selecting Branches under Navigation in Stash. If in doubt, ask on the forum described in the Project Discussions section of the [README](README.md) and someone will guide you. You'll use this below (Step 2) to create a new branch from that point.

#### Dependencies

This project has several bundled dependencies in the directories of this repository that are not part of the project proper, but copied from another repository. Any changes to files in those directories or its subdirectories should be sent to their respective projects. Do not send your patch to us, we cannot accept it.

In case of doubt, open an issue or start a discussion on the forum described in the Project Discussions section of the [README](README.md), especially if you plan to work on something big. Nothing is more frustrating than seeing your hard work go to waste because your vision does not align with the project team.

Following folders have the dependencies used:

*   <list directories>

### Step 2: Branch

Create a feature or bugfix branch and start hacking.

Execute this command from within the directory of your local clone of the repository.  The example below shows how to create a new feature branch off of the master branch:
```
$ git checkout -b feature/short-feature-description master
```

or, when fixing a bug execute this command.  The example below shows how to create a new bugfix branch off of the branch of the version where the bug exists (1.0.0.0):
```
$ git checkout -b bugfix/bug#-short-bug-description release/1.0.0.0
```

### Step 3: Develop Your Stuff

You now have a private branch where you can do your work in peace. You can follow the build instructions in the [README](README.md) at any time to create a build, for example to test your changes.

Note that for your work to be accepted, you'll need to include not just code for the feature or bugfix, but also tests (which should fail before you make your changes, and succeed after) and documentation.  You can view a list of some of what committers will be looking for in the "Accepting Modifications" section of the [the COMMITTER guide](COMMITTER.md).

### Step 4: Commit

Once you think you've finished your development, you will commit your changes to your private branch.

Make sure git knows your name and email address.  The Stash git server will reject your changes unless your user name and email exactly match what is set in your Stash user profile.  You can view your Stash user profile by going to the following URL: [https://secmgmtgit.provo.novell.com:8443/profile](https://secmgmtgit.provo.novell.com:8443/profile)

```
$ git config --global user.name "J. Random User"
$ git config --global user.email "j.random.user@example.com"

```

Writing good commit logs is important. A commit log should describe what changed and why. Follow these guidelines when writing one:

1. If fixing a bug, the very first thing in the commit message must be the bug ID in the following format: [Bug #]
2. The first line should be 50 characters or less and contain a short description of the change prefixed with the name of the changed subsystem (e.g. "net: add localAddress and localPort to Socket").
3. Keep the second line blank.
4. Wrap all other lines at 72 columns.

A good commit log can look something like this:

```
[Bug 123456] subsystem: explaining the commit in one line; https://bugzilla.netiq.com/show_bug.cgi?id=123456

Body of commit message is a few lines of text, explaining things
in more detail, possibly giving some background about the issue
being fixed, etc. etc.

The body of the commit message can be several paragraphs, and
please do proper word-wrap and keep columns shorter than about
72 characters or so. That way `git log` will show things
nicely even when it is indented.

```

The header line should be meaningful; it is what other people see when they run `git shortlog` or `git log --oneline`.

Check the output of `git log --oneline files_that_you_changed` to find out what subsystem (or subsystems) your changes touch.

### Step 5: Rebase

**Skip this setup if you have already pushed your private branch to the git server.  You risk losing commits if you've already pushed and the rebase.**

Use `git rebase` (not `git merge`) to sync your work from time to time. What this does is grab any recent changes that other people have made to the upstream project and apply those changes to your local branch. The system then tries to re-apply the changes you have made so that the end results is the merger of your work with everyone else's. Note that this process is supposed to be, but is not always, automatic: see [http://git-scm.com/docs/git-rebase](http://git-scm.com/docs/git-rebase) for more info if things don't complete cleanly.

```
$ git fetch upstream
$ git rebase upstream/v1.x  # or upstream/master
```

### Step 6: Test

Bug fixes and features **should come with tests**. Add your tests in the <test code location> directory. Look at other tests to see how they should be structured (license boilerplate, common includes, etc.).

```

It is mandatory to confirm the followings before opening a pull request:

   * <State testing requirements, such as manual test cases in Testopia, automated tests, and/or unit tests to run>


### Step 7: Push

Next you'll push your changes up to the git server:

```
$ git push origin your-branch-name

```

Go to [<Project Source Code URL>](<Project Source Code URL>) and select 'Create pull request' at left. Select your branch from the top dropdown, and select the source branch you started from (in Step 2) from the bottom dropdown. Fill in the rest of the pull request fields.

Pull requests are usually reviewed within a few days. If there are review comments to address, apply your changes in a separate commit and push that to the same branch. The pull request will automatically be updated with your additional changes.

## Developer's Certificate of Origin 1.0

By making a contribution to this project, I certify that:

*   (a) The contribution was created in whole or in part by me and I have the right to submit it under the license indicated in the file; or
*   (b) The contribution was provided directly to me by some other person who certified (a) and I have not modified it.

## Code of Conduct

This Code of Conduct is adapted from [Rust's wonderful CoC](https://github.com/rust-lang/rust/wiki/Note-development-policy#conduct).

*   We are committed to providing a friendly, safe and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, religion, or similar personal characteristic.
*   Please avoid using overtly sexual nicknames or other nicknames that might detract from a friendly, safe and welcoming environment for all.
*   Please be kind and courteous. There's no need to be mean or rude.
*   Respect that people have differences of opinion and that every design or implementation choice carries a trade-off and numerous costs. There is seldom a right answer.
*   Please keep unstructured critique to a minimum. If you have solid ideas you want to experiment with, make a fork and see how it works.
*   We will exclude you from interaction if you insult, demean or harass anyone. That is not welcome behaviour. We interpret the term "harassment" as including the definition in the [Citizen Code of Conduct](http://citizencodeofconduct.org/); if you have any lack of clarity about what might be included in that concept, please read their definition. In particular, we don't tolerate behavior that excludes people in socially marginalized groups.
*   Private harassment is also unacceptable. No matter who you are, if you feel you have been or are being harassed or made uncomfortable by a community member, please contact one of the channel ops or any of the Steering Committee members immediately with a capture (log, photo, email) of the harassment if possible. Whether you're a regular contributor or a newcomer, we care about making this community a safe place for you and we've got your back.
*   Likewise any spamming, trolling, flaming, baiting or other attention-stealing behaviour is not welcome.
*   Avoid the use of personal pronouns in code comments or documentation. There is no need to address persons when explaining code (e.g. "When the developer")