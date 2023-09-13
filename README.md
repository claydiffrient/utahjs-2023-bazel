# Using Bazel Demo

This is a demonstration project for showing Bazel in use for a monorepo-type
application setup.

**Note**: This is just an example of how Bazel might be used, the specific
details of the project is mostly irrevelant and _should not be
considered best practices or any like it._

It is primarily divided into 5 main packages.

1. Data - Contains all the interactions with the database
2. Frontend - Contains a React app for simple chore management
3. Schema - Contains protobuf definitions and code generation for the API
4. Server - Contains an Express server that hosts everything

## Prerequisites

The best way to get started is to install `bazelisk`. Instructions are provided
at https://github.com/bazelbuild/bazelisk.

For macOS, `brew intall bazelisk` is probably your best bet, but also it's
available through `npm` via `npm install -g @bazel/bazelisk`

Bazelisk will determine the version needed for any given Bazel project,
download it, and then use.

## Running Things

`bazel run //server` will build and run everything
