# bugsnag-report-build-action

This Github Action that will report a new build to Bugsnag when run.

## Inputs

This action uses [`bugsnag-build-reporter-node`](https://github.com/bugsnag/bugsnag-build-reporter-node)
under the hood, so for more details on available options see its readme.

### `apiKey`

**Required** Your Bugsnag API Key.

### `appVersion`

A version string for the build to report. Default: The version in ./package.json for the PR. This will only work if actions/checkout@v2 is used first.

### `releaseStage`

The release stage of the build. Default: `production`.

### `sourceControlProvider`

The source control provider. Default: `github`.

### `sourceControlRepository`

The source control repository. Default: The repository running the Github Action.

### `sourceControlRevision`

The source control revision. Default: The SHA for the running Github Action.

### `failCiIfError`

If true then CI will fail if this action fails. Default: `false`.

## Example usage

```yml
uses: lhansford/bugsnag-report-build-action@v1.0.9
with:
  apiKey: ${{ secrets.bugsnag_api_key }}
  appVersion: 1.0.0
  failCiIfError: true
```

## Example usage if appVersion is not specified

```yml
uses: actions/checkout@v2

uses: lhansford/bugsnag-report-build-action@v1.0.9
with:
  apiKey: ${{ secrets.bugsnag_api_key }}
  appVersion: 1.0.0
  failCiIfError: true
```
