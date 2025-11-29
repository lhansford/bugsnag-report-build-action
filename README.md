# bugsnag-report-build-action

This Github Action that will report a new build to Bugsnag when run.

## Inputs

This action uses [`bugsnag-build-reporter-node`](https://github.com/bugsnag/bugsnag-build-reporter-node)
under the hood, so for more details on available options see its readme.

### `apiKey`

**Required** Your Bugsnag API Key.

### `appVersion`

A version string for the build to report. Default: The version in ./package.json for the PR. This will only work if actions/checkout@v4 is used first.

### `autoAssignRelease`

Whether Bugsnag should auto-assign this release to future error events. Default: `true`.

### `builderName`

The name of the person/machine that trigerred this build. Default: The value of `whoami`.

### `failCiIfError`

If true then CI will fail if this action fails. Default: `false`.

### `releaseStage`

The release stage of the build. Default: `production`.

### `sourceControlProvider`

The source control provider. Default: `github`.

### `sourceControlRepository`

The source control repository. Default: The repository running the Github Action.

### `sourceControlRevision`

The source control revision. Default: The SHA for the running Github Action.

## Example usage

```yml
uses: lhansford/bugsnag-report-build-action@v1.3.0
with:
  apiKey: ${{ secrets.bugsnag_api_key }}
  appVersion: 1.0.0
  failCiIfError: true
```

### Example usage if appVersion is not defined

If `appVersion` is not defined the action will try to get it from the `package.json` of the project,
so you will need to include `actions/checkout@v4` first.

```yml
uses: actions/checkout@v4

uses: lhansford/bugsnag-report-build-action@v1.3.0
with:
  apiKey: ${{ secrets.bugsnag_api_key }}
  failCiIfError: true
```

## Developing

To deploy new changes:

- Make changes and update all references to the package version.
- Run `npm run build`
- Push changes to `main` branch.
- Check CI passed.
- Create a new release on Github matching the new version.
