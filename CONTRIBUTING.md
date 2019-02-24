# Contributing to Bolingbrook Church

## Submitting Issues

[Just do it](https://github.com/clarkmalmgren/bolingbrook-church/issues/new). Please include meaningful titles and descriptions.

## Guidelines

Contributions are welcome via pull requests. Please adhere to the following guidelines:

  * At least 90% Unit Test Coverage
  * If you want to squash an outstanding issue, bonus points for using
    [Issue2PR](http://issue2pr.herokuapp.com/) to connect your feature branch
    with the currently outstanding issue. This helps avoid issue/PR
    duplication.
  * Squash changes down to a single commit
  * PRs should be against `master`

## Getting Started

### Cloning the Repository

Nothing special here. Just follow the [standard directions](https://help.github.com/articles/fork-a-repo/).

### Install NodeJS & NPM

On OS X, use [NVM](http://nvm.sh/):

```bash
$ nvm install node
```

### Globally Install Angular CLI

[Angular CLI](https://github.com/angular/angular-cli) is the tool that is used to build and test this project.
It needs to be installed globally in order for it to work from the command line. You can do that by issuing the following command:

```bash
npm install -g @angular/cli
```

### Install NPM Dependencies

```bash
$ npm install
```

### Running and Testing

This project uses standard Angular CLI processes for development. For more information, see the
[Angular CLI Usage](https://github.com/angular/angular-cli#usage) documentation.

### Project Layout

This project attempts to employ [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/)
to create reusable components at every level. Please keep this in mind.

### Developing Tests

Tests should be well organized into functional groups using `describe` blocks. Each test should also read descriptively
in a hierarchical fashion. The test should also be separated into given, when, then phases with comments to delinate
setup, run and verification parts of a test.  There could be multiple when and then blocks in a single test.

## More Questions?

Feel free to create a github issue and just mark it as "help wanted".
