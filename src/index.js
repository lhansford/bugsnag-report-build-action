const reportBuild = require('bugsnag-build-reporter');
const core = require('@actions/core');
const fs = require('fs');
const path = require('path')

let failCiIfError = false;

function getPackageVersion() {
  const packageJson = fs.readFileSync(path.join('./', 'package.json')).toString();
  return JSON.parse(packageJson).version;
};

try {
  const apiKey = core.getInput('apiKey');
  if (!apiKey) {
    throw new Error('apiKey is required');
  }

  const appVersion = core.getInput('appVersion') || getPackageVersion();
  const releaseStage = core.getInput('releaseStage');
  const provider = core.getInput('sourceControlProvider');
  const repository = core.getInput('sourceControlRepository') || process.env.GITHUB_REPOSITORY;
  const revision = core.getInput('sourceControlRevision') || process.env.GITHUB_SHA;
  failCiIfError = core.getInput('failCiIfError');

  console.log(`Reporting build for version ${appVersion}`);
  reportBuild({
    apiKey,
    appVersion,
    releaseStage,
    sourceControl: { provider, repository, revision },
  })
    .then(() => core.info('Build reported to Bugsnag successfully.'))
    .catch((error) => {
      throw error;
    });
} catch (error) {
  core.setFailed(error.message);
  if (failCiIfError) {
    core.setFailed(`bugsnag-report-build-action failed: ${error.message}`);
  } else {
    core.warning(`bugsnag-report-build-action failed: ${error.message}`);
  }
}
