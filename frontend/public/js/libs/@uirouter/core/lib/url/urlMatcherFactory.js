"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @packageDocumentation @publicapi @module url */
var common_1 = require("../common");
var urlMatcher_1 = require("./urlMatcher");
var params_1 = require("../params");
/** @internalapi */
var ParamFactory = /** @class */ (function () {
    function ParamFactory(router) {
        this.router = router;
    }
    ParamFactory.prototype.fromConfig = function (id, type, state) {
        return new params_1.Param(id, type, params_1.DefType.CONFIG, this.router.urlService.config, state);
    };
    ParamFactory.prototype.fromPath = function (id, type, state) {
        return new params_1.Param(id, type, params_1.DefType.PATH, this.router.urlService.config, state);
    };
    ParamFactory.prototype.fromSearch = function (id, type, state) {
        return new params_1.Param(id, type, params_1.DefType.SEARCH, this.router.urlService.config, state);
    };
    return ParamFactory;
}());
exports.ParamFactory = ParamFactory;
/**
 * Factory for [[UrlMatcher]] instances.
 *
 * The factory is available to ng1 services as
 * `$urlMatcherFactory` or ng1 providers as `$urlMatcherFactoryProvider`.
 *
 * @internalapi
 */
var UrlMatcherFactory = /** @class */ (function () {
    // TODO: move implementations to UrlConfig (urlService.config)
    function UrlMatcherFactory(/** @hidden */ router) {
        var _this = this;
        this.router = router;
        /** @internalapi Creates a new [[Param]] for a given location (DefType) */
        this.paramFactory = new ParamFactory(this.router);
        /** @deprecated use [[UrlConfig.caseInsensitive]] */
        this.caseInsensitive = function (value) { return _this.router.urlService.config.caseInsensitive(value); };
        /** @deprecated use [[UrlConfig.defaultSquashPolicy]] */
        this.defaultSquashPolicy = function (value) { return _this.router.urlService.config.defaultSquashPolicy(value); };
        /** @deprecated use [[UrlConfig.strictMode]] */
        this.strictMode = function (value) { return _this.router.urlService.config.strictMode(value); };
        /** @deprecated use [[UrlConfig.type]] */
        this.type = function (name, definition, definitionFn) {
            return _this.router.urlService.config.type(name, definition, definitionFn) || _this;
        };
        common_1.extend(this, { UrlMatcher: urlMatcher_1.UrlMatcher, Param: params_1.Param });
    }
    /**
     * Creates a [[UrlMatcher]] for the specified pattern.
     *
     * @param pattern  The URL pattern.
     * @param config  The config object hash.
     * @returns The UrlMatcher.
     */
    UrlMatcherFactory.prototype.compile = function (pattern, config) {
        var urlConfig = this.router.urlService.config;
        // backward-compatible support for config.params -> config.state.params
        var params = config && !config.state && config.params;
        config = params ? __assign({ state: { params: params } }, config) : config;
        var globalConfig = { strict: urlConfig._isStrictMode, caseInsensitive: urlConfig._isCaseInsensitive };
        return new urlMatcher_1.UrlMatcher(pattern, urlConfig.paramTypes, this.paramFactory, common_1.extend(globalConfig, config));
    };
    /**
     * Returns true if the specified object is a [[UrlMatcher]], or false otherwise.
     *
     * @param object  The object to perform the type check against.
     * @returns `true` if the object matches the `UrlMatcher` interface, by
     *          implementing all the same methods.
     */
    UrlMatcherFactory.prototype.isMatcher = function (object) {
        // TODO: typeof?
        if (!common_1.isObject(object))
            return false;
        var result = true;
        common_1.forEach(urlMatcher_1.UrlMatcher.prototype, function (val, name) {
            if (common_1.isFunction(val))
                result = result && (common_1.isDefined(object[name]) && common_1.isFunction(object[name]));
        });
        return result;
    };
    /** @hidden */
    UrlMatcherFactory.prototype.$get = function () {
        var urlConfig = this.router.urlService.config;
        urlConfig.paramTypes.enqueue = false;
        urlConfig.paramTypes._flushTypeQueue();
        return this;
    };
    return UrlMatcherFactory;
}());
exports.UrlMatcherFactory = UrlMatcherFactory;
//# sourceMappingURL=urlMatcherFactory.js.map