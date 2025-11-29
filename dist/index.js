/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 31:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 998:
/***/ ((module) => {

module.exports = eval("require")("bugsnag-build-reporter");


/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const reportBuild = __nccwpck_require__(998);
const core = __nccwpck_require__(31);
const fs = __nccwpck_require__(896);
const path = __nccwpck_require__(928)

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
  const builderName = core.getInput('builderName');
  const provider = core.getInput('sourceControlProvider');
  const repository = core.getInput('sourceControlRepository') || process.env.GITHUB_REPOSITORY;
  const revision = core.getInput('sourceControlRevision') || process.env.GITHUB_SHA;
  const failCiIfError = core.getInput('failCiIfError');
  const autoAssignRelease = core.getInput('autoAssignRelease');

  console.log(`Reporting build for version ${appVersion}`);

  reportBuild({
    apiKey,
    appVersion,
    builderName,
    releaseStage,
    sourceControl: { provider, repository, revision },
    autoAssignRelease: autoAssignRelease === 'true'
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

module.exports = __webpack_exports__;
/******/ })()
;