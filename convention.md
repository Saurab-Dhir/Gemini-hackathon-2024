## Table of Content

1. [Commit Message Convention](#commit-message-convention)
2. [Branch Name Conventions](#branch-name-convention)
3. [Issue Conventions](#issue-conventions)
4. [Pull Request (PR) Conventions](#pull-request-conventions)

## Commit Message Convention

### Commit Formats

```text
<TYPE> [<scope>] <subject>
(empty separator line)
<optional body>
(empty separator line)
<optional footer>
```

### `TYPE`

- `FEAT` add a new feature
- `FIX` fix a bug
- `REFACTOR` refactor of code
- `PERF` special refactor of code that improves performance
- `TEST` add or modify the test
- `DOC` add or modify the documentation
- `BUILD` add or modify building tools, dependencies, project version
- `CHORE` misc. commit, such as modify `.gitignore`

### `scope`

It provides location information of where modifications are made.

_Example of modifying front end, webservice assessment auto-save function would be: `[ws/risk-assess]`_

Note: It is not optional

### `subject`

It starts with an imperative, present tense verb

- do not capitalize the first letter
- do not add an ending dot
- be brief

### `optional body`

Note: This is not commonly used, but the following directly comes from [Conventional Commit Messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13#body)

> The `body` should include the motivation for the change and contrast this with previous behavior.
>
> - Is an optional part of the format
> - Use the imperative, present tense: "change" not "changed" nor "changes."
> - This is the place to mention issue identifiers and their relations

### `optional footer`

Note: This is not commonly used, but the following directly comes from [Conventional Commit Messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13#footer)

> The `footer` should contain any information about **Breaking Changes** and is also the place to **reference Issues** that this commit refers to
>
> - Is an **optional** part of the format
> - **optionally** reference an issue by its id.
> - **Breaking Changes** should start with the word `BREAKING CHANGES`: followed by a space or two newlines. The rest of the commit message is then used for this.

### Example

Some examples can be

- [Commit #a407fd](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/wasp-webservices-frontend/commit/a4207fd964f84d3b7b81855122382352be2380ab)

  ```text
  FEAT [ws/risk-assess] add auto-save function when clicking the 'go back' button
  ```

- [Issue #217](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/wasp-webservices-frontend/issues/217), its commit can be written as

  ```text
  FIX [tos/ps] remove the 'preview' button
  ```

- [Commit #40c6844](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/wasp-webservices-frontend/commit/40c6844d5f8491eea76597750bd2e9b692cdd4e3)

  ```text
  CHORE [gitignore] add yarn/package-lock file into gitignore
  ```

- More examples from [Conventional Commit Messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13#footer)

  ```text
  FEAT [shopping-cart] remove ticket list endpoint

  refers to JIRA-1337
  BREAKING CHANGES: ticket endpoints no longer supports list all entites.
  ```

  ```text
  FIX [service-call] add missing parameter to service call

  The error occurred because of <reasons>.
  ```

  ```text
  BUILD [release] bump version to 1.0.0
  ```

  ```text
  REFACTOR [api/upload-result] implement calculation method as recursion
  ```

source: [gist](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13#conventional-commit-messages)

## Branch Name Convention

### Branch Name Formats

```text
<category>/<reference>/<description>
```

### `category`

1. Regular Branch (Permanently in the Repo)

- `master` master branch
- `staging` staging branch (named _orange_ in Repo)

2. Temporary Branch

- `bugfix` fix a bug
- `hotfix` change code with a temporary solution and/or without following the usual procedure, fix something really fast and/or really minor
- `feat` introduce a new single feature
- `dev` regular developing branch, all new features are merged here before PR to staging/production branch process (usually because of an emergency)
- `test` experiment outside of a usual development routine

### `reference`

This is a reference of the issue/ticket you are working on; if there is no reference, use `no-ref`

### `description`

This is a description of the purpose of this specific branch; it should be short and should use `-` to replace any special character

### Example

The branch name for [Issue #210](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/wasp-webservices-frontend/issues/210) should be written as:
`text
    feat/issue-210/ws-riskassess-autosave
    `

The branch name for [Issue #218](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/wasp-webservices-frontend/issues/218) should be written as:
`text
    bugfix/issue-218/ws-LISID-submit-failure
    `

More examples from [A Simplified Convention for Naming Branches and Commits in Git](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4#:~:text=Branch%20Naming%20Convention&text=A%20git%20branch%20should%20start,bugfix%20%2C%20hotfix%20%2C%20or%20test%20.&text=After%20the%20category%2C%20there%20should,%2C%20just%20add%20no%2Dref%20.)

You need to fix a bug really fast (possibly with a temporary solution)
`text
    hotfix/no-ref/registration-form-not-working
    `
You need to experiment outside of an issue/ticket
`text
    test/no-ref/refactor-components-with-atomic-design
    `

source: [hackernoon](https://hackernoon.com/git-branch-naming-convention-7-best-practices-to-follow-1c2l33g2)

source: [dev.to](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4#:~:text=Branch%20Naming%20Convention&text=A%20git%20branch%20should%20start,bugfix%20%2C%20hotfix%20%2C%20or%20test%20.&text=After%20the%20category%2C%20there%20should,%2C%20just%20add%20no%2Dref%20)

## Issue Conventions

### Create an Issue/Ticket

Since we use an issue as our ticket, the issue has to be informative and descriptive.

#### Title

```text
<project>/<scope>/<problem>
```

#### `project`

Indicate which project the issue belongs. Since we use only one board for all projects, the project name lets the developer understand from a glance.

Please choose from one of the following:

- `WASP`
- `CD`
- `DPP`

The project part can be changed or removed **only if we start to use different boards for different projects in the future**

#### `scope`

The scope of the problem is similar to the scope in the commit message.

#### `problem`

This should be concise but clearly describe the problem.

#### Body

There is no format for the issue body, but it is better (must when applicable) to include these:

- `Location`: where the problem occurs; if known the exact place of the code, please specify the exact directory and file names; if unknown, please specify where the part in the program that is being observed
- `Expectation`: describe what is the expected behavior
- `Observation`: describe what is actually being observed

It is also better to include the following:

- `Reproduction`: how another developer can reproduce the problem

Sometimes, add these as needed:

- `Comment`: write an additional comment
- `Suggestion`: give some suggestions if you don't know how to improve it, but have ideas
- `Solution`: give a direct solution to the problem
- `Picture`: add a picture/screenshot to elaborate on the result, if it is hard to visualize with words
- `#`: mention (create a hyperlink) to the previous issue, or pull request, etc.
- `@`: bring a specific developer's attention

The bottom line is that the first three points shall always appear in the issue.

### After an Issue Creation

#### Labels

Choose from a selection of `labels` to which this issue belongs.

#### Projects

Select our board and move to the `to do` column to make it visible for work distribution.

#### Development

Link to a branch that is specialized for solving this issue.

### Fixing an Issue

#### Comment

Comment on anything that is needed. Use `#` to link to the previous issue or previous PR. Use `@` to bring other developers' attention.

### Finishing an Issue

Attach either a screenshot or the checklist file verifying that all WASP functions changed by any code changes are `pass`. Use `Development` section on the right side bar to link to an issue; only close it when confirming that it is **done done**

### Example

[Issue 216](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/wasp-webservices-frontend/issues/216)

- Issue `Title`:

  ```text
  <project>/<scope>/<problem>
  WASP/service contracts/priority statement sentence matching matches too many result
  ```

- Issue `Body`:

  ```text
  ## Location
  In service contract->priority statement

  ## Expectation
  Only the selected sentence get highlighted, despite there might be more sentence that are identical.

  ## Observation
  The sentence with identical characters/sentence will be also highlighted. This probably not ideal as the user might just want to mention one specific part of the contract instead of the parts with identical characters/sentences.

  Notice how many ")(collectively, t" has been highlighted in the screenshot.
  ![image](https://github.wdf.sap.corp/storage/user/126209/files/df24aaff-3946-45ef-9532-de2bfd629728)

  ## Reproduction
  By simply selecting a sentence/character/word that might have many occurrence in the contract.
  ```

- Please notice that this issue includes three strongly suggested sections: `Location`, `Expectation`, and `Observation`; since this issue cannot be found out in some edge case, the secontion `Reproduction` is also included
- Issue `Label`:

  Appropriate labels: `enhancement` and `question` are chosen

- Issue `Project`:

  The "Board" is chosen, and is moved to `to do` column

- Issue `Development`:
  It will ill be assigned when there is a branch for tackling this issue, or there is a pull request that solves this issue.

More examples:

[Issue 213](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/wasp-webservices-frontend/issues/213) for the issue title and body; some improvements can be made to the `comment` section: maybe can link to an issue that is currently work in progress.

[Issue 207](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/wasp-webservices-frontend/issues/207) for linking PR.

## Pull Request Conventions

### Good Practices for Code Review

> A good pull request should not have more than 250 lines of code changed

> Use checklist

See more:
[Best Practices for Code Review](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/)
[The anatomy of a perfect pull request](https://hugooodias.medium.com/the-anatomy-of-a-perfect-pull-request-567382bb6067)

A good code review practice is to use automatic or manual tests. **For now** and for WASP project specifically, please **use the "checklist"** to verify all the functions are working properly, especially the bugs that was trying to be fixed in this PR.

For now and for the WASP project, also consider to **add entries to the "checklist" when developing new features**.

It is aimed to transfer to automated (unit) testing in the future.

### PR Title

```text
[<issue id>] <summary>
```

### `issue id`

This refers to the issue that this PR solves

### `summary`

A summary of all the commit, starting with a capitalized, present tense verb. Notice that git will only display the first 50-60 characters of the title. So the summary should be brief

### PR Description

A descriptive summary of what has been done. It is not necessary to follow any format, but please use **markdown** and split the description into sections. Please also give example, use code blocks, and give examples as needed.

### Example

[Pull Request #222](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/wasp-webservices-frontend/pull/222)

- Title:

  ```text
  [issue-210] Add auto-save when "go back" in ws risk assess, add lock files in gitignore
  ```

- Description:

  ````text
  ## Summary
  Add an auto-save function when clicking the "go back" button in the webservice risk assessment. Now, the assessment progress will be kept when exiting from the risk assessment page, and a popup with the assessment has been saved will be displayed.

  Also add yarn/package-lock file into `gitignore`

  ## Procedure
  Changes take place from line 458 to line 462. Replace the previous function (`this.store.decrementCurrentStep()`) as the api that saves the risk assessment form. Notice that the status of the risk assessment is marked as "In Progress" and "Assessment Needed".
  ```jsx
  <Button className='raButton' type="button" onClick={() => {
  let newRaBody = {
      "review_status": "In Progress",
      "reviewer": [this.globalStore.user_inumber, "Assessment Edited"]
  }
  this.finalRAFormSubmit(newRaBody);
  }}>Go Back</Button>

  ## Next Step
  It is good to remove the popup (assessment finished) when "go back" is clicked, since the user is not intended to "save" the progress. This is a usability concern, since the user might not expect a "pop up".
  ````

source: [hugooodies blog](https://hugooodias.medium.com/the-anatomy-of-a-perfect-pull-request-567382bb6067)

source: [namingconvention](https://namingconvention.org/git/pull-request-naming.html)
