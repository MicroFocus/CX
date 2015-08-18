# <Project Name> Committer Guide

This document contains information for Committers to this project regarding maintaining the code, documentation, and issues.

Committers should be familiar with the guidelines for new contributors in [the CONTRIBUTOR guide](CONTRIBUTOR.md) and also understand the project governance model as outlined in [the GOVERNANCE guide](GOVERNANCE.md).

## Issues and Pull Requests

Courtesy should always be shown to individuals submitting issues and pull requests to this project.

All modifications to this project's code and documentation should be performed via pull requests, including modifications by Committers and SC members. All pull requests must be reviewed and accepted by a Committer with sufficient expertise who is able to take full responsibility for the change. In the case of pull requests proposed by an existing Committer, an additional Committer is required for sign-off.

In some cases, it may be necessary to summon a qualified Committer to a pull request for review by @-mention. If you are unsure about the modification and are not prepared to take full responsibility for the change, defer to another Committer.

## Rejecting Modifications

Committers should feel free to take full responsibility for managing issues and pull requests they feel qualified to handle, as long as this is done while being mindful of these guidelines, the opinions of other Committers and guidance of the SC.

Committers may **decline** any issue or pull request they believe is not aligned with the future of this project. When doing so, they should indicate in the comments section why they feel this way. Where this is unclear, the issue should be left open for several days to allow for additional discussion. Where this does not yield input from Committers or additional evidence that the issue has relevance, the issue may be closed. Remember that issues can always be re-opened with additional information if necessary.

## Accepting Modifications

To be accepted, a pull request must include:

   1.  The code modification(s) required to fix the defect
   2.  A link to the issue(s) that are resolved with the new code
   3.  One or more test cases that demonstrate the defect; the test should _fail_ before the change, and _pass_ after the change
   4.  Any updates to the component documentation or other artifacts as necessary to describe the change or the new functionality.
   5.  Any updates to legal documentation that are affected by the change.  All legal documents are located in the _legal_ directory of this repository.
      * [Export Control Review (ECR)](legal/ECR.odt): Describes the cryptography coded within or used by the component.
      * Open Source Review Board (OSRB): An OSRB document is required for reporting open source libraries that this component depends on.  Dependencies that are not used or included when this component is released do not need to be listed in the OSRB document.  For example, dependencies that are used for testing only during product development don't need to be reported to the OSRB.  Only direct dependencies need an OSRB document - transitory dependencies do not since they are implied.
         * When adding a new dependency to this project, fill out an [OSRB Submission Form found under the section Inclusion of Open Source Materials in Novell Offerings](https://innerweb.novell.com/organizations/engineering/cas/opensource/).  A single submission form can be used for multiple libraries.
         * When updating a version of a dependency previously reported to the OSRB, fill out a [Submission Update Form found under the section Inclusion of Open Source Materials in Novell Offerings](https://innerweb.novell.com/organizations/engineering/cas/opensource/).
         * The completed and OSRB-approved forms must be included in the pull request and the filename must have the format `OSRB-####_topic/library`, where `####` is the OSRB Matter Number assigned by the OSRB when you send the document to them for approval.
      * Intellectual Property Review Questionnaire (IPRQ): It is necessary to update the [IPRQ_INFO](legal/IPRQ_INFO.md) with information that consumers of this component can use to complete an [IPRQ legal document](https://innerweb.novell.com/organizations/legal/iprq.html) when releasing their software.

If these conditions are not met, the Committer may send the pull request back to the Contributor for them to complete the pull request.

Before landing (also known as merging) pull requests, sufficient time should be left for input from other Committers. Leave at least 48 hours during the week and 72 hours over weekends to account for international time differences and work schedules. Trivial changes (e.g. those which fix minor bugs or improve performance without affecting API or causing other wide-reaching impact) may be landed after a shorter delay.

Where there is no disagreement amongst Committers, a pull request may be landed given appropriate review. Where there is discussion amongst Committers, consensus should be sought if possible. The lack of consensus may indicate the need to elevate discussion to the SC for resolution (see below).

Once landed, the associated issue(s) for the pull request should be marked as RESOLVED. If there are dependent bugs filed against any products that consume the component, the Committer should follow those dependencies and add comments to the originating bug with respect to which build the fixes will be available in.

### Involving the SC

Committers may opt to elevate pull requests or issues to the SC for discussion by adding a topic to the next SC Meeting agenda using the process described in [SC_MEETINGS.md](SC_MEETINGS.md) or, if a response is needed more urgently, emailing the SC members directly. This should be done where a pull request:

*   has a significant impact on the codebase,
*   is inherently controversial; or
*   has failed to reach consensus amongst the Committers who are actively participating in the discussion.

The SC serves as the final arbiter where required.

## Landing Pull Requests

Landing a pull request is also known as merging a pull request.

*   Double check Pull Requests to make sure the person's _full name_ and email address are correct before merging.
*   Except when updating dependencies, all commits should be self contained. Meaning, every commit should pass all tests. This makes it much easier when bisecting to find a breaking change.
*   Select the option to *delete the source branch* of the pull request, which Stash will do after the merge is complete.  This keeps the repository tidy by removing obsolete branches.
*   The changes will automatically be merged to downstream branches, which are branches with newer versions of the code than the pull request target branch.  If a merge conflict occurs during the automatic merge process, Stash will create a new pull request and provide instructions for resolving the conflict.  It is the responsibility of the committer to resolve the merge conflict.

### Technical HOWTO

Stash provides a webpage user interface for reviewing, approving, and merging pull requests.  To view and review the list of currently open pull requests, go to this URL: [<Project Pull Request URL>](<Project Pull Request URL>)