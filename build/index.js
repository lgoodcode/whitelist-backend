/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config/env.js":
/*!***********************!*\
  !*** ./config/env.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nconst paths = __webpack_require__(/*! ./paths */ \"./config/paths.js\")\nconst NODE_ENV = \"development\"\n\nif (!NODE_ENV) {\n   throw new Error('The NODE_ENV environment variable is required but was not specified.')\n}\n\n// Determine whether to read the development or production .env files\nconst isEnvDevelopment = \"development\" === 'development'\nconst dotenvFilePath = `${paths.dotenv}.${\n   isEnvDevelopment ? 'development' : 'production'\n}`\n\n// Loads the environment variables\n__webpack_require__(/*! dotenv */ \"dotenv\").config({ path: dotenvFilePath })\n\n\n//# sourceURL=webpack://whitelist-backend/./config/env.js?");

/***/ }),

/***/ "./config/paths.js":
/*!*************************!*\
  !*** ./config/paths.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\")\nconst { resolve } = __webpack_require__(/*! path */ \"path\")\nconst path = __webpack_require__(/*! path */ \"path\")\n\nconst appDirectory = fs.realpathSync(process.cwd())\nconst resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)\n\nmodule.exports = {\n   dotenv: resolveApp('.env'),\n   appPath: resolveApp('.'),\n   appBuild: resolveApp('build'),\n   appEntry: resolveApp('src/server.ts'),\n   appSrc: resolveApp('src')\n}\n\n\n//# sourceURL=webpack://whitelist-backend/./config/paths.js?");

/***/ }),

/***/ "./src/controllers/products.ts":
/*!*************************************!*\
  !*** ./src/controllers/products.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProducts\": () => (/* binding */ getProducts),\n/* harmony export */   \"getProductById\": () => (/* binding */ getProductById),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../database */ \"./src/database/index.ts\");\n\r\nconst getProducts = (req, res) => {\r\n    const query = 'SELECT * FROM products';\r\n    _database__WEBPACK_IMPORTED_MODULE_0__[\"default\"].query(query, [], (err, data) => {\r\n        if (err) {\r\n            console.error(err);\r\n            res.status(400).json({ error: err });\r\n        }\r\n        res.json(data.rows);\r\n    });\r\n};\r\nconst getProductById = (req, res) => {\r\n    const query = 'SELECT * FROM PRODUCTS WHERE id = $1';\r\n    _database__WEBPACK_IMPORTED_MODULE_0__[\"default\"].query(query, [req.params.id], (err, data) => {\r\n        if (err)\r\n            throw err;\r\n        res.json(data.rows);\r\n    });\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    getProducts,\r\n    getProductById\r\n});\r\n\n\n//# sourceURL=webpack://whitelist-backend/./src/controllers/products.ts?");

/***/ }),

/***/ "./src/database/index.ts":
/*!*******************************!*\
  !*** ./src/database/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst SSL =  true\r\n    ? false\r\n    : 0;\r\nconst pool = new pg__WEBPACK_IMPORTED_MODULE_0__.Pool({\r\n    connectionString: process.env.PG_CONNECTION,\r\n    /**\r\n     * Require SSL connection but allow unauthorized certificates. This is because we are\r\n     * using self-signed certs which aren't validated by a CA.\r\n     * https://stackoverflow.com/questions/25000183/node-js-postgresql-error-no-pg-hba-conf-entry-for-host\r\n     */\r\n    ssl: SSL\r\n});\r\n// the pool will emit an error on behalf of any idle clients\r\n// it contains if a backend error or network partition happens\r\npool.on('error', (err) => {\r\n    console.error('Unexpected error on idle client', err);\r\n    process.exit(-1);\r\n});\r\nfunction query(query, params, callback) {\r\n    if (!params && callback) {\r\n        pool.query(query, callback);\r\n    }\r\n    else {\r\n        pool.query(query, params, callback);\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    query\r\n});\r\n// export default {\r\n//    query: (query: string, callback: (err: Error, result: QueryResult) => void) =>\r\n//       pool.query(query, callback),\r\n//    queryParams: pool.query\r\n// }\r\n\n\n//# sourceURL=webpack://whitelist-backend/./src/database/index.ts?");

/***/ }),

/***/ "./src/routes.ts":
/*!***********************!*\
  !*** ./src/routes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_products__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/products */ \"./src/controllers/products.ts\");\n\r\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router\r\n    .get('/products', _controllers_products__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getProducts)\r\n    .get('/products/:id', _controllers_products__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getProductById));\r\n\n\n//# sourceURL=webpack://whitelist-backend/./src/routes.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/env */ \"./config/env.js\");\n/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config_env__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cluster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cluster */ \"cluster\");\n/* harmony import */ var cluster__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cluster__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes */ \"./src/routes.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst app = express__WEBPACK_IMPORTED_MODULE_2___default()();\r\nconst port = process.env.PORT || 4000;\r\n// Set process name\r\nif (process.env.APP_NAME) {\r\n    process.title = process.env.APP_NAME;\r\n}\r\n// Disable the express header for security\r\napp.disable('x-powered-by');\r\n// Compress all responses\r\napp.use(compression__WEBPACK_IMPORTED_MODULE_3___default()());\r\n// Allow cross-domain requests from the frontend to Heroku backend\r\napp.use(cors__WEBPACK_IMPORTED_MODULE_4___default()());\r\n// Parse JSON and form data in req.body\r\napp.use(express__WEBPACK_IMPORTED_MODULE_2___default().json());\r\napp.use(express__WEBPACK_IMPORTED_MODULE_2___default().urlencoded({ extended: false }));\r\n// app.use(require('./controllers/logging'))\r\napp.use('/api', _routes__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\r\n// Error handler for promises - silently catch\r\nprocess.on('uncaughtException', (err) => {\r\n    console.error(`uncaught error\\n${err.stack}`);\r\n    console.error('Killing node...');\r\n    process.exit(1);\r\n});\r\n/**\r\n *  If this script is ran directly, require.main === module will be true;\r\n *  if it is false, the script has been loaded from another script\r\n *  using require.\r\n *\r\n *  If ran directly, start server app with clustering\r\n */\r\nif ((cluster__WEBPACK_IMPORTED_MODULE_1___default().isPrimary)) {\r\n    app.listen(port, () => {\r\n        console.log(`Server started in ${app.get('env')} mode on port ${port}`);\r\n    });\r\n}\r\nelse {\r\n    (__webpack_require__(/*! os */ \"os\").cpus)()\r\n        .forEach(() => cluster__WEBPACK_IMPORTED_MODULE_1___default().fork());\r\n    // log any workers that disconnect; if a worker disconnects, it\r\n    // should then exit, so we'll wait for the exit event to spawn\r\n    // a new worker to replace it\r\n    cluster__WEBPACK_IMPORTED_MODULE_1___default().on('disconnect', (worker) => {\r\n        console.log('CLUSTER: Worker %d disconnected from the cluster.', worker.id);\r\n    });\r\n    // when a worker dies (exits), create a worker to replace it\r\n    cluster__WEBPACK_IMPORTED_MODULE_1___default().on('exit', (worker, code, signal) => {\r\n        console.log('CLUSTER: Worker %d died with exit code %d (%s)', worker.id, code, signal);\r\n        cluster__WEBPACK_IMPORTED_MODULE_1___default().fork();\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://whitelist-backend/./src/server.ts?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("compression");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("pg");

/***/ }),

/***/ "cluster":
/*!**************************!*\
  !*** external "cluster" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("cluster");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
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
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.ts");
/******/ 	
/******/ })()
;