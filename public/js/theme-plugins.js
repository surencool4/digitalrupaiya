/**
 * Parallax.js
 * @author Matthew Wagerfield - @wagerfield, René Roth - mail@reneroth.org
 * @description Creates a parallax effect between an array of layers,
 *              driving the motion from the gyroscope output of a smartdevice.
 *              If no gyroscope is available, the cursor position is used.
 */

(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }
        g.Parallax = f();
    }
})(function () {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw ((f.code = "MODULE_NOT_FOUND"), f);
                }
                var l = (n[o] = { exports: {} });
                t[o][0].call(
                    l.exports,
                    function (e) {
                        var n = t[o][1][e];
                        return s(n ? n : e);
                    },
                    l,
                    l.exports,
                    e,
                    t,
                    n,
                    r
                );
            }
            return n[o].exports;
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s;
    })(
        {
            1: [
                function (require, module, exports) {
                    "use strict";
                    var _createClass = (function () {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable =
                                    descriptor.enumerable || !1;
                                descriptor.configurable = !0;
                                if ("value" in descriptor)
                                    descriptor.writable = !0;
                                Object.defineProperty(
                                    target,
                                    descriptor.key,
                                    descriptor
                                );
                            }
                        }
                        return function (Constructor, protoProps, staticProps) {
                            if (protoProps)
                                defineProperties(
                                    Constructor.prototype,
                                    protoProps
                                );
                            if (staticProps)
                                defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    })();
                    var _raf = require("raf");
                    var _raf2 = _interopRequireDefault(_raf);
                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : { default: obj };
                    }
                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) {
                            throw new TypeError(
                                "Cannot call a class as a function"
                            );
                        }
                    }
                    var helpers = {
                        propertyCache: {},
                        vendors: [
                            null,
                            ["-webkit-", "webkit"],
                            ["-moz-", "Moz"],
                            ["-o-", "O"],
                            ["-ms-", "ms"],
                        ],
                        clamp: function clamp(value, min, max) {
                            return min < max
                                ? value < min
                                    ? min
                                    : value > max
                                    ? max
                                    : value
                                : value < max
                                ? max
                                : value > min
                                ? min
                                : value;
                        },
                        data: function data(element, name) {
                            return helpers.deserialize(
                                element.getAttribute("data-" + name)
                            );
                        },
                        deserialize: function deserialize(value) {
                            if (value === "true") {
                                return !0;
                            } else if (value === "false") {
                                return !1;
                            } else if (value === "null") {
                                return null;
                            } else if (
                                !isNaN(parseFloat(value)) &&
                                isFinite(value)
                            ) {
                                return parseFloat(value);
                            } else {
                                return value;
                            }
                        },
                        camelCase: function camelCase(value) {
                            return value.replace(
                                /-+(.)?/g,
                                function (match, character) {
                                    return character
                                        ? character.toUpperCase()
                                        : "";
                                }
                            );
                        },
                        accelerate: function accelerate(element) {
                            helpers.css(
                                element,
                                "transform",
                                "translate3d(0,0,0) rotate(0.0001deg)"
                            );
                            helpers.css(
                                element,
                                "transform-style",
                                "preserve-3d"
                            );
                            helpers.css(
                                element,
                                "backface-visibility",
                                "hidden"
                            );
                        },
                        transformSupport: function transformSupport(value) {
                            var element = document.createElement("div"),
                                propertySupport = !1,
                                propertyValue = null,
                                featureSupport = !1,
                                cssProperty = null,
                                jsProperty = null;
                            for (
                                var i = 0, l = helpers.vendors.length;
                                i < l;
                                i++
                            ) {
                                if (helpers.vendors[i] !== null) {
                                    cssProperty =
                                        helpers.vendors[i][0] + "transform";
                                    jsProperty =
                                        helpers.vendors[i][1] + "Transform";
                                } else {
                                    cssProperty = "transform";
                                    jsProperty = "transform";
                                }
                                if (element.style[jsProperty] !== undefined) {
                                    propertySupport = !0;
                                    break;
                                }
                            }
                            switch (value) {
                                case "2D":
                                    featureSupport = propertySupport;
                                    break;
                                case "3D":
                                    if (propertySupport) {
                                        var body =
                                                document.body ||
                                                document.createElement("body"),
                                            documentElement =
                                                document.documentElement,
                                            documentOverflow =
                                                documentElement.style.overflow,
                                            isCreatedBody = !1;
                                        if (!document.body) {
                                            isCreatedBody = !0;
                                            documentElement.style.overflow =
                                                "hidden";
                                            documentElement.appendChild(body);
                                            body.style.overflow = "hidden";
                                            body.style.background = "";
                                        }
                                        body.appendChild(element);
                                        element.style[jsProperty] =
                                            "translate3d(1px,1px,1px)";
                                        propertyValue = window
                                            .getComputedStyle(element)
                                            .getPropertyValue(cssProperty);
                                        featureSupport =
                                            propertyValue !== undefined &&
                                            propertyValue.length > 0 &&
                                            propertyValue !== "none";
                                        documentElement.style.overflow =
                                            documentOverflow;
                                        body.removeChild(element);
                                        if (isCreatedBody) {
                                            body.removeAttribute("style");
                                            body.parentNode.removeChild(body);
                                        }
                                    }
                                    break;
                            }
                            return featureSupport;
                        },
                        css: function css(element, property, value) {
                            var jsProperty = helpers.propertyCache[property];
                            if (!jsProperty) {
                                for (
                                    var i = 0, l = helpers.vendors.length;
                                    i < l;
                                    i++
                                ) {
                                    if (helpers.vendors[i] !== null) {
                                        jsProperty = helpers.camelCase(
                                            helpers.vendors[i][1] +
                                                "-" +
                                                property
                                        );
                                    } else {
                                        jsProperty = property;
                                    }
                                    if (
                                        element.style[jsProperty] !== undefined
                                    ) {
                                        helpers.propertyCache[property] =
                                            jsProperty;
                                        break;
                                    }
                                }
                            }
                            element.style[jsProperty] = value;
                        },
                    };
                    var MAGIC_NUMBER = 30,
                        DEFAULTS = {
                            relativeInput: !1,
                            clipRelativeInput: !1,
                            calibrationThreshold: 100,
                            calibrationDelay: 500,
                            supportDelay: 500,
                            calibrateX: !1,
                            calibrateY: !0,
                            invertX: !0,
                            invertY: !0,
                            limitX: !1,
                            limitY: !1,
                            scalarX: 10.0,
                            scalarY: 10.0,
                            frictionX: 0.1,
                            frictionY: 0.1,
                            originX: 0.5,
                            originY: 0.5,
                            pointerEvents: !1,
                            precision: 1,
                        };
                    var Parallax = (function () {
                        function Parallax(element, options) {
                            _classCallCheck(this, Parallax);
                            this.element = element;
                            this.layers =
                                element.getElementsByClassName("layer");
                            var data = {
                                calibrateX: helpers.data(
                                    this.element,
                                    "calibrate-x"
                                ),
                                calibrateY: helpers.data(
                                    this.element,
                                    "calibrate-y"
                                ),
                                invertX: helpers.data(this.element, "invert-x"),
                                invertY: helpers.data(this.element, "invert-y"),
                                limitX: helpers.data(this.element, "limit-x"),
                                limitY: helpers.data(this.element, "limit-y"),
                                scalarX: helpers.data(this.element, "scalar-x"),
                                scalarY: helpers.data(this.element, "scalar-y"),
                                frictionX: helpers.data(
                                    this.element,
                                    "friction-x"
                                ),
                                frictionY: helpers.data(
                                    this.element,
                                    "friction-y"
                                ),
                                originX: helpers.data(this.element, "origin-x"),
                                originY: helpers.data(this.element, "origin-y"),
                                pointerEvents: helpers.data(
                                    this.element,
                                    "pointer-events"
                                ),
                                precision: helpers.data(
                                    this.element,
                                    "precision"
                                ),
                                relativeInput: helpers.data(
                                    this.element,
                                    "relative-input"
                                ),
                                clipRelativeInput: helpers.data(
                                    this.element,
                                    "clip-relative-input"
                                ),
                            };
                            for (var key in data) {
                                if (data[key] === null) {
                                    delete data[key];
                                }
                            }
                            Object.assign(this, DEFAULTS, data, options);
                            this.calibrationTimer = null;
                            this.calibrationFlag = !0;
                            this.enabled = !1;
                            this.depthsX = [];
                            this.depthsY = [];
                            this.raf = null;
                            this.bounds = null;
                            this.elementPositionX = 0;
                            this.elementPositionY = 0;
                            this.elementWidth = 0;
                            this.elementHeight = 0;
                            this.elementCenterX = 0;
                            this.elementCenterY = 0;
                            this.elementRangeX = 0;
                            this.elementRangeY = 0;
                            this.calibrationX = 0;
                            this.calibrationY = 0;
                            this.inputX = 0;
                            this.inputY = 0;
                            this.motionX = 0;
                            this.motionY = 0;
                            this.velocityX = 0;
                            this.velocityY = 0;
                            this.onMouseMove = this.onMouseMove.bind(this);
                            this.onDeviceOrientation =
                                this.onDeviceOrientation.bind(this);
                            this.onOrientationTimer =
                                this.onOrientationTimer.bind(this);
                            this.onCalibrationTimer =
                                this.onCalibrationTimer.bind(this);
                            this.onAnimationFrame =
                                this.onAnimationFrame.bind(this);
                            this.onWindowResize =
                                this.onWindowResize.bind(this);
                            this.windowWidth = null;
                            this.windowHeight = null;
                            this.windowCenterX = null;
                            this.windowCenterY = null;
                            this.windowRadiusX = null;
                            this.windowRadiusY = null;
                            this.portrait = null;
                            this.desktop = !navigator.userAgent.match(
                                /(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i
                            );
                            this.motionSupport =
                                !!window.DeviceMotionEvent && !this.desktop;
                            this.orientationSupport =
                                !!window.DeviceOrientationEvent &&
                                !this.desktop;
                            this.orientationStatus = 0;
                            this.motionStatus = 0;
                            this.initialise();
                        }
                        _createClass(Parallax, [
                            {
                                key: "initialise",
                                value: function initialise() {
                                    if (this.transform2DSupport === undefined) {
                                        this.transform2DSupport =
                                            helpers.transformSupport("2D");
                                        this.transform3DSupport =
                                            helpers.transformSupport("3D");
                                    }
                                    if (this.transform3DSupport) {
                                        helpers.accelerate(this.element);
                                    }
                                    var style = window.getComputedStyle(
                                        this.element
                                    );
                                    if (
                                        style.getPropertyValue("position") ===
                                        "static"
                                    ) {
                                        this.element.style.position =
                                            "relative";
                                    }
                                    if (!this.pointerEvents) {
                                        this.element.style.pointerEvents =
                                            "none";
                                    }
                                    this.updateLayers();
                                    this.updateDimensions();
                                    this.enable();
                                    this.queueCalibration(
                                        this.calibrationDelay
                                    );
                                },
                            },
                            {
                                key: "updateLayers",
                                value: function updateLayers() {
                                    this.layers =
                                        this.element.getElementsByClassName(
                                            "layer"
                                        );
                                    this.depthsX = [];
                                    this.depthsY = [];
                                    for (
                                        var index = 0;
                                        index < this.layers.length;
                                        index++
                                    ) {
                                        var layer = this.layers[index];
                                        if (this.transform3DSupport) {
                                            helpers.accelerate(layer);
                                        }
                                        layer.style.position = index
                                            ? "absolute"
                                            : "relative";
                                        layer.style.display = "block";
                                        layer.style.left = 0;
                                        layer.style.top = 0;
                                        var depth =
                                            helpers.data(layer, "depth") || 0;
                                        this.depthsX.push(
                                            helpers.data(layer, "depth-x") ||
                                                depth
                                        );
                                        this.depthsY.push(
                                            helpers.data(layer, "depth-y") ||
                                                depth
                                        );
                                    }
                                },
                            },
                            {
                                key: "updateDimensions",
                                value: function updateDimensions() {
                                    this.windowWidth = window.innerWidth;
                                    this.windowHeight = window.innerHeight;
                                    this.windowCenterX =
                                        this.windowWidth * this.originX;
                                    this.windowCenterY =
                                        this.windowHeight * this.originY;
                                    this.windowRadiusX = Math.max(
                                        this.windowCenterX,
                                        this.windowWidth - this.windowCenterX
                                    );
                                    this.windowRadiusY = Math.max(
                                        this.windowCenterY,
                                        this.windowHeight - this.windowCenterY
                                    );
                                },
                            },
                            {
                                key: "updateBounds",
                                value: function updateBounds() {
                                    this.bounds =
                                        this.element.getBoundingClientRect();
                                    this.elementPositionX = this.bounds.left;
                                    this.elementPositionY = this.bounds.top;
                                    this.elementWidth = this.bounds.width;
                                    this.elementHeight = this.bounds.height;
                                    this.elementCenterX =
                                        this.elementWidth * this.originX;
                                    this.elementCenterY =
                                        this.elementHeight * this.originY;
                                    this.elementRangeX = Math.max(
                                        this.elementCenterX,
                                        this.elementWidth - this.elementCenterX
                                    );
                                    this.elementRangeY = Math.max(
                                        this.elementCenterY,
                                        this.elementHeight - this.elementCenterY
                                    );
                                },
                            },
                            {
                                key: "queueCalibration",
                                value: function queueCalibration(delay) {
                                    clearTimeout(this.calibrationTimer);
                                    this.calibrationTimer = setTimeout(
                                        this.onCalibrationTimer,
                                        delay
                                    );
                                },
                            },
                            {
                                key: "enable",
                                value: function enable() {
                                    if (this.enabled) {
                                        return;
                                    }
                                    this.enabled = !0;
                                    if (this.orientationSupport) {
                                        this.portrait = null;
                                        window.addEventListener(
                                            "deviceorientation",
                                            this.onDeviceOrientation
                                        );
                                        setTimeout(
                                            this.onOrientationTimer,
                                            this.supportDelay
                                        );
                                    } else if (this.motionSupport) {
                                        this.portrait = null;
                                        window.addEventListener(
                                            "devicemotion",
                                            this.onDeviceMotion
                                        );
                                        setTimeout(
                                            this.onMotionTimer,
                                            this.supportDelay
                                        );
                                    } else {
                                        this.calibrationX = 0;
                                        this.calibrationY = 0;
                                        this.portrait = !1;
                                        window.addEventListener(
                                            "mousemove",
                                            this.onMouseMove
                                        );
                                    }
                                    window.addEventListener(
                                        "resize",
                                        this.onWindowResize
                                    );
                                    this.raf = (0, _raf2.default)(
                                        this.onAnimationFrame
                                    );
                                },
                            },
                            {
                                key: "disable",
                                value: function disable() {
                                    if (!this.enabled) {
                                        return;
                                    }
                                    this.enabled = !1;
                                    if (this.orientationSupport) {
                                        window.removeEventListener(
                                            "deviceorientation",
                                            this.onDeviceOrientation
                                        );
                                    } else if (this.motionSupport) {
                                        window.removeEventListener(
                                            "devicemotion",
                                            this.onDeviceMotion
                                        );
                                    } else {
                                        window.removeEventListener(
                                            "mousemove",
                                            this.onMouseMove
                                        );
                                    }
                                    window.removeEventListener(
                                        "resize",
                                        this.onWindowResize
                                    );
                                    _raf2.default.cancel(this.raf);
                                },
                            },
                            {
                                key: "calibrate",
                                value: function calibrate(x, y) {
                                    this.calibrateX =
                                        x === undefined ? this.calibrateX : x;
                                    this.calibrateY =
                                        y === undefined ? this.calibrateY : y;
                                },
                            },
                            {
                                key: "invert",
                                value: function invert(x, y) {
                                    this.invertX =
                                        x === undefined ? this.invertX : x;
                                    this.invertY =
                                        y === undefined ? this.invertY : y;
                                },
                            },
                            {
                                key: "friction",
                                value: function friction(x, y) {
                                    this.frictionX =
                                        x === undefined ? this.frictionX : x;
                                    this.frictionY =
                                        y === undefined ? this.frictionY : y;
                                },
                            },
                            {
                                key: "scalar",
                                value: function scalar(x, y) {
                                    this.scalarX =
                                        x === undefined ? this.scalarX : x;
                                    this.scalarY =
                                        y === undefined ? this.scalarY : y;
                                },
                            },
                            {
                                key: "limit",
                                value: function limit(x, y) {
                                    this.limitX =
                                        x === undefined ? this.limitX : x;
                                    this.limitY =
                                        y === undefined ? this.limitY : y;
                                },
                            },
                            {
                                key: "origin",
                                value: function origin(x, y) {
                                    this.originX =
                                        x === undefined ? this.originX : x;
                                    this.originY =
                                        y === undefined ? this.originY : y;
                                },
                            },
                            {
                                key: "setPosition",
                                value: function setPosition(element, x, y) {
                                    x = x.toFixed(this.precision) + "px";
                                    y = y.toFixed(this.precision) + "px";
                                    if (this.transform3DSupport) {
                                        helpers.css(
                                            element,
                                            "transform",
                                            "translate3d(" + x + "," + y + ",0)"
                                        );
                                    } else if (this.transform2DSupport) {
                                        helpers.css(
                                            element,
                                            "transform",
                                            "translate(" + x + "," + y + ")"
                                        );
                                    } else {
                                        element.style.left = x;
                                        element.style.top = y;
                                    }
                                },
                            },
                            {
                                key: "onOrientationTimer",
                                value: function onOrientationTimer() {
                                    if (
                                        this.orientationSupport &&
                                        this.orientationStatus === 0
                                    ) {
                                        this.disable();
                                        this.orientationSupport = !1;
                                        this.enable();
                                    }
                                },
                            },
                            {
                                key: "onMotionTimer",
                                value: function onMotionTimer() {
                                    if (
                                        this.motionSupport &&
                                        this.motionStatus === 0
                                    ) {
                                        this.disable();
                                        this.motionSupport = !1;
                                        this.enable();
                                    }
                                },
                            },
                            {
                                key: "onCalibrationTimer",
                                value: function onCalibrationTimer() {
                                    this.calibrationFlag = !0;
                                },
                            },
                            {
                                key: "onWindowResize",
                                value: function onWindowResize() {
                                    this.updateDimensions();
                                },
                            },
                            {
                                key: "onAnimationFrame",
                                value: function onAnimationFrame() {
                                    this.updateBounds();
                                    var calibratedInputX =
                                            this.inputX - this.calibrationX,
                                        calibratedInputY =
                                            this.inputY - this.calibrationY;
                                    if (
                                        Math.abs(calibratedInputX) >
                                            this.calibrationThreshold ||
                                        Math.abs(calibratedInputY) >
                                            this.calibrationThreshold
                                    ) {
                                        this.queueCalibration(0);
                                    }
                                    if (this.portrait) {
                                        this.motionX = this.calibrateX
                                            ? calibratedInputY
                                            : this.inputY;
                                        this.motionY = this.calibrateY
                                            ? calibratedInputX
                                            : this.inputX;
                                    } else {
                                        this.motionX = this.calibrateX
                                            ? calibratedInputX
                                            : this.inputX;
                                        this.motionY = this.calibrateY
                                            ? calibratedInputY
                                            : this.inputY;
                                    }
                                    this.motionX *=
                                        this.elementWidth *
                                        (this.scalarX / 100);
                                    this.motionY *=
                                        this.elementHeight *
                                        (this.scalarY / 100);
                                    if (!isNaN(parseFloat(this.limitX))) {
                                        this.motionX = helpers.clamp(
                                            this.motionX,
                                            -this.limitX,
                                            this.limitX
                                        );
                                    }
                                    if (!isNaN(parseFloat(this.limitY))) {
                                        this.motionY = helpers.clamp(
                                            this.motionY,
                                            -this.limitY,
                                            this.limitY
                                        );
                                    }
                                    this.velocityX +=
                                        (this.motionX - this.velocityX) *
                                        this.frictionX;
                                    this.velocityY +=
                                        (this.motionY - this.velocityY) *
                                        this.frictionY;
                                    for (
                                        var index = 0;
                                        index < this.layers.length;
                                        index++
                                    ) {
                                        var layer = this.layers[index],
                                            depthX = this.depthsX[index],
                                            depthY = this.depthsY[index],
                                            xOffset =
                                                this.velocityX *
                                                (depthX *
                                                    (this.invertX ? -1 : 1)),
                                            yOffset =
                                                this.velocityY *
                                                (depthY *
                                                    (this.invertY ? -1 : 1));
                                        this.setPosition(
                                            layer,
                                            xOffset,
                                            yOffset
                                        );
                                    }
                                    this.raf = (0, _raf2.default)(
                                        this.onAnimationFrame
                                    );
                                },
                            },
                            {
                                key: "rotate",
                                value: function rotate(beta, gamma) {
                                    var x =
                                            (beta || event.beta || 0) /
                                            MAGIC_NUMBER,
                                        y =
                                            (gamma || event.gamma || 0) /
                                            MAGIC_NUMBER;
                                    var portrait =
                                        this.windowHeight > this.windowWidth;
                                    if (this.portrait !== portrait) {
                                        this.portrait = portrait;
                                        this.calibrationFlag = !0;
                                    }
                                    if (this.calibrationFlag) {
                                        this.calibrationFlag = !1;
                                        this.calibrationX = x;
                                        this.calibrationY = y;
                                    }
                                    this.inputX = x;
                                    this.inputY = y;
                                },
                            },
                            {
                                key: "onDeviceOrientation",
                                value: function onDeviceOrientation(event) {
                                    var beta = event.beta;
                                    var gamma = event.gamma;
                                    if (
                                        !this.desktop &&
                                        beta !== null &&
                                        gamma !== null
                                    ) {
                                        this.orientationStatus = 1;
                                        this.rotate(beta, gamma);
                                    }
                                },
                            },
                            {
                                key: "onDeviceMotion",
                                value: function onDeviceMotion(event) {
                                    var beta = event.rotationRate.beta;
                                    var gamma = event.rotationRate.gamma;
                                    if (
                                        !this.desktop &&
                                        beta !== null &&
                                        gamma !== null
                                    ) {
                                        this.motionStatus = 1;
                                        this.rotate(beta, gamma);
                                    }
                                },
                            },
                            {
                                key: "onMouseMove",
                                value: function onMouseMove(event) {
                                    var clientX = event.clientX,
                                        clientY = event.clientY;
                                    if (
                                        !this.orientationSupport &&
                                        this.relativeInput
                                    ) {
                                        if (this.clipRelativeInput) {
                                            clientX = Math.max(
                                                clientX,
                                                this.elementPositionX
                                            );
                                            clientX = Math.min(
                                                clientX,
                                                this.elementPositionX +
                                                    this.elementWidth
                                            );
                                            clientY = Math.max(
                                                clientY,
                                                this.elementPositionY
                                            );
                                            clientY = Math.min(
                                                clientY,
                                                this.elementPositionY +
                                                    this.elementHeight
                                            );
                                        }
                                        if (
                                            this.elementRangeX &&
                                            this.elementRangeY
                                        ) {
                                            this.inputX =
                                                (clientX -
                                                    this.elementPositionX -
                                                    this.elementCenterX) /
                                                this.elementRangeX;
                                            this.inputY =
                                                (clientY -
                                                    this.elementPositionY -
                                                    this.elementCenterY) /
                                                this.elementRangeY;
                                        }
                                    } else {
                                        if (
                                            this.windowRadiusX &&
                                            this.windowRadiusY
                                        ) {
                                            this.inputX =
                                                (clientX - this.windowCenterX) /
                                                this.windowRadiusX;
                                            this.inputY =
                                                (clientY - this.windowCenterY) /
                                                this.windowRadiusY;
                                        }
                                    }
                                },
                            },
                        ]);
                        return Parallax;
                    })();
                    module.exports = Parallax;
                },
                { raf: 4 },
            ],
            2: [
                function (require, module, exports) {
                    (function (process) {
                        (function () {
                            var getNanoSeconds,
                                hrtime,
                                loadTime,
                                moduleLoadTime,
                                nodeLoadTime,
                                upTime;
                            if (
                                typeof performance !== "undefined" &&
                                performance !== null &&
                                performance.now
                            ) {
                                module.exports = function () {
                                    return performance.now();
                                };
                            } else if (
                                typeof process !== "undefined" &&
                                process !== null &&
                                process.hrtime
                            ) {
                                module.exports = function () {
                                    return (
                                        (getNanoSeconds() - nodeLoadTime) / 1e6
                                    );
                                };
                                hrtime = process.hrtime;
                                getNanoSeconds = function () {
                                    var hr;
                                    hr = hrtime();
                                    return hr[0] * 1e9 + hr[1];
                                };
                                moduleLoadTime = getNanoSeconds();
                                upTime = process.uptime() * 1e9;
                                nodeLoadTime = moduleLoadTime - upTime;
                            } else if (Date.now) {
                                module.exports = function () {
                                    return Date.now() - loadTime;
                                };
                                loadTime = Date.now();
                            } else {
                                module.exports = function () {
                                    return new Date().getTime() - loadTime;
                                };
                                loadTime = new Date().getTime();
                            }
                        }).call(this);
                    }).call(this, require("_process"));
                },
                { _process: 3 },
            ],
            3: [
                function (require, module, exports) {
                    var process = (module.exports = {});
                    var cachedSetTimeout;
                    var cachedClearTimeout;
                    function defaultSetTimout() {
                        throw new Error("setTimeout has not been defined");
                    }
                    function defaultClearTimeout() {
                        throw new Error("clearTimeout has not been defined");
                    }
                    (function () {
                        try {
                            if (typeof setTimeout === "function") {
                                cachedSetTimeout = setTimeout;
                            } else {
                                cachedSetTimeout = defaultSetTimout;
                            }
                        } catch (e) {
                            cachedSetTimeout = defaultSetTimout;
                        }
                        try {
                            if (typeof clearTimeout === "function") {
                                cachedClearTimeout = clearTimeout;
                            } else {
                                cachedClearTimeout = defaultClearTimeout;
                            }
                        } catch (e) {
                            cachedClearTimeout = defaultClearTimeout;
                        }
                    })();
                    function runTimeout(fun) {
                        if (cachedSetTimeout === setTimeout) {
                            return setTimeout(fun, 0);
                        }
                        if (
                            (cachedSetTimeout === defaultSetTimout ||
                                !cachedSetTimeout) &&
                            setTimeout
                        ) {
                            cachedSetTimeout = setTimeout;
                            return setTimeout(fun, 0);
                        }
                        try {
                            return cachedSetTimeout(fun, 0);
                        } catch (e) {
                            try {
                                return cachedSetTimeout.call(null, fun, 0);
                            } catch (e) {
                                return cachedSetTimeout.call(this, fun, 0);
                            }
                        }
                    }
                    function runClearTimeout(marker) {
                        if (cachedClearTimeout === clearTimeout) {
                            return clearTimeout(marker);
                        }
                        if (
                            (cachedClearTimeout === defaultClearTimeout ||
                                !cachedClearTimeout) &&
                            clearTimeout
                        ) {
                            cachedClearTimeout = clearTimeout;
                            return clearTimeout(marker);
                        }
                        try {
                            return cachedClearTimeout(marker);
                        } catch (e) {
                            try {
                                return cachedClearTimeout.call(null, marker);
                            } catch (e) {
                                return cachedClearTimeout.call(this, marker);
                            }
                        }
                    }
                    var queue = [];
                    var draining = !1;
                    var currentQueue;
                    var queueIndex = -1;
                    function cleanUpNextTick() {
                        if (!draining || !currentQueue) {
                            return;
                        }
                        draining = !1;
                        if (currentQueue.length) {
                            queue = currentQueue.concat(queue);
                        } else {
                            queueIndex = -1;
                        }
                        if (queue.length) {
                            drainQueue();
                        }
                    }
                    function drainQueue() {
                        if (draining) {
                            return;
                        }
                        var timeout = runTimeout(cleanUpNextTick);
                        draining = !0;
                        var len = queue.length;
                        while (len) {
                            currentQueue = queue;
                            queue = [];
                            while (++queueIndex < len) {
                                if (currentQueue) {
                                    currentQueue[queueIndex].run();
                                }
                            }
                            queueIndex = -1;
                            len = queue.length;
                        }
                        currentQueue = null;
                        draining = !1;
                        runClearTimeout(timeout);
                    }
                    process.nextTick = function (fun) {
                        var args = new Array(arguments.length - 1);
                        if (arguments.length > 1) {
                            for (var i = 1; i < arguments.length; i++) {
                                args[i - 1] = arguments[i];
                            }
                        }
                        queue.push(new Item(fun, args));
                        if (queue.length === 1 && !draining) {
                            runTimeout(drainQueue);
                        }
                    };
                    function Item(fun, array) {
                        this.fun = fun;
                        this.array = array;
                    }
                    Item.prototype.run = function () {
                        this.fun.apply(null, this.array);
                    };
                    process.title = "browser";
                    process.browser = !0;
                    process.env = {};
                    process.argv = [];
                    process.version = "";
                    process.versions = {};
                    function noop() {}
                    process.on = noop;
                    process.addListener = noop;
                    process.once = noop;
                    process.off = noop;
                    process.removeListener = noop;
                    process.removeAllListeners = noop;
                    process.emit = noop;
                    process.prependListener = noop;
                    process.prependOnceListener = noop;
                    process.listeners = function (name) {
                        return [];
                    };
                    process.binding = function (name) {
                        throw new Error("process.binding is not supported");
                    };
                    process.cwd = function () {
                        return "/";
                    };
                    process.chdir = function (dir) {
                        throw new Error("process.chdir is not supported");
                    };
                    process.umask = function () {
                        return 0;
                    };
                },
                {},
            ],
            4: [
                function (require, module, exports) {
                    (function (global) {
                        var now = require("performance-now"),
                            root =
                                typeof window === "undefined" ? global : window,
                            vendors = ["moz", "webkit"],
                            suffix = "AnimationFrame",
                            raf = root["request" + suffix],
                            caf =
                                root["cancel" + suffix] ||
                                root["cancelRequest" + suffix];
                        for (var i = 0; !raf && i < vendors.length; i++) {
                            raf = root[vendors[i] + "Request" + suffix];
                            caf =
                                root[vendors[i] + "Cancel" + suffix] ||
                                root[vendors[i] + "CancelRequest" + suffix];
                        }
                        if (!raf || !caf) {
                            var last = 0,
                                id = 0,
                                queue = [],
                                frameDuration = 1000 / 60;
                            raf = function (callback) {
                                if (queue.length === 0) {
                                    var _now = now(),
                                        next = Math.max(
                                            0,
                                            frameDuration - (_now - last)
                                        );
                                    last = next + _now;
                                    setTimeout(function () {
                                        var cp = queue.slice(0);
                                        queue.length = 0;
                                        for (var i = 0; i < cp.length; i++) {
                                            if (!cp[i].cancelled) {
                                                try {
                                                    cp[i].callback(last);
                                                } catch (e) {
                                                    setTimeout(function () {
                                                        throw e;
                                                    }, 0);
                                                }
                                            }
                                        }
                                    }, Math.round(next));
                                }
                                queue.push({
                                    handle: ++id,
                                    callback: callback,
                                    cancelled: !1,
                                });
                                return id;
                            };
                            caf = function (handle) {
                                for (var i = 0; i < queue.length; i++) {
                                    if (queue[i].handle === handle) {
                                        queue[i].cancelled = !0;
                                    }
                                }
                            };
                        }
                        module.exports = function (fn) {
                            return raf.call(root, fn);
                        };
                        module.exports.cancel = function () {
                            caf.apply(root, arguments);
                        };
                        module.exports.polyfill = function () {
                            root.requestAnimationFrame = raf;
                            root.cancelAnimationFrame = caf;
                        };
                    }).call(
                        this,
                        typeof global !== "undefined"
                            ? global
                            : typeof self !== "undefined"
                            ? self
                            : typeof window !== "undefined"
                            ? window
                            : {}
                    );
                },
                { "performance-now": 2 },
            ],
        },
        {},
        [1]
    )(1);
});

/*!
 Waypoints - 4.0.0
 Copyright © 2011-2015 Caleb Troughton
 Licensed under the MIT license.
 https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
 */
!(function () {
    "use strict";
    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element)
            throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler)
            throw new Error("No handler option passed to Waypoint constructor");
        (this.key = "waypoint-" + e),
            (this.options = t.Adapter.extend({}, t.defaults, o)),
            (this.element = this.options.element),
            (this.adapter = new t.Adapter(this.element)),
            (this.callback = o.handler),
            (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
            (this.enabled = this.options.enabled),
            (this.triggerPoint = null),
            (this.group = t.Group.findOrCreate({
                name: this.options.group,
                axis: this.axis,
            })),
            (this.context = t.Context.findOrCreateByElement(
                this.options.context
            )),
            t.offsetAliases[this.options.offset] &&
                (this.options.offset = t.offsetAliases[this.options.offset]),
            this.group.add(this),
            this.context.add(this),
            (i[this.key] = this),
            (e += 1);
    }
    var e = 0,
        i = {};
    (t.prototype.queueTrigger = function (t) {
        this.group.queueTrigger(this, t);
    }),
        (t.prototype.trigger = function (t) {
            this.enabled && this.callback && this.callback.apply(this, t);
        }),
        (t.prototype.destroy = function () {
            this.context.remove(this),
                this.group.remove(this),
                delete i[this.key];
        }),
        (t.prototype.disable = function () {
            return (this.enabled = !1), this;
        }),
        (t.prototype.enable = function () {
            return this.context.refresh(), (this.enabled = !0), this;
        }),
        (t.prototype.next = function () {
            return this.group.next(this);
        }),
        (t.prototype.previous = function () {
            return this.group.previous(this);
        }),
        (t.invokeAll = function (t) {
            var e = [];
            for (var o in i) e.push(i[o]);
            for (var n = 0, r = e.length; r > n; n++) e[n][t]();
        }),
        (t.destroyAll = function () {
            t.invokeAll("destroy");
        }),
        (t.disableAll = function () {
            t.invokeAll("disable");
        }),
        (t.enableAll = function () {
            t.invokeAll("enable");
        }),
        (t.refreshAll = function () {
            t.Context.refreshAll();
        }),
        (t.viewportHeight = function () {
            return window.innerHeight || document.documentElement.clientHeight;
        }),
        (t.viewportWidth = function () {
            return document.documentElement.clientWidth;
        }),
        (t.adapters = []),
        (t.defaults = {
            context: window,
            continuous: !0,
            enabled: !0,
            group: "default",
            horizontal: !1,
            offset: 0,
        }),
        (t.offsetAliases = {
            "bottom-in-view": function () {
                return this.context.innerHeight() - this.adapter.outerHeight();
            },
            "right-in-view": function () {
                return this.context.innerWidth() - this.adapter.outerWidth();
            },
        }),
        (window.Waypoint = t);
})(),
    (function () {
        "use strict";
        function t(t) {
            window.setTimeout(t, 1e3 / 60);
        }
        function e(t) {
            (this.element = t),
                (this.Adapter = n.Adapter),
                (this.adapter = new this.Adapter(t)),
                (this.key = "waypoint-context-" + i),
                (this.didScroll = !1),
                (this.didResize = !1),
                (this.oldScroll = {
                    x: this.adapter.scrollLeft(),
                    y: this.adapter.scrollTop(),
                }),
                (this.waypoints = { vertical: {}, horizontal: {} }),
                (t.waypointContextKey = this.key),
                (o[t.waypointContextKey] = this),
                (i += 1),
                this.createThrottledScrollHandler(),
                this.createThrottledResizeHandler();
        }
        var i = 0,
            o = {},
            n = window.Waypoint,
            r = window.onload;
        (e.prototype.add = function (t) {
            var e = t.options.horizontal ? "horizontal" : "vertical";
            (this.waypoints[e][t.key] = t), this.refresh();
        }),
            (e.prototype.checkEmpty = function () {
                var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                    e = this.Adapter.isEmptyObject(this.waypoints.vertical);
                t && e && (this.adapter.off(".waypoints"), delete o[this.key]);
            }),
            (e.prototype.createThrottledResizeHandler = function () {
                function t() {
                    e.handleResize(), (e.didResize = !1);
                }
                var e = this;
                this.adapter.on("resize.waypoints", function () {
                    e.didResize ||
                        ((e.didResize = !0), n.requestAnimationFrame(t));
                });
            }),
            (e.prototype.createThrottledScrollHandler = function () {
                function t() {
                    e.handleScroll(), (e.didScroll = !1);
                }
                var e = this;
                this.adapter.on("scroll.waypoints", function () {
                    (!e.didScroll || n.isTouch) &&
                        ((e.didScroll = !0), n.requestAnimationFrame(t));
                });
            }),
            (e.prototype.handleResize = function () {
                n.Context.refreshAll();
            }),
            (e.prototype.handleScroll = function () {
                var t = {},
                    e = {
                        horizontal: {
                            newScroll: this.adapter.scrollLeft(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left",
                        },
                        vertical: {
                            newScroll: this.adapter.scrollTop(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up",
                        },
                    };
                for (var i in e) {
                    var o = e[i],
                        n = o.newScroll > o.oldScroll,
                        r = n ? o.forward : o.backward;
                    for (var s in this.waypoints[i]) {
                        var a = this.waypoints[i][s],
                            l = o.oldScroll < a.triggerPoint,
                            h = o.newScroll >= a.triggerPoint,
                            p = l && h,
                            u = !l && !h;
                        (p || u) &&
                            (a.queueTrigger(r), (t[a.group.id] = a.group));
                    }
                }
                for (var c in t) t[c].flushTriggers();
                this.oldScroll = {
                    x: e.horizontal.newScroll,
                    y: e.vertical.newScroll,
                };
            }),
            (e.prototype.innerHeight = function () {
                return this.element == this.element.window
                    ? n.viewportHeight()
                    : this.adapter.innerHeight();
            }),
            (e.prototype.remove = function (t) {
                delete this.waypoints[t.axis][t.key], this.checkEmpty();
            }),
            (e.prototype.innerWidth = function () {
                return this.element == this.element.window
                    ? n.viewportWidth()
                    : this.adapter.innerWidth();
            }),
            (e.prototype.destroy = function () {
                var t = [];
                for (var e in this.waypoints)
                    for (var i in this.waypoints[e])
                        t.push(this.waypoints[e][i]);
                for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
            }),
            (e.prototype.refresh = function () {
                var t,
                    e = this.element == this.element.window,
                    i = e ? void 0 : this.adapter.offset(),
                    o = {};
                this.handleScroll(),
                    (t = {
                        horizontal: {
                            contextOffset: e ? 0 : i.left,
                            contextScroll: e ? 0 : this.oldScroll.x,
                            contextDimension: this.innerWidth(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left",
                            offsetProp: "left",
                        },
                        vertical: {
                            contextOffset: e ? 0 : i.top,
                            contextScroll: e ? 0 : this.oldScroll.y,
                            contextDimension: this.innerHeight(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up",
                            offsetProp: "top",
                        },
                    });
                for (var r in t) {
                    var s = t[r];
                    for (var a in this.waypoints[r]) {
                        var l,
                            h,
                            p,
                            u,
                            c,
                            d = this.waypoints[r][a],
                            f = d.options.offset,
                            w = d.triggerPoint,
                            y = 0,
                            g = null == w;
                        d.element !== d.element.window &&
                            (y = d.adapter.offset()[s.offsetProp]),
                            "function" == typeof f
                                ? (f = f.apply(d))
                                : "string" == typeof f &&
                                  ((f = parseFloat(f)),
                                  d.options.offset.indexOf("%") > -1 &&
                                      (f = Math.ceil(
                                          (s.contextDimension * f) / 100
                                      ))),
                            (l = s.contextScroll - s.contextOffset),
                            (d.triggerPoint = y + l - f),
                            (h = w < s.oldScroll),
                            (p = d.triggerPoint >= s.oldScroll),
                            (u = h && p),
                            (c = !h && !p),
                            !g && u
                                ? (d.queueTrigger(s.backward),
                                  (o[d.group.id] = d.group))
                                : !g && c
                                ? (d.queueTrigger(s.forward),
                                  (o[d.group.id] = d.group))
                                : g &&
                                  s.oldScroll >= d.triggerPoint &&
                                  (d.queueTrigger(s.forward),
                                  (o[d.group.id] = d.group));
                    }
                }
                return (
                    n.requestAnimationFrame(function () {
                        for (var t in o) o[t].flushTriggers();
                    }),
                    this
                );
            }),
            (e.findOrCreateByElement = function (t) {
                return e.findByElement(t) || new e(t);
            }),
            (e.refreshAll = function () {
                for (var t in o) o[t].refresh();
            }),
            (e.findByElement = function (t) {
                return o[t.waypointContextKey];
            }),
            (window.onload = function () {
                r && r(), e.refreshAll();
            }),
            (n.requestAnimationFrame = function (e) {
                var i =
                    window.requestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    t;
                i.call(window, e);
            }),
            (n.Context = e);
    })(),
    (function () {
        "use strict";
        function t(t, e) {
            return t.triggerPoint - e.triggerPoint;
        }
        function e(t, e) {
            return e.triggerPoint - t.triggerPoint;
        }
        function i(t) {
            (this.name = t.name),
                (this.axis = t.axis),
                (this.id = this.name + "-" + this.axis),
                (this.waypoints = []),
                this.clearTriggerQueues(),
                (o[this.axis][this.name] = this);
        }
        var o = { vertical: {}, horizontal: {} },
            n = window.Waypoint;
        (i.prototype.add = function (t) {
            this.waypoints.push(t);
        }),
            (i.prototype.clearTriggerQueues = function () {
                this.triggerQueues = { up: [], down: [], left: [], right: [] };
            }),
            (i.prototype.flushTriggers = function () {
                for (var i in this.triggerQueues) {
                    var o = this.triggerQueues[i],
                        n = "up" === i || "left" === i;
                    o.sort(n ? e : t);
                    for (var r = 0, s = o.length; s > r; r += 1) {
                        var a = o[r];
                        (a.options.continuous || r === o.length - 1) &&
                            a.trigger([i]);
                    }
                }
                this.clearTriggerQueues();
            }),
            (i.prototype.next = function (e) {
                this.waypoints.sort(t);
                var i = n.Adapter.inArray(e, this.waypoints),
                    o = i === this.waypoints.length - 1;
                return o ? null : this.waypoints[i + 1];
            }),
            (i.prototype.previous = function (e) {
                this.waypoints.sort(t);
                var i = n.Adapter.inArray(e, this.waypoints);
                return i ? this.waypoints[i - 1] : null;
            }),
            (i.prototype.queueTrigger = function (t, e) {
                this.triggerQueues[e].push(t);
            }),
            (i.prototype.remove = function (t) {
                var e = n.Adapter.inArray(t, this.waypoints);
                e > -1 && this.waypoints.splice(e, 1);
            }),
            (i.prototype.first = function () {
                return this.waypoints[0];
            }),
            (i.prototype.last = function () {
                return this.waypoints[this.waypoints.length - 1];
            }),
            (i.findOrCreate = function (t) {
                return o[t.axis][t.name] || new i(t);
            }),
            (n.Group = i);
    })(),
    (function () {
        "use strict";
        function t(t) {
            this.$element = e(t);
        }
        var e = window.jQuery,
            i = window.Waypoint;
        e.each(
            [
                "innerHeight",
                "innerWidth",
                "off",
                "offset",
                "on",
                "outerHeight",
                "outerWidth",
                "scrollLeft",
                "scrollTop",
            ],
            function (e, i) {
                t.prototype[i] = function () {
                    var t = Array.prototype.slice.call(arguments);
                    return this.$element[i].apply(this.$element, t);
                };
            }
        ),
            e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
                t[o] = e[o];
            }),
            i.adapters.push({ name: "jquery", Adapter: t }),
            (i.Adapter = t);
    })(),
    (function () {
        "use strict";
        function t(t) {
            return function () {
                var i = [],
                    o = arguments[0];
                return (
                    t.isFunction(arguments[0]) &&
                        ((o = t.extend({}, arguments[1])),
                        (o.handler = arguments[0])),
                    this.each(function () {
                        var n = t.extend({}, o, { element: this });
                        "string" == typeof n.context &&
                            (n.context = t(this).closest(n.context)[0]),
                            i.push(new e(n));
                    }),
                    i
                );
            };
        }
        var e = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
            window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
    })();

/*
*  jquery-circle-progress - jQuery Plugin to draw animated circular progress bars

 URL: http://kottenator.github.io/jquery-circle-progress/
 Author: Rostyslav Bryzgunov <kottenator@gmail.com>
 Version: 1.1.3
 License: MIT

 */
!(function (i) {
    function t(i) {
        this.init(i);
    }
    (t.prototype = {
        value: 0,
        size: 100,
        startAngle: -Math.PI,
        thickness: "auto",
        fill: { gradient: ["#3aeabb", "#fdd250"] },
        emptyFill: "rgba(0, 0, 0, .1)",
        animation: { duration: 1200, easing: "circleProgressEasing" },
        animationStartValue: 0,
        reverse: !1,
        lineCap: "butt",
        constructor: t,
        el: null,
        canvas: null,
        ctx: null,
        radius: 0,
        arcFill: null,
        lastFrameValue: 0,
        init: function (t) {
            i.extend(this, t),
                (this.radius = this.size / 2),
                this.initWidget(),
                this.initFill(),
                this.draw();
        },
        initWidget: function () {
            var t = (this.canvas =
                this.canvas || i("<canvas>").prependTo(this.el)[0]);
            (t.width = this.size),
                (t.height = this.size),
                (this.ctx = t.getContext("2d"));
        },
        initFill: function () {
            function t() {
                var t = i("<canvas>")[0];
                (t.width = e.size),
                    (t.height = e.size),
                    t.getContext("2d").drawImage(g, 0, 0, r, r),
                    (e.arcFill = e.ctx.createPattern(t, "no-repeat")),
                    e.drawFrame(e.lastFrameValue);
            }
            var e = this,
                a = this.fill,
                n = this.ctx,
                r = this.size;
            if (!a) throw Error("The fill is not specified!");
            if ((a.color && (this.arcFill = a.color), a.gradient)) {
                var s = a.gradient;
                if (1 == s.length) this.arcFill = s[0];
                else if (s.length > 1) {
                    for (
                        var l = a.gradientAngle || 0,
                            h = a.gradientDirection || [
                                (r / 2) * (1 - Math.cos(l)),
                                (r / 2) * (1 + Math.sin(l)),
                                (r / 2) * (1 + Math.cos(l)),
                                (r / 2) * (1 - Math.sin(l)),
                            ],
                            o = n.createLinearGradient.apply(n, h),
                            c = 0;
                        c < s.length;
                        c++
                    ) {
                        var d = s[c],
                            u = c / (s.length - 1);
                        i.isArray(d) && ((u = d[1]), (d = d[0])),
                            o.addColorStop(u, d);
                    }
                    this.arcFill = o;
                }
            }
            if (a.image) {
                var g;
                a.image instanceof Image
                    ? (g = a.image)
                    : ((g = new Image()), (g.src = a.image)),
                    g.complete ? t() : (g.onload = t);
            }
        },
        draw: function () {
            this.animation
                ? this.drawAnimated(this.value)
                : this.drawFrame(this.value);
        },
        drawFrame: function (i) {
            (this.lastFrameValue = i),
                this.ctx.clearRect(0, 0, this.size, this.size),
                this.drawEmptyArc(i),
                this.drawArc(i);
        },
        drawArc: function (i) {
            var t = this.ctx,
                e = this.radius,
                a = this.getThickness(),
                n = this.startAngle;
            t.save(),
                t.beginPath(),
                this.reverse
                    ? t.arc(e, e, e - a / 2, n - 2 * Math.PI * i, n)
                    : t.arc(e, e, e - a / 2, n, n + 2 * Math.PI * i),
                (t.lineWidth = a),
                (t.lineCap = this.lineCap),
                (t.strokeStyle = this.arcFill),
                t.stroke(),
                t.restore();
        },
        drawEmptyArc: function (i) {
            var t = this.ctx,
                e = this.radius,
                a = this.getThickness(),
                n = this.startAngle;
            1 > i &&
                (t.save(),
                t.beginPath(),
                0 >= i
                    ? t.arc(e, e, e - a / 2, 0, 2 * Math.PI)
                    : this.reverse
                    ? t.arc(e, e, e - a / 2, n, n - 2 * Math.PI * i)
                    : t.arc(e, e, e - a / 2, n + 2 * Math.PI * i, n),
                (t.lineWidth = a),
                (t.strokeStyle = this.emptyFill),
                t.stroke(),
                t.restore());
        },
        drawAnimated: function (t) {
            var e = this,
                a = this.el,
                n = i(this.canvas);
            n.stop(!0, !1),
                a.trigger("circle-animation-start"),
                n
                    .css({ animationProgress: 0 })
                    .animate(
                        { animationProgress: 1 },
                        i.extend({}, this.animation, {
                            step: function (i) {
                                var n = e.animationStartValue * (1 - i) + t * i;
                                e.drawFrame(n),
                                    a.trigger("circle-animation-progress", [
                                        i,
                                        n,
                                    ]);
                            },
                        })
                    )
                    .promise()
                    .always(function () {
                        a.trigger("circle-animation-end");
                    });
        },
        getThickness: function () {
            return i.isNumeric(this.thickness)
                ? this.thickness
                : this.size / 14;
        },
        getValue: function () {
            return this.value;
        },
        setValue: function (i) {
            this.animation && (this.animationStartValue = this.lastFrameValue),
                (this.value = i),
                this.draw();
        },
    }),
        (i.circleProgress = { defaults: t.prototype }),
        (i.easing.circleProgressEasing = function (i, t, e, a, n) {
            return (t /= n / 2) < 1
                ? (a / 2) * t * t * t + e
                : (a / 2) * ((t -= 2) * t * t + 2) + e;
        }),
        (i.fn.circleProgress = function (e, a) {
            var n = "circle-progress",
                r = this.data(n);
            if ("widget" == e) {
                if (!r)
                    throw Error(
                        'Calling "widget" method on not initialized instance is forbidden'
                    );
                return r.canvas;
            }
            if ("value" == e) {
                if (!r)
                    throw Error(
                        'Calling "value" method on not initialized instance is forbidden'
                    );
                if ("undefined" == typeof a) return r.getValue();
                var s = arguments[1];
                return this.each(function () {
                    i(this).data(n).setValue(s);
                });
            }
            return this.each(function () {
                var a = i(this),
                    r = a.data(n),
                    s = i.isPlainObject(e) ? e : {};
                if (r) r.init(s);
                else {
                    var l = i.extend({}, a.data());
                    "string" == typeof l.fill && (l.fill = JSON.parse(l.fill)),
                        "string" == typeof l.animation &&
                            (l.animation = JSON.parse(l.animation)),
                        (s = i.extend(l, s)),
                        (s.el = a),
                        (r = new t(s)),
                        a.data(n, r);
                }
            });
        });
})(jQuery);

/**
 * segment - A little JavaScript class (without dependencies) to draw and animate SVG path strokes
 * @version v0.0.2
 * @link https://github.com/lmgonzalves/segment
 * @license MIT
 */
function Segment(t, e, n) {
    (this.path = t),
        (this.length = t.getTotalLength()),
        (this.path.style.strokeDashoffset = 2 * this.length),
        (this.begin = e ? this.valueOf(e) : 0),
        (this.end = n ? this.valueOf(n) : this.length),
        (this.timer = null),
        this.draw(this.begin, this.end);
}
Segment.prototype = {
    draw: function (t, e, n, i) {
        if (n) {
            var s = i.hasOwnProperty("delay") ? 1e3 * parseFloat(i.delay) : 0,
                a = i.hasOwnProperty("easing") ? i.easing : null,
                h = i.hasOwnProperty("callback") ? i.callback : null,
                r = this;
            if ((this.stop(), s))
                return (
                    delete i.delay,
                    (this.timer = setTimeout(function () {
                        r.draw(t, e, n, i);
                    }, s)),
                    this.timer
                );
            var l = new Date(),
                o = 1e3 / 60,
                g = this.begin,
                f = this.end,
                u = this.valueOf(t),
                d = this.valueOf(e);
            !(function p() {
                var t = new Date(),
                    e = (t - l) / 1e3,
                    i = e / parseFloat(n),
                    s = i;
                return (
                    "function" == typeof a && (s = a(s)),
                    i > 1 ? (r.stop(), (s = 1)) : (r.timer = setTimeout(p, o)),
                    (r.begin = g + (u - g) * s),
                    (r.end = f + (d - f) * s),
                    r.begin < 0 && (r.begin = 0),
                    r.end > r.length && (r.end = r.length),
                    r.begin < r.end
                        ? r.draw(r.begin, r.end)
                        : r.draw(
                              r.begin + (r.end - r.begin),
                              r.end - (r.end - r.begin)
                          ),
                    i > 1 && "function" == typeof h ? h.call(r.context) : void 0
                );
            })();
        } else this.path.style.strokeDasharray = this.strokeDasharray(t, e);
    },
    strokeDasharray: function (t, e) {
        return (
            (this.begin = this.valueOf(t)),
            (this.end = this.valueOf(e)),
            [this.length, this.length + this.begin, this.end - this.begin].join(
                " "
            )
        );
    },
    valueOf: function (t) {
        var e = parseFloat(t);
        if (("string" == typeof t || t instanceof String) && ~t.indexOf("%")) {
            var n;
            ~t.indexOf("+")
                ? ((n = t.split("+")),
                  (e = this.percent(n[0]) + parseFloat(n[1])))
                : ~t.indexOf("-")
                ? ((n = t.split("-")),
                  (e = this.percent(n[0]) - parseFloat(n[1])))
                : (e = this.percent(t));
        }
        return e;
    },
    stop: function () {
        clearTimeout(this.timer), (this.timer = null);
    },
    percent: function (t) {
        return (parseFloat(t) / 100) * this.length;
    },
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * -------------------------------------------------------------------------*/

if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (
        (e[0] < 2 && e[1] < 9) ||
        (1 == e[0] && 9 == e[1] && e[2] < 1) ||
        e[0] > 3
    )
        throw new Error(
            "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4"
        );
})(jQuery),
    +(function (t) {
        "use strict";
        function e(e) {
            var a,
                s =
                    e.attr("data-target") ||
                    ((a = e.attr("href")) && a.replace(/.*(?=#[^\s]+$)/, ""));
            return t(s);
        }
        function a(e) {
            return this.each(function () {
                var a = t(this),
                    i = a.data("bs.collapse"),
                    n = t.extend(
                        {},
                        s.DEFAULTS,
                        a.data(),
                        "object" == typeof e && e
                    );
                !i && n.toggle && /show|hide/.test(e) && (n.toggle = !1),
                    i || a.data("bs.collapse", (i = new s(this, n))),
                    "string" == typeof e && i[e]();
            });
        }
        var s = function (e, a) {
            (this.$element = t(e)),
                (this.options = t.extend({}, s.DEFAULTS, a)),
                (this.$trigger = t(
                    '[data-toggle="collapse"][href="#' +
                        e.id +
                        '"],[data-toggle="collapse"][data-target="#' +
                        e.id +
                        '"]'
                )),
                (this.transitioning = null),
                this.options.parent
                    ? (this.$parent = this.getParent())
                    : this.addAriaAndCollapsedClass(
                          this.$element,
                          this.$trigger
                      ),
                this.options.toggle && this.toggle();
        };
        (s.VERSION = "3.3.7"),
            (s.TRANSITION_DURATION = 350),
            (s.DEFAULTS = { toggle: !0 }),
            (s.prototype.dimension = function () {
                var t = this.$element.hasClass("width");
                return t ? "width" : "height";
            }),
            (s.prototype.show = function () {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var e,
                        i =
                            this.$parent &&
                            this.$parent
                                .children(".panel")
                                .children(".in, .collapsing");
                    if (
                        !(
                            i &&
                            i.length &&
                            ((e = i.data("bs.collapse")), e && e.transitioning)
                        )
                    ) {
                        var n = t.Event("show.bs.collapse");
                        if (
                            (this.$element.trigger(n), !n.isDefaultPrevented())
                        ) {
                            i &&
                                i.length &&
                                (a.call(i, "hide"),
                                e || i.data("bs.collapse", null));
                            var r = this.dimension();
                            this.$element
                                .removeClass("collapse")
                                .addClass("collapsing")
                                [r](0)
                                .attr("aria-expanded", !0),
                                this.$trigger
                                    .removeClass("collapsed")
                                    .attr("aria-expanded", !0),
                                (this.transitioning = 1);
                            var l = function () {
                                this.$element
                                    .removeClass("collapsing")
                                    .addClass("collapse in")
                                    [r](""),
                                    (this.transitioning = 0),
                                    this.$element.trigger("shown.bs.collapse");
                            };
                            if (!t.support.transition) return l.call(this);
                            var o = t.camelCase(["scroll", r].join("-"));
                            this.$element
                                .one("bsTransitionEnd", t.proxy(l, this))
                                .emulateTransitionEnd(s.TRANSITION_DURATION)
                                [r](this.$element[0][o]);
                        }
                    }
                }
            }),
            (s.prototype.hide = function () {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var e = t.Event("hide.bs.collapse");
                    if ((this.$element.trigger(e), !e.isDefaultPrevented())) {
                        var a = this.dimension();
                        this.$element[a](this.$element[a]())[0].offsetHeight,
                            this.$element
                                .addClass("collapsing")
                                .removeClass("collapse in")
                                .attr("aria-expanded", !1),
                            this.$trigger
                                .addClass("collapsed")
                                .attr("aria-expanded", !1),
                            (this.transitioning = 1);
                        var i = function () {
                            (this.transitioning = 0),
                                this.$element
                                    .removeClass("collapsing")
                                    .addClass("collapse")
                                    .trigger("hidden.bs.collapse");
                        };
                        return t.support.transition
                            ? void this.$element[a](0)
                                  .one("bsTransitionEnd", t.proxy(i, this))
                                  .emulateTransitionEnd(s.TRANSITION_DURATION)
                            : i.call(this);
                    }
                }
            }),
            (s.prototype.toggle = function () {
                this[this.$element.hasClass("in") ? "hide" : "show"]();
            }),
            (s.prototype.getParent = function () {
                return t(this.options.parent)
                    .find(
                        '[data-toggle="collapse"][data-parent="' +
                            this.options.parent +
                            '"]'
                    )
                    .each(
                        t.proxy(function (a, s) {
                            var i = t(s);
                            this.addAriaAndCollapsedClass(e(i), i);
                        }, this)
                    )
                    .end();
            }),
            (s.prototype.addAriaAndCollapsedClass = function (t, e) {
                var a = t.hasClass("in");
                t.attr("aria-expanded", a),
                    e.toggleClass("collapsed", !a).attr("aria-expanded", a);
            });
        var i = t.fn.collapse;
        (t.fn.collapse = a),
            (t.fn.collapse.Constructor = s),
            (t.fn.collapse.noConflict = function () {
                return (t.fn.collapse = i), this;
            }),
            t(document).on(
                "click.bs.collapse.data-api",
                '[data-toggle="collapse"]',
                function (s) {
                    var i = t(this);
                    i.attr("data-target") || s.preventDefault();
                    var n = e(i),
                        r = n.data("bs.collapse"),
                        l = r ? "toggle" : i.data();
                    a.call(n, l);
                }
            );
    })(jQuery);

if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (n) {
    "use strict";
    var t = n.fn.jquery.split(" ")[0].split(".");
    if (
        (t[0] < 2 && t[1] < 9) ||
        (1 == t[0] && 9 == t[1] && t[2] < 1) ||
        t[0] > 3
    )
        throw new Error(
            "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4"
        );
})(jQuery),
    +(function (n) {
        "use strict";
        function t() {
            var n = document.createElement("bootstrap"),
                t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend",
                };
            for (var i in t) if (void 0 !== n.style[i]) return { end: t[i] };
            return !1;
        }
        (n.fn.emulateTransitionEnd = function (t) {
            var i = !1,
                r = this;
            n(this).one("bsTransitionEnd", function () {
                i = !0;
            });
            var e = function () {
                i || n(r).trigger(n.support.transition.end);
            };
            return setTimeout(e, t), this;
        }),
            n(function () {
                (n.support.transition = t()),
                    n.support.transition &&
                        (n.event.special.bsTransitionEnd = {
                            bindType: n.support.transition.end,
                            delegateType: n.support.transition.end,
                            handle: function (t) {
                                return n(t.target).is(this)
                                    ? t.handleObj.handler.apply(this, arguments)
                                    : void 0;
                            },
                        });
            });
    })(jQuery);

if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (
        (e[0] < 2 && e[1] < 9) ||
        (1 == e[0] && 9 == e[1] && e[2] < 1) ||
        e[0] > 3
    )
        throw new Error(
            "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4"
        );
})(jQuery),
    +(function (t) {
        "use strict";
        function e(e) {
            return this.each(function () {
                var n = t(this),
                    r = n.data("bs.tab");
                r || n.data("bs.tab", (r = new a(this))),
                    "string" == typeof e && r[e]();
            });
        }
        var a = function (e) {
            this.element = t(e);
        };
        (a.VERSION = "3.3.7"),
            (a.TRANSITION_DURATION = 150),
            (a.prototype.show = function () {
                var e = this.element,
                    a = e.closest("ul:not(.dropdown-menu)"),
                    n = e.data("target");
                if (
                    (n ||
                        ((n = e.attr("href")),
                        (n = n && n.replace(/.*(?=#[^\s]*$)/, ""))),
                    !e.parent("li").hasClass("active"))
                ) {
                    var r = a.find(".active:last a"),
                        i = t.Event("hide.bs.tab", { relatedTarget: e[0] }),
                        s = t.Event("show.bs.tab", { relatedTarget: r[0] });
                    if (
                        (r.trigger(i),
                        e.trigger(s),
                        !s.isDefaultPrevented() && !i.isDefaultPrevented())
                    ) {
                        var o = t(n);
                        this.activate(e.closest("li"), a),
                            this.activate(o, o.parent(), function () {
                                r.trigger({
                                    type: "hidden.bs.tab",
                                    relatedTarget: e[0],
                                }),
                                    e.trigger({
                                        type: "shown.bs.tab",
                                        relatedTarget: r[0],
                                    });
                            });
                    }
                }
            }),
            (a.prototype.activate = function (e, n, r) {
                function i() {
                    s
                        .removeClass("active")
                        .find("> .dropdown-menu > .active")
                        .removeClass("active")
                        .end()
                        .find('[data-toggle="tab"]')
                        .attr("aria-expanded", !1),
                        e
                            .addClass("active")
                            .find('[data-toggle="tab"]')
                            .attr("aria-expanded", !0),
                        o
                            ? (e[0].offsetWidth, e.addClass("in"))
                            : e.removeClass("fade"),
                        e.parent(".dropdown-menu").length &&
                            e
                                .closest("li.dropdown")
                                .addClass("active")
                                .end()
                                .find('[data-toggle="tab"]')
                                .attr("aria-expanded", !0),
                        r && r();
                }
                var s = n.find("> .active"),
                    o =
                        r &&
                        t.support.transition &&
                        ((s.length && s.hasClass("fade")) ||
                            !!n.find("> .fade").length);
                s.length && o
                    ? s
                          .one("bsTransitionEnd", i)
                          .emulateTransitionEnd(a.TRANSITION_DURATION)
                    : i(),
                    s.removeClass("in");
            });
        var n = t.fn.tab;
        (t.fn.tab = e),
            (t.fn.tab.Constructor = a),
            (t.fn.tab.noConflict = function () {
                return (t.fn.tab = n), this;
            });
        var r = function (a) {
            a.preventDefault(), e.call(t(this), "show");
        };
        t(document)
            .on("click.bs.tab.data-api", '[data-toggle="tab"]', r)
            .on("click.bs.tab.data-api", '[data-toggle="pill"]', r);
    })(jQuery);

/*!
 * imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!(function (t, e) {
    "function" == typeof define && define.amd
        ? define("ev-emitter/ev-emitter", e)
        : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.EvEmitter = e());
})(this, function () {
    function t() {}
    var e = t.prototype;
    return (
        (e.on = function (t, e) {
            if (t && e) {
                var i = (this._events = this._events || {}),
                    n = (i[t] = i[t] || []);
                return -1 == n.indexOf(e) && n.push(e), this;
            }
        }),
        (e.once = function (t, e) {
            if (t && e) {
                this.on(t, e);
                var i = (this._onceEvents = this._onceEvents || {}),
                    n = (i[t] = i[t] || []);
                return (n[e] = !0), this;
            }
        }),
        (e.off = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1), this;
            }
        }),
        (e.emitEvent = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = 0,
                    o = i[n];
                e = e || [];
                for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
                    var s = r && r[o];
                    s && (this.off(t, o), delete r[o]),
                        o.apply(this, e),
                        (n += s ? 0 : 1),
                        (o = i[n]);
                }
                return this;
            }
        }),
        t
    );
}),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define(["ev-emitter/ev-emitter"], function (i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("ev-emitter")))
            : (t.imagesLoaded = e(t, t.EvEmitter));
    })(window, function (t, e) {
        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }
        function n(t) {
            var e = [];
            if (Array.isArray(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0; i < t.length; i++) e.push(t[i]);
            else e.push(t);
            return e;
        }
        function o(t, e, r) {
            return this instanceof o
                ? ("string" == typeof t && (t = document.querySelectorAll(t)),
                  (this.elements = n(t)),
                  (this.options = i({}, this.options)),
                  "function" == typeof e ? (r = e) : i(this.options, e),
                  r && this.on("always", r),
                  this.getImages(),
                  h && (this.jqDeferred = new h.Deferred()),
                  void setTimeout(
                      function () {
                          this.check();
                      }.bind(this)
                  ))
                : new o(t, e, r);
        }
        function r(t) {
            this.img = t;
        }
        function s(t, e) {
            (this.url = t), (this.element = e), (this.img = new Image());
        }
        var h = t.jQuery,
            a = t.console;
        (o.prototype = Object.create(e.prototype)),
            (o.prototype.options = {}),
            (o.prototype.getImages = function () {
                (this.images = []),
                    this.elements.forEach(this.addElementImages, this);
            }),
            (o.prototype.addElementImages = function (t) {
                "IMG" == t.nodeName && this.addImage(t),
                    this.options.background === !0 &&
                        this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && d[e]) {
                    for (
                        var i = t.querySelectorAll("img"), n = 0;
                        n < i.length;
                        n++
                    ) {
                        var o = i[n];
                        this.addImage(o);
                    }
                    if ("string" == typeof this.options.background) {
                        var r = t.querySelectorAll(this.options.background);
                        for (n = 0; n < r.length; n++) {
                            var s = r[n];
                            this.addElementBackgroundImages(s);
                        }
                    }
                }
            });
        var d = { 1: !0, 9: !0, 11: !0 };
        return (
            (o.prototype.addElementBackgroundImages = function (t) {
                var e = getComputedStyle(t);
                if (e)
                    for (
                        var i = /url\((['"])?(.*?)\1\)/gi,
                            n = i.exec(e.backgroundImage);
                        null !== n;

                    ) {
                        var o = n && n[2];
                        o && this.addBackground(o, t),
                            (n = i.exec(e.backgroundImage));
                    }
            }),
            (o.prototype.addImage = function (t) {
                var e = new r(t);
                this.images.push(e);
            }),
            (o.prototype.addBackground = function (t, e) {
                var i = new s(t, e);
                this.images.push(i);
            }),
            (o.prototype.check = function () {
                function t(t, i, n) {
                    setTimeout(function () {
                        e.progress(t, i, n);
                    });
                }
                var e = this;
                return (
                    (this.progressedCount = 0),
                    (this.hasAnyBroken = !1),
                    this.images.length
                        ? void this.images.forEach(function (e) {
                              e.once("progress", t), e.check();
                          })
                        : void this.complete()
                );
            }),
            (o.prototype.progress = function (t, e, i) {
                this.progressedCount++,
                    (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
                    this.emitEvent("progress", [this, t, e]),
                    this.jqDeferred &&
                        this.jqDeferred.notify &&
                        this.jqDeferred.notify(this, t),
                    this.progressedCount == this.images.length &&
                        this.complete(),
                    this.options.debug && a && a.log("progress: " + i, t, e);
            }),
            (o.prototype.complete = function () {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (
                    ((this.isComplete = !0),
                    this.emitEvent(t, [this]),
                    this.emitEvent("always", [this]),
                    this.jqDeferred)
                ) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this);
                }
            }),
            (r.prototype = Object.create(e.prototype)),
            (r.prototype.check = function () {
                var t = this.getIsImageComplete();
                return t
                    ? void this.confirm(
                          0 !== this.img.naturalWidth,
                          "naturalWidth"
                      )
                    : ((this.proxyImage = new Image()),
                      this.proxyImage.addEventListener("load", this),
                      this.proxyImage.addEventListener("error", this),
                      this.img.addEventListener("load", this),
                      this.img.addEventListener("error", this),
                      void (this.proxyImage.src = this.img.src));
            }),
            (r.prototype.getIsImageComplete = function () {
                return this.img.complete && void 0 !== this.img.naturalWidth;
            }),
            (r.prototype.confirm = function (t, e) {
                (this.isLoaded = t),
                    this.emitEvent("progress", [this, this.img, e]);
            }),
            (r.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (r.prototype.onload = function () {
                this.confirm(!0, "onload"), this.unbindEvents();
            }),
            (r.prototype.onerror = function () {
                this.confirm(!1, "onerror"), this.unbindEvents();
            }),
            (r.prototype.unbindEvents = function () {
                this.proxyImage.removeEventListener("load", this),
                    this.proxyImage.removeEventListener("error", this),
                    this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this);
            }),
            (s.prototype = Object.create(r.prototype)),
            (s.prototype.check = function () {
                this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    (this.img.src = this.url);
                var t = this.getIsImageComplete();
                t &&
                    (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                    this.unbindEvents());
            }),
            (s.prototype.unbindEvents = function () {
                this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this);
            }),
            (s.prototype.confirm = function (t, e) {
                (this.isLoaded = t),
                    this.emitEvent("progress", [this, this.element, e]);
            }),
            (o.makeJQueryPlugin = function (e) {
                (e = e || t.jQuery),
                    e &&
                        ((h = e),
                        (h.fn.imagesLoaded = function (t, e) {
                            var i = new o(this, t, e);
                            return i.jqDeferred.promise(h(this));
                        }));
            }),
            o.makeJQueryPlugin(),
            o
        );
    });

/*
 * jquery-match-height 0.7.0 by @liabru
 * http://brm.io/jquery-match-height/
 * License MIT
 */
!(function (t) {
    "use strict";
    "function" == typeof define && define.amd
        ? define(["jquery"], t)
        : "undefined" != typeof module && module.exports
        ? (module.exports = t(require("jquery")))
        : t(jQuery);
})(function (t) {
    var e = -1,
        o = -1,
        i = function (t) {
            return parseFloat(t) || 0;
        },
        a = function (e) {
            var o = 1,
                a = t(e),
                n = null,
                r = [];
            return (
                a.each(function () {
                    var e = t(this),
                        a = e.offset().top - i(e.css("margin-top")),
                        s = r.length > 0 ? r[r.length - 1] : null;
                    null === s
                        ? r.push(e)
                        : Math.floor(Math.abs(n - a)) <= o
                        ? (r[r.length - 1] = s.add(e))
                        : r.push(e),
                        (n = a);
                }),
                r
            );
        },
        n = function (e) {
            var o = {
                byRow: !0,
                property: "height",
                target: null,
                remove: !1,
            };
            return "object" == typeof e
                ? t.extend(o, e)
                : ("boolean" == typeof e
                      ? (o.byRow = e)
                      : "remove" === e && (o.remove = !0),
                  o);
        },
        r = (t.fn.matchHeight = function (e) {
            var o = n(e);
            if (o.remove) {
                var i = this;
                return (
                    this.css(o.property, ""),
                    t.each(r._groups, function (t, e) {
                        e.elements = e.elements.not(i);
                    }),
                    this
                );
            }
            return this.length <= 1 && !o.target
                ? this
                : (r._groups.push({ elements: this, options: o }),
                  r._apply(this, o),
                  this);
        });
    (r.version = "0.7.0"),
        (r._groups = []),
        (r._throttle = 80),
        (r._maintainScroll = !1),
        (r._beforeUpdate = null),
        (r._afterUpdate = null),
        (r._rows = a),
        (r._parse = i),
        (r._parseOptions = n),
        (r._apply = function (e, o) {
            var s = n(o),
                h = t(e),
                l = [h],
                c = t(window).scrollTop(),
                p = t("html").outerHeight(!0),
                d = h.parents().filter(":hidden");
            return (
                d.each(function () {
                    var e = t(this);
                    e.data("style-cache", e.attr("style"));
                }),
                d.css("display", "block"),
                s.byRow &&
                    !s.target &&
                    (h.each(function () {
                        var e = t(this),
                            o = e.css("display");
                        "inline-block" !== o &&
                            "flex" !== o &&
                            "inline-flex" !== o &&
                            (o = "block"),
                            e.data("style-cache", e.attr("style")),
                            e.css({
                                display: o,
                                "padding-top": "0",
                                "padding-bottom": "0",
                                "margin-top": "0",
                                "margin-bottom": "0",
                                "border-top-width": "0",
                                "border-bottom-width": "0",
                                height: "100px",
                                overflow: "hidden",
                            });
                    }),
                    (l = a(h)),
                    h.each(function () {
                        var e = t(this);
                        e.attr("style", e.data("style-cache") || "");
                    })),
                t.each(l, function (e, o) {
                    var a = t(o),
                        n = 0;
                    if (s.target) n = s.target.outerHeight(!1);
                    else {
                        if (s.byRow && a.length <= 1)
                            return void a.css(s.property, "");
                        a.each(function () {
                            var e = t(this),
                                o = e.attr("style"),
                                i = e.css("display");
                            "inline-block" !== i &&
                                "flex" !== i &&
                                "inline-flex" !== i &&
                                (i = "block");
                            var a = {
                                display: i,
                            };
                            (a[s.property] = ""),
                                e.css(a),
                                e.outerHeight(!1) > n &&
                                    (n = e.outerHeight(!1)),
                                o ? e.attr("style", o) : e.css("display", "");
                        });
                    }
                    a.each(function () {
                        var e = t(this),
                            o = 0;
                        (s.target && e.is(s.target)) ||
                            ("border-box" !== e.css("box-sizing") &&
                                ((o +=
                                    i(e.css("border-top-width")) +
                                    i(e.css("border-bottom-width"))),
                                (o +=
                                    i(e.css("padding-top")) +
                                    i(e.css("padding-bottom")))),
                            e.css(s.property, n - o + "px"));
                    });
                }),
                d.each(function () {
                    var e = t(this);
                    e.attr("style", e.data("style-cache") || null);
                }),
                r._maintainScroll &&
                    t(window).scrollTop((c / p) * t("html").outerHeight(!0)),
                this
            );
        }),
        (r._applyDataApi = function () {
            var e = {};
            t("[data-match-height], [data-mh]").each(function () {
                var o = t(this),
                    i = o.attr("data-mh") || o.attr("data-match-height");
                i in e ? (e[i] = e[i].add(o)) : (e[i] = o);
            }),
                t.each(e, function () {
                    this.matchHeight(!0);
                });
        });
    var s = function (e) {
        r._beforeUpdate && r._beforeUpdate(e, r._groups),
            t.each(r._groups, function () {
                r._apply(this.elements, this.options);
            }),
            r._afterUpdate && r._afterUpdate(e, r._groups);
    };
    (r._update = function (i, a) {
        if (a && "resize" === a.type) {
            var n = t(window).width();
            if (n === e) return;
            e = n;
        }
        i
            ? -1 === o &&
              (o = setTimeout(function () {
                  s(a), (o = -1);
              }, r._throttle))
            : s(a);
    }),
        t(r._applyDataApi),
        t(window).bind("load", function (t) {
            r._update(!1, t);
        }),
        t(window).bind("resize orientationchange", function (t) {
            r._update(!0, t);
        });
});

/*! jQuery countTo Plugin - https://github.com/mhuggins/jquery-countTo - Copyright (c) 2015 Matt Huggins - MIT License */
!(function (t) {
    "function" == typeof define && define.amd
        ? define(["jquery"], t)
        : t("object" == typeof exports ? require("jquery") : jQuery);
})(function (t) {
    function e(t, e) {
        return t.toFixed(e.decimals);
    }
    var o = function (e, i) {
        (this.$element = t(e)),
            (this.options = t.extend({}, o.DEFAULTS, this.dataOptions(), i)),
            this.init();
    };
    (o.DEFAULTS = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: e,
        onUpdate: null,
        onComplete: null,
    }),
        (o.prototype.init = function () {
            (this.value = this.options.from),
                (this.loops = Math.ceil(
                    this.options.speed / this.options.refreshInterval
                )),
                (this.loopCount = 0),
                (this.increment =
                    (this.options.to - this.options.from) / this.loops);
        }),
        (o.prototype.dataOptions = function () {
            var t = {
                    from: this.$element.data("from"),
                    to: this.$element.data("to"),
                    speed: this.$element.data("speed"),
                    refreshInterval: this.$element.data("refresh-interval"),
                    decimals: this.$element.data("decimals"),
                },
                e = Object.keys(t);
            for (var o in e) {
                var i = e[o];
                "undefined" == typeof t[i] && delete t[i];
            }
            return t;
        }),
        (o.prototype.update = function () {
            (this.value += this.increment),
                this.loopCount++,
                this.render(),
                "function" == typeof this.options.onUpdate &&
                    this.options.onUpdate.call(this.$element, this.value),
                this.loopCount >= this.loops &&
                    (clearInterval(this.interval),
                    (this.value = this.options.to),
                    "function" == typeof this.options.onComplete &&
                        this.options.onComplete.call(
                            this.$element,
                            this.value
                        ));
        }),
        (o.prototype.render = function () {
            var t = this.options.formatter.call(
                this.$element,
                this.value,
                this.options
            );
            this.$element.text(t);
        }),
        (o.prototype.restart = function () {
            this.stop(), this.init(), this.start();
        }),
        (o.prototype.start = function () {
            this.stop(),
                this.render(),
                (this.interval = setInterval(
                    this.update.bind(this),
                    this.options.refreshInterval
                ));
        }),
        (o.prototype.stop = function () {
            this.interval && clearInterval(this.interval);
        }),
        (o.prototype.toggle = function () {
            this.interval ? this.stop() : this.start();
        }),
        (t.fn.countTo = function (e) {
            return this.each(function () {
                var i = t(this),
                    n = i.data("countTo"),
                    s = !n || "object" == typeof e,
                    r = "object" == typeof e ? e : {},
                    a = "string" == typeof e ? e : "start";
                s && (n && n.stop(), i.data("countTo", (n = new o(this, r)))),
                    n[a].call(n);
            });
        });
});

/*!
 * headroom.js v0.9.3 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2016 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!(function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
        ? define([], b)
        : "object" == typeof exports
        ? (module.exports = b())
        : (a.Headroom = b());
})(this, function () {
    "use strict";
    function a(a) {
        (this.callback = a), (this.ticking = !1);
    }
    function b(a) {
        return (
            a && "undefined" != typeof window && (a === window || a.nodeType)
        );
    }
    function c(a) {
        if (arguments.length <= 0)
            throw new Error("Missing arguments in extend function");
        var d,
            e,
            f = a || {};
        for (e = 1; e < arguments.length; e++) {
            var g = arguments[e] || {};
            for (d in g)
                "object" != typeof f[d] || b(f[d])
                    ? (f[d] = f[d] || g[d])
                    : (f[d] = c(f[d], g[d]));
        }
        return f;
    }
    function d(a) {
        return a === Object(a) ? a : { down: a, up: a };
    }
    function e(a, b) {
        (b = c(b, e.options)),
            (this.lastKnownScrollY = 0),
            (this.elem = a),
            (this.tolerance = d(b.tolerance)),
            (this.classes = b.classes),
            (this.offset = b.offset),
            (this.scroller = b.scroller),
            (this.initialised = !1),
            (this.onPin = b.onPin),
            (this.onUnpin = b.onUnpin),
            (this.onTop = b.onTop),
            (this.onNotTop = b.onNotTop),
            (this.onBottom = b.onBottom),
            (this.onNotBottom = b.onNotBottom);
    }
    var f = {
        bind: !!function () {}.bind,
        classList: "classList" in document.documentElement,
        rAF: !!(
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame
        ),
    };
    return (
        (window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame),
        (a.prototype = {
            constructor: a,
            update: function () {
                this.callback && this.callback(), (this.ticking = !1);
            },
            requestTick: function () {
                this.ticking ||
                    (requestAnimationFrame(
                        this.rafCallback ||
                            (this.rafCallback = this.update.bind(this))
                    ),
                    (this.ticking = !0));
            },
            handleEvent: function () {
                this.requestTick();
            },
        }),
        (e.prototype = {
            constructor: e,
            init: function () {
                return e.cutsTheMustard
                    ? ((this.debouncer = new a(this.update.bind(this))),
                      this.elem.classList.add(this.classes.initial),
                      setTimeout(this.attachEvent.bind(this), 100),
                      this)
                    : void 0;
            },
            destroy: function () {
                var a = this.classes;
                (this.initialised = !1),
                    this.elem.classList.remove(
                        a.unpinned,
                        a.pinned,
                        a.top,
                        a.notTop,
                        a.initial
                    ),
                    this.scroller.removeEventListener(
                        "scroll",
                        this.debouncer,
                        !1
                    );
            },
            attachEvent: function () {
                this.initialised ||
                    ((this.lastKnownScrollY = this.getScrollY()),
                    (this.initialised = !0),
                    this.scroller.addEventListener(
                        "scroll",
                        this.debouncer,
                        !1
                    ),
                    this.debouncer.handleEvent());
            },
            unpin: function () {
                var a = this.elem.classList,
                    b = this.classes;
                (!a.contains(b.pinned) && a.contains(b.unpinned)) ||
                    (a.add(b.unpinned),
                    a.remove(b.pinned),
                    this.onUnpin && this.onUnpin.call(this));
            },
            pin: function () {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.unpinned) &&
                    (a.remove(b.unpinned),
                    a.add(b.pinned),
                    this.onPin && this.onPin.call(this));
            },
            top: function () {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.top) ||
                    (a.add(b.top),
                    a.remove(b.notTop),
                    this.onTop && this.onTop.call(this));
            },
            notTop: function () {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.notTop) ||
                    (a.add(b.notTop),
                    a.remove(b.top),
                    this.onNotTop && this.onNotTop.call(this));
            },
            bottom: function () {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.bottom) ||
                    (a.add(b.bottom),
                    a.remove(b.notBottom),
                    this.onBottom && this.onBottom.call(this));
            },
            notBottom: function () {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.notBottom) ||
                    (a.add(b.notBottom),
                    a.remove(b.bottom),
                    this.onNotBottom && this.onNotBottom.call(this));
            },
            getScrollY: function () {
                return void 0 !== this.scroller.pageYOffset
                    ? this.scroller.pageYOffset
                    : void 0 !== this.scroller.scrollTop
                    ? this.scroller.scrollTop
                    : (
                          document.documentElement ||
                          document.body.parentNode ||
                          document.body
                      ).scrollTop;
            },
            getViewportHeight: function () {
                return (
                    window.innerHeight ||
                    document.documentElement.clientHeight ||
                    document.body.clientHeight
                );
            },
            getElementPhysicalHeight: function (a) {
                return Math.max(a.offsetHeight, a.clientHeight);
            },
            getScrollerPhysicalHeight: function () {
                return this.scroller === window ||
                    this.scroller === document.body
                    ? this.getViewportHeight()
                    : this.getElementPhysicalHeight(this.scroller);
            },
            getDocumentHeight: function () {
                var a = document.body,
                    b = document.documentElement;
                return Math.max(
                    a.scrollHeight,
                    b.scrollHeight,
                    a.offsetHeight,
                    b.offsetHeight,
                    a.clientHeight,
                    b.clientHeight
                );
            },
            getElementHeight: function (a) {
                return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight);
            },
            getScrollerHeight: function () {
                return this.scroller === window ||
                    this.scroller === document.body
                    ? this.getDocumentHeight()
                    : this.getElementHeight(this.scroller);
            },
            isOutOfBounds: function (a) {
                var b = 0 > a,
                    c =
                        a + this.getScrollerPhysicalHeight() >
                        this.getScrollerHeight();
                return b || c;
            },
            toleranceExceeded: function (a, b) {
                return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b];
            },
            shouldUnpin: function (a, b) {
                var c = a > this.lastKnownScrollY,
                    d = a >= this.offset;
                return c && d && b;
            },
            shouldPin: function (a, b) {
                var c = a < this.lastKnownScrollY,
                    d = a <= this.offset;
                return (c && b) || d;
            },
            update: function () {
                var a = this.getScrollY(),
                    b = a > this.lastKnownScrollY ? "down" : "up",
                    c = this.toleranceExceeded(a, b);
                this.isOutOfBounds(a) ||
                    (a <= this.offset ? this.top() : this.notTop(),
                    a + this.getViewportHeight() >= this.getScrollerHeight()
                        ? this.bottom()
                        : this.notBottom(),
                    this.shouldUnpin(a, c)
                        ? this.unpin()
                        : this.shouldPin(a, c) && this.pin(),
                    (this.lastKnownScrollY = a));
            },
        }),
        (e.options = {
            tolerance: { up: 0, down: 0 },
            offset: 0,
            scroller: window,
            classes: {
                pinned: "headroom--pinned",
                unpinned: "headroom--unpinned",
                top: "headroom--top",
                notTop: "headroom--not-top",
                bottom: "headroom--bottom",
                notBottom: "headroom--not-bottom",
                initial: "headroom",
            },
        }),
        (e.cutsTheMustard =
            "undefined" != typeof f && f.rAF && f.bind && f.classList),
        e
    );
});

/*jQuery adaper for headroom JS*/
!(function (o) {
    o &&
        (o.fn.headroom = function (e) {
            return this.each(function () {
                var t = o(this),
                    n = t.data("headroom"),
                    a = "object" == typeof e && e;
                (a = o.extend(!0, {}, Headroom.options, a)),
                    n ||
                        ((n = new Headroom(this, a)),
                        n.init(),
                        t.data("headroom", n)),
                    "string" == typeof e &&
                        (n[e](), "destroy" === e && t.removeData("headroom"));
            });
        });
})(window.Zepto || window.jQuery);

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
!(function (a) {
    "function" == typeof define && define.amd
        ? define(["jquery"], a)
        : a(
              "object" == typeof exports
                  ? require("jquery")
                  : window.jQuery || window.Zepto
          );
})(function (a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function () {},
        u = !!window.jQuery,
        v = a(window),
        w = function (a, c) {
            b.ev.on(o + a + p, c);
        },
        x = function (b, c, d, e) {
            var f = document.createElement("div");
            return (
                (f.className = "mfp-" + b),
                d && (f.innerHTML = d),
                e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
                f
            );
        },
        y = function (c, d) {
            b.ev.triggerHandler(o + c, d),
                b.st.callbacks &&
                    ((c = c.charAt(0).toLowerCase() + c.slice(1)),
                    b.st.callbacks[c] &&
                        b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
        },
        z = function (c) {
            return (
                (c === g && b.currTemplate.closeBtn) ||
                    ((b.currTemplate.closeBtn = a(
                        b.st.closeMarkup.replace("%title%", b.st.tClose)
                    )),
                    (g = c)),
                b.currTemplate.closeBtn
            );
        },
        A = function () {
            a.magnificPopup.instance ||
                ((b = new t()), b.init(), (a.magnificPopup.instance = b));
        },
        B = function () {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
            return !1;
        };
    (t.prototype = {
        constructor: t,
        init: function () {
            var c = navigator.appVersion;
            (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
                (b.isAndroid = /android/gi.test(c)),
                (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
                (b.supportsTransition = B()),
                (b.probablyMobile =
                    b.isAndroid ||
                    b.isIOS ||
                    /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                        navigator.userAgent
                    )),
                (d = a(document)),
                (b.popupsCache = {});
        },
        open: function (c) {
            var e;
            if (c.isObj === !1) {
                (b.items = c.items.toArray()), (b.index = 0);
                var g,
                    h = c.items;
                for (e = 0; e < h.length; e++)
                    if (
                        ((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])
                    ) {
                        b.index = e;
                        break;
                    }
            } else
                (b.items = a.isArray(c.items) ? c.items : [c.items]),
                    (b.index = c.index || 0);
            if (b.isOpen) return void b.updateItemHTML();
            (b.types = []),
                (f = ""),
                c.mainEl && c.mainEl.length
                    ? (b.ev = c.mainEl.eq(0))
                    : (b.ev = d),
                c.key
                    ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
                      (b.currTemplate = b.popupsCache[c.key]))
                    : (b.currTemplate = {}),
                (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
                (b.fixedContentPos =
                    "auto" === b.st.fixedContentPos
                        ? !b.probablyMobile
                        : b.st.fixedContentPos),
                b.st.modal &&
                    ((b.st.closeOnContentClick = !1),
                    (b.st.closeOnBgClick = !1),
                    (b.st.showCloseBtn = !1),
                    (b.st.enableEscapeKey = !1)),
                b.bgOverlay ||
                    ((b.bgOverlay = x("bg").on("click" + p, function () {
                        b.close();
                    })),
                    (b.wrap = x("wrap")
                        .attr("tabindex", -1)
                        .on("click" + p, function (a) {
                            b._checkIfClose(a.target) && b.close();
                        })),
                    (b.container = x("container", b.wrap))),
                (b.contentContainer = x("content")),
                b.st.preloader &&
                    (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                (j = j.charAt(0).toUpperCase() + j.slice(1)),
                    b["init" + j].call(b);
            }
            y("BeforeOpen"),
                b.st.showCloseBtn &&
                    (b.st.closeBtnInside
                        ? (w(l, function (a, b, c, d) {
                              c.close_replaceWith = z(d.type);
                          }),
                          (f += " mfp-close-btn-in"))
                        : b.wrap.append(z())),
                b.st.alignTop && (f += " mfp-align-top"),
                b.fixedContentPos
                    ? b.wrap.css({
                          overflow: b.st.overflowY,
                          overflowX: "hidden",
                          overflowY: b.st.overflowY,
                      })
                    : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
                (b.st.fixedBgPos === !1 ||
                    ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
                    b.bgOverlay.css({
                        height: d.height(),
                        position: "absolute",
                    }),
                b.st.enableEscapeKey &&
                    d.on("keyup" + p, function (a) {
                        27 === a.keyCode && b.close();
                    }),
                v.on("resize" + p, function () {
                    b.updateSize();
                }),
                b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
                f && b.wrap.addClass(f);
            var k = (b.wH = v.height()),
                n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o);
            }
            b.fixedContentPos &&
                (b.isIE7
                    ? a("body, html").css("overflow", "hidden")
                    : (n.overflow = "hidden"));
            var r = b.st.mainClass;
            return (
                b.isIE7 && (r += " mfp-ie7"),
                r && b._addClassToMFP(r),
                b.updateItemHTML(),
                y("BuildControls"),
                a("html").css(n),
                b.bgOverlay
                    .add(b.wrap)
                    .prependTo(b.st.prependTo || a(document.body)),
                (b._lastFocusedEl = document.activeElement),
                setTimeout(function () {
                    b.content
                        ? (b._addClassToMFP(q), b._setFocus())
                        : b.bgOverlay.addClass(q),
                        d.on("focusin" + p, b._onFocusIn);
                }, 16),
                (b.isOpen = !0),
                b.updateSize(k),
                y(m),
                c
            );
        },
        close: function () {
            b.isOpen &&
                (y(i),
                (b.isOpen = !1),
                b.st.removalDelay && !b.isLowIE && b.supportsTransition
                    ? (b._addClassToMFP(r),
                      setTimeout(function () {
                          b._close();
                      }, b.st.removalDelay))
                    : b._close());
        },
        _close: function () {
            y(h);
            var c = r + " " + q + " ";
            if (
                (b.bgOverlay.detach(),
                b.wrap.detach(),
                b.container.empty(),
                b.st.mainClass && (c += b.st.mainClass + " "),
                b._removeClassFromMFP(c),
                b.fixedContentPos)
            ) {
                var e = { marginRight: "" };
                b.isIE7
                    ? a("body, html").css("overflow", "")
                    : (e.overflow = ""),
                    a("html").css(e);
            }
            d.off("keyup" + p + " focusin" + p),
                b.ev.off(p),
                b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                b.bgOverlay.attr("class", "mfp-bg"),
                b.container.attr("class", "mfp-container"),
                !b.st.showCloseBtn ||
                    (b.st.closeBtnInside &&
                        b.currTemplate[b.currItem.type] !== !0) ||
                    (b.currTemplate.closeBtn &&
                        b.currTemplate.closeBtn.detach()),
                b.st.autoFocusLast &&
                    b._lastFocusedEl &&
                    a(b._lastFocusedEl).focus(),
                (b.currItem = null),
                (b.content = null),
                (b.currTemplate = null),
                (b.prevHeight = 0),
                y(j);
        },
        updateSize: function (a) {
            if (b.isIOS) {
                var c =
                        document.documentElement.clientWidth /
                        window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), (b.wH = d);
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
        },
        updateItemHTML: function () {
            var c = b.items[b.index];
            b.contentContainer.detach(),
                b.content && b.content.detach(),
                c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (
                (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
                (b.currItem = c),
                !b.currTemplate[d])
            ) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f),
                    f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
            }
            e &&
                e !== c.type &&
                b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
                c,
                b.currTemplate[d]
            );
            b.appendContent(g, d),
                (c.preloaded = !0),
                y(n, c),
                (e = c.type),
                b.container.prepend(b.contentContainer),
                y("AfterChange");
        },
        appendContent: function (a, c) {
            (b.content = a),
                a
                    ? b.st.showCloseBtn &&
                      b.st.closeBtnInside &&
                      b.currTemplate[c] === !0
                        ? b.content.find(".mfp-close").length ||
                          b.content.append(z())
                        : (b.content = a)
                    : (b.content = ""),
                y(k),
                b.container.addClass("mfp-" + c + "-holder"),
                b.contentContainer.append(b.content);
        },
        parseEl: function (c) {
            var d,
                e = b.items[c];
            if (
                (e.tagName
                    ? (e = { el: a(e) })
                    : ((d = e.type), (e = { data: e, src: e.src })),
                e.el)
            ) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break;
                    }
                (e.src = e.el.attr("data-mfp-src")),
                    e.src || (e.src = e.el.attr("href"));
            }
            return (
                (e.type = d || b.st.type || "inline"),
                (e.index = c),
                (e.parsed = !0),
                (b.items[c] = e),
                y("ElementParse", e),
                b.items[c]
            );
        },
        addGroup: function (a, c) {
            var d = function (d) {
                (d.mfpEl = this), b._openClick(d, a, c);
            };
            c || (c = {});
            var e = "click.magnificPopup";
            (c.mainEl = a),
                c.items
                    ? ((c.isObj = !0), a.off(e).on(e, d))
                    : ((c.isObj = !1),
                      c.delegate
                          ? a.off(e).on(e, c.delegate, d)
                          : ((c.items = a), a.off(e).on(e, d)));
        },
        _openClick: function (c, d, e) {
            var f =
                void 0 !== e.midClick
                    ? e.midClick
                    : a.magnificPopup.defaults.midClick;
            if (
                f ||
                !(
                    2 === c.which ||
                    c.ctrlKey ||
                    c.metaKey ||
                    c.altKey ||
                    c.shiftKey
                )
            ) {
                var g =
                    void 0 !== e.disableOn
                        ? e.disableOn
                        : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0;
                    } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
                    (e.el = a(c.mfpEl)),
                    e.delegate && (e.items = d.find(e.delegate)),
                    b.open(e);
            }
        },
        updateStatus: function (a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c),
                    d || "loading" !== a || (d = b.st.tLoading);
                var e = { status: a, text: d };
                y("UpdateStatus", e),
                    (a = e.status),
                    (d = e.text),
                    b.preloader.html(d),
                    b.preloader.find("a").on("click", function (a) {
                        a.stopImmediatePropagation();
                    }),
                    b.container.addClass("mfp-s-" + a),
                    (c = a);
            }
        },
        _checkIfClose: function (c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (
                    !b.content ||
                    a(c).hasClass("mfp-close") ||
                    (b.preloader && c === b.preloader[0])
                )
                    return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0;
                } else if (e && a.contains(document, c)) return !0;
                return !1;
            }
        },
        _addClassToMFP: function (a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a);
        },
        _removeClassFromMFP: function (a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
        },
        _hasScrollBar: function (a) {
            return (
                (b.isIE7 ? d.height() : document.body.scrollHeight) >
                (a || v.height())
            );
        },
        _setFocus: function () {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
        },
        _onFocusIn: function (c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
                ? void 0
                : (b._setFocus(), !1);
        },
        _parseMarkup: function (b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)),
                y(l, [b, c, d]),
                a.each(c, function (c, d) {
                    if (void 0 === d || d === !1) return !0;
                    if (((e = c.split("_")), e.length > 1)) {
                        var f = b.find(p + "-" + e[0]);
                        if (f.length > 0) {
                            var g = e[1];
                            "replaceWith" === g
                                ? f[0] !== d[0] && f.replaceWith(d)
                                : "img" === g
                                ? f.is("img")
                                    ? f.attr("src", d)
                                    : f.replaceWith(
                                          a("<img>")
                                              .attr("src", d)
                                              .attr("class", f.attr("class"))
                                      )
                                : f.attr(e[1], d);
                        }
                    } else b.find(p + "-" + c).html(d);
                });
        },
        _getScrollbarSize: function () {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                (a.style.cssText =
                    "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
                    document.body.appendChild(a),
                    (b.scrollbarSize = a.offsetWidth - a.clientWidth),
                    document.body.removeChild(a);
            }
            return b.scrollbarSize;
        },
    }),
        (a.magnificPopup = {
            instance: null,
            proto: t.prototype,
            modules: [],
            open: function (b, c) {
                return (
                    A(),
                    (b = b ? a.extend(!0, {}, b) : {}),
                    (b.isObj = !0),
                    (b.index = c || 0),
                    this.instance.open(b)
                );
            },
            close: function () {
                return (
                    a.magnificPopup.instance && a.magnificPopup.instance.close()
                );
            },
            registerModule: function (b, c) {
                c.options && (a.magnificPopup.defaults[b] = c.options),
                    a.extend(this.proto, c.proto),
                    this.modules.push(b);
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup:
                    '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0,
            },
        }),
        (a.fn.magnificPopup = function (c) {
            A();
            var d = a(this);
            if ("string" == typeof c)
                if ("open" === c) {
                    var e,
                        f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                        g = parseInt(arguments[1], 10) || 0;
                    f.items
                        ? (e = f.items[g])
                        : ((e = d),
                          f.delegate && (e = e.find(f.delegate)),
                          (e = e.eq(g))),
                        b._openClick({ mfpEl: e }, d, f);
                } else
                    b.isOpen &&
                        b[c].apply(b, Array.prototype.slice.call(arguments, 1));
            else
                (c = a.extend(!0, {}, c)),
                    u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
                    b.addGroup(d, c);
            return d;
        });
    var C,
        D,
        E,
        F = "inline",
        G = function () {
            E && (D.after(E.addClass(C)).detach(), (E = null));
        };
    a.magnificPopup.registerModule(F, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found",
        },
        proto: {
            initInline: function () {
                b.types.push(F),
                    w(h + "." + F, function () {
                        G();
                    });
            },
            getInline: function (c, d) {
                if ((G(), c.src)) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g &&
                            g.tagName &&
                            (D ||
                                ((C = e.hiddenClass),
                                (D = x(C)),
                                (C = "mfp-" + C)),
                            (E = f.after(D).detach().removeClass(C))),
                            b.updateStatus("ready");
                    } else
                        b.updateStatus("error", e.tNotFound), (f = a("<div>"));
                    return (c.inlineElement = f), f;
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
            },
        },
    });
    var H,
        I = "ajax",
        J = function () {
            H && a(document.body).removeClass(H);
        },
        K = function () {
            J(), b.req && b.req.abort();
        };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.',
        },
        proto: {
            initAjax: function () {
                b.types.push(I),
                    (H = b.st.ajax.cursor),
                    w(h + "." + I, K),
                    w("BeforeChange." + I, K);
            },
            getAjax: function (c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend(
                    {
                        url: c.src,
                        success: function (d, e, f) {
                            var g = { data: d, xhr: f };
                            y("ParseAjax", g),
                                b.appendContent(a(g.data), I),
                                (c.finished = !0),
                                J(),
                                b._setFocus(),
                                setTimeout(function () {
                                    b.wrap.addClass(q);
                                }, 16),
                                b.updateStatus("ready"),
                                y("AjaxContentAdded");
                        },
                        error: function () {
                            J(),
                                (c.finished = c.loadError = !0),
                                b.updateStatus(
                                    "error",
                                    b.st.ajax.tError.replace("%url%", c.src)
                                );
                        },
                    },
                    b.st.ajax.settings
                );
                return (b.req = a.ajax(d)), "";
            },
        },
    });
    var L,
        M = function (c) {
            if (c.data && void 0 !== c.data.title) return c.data.title;
            var d = b.st.image.titleSrc;
            if (d) {
                if (a.isFunction(d)) return d.call(b, c);
                if (c.el) return c.el.attr(d) || "";
            }
            return "";
        };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.',
        },
        proto: {
            initImage: function () {
                var c = b.st.image,
                    d = ".image";
                b.types.push("image"),
                    w(m + d, function () {
                        "image" === b.currItem.type &&
                            c.cursor &&
                            a(document.body).addClass(c.cursor);
                    }),
                    w(h + d, function () {
                        c.cursor && a(document.body).removeClass(c.cursor),
                            v.off("resize" + p);
                    }),
                    w("Resize" + d, b.resizeImage),
                    b.isLowIE && w("AfterChange", b.resizeImage);
            },
            resizeImage: function () {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE &&
                        (c =
                            parseInt(a.img.css("padding-top"), 10) +
                            parseInt(a.img.css("padding-bottom"), 10)),
                        a.img.css("max-height", b.wH - c);
                }
            },
            _onImageHasSize: function (a) {
                a.img &&
                    ((a.hasSize = !0),
                    L && clearInterval(L),
                    (a.isCheckingImgSize = !1),
                    y("ImageHasSize", a),
                    a.imgHidden &&
                        (b.content && b.content.removeClass("mfp-loading"),
                        (a.imgHidden = !1)));
            },
            findImageSize: function (a) {
                var c = 0,
                    d = a.img[0],
                    e = function (f) {
                        L && clearInterval(L),
                            (L = setInterval(function () {
                                return d.naturalWidth > 0
                                    ? void b._onImageHasSize(a)
                                    : (c > 200 && clearInterval(L),
                                      c++,
                                      void (3 === c
                                          ? e(10)
                                          : 40 === c
                                          ? e(50)
                                          : 100 === c && e(500)));
                            }, f));
                    };
                e(1);
            },
            getImage: function (c, d) {
                var e = 0,
                    f = function () {
                        c &&
                            (c.img[0].complete
                                ? (c.img.off(".mfploader"),
                                  c === b.currItem &&
                                      (b._onImageHasSize(c),
                                      b.updateStatus("ready")),
                                  (c.hasSize = !0),
                                  (c.loaded = !0),
                                  y("ImageLoadComplete"))
                                : (e++, 200 > e ? setTimeout(f, 100) : g()));
                    },
                    g = function () {
                        c &&
                            (c.img.off(".mfploader"),
                            c === b.currItem &&
                                (b._onImageHasSize(c),
                                b.updateStatus(
                                    "error",
                                    h.tError.replace("%url%", c.src)
                                )),
                            (c.hasSize = !0),
                            (c.loaded = !0),
                            (c.loadError = !0));
                    },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    (j.className = "mfp-img"),
                        c.el &&
                            c.el.find("img").length &&
                            (j.alt = c.el.find("img").attr("alt")),
                        (c.img = a(j)
                            .on("load.mfploader", f)
                            .on("error.mfploader", g)),
                        (j.src = c.src),
                        i.is("img") && (c.img = c.img.clone()),
                        (j = c.img[0]),
                        j.naturalWidth > 0
                            ? (c.hasSize = !0)
                            : j.width || (c.hasSize = !1);
                }
                return (
                    b._parseMarkup(
                        d,
                        { title: M(c), img_replaceWith: c.img },
                        c
                    ),
                    b.resizeImage(),
                    c.hasSize
                        ? (L && clearInterval(L),
                          c.loadError
                              ? (d.addClass("mfp-loading"),
                                b.updateStatus(
                                    "error",
                                    h.tError.replace("%url%", c.src)
                                ))
                              : (d.removeClass("mfp-loading"),
                                b.updateStatus("ready")),
                          d)
                        : (b.updateStatus("loading"),
                          (c.loading = !0),
                          c.hasSize ||
                              ((c.imgHidden = !0),
                              d.addClass("mfp-loading"),
                              b.findImageSize(c)),
                          d)
                );
            },
        },
    });
    var N,
        O = function () {
            return (
                void 0 === N &&
                    (N =
                        void 0 !==
                        document.createElement("p").style.MozTransform),
                N
            );
        };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (a) {
                return a.is("img") ? a : a.find("img");
            },
        },
        proto: {
            initZoom: function () {
                var a,
                    c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e,
                        f,
                        g = c.duration,
                        j = function (a) {
                            var b = a
                                    .clone()
                                    .removeAttr("style")
                                    .removeAttr("class")
                                    .addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden",
                                },
                                f = "transition";
                            return (
                                (e["-webkit-" + f] =
                                    e["-moz-" + f] =
                                    e["-o-" + f] =
                                    e[f] =
                                        d),
                                b.css(e),
                                b
                            );
                        },
                        k = function () {
                            b.content.css("visibility", "visible");
                        };
                    w("BuildControls" + d, function () {
                        if (b._allowZoom()) {
                            if (
                                (clearTimeout(e),
                                b.content.css("visibility", "hidden"),
                                (a = b._getItemToZoom()),
                                !a)
                            )
                                return void k();
                            (f = j(a)),
                                f.css(b._getOffset()),
                                b.wrap.append(f),
                                (e = setTimeout(function () {
                                    f.css(b._getOffset(!0)),
                                        (e = setTimeout(function () {
                                            k(),
                                                setTimeout(function () {
                                                    f.remove(),
                                                        (a = f = null),
                                                        y("ZoomAnimationEnded");
                                                }, 16);
                                        }, g));
                                }, 16));
                        }
                    }),
                        w(i + d, function () {
                            if (b._allowZoom()) {
                                if (
                                    (clearTimeout(e),
                                    (b.st.removalDelay = g),
                                    !a)
                                ) {
                                    if (((a = b._getItemToZoom()), !a)) return;
                                    f = j(a);
                                }
                                f.css(b._getOffset(!0)),
                                    b.wrap.append(f),
                                    b.content.css("visibility", "hidden"),
                                    setTimeout(function () {
                                        f.css(b._getOffset());
                                    }, 16);
                            }
                        }),
                        w(h + d, function () {
                            b._allowZoom() &&
                                (k(), f && f.remove(), (a = null));
                        });
                }
            },
            _allowZoom: function () {
                return "image" === b.currItem.type;
            },
            _getItemToZoom: function () {
                return b.currItem.hasSize ? b.currItem.img : !1;
            },
            _getOffset: function (c) {
                var d;
                d = c
                    ? b.currItem.img
                    : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
                };
                return (
                    O()
                        ? (h["-moz-transform"] = h.transform =
                              "translate(" + e.left + "px," + e.top + "px)")
                        : ((h.left = e.left), (h.top = e.top)),
                    h
                );
            },
        },
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function (a) {
            if (b.currTemplate[P]) {
                var c = b.currTemplate[P].find("iframe");
                c.length &&
                    (a || (c[0].src = Q),
                    b.isIE8 && c.css("display", a ? "block" : "none"));
            }
        };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1",
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1",
                },
                gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
            },
        },
        proto: {
            initIframe: function () {
                b.types.push(P),
                    w("BeforeChange", function (a, b, c) {
                        b !== c && (b === P ? R() : c === P && R(!0));
                    }),
                    w(h + "." + P, function () {
                        R();
                    });
            },
            getIframe: function (c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function () {
                    return e.indexOf(this.index) > -1
                        ? (this.id &&
                              (e =
                                  "string" == typeof this.id
                                      ? e.substr(
                                            e.lastIndexOf(this.id) +
                                                this.id.length,
                                            e.length
                                        )
                                      : this.id.call(this, e)),
                          (e = this.src.replace("%id%", e)),
                          !1)
                        : void 0;
                });
                var g = {};
                return (
                    f.srcAction && (g[f.srcAction] = e),
                    b._parseMarkup(d, g, c),
                    b.updateStatus("ready"),
                    d
                );
            },
        },
    });
    var S = function (a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a;
        },
        T = function (a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup:
                '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%",
        },
        proto: {
            initGallery: function () {
                var c = b.st.gallery,
                    e = ".mfp-gallery";
                return (
                    (b.direction = !0),
                    c && c.enabled
                        ? ((f += " mfp-gallery"),
                          w(m + e, function () {
                              c.navigateByImgClick &&
                                  b.wrap.on(
                                      "click" + e,
                                      ".mfp-img",
                                      function () {
                                          return b.items.length > 1
                                              ? (b.next(), !1)
                                              : void 0;
                                      }
                                  ),
                                  d.on("keydown" + e, function (a) {
                                      37 === a.keyCode
                                          ? b.prev()
                                          : 39 === a.keyCode && b.next();
                                  });
                          }),
                          w("UpdateStatus" + e, function (a, c) {
                              c.text &&
                                  (c.text = T(
                                      c.text,
                                      b.currItem.index,
                                      b.items.length
                                  ));
                          }),
                          w(l + e, function (a, d, e, f) {
                              var g = b.items.length;
                              e.counter =
                                  g > 1 ? T(c.tCounter, f.index, g) : "";
                          }),
                          w("BuildControls" + e, function () {
                              if (
                                  b.items.length > 1 &&
                                  c.arrows &&
                                  !b.arrowLeft
                              ) {
                                  var d = c.arrowMarkup,
                                      e = (b.arrowLeft = a(
                                          d
                                              .replace(/%title%/gi, c.tPrev)
                                              .replace(/%dir%/gi, "left")
                                      ).addClass(s)),
                                      f = (b.arrowRight = a(
                                          d
                                              .replace(/%title%/gi, c.tNext)
                                              .replace(/%dir%/gi, "right")
                                      ).addClass(s));
                                  e.click(function () {
                                      b.prev();
                                  }),
                                      f.click(function () {
                                          b.next();
                                      }),
                                      b.container.append(e.add(f));
                              }
                          }),
                          w(n + e, function () {
                              b._preloadTimeout &&
                                  clearTimeout(b._preloadTimeout),
                                  (b._preloadTimeout = setTimeout(function () {
                                      b.preloadNearbyImages(),
                                          (b._preloadTimeout = null);
                                  }, 16));
                          }),
                          void w(h + e, function () {
                              d.off(e),
                                  b.wrap.off("click" + e),
                                  (b.arrowRight = b.arrowLeft = null);
                          }))
                        : !1
                );
            },
            next: function () {
                (b.direction = !0),
                    (b.index = S(b.index + 1)),
                    b.updateItemHTML();
            },
            prev: function () {
                (b.direction = !1),
                    (b.index = S(b.index - 1)),
                    b.updateItemHTML();
            },
            goTo: function (a) {
                (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
            },
            preloadNearbyImages: function () {
                var a,
                    c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++)
                    b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++)
                    b._preloadItem(b.index - a);
            },
            _preloadItem: function (c) {
                if (((c = S(c)), !b.items[c].preloaded)) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)),
                        y("LazyLoad", d),
                        "image" === d.type &&
                            (d.img = a('<img class="mfp-img" />')
                                .on("load.mfploader", function () {
                                    d.hasSize = !0;
                                })
                                .on("error.mfploader", function () {
                                    (d.hasSize = !0),
                                        (d.loadError = !0),
                                        y("LazyLoadError", d);
                                })
                                .attr("src", d.src)),
                        (d.preloaded = !0);
                }
            },
        },
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function (a) {
                return a.src.replace(/\.\w+$/, function (a) {
                    return "@2x" + a;
                });
            },
            ratio: 1,
        },
        proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina,
                        c = a.ratio;
                    (c = isNaN(c) ? c() : c),
                        c > 1 &&
                            (w("ImageHasSize." + U, function (a, b) {
                                b.img.css({
                                    "max-width": b.img[0].naturalWidth / c,
                                    width: "100%",
                                });
                            }),
                            w("ElementParse." + U, function (b, d) {
                                d.src = a.replaceSrc(d, c);
                            }));
                }
            },
        },
    }),
        A();
});

function _extends() {
    _extends =
        Object.assign ||
        function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends.apply(this, arguments);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */ (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : (e.Popper = t());
})(this, function () {
    "use strict";
    function e(e) {
        return e && "[object Function]" === {}.toString.call(e);
    }
    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = window.getComputedStyle(e, null);
        return t ? o[t] : o;
    }
    function o(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host;
    }
    function n(e) {
        if (!e || -1 !== ["HTML", "BODY", "#document"].indexOf(e.nodeName))
            return window.document.body;
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll)/.test(r + s + p) ? e : n(o(e));
    }
    function r(e) {
        var o = e && e.offsetParent,
            i = o && o.nodeName;
        return i && "BODY" !== i && "HTML" !== i
            ? -1 !== ["TD", "TABLE"].indexOf(o.nodeName) &&
              "static" === t(o, "position")
                ? r(o)
                : o
            : window.document.documentElement;
    }
    function p(e) {
        var t = e.nodeName;
        return "BODY" !== t && ("HTML" === t || r(e.firstElementChild) === e);
    }
    function s(e) {
        return null === e.parentNode ? e : s(e.parentNode);
    }
    function d(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType)
            return window.document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = o ? e : t,
            n = o ? t : e,
            a = document.createRange();
        a.setStart(i, 0), a.setEnd(n, 0);
        var l = a.commonAncestorContainer;
        if ((e !== l && t !== l) || i.contains(n)) return p(l) ? l : r(l);
        var f = s(e);
        return f.host ? d(f.host, t) : d(e, s(t).host);
    }
    function a(e) {
        var t =
                1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : "top",
            o = "top" === t ? "scrollTop" : "scrollLeft",
            i = e.nodeName;
        if ("BODY" === i || "HTML" === i) {
            var n = window.document.documentElement,
                r = window.document.scrollingElement || n;
            return r[o];
        }
        return e[o];
    }
    function l(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = a(t, "top"),
            n = a(t, "left"),
            r = o ? -1 : 1;
        return (
            (e.top += i * r),
            (e.bottom += i * r),
            (e.left += n * r),
            (e.right += n * r),
            e
        );
    }
    function f(e, t) {
        var o = "x" === t ? "Left" : "Top",
            i = "Left" == o ? "Right" : "Bottom";
        return (
            +e["border" + o + "Width"].split("px")[0] +
            +e["border" + i + "Width"].split("px")[0]
        );
    }
    function m(e, t, o, i) {
        return X(
            t["offset" + e],
            t["scroll" + e],
            o["client" + e],
            o["offset" + e],
            o["scroll" + e],
            ne()
                ? o["offset" + e] +
                      i["margin" + ("Height" === e ? "Top" : "Left")] +
                      i["margin" + ("Height" === e ? "Bottom" : "Right")]
                : 0
        );
    }
    function c() {
        var e = window.document.body,
            t = window.document.documentElement,
            o = ne() && window.getComputedStyle(t);
        return { height: m("Height", e, t, o), width: m("Width", e, t, o) };
    }
    function h(e) {
        return de({}, e, { right: e.left + e.width, bottom: e.top + e.height });
    }
    function g(e) {
        var o = {};
        if (ne())
            try {
                o = e.getBoundingClientRect();
                var i = a(e, "top"),
                    n = a(e, "left");
                (o.top += i), (o.left += n), (o.bottom += i), (o.right += n);
            } catch (e) {}
        else o = e.getBoundingClientRect();
        var r = {
                left: o.left,
                top: o.top,
                width: o.right - o.left,
                height: o.bottom - o.top,
            },
            p = "HTML" === e.nodeName ? c() : {},
            s = p.width || e.clientWidth || r.right - r.left,
            d = p.height || e.clientHeight || r.bottom - r.top,
            l = e.offsetWidth - s,
            m = e.offsetHeight - d;
        if (l || m) {
            var g = t(e);
            (l -= f(g, "x")), (m -= f(g, "y")), (r.width -= l), (r.height -= m);
        }
        return h(r);
    }
    function u(e, o) {
        var i = ne(),
            r = "HTML" === o.nodeName,
            p = g(e),
            s = g(o),
            d = n(e),
            a = t(o),
            f = +a.borderTopWidth.split("px")[0],
            m = +a.borderLeftWidth.split("px")[0],
            c = h({
                top: p.top - s.top - f,
                left: p.left - s.left - m,
                width: p.width,
                height: p.height,
            });
        if (((c.marginTop = 0), (c.marginLeft = 0), !i && r)) {
            var u = +a.marginTop.split("px")[0],
                b = +a.marginLeft.split("px")[0];
            (c.top -= f - u),
                (c.bottom -= f - u),
                (c.left -= m - b),
                (c.right -= m - b),
                (c.marginTop = u),
                (c.marginLeft = b);
        }
        return (
            (i ? o.contains(d) : o === d && "BODY" !== d.nodeName) &&
                (c = l(c, o)),
            c
        );
    }
    function b(e) {
        var t = window.document.documentElement,
            o = u(e, t),
            i = X(t.clientWidth, window.innerWidth || 0),
            n = X(t.clientHeight, window.innerHeight || 0),
            r = a(t),
            p = a(t, "left"),
            s = {
                top: r - o.top + o.marginTop,
                left: p - o.left + o.marginLeft,
                width: i,
                height: n,
            };
        return h(s);
    }
    function y(e) {
        var i = e.nodeName;
        return "BODY" === i || "HTML" === i
            ? !1
            : "fixed" === t(e, "position") || y(o(e));
    }
    function w(e, t, i, r) {
        var p = { top: 0, left: 0 },
            s = d(e, t);
        if ("viewport" === r) p = b(s);
        else {
            var a;
            "scrollParent" === r
                ? ((a = n(o(e))),
                  "BODY" === a.nodeName &&
                      (a = window.document.documentElement))
                : "window" === r
                ? (a = window.document.documentElement)
                : (a = r);
            var l = u(a, s);
            if ("HTML" === a.nodeName && !y(s)) {
                var f = c(),
                    m = f.height,
                    h = f.width;
                (p.top += l.top - l.marginTop),
                    (p.bottom = m + l.top),
                    (p.left += l.left - l.marginLeft),
                    (p.right = h + l.left);
            } else p = l;
        }
        return (p.left += i), (p.top += i), (p.right -= i), (p.bottom -= i), p;
    }
    function E(e) {
        var t = e.width,
            o = e.height;
        return t * o;
    }
    function v(e, t, o, i, n) {
        var r =
            5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto")) return e;
        var p = w(o, i, r, n),
            s = {
                top: { width: p.width, height: t.top - p.top },
                right: { width: p.right - t.right, height: p.height },
                bottom: { width: p.width, height: p.bottom - t.bottom },
                left: { width: t.left - p.left, height: p.height },
            },
            d = Object.keys(s)
                .map(function (e) {
                    return de({ key: e }, s[e], { area: E(s[e]) });
                })
                .sort(function (e, t) {
                    return t.area - e.area;
                }),
            a = d.filter(function (e) {
                var t = e.width,
                    i = e.height;
                return t >= o.clientWidth && i >= o.clientHeight;
            }),
            l = 0 < a.length ? a[0].key : d[0].key,
            f = e.split("-")[1];
        return l + (f ? "-" + f : "");
    }
    function x(e, t, o) {
        var i = d(t, o);
        return u(o, i);
    }
    function O(e) {
        var t = window.getComputedStyle(e),
            o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
            n = { width: e.offsetWidth + i, height: e.offsetHeight + o };
        return n;
    }
    function L(e) {
        var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
        return e.replace(/left|right|bottom|top/g, function (e) {
            return t[e];
        });
    }
    function S(e, t, o) {
        o = o.split("-")[0];
        var i = O(e),
            n = { width: i.width, height: i.height },
            r = -1 !== ["right", "left"].indexOf(o),
            p = r ? "top" : "left",
            s = r ? "left" : "top",
            d = r ? "height" : "width",
            a = r ? "width" : "height";
        return (
            (n[p] = t[p] + t[d] / 2 - i[d] / 2),
            (n[s] = o === s ? t[s] - i[a] : t[L(s)]),
            n
        );
    }
    function T(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0];
    }
    function C(e, t, o) {
        if (Array.prototype.findIndex)
            return e.findIndex(function (e) {
                return e[t] === o;
            });
        var i = T(e, function (e) {
            return e[t] === o;
        });
        return e.indexOf(i);
    }
    function N(t, o, i) {
        var n = void 0 === i ? t : t.slice(0, C(t, "name", i));
        return (
            n.forEach(function (t) {
                t.function &&
                    console.warn(
                        "`modifier.function` is deprecated, use `modifier.fn`!"
                    );
                var i = t.function || t.fn;
                t.enabled &&
                    e(i) &&
                    ((o.offsets.popper = h(o.offsets.popper)),
                    (o.offsets.reference = h(o.offsets.reference)),
                    (o = i(o, t)));
            }),
            o
        );
    }
    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {},
            };
            (e.offsets.reference = x(this.state, this.popper, this.reference)),
                (e.placement = v(
                    this.options.placement,
                    e.offsets.reference,
                    this.popper,
                    this.reference,
                    this.options.modifiers.flip.boundariesElement,
                    this.options.modifiers.flip.padding
                )),
                (e.originalPlacement = e.placement),
                (e.offsets.popper = S(
                    this.popper,
                    e.offsets.reference,
                    e.placement
                )),
                (e.offsets.popper.position = "absolute"),
                (e = N(this.modifiers, e)),
                this.state.isCreated
                    ? this.options.onUpdate(e)
                    : ((this.state.isCreated = !0), this.options.onCreate(e));
        }
    }
    function W(e, t) {
        return e.some(function (e) {
            var o = e.name,
                i = e.enabled;
            return i && o === t;
        });
    }
    function B(e) {
        for (
            var t = [!1, "ms", "Webkit", "Moz", "O"],
                o = e.charAt(0).toUpperCase() + e.slice(1),
                n = 0;
            n < t.length - 1;
            n++
        ) {
            var i = t[n],
                r = i ? "" + i + o : e;
            if ("undefined" != typeof window.document.body.style[r]) return r;
        }
        return null;
    }
    function P() {
        return (
            (this.state.isDestroyed = !0),
            W(this.modifiers, "applyStyle") &&
                (this.popper.removeAttribute("x-placement"),
                (this.popper.style.left = ""),
                (this.popper.style.position = ""),
                (this.popper.style.top = ""),
                (this.popper.style[B("transform")] = "")),
            this.disableEventListeners(),
            this.options.removeOnDestroy &&
                this.popper.parentNode.removeChild(this.popper),
            this
        );
    }
    function D(e, t, o, i) {
        var r = "BODY" === e.nodeName,
            p = r ? window : e;
        p.addEventListener(t, o, { passive: !0 }),
            r || D(n(p.parentNode), t, o, i),
            i.push(p);
    }
    function H(e, t, o, i) {
        (o.updateBound = i),
            window.addEventListener("resize", o.updateBound, { passive: !0 });
        var r = n(e);
        return (
            D(r, "scroll", o.updateBound, o.scrollParents),
            (o.scrollElement = r),
            (o.eventsEnabled = !0),
            o
        );
    }
    function A() {
        this.state.eventsEnabled ||
            (this.state = H(
                this.reference,
                this.options,
                this.state,
                this.scheduleUpdate
            ));
    }
    function M(e, t) {
        return (
            window.removeEventListener("resize", t.updateBound),
            t.scrollParents.forEach(function (e) {
                e.removeEventListener("scroll", t.updateBound);
            }),
            (t.updateBound = null),
            (t.scrollParents = []),
            (t.scrollElement = null),
            (t.eventsEnabled = !1),
            t
        );
    }
    function I() {
        this.state.eventsEnabled &&
            (window.cancelAnimationFrame(this.scheduleUpdate),
            (this.state = M(this.reference, this.state)));
    }
    function R(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
    }
    function U(e, t) {
        Object.keys(t).forEach(function (o) {
            var i = "";
            -1 !==
                ["width", "height", "top", "right", "bottom", "left"].indexOf(
                    o
                ) &&
                R(t[o]) &&
                (i = "px"),
                (e.style[o] = t[o] + i);
        });
    }
    function Y(e, t) {
        Object.keys(t).forEach(function (o) {
            var i = t[o];
            !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
        });
    }
    function F(e, t, o) {
        var i = T(e, function (e) {
                var o = e.name;
                return o === t;
            }),
            n =
                !!i &&
                e.some(function (e) {
                    return e.name === o && e.enabled && e.order < i.order;
                });
        if (!n) {
            var r = "`" + t + "`";
            console.warn(
                "`" +
                    o +
                    "`" +
                    " modifier is required by " +
                    r +
                    " modifier in order to work, be sure to include it before " +
                    r +
                    "!"
            );
        }
        return n;
    }
    function j(e) {
        return "end" === e ? "start" : "start" === e ? "end" : e;
    }
    function K(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = le.indexOf(e),
            i = le.slice(o + 1).concat(le.slice(0, o));
        return t ? i.reverse() : i;
    }
    function q(e, t, o, i) {
        var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +n[1],
            p = n[2];
        if (!r) return e;
        if (0 === p.indexOf("%")) {
            var s;
            switch (p) {
                case "%p":
                    s = o;
                    break;
                case "%":
                case "%r":
                default:
                    s = i;
            }
            var d = h(s);
            return (d[t] / 100) * r;
        }
        if ("vh" === p || "vw" === p) {
            var a;
            return (
                (a =
                    "vh" === p
                        ? X(
                              document.documentElement.clientHeight,
                              window.innerHeight || 0
                          )
                        : X(
                              document.documentElement.clientWidth,
                              window.innerWidth || 0
                          )),
                (a / 100) * r
            );
        }
        return r;
    }
    function G(e, t, o, i) {
        var n = [0, 0],
            r = -1 !== ["right", "left"].indexOf(i),
            p = e.split(/(\+|\-)/).map(function (e) {
                return e.trim();
            }),
            s = p.indexOf(
                T(p, function (e) {
                    return -1 !== e.search(/,|\s/);
                })
            );
        p[s] &&
            -1 === p[s].indexOf(",") &&
            console.warn(
                "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
            );
        var d = /\s*,\s*|\s+/,
            a =
                -1 === s
                    ? [p]
                    : [
                          p.slice(0, s).concat([p[s].split(d)[0]]),
                          [p[s].split(d)[1]].concat(p.slice(s + 1)),
                      ];
        return (
            (a = a.map(function (e, i) {
                var n = (1 === i ? !r : r) ? "height" : "width",
                    p = !1;
                return e
                    .reduce(function (e, t) {
                        return "" === e[e.length - 1] &&
                            -1 !== ["+", "-"].indexOf(t)
                            ? ((e[e.length - 1] = t), (p = !0), e)
                            : p
                            ? ((e[e.length - 1] += t), (p = !1), e)
                            : e.concat(t);
                    }, [])
                    .map(function (e) {
                        return q(e, n, t, o);
                    });
            })),
            a.forEach(function (e, t) {
                e.forEach(function (o, i) {
                    R(o) && (n[t] += o * ("-" === e[i - 1] ? -1 : 1));
                });
            }),
            n
        );
    }
    function z(e, t) {
        var o,
            i = t.offset,
            n = e.placement,
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = n.split("-")[0];
        return (
            (o = R(+i) ? [+i, 0] : G(i, p, s, d)),
            "left" === d
                ? ((p.top += o[0]), (p.left -= o[1]))
                : "right" === d
                ? ((p.top += o[0]), (p.left += o[1]))
                : "top" === d
                ? ((p.left += o[0]), (p.top -= o[1]))
                : "bottom" === d && ((p.left += o[0]), (p.top += o[1])),
            (e.popper = p),
            e
        );
    }
    for (
        var V = Math.min,
            _ = Math.floor,
            X = Math.max,
            Q = ["native code", "[object MutationObserverConstructor]"],
            J = function (e) {
                return Q.some(function (t) {
                    return -1 < (e || "").toString().indexOf(t);
                });
            },
            Z = "undefined" != typeof window,
            $ = ["Edge", "Trident", "Firefox"],
            ee = 0,
            te = 0;
        te < $.length;
        te += 1
    )
        if (Z && 0 <= navigator.userAgent.indexOf($[te])) {
            ee = 1;
            break;
        }
    var i,
        oe = Z && J(window.MutationObserver),
        ie = oe
            ? function (e) {
                  var t = !1,
                      o = 0,
                      i = document.createElement("span"),
                      n = new MutationObserver(function () {
                          e(), (t = !1);
                      });
                  return (
                      n.observe(i, { attributes: !0 }),
                      function () {
                          t || ((t = !0), i.setAttribute("x-index", o), ++o);
                      }
                  );
              }
            : function (e) {
                  var t = !1;
                  return function () {
                      t ||
                          ((t = !0),
                          setTimeout(function () {
                              (t = !1), e();
                          }, ee));
                  };
              },
        ne = function () {
            return (
                void 0 == i &&
                    (i = -1 !== navigator.appVersion.indexOf("MSIE 10")),
                i
            );
        },
        re = function (e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
        },
        pe = (function () {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++)
                    (o = t[n]),
                        (o.enumerable = o.enumerable || !1),
                        (o.configurable = !0),
                        "value" in o && (o.writable = !0),
                        Object.defineProperty(e, o.key, o);
            }
            return function (t, o, i) {
                return o && e(t.prototype, o), i && e(t, i), t;
            };
        })(),
        se = function (e, t, o) {
            return (
                t in e
                    ? Object.defineProperty(e, t, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                      })
                    : (e[t] = o),
                e
            );
        },
        de =
            Object.assign ||
            function (e) {
                for (var t, o = 1; o < arguments.length; o++)
                    for (var i in ((t = arguments[o]), t))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                            (e[i] = t[i]);
                return e;
            },
        ae = [
            "auto-start",
            "auto",
            "auto-end",
            "top-start",
            "top",
            "top-end",
            "right-start",
            "right",
            "right-end",
            "bottom-end",
            "bottom",
            "bottom-start",
            "left-end",
            "left",
            "left-start",
        ],
        le = ae.slice(3),
        fe = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise",
        },
        me = (function () {
            function t(o, i) {
                var n = this,
                    r =
                        2 < arguments.length && void 0 !== arguments[2]
                            ? arguments[2]
                            : {};
                re(this, t),
                    (this.scheduleUpdate = function () {
                        return requestAnimationFrame(n.update);
                    }),
                    (this.update = ie(this.update.bind(this))),
                    (this.options = de({}, t.Defaults, r)),
                    (this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: [],
                    }),
                    (this.reference = o.jquery ? o[0] : o),
                    (this.popper = i.jquery ? i[0] : i),
                    (this.options.modifiers = {}),
                    Object.keys(
                        de({}, t.Defaults.modifiers, r.modifiers)
                    ).forEach(function (e) {
                        n.options.modifiers[e] = de(
                            {},
                            t.Defaults.modifiers[e] || {},
                            r.modifiers ? r.modifiers[e] : {}
                        );
                    }),
                    (this.modifiers = Object.keys(this.options.modifiers)
                        .map(function (e) {
                            return de({ name: e }, n.options.modifiers[e]);
                        })
                        .sort(function (e, t) {
                            return e.order - t.order;
                        })),
                    this.modifiers.forEach(function (t) {
                        t.enabled &&
                            e(t.onLoad) &&
                            t.onLoad(
                                n.reference,
                                n.popper,
                                n.options,
                                t,
                                n.state
                            );
                    }),
                    this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(),
                    (this.state.eventsEnabled = p);
            }
            return (
                pe(t, [
                    {
                        key: "update",
                        value: function () {
                            return k.call(this);
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            return P.call(this);
                        },
                    },
                    {
                        key: "enableEventListeners",
                        value: function () {
                            return A.call(this);
                        },
                    },
                    {
                        key: "disableEventListeners",
                        value: function () {
                            return I.call(this);
                        },
                    },
                ]),
                t
            );
        })();
    return (
        (me.Utils = (
            "undefined" == typeof window ? global : window
        ).PopperUtils),
        (me.placements = ae),
        (me.Defaults = {
            placement: "bottom",
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function () {},
            onUpdate: function () {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function (e) {
                        var t = e.placement,
                            o = t.split("-")[0],
                            i = t.split("-")[1];
                        if (i) {
                            var n = e.offsets,
                                r = n.reference,
                                p = n.popper,
                                s = -1 !== ["bottom", "top"].indexOf(o),
                                d = s ? "left" : "top",
                                a = s ? "width" : "height",
                                l = {
                                    start: se({}, d, r[d]),
                                    end: se({}, d, r[d] + r[a] - p[a]),
                                };
                            e.offsets.popper = de({}, p, l[i]);
                        }
                        return e;
                    },
                },
                offset: { order: 200, enabled: !0, fn: z, offset: 0 },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function (e, t) {
                        var o = t.boundariesElement || r(e.instance.popper);
                        e.instance.reference === o && (o = r(o));
                        var i = w(
                            e.instance.popper,
                            e.instance.reference,
                            t.padding,
                            o
                        );
                        t.boundaries = i;
                        var n = t.priority,
                            p = e.offsets.popper,
                            s = {
                                primary: function (e) {
                                    var o = p[e];
                                    return (
                                        p[e] < i[e] &&
                                            !t.escapeWithReference &&
                                            (o = X(p[e], i[e])),
                                        se({}, e, o)
                                    );
                                },
                                secondary: function (e) {
                                    var o = "right" === e ? "left" : "top",
                                        n = p[o];
                                    return (
                                        p[e] > i[e] &&
                                            !t.escapeWithReference &&
                                            (n = V(
                                                p[o],
                                                i[e] -
                                                    ("right" === e
                                                        ? p.width
                                                        : p.height)
                                            )),
                                        se({}, o, n)
                                    );
                                },
                            };
                        return (
                            n.forEach(function (e) {
                                var t =
                                    -1 === ["left", "top"].indexOf(e)
                                        ? "secondary"
                                        : "primary";
                                p = de({}, p, s[t](e));
                            }),
                            (e.offsets.popper = p),
                            e
                        );
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent",
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function (e) {
                        var t = e.offsets,
                            o = t.popper,
                            i = t.reference,
                            n = e.placement.split("-")[0],
                            r = _,
                            p = -1 !== ["top", "bottom"].indexOf(n),
                            s = p ? "right" : "bottom",
                            d = p ? "left" : "top",
                            a = p ? "width" : "height";
                        return (
                            o[s] < r(i[d]) &&
                                (e.offsets.popper[d] = r(i[d]) - o[a]),
                            o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])),
                            e
                        );
                    },
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function (e, o) {
                        if (!F(e.instance.modifiers, "arrow", "keepTogether"))
                            return e;
                        var i = o.element;
                        if ("string" == typeof i) {
                            if (((i = e.instance.popper.querySelector(i)), !i))
                                return e;
                        } else if (!e.instance.popper.contains(i))
                            return (
                                console.warn(
                                    "WARNING: `arrow.element` must be child of its popper element!"
                                ),
                                e
                            );
                        var n = e.placement.split("-")[0],
                            r = e.offsets,
                            p = r.popper,
                            s = r.reference,
                            d = -1 !== ["left", "right"].indexOf(n),
                            a = d ? "height" : "width",
                            l = d ? "Top" : "Left",
                            f = l.toLowerCase(),
                            m = d ? "left" : "top",
                            c = d ? "bottom" : "right",
                            g = O(i)[a];
                        s[c] - g < p[f] &&
                            (e.offsets.popper[f] -= p[f] - (s[c] - g)),
                            s[f] + g > p[c] &&
                                (e.offsets.popper[f] += s[f] + g - p[c]);
                        var u = s[f] + s[a] / 2 - g / 2,
                            b = t(e.instance.popper, "margin" + l).replace(
                                "px",
                                ""
                            ),
                            y = u - h(e.offsets.popper)[f] - b;
                        return (
                            (y = X(V(p[a] - g, y), 0)),
                            (e.arrowElement = i),
                            (e.offsets.arrow = {}),
                            (e.offsets.arrow[f] = Math.round(y)),
                            (e.offsets.arrow[m] = ""),
                            e
                        );
                    },
                    element: "[x-arrow]",
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function (e, t) {
                        if (W(e.instance.modifiers, "inner")) return e;
                        if (e.flipped && e.placement === e.originalPlacement)
                            return e;
                        var o = w(
                                e.instance.popper,
                                e.instance.reference,
                                t.padding,
                                t.boundariesElement
                            ),
                            i = e.placement.split("-")[0],
                            n = L(i),
                            r = e.placement.split("-")[1] || "",
                            p = [];
                        switch (t.behavior) {
                            case fe.FLIP:
                                p = [i, n];
                                break;
                            case fe.CLOCKWISE:
                                p = K(i);
                                break;
                            case fe.COUNTERCLOCKWISE:
                                p = K(i, !0);
                                break;
                            default:
                                p = t.behavior;
                        }
                        return (
                            p.forEach(function (s, d) {
                                if (i !== s || p.length === d + 1) return e;
                                (i = e.placement.split("-")[0]), (n = L(i));
                                var a = e.offsets.popper,
                                    l = e.offsets.reference,
                                    f = _,
                                    m =
                                        ("left" === i &&
                                            f(a.right) > f(l.left)) ||
                                        ("right" === i &&
                                            f(a.left) < f(l.right)) ||
                                        ("top" === i &&
                                            f(a.bottom) > f(l.top)) ||
                                        ("bottom" === i &&
                                            f(a.top) < f(l.bottom)),
                                    c = f(a.left) < f(o.left),
                                    h = f(a.right) > f(o.right),
                                    g = f(a.top) < f(o.top),
                                    u = f(a.bottom) > f(o.bottom),
                                    b =
                                        ("left" === i && c) ||
                                        ("right" === i && h) ||
                                        ("top" === i && g) ||
                                        ("bottom" === i && u),
                                    y = -1 !== ["top", "bottom"].indexOf(i),
                                    w =
                                        !!t.flipVariations &&
                                        ((y && "start" === r && c) ||
                                            (y && "end" === r && h) ||
                                            (!y && "start" === r && g) ||
                                            (!y && "end" === r && u));
                                (m || b || w) &&
                                    ((e.flipped = !0),
                                    (m || b) && (i = p[d + 1]),
                                    w && (r = j(r)),
                                    (e.placement = i + (r ? "-" + r : "")),
                                    (e.offsets.popper = de(
                                        {},
                                        e.offsets.popper,
                                        S(
                                            e.instance.popper,
                                            e.offsets.reference,
                                            e.placement
                                        )
                                    )),
                                    (e = N(e.instance.modifiers, e, "flip")));
                            }),
                            e
                        );
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function (e) {
                        var t = e.placement,
                            o = t.split("-")[0],
                            i = e.offsets,
                            n = i.popper,
                            r = i.reference,
                            p = -1 !== ["left", "right"].indexOf(o),
                            s = -1 === ["top", "left"].indexOf(o);
                        return (
                            (n[p ? "left" : "top"] =
                                r[o] - (s ? n[p ? "width" : "height"] : 0)),
                            (e.placement = L(t)),
                            (e.offsets.popper = h(n)),
                            e
                        );
                    },
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function (e) {
                        if (!F(e.instance.modifiers, "hide", "preventOverflow"))
                            return e;
                        var t = e.offsets.reference,
                            o = T(e.instance.modifiers, function (e) {
                                return "preventOverflow" === e.name;
                            }).boundaries;
                        if (
                            t.bottom < o.top ||
                            t.left > o.right ||
                            t.top > o.bottom ||
                            t.right < o.left
                        ) {
                            if (!0 === e.hide) return e;
                            (e.hide = !0),
                                (e.attributes["x-out-of-boundaries"] = "");
                        } else {
                            if (!1 === e.hide) return e;
                            (e.hide = !1),
                                (e.attributes["x-out-of-boundaries"] = !1);
                        }
                        return e;
                    },
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function (e, t) {
                        var o = t.x,
                            i = t.y,
                            n = e.offsets.popper,
                            p = T(e.instance.modifiers, function (e) {
                                return "applyStyle" === e.name;
                            }).gpuAcceleration;
                        void 0 !== p &&
                            console.warn(
                                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                            );
                        var s,
                            d,
                            a = void 0 === p ? t.gpuAcceleration : p,
                            l = r(e.instance.popper),
                            f = g(l),
                            m = { position: n.position },
                            c = {
                                left: _(n.left),
                                top: _(n.top),
                                bottom: _(n.bottom),
                                right: _(n.right),
                            },
                            h = "bottom" === o ? "top" : "bottom",
                            u = "right" === i ? "left" : "right",
                            b = B("transform");
                        if (
                            ((d = "bottom" == h ? -f.height + c.bottom : c.top),
                            (s = "right" == u ? -f.width + c.right : c.left),
                            a && b)
                        )
                            (m[b] = "translate3d(" + s + "px, " + d + "px, 0)"),
                                (m[h] = 0),
                                (m[u] = 0),
                                (m.willChange = "transform");
                        else {
                            var y = "bottom" == h ? -1 : 1,
                                w = "right" == u ? -1 : 1;
                            (m[h] = d * y),
                                (m[u] = s * w),
                                (m.willChange = h + ", " + u);
                        }
                        var E = { "x-placement": e.placement };
                        return (
                            (e.attributes = de({}, E, e.attributes)),
                            (e.styles = de({}, m, e.styles)),
                            (e.arrowStyles = de(
                                {},
                                e.offsets.arrow,
                                e.arrowStyles
                            )),
                            e
                        );
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right",
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function (e) {
                        return (
                            U(e.instance.popper, e.styles),
                            Y(e.instance.popper, e.attributes),
                            e.arrowElement &&
                                Object.keys(e.arrowStyles).length &&
                                U(e.arrowElement, e.arrowStyles),
                            e
                        );
                    },
                    onLoad: function (e, t, o, i, n) {
                        var r = x(n, t, e),
                            p = v(
                                o.placement,
                                r,
                                t,
                                e,
                                o.modifiers.flip.boundariesElement,
                                o.modifiers.flip.padding
                            );
                        return (
                            t.setAttribute("x-placement", p),
                            U(t, { position: "absolute" }),
                            o
                        );
                    },
                    gpuAcceleration: void 0,
                },
            },
        }),
        me
    );
});

/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */
var pJS = function (e, t) {
    var a = document.querySelector("#" + e + " > .particles-js-canvas-el");
    this.pJS = {
        fps_limit: 0,
        canvas: { el: a, w: a.offsetWidth, h: a.offsetHeight },
        particles: {
            number: { value: 400, density: { enable: !0, value_area: 800 } },
            color: { value: "#fff" },
            shape: {
                type: "circle",
                stroke: { width: 0, color: "#ff0000" },
                polygon: { nb_sides: 5 },
                image: { src: "", width: 100, height: 100 },
            },
            opacity: {
                value: 1,
                random: !1,
                anim: { enable: !1, speed: 2, opacity_min: 0, sync: !1 },
            },
            size: {
                value: 20,
                random: !1,
                anim: { enable: !1, speed: 20, size_min: 0, sync: !1 },
            },
            line_linked: {
                enable: !0,
                distance: 100,
                color: "#fff",
                opacity: 1,
                width: 1,
            },
            move: {
                enable: !0,
                speed: 2,
                direction: "none",
                random: !1,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: { enable: !1, rotateX: 3e3, rotateY: 3e3 },
            },
            array: [],
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: !0, mode: "grab" },
                onclick: { enable: !0, mode: "push" },
                resize: !0,
            },
            modes: {
                grab: { distance: 100, line_linked: { opacity: 1 } },
                bubble: { distance: 200, size: 80, duration: 0.4 },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
            },
            mouse: {},
        },
        retina_detect: !1,
        fn: { interact: {}, modes: {}, vendors: {} },
        tmp: {},
    };
    var i = this.pJS;
    t && Object.deepExtend(i, t),
        (i.tmp.obj = {
            size_value: i.particles.size.value,
            size_anim_speed: i.particles.size.anim.speed,
            move_speed: i.particles.move.speed,
            line_linked_distance: i.particles.line_linked.distance,
            line_linked_width: i.particles.line_linked.width,
            mode_grab_distance: i.interactivity.modes.grab.distance,
            mode_bubble_distance: i.interactivity.modes.bubble.distance,
            mode_bubble_size: i.interactivity.modes.bubble.size,
            mode_repulse_distance: i.interactivity.modes.repulse.distance,
        }),
        (i.fn.retinaInit = function () {
            i.retina_detect && window.devicePixelRatio > 1
                ? ((i.canvas.pxratio = window.devicePixelRatio),
                  (i.tmp.retina = !0))
                : ((i.canvas.pxratio = 1), (i.tmp.retina = !1)),
                (i.canvas.w = i.canvas.el.offsetWidth * i.canvas.pxratio),
                (i.canvas.h = i.canvas.el.offsetHeight * i.canvas.pxratio),
                (i.particles.size.value =
                    i.tmp.obj.size_value * i.canvas.pxratio),
                (i.particles.size.anim.speed =
                    i.tmp.obj.size_anim_speed * i.canvas.pxratio),
                (i.particles.move.speed =
                    i.tmp.obj.move_speed * i.canvas.pxratio),
                (i.particles.line_linked.distance =
                    i.tmp.obj.line_linked_distance * i.canvas.pxratio),
                (i.interactivity.modes.grab.distance =
                    i.tmp.obj.mode_grab_distance * i.canvas.pxratio),
                (i.interactivity.modes.bubble.distance =
                    i.tmp.obj.mode_bubble_distance * i.canvas.pxratio),
                (i.particles.line_linked.width =
                    i.tmp.obj.line_linked_width * i.canvas.pxratio),
                (i.interactivity.modes.bubble.size =
                    i.tmp.obj.mode_bubble_size * i.canvas.pxratio),
                (i.interactivity.modes.repulse.distance =
                    i.tmp.obj.mode_repulse_distance * i.canvas.pxratio);
        }),
        (i.fn.canvasInit = function () {
            i.canvas.ctx = i.canvas.el.getContext("2d");
        }),
        (i.fn.canvasSize = function () {
            (i.canvas.el.width = i.canvas.w),
                (i.canvas.el.height = i.canvas.h),
                i &&
                    i.interactivity.events.resize &&
                    window.addEventListener("resize", function () {
                        (i.canvas.w = i.canvas.el.offsetWidth),
                            (i.canvas.h = i.canvas.el.offsetHeight),
                            i.tmp.retina &&
                                ((i.canvas.w *= i.canvas.pxratio),
                                (i.canvas.h *= i.canvas.pxratio)),
                            (i.canvas.el.width = i.canvas.w),
                            (i.canvas.el.height = i.canvas.h),
                            i.particles.move.enable ||
                                (i.fn.particlesEmpty(),
                                i.fn.particlesCreate(),
                                i.fn.particlesDraw(),
                                i.fn.vendors.densityAutoParticles()),
                            i.fn.vendors.densityAutoParticles();
                    });
        }),
        (i.fn.canvasPaint = function () {
            i.canvas.ctx.fillRect(0, 0, i.canvas.w, i.canvas.h);
        }),
        (i.fn.canvasClear = function () {
            i.canvas.ctx.clearRect(0, 0, i.canvas.w, i.canvas.h);
        }),
        (i.fn.particle = function (e, t, a) {
            if (
                ((this.radius =
                    (i.particles.size.random ? Math.random() : 1) *
                    i.particles.size.value),
                i.particles.size.anim.enable &&
                    ((this.size_status = !1),
                    (this.vs = i.particles.size.anim.speed / 100),
                    i.particles.size.anim.sync ||
                        (this.vs = this.vs * Math.random())),
                (this.x = a ? a.x : Math.random() * i.canvas.w),
                (this.y = a ? a.y : Math.random() * i.canvas.h),
                this.x > i.canvas.w - 2 * this.radius
                    ? (this.x = this.x - this.radius)
                    : this.x < 2 * this.radius &&
                      (this.x = this.x + this.radius),
                this.y > i.canvas.h - 2 * this.radius
                    ? (this.y = this.y - this.radius)
                    : this.y < 2 * this.radius &&
                      (this.y = this.y + this.radius),
                i.particles.move.bounce && i.fn.vendors.checkOverlap(this, a),
                (this.color = {}),
                "object" == typeof e.value)
            )
                if (e.value instanceof Array) {
                    var s =
                        e.value[
                            Math.floor(
                                Math.random() * i.particles.color.value.length
                            )
                        ];
                    this.color.rgb = hexToRgb(s);
                } else
                    null != e.value.r &&
                        null != e.value.g &&
                        null != e.value.b &&
                        (this.color.rgb = {
                            r: e.value.r,
                            g: e.value.g,
                            b: e.value.b,
                        }),
                        null != e.value.h &&
                            null != e.value.s &&
                            null != e.value.l &&
                            (this.color.hsl = {
                                h: e.value.h,
                                s: e.value.s,
                                l: e.value.l,
                            });
            else
                "random" == e.value
                    ? (this.color.rgb = {
                          r: Math.floor(256 * Math.random()) + 0,
                          g: Math.floor(256 * Math.random()) + 0,
                          b: Math.floor(256 * Math.random()) + 0,
                      })
                    : "string" == typeof e.value &&
                      ((this.color = e),
                      (this.color.rgb = hexToRgb(this.color.value)));
            (this.opacity =
                (i.particles.opacity.random ? Math.random() : 1) *
                i.particles.opacity.value),
                i.particles.opacity.anim.enable &&
                    ((this.opacity_status = !1),
                    (this.vo = i.particles.opacity.anim.speed / 100),
                    i.particles.opacity.anim.sync ||
                        (this.vo = this.vo * Math.random()));
            var n = {};
            switch (i.particles.move.direction) {
                case "top":
                    n = { x: 0, y: -1 };
                    break;
                case "top-right":
                    n = { x: 0.5, y: -0.5 };
                    break;
                case "right":
                    n = { x: 1, y: -0 };
                    break;
                case "bottom-right":
                    n = { x: 0.5, y: 0.5 };
                    break;
                case "bottom":
                    n = { x: 0, y: 1 };
                    break;
                case "bottom-left":
                    n = { x: -0.5, y: 1 };
                    break;
                case "left":
                    n = { x: -1, y: 0 };
                    break;
                case "top-left":
                    n = { x: -0.5, y: -0.5 };
                    break;
                default:
                    n = { x: 0, y: 0 };
            }
            i.particles.move.straight
                ? ((this.vx = n.x),
                  (this.vy = n.y),
                  i.particles.move.random &&
                      ((this.vx = this.vx * Math.random()),
                      (this.vy = this.vy * Math.random())))
                : ((this.vx = n.x + Math.random() - 0.5),
                  (this.vy = n.y + Math.random() - 0.5)),
                (this.vx_i = this.vx),
                (this.vy_i = this.vy);
            var r = i.particles.shape.type;
            if ("object" == typeof r) {
                if (r instanceof Array) {
                    var c = r[Math.floor(Math.random() * r.length)];
                    this.shape = c;
                }
            } else this.shape = r;
            if ("image" == this.shape) {
                var o = i.particles.shape;
                (this.img = {
                    src: o.image.src,
                    ratio: o.image.width / o.image.height,
                }),
                    this.img.ratio || (this.img.ratio = 1),
                    "svg" == i.tmp.img_type &&
                        null != i.tmp.source_svg &&
                        (i.fn.vendors.createSvgImg(this),
                        i.tmp.pushing && (this.img.loaded = !1));
            }
        }),
        (i.fn.particle.prototype.draw = function () {
            var e = this;
            if (null != e.radius_bubble) var t = e.radius_bubble;
            else t = e.radius;
            if (null != e.opacity_bubble) var a = e.opacity_bubble;
            else a = e.opacity;
            if (e.color.rgb)
                var s =
                    "rgba(" +
                    e.color.rgb.r +
                    "," +
                    e.color.rgb.g +
                    "," +
                    e.color.rgb.b +
                    "," +
                    a +
                    ")";
            else
                s =
                    "hsla(" +
                    e.color.hsl.h +
                    "," +
                    e.color.hsl.s +
                    "%," +
                    e.color.hsl.l +
                    "%," +
                    a +
                    ")";
            switch (
                ((i.canvas.ctx.fillStyle = s),
                i.canvas.ctx.beginPath(),
                e.shape)
            ) {
                case "circle":
                    i.canvas.ctx.arc(e.x, e.y, t, 0, 2 * Math.PI, !1);
                    break;
                case "edge":
                    i.canvas.ctx.rect(e.x - t, e.y - t, 2 * t, 2 * t);
                    break;
                case "triangle":
                    i.fn.vendors.drawShape(
                        i.canvas.ctx,
                        e.x - t,
                        e.y + t / 1.66,
                        2 * t,
                        3,
                        2
                    );
                    break;
                case "polygon":
                    i.fn.vendors.drawShape(
                        i.canvas.ctx,
                        e.x - t / (i.particles.shape.polygon.nb_sides / 3.5),
                        e.y - t / 0.76,
                        (2.66 * t) / (i.particles.shape.polygon.nb_sides / 3),
                        i.particles.shape.polygon.nb_sides,
                        1
                    );
                    break;
                case "star":
                    i.fn.vendors.drawShape(
                        i.canvas.ctx,
                        e.x -
                            (2 * t) / (i.particles.shape.polygon.nb_sides / 4),
                        e.y - t / 1.52,
                        (2 * t * 2.66) /
                            (i.particles.shape.polygon.nb_sides / 3),
                        i.particles.shape.polygon.nb_sides,
                        2
                    );
                    break;
                case "image":
                    if ("svg" == i.tmp.img_type) var n = e.img.obj;
                    else n = i.tmp.img_obj;
                    n &&
                        i.canvas.ctx.drawImage(
                            n,
                            e.x - t,
                            e.y - t,
                            2 * t,
                            (2 * t) / e.img.ratio
                        );
            }
            i.canvas.ctx.closePath(),
                i.particles.shape.stroke.width > 0 &&
                    ((i.canvas.ctx.strokeStyle =
                        i.particles.shape.stroke.color),
                    (i.canvas.ctx.lineWidth = i.particles.shape.stroke.width),
                    i.canvas.ctx.stroke()),
                i.canvas.ctx.fill();
        }),
        (i.fn.particlesCreate = function () {
            for (var e = 0; e < i.particles.number.value; e++)
                i.particles.array.push(
                    new i.fn.particle(
                        i.particles.color,
                        i.particles.opacity.value
                    )
                );
        }),
        (i.fn.particlesUpdate = function () {
            for (var e = 0; e < i.particles.array.length; e++) {
                var t = i.particles.array[e];
                if (i.particles.move.enable) {
                    var a = i.particles.move.speed / 2;
                    (t.x += t.vx * a), (t.y += t.vy * a);
                }
                if (
                    (i.particles.opacity.anim.enable &&
                        (1 == t.opacity_status
                            ? (t.opacity >= i.particles.opacity.value &&
                                  (t.opacity_status = !1),
                              (t.opacity += t.vo))
                            : (t.opacity <=
                                  i.particles.opacity.anim.opacity_min &&
                                  (t.opacity_status = !0),
                              (t.opacity -= t.vo)),
                        t.opacity < 0 && (t.opacity = 0)),
                    i.particles.size.anim.enable &&
                        (1 == t.size_status
                            ? (t.radius >= i.particles.size.value &&
                                  (t.size_status = !1),
                              (t.radius += t.vs))
                            : (t.radius <= i.particles.size.anim.size_min &&
                                  (t.size_status = !0),
                              (t.radius -= t.vs)),
                        t.radius < 0 && (t.radius = 0)),
                    "bounce" == i.particles.move.out_mode)
                )
                    var s = {
                        x_left: t.radius,
                        x_right: i.canvas.w,
                        y_top: t.radius,
                        y_bottom: i.canvas.h,
                    };
                else
                    s = {
                        x_left: -t.radius,
                        x_right: i.canvas.w + t.radius,
                        y_top: -t.radius,
                        y_bottom: i.canvas.h + t.radius,
                    };
                switch (
                    (t.x - t.radius > i.canvas.w
                        ? ((t.x = s.x_left), (t.y = Math.random() * i.canvas.h))
                        : t.x + t.radius < 0 &&
                          ((t.x = s.x_right),
                          (t.y = Math.random() * i.canvas.h)),
                    t.y - t.radius > i.canvas.h
                        ? ((t.y = s.y_top), (t.x = Math.random() * i.canvas.w))
                        : t.y + t.radius < 0 &&
                          ((t.y = s.y_bottom),
                          (t.x = Math.random() * i.canvas.w)),
                    i.particles.move.out_mode)
                ) {
                    case "bounce":
                        t.x + t.radius > i.canvas.w
                            ? (t.vx = -t.vx)
                            : t.x - t.radius < 0 && (t.vx = -t.vx),
                            t.y + t.radius > i.canvas.h
                                ? (t.vy = -t.vy)
                                : t.y - t.radius < 0 && (t.vy = -t.vy);
                }
                if (
                    (isInArray("grab", i.interactivity.events.onhover.mode) &&
                        i.fn.modes.grabParticle(t),
                    (isInArray("bubble", i.interactivity.events.onhover.mode) ||
                        isInArray(
                            "bubble",
                            i.interactivity.events.onclick.mode
                        )) &&
                        i.fn.modes.bubbleParticle(t),
                    (isInArray(
                        "repulse",
                        i.interactivity.events.onhover.mode
                    ) ||
                        isInArray(
                            "repulse",
                            i.interactivity.events.onclick.mode
                        )) &&
                        i.fn.modes.repulseParticle(t),
                    i.particles.line_linked.enable ||
                        i.particles.move.attract.enable)
                )
                    for (var n = e + 1; n < i.particles.array.length; n++) {
                        var r = i.particles.array[n];
                        i.particles.line_linked.enable &&
                            i.fn.interact.linkParticles(t, r),
                            i.particles.move.attract.enable &&
                                i.fn.interact.attractParticles(t, r),
                            i.particles.move.bounce &&
                                i.fn.interact.bounceParticles(t, r);
                    }
            }
        }),
        (i.fn.particlesDraw = function () {
            i.canvas.ctx.clearRect(0, 0, i.canvas.w, i.canvas.h),
                i.fn.particlesUpdate();
            for (var e = 0; e < i.particles.array.length; e++) {
                i.particles.array[e].draw();
            }
        }),
        (i.fn.particlesEmpty = function () {
            i.particles.array = [];
        }),
        (i.fn.particlesRefresh = function () {
            cancelRequestAnimFrame(i.fn.checkAnimFrame),
                cancelRequestAnimFrame(i.fn.drawAnimFrame),
                (i.tmp.source_svg = void 0),
                (i.tmp.img_obj = void 0),
                (i.tmp.count_svg = 0),
                i.fn.particlesEmpty(),
                i.fn.canvasClear(),
                i.fn.vendors.start();
        }),
        (i.fn.interact.linkParticles = function (e, t) {
            var a = e.x - t.x,
                s = e.y - t.y,
                n = Math.sqrt(a * a + s * s);
            if (n <= i.particles.line_linked.distance) {
                var r =
                    i.particles.line_linked.opacity -
                    n /
                        (1 / i.particles.line_linked.opacity) /
                        i.particles.line_linked.distance;
                if (r > 0) {
                    var c = i.particles.line_linked.color_rgb_line;
                    (i.canvas.ctx.strokeStyle =
                        "rgba(" + c.r + "," + c.g + "," + c.b + "," + r + ")"),
                        (i.canvas.ctx.lineWidth =
                            i.particles.line_linked.width),
                        i.canvas.ctx.beginPath(),
                        i.canvas.ctx.moveTo(e.x, e.y),
                        i.canvas.ctx.lineTo(t.x, t.y),
                        i.canvas.ctx.stroke(),
                        i.canvas.ctx.closePath();
                }
            }
        }),
        (i.fn.interact.attractParticles = function (e, t) {
            var a = e.x - t.x,
                s = e.y - t.y;
            if (Math.sqrt(a * a + s * s) <= i.particles.line_linked.distance) {
                var n = a / (1e3 * i.particles.move.attract.rotateX),
                    r = s / (1e3 * i.particles.move.attract.rotateY);
                (e.vx -= n), (e.vy -= r), (t.vx += n), (t.vy += r);
            }
        }),
        (i.fn.interact.bounceParticles = function (e, t) {
            var a = e.x - t.x,
                i = e.y - t.y;
            Math.sqrt(a * a + i * i) <= e.radius + t.radius &&
                ((e.vx = -e.vx),
                (e.vy = -e.vy),
                (t.vx = -t.vx),
                (t.vy = -t.vy));
        }),
        (i.fn.modes.pushParticles = function (e, t) {
            i.tmp.pushing = !0;
            for (var a = 0; a < e; a++)
                i.particles.array.push(
                    new i.fn.particle(
                        i.particles.color,
                        i.particles.opacity.value,
                        {
                            x: t ? t.pos_x : Math.random() * i.canvas.w,
                            y: t ? t.pos_y : Math.random() * i.canvas.h,
                        }
                    )
                ),
                    a == e - 1 &&
                        (i.particles.move.enable || i.fn.particlesDraw(),
                        (i.tmp.pushing = !1));
        }),
        (i.fn.modes.removeParticles = function (e) {
            i.particles.array.splice(0, e),
                i.particles.move.enable || i.fn.particlesDraw();
        }),
        (i.fn.modes.bubbleParticle = function (e) {
            if (
                i.interactivity.events.onhover.enable &&
                isInArray("bubble", i.interactivity.events.onhover.mode)
            ) {
                var t = e.x - i.interactivity.mouse.pos_x,
                    a = e.y - i.interactivity.mouse.pos_y,
                    s =
                        1 -
                        (l = Math.sqrt(t * t + a * a)) /
                            i.interactivity.modes.bubble.distance;
                function n() {
                    (e.opacity_bubble = e.opacity),
                        (e.radius_bubble = e.radius);
                }
                if (l <= i.interactivity.modes.bubble.distance) {
                    if (s >= 0 && "mousemove" == i.interactivity.status) {
                        if (
                            i.interactivity.modes.bubble.size !=
                            i.particles.size.value
                        )
                            if (
                                i.interactivity.modes.bubble.size >
                                i.particles.size.value
                            ) {
                                (c =
                                    e.radius +
                                    i.interactivity.modes.bubble.size * s) >=
                                    0 && (e.radius_bubble = c);
                            } else {
                                var r =
                                        e.radius -
                                        i.interactivity.modes.bubble.size,
                                    c = e.radius - r * s;
                                e.radius_bubble = c > 0 ? c : 0;
                            }
                        var o;
                        if (
                            i.interactivity.modes.bubble.opacity !=
                            i.particles.opacity.value
                        )
                            if (
                                i.interactivity.modes.bubble.opacity >
                                i.particles.opacity.value
                            )
                                (o = i.interactivity.modes.bubble.opacity * s) >
                                    e.opacity &&
                                    o <= i.interactivity.modes.bubble.opacity &&
                                    (e.opacity_bubble = o);
                            else
                                (o =
                                    e.opacity -
                                    (i.particles.opacity.value -
                                        i.interactivity.modes.bubble.opacity) *
                                        s) < e.opacity &&
                                    o >= i.interactivity.modes.bubble.opacity &&
                                    (e.opacity_bubble = o);
                    }
                } else n();
                "mouseleave" == i.interactivity.status && n();
            } else if (
                i.interactivity.events.onclick.enable &&
                isInArray("bubble", i.interactivity.events.onclick.mode)
            ) {
                if (i.tmp.bubble_clicking) {
                    (t = e.x - i.interactivity.mouse.click_pos_x),
                        (a = e.y - i.interactivity.mouse.click_pos_y);
                    var l = Math.sqrt(t * t + a * a),
                        v =
                            (new Date().getTime() -
                                i.interactivity.mouse.click_time) /
                            1e3;
                    v > i.interactivity.modes.bubble.duration &&
                        (i.tmp.bubble_duration_end = !0),
                        v > 2 * i.interactivity.modes.bubble.duration &&
                            ((i.tmp.bubble_clicking = !1),
                            (i.tmp.bubble_duration_end = !1));
                }
                function p(t, a, s, n, r) {
                    if (t != a)
                        if (i.tmp.bubble_duration_end)
                            null != s &&
                                ((o =
                                    t +
                                    (t -
                                        (n -
                                            (v * (n - t)) /
                                                i.interactivity.modes.bubble
                                                    .duration))),
                                "size" == r && (e.radius_bubble = o),
                                "opacity" == r && (e.opacity_bubble = o));
                        else if (l <= i.interactivity.modes.bubble.distance) {
                            if (null != s) var c = s;
                            else c = n;
                            if (c != t) {
                                var o =
                                    n -
                                    (v * (n - t)) /
                                        i.interactivity.modes.bubble.duration;
                                "size" == r && (e.radius_bubble = o),
                                    "opacity" == r && (e.opacity_bubble = o);
                            }
                        } else
                            "size" == r && (e.radius_bubble = void 0),
                                "opacity" == r && (e.opacity_bubble = void 0);
                }
                i.tmp.bubble_clicking &&
                    (p(
                        i.interactivity.modes.bubble.size,
                        i.particles.size.value,
                        e.radius_bubble,
                        e.radius,
                        "size"
                    ),
                    p(
                        i.interactivity.modes.bubble.opacity,
                        i.particles.opacity.value,
                        e.opacity_bubble,
                        e.opacity,
                        "opacity"
                    ));
            }
        }),
        (i.fn.modes.repulseParticle = function (e) {
            if (
                i.interactivity.events.onhover.enable &&
                isInArray("repulse", i.interactivity.events.onhover.mode) &&
                "mousemove" == i.interactivity.status
            ) {
                var t = e.x - i.interactivity.mouse.pos_x,
                    a = e.y - i.interactivity.mouse.pos_y,
                    s = Math.sqrt(t * t + a * a),
                    n = t / s,
                    r = a / s,
                    c = clamp(
                        (1 / (l = i.interactivity.modes.repulse.distance)) *
                            (-1 * Math.pow(s / l, 2) + 1) *
                            l *
                            100,
                        0,
                        50
                    ),
                    o = { x: e.x + n * c, y: e.y + r * c };
                "bounce" == i.particles.move.out_mode
                    ? (o.x - e.radius > 0 &&
                          o.x + e.radius < i.canvas.w &&
                          (e.x = o.x),
                      o.y - e.radius > 0 &&
                          o.y + e.radius < i.canvas.h &&
                          (e.y = o.y))
                    : ((e.x = o.x), (e.y = o.y));
            } else if (
                i.interactivity.events.onclick.enable &&
                isInArray("repulse", i.interactivity.events.onclick.mode)
            )
                if (
                    (i.tmp.repulse_finish ||
                        (i.tmp.repulse_count++,
                        i.tmp.repulse_count == i.particles.array.length &&
                            (i.tmp.repulse_finish = !0)),
                    i.tmp.repulse_clicking)
                ) {
                    var l = Math.pow(
                            i.interactivity.modes.repulse.distance / 6,
                            3
                        ),
                        v = i.interactivity.mouse.click_pos_x - e.x,
                        p = i.interactivity.mouse.click_pos_y - e.y,
                        m = v * v + p * p,
                        d = (-l / m) * 1;
                    m <= l &&
                        (function () {
                            var t = Math.atan2(p, v);
                            if (
                                ((e.vx = d * Math.cos(t)),
                                (e.vy = d * Math.sin(t)),
                                "bounce" == i.particles.move.out_mode)
                            ) {
                                var a = e.x + e.vx,
                                    s = e.y + e.vy;
                                a + e.radius > i.canvas.w
                                    ? (e.vx = -e.vx)
                                    : a - e.radius < 0 && (e.vx = -e.vx),
                                    s + e.radius > i.canvas.h
                                        ? (e.vy = -e.vy)
                                        : s - e.radius < 0 && (e.vy = -e.vy);
                            }
                        })();
                } else
                    0 == i.tmp.repulse_clicking &&
                        ((e.vx = e.vx_i), (e.vy = e.vy_i));
        }),
        (i.fn.modes.grabParticle = function (e) {
            if (
                i.interactivity.events.onhover.enable &&
                "mousemove" == i.interactivity.status
            ) {
                var t = e.x - i.interactivity.mouse.pos_x,
                    a = e.y - i.interactivity.mouse.pos_y,
                    s = Math.sqrt(t * t + a * a);
                if (s <= i.interactivity.modes.grab.distance) {
                    var n =
                        i.interactivity.modes.grab.line_linked.opacity -
                        s /
                            (1 /
                                i.interactivity.modes.grab.line_linked
                                    .opacity) /
                            i.interactivity.modes.grab.distance;
                    if (n > 0) {
                        var r = i.particles.line_linked.color_rgb_line;
                        (i.canvas.ctx.strokeStyle =
                            "rgba(" +
                            r.r +
                            "," +
                            r.g +
                            "," +
                            r.b +
                            "," +
                            n +
                            ")"),
                            (i.canvas.ctx.lineWidth =
                                i.particles.line_linked.width),
                            i.canvas.ctx.beginPath(),
                            i.canvas.ctx.moveTo(e.x, e.y),
                            i.canvas.ctx.lineTo(
                                i.interactivity.mouse.pos_x,
                                i.interactivity.mouse.pos_y
                            ),
                            i.canvas.ctx.stroke(),
                            i.canvas.ctx.closePath();
                    }
                }
            }
        }),
        (i.fn.vendors.eventsListeners = function () {
            "window" == i.interactivity.detect_on
                ? (i.interactivity.el = window)
                : (i.interactivity.el = i.canvas.el),
                (i.interactivity.events.onhover.enable ||
                    i.interactivity.events.onclick.enable) &&
                    (i.interactivity.el.addEventListener(
                        "mousemove",
                        function (e) {
                            if (i.interactivity.el == window)
                                var t = e.clientX,
                                    a = e.clientY;
                            else
                                (t = e.offsetX || e.clientX),
                                    (a = e.offsetY || e.clientY);
                            (i.interactivity.mouse.pos_x = t),
                                (i.interactivity.mouse.pos_y = a),
                                i.tmp.retina &&
                                    ((i.interactivity.mouse.pos_x *=
                                        i.canvas.pxratio),
                                    (i.interactivity.mouse.pos_y *=
                                        i.canvas.pxratio)),
                                (i.interactivity.status = "mousemove");
                        }
                    ),
                    i.interactivity.el.addEventListener(
                        "mouseleave",
                        function (e) {
                            (i.interactivity.mouse.pos_x = null),
                                (i.interactivity.mouse.pos_y = null),
                                (i.interactivity.status = "mouseleave");
                        }
                    )),
                i.interactivity.events.onclick.enable &&
                    i.interactivity.el.addEventListener("click", function () {
                        if (
                            ((i.interactivity.mouse.click_pos_x =
                                i.interactivity.mouse.pos_x),
                            (i.interactivity.mouse.click_pos_y =
                                i.interactivity.mouse.pos_y),
                            (i.interactivity.mouse.click_time =
                                new Date().getTime()),
                            i.interactivity.events.onclick.enable)
                        )
                            switch (i.interactivity.events.onclick.mode) {
                                case "push":
                                    i.particles.move.enable
                                        ? i.fn.modes.pushParticles(
                                              i.interactivity.modes.push
                                                  .particles_nb,
                                              i.interactivity.mouse
                                          )
                                        : 1 ==
                                          i.interactivity.modes.push
                                              .particles_nb
                                        ? i.fn.modes.pushParticles(
                                              i.interactivity.modes.push
                                                  .particles_nb,
                                              i.interactivity.mouse
                                          )
                                        : i.interactivity.modes.push
                                              .particles_nb > 1 &&
                                          i.fn.modes.pushParticles(
                                              i.interactivity.modes.push
                                                  .particles_nb
                                          );
                                    break;
                                case "remove":
                                    i.fn.modes.removeParticles(
                                        i.interactivity.modes.remove
                                            .particles_nb
                                    );
                                    break;
                                case "bubble":
                                    i.tmp.bubble_clicking = !0;
                                    break;
                                case "repulse":
                                    (i.tmp.repulse_clicking = !0),
                                        (i.tmp.repulse_count = 0),
                                        (i.tmp.repulse_finish = !1),
                                        setTimeout(function () {
                                            i.tmp.repulse_clicking = !1;
                                        }, 1e3 *
                                            i.interactivity.modes.repulse
                                                .duration);
                            }
                    });
        }),
        (i.fn.vendors.densityAutoParticles = function () {
            if (i.particles.number.density.enable) {
                var e = (i.canvas.el.width * i.canvas.el.height) / 1e3;
                i.tmp.retina && (e /= 2 * i.canvas.pxratio);
                var t =
                        (e * i.particles.number.value) /
                        i.particles.number.density.value_area,
                    a = i.particles.array.length - t;
                a < 0
                    ? i.fn.modes.pushParticles(Math.abs(a))
                    : i.fn.modes.removeParticles(a);
            }
        }),
        (i.fn.vendors.checkOverlap = function (e, t) {
            for (var a = 0; a < i.particles.array.length; a++) {
                var s = i.particles.array[a],
                    n = e.x - s.x,
                    r = e.y - s.y;
                Math.sqrt(n * n + r * r) <= e.radius + s.radius &&
                    ((e.x = t ? t.x : Math.random() * i.canvas.w),
                    (e.y = t ? t.y : Math.random() * i.canvas.h),
                    i.fn.vendors.checkOverlap(e));
            }
        }),
        (i.fn.vendors.createSvgImg = function (e) {
            var t = i.tmp.source_svg.replace(
                    /#([0-9A-F]{3,6})/gi,
                    function (t, a, i, s) {
                        if (e.color.rgb)
                            var n =
                                "rgba(" +
                                e.color.rgb.r +
                                "," +
                                e.color.rgb.g +
                                "," +
                                e.color.rgb.b +
                                "," +
                                e.opacity +
                                ")";
                        else
                            n =
                                "hsla(" +
                                e.color.hsl.h +
                                "," +
                                e.color.hsl.s +
                                "%," +
                                e.color.hsl.l +
                                "%," +
                                e.opacity +
                                ")";
                        return n;
                    }
                ),
                a = new Blob([t], { type: "image/svg+xml;charset=utf-8" }),
                s = window.URL || window.webkitURL || window,
                n = s.createObjectURL(a),
                r = new Image();
            r.addEventListener("load", function () {
                (e.img.obj = r),
                    (e.img.loaded = !0),
                    s.revokeObjectURL(n),
                    i.tmp.count_svg++;
            }),
                (r.src = n);
        }),
        (i.fn.vendors.destroypJS = function () {
            cancelAnimationFrame(i.fn.drawAnimFrame),
                a.remove(),
                (pJSDom = null);
        }),
        (i.fn.vendors.drawShape = function (e, t, a, i, s, n) {
            var r = s * n,
                c = s / n,
                o = (180 * (c - 2)) / c,
                l = Math.PI - (Math.PI * o) / 180;
            e.save(), e.beginPath(), e.translate(t, a), e.moveTo(0, 0);
            for (var v = 0; v < r; v++)
                e.lineTo(i, 0), e.translate(i, 0), e.rotate(l);
            e.fill(), e.restore();
        }),
        (i.fn.vendors.exportImg = function () {
            window.open(i.canvas.el.toDataURL("image/png"), "_blank");
        }),
        (i.fn.vendors.loadImg = function (e) {
            if (((i.tmp.img_error = void 0), "" != i.particles.shape.image.src))
                if ("svg" == e) {
                    var t = new XMLHttpRequest();
                    t.open("GET", i.particles.shape.image.src),
                        (t.onreadystatechange = function (e) {
                            4 == t.readyState &&
                                (200 == t.status
                                    ? ((i.tmp.source_svg =
                                          e.currentTarget.response),
                                      i.fn.vendors.checkBeforeDraw())
                                    : (console.log(
                                          "Error pJS - Image not found"
                                      ),
                                      (i.tmp.img_error = !0)));
                        }),
                        t.send();
                } else {
                    var a = new Image();
                    a.addEventListener("load", function () {
                        (i.tmp.img_obj = a), i.fn.vendors.checkBeforeDraw();
                    }),
                        (a.src = i.particles.shape.image.src);
                }
            else
                console.log("Error pJS - No image.src"), (i.tmp.img_error = !0);
        }),
        (i.fn.vendors.draw = function () {
            var e = i.particles.fps_limit;
            e <= 0 ||
                setTimeout(function () {
                    "image" == i.particles.shape.type
                        ? "svg" == i.tmp.img_type
                            ? i.tmp.count_svg >= i.particles.number.value
                                ? (i.fn.particlesDraw(),
                                  i.particles.move.enable
                                      ? (i.fn.drawAnimFrame = requestAnimFrame(
                                            i.fn.vendors.draw
                                        ))
                                      : cancelRequestAnimFrame(
                                            i.fn.drawAnimFrame
                                        ))
                                : i.tmp.img_error ||
                                  (i.fn.drawAnimFrame = requestAnimFrame(
                                      i.fn.vendors.draw
                                  ))
                            : null != i.tmp.img_obj
                            ? (i.fn.particlesDraw(),
                              i.particles.move.enable
                                  ? (i.fn.drawAnimFrame = requestAnimFrame(
                                        i.fn.vendors.draw
                                    ))
                                  : cancelRequestAnimFrame(i.fn.drawAnimFrame))
                            : i.tmp.img_error ||
                              (i.fn.drawAnimFrame = requestAnimFrame(
                                  i.fn.vendors.draw
                              ))
                        : (i.fn.particlesDraw(),
                          i.particles.move.enable
                              ? (i.fn.drawAnimFrame = requestAnimFrame(
                                    i.fn.vendors.draw
                                ))
                              : cancelRequestAnimFrame(i.fn.drawAnimFrame));
                }, 1e3 / e);
        }),
        (i.fn.vendors.checkBeforeDraw = function () {
            "image" == i.particles.shape.type
                ? "svg" == i.tmp.img_type && null == i.tmp.source_svg
                    ? (i.tmp.checkAnimFrame = requestAnimFrame(check))
                    : (cancelRequestAnimFrame(i.tmp.checkAnimFrame),
                      i.tmp.img_error ||
                          (i.fn.vendors.init(), i.fn.vendors.draw()))
                : (i.fn.vendors.init(), i.fn.vendors.draw());
        }),
        (i.fn.vendors.init = function () {
            i.fn.retinaInit(),
                i.fn.canvasInit(),
                i.fn.canvasSize(),
                i.fn.canvasPaint(),
                i.fn.particlesCreate(),
                i.fn.vendors.densityAutoParticles(),
                (i.particles.line_linked.color_rgb_line = hexToRgb(
                    i.particles.line_linked.color
                ));
        }),
        (i.fn.vendors.start = function () {
            isInArray("image", i.particles.shape.type)
                ? ((i.tmp.img_type = i.particles.shape.image.src.substr(
                      i.particles.shape.image.src.length - 3
                  )),
                  i.fn.vendors.loadImg(i.tmp.img_type))
                : i.fn.vendors.checkBeforeDraw();
        }),
        i.fn.vendors.eventsListeners(),
        i.fn.vendors.start();
};
function hexToRgb(e) {
    e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, a, i) {
        return t + t + a + a + i + i;
    });
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t
        ? {
              r: parseInt(t[1], 16),
              g: parseInt(t[2], 16),
              b: parseInt(t[3], 16),
          }
        : null;
}
function clamp(e, t, a) {
    return Math.min(Math.max(e, t), a);
}
function isInArray(e, t) {
    return t.indexOf(e) > -1;
}
(Object.deepExtend = function (e, t) {
    for (var a in t)
        t[a] && t[a].constructor && t[a].constructor === Object
            ? ((e[a] = e[a] || {}), arguments.callee(e[a], t[a]))
            : (e[a] = t[a]);
    return e;
}),
    (window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (e) {
            window.setTimeout(e, 1e3 / 60);
        }),
    (window.cancelRequestAnimFrame =
        window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout),
    (window.pJSDom = []),
    (window.particlesJS = function (e, t) {
        "string" != typeof e && ((t = e), (e = "particles-js")),
            e || (e = "particles-js");
        var a = document.getElementById(e),
            i = "particles-js-canvas-el",
            s = a.getElementsByClassName(i);
        if (s.length) for (; s.length > 0; ) a.removeChild(s[0]);
        var n = document.createElement("canvas");
        (n.className = i),
            (n.style.width = "100%"),
            (n.style.height = "100%"),
            null != document.getElementById(e).appendChild(n) &&
                pJSDom.push(new pJS(e, t));
    }),
    (window.particlesJS.load = function (e, t, a) {
        var i = new XMLHttpRequest();
        i.open("GET", t),
            (i.onreadystatechange = function (t) {
                if (4 == i.readyState)
                    if (200 == i.status) {
                        var s = JSON.parse(t.currentTarget.response);
                        window.particlesJS(e, s), a && a();
                    } else
                        console.log(
                            "Error pJS - XMLHttpRequest status: " + i.status
                        ),
                            console.log("Error pJS - File config not found");
            }),
            i.send();
    });

/* perfect-scrollbar v0.7.0 */
!(function t(e, n, r) {
    function o(i, s) {
        if (!n[i]) {
            if (!e[i]) {
                var a = "function" == typeof require && require;
                if (!s && a) return a(i, !0);
                if (l) return l(i, !0);
                var c = new Error("Cannot find module '" + i + "'");
                throw ((c.code = "MODULE_NOT_FOUND"), c);
            }
            var u = (n[i] = { exports: {} });
            e[i][0].call(
                u.exports,
                function (t) {
                    var n = e[i][1][t];
                    return o(n ? n : t);
                },
                u,
                u.exports,
                t,
                e,
                n,
                r
            );
        }
        return n[i].exports;
    }
    for (
        var l = "function" == typeof require && require, i = 0;
        i < r.length;
        i++
    )
        o(r[i]);
    return o;
})(
    {
        1: [
            function (t, e, n) {
                "use strict";
                function r(t) {
                    t.fn.perfectScrollbar = function (t) {
                        return this.each(function () {
                            if (
                                "object" == typeof t ||
                                "undefined" == typeof t
                            ) {
                                var e = t;
                                l.get(this) || o.initialize(this, e);
                            } else {
                                var n = t;
                                "update" === n
                                    ? o.update(this)
                                    : "destroy" === n && o.destroy(this);
                            }
                        });
                    };
                }
                var o = t("../main"),
                    l = t("../plugin/instances");
                if ("function" == typeof define && define.amd)
                    define(["jquery"], r);
                else {
                    var i = window.jQuery ? window.jQuery : window.$;
                    "undefined" != typeof i && r(i);
                }
                e.exports = r;
            },
            { "../main": 7, "../plugin/instances": 18 },
        ],
        2: [
            function (t, e, n) {
                "use strict";
                function r(t, e) {
                    var n = t.className.split(" ");
                    n.indexOf(e) < 0 && n.push(e), (t.className = n.join(" "));
                }
                function o(t, e) {
                    var n = t.className.split(" "),
                        r = n.indexOf(e);
                    r >= 0 && n.splice(r, 1), (t.className = n.join(" "));
                }
                (n.add = function (t, e) {
                    t.classList ? t.classList.add(e) : r(t, e);
                }),
                    (n.remove = function (t, e) {
                        t.classList ? t.classList.remove(e) : o(t, e);
                    }),
                    (n.list = function (t) {
                        return t.classList
                            ? Array.prototype.slice.apply(t.classList)
                            : t.className.split(" ");
                    });
            },
            {},
        ],
        3: [
            function (t, e, n) {
                "use strict";
                function r(t, e) {
                    return window.getComputedStyle(t)[e];
                }
                function o(t, e, n) {
                    return (
                        "number" == typeof n && (n = n.toString() + "px"),
                        (t.style[e] = n),
                        t
                    );
                }
                function l(t, e) {
                    for (var n in e) {
                        var r = e[n];
                        "number" == typeof r && (r = r.toString() + "px"),
                            (t.style[n] = r);
                    }
                    return t;
                }
                var i = {};
                (i.e = function (t, e) {
                    var n = document.createElement(t);
                    return (n.className = e), n;
                }),
                    (i.appendTo = function (t, e) {
                        return e.appendChild(t), t;
                    }),
                    (i.css = function (t, e, n) {
                        return "object" == typeof e
                            ? l(t, e)
                            : "undefined" == typeof n
                            ? r(t, e)
                            : o(t, e, n);
                    }),
                    (i.matches = function (t, e) {
                        return "undefined" != typeof t.matches
                            ? t.matches(e)
                            : "undefined" != typeof t.matchesSelector
                            ? t.matchesSelector(e)
                            : "undefined" != typeof t.webkitMatchesSelector
                            ? t.webkitMatchesSelector(e)
                            : "undefined" != typeof t.mozMatchesSelector
                            ? t.mozMatchesSelector(e)
                            : "undefined" != typeof t.msMatchesSelector
                            ? t.msMatchesSelector(e)
                            : void 0;
                    }),
                    (i.remove = function (t) {
                        "undefined" != typeof t.remove
                            ? t.remove()
                            : t.parentNode && t.parentNode.removeChild(t);
                    }),
                    (i.queryChildren = function (t, e) {
                        return Array.prototype.filter.call(
                            t.childNodes,
                            function (t) {
                                return i.matches(t, e);
                            }
                        );
                    }),
                    (e.exports = i);
            },
            {},
        ],
        4: [
            function (t, e, n) {
                "use strict";
                var r = function (t) {
                    (this.element = t), (this.events = {});
                };
                (r.prototype.bind = function (t, e) {
                    "undefined" == typeof this.events[t] &&
                        (this.events[t] = []),
                        this.events[t].push(e),
                        this.element.addEventListener(t, e, !1);
                }),
                    (r.prototype.unbind = function (t, e) {
                        var n = "undefined" != typeof e;
                        this.events[t] = this.events[t].filter(function (r) {
                            return (
                                !(!n || r === e) ||
                                (this.element.removeEventListener(t, r, !1), !1)
                            );
                        }, this);
                    }),
                    (r.prototype.unbindAll = function () {
                        for (var t in this.events) this.unbind(t);
                    });
                var o = function () {
                    this.eventElements = [];
                };
                (o.prototype.eventElement = function (t) {
                    var e = this.eventElements.filter(function (e) {
                        return e.element === t;
                    })[0];
                    return (
                        "undefined" == typeof e &&
                            ((e = new r(t)), this.eventElements.push(e)),
                        e
                    );
                }),
                    (o.prototype.bind = function (t, e, n) {
                        this.eventElement(t).bind(e, n);
                    }),
                    (o.prototype.unbind = function (t, e, n) {
                        this.eventElement(t).unbind(e, n);
                    }),
                    (o.prototype.unbindAll = function () {
                        for (var t = 0; t < this.eventElements.length; t++)
                            this.eventElements[t].unbindAll();
                    }),
                    (o.prototype.once = function (t, e, n) {
                        var r = this.eventElement(t),
                            o = function (t) {
                                r.unbind(e, o), n(t);
                            };
                        r.bind(e, o);
                    }),
                    (e.exports = o);
            },
            {},
        ],
        5: [
            function (t, e, n) {
                "use strict";
                e.exports = (function () {
                    function t() {
                        return Math.floor(65536 * (1 + Math.random()))
                            .toString(16)
                            .substring(1);
                    }
                    return function () {
                        return (
                            t() +
                            t() +
                            "-" +
                            t() +
                            "-" +
                            t() +
                            "-" +
                            t() +
                            "-" +
                            t() +
                            t() +
                            t()
                        );
                    };
                })();
            },
            {},
        ],
        6: [
            function (t, e, n) {
                "use strict";
                var r = t("./class"),
                    o = t("./dom"),
                    l = (n.toInt = function (t) {
                        return parseInt(t, 10) || 0;
                    }),
                    i = (n.clone = function (t) {
                        if (t) {
                            if (Array.isArray(t)) return t.map(i);
                            if ("object" == typeof t) {
                                var e = {};
                                for (var n in t) e[n] = i(t[n]);
                                return e;
                            }
                            return t;
                        }
                        return null;
                    });
                (n.extend = function (t, e) {
                    var n = i(t);
                    for (var r in e) n[r] = i(e[r]);
                    return n;
                }),
                    (n.isEditable = function (t) {
                        return (
                            o.matches(t, "input,[contenteditable]") ||
                            o.matches(t, "select,[contenteditable]") ||
                            o.matches(t, "textarea,[contenteditable]") ||
                            o.matches(t, "button,[contenteditable]")
                        );
                    }),
                    (n.removePsClasses = function (t) {
                        for (var e = r.list(t), n = 0; n < e.length; n++) {
                            var o = e[n];
                            0 === o.indexOf("ps-") && r.remove(t, o);
                        }
                    }),
                    (n.outerWidth = function (t) {
                        return (
                            l(o.css(t, "width")) +
                            l(o.css(t, "paddingLeft")) +
                            l(o.css(t, "paddingRight")) +
                            l(o.css(t, "borderLeftWidth")) +
                            l(o.css(t, "borderRightWidth"))
                        );
                    }),
                    (n.startScrolling = function (t, e) {
                        r.add(t, "ps-in-scrolling"),
                            "undefined" != typeof e
                                ? r.add(t, "ps-" + e)
                                : (r.add(t, "ps-x"), r.add(t, "ps-y"));
                    }),
                    (n.stopScrolling = function (t, e) {
                        r.remove(t, "ps-in-scrolling"),
                            "undefined" != typeof e
                                ? r.remove(t, "ps-" + e)
                                : (r.remove(t, "ps-x"), r.remove(t, "ps-y"));
                    }),
                    (n.env = {
                        isWebKit:
                            "WebkitAppearance" in
                            document.documentElement.style,
                        supportsTouch:
                            "ontouchstart" in window ||
                            (window.DocumentTouch &&
                                document instanceof window.DocumentTouch),
                        supportsIePointer:
                            null !== window.navigator.msMaxTouchPoints,
                    });
            },
            { "./class": 2, "./dom": 3 },
        ],
        7: [
            function (t, e, n) {
                "use strict";
                var r = t("./plugin/destroy"),
                    o = t("./plugin/initialize"),
                    l = t("./plugin/update");
                e.exports = { initialize: o, update: l, destroy: r };
            },
            {
                "./plugin/destroy": 9,
                "./plugin/initialize": 17,
                "./plugin/update": 21,
            },
        ],
        8: [
            function (t, e, n) {
                "use strict";
                e.exports = {
                    handlers: [
                        "click-rail",
                        "drag-scrollbar",
                        "keyboard",
                        "wheel",
                        "touch",
                    ],
                    maxScrollbarLength: null,
                    minScrollbarLength: null,
                    scrollXMarginOffset: 0,
                    scrollYMarginOffset: 0,
                    suppressScrollX: !1,
                    suppressScrollY: !1,
                    swipePropagation: !0,
                    swipeEasing: !0,
                    useBothWheelAxes: !1,
                    wheelPropagation: !1,
                    wheelSpeed: 1,
                    theme: "default",
                };
            },
            {},
        ],
        9: [
            function (t, e, n) {
                "use strict";
                var r = t("../lib/helper"),
                    o = t("../lib/dom"),
                    l = t("./instances");
                e.exports = function (t) {
                    var e = l.get(t);
                    e &&
                        (e.event.unbindAll(),
                        o.remove(e.scrollbarX),
                        o.remove(e.scrollbarY),
                        o.remove(e.scrollbarXRail),
                        o.remove(e.scrollbarYRail),
                        r.removePsClasses(t),
                        l.remove(t));
                };
            },
            { "../lib/dom": 3, "../lib/helper": 6, "./instances": 18 },
        ],
        10: [
            function (t, e, n) {
                "use strict";
                function r(t, e) {
                    function n(t) {
                        return t.getBoundingClientRect();
                    }
                    var r = function (t) {
                        t.stopPropagation();
                    };
                    e.event.bind(e.scrollbarY, "click", r),
                        e.event.bind(e.scrollbarYRail, "click", function (r) {
                            var o =
                                    r.pageY -
                                    window.pageYOffset -
                                    n(e.scrollbarYRail).top,
                                s = o > e.scrollbarYTop ? 1 : -1;
                            i(t, "top", t.scrollTop + s * e.containerHeight),
                                l(t),
                                r.stopPropagation();
                        }),
                        e.event.bind(e.scrollbarX, "click", r),
                        e.event.bind(e.scrollbarXRail, "click", function (r) {
                            var o =
                                    r.pageX -
                                    window.pageXOffset -
                                    n(e.scrollbarXRail).left,
                                s = o > e.scrollbarXLeft ? 1 : -1;
                            i(t, "left", t.scrollLeft + s * e.containerWidth),
                                l(t),
                                r.stopPropagation();
                        });
                }
                var o = t("../instances"),
                    l = t("../update-geometry"),
                    i = t("../update-scroll");
                e.exports = function (t) {
                    var e = o.get(t);
                    r(t, e);
                };
            },
            {
                "../instances": 18,
                "../update-geometry": 19,
                "../update-scroll": 20,
            },
        ],
        11: [
            function (t, e, n) {
                "use strict";
                function r(t, e) {
                    function n(n) {
                        var o = r + n * e.railXRatio,
                            i =
                                Math.max(
                                    0,
                                    e.scrollbarXRail.getBoundingClientRect()
                                        .left
                                ) +
                                e.railXRatio *
                                    (e.railXWidth - e.scrollbarXWidth);
                        o < 0
                            ? (e.scrollbarXLeft = 0)
                            : o > i
                            ? (e.scrollbarXLeft = i)
                            : (e.scrollbarXLeft = o);
                        var s =
                            l.toInt(
                                (e.scrollbarXLeft *
                                    (e.contentWidth - e.containerWidth)) /
                                    (e.containerWidth -
                                        e.railXRatio * e.scrollbarXWidth)
                            ) - e.negativeScrollAdjustment;
                        c(t, "left", s);
                    }
                    var r = null,
                        o = null,
                        s = function (e) {
                            n(e.pageX - o),
                                a(t),
                                e.stopPropagation(),
                                e.preventDefault();
                        },
                        u = function () {
                            l.stopScrolling(t, "x"),
                                e.event.unbind(e.ownerDocument, "mousemove", s);
                        };
                    e.event.bind(e.scrollbarX, "mousedown", function (n) {
                        (o = n.pageX),
                            (r =
                                l.toInt(i.css(e.scrollbarX, "left")) *
                                e.railXRatio),
                            l.startScrolling(t, "x"),
                            e.event.bind(e.ownerDocument, "mousemove", s),
                            e.event.once(e.ownerDocument, "mouseup", u),
                            n.stopPropagation(),
                            n.preventDefault();
                    });
                }
                function o(t, e) {
                    function n(n) {
                        var o = r + n * e.railYRatio,
                            i =
                                Math.max(
                                    0,
                                    e.scrollbarYRail.getBoundingClientRect().top
                                ) +
                                e.railYRatio *
                                    (e.railYHeight - e.scrollbarYHeight);
                        o < 0
                            ? (e.scrollbarYTop = 0)
                            : o > i
                            ? (e.scrollbarYTop = i)
                            : (e.scrollbarYTop = o);
                        var s = l.toInt(
                            (e.scrollbarYTop *
                                (e.contentHeight - e.containerHeight)) /
                                (e.containerHeight -
                                    e.railYRatio * e.scrollbarYHeight)
                        );
                        c(t, "top", s);
                    }
                    var r = null,
                        o = null,
                        s = function (e) {
                            n(e.pageY - o),
                                a(t),
                                e.stopPropagation(),
                                e.preventDefault();
                        },
                        u = function () {
                            l.stopScrolling(t, "y"),
                                e.event.unbind(e.ownerDocument, "mousemove", s);
                        };
                    e.event.bind(e.scrollbarY, "mousedown", function (n) {
                        (o = n.pageY),
                            (r =
                                l.toInt(i.css(e.scrollbarY, "top")) *
                                e.railYRatio),
                            l.startScrolling(t, "y"),
                            e.event.bind(e.ownerDocument, "mousemove", s),
                            e.event.once(e.ownerDocument, "mouseup", u),
                            n.stopPropagation(),
                            n.preventDefault();
                    });
                }
                var l = t("../../lib/helper"),
                    i = t("../../lib/dom"),
                    s = t("../instances"),
                    a = t("../update-geometry"),
                    c = t("../update-scroll");
                e.exports = function (t) {
                    var e = s.get(t);
                    r(t, e), o(t, e);
                };
            },
            {
                "../../lib/dom": 3,
                "../../lib/helper": 6,
                "../instances": 18,
                "../update-geometry": 19,
                "../update-scroll": 20,
            },
        ],
        12: [
            function (t, e, n) {
                "use strict";
                function r(t, e) {
                    function n(n, r) {
                        var o = t.scrollTop;
                        if (0 === n) {
                            if (!e.scrollbarYActive) return !1;
                            if (
                                (0 === o && r > 0) ||
                                (o >= e.contentHeight - e.containerHeight &&
                                    r < 0)
                            )
                                return !e.settings.wheelPropagation;
                        }
                        var l = t.scrollLeft;
                        if (0 === r) {
                            if (!e.scrollbarXActive) return !1;
                            if (
                                (0 === l && n < 0) ||
                                (l >= e.contentWidth - e.containerWidth &&
                                    n > 0)
                            )
                                return !e.settings.wheelPropagation;
                        }
                        return !0;
                    }
                    var r = !1;
                    e.event.bind(t, "mouseenter", function () {
                        r = !0;
                    }),
                        e.event.bind(t, "mouseleave", function () {
                            r = !1;
                        });
                    var i = !1;
                    e.event.bind(e.ownerDocument, "keydown", function (c) {
                        if (
                            !(
                                (c.isDefaultPrevented &&
                                    c.isDefaultPrevented()) ||
                                c.defaultPrevented
                            )
                        ) {
                            var u =
                                l.matches(e.scrollbarX, ":focus") ||
                                l.matches(e.scrollbarY, ":focus");
                            if (r || u) {
                                var d = document.activeElement
                                    ? document.activeElement
                                    : e.ownerDocument.activeElement;
                                if (d) {
                                    if ("IFRAME" === d.tagName)
                                        d = d.contentDocument.activeElement;
                                    else
                                        for (; d.shadowRoot; )
                                            d = d.shadowRoot.activeElement;
                                    if (o.isEditable(d)) return;
                                }
                                var p = 0,
                                    f = 0;
                                switch (c.which) {
                                    case 37:
                                        p = c.metaKey
                                            ? -e.contentWidth
                                            : c.altKey
                                            ? -e.containerWidth
                                            : -30;
                                        break;
                                    case 38:
                                        f = c.metaKey
                                            ? e.contentHeight
                                            : c.altKey
                                            ? e.containerHeight
                                            : 30;
                                        break;
                                    case 39:
                                        p = c.metaKey
                                            ? e.contentWidth
                                            : c.altKey
                                            ? e.containerWidth
                                            : 30;
                                        break;
                                    case 40:
                                        f = c.metaKey
                                            ? -e.contentHeight
                                            : c.altKey
                                            ? -e.containerHeight
                                            : -30;
                                        break;
                                    case 33:
                                        f = 90;
                                        break;
                                    case 32:
                                        f = c.shiftKey ? 90 : -90;
                                        break;
                                    case 34:
                                        f = -90;
                                        break;
                                    case 35:
                                        f = c.ctrlKey
                                            ? -e.contentHeight
                                            : -e.containerHeight;
                                        break;
                                    case 36:
                                        f = c.ctrlKey
                                            ? t.scrollTop
                                            : e.containerHeight;
                                        break;
                                    default:
                                        return;
                                }
                                a(t, "top", t.scrollTop - f),
                                    a(t, "left", t.scrollLeft + p),
                                    s(t),
                                    (i = n(p, f)),
                                    i && c.preventDefault();
                            }
                        }
                    });
                }
                var o = t("../../lib/helper"),
                    l = t("../../lib/dom"),
                    i = t("../instances"),
                    s = t("../update-geometry"),
                    a = t("../update-scroll");
                e.exports = function (t) {
                    var e = i.get(t);
                    r(t, e);
                };
            },
            {
                "../../lib/dom": 3,
                "../../lib/helper": 6,
                "../instances": 18,
                "../update-geometry": 19,
                "../update-scroll": 20,
            },
        ],
        13: [
            function (t, e, n) {
                "use strict";
                function r(t, e) {
                    function n(n, r) {
                        var o = t.scrollTop;
                        if (0 === n) {
                            if (!e.scrollbarYActive) return !1;
                            if (
                                (0 === o && r > 0) ||
                                (o >= e.contentHeight - e.containerHeight &&
                                    r < 0)
                            )
                                return !e.settings.wheelPropagation;
                        }
                        var l = t.scrollLeft;
                        if (0 === r) {
                            if (!e.scrollbarXActive) return !1;
                            if (
                                (0 === l && n < 0) ||
                                (l >= e.contentWidth - e.containerWidth &&
                                    n > 0)
                            )
                                return !e.settings.wheelPropagation;
                        }
                        return !0;
                    }
                    function r(t) {
                        var e = t.deltaX,
                            n = -1 * t.deltaY;
                        return (
                            ("undefined" != typeof e &&
                                "undefined" != typeof n) ||
                                ((e = (-1 * t.wheelDeltaX) / 6),
                                (n = t.wheelDeltaY / 6)),
                            t.deltaMode &&
                                1 === t.deltaMode &&
                                ((e *= 10), (n *= 10)),
                            e !== e && n !== n && ((e = 0), (n = t.wheelDelta)),
                            t.shiftKey ? [-n, -e] : [e, n]
                        );
                    }
                    function o(e, n) {
                        var r = t.querySelector(
                            "textarea:hover, select[multiple]:hover, .ps-child:hover"
                        );
                        if (r) {
                            var o = window.getComputedStyle(r),
                                l = [o.overflow, o.overflowX, o.overflowY].join(
                                    ""
                                );
                            if (!l.match(/(scroll|auto)/)) return !1;
                            var i = r.scrollHeight - r.clientHeight;
                            if (
                                i > 0 &&
                                !(
                                    (0 === r.scrollTop && n > 0) ||
                                    (r.scrollTop === i && n < 0)
                                )
                            )
                                return !0;
                            var s = r.scrollLeft - r.clientWidth;
                            if (
                                s > 0 &&
                                !(
                                    (0 === r.scrollLeft && e < 0) ||
                                    (r.scrollLeft === s && e > 0)
                                )
                            )
                                return !0;
                        }
                        return !1;
                    }
                    function s(s) {
                        var c = r(s),
                            u = c[0],
                            d = c[1];
                        o(u, d) ||
                            ((a = !1),
                            e.settings.useBothWheelAxes
                                ? e.scrollbarYActive && !e.scrollbarXActive
                                    ? (d
                                          ? i(
                                                t,
                                                "top",
                                                t.scrollTop -
                                                    d * e.settings.wheelSpeed
                                            )
                                          : i(
                                                t,
                                                "top",
                                                t.scrollTop +
                                                    u * e.settings.wheelSpeed
                                            ),
                                      (a = !0))
                                    : e.scrollbarXActive &&
                                      !e.scrollbarYActive &&
                                      (u
                                          ? i(
                                                t,
                                                "left",
                                                t.scrollLeft +
                                                    u * e.settings.wheelSpeed
                                            )
                                          : i(
                                                t,
                                                "left",
                                                t.scrollLeft -
                                                    d * e.settings.wheelSpeed
                                            ),
                                      (a = !0))
                                : (i(
                                      t,
                                      "top",
                                      t.scrollTop - d * e.settings.wheelSpeed
                                  ),
                                  i(
                                      t,
                                      "left",
                                      t.scrollLeft + u * e.settings.wheelSpeed
                                  )),
                            l(t),
                            (a = a || n(u, d)),
                            a && (s.stopPropagation(), s.preventDefault()));
                    }
                    var a = !1;
                    "undefined" != typeof window.onwheel
                        ? e.event.bind(t, "wheel", s)
                        : "undefined" != typeof window.onmousewheel &&
                          e.event.bind(t, "mousewheel", s);
                }
                var o = t("../instances"),
                    l = t("../update-geometry"),
                    i = t("../update-scroll");
                e.exports = function (t) {
                    var e = o.get(t);
                    r(t, e);
                };
            },
            {
                "../instances": 18,
                "../update-geometry": 19,
                "../update-scroll": 20,
            },
        ],
        14: [
            function (t, e, n) {
                "use strict";
                function r(t, e) {
                    e.event.bind(t, "scroll", function () {
                        l(t);
                    });
                }
                var o = t("../instances"),
                    l = t("../update-geometry");
                e.exports = function (t) {
                    var e = o.get(t);
                    r(t, e);
                };
            },
            { "../instances": 18, "../update-geometry": 19 },
        ],
        15: [
            function (t, e, n) {
                "use strict";
                function r(t, e) {
                    function n() {
                        var t = window.getSelection
                            ? window.getSelection()
                            : document.getSelection
                            ? document.getSelection()
                            : "";
                        return 0 === t.toString().length
                            ? null
                            : t.getRangeAt(0).commonAncestorContainer;
                    }
                    function r() {
                        c ||
                            (c = setInterval(function () {
                                return l.get(t)
                                    ? (s(t, "top", t.scrollTop + u.top),
                                      s(t, "left", t.scrollLeft + u.left),
                                      void i(t))
                                    : void clearInterval(c);
                            }, 50));
                    }
                    function a() {
                        c && (clearInterval(c), (c = null)), o.stopScrolling(t);
                    }
                    var c = null,
                        u = { top: 0, left: 0 },
                        d = !1;
                    e.event.bind(
                        e.ownerDocument,
                        "selectionchange",
                        function () {
                            t.contains(n()) ? (d = !0) : ((d = !1), a());
                        }
                    ),
                        e.event.bind(window, "mouseup", function () {
                            d && ((d = !1), a());
                        }),
                        e.event.bind(window, "keyup", function () {
                            d && ((d = !1), a());
                        }),
                        e.event.bind(window, "mousemove", function (e) {
                            if (d) {
                                var n = { x: e.pageX, y: e.pageY },
                                    l = {
                                        left: t.offsetLeft,
                                        right: t.offsetLeft + t.offsetWidth,
                                        top: t.offsetTop,
                                        bottom: t.offsetTop + t.offsetHeight,
                                    };
                                n.x < l.left + 3
                                    ? ((u.left = -5), o.startScrolling(t, "x"))
                                    : n.x > l.right - 3
                                    ? ((u.left = 5), o.startScrolling(t, "x"))
                                    : (u.left = 0),
                                    n.y < l.top + 3
                                        ? (l.top + 3 - n.y < 5
                                              ? (u.top = -5)
                                              : (u.top = -20),
                                          o.startScrolling(t, "y"))
                                        : n.y > l.bottom - 3
                                        ? (n.y - l.bottom + 3 < 5
                                              ? (u.top = 5)
                                              : (u.top = 20),
                                          o.startScrolling(t, "y"))
                                        : (u.top = 0),
                                    0 === u.top && 0 === u.left ? a() : r();
                            }
                        });
                }
                var o = t("../../lib/helper"),
                    l = t("../instances"),
                    i = t("../update-geometry"),
                    s = t("../update-scroll");
                e.exports = function (t) {
                    var e = l.get(t);
                    r(t, e);
                };
            },
            {
                "../../lib/helper": 6,
                "../instances": 18,
                "../update-geometry": 19,
                "../update-scroll": 20,
            },
        ],
        16: [
            function (t, e, n) {
                "use strict";
                function r(t, e, n, r) {
                    function o(n, r) {
                        var o = t.scrollTop,
                            l = t.scrollLeft,
                            i = Math.abs(n),
                            s = Math.abs(r);
                        if (s > i) {
                            if (
                                (r < 0 &&
                                    o ===
                                        e.contentHeight - e.containerHeight) ||
                                (r > 0 && 0 === o)
                            )
                                return !e.settings.swipePropagation;
                        } else if (
                            i > s &&
                            ((n < 0 &&
                                l === e.contentWidth - e.containerWidth) ||
                                (n > 0 && 0 === l))
                        )
                            return !e.settings.swipePropagation;
                        return !0;
                    }
                    function a(e, n) {
                        s(t, "top", t.scrollTop - n),
                            s(t, "left", t.scrollLeft - e),
                            i(t);
                    }
                    function c() {
                        w = !0;
                    }
                    function u() {
                        w = !1;
                    }
                    function d(t) {
                        return t.targetTouches ? t.targetTouches[0] : t;
                    }
                    function p(t) {
                        return (
                            !(
                                !t.targetTouches || 1 !== t.targetTouches.length
                            ) ||
                            !(
                                !t.pointerType ||
                                "mouse" === t.pointerType ||
                                t.pointerType === t.MSPOINTER_TYPE_MOUSE
                            )
                        );
                    }
                    function f(t) {
                        if (p(t)) {
                            Y = !0;
                            var e = d(t);
                            (g.pageX = e.pageX),
                                (g.pageY = e.pageY),
                                (v = new Date().getTime()),
                                null !== y && clearInterval(y),
                                t.stopPropagation();
                        }
                    }
                    function h(t) {
                        if (
                            (!Y && e.settings.swipePropagation && f(t),
                            !w && Y && p(t))
                        ) {
                            var n = d(t),
                                r = { pageX: n.pageX, pageY: n.pageY },
                                l = r.pageX - g.pageX,
                                i = r.pageY - g.pageY;
                            a(l, i), (g = r);
                            var s = new Date().getTime(),
                                c = s - v;
                            c > 0 && ((m.x = l / c), (m.y = i / c), (v = s)),
                                o(l, i) &&
                                    (t.stopPropagation(), t.preventDefault());
                        }
                    }
                    function b() {
                        !w &&
                            Y &&
                            ((Y = !1),
                            e.settings.swipeEasing &&
                                (clearInterval(y),
                                (y = setInterval(function () {
                                    return l.get(t) && (m.x || m.y)
                                        ? Math.abs(m.x) < 0.01 &&
                                          Math.abs(m.y) < 0.01
                                            ? void clearInterval(y)
                                            : (a(30 * m.x, 30 * m.y),
                                              (m.x *= 0.8),
                                              void (m.y *= 0.8))
                                        : void clearInterval(y);
                                }, 10))));
                    }
                    var g = {},
                        v = 0,
                        m = {},
                        y = null,
                        w = !1,
                        Y = !1;
                    n
                        ? (e.event.bind(window, "touchstart", c),
                          e.event.bind(window, "touchend", u),
                          e.event.bind(t, "touchstart", f),
                          e.event.bind(t, "touchmove", h),
                          e.event.bind(t, "touchend", b))
                        : r &&
                          (window.PointerEvent
                              ? (e.event.bind(window, "pointerdown", c),
                                e.event.bind(window, "pointerup", u),
                                e.event.bind(t, "pointerdown", f),
                                e.event.bind(t, "pointermove", h),
                                e.event.bind(t, "pointerup", b))
                              : window.MSPointerEvent &&
                                (e.event.bind(window, "MSPointerDown", c),
                                e.event.bind(window, "MSPointerUp", u),
                                e.event.bind(t, "MSPointerDown", f),
                                e.event.bind(t, "MSPointerMove", h),
                                e.event.bind(t, "MSPointerUp", b)));
                }
                var o = t("../../lib/helper"),
                    l = t("../instances"),
                    i = t("../update-geometry"),
                    s = t("../update-scroll");
                e.exports = function (t) {
                    if (o.env.supportsTouch || o.env.supportsIePointer) {
                        var e = l.get(t);
                        r(t, e, o.env.supportsTouch, o.env.supportsIePointer);
                    }
                };
            },
            {
                "../../lib/helper": 6,
                "../instances": 18,
                "../update-geometry": 19,
                "../update-scroll": 20,
            },
        ],
        17: [
            function (t, e, n) {
                "use strict";
                var r = t("../lib/helper"),
                    o = t("../lib/class"),
                    l = t("./instances"),
                    i = t("./update-geometry"),
                    s = {
                        "click-rail": t("./handler/click-rail"),
                        "drag-scrollbar": t("./handler/drag-scrollbar"),
                        keyboard: t("./handler/keyboard"),
                        wheel: t("./handler/mouse-wheel"),
                        touch: t("./handler/touch"),
                        selection: t("./handler/selection"),
                    },
                    a = t("./handler/native-scroll");
                e.exports = function (t, e) {
                    (e = "object" == typeof e ? e : {}), o.add(t, "ps");
                    var n = l.add(t);
                    (n.settings = r.extend(n.settings, e)),
                        o.add(t, "ps--theme_" + n.settings.theme),
                        n.settings.handlers.forEach(function (e) {
                            s[e](t);
                        }),
                        a(t),
                        i(t);
                };
            },
            {
                "../lib/class": 2,
                "../lib/helper": 6,
                "./handler/click-rail": 10,
                "./handler/drag-scrollbar": 11,
                "./handler/keyboard": 12,
                "./handler/mouse-wheel": 13,
                "./handler/native-scroll": 14,
                "./handler/selection": 15,
                "./handler/touch": 16,
                "./instances": 18,
                "./update-geometry": 19,
            },
        ],
        18: [
            function (t, e, n) {
                "use strict";
                function r(t) {
                    function e() {
                        a.add(t, "ps--focus");
                    }
                    function n() {
                        a.remove(t, "ps--focus");
                    }
                    var r = this;
                    (r.settings = s.clone(c)),
                        (r.containerWidth = null),
                        (r.containerHeight = null),
                        (r.contentWidth = null),
                        (r.contentHeight = null),
                        (r.isRtl = "rtl" === u.css(t, "direction")),
                        (r.isNegativeScroll = (function () {
                            var e = t.scrollLeft,
                                n = null;
                            return (
                                (t.scrollLeft = -1),
                                (n = t.scrollLeft < 0),
                                (t.scrollLeft = e),
                                n
                            );
                        })()),
                        (r.negativeScrollAdjustment = r.isNegativeScroll
                            ? t.scrollWidth - t.clientWidth
                            : 0),
                        (r.event = new d()),
                        (r.ownerDocument = t.ownerDocument || document),
                        (r.scrollbarXRail = u.appendTo(
                            u.e("div", "ps__scrollbar-x-rail"),
                            t
                        )),
                        (r.scrollbarX = u.appendTo(
                            u.e("div", "ps__scrollbar-x"),
                            r.scrollbarXRail
                        )),
                        r.scrollbarX.setAttribute("tabindex", 0),
                        r.event.bind(r.scrollbarX, "focus", e),
                        r.event.bind(r.scrollbarX, "blur", n),
                        (r.scrollbarXActive = null),
                        (r.scrollbarXWidth = null),
                        (r.scrollbarXLeft = null),
                        (r.scrollbarXBottom = s.toInt(
                            u.css(r.scrollbarXRail, "bottom")
                        )),
                        (r.isScrollbarXUsingBottom =
                            r.scrollbarXBottom === r.scrollbarXBottom),
                        (r.scrollbarXTop = r.isScrollbarXUsingBottom
                            ? null
                            : s.toInt(u.css(r.scrollbarXRail, "top"))),
                        (r.railBorderXWidth =
                            s.toInt(
                                u.css(r.scrollbarXRail, "borderLeftWidth")
                            ) +
                            s.toInt(
                                u.css(r.scrollbarXRail, "borderRightWidth")
                            )),
                        u.css(r.scrollbarXRail, "display", "block"),
                        (r.railXMarginWidth =
                            s.toInt(u.css(r.scrollbarXRail, "marginLeft")) +
                            s.toInt(u.css(r.scrollbarXRail, "marginRight"))),
                        u.css(r.scrollbarXRail, "display", ""),
                        (r.railXWidth = null),
                        (r.railXRatio = null),
                        (r.scrollbarYRail = u.appendTo(
                            u.e("div", "ps__scrollbar-y-rail"),
                            t
                        )),
                        (r.scrollbarY = u.appendTo(
                            u.e("div", "ps__scrollbar-y"),
                            r.scrollbarYRail
                        )),
                        r.scrollbarY.setAttribute("tabindex", 0),
                        r.event.bind(r.scrollbarY, "focus", e),
                        r.event.bind(r.scrollbarY, "blur", n),
                        (r.scrollbarYActive = null),
                        (r.scrollbarYHeight = null),
                        (r.scrollbarYTop = null),
                        (r.scrollbarYRight = s.toInt(
                            u.css(r.scrollbarYRail, "right")
                        )),
                        (r.isScrollbarYUsingRight =
                            r.scrollbarYRight === r.scrollbarYRight),
                        (r.scrollbarYLeft = r.isScrollbarYUsingRight
                            ? null
                            : s.toInt(u.css(r.scrollbarYRail, "left"))),
                        (r.scrollbarYOuterWidth = r.isRtl
                            ? s.outerWidth(r.scrollbarY)
                            : null),
                        (r.railBorderYWidth =
                            s.toInt(u.css(r.scrollbarYRail, "borderTopWidth")) +
                            s.toInt(
                                u.css(r.scrollbarYRail, "borderBottomWidth")
                            )),
                        u.css(r.scrollbarYRail, "display", "block"),
                        (r.railYMarginHeight =
                            s.toInt(u.css(r.scrollbarYRail, "marginTop")) +
                            s.toInt(u.css(r.scrollbarYRail, "marginBottom"))),
                        u.css(r.scrollbarYRail, "display", ""),
                        (r.railYHeight = null),
                        (r.railYRatio = null);
                }
                function o(t) {
                    return t.getAttribute("data-ps-id");
                }
                function l(t, e) {
                    t.setAttribute("data-ps-id", e);
                }
                function i(t) {
                    t.removeAttribute("data-ps-id");
                }
                var s = t("../lib/helper"),
                    a = t("../lib/class"),
                    c = t("./default-setting"),
                    u = t("../lib/dom"),
                    d = t("../lib/event-manager"),
                    p = t("../lib/guid"),
                    f = {};
                (n.add = function (t) {
                    var e = p();
                    return l(t, e), (f[e] = new r(t)), f[e];
                }),
                    (n.remove = function (t) {
                        delete f[o(t)], i(t);
                    }),
                    (n.get = function (t) {
                        return f[o(t)];
                    });
            },
            {
                "../lib/class": 2,
                "../lib/dom": 3,
                "../lib/event-manager": 4,
                "../lib/guid": 5,
                "../lib/helper": 6,
                "./default-setting": 8,
            },
        ],
        19: [
            function (t, e, n) {
                "use strict";
                function r(t, e) {
                    return (
                        t.settings.minScrollbarLength &&
                            (e = Math.max(e, t.settings.minScrollbarLength)),
                        t.settings.maxScrollbarLength &&
                            (e = Math.min(e, t.settings.maxScrollbarLength)),
                        e
                    );
                }
                function o(t, e) {
                    var n = { width: e.railXWidth };
                    e.isRtl
                        ? (n.left =
                              e.negativeScrollAdjustment +
                              t.scrollLeft +
                              e.containerWidth -
                              e.contentWidth)
                        : (n.left = t.scrollLeft),
                        e.isScrollbarXUsingBottom
                            ? (n.bottom = e.scrollbarXBottom - t.scrollTop)
                            : (n.top = e.scrollbarXTop + t.scrollTop),
                        s.css(e.scrollbarXRail, n);
                    var r = { top: t.scrollTop, height: e.railYHeight };
                    e.isScrollbarYUsingRight
                        ? e.isRtl
                            ? (r.right =
                                  e.contentWidth -
                                  (e.negativeScrollAdjustment + t.scrollLeft) -
                                  e.scrollbarYRight -
                                  e.scrollbarYOuterWidth)
                            : (r.right = e.scrollbarYRight - t.scrollLeft)
                        : e.isRtl
                        ? (r.left =
                              e.negativeScrollAdjustment +
                              t.scrollLeft +
                              2 * e.containerWidth -
                              e.contentWidth -
                              e.scrollbarYLeft -
                              e.scrollbarYOuterWidth)
                        : (r.left = e.scrollbarYLeft + t.scrollLeft),
                        s.css(e.scrollbarYRail, r),
                        s.css(e.scrollbarX, {
                            left: e.scrollbarXLeft,
                            width: e.scrollbarXWidth - e.railBorderXWidth,
                        }),
                        s.css(e.scrollbarY, {
                            top: e.scrollbarYTop,
                            height: e.scrollbarYHeight - e.railBorderYWidth,
                        });
                }
                var l = t("../lib/helper"),
                    i = t("../lib/class"),
                    s = t("../lib/dom"),
                    a = t("./instances"),
                    c = t("./update-scroll");
                e.exports = function (t) {
                    var e = a.get(t);
                    (e.containerWidth = t.clientWidth),
                        (e.containerHeight = t.clientHeight),
                        (e.contentWidth = t.scrollWidth),
                        (e.contentHeight = t.scrollHeight);
                    var n;
                    t.contains(e.scrollbarXRail) ||
                        ((n = s.queryChildren(t, ".ps__scrollbar-x-rail")),
                        n.length > 0 &&
                            n.forEach(function (t) {
                                s.remove(t);
                            }),
                        s.appendTo(e.scrollbarXRail, t)),
                        t.contains(e.scrollbarYRail) ||
                            ((n = s.queryChildren(t, ".ps__scrollbar-y-rail")),
                            n.length > 0 &&
                                n.forEach(function (t) {
                                    s.remove(t);
                                }),
                            s.appendTo(e.scrollbarYRail, t)),
                        !e.settings.suppressScrollX &&
                        e.containerWidth + e.settings.scrollXMarginOffset <
                            e.contentWidth
                            ? ((e.scrollbarXActive = !0),
                              (e.railXWidth =
                                  e.containerWidth - e.railXMarginWidth),
                              (e.railXRatio = e.containerWidth / e.railXWidth),
                              (e.scrollbarXWidth = r(
                                  e,
                                  l.toInt(
                                      (e.railXWidth * e.containerWidth) /
                                          e.contentWidth
                                  )
                              )),
                              (e.scrollbarXLeft = l.toInt(
                                  ((e.negativeScrollAdjustment + t.scrollLeft) *
                                      (e.railXWidth - e.scrollbarXWidth)) /
                                      (e.contentWidth - e.containerWidth)
                              )))
                            : (e.scrollbarXActive = !1),
                        !e.settings.suppressScrollY &&
                        e.containerHeight + e.settings.scrollYMarginOffset <
                            e.contentHeight
                            ? ((e.scrollbarYActive = !0),
                              (e.railYHeight =
                                  e.containerHeight - e.railYMarginHeight),
                              (e.railYRatio =
                                  e.containerHeight / e.railYHeight),
                              (e.scrollbarYHeight = r(
                                  e,
                                  l.toInt(
                                      (e.railYHeight * e.containerHeight) /
                                          e.contentHeight
                                  )
                              )),
                              (e.scrollbarYTop = l.toInt(
                                  (t.scrollTop *
                                      (e.railYHeight - e.scrollbarYHeight)) /
                                      (e.contentHeight - e.containerHeight)
                              )))
                            : (e.scrollbarYActive = !1),
                        e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth &&
                            (e.scrollbarXLeft =
                                e.railXWidth - e.scrollbarXWidth),
                        e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight &&
                            (e.scrollbarYTop =
                                e.railYHeight - e.scrollbarYHeight),
                        o(t, e),
                        e.scrollbarXActive
                            ? i.add(t, "ps--active-x")
                            : (i.remove(t, "ps--active-x"),
                              (e.scrollbarXWidth = 0),
                              (e.scrollbarXLeft = 0),
                              c(t, "left", 0)),
                        e.scrollbarYActive
                            ? i.add(t, "ps--active-y")
                            : (i.remove(t, "ps--active-y"),
                              (e.scrollbarYHeight = 0),
                              (e.scrollbarYTop = 0),
                              c(t, "top", 0));
                };
            },
            {
                "../lib/class": 2,
                "../lib/dom": 3,
                "../lib/helper": 6,
                "./instances": 18,
                "./update-scroll": 20,
            },
        ],
        20: [
            function (t, e, n) {
                "use strict";
                var r = t("./instances"),
                    o = function (t) {
                        var e = document.createEvent("Event");
                        return e.initEvent(t, !0, !0), e;
                    };
                e.exports = function (t, e, n) {
                    if ("undefined" == typeof t)
                        throw "You must provide an element to the update-scroll function";
                    if ("undefined" == typeof e)
                        throw "You must provide an axis to the update-scroll function";
                    if ("undefined" == typeof n)
                        throw "You must provide a value to the update-scroll function";
                    "top" === e &&
                        n <= 0 &&
                        ((t.scrollTop = n = 0),
                        t.dispatchEvent(o("ps-y-reach-start"))),
                        "left" === e &&
                            n <= 0 &&
                            ((t.scrollLeft = n = 0),
                            t.dispatchEvent(o("ps-x-reach-start")));
                    var l = r.get(t);
                    "top" === e &&
                        n >= l.contentHeight - l.containerHeight &&
                        ((n = l.contentHeight - l.containerHeight),
                        n - t.scrollTop <= 1
                            ? (n = t.scrollTop)
                            : (t.scrollTop = n),
                        t.dispatchEvent(o("ps-y-reach-end"))),
                        "left" === e &&
                            n >= l.contentWidth - l.containerWidth &&
                            ((n = l.contentWidth - l.containerWidth),
                            n - t.scrollLeft <= 1
                                ? (n = t.scrollLeft)
                                : (t.scrollLeft = n),
                            t.dispatchEvent(o("ps-x-reach-end"))),
                        void 0 === l.lastTop && (l.lastTop = t.scrollTop),
                        void 0 === l.lastLeft && (l.lastLeft = t.scrollLeft),
                        "top" === e &&
                            n < l.lastTop &&
                            t.dispatchEvent(o("ps-scroll-up")),
                        "top" === e &&
                            n > l.lastTop &&
                            t.dispatchEvent(o("ps-scroll-down")),
                        "left" === e &&
                            n < l.lastLeft &&
                            t.dispatchEvent(o("ps-scroll-left")),
                        "left" === e &&
                            n > l.lastLeft &&
                            t.dispatchEvent(o("ps-scroll-right")),
                        "top" === e &&
                            n !== l.lastTop &&
                            ((t.scrollTop = l.lastTop = n),
                            t.dispatchEvent(o("ps-scroll-y"))),
                        "left" === e &&
                            n !== l.lastLeft &&
                            ((t.scrollLeft = l.lastLeft = n),
                            t.dispatchEvent(o("ps-scroll-x")));
                };
            },
            { "./instances": 18 },
        ],
        21: [
            function (t, e, n) {
                "use strict";
                var r = t("../lib/helper"),
                    o = t("../lib/dom"),
                    l = t("./instances"),
                    i = t("./update-geometry"),
                    s = t("./update-scroll");
                e.exports = function (t) {
                    var e = l.get(t);
                    e &&
                        ((e.negativeScrollAdjustment = e.isNegativeScroll
                            ? t.scrollWidth - t.clientWidth
                            : 0),
                        o.css(e.scrollbarXRail, "display", "block"),
                        o.css(e.scrollbarYRail, "display", "block"),
                        (e.railXMarginWidth =
                            r.toInt(o.css(e.scrollbarXRail, "marginLeft")) +
                            r.toInt(o.css(e.scrollbarXRail, "marginRight"))),
                        (e.railYMarginHeight =
                            r.toInt(o.css(e.scrollbarYRail, "marginTop")) +
                            r.toInt(o.css(e.scrollbarYRail, "marginBottom"))),
                        o.css(e.scrollbarXRail, "display", "none"),
                        o.css(e.scrollbarYRail, "display", "none"),
                        i(t),
                        s(t, "top", t.scrollTop),
                        s(t, "left", t.scrollLeft),
                        o.css(e.scrollbarXRail, "display", ""),
                        o.css(e.scrollbarYRail, "display", ""));
                };
            },
            {
                "../lib/dom": 3,
                "../lib/helper": 6,
                "./instances": 18,
                "./update-geometry": 19,
                "./update-scroll": 20,
            },
        ],
    },
    {},
    [1]
);

/*
	xdan/datetimepicker
	https://github.com/xdan/datetimepicker
*/

var DateFormatter;
!(function () {
    "use strict";
    var e, t, a, r, n, o, i;
    (o = 864e5),
        (i = 3600),
        (e = function (e, t) {
            return (
                "string" == typeof e &&
                "string" == typeof t &&
                e.toLowerCase() === t.toLowerCase()
            );
        }),
        (t = function (e, a, r) {
            var n = r || "0",
                o = e.toString();
            return o.length < a ? t(n + o, a) : o;
        }),
        (a = function (e) {
            var t, r;
            for (e = e || {}, t = 1; t < arguments.length; t++)
                if ((r = arguments[t]))
                    for (var n in r)
                        r.hasOwnProperty(n) &&
                            ("object" == typeof r[n]
                                ? a(e[n], r[n])
                                : (e[n] = r[n]));
            return e;
        }),
        (r = function (e, t) {
            for (var a = 0; a < t.length; a++)
                if (t[a].toLowerCase() === e.toLowerCase()) return a;
            return -1;
        }),
        (n = {
            dateSettings: {
                days: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                months: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ],
                monthsShort: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
                meridiem: ["AM", "PM"],
                ordinal: function (e) {
                    var t = e % 10,
                        a = { 1: "st", 2: "nd", 3: "rd" };
                    return 1 !== Math.floor((e % 100) / 10) && a[t]
                        ? a[t]
                        : "th";
                },
            },
            separators: /[ \-+\/\.T:@]/g,
            validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
            intParts: /[djwNzmnyYhHgGis]/g,
            tzParts:
                /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            tzClip: /[^-+\dA-Z]/g,
        }),
        ((DateFormatter = function (e) {
            var t = this,
                r = a(n, e);
            (t.dateSettings = r.dateSettings),
                (t.separators = r.separators),
                (t.validParts = r.validParts),
                (t.intParts = r.intParts),
                (t.tzParts = r.tzParts),
                (t.tzClip = r.tzClip);
        }).prototype = {
            constructor: DateFormatter,
            getMonth: function (e) {
                var t,
                    a = this;
                return (
                    0 === (t = r(e, a.dateSettings.monthsShort) + 1) &&
                        (t = r(e, a.dateSettings.months) + 1),
                    t
                );
            },
            parseDate: function (t, a) {
                var r,
                    n,
                    o,
                    i,
                    s,
                    u,
                    d,
                    l,
                    f,
                    c,
                    m = this,
                    h = !1,
                    g = !1,
                    p = m.dateSettings,
                    D = {
                        date: null,
                        year: null,
                        month: null,
                        day: null,
                        hour: 0,
                        min: 0,
                        sec: 0,
                    };
                if (!t) return null;
                if (t instanceof Date) return t;
                if ("U" === a) return (o = parseInt(t)) ? new Date(1e3 * o) : t;
                switch (typeof t) {
                    case "number":
                        return new Date(t);
                    case "string":
                        break;
                    default:
                        return null;
                }
                if (!(r = a.match(m.validParts)) || 0 === r.length)
                    throw new Error("Invalid date format definition.");
                for (
                    n = t.replace(m.separators, "\0").split("\0"), o = 0;
                    o < n.length;
                    o++
                )
                    switch (((i = n[o]), (s = parseInt(i)), r[o])) {
                        case "y":
                        case "Y":
                            if (!s) return null;
                            (f = i.length),
                                (D.year =
                                    2 === f
                                        ? parseInt((70 > s ? "20" : "19") + i)
                                        : s),
                                (h = !0);
                            break;
                        case "m":
                        case "n":
                        case "M":
                        case "F":
                            if (isNaN(s)) {
                                if (!((u = m.getMonth(i)) > 0)) return null;
                                D.month = u;
                            } else {
                                if (!(s >= 1 && 12 >= s)) return null;
                                D.month = s;
                            }
                            h = !0;
                            break;
                        case "d":
                        case "j":
                            if (!(s >= 1 && 31 >= s)) return null;
                            (D.day = s), (h = !0);
                            break;
                        case "g":
                        case "h":
                            if (
                                ((d =
                                    r.indexOf("a") > -1
                                        ? r.indexOf("a")
                                        : r.indexOf("A") > -1
                                        ? r.indexOf("A")
                                        : -1),
                                (c = n[d]),
                                d > -1)
                            )
                                (l = e(c, p.meridiem[0])
                                    ? 0
                                    : e(c, p.meridiem[1])
                                    ? 12
                                    : -1),
                                    s >= 1 && 12 >= s && l > -1
                                        ? (D.hour = s + l - 1)
                                        : s >= 0 && 23 >= s && (D.hour = s);
                            else {
                                if (!(s >= 0 && 23 >= s)) return null;
                                D.hour = s;
                            }
                            g = !0;
                            break;
                        case "G":
                        case "H":
                            if (!(s >= 0 && 23 >= s)) return null;
                            (D.hour = s), (g = !0);
                            break;
                        case "i":
                            if (!(s >= 0 && 59 >= s)) return null;
                            (D.min = s), (g = !0);
                            break;
                        case "s":
                            if (!(s >= 0 && 59 >= s)) return null;
                            (D.sec = s), (g = !0);
                    }
                if (!0 === h && D.year && D.month && D.day)
                    D.date = new Date(
                        D.year,
                        D.month - 1,
                        D.day,
                        D.hour,
                        D.min,
                        D.sec,
                        0
                    );
                else {
                    if (!0 !== g) return null;
                    D.date = new Date(0, 0, 0, D.hour, D.min, D.sec, 0);
                }
                return D.date;
            },
            guessDate: function (e, t) {
                if ("string" != typeof e) return e;
                var a,
                    r,
                    n,
                    o,
                    i,
                    s,
                    u = this,
                    d = e.replace(u.separators, "\0").split("\0"),
                    l = /^[djmn]/g,
                    f = t.match(u.validParts),
                    c = new Date(),
                    m = 0;
                if (!l.test(f[0])) return e;
                for (n = 0; n < d.length; n++) {
                    if (
                        ((m = 2),
                        (i = d[n]),
                        (s = parseInt(i.substr(0, 2))),
                        isNaN(s))
                    )
                        return null;
                    switch (n) {
                        case 0:
                            "m" === f[0] || "n" === f[0]
                                ? c.setMonth(s - 1)
                                : c.setDate(s);
                            break;
                        case 1:
                            "m" === f[0] || "n" === f[0]
                                ? c.setDate(s)
                                : c.setMonth(s - 1);
                            break;
                        case 2:
                            if (
                                ((r = c.getFullYear()),
                                (a = i.length),
                                (m = 4 > a ? a : 4),
                                !(r = parseInt(
                                    4 > a
                                        ? r.toString().substr(0, 4 - a) + i
                                        : i.substr(0, 4)
                                )))
                            )
                                return null;
                            c.setFullYear(r);
                            break;
                        case 3:
                            c.setHours(s);
                            break;
                        case 4:
                            c.setMinutes(s);
                            break;
                        case 5:
                            c.setSeconds(s);
                    }
                    (o = i.substr(m)).length > 0 && d.splice(n + 1, 0, o);
                }
                return c;
            },
            parseFormat: function (e, a) {
                var r,
                    n = this,
                    s = n.dateSettings,
                    u = /\\?(.?)/gi,
                    d = function (e, t) {
                        return r[e] ? r[e]() : t;
                    };
                return (
                    (r = {
                        d: function () {
                            return t(r.j(), 2);
                        },
                        D: function () {
                            return s.daysShort[r.w()];
                        },
                        j: function () {
                            return a.getDate();
                        },
                        l: function () {
                            return s.days[r.w()];
                        },
                        N: function () {
                            return r.w() || 7;
                        },
                        w: function () {
                            return a.getDay();
                        },
                        z: function () {
                            var e = new Date(r.Y(), r.n() - 1, r.j()),
                                t = new Date(r.Y(), 0, 1);
                            return Math.round((e - t) / o);
                        },
                        W: function () {
                            var e = new Date(
                                    r.Y(),
                                    r.n() - 1,
                                    r.j() - r.N() + 3
                                ),
                                a = new Date(e.getFullYear(), 0, 4);
                            return t(1 + Math.round((e - a) / o / 7), 2);
                        },
                        F: function () {
                            return s.months[a.getMonth()];
                        },
                        m: function () {
                            return t(r.n(), 2);
                        },
                        M: function () {
                            return s.monthsShort[a.getMonth()];
                        },
                        n: function () {
                            return a.getMonth() + 1;
                        },
                        t: function () {
                            return new Date(r.Y(), r.n(), 0).getDate();
                        },
                        L: function () {
                            var e = r.Y();
                            return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0
                                ? 1
                                : 0;
                        },
                        o: function () {
                            var e = r.n(),
                                t = r.W();
                            return (
                                r.Y() +
                                (12 === e && 9 > t
                                    ? 1
                                    : 1 === e && t > 9
                                    ? -1
                                    : 0)
                            );
                        },
                        Y: function () {
                            return a.getFullYear();
                        },
                        y: function () {
                            return r.Y().toString().slice(-2);
                        },
                        a: function () {
                            return r.A().toLowerCase();
                        },
                        A: function () {
                            var e = r.G() < 12 ? 0 : 1;
                            return s.meridiem[e];
                        },
                        B: function () {
                            var e = a.getUTCHours() * i,
                                r = 60 * a.getUTCMinutes(),
                                n = a.getUTCSeconds();
                            return t(
                                Math.floor((e + r + n + i) / 86.4) % 1e3,
                                3
                            );
                        },
                        g: function () {
                            return r.G() % 12 || 12;
                        },
                        G: function () {
                            return a.getHours();
                        },
                        h: function () {
                            return t(r.g(), 2);
                        },
                        H: function () {
                            return t(r.G(), 2);
                        },
                        i: function () {
                            return t(a.getMinutes(), 2);
                        },
                        s: function () {
                            return t(a.getSeconds(), 2);
                        },
                        u: function () {
                            return t(1e3 * a.getMilliseconds(), 6);
                        },
                        e: function () {
                            return (
                                /\((.*)\)/.exec(String(a))[1] ||
                                "Coordinated Universal Time"
                            );
                        },
                        I: function () {
                            return new Date(r.Y(), 0) - Date.UTC(r.Y(), 0) !=
                                new Date(r.Y(), 6) - Date.UTC(r.Y(), 6)
                                ? 1
                                : 0;
                        },
                        O: function () {
                            var e = a.getTimezoneOffset(),
                                r = Math.abs(e);
                            return (
                                (e > 0 ? "-" : "+") +
                                t(100 * Math.floor(r / 60) + (r % 60), 4)
                            );
                        },
                        P: function () {
                            var e = r.O();
                            return e.substr(0, 3) + ":" + e.substr(3, 2);
                        },
                        T: function () {
                            return (
                                (String(a).match(n.tzParts) || [""])
                                    .pop()
                                    .replace(n.tzClip, "") || "UTC"
                            );
                        },
                        Z: function () {
                            return 60 * -a.getTimezoneOffset();
                        },
                        c: function () {
                            return "Y-m-d\\TH:i:sP".replace(u, d);
                        },
                        r: function () {
                            return "D, d M Y H:i:s O".replace(u, d);
                        },
                        U: function () {
                            return a.getTime() / 1e3 || 0;
                        },
                    }),
                    d(e, e)
                );
            },
            formatDate: function (e, t) {
                var a,
                    r,
                    n,
                    o,
                    i,
                    s = this,
                    u = "";
                if ("string" == typeof e && !(e = s.parseDate(e, t)))
                    return null;
                if (e instanceof Date) {
                    for (n = t.length, a = 0; n > a; a++)
                        "S" !== (i = t.charAt(a)) &&
                            "\\" !== i &&
                            (a > 0 && "\\" === t.charAt(a - 1)
                                ? (u += i)
                                : ((o = s.parseFormat(i, e)),
                                  a !== n - 1 &&
                                      s.intParts.test(i) &&
                                      "S" === t.charAt(a + 1) &&
                                      ((r = parseInt(o) || 0),
                                      (o += s.dateSettings.ordinal(r))),
                                  (u += o)));
                    return u;
                }
                return "";
            },
        });
})();
var datetimepickerFactory = function (e) {
    "use strict";
    function t(e, t, a) {
        (this.date = e), (this.desc = t), (this.style = a);
    }
    var a = {
            i18n: {
                ar: {
                    months: [
                        "كانون الثاني",
                        "شباط",
                        "آذار",
                        "نيسان",
                        "مايو",
                        "حزيران",
                        "تموز",
                        "آب",
                        "أيلول",
                        "تشرين الأول",
                        "تشرين الثاني",
                        "كانون الأول",
                    ],
                    dayOfWeekShort: ["ن", "ث", "ع", "خ", "ج", "س", "ح"],
                    dayOfWeek: [
                        "الأحد",
                        "الاثنين",
                        "الثلاثاء",
                        "الأربعاء",
                        "الخميس",
                        "الجمعة",
                        "السبت",
                        "الأحد",
                    ],
                },
                ro: {
                    months: [
                        "Ianuarie",
                        "Februarie",
                        "Martie",
                        "Aprilie",
                        "Mai",
                        "Iunie",
                        "Iulie",
                        "August",
                        "Septembrie",
                        "Octombrie",
                        "Noiembrie",
                        "Decembrie",
                    ],
                    dayOfWeekShort: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
                    dayOfWeek: [
                        "Duminică",
                        "Luni",
                        "Marţi",
                        "Miercuri",
                        "Joi",
                        "Vineri",
                        "Sâmbătă",
                    ],
                },
                id: {
                    months: [
                        "Januari",
                        "Februari",
                        "Maret",
                        "April",
                        "Mei",
                        "Juni",
                        "Juli",
                        "Agustus",
                        "September",
                        "Oktober",
                        "November",
                        "Desember",
                    ],
                    dayOfWeekShort: [
                        "Min",
                        "Sen",
                        "Sel",
                        "Rab",
                        "Kam",
                        "Jum",
                        "Sab",
                    ],
                    dayOfWeek: [
                        "Minggu",
                        "Senin",
                        "Selasa",
                        "Rabu",
                        "Kamis",
                        "Jumat",
                        "Sabtu",
                    ],
                },
                is: {
                    months: [
                        "Janúar",
                        "Febrúar",
                        "Mars",
                        "Apríl",
                        "Maí",
                        "Júní",
                        "Júlí",
                        "Ágúst",
                        "September",
                        "Október",
                        "Nóvember",
                        "Desember",
                    ],
                    dayOfWeekShort: [
                        "Sun",
                        "Mán",
                        "Þrið",
                        "Mið",
                        "Fim",
                        "Fös",
                        "Lau",
                    ],
                    dayOfWeek: [
                        "Sunnudagur",
                        "Mánudagur",
                        "Þriðjudagur",
                        "Miðvikudagur",
                        "Fimmtudagur",
                        "Föstudagur",
                        "Laugardagur",
                    ],
                },
                bg: {
                    months: [
                        "Януари",
                        "Февруари",
                        "Март",
                        "Април",
                        "Май",
                        "Юни",
                        "Юли",
                        "Август",
                        "Септември",
                        "Октомври",
                        "Ноември",
                        "Декември",
                    ],
                    dayOfWeekShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    dayOfWeek: [
                        "Неделя",
                        "Понеделник",
                        "Вторник",
                        "Сряда",
                        "Четвъртък",
                        "Петък",
                        "Събота",
                    ],
                },
                fa: {
                    months: [
                        "فروردین",
                        "اردیبهشت",
                        "خرداد",
                        "تیر",
                        "مرداد",
                        "شهریور",
                        "مهر",
                        "آبان",
                        "آذر",
                        "دی",
                        "بهمن",
                        "اسفند",
                    ],
                    dayOfWeekShort: [
                        "یکشنبه",
                        "دوشنبه",
                        "سه شنبه",
                        "چهارشنبه",
                        "پنجشنبه",
                        "جمعه",
                        "شنبه",
                    ],
                    dayOfWeek: [
                        "یک‌شنبه",
                        "دوشنبه",
                        "سه‌شنبه",
                        "چهارشنبه",
                        "پنج‌شنبه",
                        "جمعه",
                        "شنبه",
                        "یک‌شنبه",
                    ],
                },
                ru: {
                    months: [
                        "Январь",
                        "Февраль",
                        "Март",
                        "Апрель",
                        "Май",
                        "Июнь",
                        "Июль",
                        "Август",
                        "Сентябрь",
                        "Октябрь",
                        "Ноябрь",
                        "Декабрь",
                    ],
                    dayOfWeekShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    dayOfWeek: [
                        "Воскресенье",
                        "Понедельник",
                        "Вторник",
                        "Среда",
                        "Четверг",
                        "Пятница",
                        "Суббота",
                    ],
                },
                uk: {
                    months: [
                        "Січень",
                        "Лютий",
                        "Березень",
                        "Квітень",
                        "Травень",
                        "Червень",
                        "Липень",
                        "Серпень",
                        "Вересень",
                        "Жовтень",
                        "Листопад",
                        "Грудень",
                    ],
                    dayOfWeekShort: [
                        "Ндл",
                        "Пнд",
                        "Втр",
                        "Срд",
                        "Чтв",
                        "Птн",
                        "Сбт",
                    ],
                    dayOfWeek: [
                        "Неділя",
                        "Понеділок",
                        "Вівторок",
                        "Середа",
                        "Четвер",
                        "П'ятниця",
                        "Субота",
                    ],
                },
                en: {
                    months: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                    dayOfWeekShort: [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                    ],
                    dayOfWeek: [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                    ],
                },
                el: {
                    months: [
                        "Ιανουάριος",
                        "Φεβρουάριος",
                        "Μάρτιος",
                        "Απρίλιος",
                        "Μάιος",
                        "Ιούνιος",
                        "Ιούλιος",
                        "Αύγουστος",
                        "Σεπτέμβριος",
                        "Οκτώβριος",
                        "Νοέμβριος",
                        "Δεκέμβριος",
                    ],
                    dayOfWeekShort: [
                        "Κυρ",
                        "Δευ",
                        "Τρι",
                        "Τετ",
                        "Πεμ",
                        "Παρ",
                        "Σαβ",
                    ],
                    dayOfWeek: [
                        "Κυριακή",
                        "Δευτέρα",
                        "Τρίτη",
                        "Τετάρτη",
                        "Πέμπτη",
                        "Παρασκευή",
                        "Σάββατο",
                    ],
                },
                de: {
                    months: [
                        "Januar",
                        "Februar",
                        "März",
                        "April",
                        "Mai",
                        "Juni",
                        "Juli",
                        "August",
                        "September",
                        "Oktober",
                        "November",
                        "Dezember",
                    ],
                    dayOfWeekShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                    dayOfWeek: [
                        "Sonntag",
                        "Montag",
                        "Dienstag",
                        "Mittwoch",
                        "Donnerstag",
                        "Freitag",
                        "Samstag",
                    ],
                },
                nl: {
                    months: [
                        "januari",
                        "februari",
                        "maart",
                        "april",
                        "mei",
                        "juni",
                        "juli",
                        "augustus",
                        "september",
                        "oktober",
                        "november",
                        "december",
                    ],
                    dayOfWeekShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
                    dayOfWeek: [
                        "zondag",
                        "maandag",
                        "dinsdag",
                        "woensdag",
                        "donderdag",
                        "vrijdag",
                        "zaterdag",
                    ],
                },
                tr: {
                    months: [
                        "Ocak",
                        "Şubat",
                        "Mart",
                        "Nisan",
                        "Mayıs",
                        "Haziran",
                        "Temmuz",
                        "Ağustos",
                        "Eylül",
                        "Ekim",
                        "Kasım",
                        "Aralık",
                    ],
                    dayOfWeekShort: [
                        "Paz",
                        "Pts",
                        "Sal",
                        "Çar",
                        "Per",
                        "Cum",
                        "Cts",
                    ],
                    dayOfWeek: [
                        "Pazar",
                        "Pazartesi",
                        "Salı",
                        "Çarşamba",
                        "Perşembe",
                        "Cuma",
                        "Cumartesi",
                    ],
                },
                fr: {
                    months: [
                        "Janvier",
                        "Février",
                        "Mars",
                        "Avril",
                        "Mai",
                        "Juin",
                        "Juillet",
                        "Août",
                        "Septembre",
                        "Octobre",
                        "Novembre",
                        "Décembre",
                    ],
                    dayOfWeekShort: [
                        "Dim",
                        "Lun",
                        "Mar",
                        "Mer",
                        "Jeu",
                        "Ven",
                        "Sam",
                    ],
                    dayOfWeek: [
                        "dimanche",
                        "lundi",
                        "mardi",
                        "mercredi",
                        "jeudi",
                        "vendredi",
                        "samedi",
                    ],
                },
                es: {
                    months: [
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre",
                    ],
                    dayOfWeekShort: [
                        "Dom",
                        "Lun",
                        "Mar",
                        "Mié",
                        "Jue",
                        "Vie",
                        "Sáb",
                    ],
                    dayOfWeek: [
                        "Domingo",
                        "Lunes",
                        "Martes",
                        "Miércoles",
                        "Jueves",
                        "Viernes",
                        "Sábado",
                    ],
                },
                th: {
                    months: [
                        "มกราคม",
                        "กุมภาพันธ์",
                        "มีนาคม",
                        "เมษายน",
                        "พฤษภาคม",
                        "มิถุนายน",
                        "กรกฎาคม",
                        "สิงหาคม",
                        "กันยายน",
                        "ตุลาคม",
                        "พฤศจิกายน",
                        "ธันวาคม",
                    ],
                    dayOfWeekShort: [
                        "อา.",
                        "จ.",
                        "อ.",
                        "พ.",
                        "พฤ.",
                        "ศ.",
                        "ส.",
                    ],
                    dayOfWeek: [
                        "อาทิตย์",
                        "จันทร์",
                        "อังคาร",
                        "พุธ",
                        "พฤหัส",
                        "ศุกร์",
                        "เสาร์",
                        "อาทิตย์",
                    ],
                },
                pl: {
                    months: [
                        "styczeń",
                        "luty",
                        "marzec",
                        "kwiecień",
                        "maj",
                        "czerwiec",
                        "lipiec",
                        "sierpień",
                        "wrzesień",
                        "październik",
                        "listopad",
                        "grudzień",
                    ],
                    dayOfWeekShort: ["nd", "pn", "wt", "śr", "cz", "pt", "sb"],
                    dayOfWeek: [
                        "niedziela",
                        "poniedziałek",
                        "wtorek",
                        "środa",
                        "czwartek",
                        "piątek",
                        "sobota",
                    ],
                },
                pt: {
                    months: [
                        "Janeiro",
                        "Fevereiro",
                        "Março",
                        "Abril",
                        "Maio",
                        "Junho",
                        "Julho",
                        "Agosto",
                        "Setembro",
                        "Outubro",
                        "Novembro",
                        "Dezembro",
                    ],
                    dayOfWeekShort: [
                        "Dom",
                        "Seg",
                        "Ter",
                        "Qua",
                        "Qui",
                        "Sex",
                        "Sab",
                    ],
                    dayOfWeek: [
                        "Domingo",
                        "Segunda",
                        "Terça",
                        "Quarta",
                        "Quinta",
                        "Sexta",
                        "Sábado",
                    ],
                },
                ch: {
                    months: [
                        "一月",
                        "二月",
                        "三月",
                        "四月",
                        "五月",
                        "六月",
                        "七月",
                        "八月",
                        "九月",
                        "十月",
                        "十一月",
                        "十二月",
                    ],
                    dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                },
                se: {
                    months: [
                        "Januari",
                        "Februari",
                        "Mars",
                        "April",
                        "Maj",
                        "Juni",
                        "Juli",
                        "Augusti",
                        "September",
                        "Oktober",
                        "November",
                        "December",
                    ],
                    dayOfWeekShort: [
                        "Sön",
                        "Mån",
                        "Tis",
                        "Ons",
                        "Tor",
                        "Fre",
                        "Lör",
                    ],
                },
                km: {
                    months: [
                        "មករា​",
                        "កុម្ភៈ",
                        "មិនា​",
                        "មេសា​",
                        "ឧសភា​",
                        "មិថុនា​",
                        "កក្កដា​",
                        "សីហា​",
                        "កញ្ញា​",
                        "តុលា​",
                        "វិច្ឆិកា",
                        "ធ្នូ​",
                    ],
                    dayOfWeekShort: [
                        "អាទិ​",
                        "ច័ន្ទ​",
                        "អង្គារ​",
                        "ពុធ​",
                        "ព្រហ​​",
                        "សុក្រ​",
                        "សៅរ៍",
                    ],
                    dayOfWeek: [
                        "អាទិត្យ​",
                        "ច័ន្ទ​",
                        "អង្គារ​",
                        "ពុធ​",
                        "ព្រហស្បតិ៍​",
                        "សុក្រ​",
                        "សៅរ៍",
                    ],
                },
                kr: {
                    months: [
                        "1월",
                        "2월",
                        "3월",
                        "4월",
                        "5월",
                        "6월",
                        "7월",
                        "8월",
                        "9월",
                        "10월",
                        "11월",
                        "12월",
                    ],
                    dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
                    dayOfWeek: [
                        "일요일",
                        "월요일",
                        "화요일",
                        "수요일",
                        "목요일",
                        "금요일",
                        "토요일",
                    ],
                },
                it: {
                    months: [
                        "Gennaio",
                        "Febbraio",
                        "Marzo",
                        "Aprile",
                        "Maggio",
                        "Giugno",
                        "Luglio",
                        "Agosto",
                        "Settembre",
                        "Ottobre",
                        "Novembre",
                        "Dicembre",
                    ],
                    dayOfWeekShort: [
                        "Dom",
                        "Lun",
                        "Mar",
                        "Mer",
                        "Gio",
                        "Ven",
                        "Sab",
                    ],
                    dayOfWeek: [
                        "Domenica",
                        "Lunedì",
                        "Martedì",
                        "Mercoledì",
                        "Giovedì",
                        "Venerdì",
                        "Sabato",
                    ],
                },
                da: {
                    months: [
                        "Januar",
                        "Februar",
                        "Marts",
                        "April",
                        "Maj",
                        "Juni",
                        "Juli",
                        "August",
                        "September",
                        "Oktober",
                        "November",
                        "December",
                    ],
                    dayOfWeekShort: [
                        "Søn",
                        "Man",
                        "Tir",
                        "Ons",
                        "Tor",
                        "Fre",
                        "Lør",
                    ],
                    dayOfWeek: [
                        "søndag",
                        "mandag",
                        "tirsdag",
                        "onsdag",
                        "torsdag",
                        "fredag",
                        "lørdag",
                    ],
                },
                no: {
                    months: [
                        "Januar",
                        "Februar",
                        "Mars",
                        "April",
                        "Mai",
                        "Juni",
                        "Juli",
                        "August",
                        "September",
                        "Oktober",
                        "November",
                        "Desember",
                    ],
                    dayOfWeekShort: [
                        "Søn",
                        "Man",
                        "Tir",
                        "Ons",
                        "Tor",
                        "Fre",
                        "Lør",
                    ],
                    dayOfWeek: [
                        "Søndag",
                        "Mandag",
                        "Tirsdag",
                        "Onsdag",
                        "Torsdag",
                        "Fredag",
                        "Lørdag",
                    ],
                },
                ja: {
                    months: [
                        "1月",
                        "2月",
                        "3月",
                        "4月",
                        "5月",
                        "6月",
                        "7月",
                        "8月",
                        "9月",
                        "10月",
                        "11月",
                        "12月",
                    ],
                    dayOfWeekShort: ["日", "月", "火", "水", "木", "金", "土"],
                    dayOfWeek: [
                        "日曜",
                        "月曜",
                        "火曜",
                        "水曜",
                        "木曜",
                        "金曜",
                        "土曜",
                    ],
                },
                vi: {
                    months: [
                        "Tháng 1",
                        "Tháng 2",
                        "Tháng 3",
                        "Tháng 4",
                        "Tháng 5",
                        "Tháng 6",
                        "Tháng 7",
                        "Tháng 8",
                        "Tháng 9",
                        "Tháng 10",
                        "Tháng 11",
                        "Tháng 12",
                    ],
                    dayOfWeekShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                    dayOfWeek: [
                        "Chủ nhật",
                        "Thứ hai",
                        "Thứ ba",
                        "Thứ tư",
                        "Thứ năm",
                        "Thứ sáu",
                        "Thứ bảy",
                    ],
                },
                sl: {
                    months: [
                        "Januar",
                        "Februar",
                        "Marec",
                        "April",
                        "Maj",
                        "Junij",
                        "Julij",
                        "Avgust",
                        "September",
                        "Oktober",
                        "November",
                        "December",
                    ],
                    dayOfWeekShort: [
                        "Ned",
                        "Pon",
                        "Tor",
                        "Sre",
                        "Čet",
                        "Pet",
                        "Sob",
                    ],
                    dayOfWeek: [
                        "Nedelja",
                        "Ponedeljek",
                        "Torek",
                        "Sreda",
                        "Četrtek",
                        "Petek",
                        "Sobota",
                    ],
                },
                cs: {
                    months: [
                        "Leden",
                        "Únor",
                        "Březen",
                        "Duben",
                        "Květen",
                        "Červen",
                        "Červenec",
                        "Srpen",
                        "Září",
                        "Říjen",
                        "Listopad",
                        "Prosinec",
                    ],
                    dayOfWeekShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
                },
                hu: {
                    months: [
                        "Január",
                        "Február",
                        "Március",
                        "Április",
                        "Május",
                        "Június",
                        "Július",
                        "Augusztus",
                        "Szeptember",
                        "Október",
                        "November",
                        "December",
                    ],
                    dayOfWeekShort: [
                        "Va",
                        "Hé",
                        "Ke",
                        "Sze",
                        "Cs",
                        "Pé",
                        "Szo",
                    ],
                    dayOfWeek: [
                        "vasárnap",
                        "hétfő",
                        "kedd",
                        "szerda",
                        "csütörtök",
                        "péntek",
                        "szombat",
                    ],
                },
                az: {
                    months: [
                        "Yanvar",
                        "Fevral",
                        "Mart",
                        "Aprel",
                        "May",
                        "Iyun",
                        "Iyul",
                        "Avqust",
                        "Sentyabr",
                        "Oktyabr",
                        "Noyabr",
                        "Dekabr",
                    ],
                    dayOfWeekShort: ["B", "Be", "Ça", "Ç", "Ca", "C", "Ş"],
                    dayOfWeek: [
                        "Bazar",
                        "Bazar ertəsi",
                        "Çərşənbə axşamı",
                        "Çərşənbə",
                        "Cümə axşamı",
                        "Cümə",
                        "Şənbə",
                    ],
                },
                bs: {
                    months: [
                        "Januar",
                        "Februar",
                        "Mart",
                        "April",
                        "Maj",
                        "Jun",
                        "Jul",
                        "Avgust",
                        "Septembar",
                        "Oktobar",
                        "Novembar",
                        "Decembar",
                    ],
                    dayOfWeekShort: [
                        "Ned",
                        "Pon",
                        "Uto",
                        "Sri",
                        "Čet",
                        "Pet",
                        "Sub",
                    ],
                    dayOfWeek: [
                        "Nedjelja",
                        "Ponedjeljak",
                        "Utorak",
                        "Srijeda",
                        "Četvrtak",
                        "Petak",
                        "Subota",
                    ],
                },
                ca: {
                    months: [
                        "Gener",
                        "Febrer",
                        "Març",
                        "Abril",
                        "Maig",
                        "Juny",
                        "Juliol",
                        "Agost",
                        "Setembre",
                        "Octubre",
                        "Novembre",
                        "Desembre",
                    ],
                    dayOfWeekShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
                    dayOfWeek: [
                        "Diumenge",
                        "Dilluns",
                        "Dimarts",
                        "Dimecres",
                        "Dijous",
                        "Divendres",
                        "Dissabte",
                    ],
                },
                "en-GB": {
                    months: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                    dayOfWeekShort: [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                    ],
                    dayOfWeek: [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                    ],
                },
                et: {
                    months: [
                        "Jaanuar",
                        "Veebruar",
                        "Märts",
                        "Aprill",
                        "Mai",
                        "Juuni",
                        "Juuli",
                        "August",
                        "September",
                        "Oktoober",
                        "November",
                        "Detsember",
                    ],
                    dayOfWeekShort: ["P", "E", "T", "K", "N", "R", "L"],
                    dayOfWeek: [
                        "Pühapäev",
                        "Esmaspäev",
                        "Teisipäev",
                        "Kolmapäev",
                        "Neljapäev",
                        "Reede",
                        "Laupäev",
                    ],
                },
                eu: {
                    months: [
                        "Urtarrila",
                        "Otsaila",
                        "Martxoa",
                        "Apirila",
                        "Maiatza",
                        "Ekaina",
                        "Uztaila",
                        "Abuztua",
                        "Iraila",
                        "Urria",
                        "Azaroa",
                        "Abendua",
                    ],
                    dayOfWeekShort: [
                        "Ig.",
                        "Al.",
                        "Ar.",
                        "Az.",
                        "Og.",
                        "Or.",
                        "La.",
                    ],
                    dayOfWeek: [
                        "Igandea",
                        "Astelehena",
                        "Asteartea",
                        "Asteazkena",
                        "Osteguna",
                        "Ostirala",
                        "Larunbata",
                    ],
                },
                fi: {
                    months: [
                        "Tammikuu",
                        "Helmikuu",
                        "Maaliskuu",
                        "Huhtikuu",
                        "Toukokuu",
                        "Kesäkuu",
                        "Heinäkuu",
                        "Elokuu",
                        "Syyskuu",
                        "Lokakuu",
                        "Marraskuu",
                        "Joulukuu",
                    ],
                    dayOfWeekShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
                    dayOfWeek: [
                        "sunnuntai",
                        "maanantai",
                        "tiistai",
                        "keskiviikko",
                        "torstai",
                        "perjantai",
                        "lauantai",
                    ],
                },
                gl: {
                    months: [
                        "Xan",
                        "Feb",
                        "Maz",
                        "Abr",
                        "Mai",
                        "Xun",
                        "Xul",
                        "Ago",
                        "Set",
                        "Out",
                        "Nov",
                        "Dec",
                    ],
                    dayOfWeekShort: [
                        "Dom",
                        "Lun",
                        "Mar",
                        "Mer",
                        "Xov",
                        "Ven",
                        "Sab",
                    ],
                    dayOfWeek: [
                        "Domingo",
                        "Luns",
                        "Martes",
                        "Mércores",
                        "Xoves",
                        "Venres",
                        "Sábado",
                    ],
                },
                hr: {
                    months: [
                        "Siječanj",
                        "Veljača",
                        "Ožujak",
                        "Travanj",
                        "Svibanj",
                        "Lipanj",
                        "Srpanj",
                        "Kolovoz",
                        "Rujan",
                        "Listopad",
                        "Studeni",
                        "Prosinac",
                    ],
                    dayOfWeekShort: [
                        "Ned",
                        "Pon",
                        "Uto",
                        "Sri",
                        "Čet",
                        "Pet",
                        "Sub",
                    ],
                    dayOfWeek: [
                        "Nedjelja",
                        "Ponedjeljak",
                        "Utorak",
                        "Srijeda",
                        "Četvrtak",
                        "Petak",
                        "Subota",
                    ],
                },
                ko: {
                    months: [
                        "1월",
                        "2월",
                        "3월",
                        "4월",
                        "5월",
                        "6월",
                        "7월",
                        "8월",
                        "9월",
                        "10월",
                        "11월",
                        "12월",
                    ],
                    dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
                    dayOfWeek: [
                        "일요일",
                        "월요일",
                        "화요일",
                        "수요일",
                        "목요일",
                        "금요일",
                        "토요일",
                    ],
                },
                lt: {
                    months: [
                        "Sausio",
                        "Vasario",
                        "Kovo",
                        "Balandžio",
                        "Gegužės",
                        "Birželio",
                        "Liepos",
                        "Rugpjūčio",
                        "Rugsėjo",
                        "Spalio",
                        "Lapkričio",
                        "Gruodžio",
                    ],
                    dayOfWeekShort: [
                        "Sek",
                        "Pir",
                        "Ant",
                        "Tre",
                        "Ket",
                        "Pen",
                        "Šeš",
                    ],
                    dayOfWeek: [
                        "Sekmadienis",
                        "Pirmadienis",
                        "Antradienis",
                        "Trečiadienis",
                        "Ketvirtadienis",
                        "Penktadienis",
                        "Šeštadienis",
                    ],
                },
                lv: {
                    months: [
                        "Janvāris",
                        "Februāris",
                        "Marts",
                        "Aprīlis ",
                        "Maijs",
                        "Jūnijs",
                        "Jūlijs",
                        "Augusts",
                        "Septembris",
                        "Oktobris",
                        "Novembris",
                        "Decembris",
                    ],
                    dayOfWeekShort: ["Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"],
                    dayOfWeek: [
                        "Svētdiena",
                        "Pirmdiena",
                        "Otrdiena",
                        "Trešdiena",
                        "Ceturtdiena",
                        "Piektdiena",
                        "Sestdiena",
                    ],
                },
                mk: {
                    months: [
                        "јануари",
                        "февруари",
                        "март",
                        "април",
                        "мај",
                        "јуни",
                        "јули",
                        "август",
                        "септември",
                        "октомври",
                        "ноември",
                        "декември",
                    ],
                    dayOfWeekShort: [
                        "нед",
                        "пон",
                        "вто",
                        "сре",
                        "чет",
                        "пет",
                        "саб",
                    ],
                    dayOfWeek: [
                        "Недела",
                        "Понеделник",
                        "Вторник",
                        "Среда",
                        "Четврток",
                        "Петок",
                        "Сабота",
                    ],
                },
                mn: {
                    months: [
                        "1-р сар",
                        "2-р сар",
                        "3-р сар",
                        "4-р сар",
                        "5-р сар",
                        "6-р сар",
                        "7-р сар",
                        "8-р сар",
                        "9-р сар",
                        "10-р сар",
                        "11-р сар",
                        "12-р сар",
                    ],
                    dayOfWeekShort: [
                        "Дав",
                        "Мяг",
                        "Лха",
                        "Пүр",
                        "Бсн",
                        "Бям",
                        "Ням",
                    ],
                    dayOfWeek: [
                        "Даваа",
                        "Мягмар",
                        "Лхагва",
                        "Пүрэв",
                        "Баасан",
                        "Бямба",
                        "Ням",
                    ],
                },
                "pt-BR": {
                    months: [
                        "Janeiro",
                        "Fevereiro",
                        "Março",
                        "Abril",
                        "Maio",
                        "Junho",
                        "Julho",
                        "Agosto",
                        "Setembro",
                        "Outubro",
                        "Novembro",
                        "Dezembro",
                    ],
                    dayOfWeekShort: [
                        "Dom",
                        "Seg",
                        "Ter",
                        "Qua",
                        "Qui",
                        "Sex",
                        "Sáb",
                    ],
                    dayOfWeek: [
                        "Domingo",
                        "Segunda",
                        "Terça",
                        "Quarta",
                        "Quinta",
                        "Sexta",
                        "Sábado",
                    ],
                },
                sk: {
                    months: [
                        "Január",
                        "Február",
                        "Marec",
                        "Apríl",
                        "Máj",
                        "Jún",
                        "Júl",
                        "August",
                        "September",
                        "Október",
                        "November",
                        "December",
                    ],
                    dayOfWeekShort: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],
                    dayOfWeek: [
                        "Nedeľa",
                        "Pondelok",
                        "Utorok",
                        "Streda",
                        "Štvrtok",
                        "Piatok",
                        "Sobota",
                    ],
                },
                sq: {
                    months: [
                        "Janar",
                        "Shkurt",
                        "Mars",
                        "Prill",
                        "Maj",
                        "Qershor",
                        "Korrik",
                        "Gusht",
                        "Shtator",
                        "Tetor",
                        "Nëntor",
                        "Dhjetor",
                    ],
                    dayOfWeekShort: [
                        "Die",
                        "Hën",
                        "Mar",
                        "Mër",
                        "Enj",
                        "Pre",
                        "Shtu",
                    ],
                    dayOfWeek: [
                        "E Diel",
                        "E Hënë",
                        "E Martē",
                        "E Mërkurë",
                        "E Enjte",
                        "E Premte",
                        "E Shtunë",
                    ],
                },
                "sr-YU": {
                    months: [
                        "Januar",
                        "Februar",
                        "Mart",
                        "April",
                        "Maj",
                        "Jun",
                        "Jul",
                        "Avgust",
                        "Septembar",
                        "Oktobar",
                        "Novembar",
                        "Decembar",
                    ],
                    dayOfWeekShort: [
                        "Ned",
                        "Pon",
                        "Uto",
                        "Sre",
                        "čet",
                        "Pet",
                        "Sub",
                    ],
                    dayOfWeek: [
                        "Nedelja",
                        "Ponedeljak",
                        "Utorak",
                        "Sreda",
                        "Četvrtak",
                        "Petak",
                        "Subota",
                    ],
                },
                sr: {
                    months: [
                        "јануар",
                        "фебруар",
                        "март",
                        "април",
                        "мај",
                        "јун",
                        "јул",
                        "август",
                        "септембар",
                        "октобар",
                        "новембар",
                        "децембар",
                    ],
                    dayOfWeekShort: [
                        "нед",
                        "пон",
                        "уто",
                        "сре",
                        "чет",
                        "пет",
                        "суб",
                    ],
                    dayOfWeek: [
                        "Недеља",
                        "Понедељак",
                        "Уторак",
                        "Среда",
                        "Четвртак",
                        "Петак",
                        "Субота",
                    ],
                },
                sv: {
                    months: [
                        "Januari",
                        "Februari",
                        "Mars",
                        "April",
                        "Maj",
                        "Juni",
                        "Juli",
                        "Augusti",
                        "September",
                        "Oktober",
                        "November",
                        "December",
                    ],
                    dayOfWeekShort: [
                        "Sön",
                        "Mån",
                        "Tis",
                        "Ons",
                        "Tor",
                        "Fre",
                        "Lör",
                    ],
                    dayOfWeek: [
                        "Söndag",
                        "Måndag",
                        "Tisdag",
                        "Onsdag",
                        "Torsdag",
                        "Fredag",
                        "Lördag",
                    ],
                },
                "zh-TW": {
                    months: [
                        "一月",
                        "二月",
                        "三月",
                        "四月",
                        "五月",
                        "六月",
                        "七月",
                        "八月",
                        "九月",
                        "十月",
                        "十一月",
                        "十二月",
                    ],
                    dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                    dayOfWeek: [
                        "星期日",
                        "星期一",
                        "星期二",
                        "星期三",
                        "星期四",
                        "星期五",
                        "星期六",
                    ],
                },
                zh: {
                    months: [
                        "一月",
                        "二月",
                        "三月",
                        "四月",
                        "五月",
                        "六月",
                        "七月",
                        "八月",
                        "九月",
                        "十月",
                        "十一月",
                        "十二月",
                    ],
                    dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                    dayOfWeek: [
                        "星期日",
                        "星期一",
                        "星期二",
                        "星期三",
                        "星期四",
                        "星期五",
                        "星期六",
                    ],
                },
                ug: {
                    months: [
                        "1-ئاي",
                        "2-ئاي",
                        "3-ئاي",
                        "4-ئاي",
                        "5-ئاي",
                        "6-ئاي",
                        "7-ئاي",
                        "8-ئاي",
                        "9-ئاي",
                        "10-ئاي",
                        "11-ئاي",
                        "12-ئاي",
                    ],
                    dayOfWeek: [
                        "يەكشەنبە",
                        "دۈشەنبە",
                        "سەيشەنبە",
                        "چارشەنبە",
                        "پەيشەنبە",
                        "جۈمە",
                        "شەنبە",
                    ],
                },
                he: {
                    months: [
                        "ינואר",
                        "פברואר",
                        "מרץ",
                        "אפריל",
                        "מאי",
                        "יוני",
                        "יולי",
                        "אוגוסט",
                        "ספטמבר",
                        "אוקטובר",
                        "נובמבר",
                        "דצמבר",
                    ],
                    dayOfWeekShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
                    dayOfWeek: [
                        "ראשון",
                        "שני",
                        "שלישי",
                        "רביעי",
                        "חמישי",
                        "שישי",
                        "שבת",
                        "ראשון",
                    ],
                },
                hy: {
                    months: [
                        "Հունվար",
                        "Փետրվար",
                        "Մարտ",
                        "Ապրիլ",
                        "Մայիս",
                        "Հունիս",
                        "Հուլիս",
                        "Օգոստոս",
                        "Սեպտեմբեր",
                        "Հոկտեմբեր",
                        "Նոյեմբեր",
                        "Դեկտեմբեր",
                    ],
                    dayOfWeekShort: [
                        "Կի",
                        "Երկ",
                        "Երք",
                        "Չոր",
                        "Հնգ",
                        "Ուրբ",
                        "Շբթ",
                    ],
                    dayOfWeek: [
                        "Կիրակի",
                        "Երկուշաբթի",
                        "Երեքշաբթի",
                        "Չորեքշաբթի",
                        "Հինգշաբթի",
                        "Ուրբաթ",
                        "Շաբաթ",
                    ],
                },
                kg: {
                    months: [
                        "Үчтүн айы",
                        "Бирдин айы",
                        "Жалган Куран",
                        "Чын Куран",
                        "Бугу",
                        "Кулжа",
                        "Теке",
                        "Баш Оона",
                        "Аяк Оона",
                        "Тогуздун айы",
                        "Жетинин айы",
                        "Бештин айы",
                    ],
                    dayOfWeekShort: [
                        "Жек",
                        "Дүй",
                        "Шей",
                        "Шар",
                        "Бей",
                        "Жум",
                        "Ише",
                    ],
                    dayOfWeek: [
                        "Жекшемб",
                        "Дүйшөмб",
                        "Шейшемб",
                        "Шаршемб",
                        "Бейшемби",
                        "Жума",
                        "Ишенб",
                    ],
                },
                rm: {
                    months: [
                        "Schaner",
                        "Favrer",
                        "Mars",
                        "Avrigl",
                        "Matg",
                        "Zercladur",
                        "Fanadur",
                        "Avust",
                        "Settember",
                        "October",
                        "November",
                        "December",
                    ],
                    dayOfWeekShort: [
                        "Du",
                        "Gli",
                        "Ma",
                        "Me",
                        "Gie",
                        "Ve",
                        "So",
                    ],
                    dayOfWeek: [
                        "Dumengia",
                        "Glindesdi",
                        "Mardi",
                        "Mesemna",
                        "Gievgia",
                        "Venderdi",
                        "Sonda",
                    ],
                },
                ka: {
                    months: [
                        "იანვარი",
                        "თებერვალი",
                        "მარტი",
                        "აპრილი",
                        "მაისი",
                        "ივნისი",
                        "ივლისი",
                        "აგვისტო",
                        "სექტემბერი",
                        "ოქტომბერი",
                        "ნოემბერი",
                        "დეკემბერი",
                    ],
                    dayOfWeekShort: [
                        "კვ",
                        "ორშ",
                        "სამშ",
                        "ოთხ",
                        "ხუთ",
                        "პარ",
                        "შაბ",
                    ],
                    dayOfWeek: [
                        "კვირა",
                        "ორშაბათი",
                        "სამშაბათი",
                        "ოთხშაბათი",
                        "ხუთშაბათი",
                        "პარასკევი",
                        "შაბათი",
                    ],
                },
            },
            ownerDocument: document,
            contentWindow: window,
            value: "",
            rtl: !1,
            format: "Y/m/d H:i",
            formatTime: "H:i",
            formatDate: "Y/m/d",
            startDate: !1,
            step: 60,
            monthChangeSpinner: !0,
            closeOnDateSelect: !1,
            closeOnTimeSelect: !0,
            closeOnWithoutClick: !0,
            closeOnInputClick: !0,
            openOnFocus: !0,
            timepicker: !0,
            datepicker: !0,
            weeks: !1,
            defaultTime: !1,
            defaultDate: !1,
            minDate: !1,
            maxDate: !1,
            minTime: !1,
            maxTime: !1,
            minDateTime: !1,
            maxDateTime: !1,
            allowTimes: [],
            opened: !1,
            initTime: !0,
            inline: !1,
            theme: "",
            touchMovedThreshold: 5,
            onSelectDate: function () {},
            onSelectTime: function () {},
            onChangeMonth: function () {},
            onGetWeekOfYear: function () {},
            onChangeYear: function () {},
            onChangeDateTime: function () {},
            onShow: function () {},
            onClose: function () {},
            onGenerate: function () {},
            withoutCopyright: !0,
            inverseButton: !1,
            hours12: !1,
            next: "xdsoft_next",
            prev: "xdsoft_prev",
            dayOfWeekStart: 0,
            parentID: "body",
            timeHeightInTimePicker: 25,
            timepickerScrollbar: !0,
            todayButton: !0,
            prevButton: !0,
            nextButton: !0,
            defaultSelect: !0,
            scrollMonth: !0,
            scrollTime: !0,
            scrollInput: !0,
            lazyInit: !1,
            mask: !1,
            validateOnBlur: !0,
            allowBlank: !0,
            yearStart: 1950,
            yearEnd: 2050,
            monthStart: 0,
            monthEnd: 11,
            style: "",
            id: "",
            fixed: !1,
            roundTime: "round",
            className: "",
            weekends: [],
            highlightedDates: [],
            highlightedPeriods: [],
            allowDates: [],
            allowDateRe: null,
            disabledDates: [],
            disabledWeekDays: [],
            yearOffset: 0,
            beforeShowDay: null,
            enterLikeTab: !0,
            showApplyButton: !1,
        },
        r = null,
        n = null,
        o = "en",
        i = { meridiem: ["AM", "PM"] },
        s = function () {
            var t = a.i18n[o],
                s = {
                    days: t.dayOfWeek,
                    daysShort: t.dayOfWeekShort,
                    months: t.months,
                    monthsShort: e.map(t.months, function (e) {
                        return e.substring(0, 3);
                    }),
                };
            "function" == typeof DateFormatter &&
                (r = n =
                    new DateFormatter({ dateSettings: e.extend({}, i, s) }));
        },
        u = {
            moment: {
                default_options: {
                    format: "YYYY/MM/DD HH:mm",
                    formatDate: "YYYY/MM/DD",
                    formatTime: "HH:mm",
                },
                formatter: {
                    parseDate: function (e, t) {
                        if (l(t)) return n.parseDate(e, t);
                        var a = moment(e, t);
                        return !!a.isValid() && a.toDate();
                    },
                    formatDate: function (e, t) {
                        return l(t) ? n.formatDate(e, t) : moment(e).format(t);
                    },
                    formatMask: function (e) {
                        return e
                            .replace(/Y{4}/g, "9999")
                            .replace(/Y{2}/g, "99")
                            .replace(/M{2}/g, "19")
                            .replace(/D{2}/g, "39")
                            .replace(/H{2}/g, "29")
                            .replace(/m{2}/g, "59")
                            .replace(/s{2}/g, "59");
                    },
                },
            },
        };
    e.datetimepicker = {
        setLocale: function (e) {
            var t = a.i18n[e] ? e : "en";
            o !== t && ((o = t), s());
        },
        setDateFormatter: function (t) {
            if ("string" == typeof t && u.hasOwnProperty(t)) {
                var n = u[t];
                e.extend(a, n.default_options), (r = n.formatter);
            } else r = t;
        },
    };
    var d = {
            RFC_2822: "D, d M Y H:i:s O",
            ATOM: "Y-m-dTH:i:sP",
            ISO_8601: "Y-m-dTH:i:sO",
            RFC_822: "D, d M y H:i:s O",
            RFC_850: "l, d-M-y H:i:s T",
            RFC_1036: "D, d M y H:i:s O",
            RFC_1123: "D, d M Y H:i:s O",
            RSS: "D, d M Y H:i:s O",
            W3C: "Y-m-dTH:i:sP",
        },
        l = function (e) {
            return -1 !== Object.values(d).indexOf(e);
        };
    e.extend(e.datetimepicker, d),
        s(),
        window.getComputedStyle ||
            (window.getComputedStyle = function (e) {
                return (
                    (this.el = e),
                    (this.getPropertyValue = function (t) {
                        var a = /(-([a-z]))/g;
                        return (
                            "float" === t && (t = "styleFloat"),
                            a.test(t) &&
                                (t = t.replace(a, function (e, t, a) {
                                    return a.toUpperCase();
                                })),
                            e.currentStyle[t] || null
                        );
                    }),
                    this
                );
            }),
        Array.prototype.indexOf ||
            (Array.prototype.indexOf = function (e, t) {
                var a, r;
                for (a = t || 0, r = this.length; a < r; a += 1)
                    if (this[a] === e) return a;
                return -1;
            }),
        (Date.prototype.countDaysInMonth = function () {
            return new Date(
                this.getFullYear(),
                this.getMonth() + 1,
                0
            ).getDate();
        }),
        (e.fn.xdsoftScroller = function (t, a) {
            return this.each(function () {
                var r,
                    n,
                    o,
                    i,
                    s,
                    u = e(this),
                    d = function (e) {
                        var t,
                            a = { x: 0, y: 0 };
                        return (
                            "touchstart" === e.type ||
                            "touchmove" === e.type ||
                            "touchend" === e.type ||
                            "touchcancel" === e.type
                                ? ((t =
                                      e.originalEvent.touches[0] ||
                                      e.originalEvent.changedTouches[0]),
                                  (a.x = t.clientX),
                                  (a.y = t.clientY))
                                : ("mousedown" !== e.type &&
                                      "mouseup" !== e.type &&
                                      "mousemove" !== e.type &&
                                      "mouseover" !== e.type &&
                                      "mouseout" !== e.type &&
                                      "mouseenter" !== e.type &&
                                      "mouseleave" !== e.type) ||
                                  ((a.x = e.clientX), (a.y = e.clientY)),
                            a
                        );
                    },
                    l = 100,
                    f = !1,
                    c = 0,
                    m = 0,
                    h = 0,
                    g = !1,
                    p = 0,
                    D = function () {};
                "hide" !== a
                    ? (e(this).hasClass("xdsoft_scroller_box") ||
                          ((r = u.children().eq(0)),
                          (n = u[0].clientHeight),
                          (o = r[0].offsetHeight),
                          (i = e('<div class="xdsoft_scrollbar"></div>')),
                          (s = e('<div class="xdsoft_scroller"></div>')),
                          i.append(s),
                          u.addClass("xdsoft_scroller_box").append(i),
                          (D = function (e) {
                              var t = d(e).y - c + p;
                              t < 0 && (t = 0),
                                  t + s[0].offsetHeight > h &&
                                      (t = h - s[0].offsetHeight),
                                  u.trigger("scroll_element.xdsoft_scroller", [
                                      l ? t / l : 0,
                                  ]);
                          }),
                          s
                              .on(
                                  "touchstart.xdsoft_scroller mousedown.xdsoft_scroller",
                                  function (r) {
                                      n ||
                                          u.trigger(
                                              "resize_scroll.xdsoft_scroller",
                                              [a]
                                          ),
                                          (c = d(r).y),
                                          (p = parseInt(
                                              s.css("margin-top"),
                                              10
                                          )),
                                          (h = i[0].offsetHeight),
                                          "mousedown" === r.type ||
                                          "touchstart" === r.type
                                              ? (t.ownerDocument &&
                                                    e(
                                                        t.ownerDocument.body
                                                    ).addClass(
                                                        "xdsoft_noselect"
                                                    ),
                                                e([
                                                    t.ownerDocument.body,
                                                    t.contentWindow,
                                                ]).on(
                                                    "touchend mouseup.xdsoft_scroller",
                                                    function a() {
                                                        e([
                                                            t.ownerDocument
                                                                .body,
                                                            t.contentWindow,
                                                        ])
                                                            .off(
                                                                "touchend mouseup.xdsoft_scroller",
                                                                a
                                                            )
                                                            .off(
                                                                "mousemove.xdsoft_scroller",
                                                                D
                                                            )
                                                            .removeClass(
                                                                "xdsoft_noselect"
                                                            );
                                                    }
                                                ),
                                                e(t.ownerDocument.body).on(
                                                    "mousemove.xdsoft_scroller",
                                                    D
                                                ))
                                              : ((g = !0),
                                                r.stopPropagation(),
                                                r.preventDefault());
                                  }
                              )
                              .on("touchmove", function (e) {
                                  g && (e.preventDefault(), D(e));
                              })
                              .on("touchend touchcancel", function () {
                                  (g = !1), (p = 0);
                              }),
                          u
                              .on(
                                  "scroll_element.xdsoft_scroller",
                                  function (e, t) {
                                      n ||
                                          u.trigger(
                                              "resize_scroll.xdsoft_scroller",
                                              [t, !0]
                                          ),
                                          (t =
                                              t > 1
                                                  ? 1
                                                  : t < 0 || isNaN(t)
                                                  ? 0
                                                  : t),
                                          s.css("margin-top", l * t),
                                          setTimeout(function () {
                                              r.css(
                                                  "marginTop",
                                                  -parseInt(
                                                      (r[0].offsetHeight - n) *
                                                          t,
                                                      10
                                                  )
                                              );
                                          }, 10);
                                  }
                              )
                              .on(
                                  "resize_scroll.xdsoft_scroller",
                                  function (e, t, a) {
                                      var d, f;
                                      (n = u[0].clientHeight),
                                          (o = r[0].offsetHeight),
                                          (f = (d = n / o) * i[0].offsetHeight),
                                          d > 1
                                              ? s.hide()
                                              : (s.show(),
                                                s.css(
                                                    "height",
                                                    parseInt(
                                                        f > 10 ? f : 10,
                                                        10
                                                    )
                                                ),
                                                (l =
                                                    i[0].offsetHeight -
                                                    s[0].offsetHeight),
                                                !0 !== a &&
                                                    u.trigger(
                                                        "scroll_element.xdsoft_scroller",
                                                        [
                                                            t ||
                                                                Math.abs(
                                                                    parseInt(
                                                                        r.css(
                                                                            "marginTop"
                                                                        ),
                                                                        10
                                                                    )
                                                                ) /
                                                                    (o - n),
                                                        ]
                                                    ));
                                  }
                              ),
                          u.on("mousewheel", function (e) {
                              var t = Math.abs(
                                  parseInt(r.css("marginTop"), 10)
                              );
                              return (
                                  (t -= 20 * e.deltaY) < 0 && (t = 0),
                                  u.trigger("scroll_element.xdsoft_scroller", [
                                      t / (o - n),
                                  ]),
                                  e.stopPropagation(),
                                  !1
                              );
                          }),
                          u.on("touchstart", function (e) {
                              (f = d(e)),
                                  (m = Math.abs(
                                      parseInt(r.css("marginTop"), 10)
                                  ));
                          }),
                          u.on("touchmove", function (e) {
                              if (f) {
                                  e.preventDefault();
                                  var t = d(e);
                                  u.trigger("scroll_element.xdsoft_scroller", [
                                      (m - (t.y - f.y)) / (o - n),
                                  ]);
                              }
                          }),
                          u.on("touchend touchcancel", function () {
                              (f = !1), (m = 0);
                          })),
                      u.trigger("resize_scroll.xdsoft_scroller", [a]))
                    : u.find(".xdsoft_scrollbar").hide();
            });
        }),
        (e.fn.datetimepicker = function (n, i) {
            var s,
                u,
                d = this,
                l = 48,
                f = 57,
                c = 96,
                m = 105,
                h = 17,
                g = 46,
                p = 13,
                D = 27,
                v = 8,
                y = 37,
                b = 38,
                k = 39,
                x = 40,
                T = 9,
                S = 116,
                M = 65,
                w = 67,
                O = 86,
                W = 90,
                _ = 89,
                F = !1,
                C =
                    e.isPlainObject(n) || !n
                        ? e.extend(!0, {}, a, n)
                        : e.extend(!0, {}, a),
                P = 0,
                Y = function (e) {
                    e.on(
                        "open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",
                        function t() {
                            e.is(":disabled") ||
                                e.data("xdsoft_datetimepicker") ||
                                (clearTimeout(P),
                                (P = setTimeout(function () {
                                    e.data("xdsoft_datetimepicker") || s(e),
                                        e
                                            .off(
                                                "open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",
                                                t
                                            )
                                            .trigger("open.xdsoft");
                                }, 100)));
                        }
                    );
                };
            return (
                (s = function (a) {
                    function i() {
                        var e,
                            t = !1;
                        return (
                            C.startDate
                                ? (t = A.strToDate(C.startDate))
                                : (t =
                                      C.value ||
                                      (a && a.val && a.val() ? a.val() : ""))
                                ? ((t = A.strToDateTime(t)),
                                  C.yearOffset &&
                                      (t = new Date(
                                          t.getFullYear() - C.yearOffset,
                                          t.getMonth(),
                                          t.getDate(),
                                          t.getHours(),
                                          t.getMinutes(),
                                          t.getSeconds(),
                                          t.getMilliseconds()
                                      )))
                                : C.defaultDate &&
                                  ((t = A.strToDateTime(C.defaultDate)),
                                  C.defaultTime &&
                                      ((e = A.strtotime(C.defaultTime)),
                                      t.setHours(e.getHours()),
                                      t.setMinutes(e.getMinutes()))),
                            t && A.isValidDate(t)
                                ? j.data("changed", !0)
                                : (t = ""),
                            t || 0
                        );
                    }
                    function s(t) {
                        var n = function (e, t) {
                                var a = e
                                    .replace(
                                        /([\[\]\/\{\}\(\)\-\.\+]{1})/g,
                                        "\\$1"
                                    )
                                    .replace(/_/g, "{digit+}")
                                    .replace(/([0-9]{1})/g, "{digit$1}")
                                    .replace(
                                        /\{digit([0-9]{1})\}/g,
                                        "[0-$1_]{1}"
                                    )
                                    .replace(/\{digit[\+]\}/g, "[0-9_]{1}");
                                return new RegExp(a).test(t);
                            },
                            o = function (e, a) {
                                if (
                                    !(e =
                                        "string" == typeof e ||
                                        e instanceof String
                                            ? t.ownerDocument.getElementById(e)
                                            : e)
                                )
                                    return !1;
                                if (e.createTextRange) {
                                    var r = e.createTextRange();
                                    return (
                                        r.collapse(!0),
                                        r.moveEnd("character", a),
                                        r.moveStart("character", a),
                                        r.select(),
                                        !0
                                    );
                                }
                                return (
                                    !!e.setSelectionRange &&
                                    (e.setSelectionRange(a, a), !0)
                                );
                            };
                        t.mask && a.off("keydown.xdsoft"),
                            !0 === t.mask &&
                                (r.formatMask
                                    ? (t.mask = r.formatMask(t.format))
                                    : (t.mask = t.format
                                          .replace(/Y/g, "9999")
                                          .replace(/F/g, "9999")
                                          .replace(/m/g, "19")
                                          .replace(/d/g, "39")
                                          .replace(/H/g, "29")
                                          .replace(/i/g, "59")
                                          .replace(/s/g, "59"))),
                            "string" === e.type(t.mask) &&
                                (n(t.mask, a.val()) ||
                                    (a.val(t.mask.replace(/[0-9]/g, "_")),
                                    o(a[0], 0)),
                                a.on("paste.xdsoft", function (r) {
                                    var i = (
                                            r.clipboardData ||
                                            r.originalEvent.clipboardData ||
                                            window.clipboardData
                                        ).getData("text"),
                                        s = this.value,
                                        u = this.selectionStart;
                                    return (
                                        (s =
                                            s.substr(0, u) +
                                            i +
                                            s.substr(u + i.length)),
                                        (u += i.length),
                                        n(t.mask, s)
                                            ? ((this.value = s), o(this, u))
                                            : "" === e.trim(s)
                                            ? (this.value = t.mask.replace(
                                                  /[0-9]/g,
                                                  "_"
                                              ))
                                            : a.trigger("error_input.xdsoft"),
                                        r.preventDefault(),
                                        !1
                                    );
                                }),
                                a.on("keydown.xdsoft", function (r) {
                                    var i,
                                        s = this.value,
                                        u = r.which,
                                        d = this.selectionStart,
                                        C = this.selectionEnd,
                                        P = d !== C;
                                    if (
                                        (u >= l && u <= f) ||
                                        (u >= c && u <= m) ||
                                        u === v ||
                                        u === g
                                    ) {
                                        for (
                                            i =
                                                u === v || u === g
                                                    ? "_"
                                                    : String.fromCharCode(
                                                          c <= u && u <= m
                                                              ? u - l
                                                              : u
                                                      ),
                                                u === v && d && !P && (d -= 1);
                                            ;

                                        ) {
                                            var Y = t.mask.substr(d, 1),
                                                A = d < t.mask.length,
                                                H = d > 0;
                                            if (!(/[^0-9_]/.test(Y) && A && H))
                                                break;
                                            d += u !== v || P ? 1 : -1;
                                        }
                                        if (P) {
                                            var j = C - d,
                                                J = t.mask.replace(
                                                    /[0-9]/g,
                                                    "_"
                                                ),
                                                z = J.substr(d, j).substr(1);
                                            s =
                                                s.substr(0, d) +
                                                (i + z) +
                                                s.substr(d + j);
                                        } else
                                            s =
                                                s.substr(0, d) +
                                                i +
                                                s.substr(d + 1);
                                        if ("" === e.trim(s)) s = J;
                                        else if (d === t.mask.length)
                                            return r.preventDefault(), !1;
                                        for (
                                            d += u === v ? 0 : 1;
                                            /[^0-9_]/.test(
                                                t.mask.substr(d, 1)
                                            ) &&
                                            d < t.mask.length &&
                                            d > 0;

                                        )
                                            d += u === v ? 0 : 1;
                                        n(t.mask, s)
                                            ? ((this.value = s), o(this, d))
                                            : "" === e.trim(s)
                                            ? (this.value = t.mask.replace(
                                                  /[0-9]/g,
                                                  "_"
                                              ))
                                            : a.trigger("error_input.xdsoft");
                                    } else if ((-1 !== [M, w, O, W, _].indexOf(u) && F) || -1 !== [D, b, x, y, k, S, h, T, p].indexOf(u)) return !0;
                                    return r.preventDefault(), !1;
                                }));
                    }
                    var u,
                        d,
                        P,
                        Y,
                        A,
                        H,
                        j = e(
                            '<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'
                        ),
                        J = e(
                            '<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'
                        ),
                        z = e('<div class="xdsoft_datepicker active"></div>'),
                        I = e(
                            '<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'
                        ),
                        N = e('<div class="xdsoft_calendar"></div>'),
                        L = e(
                            '<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'
                        ),
                        E = L.find(".xdsoft_time_box").eq(0),
                        R = e('<div class="xdsoft_time_variant"></div>'),
                        V = e(
                            '<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'
                        ),
                        B = e(
                            '<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'
                        ),
                        G = e(
                            '<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'
                        ),
                        U = !1,
                        q = 0;
                    C.id && j.attr("id", C.id),
                        C.style && j.attr("style", C.style),
                        C.weeks && j.addClass("xdsoft_showweeks"),
                        C.rtl && j.addClass("xdsoft_rtl"),
                        j.addClass("xdsoft_" + C.theme),
                        j.addClass(C.className),
                        I.find(".xdsoft_month span").after(B),
                        I.find(".xdsoft_year span").after(G),
                        I.find(".xdsoft_month,.xdsoft_year").on(
                            "touchstart mousedown.xdsoft",
                            function (t) {
                                var a,
                                    r,
                                    n = e(this).find(".xdsoft_select").eq(0),
                                    o = 0,
                                    i = 0,
                                    s = n.is(":visible");
                                for (
                                    I.find(".xdsoft_select").hide(),
                                        A.currentTime &&
                                            (o =
                                                A.currentTime[
                                                    e(this).hasClass(
                                                        "xdsoft_month"
                                                    )
                                                        ? "getMonth"
                                                        : "getFullYear"
                                                ]()),
                                        n[s ? "hide" : "show"](),
                                        a = n.find("div.xdsoft_option"),
                                        r = 0;
                                    r < a.length && a.eq(r).data("value") !== o;
                                    r += 1
                                )
                                    i += a[0].offsetHeight;
                                return (
                                    n.xdsoftScroller(
                                        C,
                                        i /
                                            (n.children()[0].offsetHeight -
                                                n[0].clientHeight)
                                    ),
                                    t.stopPropagation(),
                                    !1
                                );
                            }
                        );
                    var X = function (e) {
                        var t = e.originalEvent,
                            a = t.touches ? t.touches[0] : t;
                        this.touchStartPosition = this.touchStartPosition || a;
                        var r = Math.abs(
                                this.touchStartPosition.clientX - a.clientX
                            ),
                            n = Math.abs(
                                this.touchStartPosition.clientY - a.clientY
                            );
                        Math.sqrt(r * r + n * n) > C.touchMovedThreshold &&
                            (this.touchMoved = !0);
                    };
                    I.find(".xdsoft_select")
                        .xdsoftScroller(C)
                        .on("touchstart mousedown.xdsoft", function (e) {
                            var t = e.originalEvent;
                            (this.touchMoved = !1),
                                (this.touchStartPosition = t.touches
                                    ? t.touches[0]
                                    : t),
                                e.stopPropagation(),
                                e.preventDefault();
                        })
                        .on("touchmove", ".xdsoft_option", X)
                        .on(
                            "touchend mousedown.xdsoft",
                            ".xdsoft_option",
                            function () {
                                if (!this.touchMoved) {
                                    (void 0 !== A.currentTime &&
                                        null !== A.currentTime) ||
                                        (A.currentTime = A.now());
                                    var t = A.currentTime.getFullYear();
                                    A &&
                                        A.currentTime &&
                                        A.currentTime[
                                            e(this)
                                                .parent()
                                                .parent()
                                                .hasClass("xdsoft_monthselect")
                                                ? "setMonth"
                                                : "setFullYear"
                                        ](e(this).data("value")),
                                        e(this).parent().parent().hide(),
                                        j.trigger("xchange.xdsoft"),
                                        C.onChangeMonth &&
                                            e.isFunction(C.onChangeMonth) &&
                                            C.onChangeMonth.call(
                                                j,
                                                A.currentTime,
                                                j.data("input")
                                            ),
                                        t !== A.currentTime.getFullYear() &&
                                            e.isFunction(C.onChangeYear) &&
                                            C.onChangeYear.call(
                                                j,
                                                A.currentTime,
                                                j.data("input")
                                            );
                                }
                            }
                        ),
                        (j.getValue = function () {
                            return A.getCurrentTime();
                        }),
                        (j.setOptions = function (n) {
                            var o = {};
                            (C = e.extend(!0, {}, C, n)),
                                n.allowTimes &&
                                    e.isArray(n.allowTimes) &&
                                    n.allowTimes.length &&
                                    (C.allowTimes = e.extend(
                                        !0,
                                        [],
                                        n.allowTimes
                                    )),
                                n.weekends &&
                                    e.isArray(n.weekends) &&
                                    n.weekends.length &&
                                    (C.weekends = e.extend(!0, [], n.weekends)),
                                n.allowDates &&
                                    e.isArray(n.allowDates) &&
                                    n.allowDates.length &&
                                    (C.allowDates = e.extend(
                                        !0,
                                        [],
                                        n.allowDates
                                    )),
                                n.allowDateRe &&
                                    "[object String]" ===
                                        Object.prototype.toString.call(
                                            n.allowDateRe
                                        ) &&
                                    (C.allowDateRe = new RegExp(n.allowDateRe)),
                                n.highlightedDates &&
                                    e.isArray(n.highlightedDates) &&
                                    n.highlightedDates.length &&
                                    (e.each(
                                        n.highlightedDates,
                                        function (a, n) {
                                            var i,
                                                s = e.map(n.split(","), e.trim),
                                                u = new t(
                                                    r.parseDate(
                                                        s[0],
                                                        C.formatDate
                                                    ),
                                                    s[1],
                                                    s[2]
                                                ),
                                                d = r.formatDate(
                                                    u.date,
                                                    C.formatDate
                                                );
                                            void 0 !== o[d]
                                                ? (i = o[d].desc) &&
                                                  i.length &&
                                                  u.desc &&
                                                  u.desc.length &&
                                                  (o[d].desc =
                                                      i + "\n" + u.desc)
                                                : (o[d] = u);
                                        }
                                    ),
                                    (C.highlightedDates = e.extend(!0, [], o))),
                                n.highlightedPeriods &&
                                    e.isArray(n.highlightedPeriods) &&
                                    n.highlightedPeriods.length &&
                                    ((o = e.extend(!0, [], C.highlightedDates)),
                                    e.each(
                                        n.highlightedPeriods,
                                        function (a, n) {
                                            var i, s, u, d, l, f, c;
                                            if (e.isArray(n))
                                                (i = n[0]),
                                                    (s = n[1]),
                                                    (u = n[2]),
                                                    (c = n[3]);
                                            else {
                                                var m = e.map(
                                                    n.split(","),
                                                    e.trim
                                                );
                                                (i = r.parseDate(
                                                    m[0],
                                                    C.formatDate
                                                )),
                                                    (s = r.parseDate(
                                                        m[1],
                                                        C.formatDate
                                                    )),
                                                    (u = m[2]),
                                                    (c = m[3]);
                                            }
                                            for (; i <= s; )
                                                (d = new t(i, u, c)),
                                                    (l = r.formatDate(
                                                        i,
                                                        C.formatDate
                                                    )),
                                                    i.setDate(i.getDate() + 1),
                                                    void 0 !== o[l]
                                                        ? (f = o[l].desc) &&
                                                          f.length &&
                                                          d.desc &&
                                                          d.desc.length &&
                                                          (o[l].desc =
                                                              f + "\n" + d.desc)
                                                        : (o[l] = d);
                                        }
                                    ),
                                    (C.highlightedDates = e.extend(!0, [], o))),
                                n.disabledDates &&
                                    e.isArray(n.disabledDates) &&
                                    n.disabledDates.length &&
                                    (C.disabledDates = e.extend(
                                        !0,
                                        [],
                                        n.disabledDates
                                    )),
                                n.disabledWeekDays &&
                                    e.isArray(n.disabledWeekDays) &&
                                    n.disabledWeekDays.length &&
                                    (C.disabledWeekDays = e.extend(
                                        !0,
                                        [],
                                        n.disabledWeekDays
                                    )),
                                (!C.open && !C.opened) ||
                                    C.inline ||
                                    a.trigger("open.xdsoft"),
                                C.inline &&
                                    ((U = !0),
                                    j.addClass("xdsoft_inline"),
                                    a.after(j).hide()),
                                C.inverseButton &&
                                    ((C.next = "xdsoft_prev"),
                                    (C.prev = "xdsoft_next")),
                                C.datepicker
                                    ? z.addClass("active")
                                    : z.removeClass("active"),
                                C.timepicker
                                    ? L.addClass("active")
                                    : L.removeClass("active"),
                                C.value &&
                                    (A.setCurrentTime(C.value),
                                    a && a.val && a.val(A.str)),
                                isNaN(C.dayOfWeekStart)
                                    ? (C.dayOfWeekStart = 0)
                                    : (C.dayOfWeekStart =
                                          parseInt(C.dayOfWeekStart, 10) % 7),
                                C.timepickerScrollbar ||
                                    E.xdsoftScroller(C, "hide"),
                                C.minDate &&
                                    /^[\+\-](.*)$/.test(C.minDate) &&
                                    (C.minDate = r.formatDate(
                                        A.strToDateTime(C.minDate),
                                        C.formatDate
                                    )),
                                C.maxDate &&
                                    /^[\+\-](.*)$/.test(C.maxDate) &&
                                    (C.maxDate = r.formatDate(
                                        A.strToDateTime(C.maxDate),
                                        C.formatDate
                                    )),
                                C.minDateTime &&
                                    /^\+(.*)$/.test(C.minDateTime) &&
                                    (C.minDateTime = A.strToDateTime(
                                        C.minDateTime
                                    ).dateFormat(C.formatDate)),
                                C.maxDateTime &&
                                    /^\+(.*)$/.test(C.maxDateTime) &&
                                    (C.maxDateTime = A.strToDateTime(
                                        C.maxDateTime
                                    ).dateFormat(C.formatDate)),
                                V.toggle(C.showApplyButton),
                                I.find(".xdsoft_today_button").css(
                                    "visibility",
                                    C.todayButton ? "visible" : "hidden"
                                ),
                                I.find("." + C.prev).css(
                                    "visibility",
                                    C.prevButton ? "visible" : "hidden"
                                ),
                                I.find("." + C.next).css(
                                    "visibility",
                                    C.nextButton ? "visible" : "hidden"
                                ),
                                s(C),
                                C.validateOnBlur &&
                                    a
                                        .off("blur.xdsoft")
                                        .on("blur.xdsoft", function () {
                                            if (
                                                C.allowBlank &&
                                                (!e.trim(e(this).val())
                                                    .length ||
                                                    ("string" ==
                                                        typeof C.mask &&
                                                        e.trim(
                                                            e(this).val()
                                                        ) ===
                                                            C.mask.replace(
                                                                /[0-9]/g,
                                                                "_"
                                                            )))
                                            )
                                                e(this).val(null),
                                                    j
                                                        .data("xdsoft_datetime")
                                                        .empty();
                                            else {
                                                var t = r.parseDate(
                                                    e(this).val(),
                                                    C.format
                                                );
                                                if (t)
                                                    e(this).val(
                                                        r.formatDate(
                                                            t,
                                                            C.format
                                                        )
                                                    );
                                                else {
                                                    var a = +[
                                                            e(this).val()[0],
                                                            e(this).val()[1],
                                                        ].join(""),
                                                        n = +[
                                                            e(this).val()[2],
                                                            e(this).val()[3],
                                                        ].join("");
                                                    !C.datepicker &&
                                                    C.timepicker &&
                                                    a >= 0 &&
                                                    a < 24 &&
                                                    n >= 0 &&
                                                    n < 60
                                                        ? e(this).val(
                                                              [a, n]
                                                                  .map(
                                                                      function (
                                                                          e
                                                                      ) {
                                                                          return e >
                                                                              9
                                                                              ? e
                                                                              : "0" +
                                                                                    e;
                                                                      }
                                                                  )
                                                                  .join(":")
                                                          )
                                                        : e(this).val(
                                                              r.formatDate(
                                                                  A.now(),
                                                                  C.format
                                                              )
                                                          );
                                                }
                                                j.data(
                                                    "xdsoft_datetime"
                                                ).setCurrentTime(e(this).val());
                                            }
                                            j.trigger("changedatetime.xdsoft"),
                                                j.trigger("close.xdsoft");
                                        }),
                                (C.dayOfWeekStartPrev =
                                    0 === C.dayOfWeekStart
                                        ? 6
                                        : C.dayOfWeekStart - 1),
                                j
                                    .trigger("xchange.xdsoft")
                                    .trigger("afterOpen.xdsoft");
                        }),
                        j
                            .data("options", C)
                            .on("touchstart mousedown.xdsoft", function (e) {
                                return (
                                    e.stopPropagation(),
                                    e.preventDefault(),
                                    G.hide(),
                                    B.hide(),
                                    !1
                                );
                            }),
                        E.append(R),
                        E.xdsoftScroller(C),
                        j.on("afterOpen.xdsoft", function () {
                            E.xdsoftScroller(C);
                        }),
                        j.append(z).append(L),
                        !0 !== C.withoutCopyright && j.append(J),
                        z.append(I).append(N).append(V),
                        e(C.parentID).append(j),
                        (A = new (function () {
                            var t = this;
                            (t.now = function (e) {
                                var a,
                                    r,
                                    n = new Date();
                                return (
                                    !e &&
                                        C.defaultDate &&
                                        ((a = t.strToDateTime(C.defaultDate)),
                                        n.setFullYear(a.getFullYear()),
                                        n.setMonth(a.getMonth()),
                                        n.setDate(a.getDate())),
                                    n.setFullYear(n.getFullYear()),
                                    !e &&
                                        C.defaultTime &&
                                        ((r = t.strtotime(C.defaultTime)),
                                        n.setHours(r.getHours()),
                                        n.setMinutes(r.getMinutes()),
                                        n.setSeconds(r.getSeconds()),
                                        n.setMilliseconds(r.getMilliseconds())),
                                    n
                                );
                            }),
                                (t.isValidDate = function (e) {
                                    return (
                                        "[object Date]" ===
                                            Object.prototype.toString.call(e) &&
                                        !isNaN(e.getTime())
                                    );
                                }),
                                (t.setCurrentTime = function (e, a) {
                                    "string" == typeof e
                                        ? (t.currentTime = t.strToDateTime(e))
                                        : t.isValidDate(e)
                                        ? (t.currentTime = e)
                                        : e || a || !C.allowBlank || C.inline
                                        ? (t.currentTime = t.now())
                                        : (t.currentTime = null),
                                        j.trigger("xchange.xdsoft");
                                }),
                                (t.empty = function () {
                                    t.currentTime = null;
                                }),
                                (t.getCurrentTime = function () {
                                    return t.currentTime;
                                }),
                                (t.nextMonth = function () {
                                    (void 0 !== t.currentTime &&
                                        null !== t.currentTime) ||
                                        (t.currentTime = t.now());
                                    var a,
                                        r = t.currentTime.getMonth() + 1;
                                    return (
                                        12 === r &&
                                            (t.currentTime.setFullYear(
                                                t.currentTime.getFullYear() + 1
                                            ),
                                            (r = 0)),
                                        (a = t.currentTime.getFullYear()),
                                        t.currentTime.setDate(
                                            Math.min(
                                                new Date(
                                                    t.currentTime.getFullYear(),
                                                    r + 1,
                                                    0
                                                ).getDate(),
                                                t.currentTime.getDate()
                                            )
                                        ),
                                        t.currentTime.setMonth(r),
                                        C.onChangeMonth &&
                                            e.isFunction(C.onChangeMonth) &&
                                            C.onChangeMonth.call(
                                                j,
                                                A.currentTime,
                                                j.data("input")
                                            ),
                                        a !== t.currentTime.getFullYear() &&
                                            e.isFunction(C.onChangeYear) &&
                                            C.onChangeYear.call(
                                                j,
                                                A.currentTime,
                                                j.data("input")
                                            ),
                                        j.trigger("xchange.xdsoft"),
                                        r
                                    );
                                }),
                                (t.prevMonth = function () {
                                    (void 0 !== t.currentTime &&
                                        null !== t.currentTime) ||
                                        (t.currentTime = t.now());
                                    var a = t.currentTime.getMonth() - 1;
                                    return (
                                        -1 === a &&
                                            (t.currentTime.setFullYear(
                                                t.currentTime.getFullYear() - 1
                                            ),
                                            (a = 11)),
                                        t.currentTime.setDate(
                                            Math.min(
                                                new Date(
                                                    t.currentTime.getFullYear(),
                                                    a + 1,
                                                    0
                                                ).getDate(),
                                                t.currentTime.getDate()
                                            )
                                        ),
                                        t.currentTime.setMonth(a),
                                        C.onChangeMonth &&
                                            e.isFunction(C.onChangeMonth) &&
                                            C.onChangeMonth.call(
                                                j,
                                                A.currentTime,
                                                j.data("input")
                                            ),
                                        j.trigger("xchange.xdsoft"),
                                        a
                                    );
                                }),
                                (t.getWeekOfYear = function (t) {
                                    if (
                                        C.onGetWeekOfYear &&
                                        e.isFunction(C.onGetWeekOfYear)
                                    ) {
                                        var a = C.onGetWeekOfYear.call(j, t);
                                        if (void 0 !== a) return a;
                                    }
                                    var r = new Date(t.getFullYear(), 0, 1);
                                    return (
                                        4 !== r.getDay() &&
                                            r.setMonth(
                                                0,
                                                1 + ((4 - r.getDay() + 7) % 7)
                                            ),
                                        Math.ceil(
                                            ((t - r) / 864e5 + r.getDay() + 1) /
                                                7
                                        )
                                    );
                                }),
                                (t.strToDateTime = function (e) {
                                    var a,
                                        n,
                                        o = [];
                                    return e &&
                                        e instanceof Date &&
                                        t.isValidDate(e)
                                        ? e
                                        : ((o = /^([+-]{1})(.*)$/.exec(e)) &&
                                              (o[2] = r.parseDate(
                                                  o[2],
                                                  C.formatDate
                                              )),
                                          o && o[2]
                                              ? ((a =
                                                    o[2].getTime() -
                                                    6e4 *
                                                        o[2].getTimezoneOffset()),
                                                (n = new Date(
                                                    t.now(!0).getTime() +
                                                        parseInt(
                                                            o[1] + "1",
                                                            10
                                                        ) *
                                                            a
                                                )))
                                              : (n = e
                                                    ? r.parseDate(e, C.format)
                                                    : t.now()),
                                          t.isValidDate(n) || (n = t.now()),
                                          n);
                                }),
                                (t.strToDate = function (e) {
                                    if (
                                        e &&
                                        e instanceof Date &&
                                        t.isValidDate(e)
                                    )
                                        return e;
                                    var a = e
                                        ? r.parseDate(e, C.formatDate)
                                        : t.now(!0);
                                    return (
                                        t.isValidDate(a) || (a = t.now(!0)), a
                                    );
                                }),
                                (t.strtotime = function (e) {
                                    if (
                                        e &&
                                        e instanceof Date &&
                                        t.isValidDate(e)
                                    )
                                        return e;
                                    var a = e
                                        ? r.parseDate(e, C.formatTime)
                                        : t.now(!0);
                                    return (
                                        t.isValidDate(a) || (a = t.now(!0)), a
                                    );
                                }),
                                (t.str = function () {
                                    var e = C.format;
                                    return (
                                        C.yearOffset &&
                                            (e = (e = e.replace(
                                                "Y",
                                                t.currentTime.getFullYear() +
                                                    C.yearOffset
                                            )).replace(
                                                "y",
                                                String(
                                                    t.currentTime.getFullYear() +
                                                        C.yearOffset
                                                ).substring(2, 4)
                                            )),
                                        r.formatDate(t.currentTime, e)
                                    );
                                }),
                                (t.currentTime = this.now());
                        })()),
                        V.on("touchend click", function (e) {
                            e.preventDefault(),
                                j.data("changed", !0),
                                A.setCurrentTime(i()),
                                a.val(A.str()),
                                j.trigger("close.xdsoft");
                        }),
                        I.find(".xdsoft_today_button")
                            .on("touchend mousedown.xdsoft", function () {
                                j.data("changed", !0),
                                    A.setCurrentTime(0, !0),
                                    j.trigger("afterOpen.xdsoft");
                            })
                            .on("dblclick.xdsoft", function () {
                                var e,
                                    t,
                                    r = A.getCurrentTime();
                                (r = new Date(
                                    r.getFullYear(),
                                    r.getMonth(),
                                    r.getDate()
                                )),
                                    (e = A.strToDate(C.minDate)),
                                    r <
                                        (e = new Date(
                                            e.getFullYear(),
                                            e.getMonth(),
                                            e.getDate()
                                        )) ||
                                        ((t = A.strToDate(C.maxDate)),
                                        r >
                                            (t = new Date(
                                                t.getFullYear(),
                                                t.getMonth(),
                                                t.getDate()
                                            )) ||
                                            (a.val(A.str()),
                                            a.trigger("change"),
                                            j.trigger("close.xdsoft")));
                            }),
                        I.find(".xdsoft_prev,.xdsoft_next").on(
                            "touchend mousedown.xdsoft",
                            function () {
                                var t = e(this),
                                    a = 0,
                                    r = !1;
                                !(function e(n) {
                                    t.hasClass(C.next)
                                        ? A.nextMonth()
                                        : t.hasClass(C.prev) && A.prevMonth(),
                                        C.monthChangeSpinner &&
                                            (r ||
                                                (a = setTimeout(e, n || 100)));
                                })(500),
                                    e([
                                        C.ownerDocument.body,
                                        C.contentWindow,
                                    ]).on(
                                        "touchend mouseup.xdsoft",
                                        function t() {
                                            clearTimeout(a),
                                                (r = !0),
                                                e([
                                                    C.ownerDocument.body,
                                                    C.contentWindow,
                                                ]).off(
                                                    "touchend mouseup.xdsoft",
                                                    t
                                                );
                                        }
                                    );
                            }
                        ),
                        L.find(".xdsoft_prev,.xdsoft_next").on(
                            "touchend mousedown.xdsoft",
                            function () {
                                var t = e(this),
                                    a = 0,
                                    r = !1,
                                    n = 110;
                                !(function e(o) {
                                    var i = E[0].clientHeight,
                                        s = R[0].offsetHeight,
                                        u = Math.abs(
                                            parseInt(R.css("marginTop"), 10)
                                        );
                                    t.hasClass(C.next) &&
                                    s - i - C.timeHeightInTimePicker >= u
                                        ? R.css(
                                              "marginTop",
                                              "-" +
                                                  (u +
                                                      C.timeHeightInTimePicker) +
                                                  "px"
                                          )
                                        : t.hasClass(C.prev) &&
                                          u - C.timeHeightInTimePicker >= 0 &&
                                          R.css(
                                              "marginTop",
                                              "-" +
                                                  (u -
                                                      C.timeHeightInTimePicker) +
                                                  "px"
                                          ),
                                        E.trigger(
                                            "scroll_element.xdsoft_scroller",
                                            [
                                                Math.abs(
                                                    parseInt(
                                                        R[0].style.marginTop,
                                                        10
                                                    ) /
                                                        (s - i)
                                                ),
                                            ]
                                        ),
                                        (n = n > 10 ? 10 : n - 10),
                                        r || (a = setTimeout(e, o || n));
                                })(500),
                                    e([
                                        C.ownerDocument.body,
                                        C.contentWindow,
                                    ]).on(
                                        "touchend mouseup.xdsoft",
                                        function t() {
                                            clearTimeout(a),
                                                (r = !0),
                                                e([
                                                    C.ownerDocument.body,
                                                    C.contentWindow,
                                                ]).off(
                                                    "touchend mouseup.xdsoft",
                                                    t
                                                );
                                        }
                                    );
                            }
                        ),
                        (u = 0),
                        j
                            .on("xchange.xdsoft", function (t) {
                                clearTimeout(u),
                                    (u = setTimeout(function () {
                                        (void 0 !== A.currentTime &&
                                            null !== A.currentTime) ||
                                            (A.currentTime = A.now());
                                        for (
                                            var t,
                                                i,
                                                s,
                                                u,
                                                d,
                                                l,
                                                f,
                                                c,
                                                m,
                                                h,
                                                g = "",
                                                p = new Date(
                                                    A.currentTime.getFullYear(),
                                                    A.currentTime.getMonth(),
                                                    1,
                                                    12,
                                                    0,
                                                    0
                                                ),
                                                D = 0,
                                                v = A.now(),
                                                y = !1,
                                                b = !1,
                                                k = !1,
                                                x = !1,
                                                T = [],
                                                S = !0,
                                                M = "";
                                            p.getDay() !== C.dayOfWeekStart;

                                        )
                                            p.setDate(p.getDate() - 1);
                                        for (
                                            g += "<table><thead><tr>",
                                                C.weeks && (g += "<th></th>"),
                                                t = 0;
                                            t < 7;
                                            t += 1
                                        )
                                            g +=
                                                "<th>" +
                                                C.i18n[o].dayOfWeekShort[
                                                    (t + C.dayOfWeekStart) % 7
                                                ] +
                                                "</th>";
                                        (g += "</tr></thead>"),
                                            (g += "<tbody>"),
                                            !1 !== C.maxDate &&
                                                ((y = A.strToDate(C.maxDate)),
                                                (y = new Date(
                                                    y.getFullYear(),
                                                    y.getMonth(),
                                                    y.getDate(),
                                                    23,
                                                    59,
                                                    59,
                                                    999
                                                ))),
                                            !1 !== C.minDate &&
                                                ((b = A.strToDate(C.minDate)),
                                                (b = new Date(
                                                    b.getFullYear(),
                                                    b.getMonth(),
                                                    b.getDate()
                                                ))),
                                            !1 !== C.minDateTime &&
                                                ((k = A.strToDate(
                                                    C.minDateTime
                                                )),
                                                (k = new Date(
                                                    k.getFullYear(),
                                                    k.getMonth(),
                                                    k.getDate(),
                                                    k.getHours(),
                                                    k.getMinutes(),
                                                    k.getSeconds()
                                                ))),
                                            !1 !== C.maxDateTime &&
                                                ((x = A.strToDate(
                                                    C.maxDateTime
                                                )),
                                                (x = new Date(
                                                    x.getFullYear(),
                                                    x.getMonth(),
                                                    x.getDate(),
                                                    x.getHours(),
                                                    x.getMinutes(),
                                                    x.getSeconds()
                                                )));
                                        var w;
                                        for (
                                            !1 !== x &&
                                            (w =
                                                31 *
                                                    (12 * x.getFullYear() +
                                                        x.getMonth()) +
                                                x.getDate());
                                            D <
                                                A.currentTime.countDaysInMonth() ||
                                            p.getDay() !== C.dayOfWeekStart ||
                                            A.currentTime.getMonth() ===
                                                p.getMonth();

                                        ) {
                                            (T = []),
                                                (D += 1),
                                                (s = p.getDay()),
                                                (u = p.getDate()),
                                                (d = p.getFullYear()),
                                                (l = p.getMonth()),
                                                (f = A.getWeekOfYear(p)),
                                                (h = ""),
                                                T.push("xdsoft_date"),
                                                (c =
                                                    C.beforeShowDay &&
                                                    e.isFunction(
                                                        C.beforeShowDay.call
                                                    )
                                                        ? C.beforeShowDay.call(
                                                              j,
                                                              p
                                                          )
                                                        : null),
                                                C.allowDateRe &&
                                                    "[object RegExp]" ===
                                                        Object.prototype.toString.call(
                                                            C.allowDateRe
                                                        ) &&
                                                    (C.allowDateRe.test(
                                                        r.formatDate(
                                                            p,
                                                            C.formatDate
                                                        )
                                                    ) ||
                                                        T.push(
                                                            "xdsoft_disabled"
                                                        )),
                                                C.allowDates &&
                                                    C.allowDates.length > 0 &&
                                                    -1 ===
                                                        C.allowDates.indexOf(
                                                            r.formatDate(
                                                                p,
                                                                C.formatDate
                                                            )
                                                        ) &&
                                                    T.push("xdsoft_disabled");
                                            var O =
                                                31 *
                                                    (12 * p.getFullYear() +
                                                        p.getMonth()) +
                                                p.getDate();
                                            ((!1 !== y && p > y) ||
                                                (!1 !== k && p < k) ||
                                                (!1 !== b && p < b) ||
                                                (!1 !== x && O > w) ||
                                                (c && !1 === c[0])) &&
                                                T.push("xdsoft_disabled"),
                                                -1 !==
                                                    C.disabledDates.indexOf(
                                                        r.formatDate(
                                                            p,
                                                            C.formatDate
                                                        )
                                                    ) &&
                                                    T.push("xdsoft_disabled"),
                                                -1 !==
                                                    C.disabledWeekDays.indexOf(
                                                        s
                                                    ) &&
                                                    T.push("xdsoft_disabled"),
                                                a.is("[disabled]") &&
                                                    T.push("xdsoft_disabled"),
                                                c &&
                                                    "" !== c[1] &&
                                                    T.push(c[1]),
                                                A.currentTime.getMonth() !==
                                                    l &&
                                                    T.push(
                                                        "xdsoft_other_month"
                                                    ),
                                                (C.defaultSelect ||
                                                    j.data("changed")) &&
                                                    r.formatDate(
                                                        A.currentTime,
                                                        C.formatDate
                                                    ) ===
                                                        r.formatDate(
                                                            p,
                                                            C.formatDate
                                                        ) &&
                                                    T.push("xdsoft_current"),
                                                r.formatDate(
                                                    v,
                                                    C.formatDate
                                                ) ===
                                                    r.formatDate(
                                                        p,
                                                        C.formatDate
                                                    ) && T.push("xdsoft_today"),
                                                (0 !== p.getDay() &&
                                                    6 !== p.getDay() &&
                                                    -1 ===
                                                        C.weekends.indexOf(
                                                            r.formatDate(
                                                                p,
                                                                C.formatDate
                                                            )
                                                        )) ||
                                                    T.push("xdsoft_weekend"),
                                                void 0 !==
                                                    C.highlightedDates[
                                                        r.formatDate(
                                                            p,
                                                            C.formatDate
                                                        )
                                                    ] &&
                                                    ((i =
                                                        C.highlightedDates[
                                                            r.formatDate(
                                                                p,
                                                                C.formatDate
                                                            )
                                                        ]),
                                                    T.push(
                                                        void 0 === i.style
                                                            ? "xdsoft_highlighted_default"
                                                            : i.style
                                                    ),
                                                    (h =
                                                        void 0 === i.desc
                                                            ? ""
                                                            : i.desc)),
                                                C.beforeShowDay &&
                                                    e.isFunction(
                                                        C.beforeShowDay
                                                    ) &&
                                                    T.push(C.beforeShowDay(p)),
                                                S &&
                                                    ((g += "<tr>"),
                                                    (S = !1),
                                                    C.weeks &&
                                                        (g +=
                                                            "<th>" +
                                                            f +
                                                            "</th>")),
                                                (g +=
                                                    '<td data-date="' +
                                                    u +
                                                    '" data-month="' +
                                                    l +
                                                    '" data-year="' +
                                                    d +
                                                    '" class="xdsoft_date xdsoft_day_of_week' +
                                                    p.getDay() +
                                                    " " +
                                                    T.join(" ") +
                                                    '" title="' +
                                                    h +
                                                    '"><div>' +
                                                    u +
                                                    "</div></td>"),
                                                p.getDay() ===
                                                    C.dayOfWeekStartPrev &&
                                                    ((g += "</tr>"), (S = !0)),
                                                p.setDate(u + 1);
                                        }
                                        (g += "</tbody></table>"),
                                            N.html(g),
                                            I.find(".xdsoft_label span")
                                                .eq(0)
                                                .text(
                                                    C.i18n[o].months[
                                                        A.currentTime.getMonth()
                                                    ]
                                                ),
                                            I.find(".xdsoft_label span")
                                                .eq(1)
                                                .text(
                                                    A.currentTime.getFullYear() +
                                                        C.yearOffset
                                                ),
                                            (M = ""),
                                            (l = "");
                                        var W = 0;
                                        if (!1 !== C.minTime) {
                                            F = A.strtotime(C.minTime);
                                            W =
                                                60 * F.getHours() +
                                                F.getMinutes();
                                        }
                                        var _ = 1440;
                                        if (!1 !== C.maxTime) {
                                            F = A.strtotime(C.maxTime);
                                            _ =
                                                60 * F.getHours() +
                                                F.getMinutes();
                                        }
                                        if (!1 !== C.minDateTime) {
                                            F = A.strToDateTime(C.minDateTime);
                                            r.formatDate(
                                                A.currentTime,
                                                C.formatDate
                                            ) ===
                                                r.formatDate(F, C.formatDate) &&
                                                (l =
                                                    60 * F.getHours() +
                                                    F.getMinutes()) > W &&
                                                (W = l);
                                        }
                                        if (!1 !== C.maxDateTime) {
                                            var F = A.strToDateTime(
                                                C.maxDateTime
                                            );
                                            r.formatDate(
                                                A.currentTime,
                                                C.formatDate
                                            ) ===
                                                r.formatDate(F, C.formatDate) &&
                                                (l =
                                                    60 * F.getHours() +
                                                    F.getMinutes()) < _ &&
                                                (_ = l);
                                        }
                                        if (
                                            ((m = function (t, n) {
                                                var o,
                                                    i = A.now(),
                                                    s =
                                                        C.allowTimes &&
                                                        e.isArray(
                                                            C.allowTimes
                                                        ) &&
                                                        C.allowTimes.length;
                                                i.setHours(t),
                                                    (t = parseInt(
                                                        i.getHours(),
                                                        10
                                                    )),
                                                    i.setMinutes(n),
                                                    (n = parseInt(
                                                        i.getMinutes(),
                                                        10
                                                    )),
                                                    (T = []);
                                                var u = 60 * t + n;
                                                (a.is("[disabled]") ||
                                                    u >= _ ||
                                                    u < W) &&
                                                    T.push("xdsoft_disabled"),
                                                    (o = new Date(
                                                        A.currentTime
                                                    )).setHours(
                                                        parseInt(
                                                            A.currentTime.getHours(),
                                                            10
                                                        )
                                                    ),
                                                    s ||
                                                        o.setMinutes(
                                                            Math[C.roundTime](
                                                                A.currentTime.getMinutes() /
                                                                    C.step
                                                            ) * C.step
                                                        ),
                                                    (C.initTime ||
                                                        C.defaultSelect ||
                                                        j.data("changed")) &&
                                                        o.getHours() ===
                                                            parseInt(t, 10) &&
                                                        ((!s && C.step > 59) ||
                                                            o.getMinutes() ===
                                                                parseInt(
                                                                    n,
                                                                    10
                                                                )) &&
                                                        (C.defaultSelect ||
                                                        j.data("changed")
                                                            ? T.push(
                                                                  "xdsoft_current"
                                                              )
                                                            : C.initTime &&
                                                              T.push(
                                                                  "xdsoft_init_time"
                                                              )),
                                                    parseInt(
                                                        v.getHours(),
                                                        10
                                                    ) === parseInt(t, 10) &&
                                                        parseInt(
                                                            v.getMinutes(),
                                                            10
                                                        ) === parseInt(n, 10) &&
                                                        T.push("xdsoft_today"),
                                                    (M +=
                                                        '<div class="xdsoft_time ' +
                                                        T.join(" ") +
                                                        '" data-hour="' +
                                                        t +
                                                        '" data-minute="' +
                                                        n +
                                                        '">' +
                                                        r.formatDate(
                                                            i,
                                                            C.formatTime
                                                        ) +
                                                        "</div>");
                                            }),
                                            C.allowTimes &&
                                                e.isArray(C.allowTimes) &&
                                                C.allowTimes.length)
                                        )
                                            for (
                                                D = 0;
                                                D < C.allowTimes.length;
                                                D += 1
                                            )
                                                m(
                                                    A.strtotime(
                                                        C.allowTimes[D]
                                                    ).getHours(),
                                                    (l = A.strtotime(
                                                        C.allowTimes[D]
                                                    ).getMinutes())
                                                );
                                        else
                                            for (
                                                D = 0, t = 0;
                                                D < (C.hours12 ? 12 : 24);
                                                D += 1
                                            )
                                                for (
                                                    t = 0;
                                                    t < 60;
                                                    t += C.step
                                                ) {
                                                    var P = 60 * D + t;
                                                    P < W ||
                                                        P >= _ ||
                                                        m(
                                                            (D < 10
                                                                ? "0"
                                                                : "") + D,
                                                            (l =
                                                                (t < 10
                                                                    ? "0"
                                                                    : "") + t)
                                                        );
                                                }
                                        for (
                                            R.html(M),
                                                n = "",
                                                D = parseInt(C.yearStart, 10);
                                            D <= parseInt(C.yearEnd, 10);
                                            D += 1
                                        )
                                            n +=
                                                '<div class="xdsoft_option ' +
                                                (A.currentTime.getFullYear() ===
                                                D
                                                    ? "xdsoft_current"
                                                    : "") +
                                                '" data-value="' +
                                                D +
                                                '">' +
                                                (D + C.yearOffset) +
                                                "</div>";
                                        for (
                                            G.children().eq(0).html(n),
                                                D = parseInt(C.monthStart, 10),
                                                n = "";
                                            D <= parseInt(C.monthEnd, 10);
                                            D += 1
                                        )
                                            n +=
                                                '<div class="xdsoft_option ' +
                                                (A.currentTime.getMonth() === D
                                                    ? "xdsoft_current"
                                                    : "") +
                                                '" data-value="' +
                                                D +
                                                '">' +
                                                C.i18n[o].months[D] +
                                                "</div>";
                                        B.children().eq(0).html(n),
                                            e(j).trigger("generate.xdsoft");
                                    }, 10)),
                                    t.stopPropagation();
                            })
                            .on("afterOpen.xdsoft", function () {
                                if (C.timepicker) {
                                    var e, t, a, r;
                                    R.find(".xdsoft_current").length
                                        ? (e = ".xdsoft_current")
                                        : R.find(".xdsoft_init_time").length &&
                                          (e = ".xdsoft_init_time"),
                                        e
                                            ? ((t = E[0].clientHeight),
                                              (a = R[0].offsetHeight) - t <
                                                  (r =
                                                      R.find(e).index() *
                                                          C.timeHeightInTimePicker +
                                                      1) && (r = a - t),
                                              E.trigger(
                                                  "scroll_element.xdsoft_scroller",
                                                  [parseInt(r, 10) / (a - t)]
                                              ))
                                            : E.trigger(
                                                  "scroll_element.xdsoft_scroller",
                                                  [0]
                                              );
                                }
                            }),
                        (d = 0),
                        N.on("touchend click.xdsoft", "td", function (t) {
                            t.stopPropagation(), (d += 1);
                            var r = e(this),
                                n = A.currentTime;
                            if (
                                ((void 0 !== n && null !== n) ||
                                    ((A.currentTime = A.now()),
                                    (n = A.currentTime)),
                                r.hasClass("xdsoft_disabled"))
                            )
                                return !1;
                            n.setDate(1),
                                n.setFullYear(r.data("year")),
                                n.setMonth(r.data("month")),
                                n.setDate(r.data("date")),
                                j.trigger("select.xdsoft", [n]),
                                a.val(A.str()),
                                C.onSelectDate &&
                                    e.isFunction(C.onSelectDate) &&
                                    C.onSelectDate.call(
                                        j,
                                        A.currentTime,
                                        j.data("input"),
                                        t
                                    ),
                                j.data("changed", !0),
                                j.trigger("xchange.xdsoft"),
                                j.trigger("changedatetime.xdsoft"),
                                (d > 1 ||
                                    !0 === C.closeOnDateSelect ||
                                    (!1 === C.closeOnDateSelect &&
                                        !C.timepicker)) &&
                                    !C.inline &&
                                    j.trigger("close.xdsoft"),
                                setTimeout(function () {
                                    d = 0;
                                }, 200);
                        }),
                        R.on("touchstart", "div", function (e) {
                            this.touchMoved = !1;
                        })
                            .on("touchmove", "div", X)
                            .on("touchend click.xdsoft", "div", function (t) {
                                if (!this.touchMoved) {
                                    t.stopPropagation();
                                    var a = e(this),
                                        r = A.currentTime;
                                    if (
                                        ((void 0 !== r && null !== r) ||
                                            ((A.currentTime = A.now()),
                                            (r = A.currentTime)),
                                        a.hasClass("xdsoft_disabled"))
                                    )
                                        return !1;
                                    r.setHours(a.data("hour")),
                                        r.setMinutes(a.data("minute")),
                                        j.trigger("select.xdsoft", [r]),
                                        j.data("input").val(A.str()),
                                        C.onSelectTime &&
                                            e.isFunction(C.onSelectTime) &&
                                            C.onSelectTime.call(
                                                j,
                                                A.currentTime,
                                                j.data("input"),
                                                t
                                            ),
                                        j.data("changed", !0),
                                        j.trigger("xchange.xdsoft"),
                                        j.trigger("changedatetime.xdsoft"),
                                        !0 !== C.inline &&
                                            !0 === C.closeOnTimeSelect &&
                                            j.trigger("close.xdsoft");
                                }
                            }),
                        z.on("mousewheel.xdsoft", function (e) {
                            return (
                                !C.scrollMonth ||
                                (e.deltaY < 0 ? A.nextMonth() : A.prevMonth(),
                                !1)
                            );
                        }),
                        a.on("mousewheel.xdsoft", function (e) {
                            return (
                                !C.scrollInput ||
                                (!C.datepicker && C.timepicker
                                    ? ((P = R.find(".xdsoft_current").length
                                          ? R.find(".xdsoft_current")
                                                .eq(0)
                                                .index()
                                          : 0) +
                                          e.deltaY >=
                                          0 &&
                                          P + e.deltaY < R.children().length &&
                                          (P += e.deltaY),
                                      R.children().eq(P).length &&
                                          R.children()
                                              .eq(P)
                                              .trigger("mousedown"),
                                      !1)
                                    : C.datepicker && !C.timepicker
                                    ? (z.trigger(e, [
                                          e.deltaY,
                                          e.deltaX,
                                          e.deltaY,
                                      ]),
                                      a.val && a.val(A.str()),
                                      j.trigger("changedatetime.xdsoft"),
                                      !1)
                                    : void 0)
                            );
                        }),
                        j
                            .on("changedatetime.xdsoft", function (t) {
                                if (
                                    C.onChangeDateTime &&
                                    e.isFunction(C.onChangeDateTime)
                                ) {
                                    var a = j.data("input");
                                    C.onChangeDateTime.call(
                                        j,
                                        A.currentTime,
                                        a,
                                        t
                                    ),
                                        delete C.value,
                                        a.trigger("change");
                                }
                            })
                            .on("generate.xdsoft", function () {
                                C.onGenerate &&
                                    e.isFunction(C.onGenerate) &&
                                    C.onGenerate.call(
                                        j,
                                        A.currentTime,
                                        j.data("input")
                                    ),
                                    U &&
                                        (j.trigger("afterOpen.xdsoft"),
                                        (U = !1));
                            })
                            .on("click.xdsoft", function (e) {
                                e.stopPropagation();
                            }),
                        (P = 0),
                        (H = function (e, t) {
                            do {
                                if (!(e = e.parentNode) || !1 === t(e)) break;
                            } while ("HTML" !== e.nodeName);
                        }),
                        (Y = function () {
                            var t, a, r, n, o, i, s, u, d, l, f, c, m;
                            if (
                                ((u = j.data("input")),
                                (t = u.offset()),
                                (a = u[0]),
                                (l = "top"),
                                (r = t.top + a.offsetHeight - 1),
                                (n = t.left),
                                (o = "absolute"),
                                (d = e(C.contentWindow).width()),
                                (c = e(C.contentWindow).height()),
                                (m = e(C.contentWindow).scrollTop()),
                                C.ownerDocument.documentElement.clientWidth -
                                    t.left <
                                    z.parent().outerWidth(!0))
                            ) {
                                var h =
                                    z.parent().outerWidth(!0) - a.offsetWidth;
                                n -= h;
                            }
                            "rtl" === u.parent().css("direction") &&
                                (n -= j.outerWidth() - u.outerWidth()),
                                C.fixed
                                    ? ((r -= m),
                                      (n -= e(C.contentWindow).scrollLeft()),
                                      (o = "fixed"))
                                    : ((s = !1),
                                      H(a, function (e) {
                                          return (
                                              null !== e &&
                                              ("fixed" ===
                                              C.contentWindow
                                                  .getComputedStyle(e)
                                                  .getPropertyValue("position")
                                                  ? ((s = !0), !1)
                                                  : void 0)
                                          );
                                      }),
                                      s
                                          ? ((o = "fixed"),
                                            r + j.outerHeight() > c + m
                                                ? ((l = "bottom"),
                                                  (r = c + m - t.top))
                                                : (r -= m))
                                          : r + j[0].offsetHeight > c + m &&
                                            (r = t.top - j[0].offsetHeight + 1),
                                      r < 0 && (r = 0),
                                      n + a.offsetWidth > d &&
                                          (n = d - a.offsetWidth)),
                                (i = j[0]),
                                H(i, function (e) {
                                    if (
                                        "relative" ===
                                            C.contentWindow
                                                .getComputedStyle(e)
                                                .getPropertyValue("position") &&
                                        d >= e.offsetWidth
                                    )
                                        return (
                                            (n -= (d - e.offsetWidth) / 2), !1
                                        );
                                }),
                                ((f = {
                                    position: o,
                                    left: n,
                                    top: "",
                                    bottom: "",
                                })[l] = r),
                                j.css(f);
                        }),
                        j
                            .on("open.xdsoft", function (t) {
                                var a = !0;
                                C.onShow &&
                                    e.isFunction(C.onShow) &&
                                    (a = C.onShow.call(
                                        j,
                                        A.currentTime,
                                        j.data("input"),
                                        t
                                    )),
                                    !1 !== a &&
                                        (j.show(),
                                        Y(),
                                        e(C.contentWindow)
                                            .off("resize.xdsoft", Y)
                                            .on("resize.xdsoft", Y),
                                        C.closeOnWithoutClick &&
                                            e([
                                                C.ownerDocument.body,
                                                C.contentWindow,
                                            ]).on(
                                                "touchstart mousedown.xdsoft",
                                                function t() {
                                                    j.trigger("close.xdsoft"),
                                                        e([
                                                            C.ownerDocument
                                                                .body,
                                                            C.contentWindow,
                                                        ]).off(
                                                            "touchstart mousedown.xdsoft",
                                                            t
                                                        );
                                                }
                                            ));
                            })
                            .on("close.xdsoft", function (t) {
                                var a = !0;
                                I.find(".xdsoft_month,.xdsoft_year")
                                    .find(".xdsoft_select")
                                    .hide(),
                                    C.onClose &&
                                        e.isFunction(C.onClose) &&
                                        (a = C.onClose.call(
                                            j,
                                            A.currentTime,
                                            j.data("input"),
                                            t
                                        )),
                                    !1 === a ||
                                        C.opened ||
                                        C.inline ||
                                        j.hide(),
                                    t.stopPropagation();
                            })
                            .on("toggle.xdsoft", function () {
                                j.is(":visible")
                                    ? j.trigger("close.xdsoft")
                                    : j.trigger("open.xdsoft");
                            })
                            .data("input", a),
                        (q = 0),
                        j.data("xdsoft_datetime", A),
                        j.setOptions(C),
                        A.setCurrentTime(i()),
                        a
                            .data("xdsoft_datetimepicker", j)
                            .on(
                                "open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",
                                function () {
                                    a.is(":disabled") ||
                                        (a
                                            .data("xdsoft_datetimepicker")
                                            .is(":visible") &&
                                            C.closeOnInputClick) ||
                                        (C.openOnFocus &&
                                            (clearTimeout(q),
                                            (q = setTimeout(function () {
                                                a.is(":disabled") ||
                                                    ((U = !0),
                                                    A.setCurrentTime(i(), !0),
                                                    C.mask && s(C),
                                                    j.trigger("open.xdsoft"));
                                            }, 100))));
                                }
                            )
                            .on("keydown.xdsoft", function (t) {
                                var a,
                                    r = t.which;
                                return -1 !== [p].indexOf(r) && C.enterLikeTab
                                    ? ((a = e(
                                          "input:visible,textarea:visible,button:visible,a:visible"
                                      )),
                                      j.trigger("close.xdsoft"),
                                      a.eq(a.index(this) + 1).focus(),
                                      !1)
                                    : -1 !== [T].indexOf(r)
                                    ? (j.trigger("close.xdsoft"), !0)
                                    : void 0;
                            })
                            .on("blur.xdsoft", function () {
                                j.trigger("close.xdsoft");
                            });
                }),
                (u = function (t) {
                    var a = t.data("xdsoft_datetimepicker");
                    a &&
                        (a.data("xdsoft_datetime", null),
                        a.remove(),
                        t.data("xdsoft_datetimepicker", null).off(".xdsoft"),
                        e(C.contentWindow).off("resize.xdsoft"),
                        e([C.contentWindow, C.ownerDocument.body]).off(
                            "mousedown.xdsoft touchstart"
                        ),
                        t.unmousewheel && t.unmousewheel());
                }),
                e(C.ownerDocument)
                    .off("keydown.xdsoftctrl keyup.xdsoftctrl")
                    .on("keydown.xdsoftctrl", function (e) {
                        e.keyCode === h && (F = !0);
                    })
                    .on("keyup.xdsoftctrl", function (e) {
                        e.keyCode === h && (F = !1);
                    }),
                this.each(function () {
                    var t = e(this).data("xdsoft_datetimepicker");
                    if (t) {
                        if ("string" === e.type(n))
                            switch (n) {
                                case "show":
                                    e(this).select().focus(),
                                        t.trigger("open.xdsoft");
                                    break;
                                case "hide":
                                    t.trigger("close.xdsoft");
                                    break;
                                case "toggle":
                                    t.trigger("toggle.xdsoft");
                                    break;
                                case "destroy":
                                    u(e(this));
                                    break;
                                case "reset":
                                    (this.value = this.defaultValue),
                                        (this.value &&
                                            t
                                                .data("xdsoft_datetime")
                                                .isValidDate(
                                                    r.parseDate(
                                                        this.value,
                                                        C.format
                                                    )
                                                )) ||
                                            t.data("changed", !1),
                                        t
                                            .data("xdsoft_datetime")
                                            .setCurrentTime(this.value);
                                    break;
                                case "validate":
                                    t.data("input").trigger("blur.xdsoft");
                                    break;
                                default:
                                    t[n] && e.isFunction(t[n]) && (d = t[n](i));
                            }
                        else t.setOptions(n);
                        return 0;
                    }
                    "string" !== e.type(n) &&
                        (!C.lazyInit || C.open || C.inline
                            ? s(e(this))
                            : Y(e(this)));
                }),
                d
            );
        }),
        (e.fn.datetimepicker.defaults = a);
};
!(function (e) {
    "function" == typeof define && define.amd
        ? define(["jquery", "jquery-mousewheel"], e)
        : "object" == typeof exports
        ? (module.exports = e(require("jquery")))
        : e(jQuery);
})(datetimepickerFactory),
    (function (e) {
        "function" == typeof define && define.amd
            ? define(["jquery"], e)
            : "object" == typeof exports
            ? (module.exports = e)
            : e(jQuery);
    })(function (e) {
        function t(t) {
            var i = t || window.event,
                s = u.call(arguments, 1),
                d = 0,
                f = 0,
                c = 0,
                m = 0,
                h = 0,
                g = 0;
            if (
                ((t = e.event.fix(i)),
                (t.type = "mousewheel"),
                "detail" in i && (c = -1 * i.detail),
                "wheelDelta" in i && (c = i.wheelDelta),
                "wheelDeltaY" in i && (c = i.wheelDeltaY),
                "wheelDeltaX" in i && (f = -1 * i.wheelDeltaX),
                "axis" in i &&
                    i.axis === i.HORIZONTAL_AXIS &&
                    ((f = -1 * c), (c = 0)),
                (d = 0 === c ? f : c),
                "deltaY" in i && (d = c = -1 * i.deltaY),
                "deltaX" in i && ((f = i.deltaX), 0 === c && (d = -1 * f)),
                0 !== c || 0 !== f)
            ) {
                if (1 === i.deltaMode) {
                    var p = e.data(this, "mousewheel-line-height");
                    (d *= p), (c *= p), (f *= p);
                } else if (2 === i.deltaMode) {
                    var D = e.data(this, "mousewheel-page-height");
                    (d *= D), (c *= D), (f *= D);
                }
                if (
                    ((m = Math.max(Math.abs(c), Math.abs(f))),
                    (!o || m < o) && ((o = m), r(i, m) && (o /= 40)),
                    r(i, m) && ((d /= 40), (f /= 40), (c /= 40)),
                    (d = Math[d >= 1 ? "floor" : "ceil"](d / o)),
                    (f = Math[f >= 1 ? "floor" : "ceil"](f / o)),
                    (c = Math[c >= 1 ? "floor" : "ceil"](c / o)),
                    l.settings.normalizeOffset && this.getBoundingClientRect)
                ) {
                    var v = this.getBoundingClientRect();
                    (h = t.clientX - v.left), (g = t.clientY - v.top);
                }
                return (
                    (t.deltaX = f),
                    (t.deltaY = c),
                    (t.deltaFactor = o),
                    (t.offsetX = h),
                    (t.offsetY = g),
                    (t.deltaMode = 0),
                    s.unshift(t, d, f, c),
                    n && clearTimeout(n),
                    (n = setTimeout(a, 200)),
                    (e.event.dispatch || e.event.handle).apply(this, s)
                );
            }
        }
        function a() {
            o = null;
        }
        function r(e, t) {
            return (
                l.settings.adjustOldDeltas &&
                "mousewheel" === e.type &&
                t % 120 == 0
            );
        }
        var n,
            o,
            i = [
                "wheel",
                "mousewheel",
                "DOMMouseScroll",
                "MozMousePixelScroll",
            ],
            s =
                "onwheel" in document || document.documentMode >= 9
                    ? ["wheel"]
                    : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            u = Array.prototype.slice;
        if (e.event.fixHooks)
            for (var d = i.length; d; )
                e.event.fixHooks[i[--d]] = e.event.mouseHooks;
        var l = (e.event.special.mousewheel = {
            version: "3.1.12",
            setup: function () {
                if (this.addEventListener)
                    for (var a = s.length; a; )
                        this.addEventListener(s[--a], t, !1);
                else this.onmousewheel = t;
                e.data(this, "mousewheel-line-height", l.getLineHeight(this)),
                    e.data(
                        this,
                        "mousewheel-page-height",
                        l.getPageHeight(this)
                    );
            },
            teardown: function () {
                if (this.removeEventListener)
                    for (var a = s.length; a; )
                        this.removeEventListener(s[--a], t, !1);
                else this.onmousewheel = null;
                e.removeData(this, "mousewheel-line-height"),
                    e.removeData(this, "mousewheel-page-height");
            },
            getLineHeight: function (t) {
                var a = e(t),
                    r = a["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                return (
                    r.length || (r = e("body")),
                    parseInt(r.css("fontSize"), 10) ||
                        parseInt(a.css("fontSize"), 10) ||
                        16
                );
            },
            getPageHeight: function (t) {
                return e(t).height();
            },
            settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
        });
        e.fn.extend({
            mousewheel: function (e) {
                return e
                    ? this.bind("mousewheel", e)
                    : this.trigger("mousewheel");
            },
            unmousewheel: function (e) {
                return this.unbind("mousewheel", e);
            },
        });
    });

/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
(function () {
    if ("undefined" !== typeof window && window.addEventListener) {
        var e = Object.create(null),
            l,
            d = function () {
                clearTimeout(l);
                l = setTimeout(n, 100);
            },
            m = function () {},
            t = function () {
                window.addEventListener("resize", d, !1);
                window.addEventListener("orientationchange", d, !1);
                if (window.MutationObserver) {
                    var k = new MutationObserver(d);
                    k.observe(document.documentElement, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0,
                    });
                    m = function () {
                        try {
                            k.disconnect(),
                                window.removeEventListener("resize", d, !1),
                                window.removeEventListener(
                                    "orientationchange",
                                    d,
                                    !1
                                );
                        } catch (v) {}
                    };
                } else
                    document.documentElement.addEventListener(
                        "DOMSubtreeModified",
                        d,
                        !1
                    ),
                        (m = function () {
                            document.documentElement.removeEventListener(
                                "DOMSubtreeModified",
                                d,
                                !1
                            );
                            window.removeEventListener("resize", d, !1);
                            window.removeEventListener(
                                "orientationchange",
                                d,
                                !1
                            );
                        });
            },
            u = function (k) {
                function e(a) {
                    if (void 0 !== a.protocol) var c = a;
                    else (c = document.createElement("a")), (c.href = a);
                    return c.protocol.replace(/:/g, "") + c.host;
                }
                if (window.XMLHttpRequest) {
                    var d = new XMLHttpRequest();
                    var m = e(location);
                    k = e(k);
                    d =
                        void 0 === d.withCredentials && "" !== k && k !== m
                            ? XDomainRequest || void 0
                            : XMLHttpRequest;
                }
                return d;
            };
        var n = function () {
            function d() {
                --q;
                0 === q && (m(), t());
            }
            function l(a) {
                return function () {
                    !0 !== e[a.base] &&
                        (a.useEl.setAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            "xlink:href",
                            "#" + a.hash
                        ),
                        a.useEl.hasAttribute("href") &&
                            a.useEl.setAttribute("href", "#" + a.hash));
                };
            }
            function p(a) {
                return function () {
                    var c = document.body,
                        b = document.createElement("x");
                    a.onload = null;
                    b.innerHTML = a.responseText;
                    if ((b = b.getElementsByTagName("svg")[0]))
                        b.setAttribute("aria-hidden", "true"),
                            (b.style.position = "absolute"),
                            (b.style.width = 0),
                            (b.style.height = 0),
                            (b.style.overflow = "hidden"),
                            c.insertBefore(b, c.firstChild);
                    d();
                };
            }
            function n(a) {
                return function () {
                    a.onerror = null;
                    a.ontimeout = null;
                    d();
                };
            }
            var a,
                c,
                q = 0;
            m();
            var f = document.getElementsByTagName("use");
            for (c = 0; c < f.length; c += 1) {
                try {
                    var g = f[c].getBoundingClientRect();
                } catch (w) {
                    g = !1;
                }
                var h =
                    (a =
                        f[c].getAttribute("href") ||
                        f[c].getAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            "href"
                        ) ||
                        f[c].getAttribute("xlink:href")) && a.split
                        ? a.split("#")
                        : ["", ""];
                var b = h[0];
                h = h[1];
                var r =
                    g &&
                    0 === g.left &&
                    0 === g.right &&
                    0 === g.top &&
                    0 === g.bottom;
                g && 0 === g.width && 0 === g.height && !r
                    ? (f[c].hasAttribute("href") &&
                          f[c].setAttributeNS(
                              "http://www.w3.org/1999/xlink",
                              "xlink:href",
                              a
                          ),
                      b.length &&
                          ((a = e[b]),
                          !0 !== a &&
                              setTimeout(
                                  l({ useEl: f[c], base: b, hash: h }),
                                  0
                              ),
                          void 0 === a &&
                              ((h = u(b)),
                              void 0 !== h &&
                                  ((a = new h()),
                                  (e[b] = a),
                                  (a.onload = p(a)),
                                  (a.onerror = n(a)),
                                  (a.ontimeout = n(a)),
                                  a.open("GET", b),
                                  a.send(),
                                  (q += 1)))))
                    : r
                    ? b.length &&
                      e[b] &&
                      setTimeout(l({ useEl: f[c], base: b, hash: h }), 0)
                    : void 0 === e[b]
                    ? (e[b] = !0)
                    : e[b].onload &&
                      (e[b].abort(), delete e[b].onload, (e[b] = !0));
            }
            f = "";
            q += 1;
            d();
        };
        var p = function () {
            window.removeEventListener("load", p, !1);
            l = setTimeout(n, 0);
        };
        "complete" !== document.readyState
            ? window.addEventListener("load", p, !1)
            : p();
    }
})();

/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */ !(function (
    a
) {
    "function" == typeof define && define.amd
        ? define(["jquery"], a)
        : "object" == typeof module && module.exports
        ? (module.exports = function (b, c) {
              return (
                  void 0 === c &&
                      (c =
                          "undefined" != typeof window
                              ? require("jquery")
                              : require("jquery")(b)),
                  a(c),
                  c
              );
          })
        : a(jQuery);
})(function (a) {
    var b = (function () {
            if (a && a.fn && a.fn.select2 && a.fn.select2.amd)
                var b = a.fn.select2.amd;
            var b;
            return (
                (function () {
                    if (!b || !b.requirejs) {
                        b ? (c = b) : (b = {});
                        var a, c, d;
                        !(function (b) {
                            function e(a, b) {
                                return v.call(a, b);
                            }
                            function f(a, b) {
                                var c,
                                    d,
                                    e,
                                    f,
                                    g,
                                    h,
                                    i,
                                    j,
                                    k,
                                    l,
                                    m,
                                    n,
                                    o = b && b.split("/"),
                                    p = t.map,
                                    q = (p && p["*"]) || {};
                                if (a) {
                                    for (
                                        a = a.split("/"),
                                            g = a.length - 1,
                                            t.nodeIdCompat &&
                                                x.test(a[g]) &&
                                                (a[g] = a[g].replace(x, "")),
                                            "." === a[0].charAt(0) &&
                                                o &&
                                                ((n = o.slice(0, o.length - 1)),
                                                (a = n.concat(a))),
                                            k = 0;
                                        k < a.length;
                                        k++
                                    )
                                        if ("." === (m = a[k]))
                                            a.splice(k, 1), (k -= 1);
                                        else if (".." === m) {
                                            if (
                                                0 === k ||
                                                (1 === k && ".." === a[2]) ||
                                                ".." === a[k - 1]
                                            )
                                                continue;
                                            k > 0 &&
                                                (a.splice(k - 1, 2), (k -= 2));
                                        }
                                    a = a.join("/");
                                }
                                if ((o || q) && p) {
                                    for (
                                        c = a.split("/"), k = c.length;
                                        k > 0;
                                        k -= 1
                                    ) {
                                        if (((d = c.slice(0, k).join("/")), o))
                                            for (l = o.length; l > 0; l -= 1)
                                                if (
                                                    (e =
                                                        p[
                                                            o
                                                                .slice(0, l)
                                                                .join("/")
                                                        ]) &&
                                                    (e = e[d])
                                                ) {
                                                    (f = e), (h = k);
                                                    break;
                                                }
                                        if (f) break;
                                        !i &&
                                            q &&
                                            q[d] &&
                                            ((i = q[d]), (j = k));
                                    }
                                    !f && i && ((f = i), (h = j)),
                                        f &&
                                            (c.splice(0, h, f),
                                            (a = c.join("/")));
                                }
                                return a;
                            }
                            function g(a, c) {
                                return function () {
                                    var d = w.call(arguments, 0);
                                    return (
                                        "string" != typeof d[0] &&
                                            1 === d.length &&
                                            d.push(null),
                                        o.apply(b, d.concat([a, c]))
                                    );
                                };
                            }
                            function h(a) {
                                return function (b) {
                                    return f(b, a);
                                };
                            }
                            function i(a) {
                                return function (b) {
                                    r[a] = b;
                                };
                            }
                            function j(a) {
                                if (e(s, a)) {
                                    var c = s[a];
                                    delete s[a], (u[a] = !0), n.apply(b, c);
                                }
                                if (!e(r, a) && !e(u, a))
                                    throw new Error("No " + a);
                                return r[a];
                            }
                            function k(a) {
                                var b,
                                    c = a ? a.indexOf("!") : -1;
                                return (
                                    c > -1 &&
                                        ((b = a.substring(0, c)),
                                        (a = a.substring(c + 1, a.length))),
                                    [b, a]
                                );
                            }
                            function l(a) {
                                return a ? k(a) : [];
                            }
                            function m(a) {
                                return function () {
                                    return (t && t.config && t.config[a]) || {};
                                };
                            }
                            var n,
                                o,
                                p,
                                q,
                                r = {},
                                s = {},
                                t = {},
                                u = {},
                                v = Object.prototype.hasOwnProperty,
                                w = [].slice,
                                x = /\.js$/;
                            (p = function (a, b) {
                                var c,
                                    d = k(a),
                                    e = d[0],
                                    g = b[1];
                                return (
                                    (a = d[1]),
                                    e && ((e = f(e, g)), (c = j(e))),
                                    e
                                        ? (a =
                                              c && c.normalize
                                                  ? c.normalize(a, h(g))
                                                  : f(a, g))
                                        : ((a = f(a, g)),
                                          (d = k(a)),
                                          (e = d[0]),
                                          (a = d[1]),
                                          e && (c = j(e))),
                                    {
                                        f: e ? e + "!" + a : a,
                                        n: a,
                                        pr: e,
                                        p: c,
                                    }
                                );
                            }),
                                (q = {
                                    require: function (a) {
                                        return g(a);
                                    },
                                    exports: function (a) {
                                        var b = r[a];
                                        return void 0 !== b ? b : (r[a] = {});
                                    },
                                    module: function (a) {
                                        return {
                                            id: a,
                                            uri: "",
                                            exports: r[a],
                                            config: m(a),
                                        };
                                    },
                                }),
                                (n = function (a, c, d, f) {
                                    var h,
                                        k,
                                        m,
                                        n,
                                        o,
                                        t,
                                        v,
                                        w = [],
                                        x = typeof d;
                                    if (
                                        ((f = f || a),
                                        (t = l(f)),
                                        "undefined" === x || "function" === x)
                                    ) {
                                        for (
                                            c =
                                                !c.length && d.length
                                                    ? [
                                                          "require",
                                                          "exports",
                                                          "module",
                                                      ]
                                                    : c,
                                                o = 0;
                                            o < c.length;
                                            o += 1
                                        )
                                            if (
                                                ((n = p(c[o], t)),
                                                "require" === (k = n.f))
                                            )
                                                w[o] = q.require(a);
                                            else if ("exports" === k)
                                                (w[o] = q.exports(a)), (v = !0);
                                            else if ("module" === k)
                                                h = w[o] = q.module(a);
                                            else if (
                                                e(r, k) ||
                                                e(s, k) ||
                                                e(u, k)
                                            )
                                                w[o] = j(k);
                                            else {
                                                if (!n.p)
                                                    throw new Error(
                                                        a + " missing " + k
                                                    );
                                                n.p.load(
                                                    n.n,
                                                    g(f, !0),
                                                    i(k),
                                                    {}
                                                ),
                                                    (w[o] = r[k]);
                                            }
                                        (m = d ? d.apply(r[a], w) : void 0),
                                            a &&
                                                (h &&
                                                h.exports !== b &&
                                                h.exports !== r[a]
                                                    ? (r[a] = h.exports)
                                                    : (m === b && v) ||
                                                      (r[a] = m));
                                    } else a && (r[a] = d);
                                }),
                                (a =
                                    c =
                                    o =
                                        function (a, c, d, e, f) {
                                            if ("string" == typeof a)
                                                return q[a]
                                                    ? q[a](c)
                                                    : j(p(a, l(c)).f);
                                            if (!a.splice) {
                                                if (
                                                    ((t = a),
                                                    t.deps &&
                                                        o(t.deps, t.callback),
                                                    !c)
                                                )
                                                    return;
                                                c.splice
                                                    ? ((a = c),
                                                      (c = d),
                                                      (d = null))
                                                    : (a = b);
                                            }
                                            return (
                                                (c = c || function () {}),
                                                "function" == typeof d &&
                                                    ((d = e), (e = f)),
                                                e
                                                    ? n(b, a, c, d)
                                                    : setTimeout(function () {
                                                          n(b, a, c, d);
                                                      }, 4),
                                                o
                                            );
                                        }),
                                (o.config = function (a) {
                                    return o(a);
                                }),
                                (a._defined = r),
                                (d = function (a, b, c) {
                                    if ("string" != typeof a)
                                        throw new Error(
                                            "See almond README: incorrect module build, no module name"
                                        );
                                    b.splice || ((c = b), (b = [])),
                                        e(r, a) ||
                                            e(s, a) ||
                                            (s[a] = [a, b, c]);
                                }),
                                (d.amd = { jQuery: !0 });
                        })(),
                            (b.requirejs = a),
                            (b.require = c),
                            (b.define = d);
                    }
                })(),
                b.define("almond", function () {}),
                b.define("jquery", [], function () {
                    var b = a || $;
                    return (
                        null == b &&
                            console &&
                            console.error &&
                            console.error(
                                "Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."
                            ),
                        b
                    );
                }),
                b.define("select2/utils", ["jquery"], function (a) {
                    function b(a) {
                        var b = a.prototype,
                            c = [];
                        for (var d in b) {
                            "function" == typeof b[d] &&
                                "constructor" !== d &&
                                c.push(d);
                        }
                        return c;
                    }
                    var c = {};
                    (c.Extend = function (a, b) {
                        function c() {
                            this.constructor = a;
                        }
                        var d = {}.hasOwnProperty;
                        for (var e in b) d.call(b, e) && (a[e] = b[e]);
                        return (
                            (c.prototype = b.prototype),
                            (a.prototype = new c()),
                            (a.__super__ = b.prototype),
                            a
                        );
                    }),
                        (c.Decorate = function (a, c) {
                            function d() {
                                var b = Array.prototype.unshift,
                                    d = c.prototype.constructor.length,
                                    e = a.prototype.constructor;
                                d > 0 &&
                                    (b.call(arguments, a.prototype.constructor),
                                    (e = c.prototype.constructor)),
                                    e.apply(this, arguments);
                            }
                            function e() {
                                this.constructor = d;
                            }
                            var f = b(c),
                                g = b(a);
                            (c.displayName = a.displayName),
                                (d.prototype = new e());
                            for (var h = 0; h < g.length; h++) {
                                var i = g[h];
                                d.prototype[i] = a.prototype[i];
                            }
                            for (
                                var j = function (a) {
                                        var b = function () {};
                                        (a in d.prototype) &&
                                            (b = d.prototype[a]);
                                        var e = c.prototype[a];
                                        return function () {
                                            return (
                                                Array.prototype.unshift.call(
                                                    arguments,
                                                    b
                                                ),
                                                e.apply(this, arguments)
                                            );
                                        };
                                    },
                                    k = 0;
                                k < f.length;
                                k++
                            ) {
                                var l = f[k];
                                d.prototype[l] = j(l);
                            }
                            return d;
                        });
                    var d = function () {
                        this.listeners = {};
                    };
                    return (
                        (d.prototype.on = function (a, b) {
                            (this.listeners = this.listeners || {}),
                                a in this.listeners
                                    ? this.listeners[a].push(b)
                                    : (this.listeners[a] = [b]);
                        }),
                        (d.prototype.trigger = function (a) {
                            var b = Array.prototype.slice,
                                c = b.call(arguments, 1);
                            (this.listeners = this.listeners || {}),
                                null == c && (c = []),
                                0 === c.length && c.push({}),
                                (c[0]._type = a),
                                a in this.listeners &&
                                    this.invoke(
                                        this.listeners[a],
                                        b.call(arguments, 1)
                                    ),
                                "*" in this.listeners &&
                                    this.invoke(this.listeners["*"], arguments);
                        }),
                        (d.prototype.invoke = function (a, b) {
                            for (var c = 0, d = a.length; c < d; c++)
                                a[c].apply(this, b);
                        }),
                        (c.Observable = d),
                        (c.generateChars = function (a) {
                            for (var b = "", c = 0; c < a; c++) {
                                b += Math.floor(36 * Math.random()).toString(
                                    36
                                );
                            }
                            return b;
                        }),
                        (c.bind = function (a, b) {
                            return function () {
                                a.apply(b, arguments);
                            };
                        }),
                        (c._convertData = function (a) {
                            for (var b in a) {
                                var c = b.split("-"),
                                    d = a;
                                if (1 !== c.length) {
                                    for (var e = 0; e < c.length; e++) {
                                        var f = c[e];
                                        (f =
                                            f.substring(0, 1).toLowerCase() +
                                            f.substring(1)),
                                            f in d || (d[f] = {}),
                                            e == c.length - 1 && (d[f] = a[b]),
                                            (d = d[f]);
                                    }
                                    delete a[b];
                                }
                            }
                            return a;
                        }),
                        (c.hasScroll = function (b, c) {
                            var d = a(c),
                                e = c.style.overflowX,
                                f = c.style.overflowY;
                            return (
                                (e !== f ||
                                    ("hidden" !== f && "visible" !== f)) &&
                                ("scroll" === e ||
                                    "scroll" === f ||
                                    d.innerHeight() < c.scrollHeight ||
                                    d.innerWidth() < c.scrollWidth)
                            );
                        }),
                        (c.escapeMarkup = function (a) {
                            var b = {
                                "\\": "&#92;",
                                "&": "&amp;",
                                "<": "&lt;",
                                ">": "&gt;",
                                '"': "&quot;",
                                "'": "&#39;",
                                "/": "&#47;",
                            };
                            return "string" != typeof a
                                ? a
                                : String(a).replace(
                                      /[&<>"'\/\\]/g,
                                      function (a) {
                                          return b[a];
                                      }
                                  );
                        }),
                        (c.appendMany = function (b, c) {
                            if ("1.7" === a.fn.jquery.substr(0, 3)) {
                                var d = a();
                                a.map(c, function (a) {
                                    d = d.add(a);
                                }),
                                    (c = d);
                            }
                            b.append(c);
                        }),
                        c
                    );
                }),
                b.define(
                    "select2/results",
                    ["jquery", "./utils"],
                    function (a, b) {
                        function c(a, b, d) {
                            (this.$element = a),
                                (this.data = d),
                                (this.options = b),
                                c.__super__.constructor.call(this);
                        }
                        return (
                            b.Extend(c, b.Observable),
                            (c.prototype.render = function () {
                                var b = a(
                                    '<ul class="select2-results__options" role="tree"></ul>'
                                );
                                return (
                                    this.options.get("multiple") &&
                                        b.attr("aria-multiselectable", "true"),
                                    (this.$results = b),
                                    b
                                );
                            }),
                            (c.prototype.clear = function () {
                                this.$results.empty();
                            }),
                            (c.prototype.displayMessage = function (b) {
                                var c = this.options.get("escapeMarkup");
                                this.clear(), this.hideLoading();
                                var d = a(
                                        '<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'
                                    ),
                                    e = this.options
                                        .get("translations")
                                        .get(b.message);
                                d.append(c(e(b.args))),
                                    (d[0].className +=
                                        " select2-results__message"),
                                    this.$results.append(d);
                            }),
                            (c.prototype.hideMessages = function () {
                                this.$results
                                    .find(".select2-results__message")
                                    .remove();
                            }),
                            (c.prototype.append = function (a) {
                                this.hideLoading();
                                var b = [];
                                if (null == a.results || 0 === a.results.length)
                                    return void (
                                        0 === this.$results.children().length &&
                                        this.trigger("results:message", {
                                            message: "noResults",
                                        })
                                    );
                                a.results = this.sort(a.results);
                                for (var c = 0; c < a.results.length; c++) {
                                    var d = a.results[c],
                                        e = this.option(d);
                                    b.push(e);
                                }
                                this.$results.append(b);
                            }),
                            (c.prototype.position = function (a, b) {
                                b.find(".select2-results").append(a);
                            }),
                            (c.prototype.sort = function (a) {
                                return this.options.get("sorter")(a);
                            }),
                            (c.prototype.highlightFirstItem = function () {
                                var a = this.$results.find(
                                        ".select2-results__option[aria-selected]"
                                    ),
                                    b = a.filter("[aria-selected=true]");
                                b.length > 0
                                    ? b.first().trigger("mouseenter")
                                    : a.first().trigger("mouseenter"),
                                    this.ensureHighlightVisible();
                            }),
                            (c.prototype.setClasses = function () {
                                var b = this;
                                this.data.current(function (c) {
                                    var d = a.map(c, function (a) {
                                        return a.id.toString();
                                    });
                                    b.$results
                                        .find(
                                            ".select2-results__option[aria-selected]"
                                        )
                                        .each(function () {
                                            var b = a(this),
                                                c = a.data(this, "data"),
                                                e = "" + c.id;
                                            (null != c.element &&
                                                c.element.selected) ||
                                            (null == c.element &&
                                                a.inArray(e, d) > -1)
                                                ? b.attr(
                                                      "aria-selected",
                                                      "true"
                                                  )
                                                : b.attr(
                                                      "aria-selected",
                                                      "false"
                                                  );
                                        });
                                });
                            }),
                            (c.prototype.showLoading = function (a) {
                                this.hideLoading();
                                var b = this.options
                                        .get("translations")
                                        .get("searching"),
                                    c = {
                                        disabled: !0,
                                        loading: !0,
                                        text: b(a),
                                    },
                                    d = this.option(c);
                                (d.className += " loading-results"),
                                    this.$results.prepend(d);
                            }),
                            (c.prototype.hideLoading = function () {
                                this.$results.find(".loading-results").remove();
                            }),
                            (c.prototype.option = function (b) {
                                var c = document.createElement("li");
                                c.className = "select2-results__option";
                                var d = {
                                    role: "treeitem",
                                    "aria-selected": "false",
                                };
                                b.disabled &&
                                    (delete d["aria-selected"],
                                    (d["aria-disabled"] = "true")),
                                    null == b.id && delete d["aria-selected"],
                                    null != b._resultId && (c.id = b._resultId),
                                    b.title && (c.title = b.title),
                                    b.children &&
                                        ((d.role = "group"),
                                        (d["aria-label"] = b.text),
                                        delete d["aria-selected"]);
                                for (var e in d) {
                                    var f = d[e];
                                    c.setAttribute(e, f);
                                }
                                if (b.children) {
                                    var g = a(c),
                                        h = document.createElement("strong");
                                    h.className = "select2-results__group";
                                    a(h);
                                    this.template(b, h);
                                    for (
                                        var i = [], j = 0;
                                        j < b.children.length;
                                        j++
                                    ) {
                                        var k = b.children[j],
                                            l = this.option(k);
                                        i.push(l);
                                    }
                                    var m = a("<ul></ul>", {
                                        class: "select2-results__options select2-results__options--nested",
                                    });
                                    m.append(i), g.append(h), g.append(m);
                                } else this.template(b, c);
                                return a.data(c, "data", b), c;
                            }),
                            (c.prototype.bind = function (b, c) {
                                var d = this,
                                    e = b.id + "-results";
                                this.$results.attr("id", e),
                                    b.on("results:all", function (a) {
                                        d.clear(),
                                            d.append(a.data),
                                            b.isOpen() &&
                                                (d.setClasses(),
                                                d.highlightFirstItem());
                                    }),
                                    b.on("results:append", function (a) {
                                        d.append(a.data),
                                            b.isOpen() && d.setClasses();
                                    }),
                                    b.on("query", function (a) {
                                        d.hideMessages(), d.showLoading(a);
                                    }),
                                    b.on("select", function () {
                                        b.isOpen() &&
                                            (d.setClasses(),
                                            d.highlightFirstItem());
                                    }),
                                    b.on("unselect", function () {
                                        b.isOpen() &&
                                            (d.setClasses(),
                                            d.highlightFirstItem());
                                    }),
                                    b.on("open", function () {
                                        d.$results.attr(
                                            "aria-expanded",
                                            "true"
                                        ),
                                            d.$results.attr(
                                                "aria-hidden",
                                                "false"
                                            ),
                                            d.setClasses(),
                                            d.ensureHighlightVisible();
                                    }),
                                    b.on("close", function () {
                                        d.$results.attr(
                                            "aria-expanded",
                                            "false"
                                        ),
                                            d.$results.attr(
                                                "aria-hidden",
                                                "true"
                                            ),
                                            d.$results.removeAttr(
                                                "aria-activedescendant"
                                            );
                                    }),
                                    b.on("results:toggle", function () {
                                        var a = d.getHighlightedResults();
                                        0 !== a.length && a.trigger("mouseup");
                                    }),
                                    b.on("results:select", function () {
                                        var a = d.getHighlightedResults();
                                        if (0 !== a.length) {
                                            var b = a.data("data");
                                            "true" == a.attr("aria-selected")
                                                ? d.trigger("close", {})
                                                : d.trigger("select", {
                                                      data: b,
                                                  });
                                        }
                                    }),
                                    b.on("results:previous", function () {
                                        var a = d.getHighlightedResults(),
                                            b =
                                                d.$results.find(
                                                    "[aria-selected]"
                                                ),
                                            c = b.index(a);
                                        if (0 !== c) {
                                            var e = c - 1;
                                            0 === a.length && (e = 0);
                                            var f = b.eq(e);
                                            f.trigger("mouseenter");
                                            var g = d.$results.offset().top,
                                                h = f.offset().top,
                                                i =
                                                    d.$results.scrollTop() +
                                                    (h - g);
                                            0 === e
                                                ? d.$results.scrollTop(0)
                                                : h - g < 0 &&
                                                  d.$results.scrollTop(i);
                                        }
                                    }),
                                    b.on("results:next", function () {
                                        var a = d.getHighlightedResults(),
                                            b =
                                                d.$results.find(
                                                    "[aria-selected]"
                                                ),
                                            c = b.index(a),
                                            e = c + 1;
                                        if (!(e >= b.length)) {
                                            var f = b.eq(e);
                                            f.trigger("mouseenter");
                                            var g =
                                                    d.$results.offset().top +
                                                    d.$results.outerHeight(!1),
                                                h =
                                                    f.offset().top +
                                                    f.outerHeight(!1),
                                                i =
                                                    d.$results.scrollTop() +
                                                    h -
                                                    g;
                                            0 === e
                                                ? d.$results.scrollTop(0)
                                                : h > g &&
                                                  d.$results.scrollTop(i);
                                        }
                                    }),
                                    b.on("results:focus", function (a) {
                                        a.element.addClass(
                                            "select2-results__option--highlighted"
                                        );
                                    }),
                                    b.on("results:message", function (a) {
                                        d.displayMessage(a);
                                    }),
                                    a.fn.mousewheel &&
                                        this.$results.on(
                                            "mousewheel",
                                            function (a) {
                                                var b = d.$results.scrollTop(),
                                                    c =
                                                        d.$results.get(0)
                                                            .scrollHeight -
                                                        b +
                                                        a.deltaY,
                                                    e =
                                                        a.deltaY > 0 &&
                                                        b - a.deltaY <= 0,
                                                    f =
                                                        a.deltaY < 0 &&
                                                        c <=
                                                            d.$results.height();
                                                e
                                                    ? (d.$results.scrollTop(0),
                                                      a.preventDefault(),
                                                      a.stopPropagation())
                                                    : f &&
                                                      (d.$results.scrollTop(
                                                          d.$results.get(0)
                                                              .scrollHeight -
                                                              d.$results.height()
                                                      ),
                                                      a.preventDefault(),
                                                      a.stopPropagation());
                                            }
                                        ),
                                    this.$results.on(
                                        "mouseup",
                                        ".select2-results__option[aria-selected]",
                                        function (b) {
                                            var c = a(this),
                                                e = c.data("data");
                                            if (
                                                "true" ===
                                                c.attr("aria-selected")
                                            )
                                                return void (d.options.get(
                                                    "multiple"
                                                )
                                                    ? d.trigger("unselect", {
                                                          originalEvent: b,
                                                          data: e,
                                                      })
                                                    : d.trigger("close", {}));
                                            d.trigger("select", {
                                                originalEvent: b,
                                                data: e,
                                            });
                                        }
                                    ),
                                    this.$results.on(
                                        "mouseenter",
                                        ".select2-results__option[aria-selected]",
                                        function (b) {
                                            var c = a(this).data("data");
                                            d
                                                .getHighlightedResults()
                                                .removeClass(
                                                    "select2-results__option--highlighted"
                                                ),
                                                d.trigger("results:focus", {
                                                    data: c,
                                                    element: a(this),
                                                });
                                        }
                                    );
                            }),
                            (c.prototype.getHighlightedResults = function () {
                                return this.$results.find(
                                    ".select2-results__option--highlighted"
                                );
                            }),
                            (c.prototype.destroy = function () {
                                this.$results.remove();
                            }),
                            (c.prototype.ensureHighlightVisible = function () {
                                var a = this.getHighlightedResults();
                                if (0 !== a.length) {
                                    var b =
                                            this.$results.find(
                                                "[aria-selected]"
                                            ),
                                        c = b.index(a),
                                        d = this.$results.offset().top,
                                        e = a.offset().top,
                                        f = this.$results.scrollTop() + (e - d),
                                        g = e - d;
                                    (f -= 2 * a.outerHeight(!1)),
                                        c <= 2
                                            ? this.$results.scrollTop(0)
                                            : (g >
                                                  this.$results.outerHeight() ||
                                                  g < 0) &&
                                              this.$results.scrollTop(f);
                                }
                            }),
                            (c.prototype.template = function (b, c) {
                                var d = this.options.get("templateResult"),
                                    e = this.options.get("escapeMarkup"),
                                    f = d(b, c);
                                null == f
                                    ? (c.style.display = "none")
                                    : "string" == typeof f
                                    ? (c.innerHTML = e(f))
                                    : a(c).append(f);
                            }),
                            c
                        );
                    }
                ),
                b.define("select2/keys", [], function () {
                    return {
                        BACKSPACE: 8,
                        TAB: 9,
                        ENTER: 13,
                        SHIFT: 16,
                        CTRL: 17,
                        ALT: 18,
                        ESC: 27,
                        SPACE: 32,
                        PAGE_UP: 33,
                        PAGE_DOWN: 34,
                        END: 35,
                        HOME: 36,
                        LEFT: 37,
                        UP: 38,
                        RIGHT: 39,
                        DOWN: 40,
                        DELETE: 46,
                    };
                }),
                b.define(
                    "select2/selection/base",
                    ["jquery", "../utils", "../keys"],
                    function (a, b, c) {
                        function d(a, b) {
                            (this.$element = a),
                                (this.options = b),
                                d.__super__.constructor.call(this);
                        }
                        return (
                            b.Extend(d, b.Observable),
                            (d.prototype.render = function () {
                                var b = a(
                                    '<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'
                                );
                                return (
                                    (this._tabindex = 0),
                                    null != this.$element.data("old-tabindex")
                                        ? (this._tabindex =
                                              this.$element.data(
                                                  "old-tabindex"
                                              ))
                                        : null !=
                                              this.$element.attr("tabindex") &&
                                          (this._tabindex =
                                              this.$element.attr("tabindex")),
                                    b.attr(
                                        "title",
                                        this.$element.attr("title")
                                    ),
                                    b.attr("tabindex", this._tabindex),
                                    (this.$selection = b),
                                    b
                                );
                            }),
                            (d.prototype.bind = function (a, b) {
                                var d = this,
                                    e = (a.id, a.id + "-results");
                                (this.container = a),
                                    this.$selection.on("focus", function (a) {
                                        d.trigger("focus", a);
                                    }),
                                    this.$selection.on("blur", function (a) {
                                        d._handleBlur(a);
                                    }),
                                    this.$selection.on("keydown", function (a) {
                                        d.trigger("keypress", a),
                                            a.which === c.SPACE &&
                                                a.preventDefault();
                                    }),
                                    a.on("results:focus", function (a) {
                                        d.$selection.attr(
                                            "aria-activedescendant",
                                            a.data._resultId
                                        );
                                    }),
                                    a.on("selection:update", function (a) {
                                        d.update(a.data);
                                    }),
                                    a.on("open", function () {
                                        d.$selection.attr(
                                            "aria-expanded",
                                            "true"
                                        ),
                                            d.$selection.attr("aria-owns", e),
                                            d._attachCloseHandler(a);
                                    }),
                                    a.on("close", function () {
                                        d.$selection.attr(
                                            "aria-expanded",
                                            "false"
                                        ),
                                            d.$selection.removeAttr(
                                                "aria-activedescendant"
                                            ),
                                            d.$selection.removeAttr(
                                                "aria-owns"
                                            ),
                                            d.$selection.focus(),
                                            d._detachCloseHandler(a);
                                    }),
                                    a.on("enable", function () {
                                        d.$selection.attr(
                                            "tabindex",
                                            d._tabindex
                                        );
                                    }),
                                    a.on("disable", function () {
                                        d.$selection.attr("tabindex", "-1");
                                    });
                            }),
                            (d.prototype._handleBlur = function (b) {
                                var c = this;
                                window.setTimeout(function () {
                                    document.activeElement == c.$selection[0] ||
                                        a.contains(
                                            c.$selection[0],
                                            document.activeElement
                                        ) ||
                                        c.trigger("blur", b);
                                }, 1);
                            }),
                            (d.prototype._attachCloseHandler = function (b) {
                                a(document.body).on(
                                    "mousedown.select2." + b.id,
                                    function (b) {
                                        var c = a(b.target),
                                            d = c.closest(".select2");
                                        a(
                                            ".select2.select2-container--open"
                                        ).each(function () {
                                            var b = a(this);
                                            this != d[0] &&
                                                b
                                                    .data("element")
                                                    .select2("close");
                                        });
                                    }
                                );
                            }),
                            (d.prototype._detachCloseHandler = function (b) {
                                a(document.body).off(
                                    "mousedown.select2." + b.id
                                );
                            }),
                            (d.prototype.position = function (a, b) {
                                b.find(".selection").append(a);
                            }),
                            (d.prototype.destroy = function () {
                                this._detachCloseHandler(this.container);
                            }),
                            (d.prototype.update = function (a) {
                                throw new Error(
                                    "The `update` method must be defined in child classes."
                                );
                            }),
                            d
                        );
                    }
                ),
                b.define(
                    "select2/selection/single",
                    ["jquery", "./base", "../utils", "../keys"],
                    function (a, b, c, d) {
                        function e() {
                            e.__super__.constructor.apply(this, arguments);
                        }
                        return (
                            c.Extend(e, b),
                            (e.prototype.render = function () {
                                var a = e.__super__.render.call(this);
                                return (
                                    a.addClass("select2-selection--single"),
                                    a.html(
                                        '<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'
                                    ),
                                    a
                                );
                            }),
                            (e.prototype.bind = function (a, b) {
                                var c = this;
                                e.__super__.bind.apply(this, arguments);
                                var d = a.id + "-container";
                                this.$selection
                                    .find(".select2-selection__rendered")
                                    .attr("id", d),
                                    this.$selection.attr("aria-labelledby", d),
                                    this.$selection.on(
                                        "mousedown",
                                        function (a) {
                                            1 === a.which &&
                                                c.trigger("toggle", {
                                                    originalEvent: a,
                                                });
                                        }
                                    ),
                                    this.$selection.on(
                                        "focus",
                                        function (a) {}
                                    ),
                                    this.$selection.on("blur", function (a) {}),
                                    a.on("focus", function (b) {
                                        a.isOpen() || c.$selection.focus();
                                    }),
                                    a.on("selection:update", function (a) {
                                        c.update(a.data);
                                    });
                            }),
                            (e.prototype.clear = function () {
                                this.$selection
                                    .find(".select2-selection__rendered")
                                    .empty();
                            }),
                            (e.prototype.display = function (a, b) {
                                var c = this.options.get("templateSelection");
                                return this.options.get("escapeMarkup")(
                                    c(a, b)
                                );
                            }),
                            (e.prototype.selectionContainer = function () {
                                return a("<span></span>");
                            }),
                            (e.prototype.update = function (a) {
                                if (0 === a.length) return void this.clear();
                                var b = a[0],
                                    c = this.$selection.find(
                                        ".select2-selection__rendered"
                                    ),
                                    d = this.display(b, c);
                                c.empty().append(d),
                                    c.prop("title", b.title || b.text);
                            }),
                            e
                        );
                    }
                ),
                b.define(
                    "select2/selection/multiple",
                    ["jquery", "./base", "../utils"],
                    function (a, b, c) {
                        function d(a, b) {
                            d.__super__.constructor.apply(this, arguments);
                        }
                        return (
                            c.Extend(d, b),
                            (d.prototype.render = function () {
                                var a = d.__super__.render.call(this);
                                return (
                                    a.addClass("select2-selection--multiple"),
                                    a.html(
                                        '<ul class="select2-selection__rendered"></ul>'
                                    ),
                                    a
                                );
                            }),
                            (d.prototype.bind = function (b, c) {
                                var e = this;
                                d.__super__.bind.apply(this, arguments),
                                    this.$selection.on("click", function (a) {
                                        e.trigger("toggle", {
                                            originalEvent: a,
                                        });
                                    }),
                                    this.$selection.on(
                                        "click",
                                        ".select2-selection__choice__remove",
                                        function (b) {
                                            if (!e.options.get("disabled")) {
                                                var c = a(this),
                                                    d = c.parent(),
                                                    f = d.data("data");
                                                e.trigger("unselect", {
                                                    originalEvent: b,
                                                    data: f,
                                                });
                                            }
                                        }
                                    );
                            }),
                            (d.prototype.clear = function () {
                                this.$selection
                                    .find(".select2-selection__rendered")
                                    .empty();
                            }),
                            (d.prototype.display = function (a, b) {
                                var c = this.options.get("templateSelection");
                                return this.options.get("escapeMarkup")(
                                    c(a, b)
                                );
                            }),
                            (d.prototype.selectionContainer = function () {
                                return a(
                                    '<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>'
                                );
                            }),
                            (d.prototype.update = function (a) {
                                if ((this.clear(), 0 !== a.length)) {
                                    for (var b = [], d = 0; d < a.length; d++) {
                                        var e = a[d],
                                            f = this.selectionContainer(),
                                            g = this.display(e, f);
                                        f.append(g),
                                            f.prop("title", e.title || e.text),
                                            f.data("data", e),
                                            b.push(f);
                                    }
                                    var h = this.$selection.find(
                                        ".select2-selection__rendered"
                                    );
                                    c.appendMany(h, b);
                                }
                            }),
                            d
                        );
                    }
                ),
                b.define(
                    "select2/selection/placeholder",
                    ["../utils"],
                    function (a) {
                        function b(a, b, c) {
                            (this.placeholder = this.normalizePlaceholder(
                                c.get("placeholder")
                            )),
                                a.call(this, b, c);
                        }
                        return (
                            (b.prototype.normalizePlaceholder = function (
                                a,
                                b
                            ) {
                                return (
                                    "string" == typeof b &&
                                        (b = { id: "", text: b }),
                                    b
                                );
                            }),
                            (b.prototype.createPlaceholder = function (a, b) {
                                var c = this.selectionContainer();
                                return (
                                    c.html(this.display(b)),
                                    c
                                        .addClass(
                                            "select2-selection__placeholder"
                                        )
                                        .removeClass(
                                            "select2-selection__choice"
                                        ),
                                    c
                                );
                            }),
                            (b.prototype.update = function (a, b) {
                                var c =
                                    1 == b.length &&
                                    b[0].id != this.placeholder.id;
                                if (b.length > 1 || c) return a.call(this, b);
                                this.clear();
                                var d = this.createPlaceholder(
                                    this.placeholder
                                );
                                this.$selection
                                    .find(".select2-selection__rendered")
                                    .append(d);
                            }),
                            b
                        );
                    }
                ),
                b.define(
                    "select2/selection/allowClear",
                    ["jquery", "../keys"],
                    function (a, b) {
                        function c() {}
                        return (
                            (c.prototype.bind = function (a, b, c) {
                                var d = this;
                                a.call(this, b, c),
                                    null == this.placeholder &&
                                        this.options.get("debug") &&
                                        window.console &&
                                        console.error &&
                                        console.error(
                                            "Select2: The `allowClear` option should be used in combination with the `placeholder` option."
                                        ),
                                    this.$selection.on(
                                        "mousedown",
                                        ".select2-selection__clear",
                                        function (a) {
                                            d._handleClear(a);
                                        }
                                    ),
                                    b.on("keypress", function (a) {
                                        d._handleKeyboardClear(a, b);
                                    });
                            }),
                            (c.prototype._handleClear = function (a, b) {
                                if (!this.options.get("disabled")) {
                                    var c = this.$selection.find(
                                        ".select2-selection__clear"
                                    );
                                    if (0 !== c.length) {
                                        b.stopPropagation();
                                        for (
                                            var d = c.data("data"), e = 0;
                                            e < d.length;
                                            e++
                                        ) {
                                            var f = { data: d[e] };
                                            if (
                                                (this.trigger("unselect", f),
                                                f.prevented)
                                            )
                                                return;
                                        }
                                        this.$element
                                            .val(this.placeholder.id)
                                            .trigger("change"),
                                            this.trigger("toggle", {});
                                    }
                                }
                            }),
                            (c.prototype._handleKeyboardClear = function (
                                a,
                                c,
                                d
                            ) {
                                d.isOpen() ||
                                    (c.which != b.DELETE &&
                                        c.which != b.BACKSPACE) ||
                                    this._handleClear(c);
                            }),
                            (c.prototype.update = function (b, c) {
                                if (
                                    (b.call(this, c),
                                    !(
                                        this.$selection.find(
                                            ".select2-selection__placeholder"
                                        ).length > 0 || 0 === c.length
                                    ))
                                ) {
                                    var d = a(
                                        '<span class="select2-selection__clear">&times;</span>'
                                    );
                                    d.data("data", c),
                                        this.$selection
                                            .find(
                                                ".select2-selection__rendered"
                                            )
                                            .prepend(d);
                                }
                            }),
                            c
                        );
                    }
                ),
                b.define(
                    "select2/selection/search",
                    ["jquery", "../utils", "../keys"],
                    function (a, b, c) {
                        function d(a, b, c) {
                            a.call(this, b, c);
                        }
                        return (
                            (d.prototype.render = function (b) {
                                var c = a(
                                    '<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>'
                                );
                                (this.$searchContainer = c),
                                    (this.$search = c.find("input"));
                                var d = b.call(this);
                                return this._transferTabIndex(), d;
                            }),
                            (d.prototype.bind = function (a, b, d) {
                                var e = this;
                                a.call(this, b, d),
                                    b.on("open", function () {
                                        e.$search.trigger("focus");
                                    }),
                                    b.on("close", function () {
                                        e.$search.val(""),
                                            e.$search.removeAttr(
                                                "aria-activedescendant"
                                            ),
                                            e.$search.trigger("focus");
                                    }),
                                    b.on("enable", function () {
                                        e.$search.prop("disabled", !1),
                                            e._transferTabIndex();
                                    }),
                                    b.on("disable", function () {
                                        e.$search.prop("disabled", !0);
                                    }),
                                    b.on("focus", function (a) {
                                        e.$search.trigger("focus");
                                    }),
                                    b.on("results:focus", function (a) {
                                        e.$search.attr(
                                            "aria-activedescendant",
                                            a.id
                                        );
                                    }),
                                    this.$selection.on(
                                        "focusin",
                                        ".select2-search--inline",
                                        function (a) {
                                            e.trigger("focus", a);
                                        }
                                    ),
                                    this.$selection.on(
                                        "focusout",
                                        ".select2-search--inline",
                                        function (a) {
                                            e._handleBlur(a);
                                        }
                                    ),
                                    this.$selection.on(
                                        "keydown",
                                        ".select2-search--inline",
                                        function (a) {
                                            if (
                                                (a.stopPropagation(),
                                                e.trigger("keypress", a),
                                                (e._keyUpPrevented =
                                                    a.isDefaultPrevented()),
                                                a.which === c.BACKSPACE &&
                                                    "" === e.$search.val())
                                            ) {
                                                var b = e.$searchContainer.prev(
                                                    ".select2-selection__choice"
                                                );
                                                if (b.length > 0) {
                                                    var d = b.data("data");
                                                    e.searchRemoveChoice(d),
                                                        a.preventDefault();
                                                }
                                            }
                                        }
                                    );
                                var f = document.documentMode,
                                    g = f && f <= 11;
                                this.$selection.on(
                                    "input.searchcheck",
                                    ".select2-search--inline",
                                    function (a) {
                                        if (g)
                                            return void e.$selection.off(
                                                "input.search input.searchcheck"
                                            );
                                        e.$selection.off("keyup.search");
                                    }
                                ),
                                    this.$selection.on(
                                        "keyup.search input.search",
                                        ".select2-search--inline",
                                        function (a) {
                                            if (g && "input" === a.type)
                                                return void e.$selection.off(
                                                    "input.search input.searchcheck"
                                                );
                                            var b = a.which;
                                            b != c.SHIFT &&
                                                b != c.CTRL &&
                                                b != c.ALT &&
                                                b != c.TAB &&
                                                e.handleSearch(a);
                                        }
                                    );
                            }),
                            (d.prototype._transferTabIndex = function (a) {
                                this.$search.attr(
                                    "tabindex",
                                    this.$selection.attr("tabindex")
                                ),
                                    this.$selection.attr("tabindex", "-1");
                            }),
                            (d.prototype.createPlaceholder = function (a, b) {
                                this.$search.attr("placeholder", b.text);
                            }),
                            (d.prototype.update = function (a, b) {
                                var c =
                                    this.$search[0] == document.activeElement;
                                this.$search.attr("placeholder", ""),
                                    a.call(this, b),
                                    this.$selection
                                        .find(".select2-selection__rendered")
                                        .append(this.$searchContainer),
                                    this.resizeSearch(),
                                    c && this.$search.focus();
                            }),
                            (d.prototype.handleSearch = function () {
                                if (
                                    (this.resizeSearch(), !this._keyUpPrevented)
                                ) {
                                    var a = this.$search.val();
                                    this.trigger("query", { term: a });
                                }
                                this._keyUpPrevented = !1;
                            }),
                            (d.prototype.searchRemoveChoice = function (a, b) {
                                this.trigger("unselect", { data: b }),
                                    this.$search.val(b.text),
                                    this.handleSearch();
                            }),
                            (d.prototype.resizeSearch = function () {
                                this.$search.css("width", "25px");
                                var a = "";
                                if ("" !== this.$search.attr("placeholder"))
                                    a = this.$selection
                                        .find(".select2-selection__rendered")
                                        .innerWidth();
                                else {
                                    a =
                                        0.75 * (this.$search.val().length + 1) +
                                        "em";
                                }
                                this.$search.css("width", a);
                            }),
                            d
                        );
                    }
                ),
                b.define(
                    "select2/selection/eventRelay",
                    ["jquery"],
                    function (a) {
                        function b() {}
                        return (
                            (b.prototype.bind = function (b, c, d) {
                                var e = this,
                                    f = [
                                        "open",
                                        "opening",
                                        "close",
                                        "closing",
                                        "select",
                                        "selecting",
                                        "unselect",
                                        "unselecting",
                                    ],
                                    g = [
                                        "opening",
                                        "closing",
                                        "selecting",
                                        "unselecting",
                                    ];
                                b.call(this, c, d),
                                    c.on("*", function (b, c) {
                                        if (-1 !== a.inArray(b, f)) {
                                            c = c || {};
                                            var d = a.Event("select2:" + b, {
                                                params: c,
                                            });
                                            e.$element.trigger(d),
                                                -1 !== a.inArray(b, g) &&
                                                    (c.prevented =
                                                        d.isDefaultPrevented());
                                        }
                                    });
                            }),
                            b
                        );
                    }
                ),
                b.define(
                    "select2/translation",
                    ["jquery", "require"],
                    function (a, b) {
                        function c(a) {
                            this.dict = a || {};
                        }
                        return (
                            (c.prototype.all = function () {
                                return this.dict;
                            }),
                            (c.prototype.get = function (a) {
                                return this.dict[a];
                            }),
                            (c.prototype.extend = function (b) {
                                this.dict = a.extend({}, b.all(), this.dict);
                            }),
                            (c._cache = {}),
                            (c.loadPath = function (a) {
                                if (!(a in c._cache)) {
                                    var d = b(a);
                                    c._cache[a] = d;
                                }
                                return new c(c._cache[a]);
                            }),
                            c
                        );
                    }
                ),
                b.define("select2/diacritics", [], function () {
                    return {
                        "в’¶": "A",
                        пјЎ: "A",
                        ГЂ: "A",
                        ГЃ: "A",
                        "Г‚": "A",
                        "бє¦": "A",
                        "бє¤": "A",
                        бєЄ: "A",
                        бєЁ: "A",
                        Гѓ: "A",
                        ДЂ: "A",
                        "Д‚": "A",
                        "бє°": "A",
                        "бє®": "A",
                        бєґ: "A",
                        бєІ: "A",
                        "И¦": "A",
                        "З ": "A",
                        "Г„": "A",
                        Зћ: "A",
                        бєў: "A",
                        "Г…": "A",
                        Зє: "A",
                        ЗЌ: "A",
                        ИЂ: "A",
                        "И‚": "A",
                        "бє ": "A",
                        "бє¬": "A",
                        "бє¶": "A",
                        бёЂ: "A",
                        "Д„": "A",
                        Иє: "A",
                        "в±Ї": "A",
                        књІ: "AA",
                        "Г†": "AE",
                        Зј: "AE",
                        Зў: "AE",
                        књґ: "AO",
                        "књ¶": "AU",
                        књё: "AV",
                        књє: "AV",
                        књј: "AY",
                        "в’·": "B",
                        пјў: "B",
                        "бё‚": "B",
                        "бё„": "B",
                        "бё†": "B",
                        Йѓ: "B",
                        "Ж‚": "B",
                        ЖЃ: "B",
                        "в’ё": "C",
                        пјЈ: "C",
                        "Д†": "C",
                        "Д€": "C",
                        ДЉ: "C",
                        ДЊ: "C",
                        "Г‡": "C",
                        "бё€": "C",
                        "Ж‡": "C",
                        "И»": "C",
                        књѕ: "C",
                        "в’№": "D",
                        "пј¤": "D",
                        бёЉ: "D",
                        ДЋ: "D",
                        бёЊ: "D",
                        бёђ: "D",
                        "бё’": "D",
                        бёЋ: "D",
                        Дђ: "D",
                        "Ж‹": "D",
                        ЖЉ: "D",
                        "Ж‰": "D",
                        "кќ№": "D",
                        "З±": "DZ",
                        "З„": "DZ",
                        ЗІ: "Dz",
                        "З…": "Dz",
                        "в’є": "E",
                        пјҐ: "E",
                        "Г€": "E",
                        "Г‰": "E",
                        ГЉ: "E",
                        "б»Ђ": "E",
                        бєѕ: "E",
                        "б»„": "E",
                        "б»‚": "E",
                        бєј: "E",
                        "Д’": "E",
                        "бё”": "E",
                        "бё–": "E",
                        "Д”": "E",
                        "Д–": "E",
                        "Г‹": "E",
                        бєє: "E",
                        Дљ: "E",
                        "И„": "E",
                        "И†": "E",
                        бєё: "E",
                        "б»†": "E",
                        ИЁ: "E",
                        бёњ: "E",
                        "Д": "E",
                        "бё": "E",
                        бёљ: "E",
                        Жђ: "E",
                        ЖЋ: "E",
                        "в’»": "F",
                        "пј¦": "F",
                        бёћ: "F",
                        "Ж‘": "F",
                        "кќ»": "F",
                        "в’ј": "G",
                        "пј§": "G",
                        Зґ: "G",
                        Дњ: "G",
                        "бё ": "G",
                        Дћ: "G",
                        "Д ": "G",
                        "З¦": "G",
                        Дў: "G",
                        "З¤": "G",
                        "Ж“": "G",
                        "кћ ": "G",
                        кќЅ: "G",
                        кќѕ: "G",
                        "в’Ѕ": "H",
                        пјЁ: "H",
                        "Д¤": "H",
                        бёў: "H",
                        "бё¦": "H",
                        Ић: "H",
                        "бё¤": "H",
                        бёЁ: "H",
                        бёЄ: "H",
                        "Д¦": "H",
                        "в±§": "H",
                        "в±µ": "H",
                        кћЌ: "H",
                        "в’ѕ": "I",
                        "пј©": "I",
                        ГЊ: "I",
                        ГЌ: "I",
                        ГЋ: "I",
                        ДЁ: "I",
                        ДЄ: "I",
                        "Д¬": "I",
                        "Д°": "I",
                        ГЏ: "I",
                        "бё®": "I",
                        "б»€": "I",
                        ЗЏ: "I",
                        "И€": "I",
                        ИЉ: "I",
                        "б»Љ": "I",
                        "Д®": "I",
                        "бё¬": "I",
                        "Ж—": "I",
                        "в’ї": "J",
                        пјЄ: "J",
                        Дґ: "J",
                        "Й€": "J",
                        "в“Ђ": "K",
                        "пј«": "K",
                        "бё°": "K",
                        ЗЁ: "K",
                        бёІ: "K",
                        "Д¶": "K",
                        бёґ: "K",
                        "Ж": "K",
                        "в±©": "K",
                        кќЂ: "K",
                        "кќ‚": "K",
                        "кќ„": "K",
                        кћў: "K",
                        "в“Ѓ": "L",
                        "пј¬": "L",
                        Дї: "L",
                        "Д№": "L",
                        ДЅ: "L",
                        "бё¶": "L",
                        бёё: "L",
                        "Д»": "L",
                        бёј: "L",
                        бёє: "L",
                        ЕЃ: "L",
                        ИЅ: "L",
                        "в±ў": "L",
                        "в± ": "L",
                        "кќ€": "L",
                        "кќ†": "L",
                        кћЂ: "L",
                        "З‡": "LJ",
                        "З€": "Lj",
                        "в“‚": "M",
                        "пј­": "M",
                        бёѕ: "M",
                        "б№Ђ": "M",
                        "б№‚": "M",
                        "в±®": "M",
                        Жњ: "M",
                        "в“ѓ": "N",
                        "пј®": "N",
                        Зё: "N",
                        Еѓ: "N",
                        "Г‘": "N",
                        "б№„": "N",
                        "Е‡": "N",
                        "б№†": "N",
                        "Е…": "N",
                        "б№Љ": "N",
                        "б№€": "N",
                        "И ": "N",
                        Жќ: "N",
                        кћђ: "N",
                        "кћ¤": "N",
                        ЗЉ: "NJ",
                        "З‹": "Nj",
                        "в“„": "O",
                        пјЇ: "O",
                        "Г’": "O",
                        "Г“": "O",
                        "Г”": "O",
                        "б»’": "O",
                        "б»ђ": "O",
                        "б»–": "O",
                        "б»”": "O",
                        "Г•": "O",
                        "б№Њ": "O",
                        "И¬": "O",
                        "б№Ћ": "O",
                        ЕЊ: "O",
                        "б№ђ": "O",
                        "б№’": "O",
                        ЕЋ: "O",
                        "И®": "O",
                        "И°": "O",
                        "Г–": "O",
                        ИЄ: "O",
                        "б»Ћ": "O",
                        Еђ: "O",
                        "З‘": "O",
                        ИЊ: "O",
                        ИЋ: "O",
                        "Ж ": "O",
                        "б»њ": "O",
                        "б»љ": "O",
                        "б» ": "O",
                        "б»ћ": "O",
                        "б»ў": "O",
                        "б»Њ": "O",
                        "б»": "O",
                        ЗЄ: "O",
                        "З¬": "O",
                        "Г": "O",
                        Зѕ: "O",
                        "Ж†": "O",
                        Жџ: "O",
                        кќЉ: "O",
                        кќЊ: "O",
                        Жў: "OI",
                        кќЋ: "OO",
                        Иў: "OU",
                        "в“…": "P",
                        "пј°": "P",
                        "б№”": "P",
                        "б№–": "P",
                        "Ж¤": "P",
                        "в±Ј": "P",
                        кќђ: "P",
                        "кќ’": "P",
                        "кќ”": "P",
                        "в“†": "Q",
                        "пј±": "Q",
                        "кќ–": "Q",
                        "кќ": "Q",
                        ЙЉ: "Q",
                        "в“‡": "R",
                        пјІ: "R",
                        "Е”": "R",
                        "б№": "R",
                        "Е": "R",
                        Иђ: "R",
                        "И’": "R",
                        "б№љ": "R",
                        "б№њ": "R",
                        "Е–": "R",
                        "б№ћ": "R",
                        ЙЊ: "R",
                        "в±¤": "R",
                        кќљ: "R",
                        "кћ¦": "R",
                        "кћ‚": "R",
                        "в“€": "S",
                        пјі: "S",
                        бєћ: "S",
                        Ељ: "S",
                        "б№¤": "S",
                        Ењ: "S",
                        "б№ ": "S",
                        "Е ": "S",
                        "б№¦": "S",
                        "б№ў": "S",
                        "б№Ё": "S",
                        "И": "S",
                        Ећ: "S",
                        "в±ѕ": "S",
                        кћЁ: "S",
                        "кћ„": "S",
                        "в“‰": "T",
                        пјґ: "T",
                        "б№Є": "T",
                        "Е¤": "T",
                        "б№¬": "T",
                        Иљ: "T",
                        Еў: "T",
                        "б№°": "T",
                        "б№®": "T",
                        "Е¦": "T",
                        "Ж¬": "T",
                        "Ж®": "T",
                        Иѕ: "T",
                        "кћ†": "T",
                        књЁ: "TZ",
                        "в“Љ": "U",
                        пјµ: "U",
                        "Г™": "U",
                        Гљ: "U",
                        "Г›": "U",
                        ЕЁ: "U",
                        "б№ё": "U",
                        ЕЄ: "U",
                        "б№є": "U",
                        "Е¬": "U",
                        Гњ: "U",
                        "З›": "U",
                        "З—": "U",
                        "З•": "U",
                        "З™": "U",
                        "б»¦": "U",
                        "Е®": "U",
                        "Е°": "U",
                        "З“": "U",
                        "И”": "U",
                        "И–": "U",
                        ЖЇ: "U",
                        "б»Є": "U",
                        "б»Ё": "U",
                        "б»®": "U",
                        "б»¬": "U",
                        "б»°": "U",
                        "б»¤": "U",
                        "б№І": "U",
                        ЕІ: "U",
                        "б№¶": "U",
                        "б№ґ": "U",
                        "Й„": "U",
                        "в“‹": "V",
                        "пј¶": "V",
                        "б№ј": "V",
                        "б№ѕ": "V",
                        ЖІ: "V",
                        кќћ: "V",
                        "Й…": "V",
                        "кќ ": "VY",
                        "в“Њ": "W",
                        "пј·": "W",
                        бєЂ: "W",
                        "бє‚": "W",
                        Еґ: "W",
                        "бє†": "W",
                        "бє„": "W",
                        "бє€": "W",
                        "в±І": "W",
                        "в“Ќ": "X",
                        пјё: "X",
                        бєЉ: "X",
                        бєЊ: "X",
                        "в“Ћ": "Y",
                        "пј№": "Y",
                        "б»І": "Y",
                        Гќ: "Y",
                        "Е¶": "Y",
                        "б»ё": "Y",
                        ИІ: "Y",
                        бєЋ: "Y",
                        Её: "Y",
                        "б»¶": "Y",
                        "б»ґ": "Y",
                        Жі: "Y",
                        ЙЋ: "Y",
                        "б»ѕ": "Y",
                        "в“Џ": "Z",
                        пјє: "Z",
                        "Е№": "Z",
                        бєђ: "Z",
                        "Е»": "Z",
                        ЕЅ: "Z",
                        "бє’": "Z",
                        "бє”": "Z",
                        Жµ: "Z",
                        "И¤": "Z",
                        "в±ї": "Z",
                        "в±«": "Z",
                        кќў: "Z",
                        "в“ђ": "a",
                        пЅЃ: "a",
                        бєљ: "a",
                        "Г ": "a",
                        ГЎ: "a",
                        Гў: "a",
                        "бє§": "a",
                        бєҐ: "a",
                        "бє«": "a",
                        "бє©": "a",
                        ГЈ: "a",
                        ДЃ: "a",
                        Дѓ: "a",
                        "бє±": "a",
                        бєЇ: "a",
                        бєµ: "a",
                        бєі: "a",
                        "И§": "a",
                        ЗЎ: "a",
                        "Г¤": "a",
                        Зџ: "a",
                        бєЈ: "a",
                        ГҐ: "a",
                        "З»": "a",
                        ЗЋ: "a",
                        ИЃ: "a",
                        Иѓ: "a",
                        бєЎ: "a",
                        "бє­": "a",
                        "бє·": "a",
                        бёЃ: "a",
                        "Д…": "a",
                        "в±Ґ": "a",
                        Йђ: "a",
                        књі: "aa",
                        "Г¦": "ae",
                        ЗЅ: "ae",
                        ЗЈ: "ae",
                        књµ: "ao",
                        "књ·": "au",
                        "књ№": "av",
                        "књ»": "av",
                        књЅ: "ay",
                        "в“‘": "b",
                        "пЅ‚": "b",
                        бёѓ: "b",
                        "бё…": "b",
                        "бё‡": "b",
                        ЖЂ: "b",
                        Жѓ: "b",
                        "Й“": "b",
                        "в“’": "c",
                        пЅѓ: "c",
                        "Д‡": "c",
                        "Д‰": "c",
                        "Д‹": "c",
                        ДЌ: "c",
                        "Г§": "c",
                        "бё‰": "c",
                        "Ж€": "c",
                        Иј: "c",
                        књї: "c",
                        "в†„": "c",
                        "в““": "d",
                        "пЅ„": "d",
                        "бё‹": "d",
                        ДЏ: "d",
                        бёЌ: "d",
                        "бё‘": "d",
                        "бё“": "d",
                        бёЏ: "d",
                        "Д‘": "d",
                        ЖЊ: "d",
                        "Й–": "d",
                        "Й—": "d",
                        кќє: "d",
                        Зі: "dz",
                        "З†": "dz",
                        "в“”": "e",
                        "пЅ…": "e",
                        ГЁ: "e",
                        "Г©": "e",
                        ГЄ: "e",
                        "б»Ѓ": "e",
                        бєї: "e",
                        "б»…": "e",
                        "б»ѓ": "e",
                        бєЅ: "e",
                        "Д“": "e",
                        "бё•": "e",
                        "бё—": "e",
                        "Д•": "e",
                        "Д—": "e",
                        "Г«": "e",
                        "бє»": "e",
                        "Д›": "e",
                        "И…": "e",
                        "И‡": "e",
                        "бє№": "e",
                        "б»‡": "e",
                        "И©": "e",
                        бёќ: "e",
                        "Д™": "e",
                        "бё™": "e",
                        "бё›": "e",
                        "Й‡": "e",
                        "Й›": "e",
                        Зќ: "e",
                        "в“•": "f",
                        "пЅ†": "f",
                        бёџ: "f",
                        "Ж’": "f",
                        кќј: "f",
                        "в“–": "g",
                        "пЅ‡": "g",
                        Зµ: "g",
                        Дќ: "g",
                        бёЎ: "g",
                        Дџ: "g",
                        ДЎ: "g",
                        "З§": "g",
                        ДЈ: "g",
                        ЗҐ: "g",
                        "Й ": "g",
                        кћЎ: "g",
                        "бµ№": "g",
                        кќї: "g",
                        "в“—": "h",
                        "пЅ€": "h",
                        ДҐ: "h",
                        бёЈ: "h",
                        "бё§": "h",
                        Иџ: "h",
                        бёҐ: "h",
                        "бё©": "h",
                        "бё«": "h",
                        "бє–": "h",
                        "Д§": "h",
                        "в±Ё": "h",
                        "в±¶": "h",
                        ЙҐ: "h",
                        "Ж•": "hv",
                        "в“": "i",
                        "пЅ‰": "i",
                        "Г¬": "i",
                        "Г­": "i",
                        "Г®": "i",
                        "Д©": "i",
                        "Д«": "i",
                        "Д­": "i",
                        ГЇ: "i",
                        бёЇ: "i",
                        "б»‰": "i",
                        Зђ: "i",
                        "И‰": "i",
                        "И‹": "i",
                        "б»‹": "i",
                        ДЇ: "i",
                        "бё­": "i",
                        ЙЁ: "i",
                        "Д±": "i",
                        "в“™": "j",
                        пЅЉ: "j",
                        Дµ: "j",
                        "З°": "j",
                        "Й‰": "j",
                        "в“љ": "k",
                        "пЅ‹": "k",
                        "бё±": "k",
                        "З©": "k",
                        бёі: "k",
                        "Д·": "k",
                        бёµ: "k",
                        "Ж™": "k",
                        "в±Є": "k",
                        кќЃ: "k",
                        кќѓ: "k",
                        "кќ…": "k",
                        кћЈ: "k",
                        "в“›": "l",
                        пЅЊ: "l",
                        ЕЂ: "l",
                        Дє: "l",
                        Дѕ: "l",
                        "бё·": "l",
                        "бё№": "l",
                        Дј: "l",
                        бёЅ: "l",
                        "бё»": "l",
                        Еї: "l",
                        "Е‚": "l",
                        Жљ: "l",
                        "Й«": "l",
                        "в±Ў": "l",
                        "кќ‰": "l",
                        кћЃ: "l",
                        "кќ‡": "l",
                        "З‰": "lj",
                        "в“њ": "m",
                        пЅЌ: "m",
                        бёї: "m",
                        "б№Ѓ": "m",
                        "б№ѓ": "m",
                        "Й±": "m",
                        ЙЇ: "m",
                        "в“ќ": "n",
                        пЅЋ: "n",
                        "З№": "n",
                        "Е„": "n",
                        "Г±": "n",
                        "б№…": "n",
                        "Е€": "n",
                        "б№‡": "n",
                        "Е†": "n",
                        "б№‹": "n",
                        "б№‰": "n",
                        Жћ: "n",
                        ЙІ: "n",
                        "Е‰": "n",
                        "кћ‘": "n",
                        кћҐ: "n",
                        ЗЊ: "nj",
                        "в“ћ": "o",
                        пЅЏ: "o",
                        ГІ: "o",
                        Гі: "o",
                        Гґ: "o",
                        "б»“": "o",
                        "б»‘": "o",
                        "б»—": "o",
                        "б»•": "o",
                        Гµ: "o",
                        "б№Ќ": "o",
                        "И­": "o",
                        "б№Џ": "o",
                        ЕЌ: "o",
                        "б№‘": "o",
                        "б№“": "o",
                        ЕЏ: "o",
                        ИЇ: "o",
                        "И±": "o",
                        "Г¶": "o",
                        "И«": "o",
                        "б»Џ": "o",
                        "Е‘": "o",
                        "З’": "o",
                        ИЌ: "o",
                        ИЏ: "o",
                        ЖЎ: "o",
                        "б»ќ": "o",
                        "б»›": "o",
                        "б»Ў": "o",
                        "б»џ": "o",
                        "б»Ј": "o",
                        "б»Ќ": "o",
                        "б»™": "o",
                        "З«": "o",
                        "З­": "o",
                        Гё: "o",
                        Зї: "o",
                        "Й”": "o",
                        "кќ‹": "o",
                        кќЌ: "o",
                        Йµ: "o",
                        ЖЈ: "oi",
                        ИЈ: "ou",
                        кќЏ: "oo",
                        "в“џ": "p",
                        пЅђ: "p",
                        "б№•": "p",
                        "б№—": "p",
                        ЖҐ: "p",
                        бµЅ: "p",
                        "кќ‘": "p",
                        "кќ“": "p",
                        "кќ•": "p",
                        "в“ ": "q",
                        "пЅ‘": "q",
                        "Й‹": "q",
                        "кќ—": "q",
                        "кќ™": "q",
                        "в“Ў": "r",
                        "пЅ’": "r",
                        "Е•": "r",
                        "б№™": "r",
                        "Е™": "r",
                        "И‘": "r",
                        "И“": "r",
                        "б№›": "r",
                        "б№ќ": "r",
                        "Е—": "r",
                        "б№џ": "r",
                        ЙЌ: "r",
                        ЙЅ: "r",
                        "кќ›": "r",
                        "кћ§": "r",
                        кћѓ: "r",
                        "в“ў": "s",
                        "пЅ“": "s",
                        Гџ: "s",
                        "Е›": "s",
                        "б№Ґ": "s",
                        Еќ: "s",
                        "б№Ў": "s",
                        ЕЎ: "s",
                        "б№§": "s",
                        "б№Ј": "s",
                        "б№©": "s",
                        "И™": "s",
                        Еџ: "s",
                        Иї: "s",
                        "кћ©": "s",
                        "кћ…": "s",
                        "бє›": "s",
                        "в“Ј": "t",
                        "пЅ”": "t",
                        "б№«": "t",
                        "бє—": "t",
                        ЕҐ: "t",
                        "б№­": "t",
                        "И›": "t",
                        ЕЈ: "t",
                        "б№±": "t",
                        "б№Ї": "t",
                        "Е§": "t",
                        "Ж­": "t",
                        "К€": "t",
                        "в±¦": "t",
                        "кћ‡": "t",
                        "књ©": "tz",
                        "в“¤": "u",
                        "пЅ•": "u",
                        "Г№": "u",
                        Гє: "u",
                        "Г»": "u",
                        "Е©": "u",
                        "б№№": "u",
                        "Е«": "u",
                        "б№»": "u",
                        "Е­": "u",
                        Гј: "u",
                        Зњ: "u",
                        "З": "u",
                        "З–": "u",
                        Зљ: "u",
                        "б»§": "u",
                        ЕЇ: "u",
                        "Е±": "u",
                        "З”": "u",
                        "И•": "u",
                        "И—": "u",
                        "Ж°": "u",
                        "б»«": "u",
                        "б»©": "u",
                        "б»Ї": "u",
                        "б»­": "u",
                        "б»±": "u",
                        "б»Ґ": "u",
                        "б№і": "u",
                        Еі: "u",
                        "б№·": "u",
                        "б№µ": "u",
                        "К‰": "u",
                        "в“Ґ": "v",
                        "пЅ–": "v",
                        "б№Ѕ": "v",
                        "б№ї": "v",
                        "К‹": "v",
                        кќџ: "v",
                        КЊ: "v",
                        кќЎ: "vy",
                        "в“¦": "w",
                        "пЅ—": "w",
                        бєЃ: "w",
                        бєѓ: "w",
                        Еµ: "w",
                        "бє‡": "w",
                        "бє…": "w",
                        "бє": "w",
                        "бє‰": "w",
                        "в±і": "w",
                        "в“§": "x",
                        "пЅ": "x",
                        "бє‹": "x",
                        бєЌ: "x",
                        "в“Ё": "y",
                        "пЅ™": "y",
                        "б»і": "y",
                        ГЅ: "y",
                        "Е·": "y",
                        "б»№": "y",
                        Иі: "y",
                        бєЏ: "y",
                        Гї: "y",
                        "б»·": "y",
                        "бє™": "y",
                        "б»µ": "y",
                        Жґ: "y",
                        ЙЏ: "y",
                        "б»ї": "y",
                        "в“©": "z",
                        пЅљ: "z",
                        Еє: "z",
                        "бє‘": "z",
                        Еј: "z",
                        Еѕ: "z",
                        "бє“": "z",
                        "бє•": "z",
                        "Ж¶": "z",
                        ИҐ: "z",
                        ЙЂ: "z",
                        "в±¬": "z",
                        кќЈ: "z",
                        "О†": "О‘",
                        "О€": "О•",
                        "О‰": "О—",
                        ОЉ: "О™",
                        ОЄ: "О™",
                        ОЊ: "Оџ",
                        ОЋ: "ОҐ",
                        "О«": "ОҐ",
                        ОЏ: "О©",
                        "О¬": "О±",
                        "О­": "Оµ",
                        "О®": "О·",
                        ОЇ: "О№",
                        ПЉ: "О№",
                        Ођ: "О№",
                        ПЊ: "Ої",
                        ПЌ: "П…",
                        "П‹": "П…",
                        "О°": "П…",
                        "П‰": "П‰",
                        "П‚": "Пѓ",
                    };
                }),
                b.define("select2/data/base", ["../utils"], function (a) {
                    function b(a, c) {
                        b.__super__.constructor.call(this);
                    }
                    return (
                        a.Extend(b, a.Observable),
                        (b.prototype.current = function (a) {
                            throw new Error(
                                "The `current` method must be defined in child classes."
                            );
                        }),
                        (b.prototype.query = function (a, b) {
                            throw new Error(
                                "The `query` method must be defined in child classes."
                            );
                        }),
                        (b.prototype.bind = function (a, b) {}),
                        (b.prototype.destroy = function () {}),
                        (b.prototype.generateResultId = function (b, c) {
                            var d = b.id + "-result-";
                            return (
                                (d += a.generateChars(4)),
                                null != c.id
                                    ? (d += "-" + c.id.toString())
                                    : (d += "-" + a.generateChars(4)),
                                d
                            );
                        }),
                        b
                    );
                }),
                b.define(
                    "select2/data/select",
                    ["./base", "../utils", "jquery"],
                    function (a, b, c) {
                        function d(a, b) {
                            (this.$element = a),
                                (this.options = b),
                                d.__super__.constructor.call(this);
                        }
                        return (
                            b.Extend(d, a),
                            (d.prototype.current = function (a) {
                                var b = [],
                                    d = this;
                                this.$element
                                    .find(":selected")
                                    .each(function () {
                                        var a = c(this),
                                            e = d.item(a);
                                        b.push(e);
                                    }),
                                    a(b);
                            }),
                            (d.prototype.select = function (a) {
                                var b = this;
                                if (
                                    ((a.selected = !0),
                                    c(a.element).is("option"))
                                )
                                    return (
                                        (a.element.selected = !0),
                                        void this.$element.trigger("change")
                                    );
                                if (this.$element.prop("multiple"))
                                    this.current(function (d) {
                                        var e = [];
                                        (a = [a]), a.push.apply(a, d);
                                        for (var f = 0; f < a.length; f++) {
                                            var g = a[f].id;
                                            -1 === c.inArray(g, e) && e.push(g);
                                        }
                                        b.$element.val(e),
                                            b.$element.trigger("change");
                                    });
                                else {
                                    var d = a.id;
                                    this.$element.val(d),
                                        this.$element.trigger("change");
                                }
                            }),
                            (d.prototype.unselect = function (a) {
                                var b = this;
                                if (this.$element.prop("multiple")) {
                                    if (
                                        ((a.selected = !1),
                                        c(a.element).is("option"))
                                    )
                                        return (
                                            (a.element.selected = !1),
                                            void this.$element.trigger("change")
                                        );
                                    this.current(function (d) {
                                        for (
                                            var e = [], f = 0;
                                            f < d.length;
                                            f++
                                        ) {
                                            var g = d[f].id;
                                            g !== a.id &&
                                                -1 === c.inArray(g, e) &&
                                                e.push(g);
                                        }
                                        b.$element.val(e),
                                            b.$element.trigger("change");
                                    });
                                }
                            }),
                            (d.prototype.bind = function (a, b) {
                                var c = this;
                                (this.container = a),
                                    a.on("select", function (a) {
                                        c.select(a.data);
                                    }),
                                    a.on("unselect", function (a) {
                                        c.unselect(a.data);
                                    });
                            }),
                            (d.prototype.destroy = function () {
                                this.$element.find("*").each(function () {
                                    c.removeData(this, "data");
                                });
                            }),
                            (d.prototype.query = function (a, b) {
                                var d = [],
                                    e = this;
                                this.$element.children().each(function () {
                                    var b = c(this);
                                    if (b.is("option") || b.is("optgroup")) {
                                        var f = e.item(b),
                                            g = e.matches(a, f);
                                        null !== g && d.push(g);
                                    }
                                }),
                                    b({ results: d });
                            }),
                            (d.prototype.addOptions = function (a) {
                                b.appendMany(this.$element, a);
                            }),
                            (d.prototype.option = function (a) {
                                var b;
                                a.children
                                    ? ((b = document.createElement("optgroup")),
                                      (b.label = a.text))
                                    : ((b = document.createElement("option")),
                                      void 0 !== b.textContent
                                          ? (b.textContent = a.text)
                                          : (b.innerText = a.text)),
                                    void 0 !== a.id && (b.value = a.id),
                                    a.disabled && (b.disabled = !0),
                                    a.selected && (b.selected = !0),
                                    a.title && (b.title = a.title);
                                var d = c(b),
                                    e = this._normalizeItem(a);
                                return (e.element = b), c.data(b, "data", e), d;
                            }),
                            (d.prototype.item = function (a) {
                                var b = {};
                                if (null != (b = c.data(a[0], "data")))
                                    return b;
                                if (a.is("option"))
                                    b = {
                                        id: a.val(),
                                        text: a.text(),
                                        disabled: a.prop("disabled"),
                                        selected: a.prop("selected"),
                                        title: a.prop("title"),
                                    };
                                else if (a.is("optgroup")) {
                                    b = {
                                        text: a.prop("label"),
                                        children: [],
                                        title: a.prop("title"),
                                    };
                                    for (
                                        var d = a.children("option"),
                                            e = [],
                                            f = 0;
                                        f < d.length;
                                        f++
                                    ) {
                                        var g = c(d[f]),
                                            h = this.item(g);
                                        e.push(h);
                                    }
                                    b.children = e;
                                }
                                return (
                                    (b = this._normalizeItem(b)),
                                    (b.element = a[0]),
                                    c.data(a[0], "data", b),
                                    b
                                );
                            }),
                            (d.prototype._normalizeItem = function (a) {
                                c.isPlainObject(a) || (a = { id: a, text: a }),
                                    (a = c.extend({}, { text: "" }, a));
                                var b = { selected: !1, disabled: !1 };
                                return (
                                    null != a.id && (a.id = a.id.toString()),
                                    null != a.text &&
                                        (a.text = a.text.toString()),
                                    null == a._resultId &&
                                        a.id &&
                                        null != this.container &&
                                        (a._resultId = this.generateResultId(
                                            this.container,
                                            a
                                        )),
                                    c.extend({}, b, a)
                                );
                            }),
                            (d.prototype.matches = function (a, b) {
                                return this.options.get("matcher")(a, b);
                            }),
                            d
                        );
                    }
                ),
                b.define(
                    "select2/data/array",
                    ["./select", "../utils", "jquery"],
                    function (a, b, c) {
                        function d(a, b) {
                            var c = b.get("data") || [];
                            d.__super__.constructor.call(this, a, b),
                                this.addOptions(this.convertToOptions(c));
                        }
                        return (
                            b.Extend(d, a),
                            (d.prototype.select = function (a) {
                                var b = this.$element
                                    .find("option")
                                    .filter(function (b, c) {
                                        return c.value == a.id.toString();
                                    });
                                0 === b.length &&
                                    ((b = this.option(a)), this.addOptions(b)),
                                    d.__super__.select.call(this, a);
                            }),
                            (d.prototype.convertToOptions = function (a) {
                                function d(a) {
                                    return function () {
                                        return c(this).val() == a.id;
                                    };
                                }
                                for (
                                    var e = this,
                                        f = this.$element.find("option"),
                                        g = f
                                            .map(function () {
                                                return e.item(c(this)).id;
                                            })
                                            .get(),
                                        h = [],
                                        i = 0;
                                    i < a.length;
                                    i++
                                ) {
                                    var j = this._normalizeItem(a[i]);
                                    if (c.inArray(j.id, g) >= 0) {
                                        var k = f.filter(d(j)),
                                            l = this.item(k),
                                            m = c.extend(!0, {}, j, l),
                                            n = this.option(m);
                                        k.replaceWith(n);
                                    } else {
                                        var o = this.option(j);
                                        if (j.children) {
                                            var p = this.convertToOptions(
                                                j.children
                                            );
                                            b.appendMany(o, p);
                                        }
                                        h.push(o);
                                    }
                                }
                                return h;
                            }),
                            d
                        );
                    }
                ),
                b.define(
                    "select2/data/ajax",
                    ["./array", "../utils", "jquery"],
                    function (a, b, c) {
                        function d(a, b) {
                            (this.ajaxOptions = this._applyDefaults(
                                b.get("ajax")
                            )),
                                null != this.ajaxOptions.processResults &&
                                    (this.processResults =
                                        this.ajaxOptions.processResults),
                                d.__super__.constructor.call(this, a, b);
                        }
                        return (
                            b.Extend(d, a),
                            (d.prototype._applyDefaults = function (a) {
                                var b = {
                                    data: function (a) {
                                        return c.extend({}, a, { q: a.term });
                                    },
                                    transport: function (a, b, d) {
                                        var e = c.ajax(a);
                                        return e.then(b), e.fail(d), e;
                                    },
                                };
                                return c.extend({}, b, a, !0);
                            }),
                            (d.prototype.processResults = function (a) {
                                return a;
                            }),
                            (d.prototype.query = function (a, b) {
                                function d() {
                                    var d = f.transport(
                                        f,
                                        function (d) {
                                            var f = e.processResults(d, a);
                                            e.options.get("debug") &&
                                                window.console &&
                                                console.error &&
                                                ((f &&
                                                    f.results &&
                                                    c.isArray(f.results)) ||
                                                    console.error(
                                                        "Select2: The AJAX results did not return an array in the `results` key of the response."
                                                    )),
                                                b(f);
                                        },
                                        function () {
                                            (d.status && "0" === d.status) ||
                                                e.trigger("results:message", {
                                                    message: "errorLoading",
                                                });
                                        }
                                    );
                                    e._request = d;
                                }
                                var e = this;
                                null != this._request &&
                                    (c.isFunction(this._request.abort) &&
                                        this._request.abort(),
                                    (this._request = null));
                                var f = c.extend(
                                    { type: "GET" },
                                    this.ajaxOptions
                                );
                                "function" == typeof f.url &&
                                    (f.url = f.url.call(this.$element, a)),
                                    "function" == typeof f.data &&
                                        (f.data = f.data.call(
                                            this.$element,
                                            a
                                        )),
                                    this.ajaxOptions.delay && null != a.term
                                        ? (this._queryTimeout &&
                                              window.clearTimeout(
                                                  this._queryTimeout
                                              ),
                                          (this._queryTimeout =
                                              window.setTimeout(
                                                  d,
                                                  this.ajaxOptions.delay
                                              )))
                                        : d();
                            }),
                            d
                        );
                    }
                ),
                b.define("select2/data/tags", ["jquery"], function (a) {
                    function b(b, c, d) {
                        var e = d.get("tags"),
                            f = d.get("createTag");
                        void 0 !== f && (this.createTag = f);
                        var g = d.get("insertTag");
                        if (
                            (void 0 !== g && (this.insertTag = g),
                            b.call(this, c, d),
                            a.isArray(e))
                        )
                            for (var h = 0; h < e.length; h++) {
                                var i = e[h],
                                    j = this._normalizeItem(i),
                                    k = this.option(j);
                                this.$element.append(k);
                            }
                    }
                    return (
                        (b.prototype.query = function (a, b, c) {
                            function d(a, f) {
                                for (
                                    var g = a.results, h = 0;
                                    h < g.length;
                                    h++
                                ) {
                                    var i = g[h],
                                        j =
                                            null != i.children &&
                                            !d({ results: i.children }, !0);
                                    if (
                                        (i.text || "").toUpperCase() ===
                                            (b.term || "").toUpperCase() ||
                                        j
                                    )
                                        return !f && ((a.data = g), void c(a));
                                }
                                if (f) return !0;
                                var k = e.createTag(b);
                                if (null != k) {
                                    var l = e.option(k);
                                    l.attr("data-select2-tag", !0),
                                        e.addOptions([l]),
                                        e.insertTag(g, k);
                                }
                                (a.results = g), c(a);
                            }
                            var e = this;
                            if (
                                (this._removeOldTags(),
                                null == b.term || null != b.page)
                            )
                                return void a.call(this, b, c);
                            a.call(this, b, d);
                        }),
                        (b.prototype.createTag = function (b, c) {
                            var d = a.trim(c.term);
                            return "" === d ? null : { id: d, text: d };
                        }),
                        (b.prototype.insertTag = function (a, b, c) {
                            b.unshift(c);
                        }),
                        (b.prototype._removeOldTags = function (b) {
                            this._lastTag;
                            this.$element
                                .find("option[data-select2-tag]")
                                .each(function () {
                                    this.selected || a(this).remove();
                                });
                        }),
                        b
                    );
                }),
                b.define("select2/data/tokenizer", ["jquery"], function (a) {
                    function b(a, b, c) {
                        var d = c.get("tokenizer");
                        void 0 !== d && (this.tokenizer = d),
                            a.call(this, b, c);
                    }
                    return (
                        (b.prototype.bind = function (a, b, c) {
                            a.call(this, b, c),
                                (this.$search =
                                    b.dropdown.$search ||
                                    b.selection.$search ||
                                    c.find(".select2-search__field"));
                        }),
                        (b.prototype.query = function (b, c, d) {
                            function e(b) {
                                var c = g._normalizeItem(b);
                                if (
                                    !g.$element
                                        .find("option")
                                        .filter(function () {
                                            return a(this).val() === c.id;
                                        }).length
                                ) {
                                    var d = g.option(c);
                                    d.attr("data-select2-tag", !0),
                                        g._removeOldTags(),
                                        g.addOptions([d]);
                                }
                                f(c);
                            }
                            function f(a) {
                                g.trigger("select", { data: a });
                            }
                            var g = this;
                            c.term = c.term || "";
                            var h = this.tokenizer(c, this.options, e);
                            h.term !== c.term &&
                                (this.$search.length &&
                                    (this.$search.val(h.term),
                                    this.$search.focus()),
                                (c.term = h.term)),
                                b.call(this, c, d);
                        }),
                        (b.prototype.tokenizer = function (b, c, d, e) {
                            for (
                                var f = d.get("tokenSeparators") || [],
                                    g = c.term,
                                    h = 0,
                                    i =
                                        this.createTag ||
                                        function (a) {
                                            return { id: a.term, text: a.term };
                                        };
                                h < g.length;

                            ) {
                                var j = g[h];
                                if (-1 !== a.inArray(j, f)) {
                                    var k = g.substr(0, h),
                                        l = a.extend({}, c, { term: k }),
                                        m = i(l);
                                    null != m
                                        ? (e(m),
                                          (g = g.substr(h + 1) || ""),
                                          (h = 0))
                                        : h++;
                                } else h++;
                            }
                            return { term: g };
                        }),
                        b
                    );
                }),
                b.define("select2/data/minimumInputLength", [], function () {
                    function a(a, b, c) {
                        (this.minimumInputLength = c.get("minimumInputLength")),
                            a.call(this, b, c);
                    }
                    return (
                        (a.prototype.query = function (a, b, c) {
                            if (
                                ((b.term = b.term || ""),
                                b.term.length < this.minimumInputLength)
                            )
                                return void this.trigger("results:message", {
                                    message: "inputTooShort",
                                    args: {
                                        minimum: this.minimumInputLength,
                                        input: b.term,
                                        params: b,
                                    },
                                });
                            a.call(this, b, c);
                        }),
                        a
                    );
                }),
                b.define("select2/data/maximumInputLength", [], function () {
                    function a(a, b, c) {
                        (this.maximumInputLength = c.get("maximumInputLength")),
                            a.call(this, b, c);
                    }
                    return (
                        (a.prototype.query = function (a, b, c) {
                            if (
                                ((b.term = b.term || ""),
                                this.maximumInputLength > 0 &&
                                    b.term.length > this.maximumInputLength)
                            )
                                return void this.trigger("results:message", {
                                    message: "inputTooLong",
                                    args: {
                                        maximum: this.maximumInputLength,
                                        input: b.term,
                                        params: b,
                                    },
                                });
                            a.call(this, b, c);
                        }),
                        a
                    );
                }),
                b.define(
                    "select2/data/maximumSelectionLength",
                    [],
                    function () {
                        function a(a, b, c) {
                            (this.maximumSelectionLength = c.get(
                                "maximumSelectionLength"
                            )),
                                a.call(this, b, c);
                        }
                        return (
                            (a.prototype.query = function (a, b, c) {
                                var d = this;
                                this.current(function (e) {
                                    var f = null != e ? e.length : 0;
                                    if (
                                        d.maximumSelectionLength > 0 &&
                                        f >= d.maximumSelectionLength
                                    )
                                        return void d.trigger(
                                            "results:message",
                                            {
                                                message: "maximumSelected",
                                                args: {
                                                    maximum:
                                                        d.maximumSelectionLength,
                                                },
                                            }
                                        );
                                    a.call(d, b, c);
                                });
                            }),
                            a
                        );
                    }
                ),
                b.define(
                    "select2/dropdown",
                    ["jquery", "./utils"],
                    function (a, b) {
                        function c(a, b) {
                            (this.$element = a),
                                (this.options = b),
                                c.__super__.constructor.call(this);
                        }
                        return (
                            b.Extend(c, b.Observable),
                            (c.prototype.render = function () {
                                var b = a(
                                    '<span class="select2-dropdown"><span class="select2-results"></span></span>'
                                );
                                return (
                                    b.attr("dir", this.options.get("dir")),
                                    (this.$dropdown = b),
                                    b
                                );
                            }),
                            (c.prototype.bind = function () {}),
                            (c.prototype.position = function (a, b) {}),
                            (c.prototype.destroy = function () {
                                this.$dropdown.remove();
                            }),
                            c
                        );
                    }
                ),
                b.define(
                    "select2/dropdown/search",
                    ["jquery", "../utils"],
                    function (a, b) {
                        function c() {}
                        return (
                            (c.prototype.render = function (b) {
                                var c = b.call(this),
                                    d = a(
                                        '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>'
                                    );
                                return (
                                    (this.$searchContainer = d),
                                    (this.$search = d.find("input")),
                                    c.prepend(d),
                                    c
                                );
                            }),
                            (c.prototype.bind = function (b, c, d) {
                                var e = this;
                                b.call(this, c, d),
                                    this.$search.on("keydown", function (a) {
                                        e.trigger("keypress", a),
                                            (e._keyUpPrevented =
                                                a.isDefaultPrevented());
                                    }),
                                    this.$search.on("input", function (b) {
                                        a(this).off("keyup");
                                    }),
                                    this.$search.on(
                                        "keyup input",
                                        function (a) {
                                            e.handleSearch(a);
                                        }
                                    ),
                                    c.on("open", function () {
                                        e.$search.attr("tabindex", 0),
                                            e.$search.focus(),
                                            window.setTimeout(function () {
                                                e.$search.focus();
                                            }, 0);
                                    }),
                                    c.on("close", function () {
                                        e.$search.attr("tabindex", -1),
                                            e.$search.val("");
                                    }),
                                    c.on("focus", function () {
                                        c.isOpen() || e.$search.focus();
                                    }),
                                    c.on("results:all", function (a) {
                                        if (
                                            null == a.query.term ||
                                            "" === a.query.term
                                        ) {
                                            e.showSearch(a)
                                                ? e.$searchContainer.removeClass(
                                                      "select2-search--hide"
                                                  )
                                                : e.$searchContainer.addClass(
                                                      "select2-search--hide"
                                                  );
                                        }
                                    });
                            }),
                            (c.prototype.handleSearch = function (a) {
                                if (!this._keyUpPrevented) {
                                    var b = this.$search.val();
                                    this.trigger("query", { term: b });
                                }
                                this._keyUpPrevented = !1;
                            }),
                            (c.prototype.showSearch = function (a, b) {
                                return !0;
                            }),
                            c
                        );
                    }
                ),
                b.define("select2/dropdown/hidePlaceholder", [], function () {
                    function a(a, b, c, d) {
                        (this.placeholder = this.normalizePlaceholder(
                            c.get("placeholder")
                        )),
                            a.call(this, b, c, d);
                    }
                    return (
                        (a.prototype.append = function (a, b) {
                            (b.results = this.removePlaceholder(b.results)),
                                a.call(this, b);
                        }),
                        (a.prototype.normalizePlaceholder = function (a, b) {
                            return (
                                "string" == typeof b &&
                                    (b = { id: "", text: b }),
                                b
                            );
                        }),
                        (a.prototype.removePlaceholder = function (a, b) {
                            for (
                                var c = b.slice(0), d = b.length - 1;
                                d >= 0;
                                d--
                            ) {
                                var e = b[d];
                                this.placeholder.id === e.id && c.splice(d, 1);
                            }
                            return c;
                        }),
                        a
                    );
                }),
                b.define(
                    "select2/dropdown/infiniteScroll",
                    ["jquery"],
                    function (a) {
                        function b(a, b, c, d) {
                            (this.lastParams = {}),
                                a.call(this, b, c, d),
                                (this.$loadingMore = this.createLoadingMore()),
                                (this.loading = !1);
                        }
                        return (
                            (b.prototype.append = function (a, b) {
                                this.$loadingMore.remove(),
                                    (this.loading = !1),
                                    a.call(this, b),
                                    this.showLoadingMore(b) &&
                                        this.$results.append(this.$loadingMore);
                            }),
                            (b.prototype.bind = function (b, c, d) {
                                var e = this;
                                b.call(this, c, d),
                                    c.on("query", function (a) {
                                        (e.lastParams = a), (e.loading = !0);
                                    }),
                                    c.on("query:append", function (a) {
                                        (e.lastParams = a), (e.loading = !0);
                                    }),
                                    this.$results.on("scroll", function () {
                                        var b = a.contains(
                                            document.documentElement,
                                            e.$loadingMore[0]
                                        );
                                        if (!e.loading && b) {
                                            e.$results.offset().top +
                                                e.$results.outerHeight(!1) +
                                                50 >=
                                                e.$loadingMore.offset().top +
                                                    e.$loadingMore.outerHeight(
                                                        !1
                                                    ) && e.loadMore();
                                        }
                                    });
                            }),
                            (b.prototype.loadMore = function () {
                                this.loading = !0;
                                var b = a.extend(
                                    {},
                                    { page: 1 },
                                    this.lastParams
                                );
                                b.page++, this.trigger("query:append", b);
                            }),
                            (b.prototype.showLoadingMore = function (a, b) {
                                return b.pagination && b.pagination.more;
                            }),
                            (b.prototype.createLoadingMore = function () {
                                var b = a(
                                        '<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'
                                    ),
                                    c = this.options
                                        .get("translations")
                                        .get("loadingMore");
                                return b.html(c(this.lastParams)), b;
                            }),
                            b
                        );
                    }
                ),
                b.define(
                    "select2/dropdown/attachBody",
                    ["jquery", "../utils"],
                    function (a, b) {
                        function c(b, c, d) {
                            (this.$dropdownParent =
                                d.get("dropdownParent") || a(document.body)),
                                b.call(this, c, d);
                        }
                        return (
                            (c.prototype.bind = function (a, b, c) {
                                var d = this,
                                    e = !1;
                                a.call(this, b, c),
                                    b.on("open", function () {
                                        d._showDropdown(),
                                            d._attachPositioningHandler(b),
                                            e ||
                                                ((e = !0),
                                                b.on(
                                                    "results:all",
                                                    function () {
                                                        d._positionDropdown(),
                                                            d._resizeDropdown();
                                                    }
                                                ),
                                                b.on(
                                                    "results:append",
                                                    function () {
                                                        d._positionDropdown(),
                                                            d._resizeDropdown();
                                                    }
                                                ));
                                    }),
                                    b.on("close", function () {
                                        d._hideDropdown(),
                                            d._detachPositioningHandler(b);
                                    }),
                                    this.$dropdownContainer.on(
                                        "mousedown",
                                        function (a) {
                                            a.stopPropagation();
                                        }
                                    );
                            }),
                            (c.prototype.destroy = function (a) {
                                a.call(this), this.$dropdownContainer.remove();
                            }),
                            (c.prototype.position = function (a, b, c) {
                                b.attr("class", c.attr("class")),
                                    b.removeClass("select2"),
                                    b.addClass("select2-container--open"),
                                    b.css({
                                        position: "absolute",
                                        top: -999999,
                                    }),
                                    (this.$container = c);
                            }),
                            (c.prototype.render = function (b) {
                                var c = a("<span></span>"),
                                    d = b.call(this);
                                return (
                                    c.append(d),
                                    (this.$dropdownContainer = c),
                                    c
                                );
                            }),
                            (c.prototype._hideDropdown = function (a) {
                                this.$dropdownContainer.detach();
                            }),
                            (c.prototype._attachPositioningHandler = function (
                                c,
                                d
                            ) {
                                var e = this,
                                    f = "scroll.select2." + d.id,
                                    g = "resize.select2." + d.id,
                                    h = "orientationchange.select2." + d.id,
                                    i = this.$container
                                        .parents()
                                        .filter(b.hasScroll);
                                i.each(function () {
                                    a(this).data("select2-scroll-position", {
                                        x: a(this).scrollLeft(),
                                        y: a(this).scrollTop(),
                                    });
                                }),
                                    i.on(f, function (b) {
                                        var c = a(this).data(
                                            "select2-scroll-position"
                                        );
                                        a(this).scrollTop(c.y);
                                    }),
                                    a(window).on(
                                        f + " " + g + " " + h,
                                        function (a) {
                                            e._positionDropdown(),
                                                e._resizeDropdown();
                                        }
                                    );
                            }),
                            (c.prototype._detachPositioningHandler = function (
                                c,
                                d
                            ) {
                                var e = "scroll.select2." + d.id,
                                    f = "resize.select2." + d.id,
                                    g = "orientationchange.select2." + d.id;
                                this.$container
                                    .parents()
                                    .filter(b.hasScroll)
                                    .off(e),
                                    a(window).off(e + " " + f + " " + g);
                            }),
                            (c.prototype._positionDropdown = function () {
                                var b = a(window),
                                    c = this.$dropdown.hasClass(
                                        "select2-dropdown--above"
                                    ),
                                    d = this.$dropdown.hasClass(
                                        "select2-dropdown--below"
                                    ),
                                    e = null,
                                    f = this.$container.offset();
                                f.bottom =
                                    f.top + this.$container.outerHeight(!1);
                                var g = {
                                    height: this.$container.outerHeight(!1),
                                };
                                (g.top = f.top), (g.bottom = f.top + g.height);
                                var h = {
                                        height: this.$dropdown.outerHeight(!1),
                                    },
                                    i = {
                                        top: b.scrollTop(),
                                        bottom: b.scrollTop() + b.height(),
                                    },
                                    j = i.top < f.top - h.height,
                                    k = i.bottom > f.bottom + h.height,
                                    l = { left: f.left, top: g.bottom },
                                    m = this.$dropdownParent;
                                "static" === m.css("position") &&
                                    (m = m.offsetParent());
                                var n = m.offset();
                                (l.top -= n.top),
                                    (l.left -= n.left),
                                    c || d || (e = "below"),
                                    k || !j || c
                                        ? !j && k && c && (e = "below")
                                        : (e = "above"),
                                    ("above" == e || (c && "below" !== e)) &&
                                        (l.top = g.top - n.top - h.height),
                                    null != e &&
                                        (this.$dropdown
                                            .removeClass(
                                                "select2-dropdown--below select2-dropdown--above"
                                            )
                                            .addClass("select2-dropdown--" + e),
                                        this.$container
                                            .removeClass(
                                                "select2-container--below select2-container--above"
                                            )
                                            .addClass(
                                                "select2-container--" + e
                                            )),
                                    this.$dropdownContainer.css(l);
                            }),
                            (c.prototype._resizeDropdown = function () {
                                var a = {
                                    width:
                                        this.$container.outerWidth(!1) + "px",
                                };
                                this.options.get("dropdownAutoWidth") &&
                                    ((a.minWidth = a.width),
                                    (a.position = "relative"),
                                    (a.width = "auto")),
                                    this.$dropdown.css(a);
                            }),
                            (c.prototype._showDropdown = function (a) {
                                this.$dropdownContainer.appendTo(
                                    this.$dropdownParent
                                ),
                                    this._positionDropdown(),
                                    this._resizeDropdown();
                            }),
                            c
                        );
                    }
                ),
                b.define(
                    "select2/dropdown/minimumResultsForSearch",
                    [],
                    function () {
                        function a(b) {
                            for (var c = 0, d = 0; d < b.length; d++) {
                                var e = b[d];
                                e.children ? (c += a(e.children)) : c++;
                            }
                            return c;
                        }
                        function b(a, b, c, d) {
                            (this.minimumResultsForSearch = c.get(
                                "minimumResultsForSearch"
                            )),
                                this.minimumResultsForSearch < 0 &&
                                    (this.minimumResultsForSearch = 1 / 0),
                                a.call(this, b, c, d);
                        }
                        return (
                            (b.prototype.showSearch = function (b, c) {
                                return (
                                    !(
                                        a(c.data.results) <
                                        this.minimumResultsForSearch
                                    ) && b.call(this, c)
                                );
                            }),
                            b
                        );
                    }
                ),
                b.define("select2/dropdown/selectOnClose", [], function () {
                    function a() {}
                    return (
                        (a.prototype.bind = function (a, b, c) {
                            var d = this;
                            a.call(this, b, c),
                                b.on("close", function (a) {
                                    d._handleSelectOnClose(a);
                                });
                        }),
                        (a.prototype._handleSelectOnClose = function (a, b) {
                            if (b && null != b.originalSelect2Event) {
                                var c = b.originalSelect2Event;
                                if (
                                    "select" === c._type ||
                                    "unselect" === c._type
                                )
                                    return;
                            }
                            var d = this.getHighlightedResults();
                            if (!(d.length < 1)) {
                                var e = d.data("data");
                                (null != e.element && e.element.selected) ||
                                    (null == e.element && e.selected) ||
                                    this.trigger("select", { data: e });
                            }
                        }),
                        a
                    );
                }),
                b.define("select2/dropdown/closeOnSelect", [], function () {
                    function a() {}
                    return (
                        (a.prototype.bind = function (a, b, c) {
                            var d = this;
                            a.call(this, b, c),
                                b.on("select", function (a) {
                                    d._selectTriggered(a);
                                }),
                                b.on("unselect", function (a) {
                                    d._selectTriggered(a);
                                });
                        }),
                        (a.prototype._selectTriggered = function (a, b) {
                            var c = b.originalEvent;
                            (c && c.ctrlKey) ||
                                this.trigger("close", {
                                    originalEvent: c,
                                    originalSelect2Event: b,
                                });
                        }),
                        a
                    );
                }),
                b.define("select2/i18n/en", [], function () {
                    return {
                        errorLoading: function () {
                            return "The results could not be loaded.";
                        },
                        inputTooLong: function (a) {
                            var b = a.input.length - a.maximum,
                                c = "Please delete " + b + " character";
                            return 1 != b && (c += "s"), c;
                        },
                        inputTooShort: function (a) {
                            return (
                                "Please enter " +
                                (a.minimum - a.input.length) +
                                " or more characters"
                            );
                        },
                        loadingMore: function () {
                            return "Loading more resultsвЂ¦";
                        },
                        maximumSelected: function (a) {
                            var b =
                                "You can only select " + a.maximum + " item";
                            return 1 != a.maximum && (b += "s"), b;
                        },
                        noResults: function () {
                            return "No results found";
                        },
                        searching: function () {
                            return "SearchingвЂ¦";
                        },
                    };
                }),
                b.define(
                    "select2/defaults",
                    [
                        "jquery",
                        "require",
                        "./results",
                        "./selection/single",
                        "./selection/multiple",
                        "./selection/placeholder",
                        "./selection/allowClear",
                        "./selection/search",
                        "./selection/eventRelay",
                        "./utils",
                        "./translation",
                        "./diacritics",
                        "./data/select",
                        "./data/array",
                        "./data/ajax",
                        "./data/tags",
                        "./data/tokenizer",
                        "./data/minimumInputLength",
                        "./data/maximumInputLength",
                        "./data/maximumSelectionLength",
                        "./dropdown",
                        "./dropdown/search",
                        "./dropdown/hidePlaceholder",
                        "./dropdown/infiniteScroll",
                        "./dropdown/attachBody",
                        "./dropdown/minimumResultsForSearch",
                        "./dropdown/selectOnClose",
                        "./dropdown/closeOnSelect",
                        "./i18n/en",
                    ],
                    function (
                        a,
                        b,
                        c,
                        d,
                        e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k,
                        l,
                        m,
                        n,
                        o,
                        p,
                        q,
                        r,
                        s,
                        t,
                        u,
                        v,
                        w,
                        x,
                        y,
                        z,
                        A,
                        B,
                        C
                    ) {
                        function D() {
                            this.reset();
                        }
                        return (
                            (D.prototype.apply = function (l) {
                                if (
                                    ((l = a.extend(!0, {}, this.defaults, l)),
                                    null == l.dataAdapter)
                                ) {
                                    if (
                                        (null != l.ajax
                                            ? (l.dataAdapter = o)
                                            : null != l.data
                                            ? (l.dataAdapter = n)
                                            : (l.dataAdapter = m),
                                        l.minimumInputLength > 0 &&
                                            (l.dataAdapter = j.Decorate(
                                                l.dataAdapter,
                                                r
                                            )),
                                        l.maximumInputLength > 0 &&
                                            (l.dataAdapter = j.Decorate(
                                                l.dataAdapter,
                                                s
                                            )),
                                        l.maximumSelectionLength > 0 &&
                                            (l.dataAdapter = j.Decorate(
                                                l.dataAdapter,
                                                t
                                            )),
                                        l.tags &&
                                            (l.dataAdapter = j.Decorate(
                                                l.dataAdapter,
                                                p
                                            )),
                                        (null == l.tokenSeparators &&
                                            null == l.tokenizer) ||
                                            (l.dataAdapter = j.Decorate(
                                                l.dataAdapter,
                                                q
                                            )),
                                        null != l.query)
                                    ) {
                                        var C = b(l.amdBase + "compat/query");
                                        l.dataAdapter = j.Decorate(
                                            l.dataAdapter,
                                            C
                                        );
                                    }
                                    if (null != l.initSelection) {
                                        var D = b(
                                            l.amdBase + "compat/initSelection"
                                        );
                                        l.dataAdapter = j.Decorate(
                                            l.dataAdapter,
                                            D
                                        );
                                    }
                                }
                                if (
                                    (null == l.resultsAdapter &&
                                        ((l.resultsAdapter = c),
                                        null != l.ajax &&
                                            (l.resultsAdapter = j.Decorate(
                                                l.resultsAdapter,
                                                x
                                            )),
                                        null != l.placeholder &&
                                            (l.resultsAdapter = j.Decorate(
                                                l.resultsAdapter,
                                                w
                                            )),
                                        l.selectOnClose &&
                                            (l.resultsAdapter = j.Decorate(
                                                l.resultsAdapter,
                                                A
                                            ))),
                                    null == l.dropdownAdapter)
                                ) {
                                    if (l.multiple) l.dropdownAdapter = u;
                                    else {
                                        var E = j.Decorate(u, v);
                                        l.dropdownAdapter = E;
                                    }
                                    if (
                                        (0 !== l.minimumResultsForSearch &&
                                            (l.dropdownAdapter = j.Decorate(
                                                l.dropdownAdapter,
                                                z
                                            )),
                                        l.closeOnSelect &&
                                            (l.dropdownAdapter = j.Decorate(
                                                l.dropdownAdapter,
                                                B
                                            )),
                                        null != l.dropdownCssClass ||
                                            null != l.dropdownCss ||
                                            null != l.adaptDropdownCssClass)
                                    ) {
                                        var F = b(
                                            l.amdBase + "compat/dropdownCss"
                                        );
                                        l.dropdownAdapter = j.Decorate(
                                            l.dropdownAdapter,
                                            F
                                        );
                                    }
                                    l.dropdownAdapter = j.Decorate(
                                        l.dropdownAdapter,
                                        y
                                    );
                                }
                                if (null == l.selectionAdapter) {
                                    if (
                                        (l.multiple
                                            ? (l.selectionAdapter = e)
                                            : (l.selectionAdapter = d),
                                        null != l.placeholder &&
                                            (l.selectionAdapter = j.Decorate(
                                                l.selectionAdapter,
                                                f
                                            )),
                                        l.allowClear &&
                                            (l.selectionAdapter = j.Decorate(
                                                l.selectionAdapter,
                                                g
                                            )),
                                        l.multiple &&
                                            (l.selectionAdapter = j.Decorate(
                                                l.selectionAdapter,
                                                h
                                            )),
                                        null != l.containerCssClass ||
                                            null != l.containerCss ||
                                            null != l.adaptContainerCssClass)
                                    ) {
                                        var G = b(
                                            l.amdBase + "compat/containerCss"
                                        );
                                        l.selectionAdapter = j.Decorate(
                                            l.selectionAdapter,
                                            G
                                        );
                                    }
                                    l.selectionAdapter = j.Decorate(
                                        l.selectionAdapter,
                                        i
                                    );
                                }
                                if ("string" == typeof l.language)
                                    if (l.language.indexOf("-") > 0) {
                                        var H = l.language.split("-"),
                                            I = H[0];
                                        l.language = [l.language, I];
                                    } else l.language = [l.language];
                                if (a.isArray(l.language)) {
                                    var J = new k();
                                    l.language.push("en");
                                    for (
                                        var K = l.language, L = 0;
                                        L < K.length;
                                        L++
                                    ) {
                                        var M = K[L],
                                            N = {};
                                        try {
                                            N = k.loadPath(M);
                                        } catch (a) {
                                            try {
                                                (M =
                                                    this.defaults
                                                        .amdLanguageBase + M),
                                                    (N = k.loadPath(M));
                                            } catch (a) {
                                                l.debug &&
                                                    window.console &&
                                                    console.warn &&
                                                    console.warn(
                                                        'Select2: The language file for "' +
                                                            M +
                                                            '" could not be automatically loaded. A fallback will be used instead.'
                                                    );
                                                continue;
                                            }
                                        }
                                        J.extend(N);
                                    }
                                    l.translations = J;
                                } else {
                                    var O = k.loadPath(
                                            this.defaults.amdLanguageBase + "en"
                                        ),
                                        P = new k(l.language);
                                    P.extend(O), (l.translations = P);
                                }
                                return l;
                            }),
                            (D.prototype.reset = function () {
                                function b(a) {
                                    function b(a) {
                                        return l[a] || a;
                                    }
                                    return a.replace(/[^\u0000-\u007E]/g, b);
                                }
                                function c(d, e) {
                                    if ("" === a.trim(d.term)) return e;
                                    if (e.children && e.children.length > 0) {
                                        for (
                                            var f = a.extend(!0, {}, e),
                                                g = e.children.length - 1;
                                            g >= 0;
                                            g--
                                        ) {
                                            null == c(d, e.children[g]) &&
                                                f.children.splice(g, 1);
                                        }
                                        return f.children.length > 0
                                            ? f
                                            : c(d, f);
                                    }
                                    var h = b(e.text).toUpperCase(),
                                        i = b(d.term).toUpperCase();
                                    return h.indexOf(i) > -1 ? e : null;
                                }
                                this.defaults = {
                                    amdBase: "./",
                                    amdLanguageBase: "./i18n/",
                                    closeOnSelect: !0,
                                    debug: !1,
                                    dropdownAutoWidth: !1,
                                    escapeMarkup: j.escapeMarkup,
                                    language: C,
                                    matcher: c,
                                    minimumInputLength: 0,
                                    maximumInputLength: 0,
                                    maximumSelectionLength: 0,
                                    minimumResultsForSearch: 0,
                                    selectOnClose: !1,
                                    sorter: function (a) {
                                        return a;
                                    },
                                    templateResult: function (a) {
                                        return a.text;
                                    },
                                    templateSelection: function (a) {
                                        return a.text;
                                    },
                                    theme: "default",
                                    width: "resolve",
                                };
                            }),
                            (D.prototype.set = function (b, c) {
                                var d = a.camelCase(b),
                                    e = {};
                                e[d] = c;
                                var f = j._convertData(e);
                                a.extend(this.defaults, f);
                            }),
                            new D()
                        );
                    }
                ),
                b.define(
                    "select2/options",
                    ["require", "jquery", "./defaults", "./utils"],
                    function (a, b, c, d) {
                        function e(b, e) {
                            if (
                                ((this.options = b),
                                null != e && this.fromElement(e),
                                (this.options = c.apply(this.options)),
                                e && e.is("input"))
                            ) {
                                var f = a(
                                    this.get("amdBase") + "compat/inputData"
                                );
                                this.options.dataAdapter = d.Decorate(
                                    this.options.dataAdapter,
                                    f
                                );
                            }
                        }
                        return (
                            (e.prototype.fromElement = function (a) {
                                var c = ["select2"];
                                null == this.options.multiple &&
                                    (this.options.multiple =
                                        a.prop("multiple")),
                                    null == this.options.disabled &&
                                        (this.options.disabled =
                                            a.prop("disabled")),
                                    null == this.options.language &&
                                        (a.prop("lang")
                                            ? (this.options.language = a
                                                  .prop("lang")
                                                  .toLowerCase())
                                            : a
                                                  .closest("[lang]")
                                                  .prop("lang") &&
                                              (this.options.language = a
                                                  .closest("[lang]")
                                                  .prop("lang"))),
                                    null == this.options.dir &&
                                        (a.prop("dir")
                                            ? (this.options.dir = a.prop("dir"))
                                            : a.closest("[dir]").prop("dir")
                                            ? (this.options.dir = a
                                                  .closest("[dir]")
                                                  .prop("dir"))
                                            : (this.options.dir = "ltr")),
                                    a.prop("disabled", this.options.disabled),
                                    a.prop("multiple", this.options.multiple),
                                    a.data("select2Tags") &&
                                        (this.options.debug &&
                                            window.console &&
                                            console.warn &&
                                            console.warn(
                                                'Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'
                                            ),
                                        a.data("data", a.data("select2Tags")),
                                        a.data("tags", !0)),
                                    a.data("ajaxUrl") &&
                                        (this.options.debug &&
                                            window.console &&
                                            console.warn &&
                                            console.warn(
                                                "Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."
                                            ),
                                        a.attr("ajax--url", a.data("ajaxUrl")),
                                        a.data("ajax--url", a.data("ajaxUrl")));
                                var e = {};
                                e =
                                    b.fn.jquery &&
                                    "1." == b.fn.jquery.substr(0, 2) &&
                                    a[0].dataset
                                        ? b.extend(
                                              !0,
                                              {},
                                              a[0].dataset,
                                              a.data()
                                          )
                                        : a.data();
                                var f = b.extend(!0, {}, e);
                                f = d._convertData(f);
                                for (var g in f)
                                    b.inArray(g, c) > -1 ||
                                        (b.isPlainObject(this.options[g])
                                            ? b.extend(this.options[g], f[g])
                                            : (this.options[g] = f[g]));
                                return this;
                            }),
                            (e.prototype.get = function (a) {
                                return this.options[a];
                            }),
                            (e.prototype.set = function (a, b) {
                                this.options[a] = b;
                            }),
                            e
                        );
                    }
                ),
                b.define(
                    "select2/core",
                    ["jquery", "./options", "./utils", "./keys"],
                    function (a, b, c, d) {
                        var e = function (a, c) {
                            null != a.data("select2") &&
                                a.data("select2").destroy(),
                                (this.$element = a),
                                (this.id = this._generateId(a)),
                                (c = c || {}),
                                (this.options = new b(c, a)),
                                e.__super__.constructor.call(this);
                            var d = a.attr("tabindex") || 0;
                            a.data("old-tabindex", d), a.attr("tabindex", "-1");
                            var f = this.options.get("dataAdapter");
                            this.dataAdapter = new f(a, this.options);
                            var g = this.render();
                            this._placeContainer(g);
                            var h = this.options.get("selectionAdapter");
                            (this.selection = new h(a, this.options)),
                                (this.$selection = this.selection.render()),
                                this.selection.position(this.$selection, g);
                            var i = this.options.get("dropdownAdapter");
                            (this.dropdown = new i(a, this.options)),
                                (this.$dropdown = this.dropdown.render()),
                                this.dropdown.position(this.$dropdown, g);
                            var j = this.options.get("resultsAdapter");
                            (this.results = new j(
                                a,
                                this.options,
                                this.dataAdapter
                            )),
                                (this.$results = this.results.render()),
                                this.results.position(
                                    this.$results,
                                    this.$dropdown
                                );
                            var k = this;
                            this._bindAdapters(),
                                this._registerDomEvents(),
                                this._registerDataEvents(),
                                this._registerSelectionEvents(),
                                this._registerDropdownEvents(),
                                this._registerResultsEvents(),
                                this._registerEvents(),
                                this.dataAdapter.current(function (a) {
                                    k.trigger("selection:update", { data: a });
                                }),
                                a.addClass("select2-hidden-accessible"),
                                a.attr("aria-hidden", "true"),
                                this._syncAttributes(),
                                a.data("select2", this);
                        };
                        return (
                            c.Extend(e, c.Observable),
                            (e.prototype._generateId = function (a) {
                                var b = "";
                                return (
                                    (b =
                                        null != a.attr("id")
                                            ? a.attr("id")
                                            : null != a.attr("name")
                                            ? a.attr("name") +
                                              "-" +
                                              c.generateChars(2)
                                            : c.generateChars(4)),
                                    (b = b.replace(/(:|\.|\[|\]|,)/g, "")),
                                    (b = "select2-" + b)
                                );
                            }),
                            (e.prototype._placeContainer = function (a) {
                                a.insertAfter(this.$element);
                                var b = this._resolveWidth(
                                    this.$element,
                                    this.options.get("width")
                                );
                                null != b && a.css("width", b);
                            }),
                            (e.prototype._resolveWidth = function (a, b) {
                                var c =
                                    /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                                if ("resolve" == b) {
                                    var d = this._resolveWidth(a, "style");
                                    return null != d
                                        ? d
                                        : this._resolveWidth(a, "element");
                                }
                                if ("element" == b) {
                                    var e = a.outerWidth(!1);
                                    return e <= 0 ? "auto" : e + "px";
                                }
                                if ("style" == b) {
                                    var f = a.attr("style");
                                    if ("string" != typeof f) return null;
                                    for (
                                        var g = f.split(";"),
                                            h = 0,
                                            i = g.length;
                                        h < i;
                                        h += 1
                                    ) {
                                        var j = g[h].replace(/\s/g, ""),
                                            k = j.match(c);
                                        if (null !== k && k.length >= 1)
                                            return k[1];
                                    }
                                    return null;
                                }
                                return b;
                            }),
                            (e.prototype._bindAdapters = function () {
                                this.dataAdapter.bind(this, this.$container),
                                    this.selection.bind(this, this.$container),
                                    this.dropdown.bind(this, this.$container),
                                    this.results.bind(this, this.$container);
                            }),
                            (e.prototype._registerDomEvents = function () {
                                var b = this;
                                this.$element.on("change.select2", function () {
                                    b.dataAdapter.current(function (a) {
                                        b.trigger("selection:update", {
                                            data: a,
                                        });
                                    });
                                }),
                                    this.$element.on(
                                        "focus.select2",
                                        function (a) {
                                            b.trigger("focus", a);
                                        }
                                    ),
                                    (this._syncA = c.bind(
                                        this._syncAttributes,
                                        this
                                    )),
                                    (this._syncS = c.bind(
                                        this._syncSubtree,
                                        this
                                    )),
                                    this.$element[0].attachEvent &&
                                        this.$element[0].attachEvent(
                                            "onpropertychange",
                                            this._syncA
                                        );
                                var d =
                                    window.MutationObserver ||
                                    window.WebKitMutationObserver ||
                                    window.MozMutationObserver;
                                null != d
                                    ? ((this._observer = new d(function (c) {
                                          a.each(c, b._syncA),
                                              a.each(c, b._syncS);
                                      })),
                                      this._observer.observe(this.$element[0], {
                                          attributes: !0,
                                          childList: !0,
                                          subtree: !1,
                                      }))
                                    : this.$element[0].addEventListener &&
                                      (this.$element[0].addEventListener(
                                          "DOMAttrModified",
                                          b._syncA,
                                          !1
                                      ),
                                      this.$element[0].addEventListener(
                                          "DOMNodeInserted",
                                          b._syncS,
                                          !1
                                      ),
                                      this.$element[0].addEventListener(
                                          "DOMNodeRemoved",
                                          b._syncS,
                                          !1
                                      ));
                            }),
                            (e.prototype._registerDataEvents = function () {
                                var a = this;
                                this.dataAdapter.on("*", function (b, c) {
                                    a.trigger(b, c);
                                });
                            }),
                            (e.prototype._registerSelectionEvents =
                                function () {
                                    var b = this,
                                        c = ["toggle", "focus"];
                                    this.selection.on("toggle", function () {
                                        b.toggleDropdown();
                                    }),
                                        this.selection.on(
                                            "focus",
                                            function (a) {
                                                b.focus(a);
                                            }
                                        ),
                                        this.selection.on("*", function (d, e) {
                                            -1 === a.inArray(d, c) &&
                                                b.trigger(d, e);
                                        });
                                }),
                            (e.prototype._registerDropdownEvents = function () {
                                var a = this;
                                this.dropdown.on("*", function (b, c) {
                                    a.trigger(b, c);
                                });
                            }),
                            (e.prototype._registerResultsEvents = function () {
                                var a = this;
                                this.results.on("*", function (b, c) {
                                    a.trigger(b, c);
                                });
                            }),
                            (e.prototype._registerEvents = function () {
                                var a = this;
                                this.on("open", function () {
                                    a.$container.addClass(
                                        "select2-container--open"
                                    );
                                }),
                                    this.on("close", function () {
                                        a.$container.removeClass(
                                            "select2-container--open"
                                        );
                                    }),
                                    this.on("enable", function () {
                                        a.$container.removeClass(
                                            "select2-container--disabled"
                                        );
                                    }),
                                    this.on("disable", function () {
                                        a.$container.addClass(
                                            "select2-container--disabled"
                                        );
                                    }),
                                    this.on("blur", function () {
                                        a.$container.removeClass(
                                            "select2-container--focus"
                                        );
                                    }),
                                    this.on("query", function (b) {
                                        a.isOpen() || a.trigger("open", {}),
                                            this.dataAdapter.query(
                                                b,
                                                function (c) {
                                                    a.trigger("results:all", {
                                                        data: c,
                                                        query: b,
                                                    });
                                                }
                                            );
                                    }),
                                    this.on("query:append", function (b) {
                                        this.dataAdapter.query(b, function (c) {
                                            a.trigger("results:append", {
                                                data: c,
                                                query: b,
                                            });
                                        });
                                    }),
                                    this.on("keypress", function (b) {
                                        var c = b.which;
                                        a.isOpen()
                                            ? c === d.ESC ||
                                              c === d.TAB ||
                                              (c === d.UP && b.altKey)
                                                ? (a.close(),
                                                  b.preventDefault())
                                                : c === d.ENTER
                                                ? (a.trigger(
                                                      "results:select",
                                                      {}
                                                  ),
                                                  b.preventDefault())
                                                : c === d.SPACE && b.ctrlKey
                                                ? (a.trigger(
                                                      "results:toggle",
                                                      {}
                                                  ),
                                                  b.preventDefault())
                                                : c === d.UP
                                                ? (a.trigger(
                                                      "results:previous",
                                                      {}
                                                  ),
                                                  b.preventDefault())
                                                : c === d.DOWN &&
                                                  (a.trigger(
                                                      "results:next",
                                                      {}
                                                  ),
                                                  b.preventDefault())
                                            : (c === d.ENTER ||
                                                  c === d.SPACE ||
                                                  (c === d.DOWN && b.altKey)) &&
                                              (a.open(), b.preventDefault());
                                    });
                            }),
                            (e.prototype._syncAttributes = function () {
                                this.options.set(
                                    "disabled",
                                    this.$element.prop("disabled")
                                ),
                                    this.options.get("disabled")
                                        ? (this.isOpen() && this.close(),
                                          this.trigger("disable", {}))
                                        : this.trigger("enable", {});
                            }),
                            (e.prototype._syncSubtree = function (a, b) {
                                var c = !1,
                                    d = this;
                                if (
                                    !a ||
                                    !a.target ||
                                    "OPTION" === a.target.nodeName ||
                                    "OPTGROUP" === a.target.nodeName
                                ) {
                                    if (b)
                                        if (
                                            b.addedNodes &&
                                            b.addedNodes.length > 0
                                        )
                                            for (
                                                var e = 0;
                                                e < b.addedNodes.length;
                                                e++
                                            ) {
                                                var f = b.addedNodes[e];
                                                f.selected && (c = !0);
                                            }
                                        else
                                            b.removedNodes &&
                                                b.removedNodes.length > 0 &&
                                                (c = !0);
                                    else c = !0;
                                    c &&
                                        this.dataAdapter.current(function (a) {
                                            d.trigger("selection:update", {
                                                data: a,
                                            });
                                        });
                                }
                            }),
                            (e.prototype.trigger = function (a, b) {
                                var c = e.__super__.trigger,
                                    d = {
                                        open: "opening",
                                        close: "closing",
                                        select: "selecting",
                                        unselect: "unselecting",
                                    };
                                if ((void 0 === b && (b = {}), a in d)) {
                                    var f = d[a],
                                        g = { prevented: !1, name: a, args: b };
                                    if ((c.call(this, f, g), g.prevented))
                                        return void (b.prevented = !0);
                                }
                                c.call(this, a, b);
                            }),
                            (e.prototype.toggleDropdown = function () {
                                this.options.get("disabled") ||
                                    (this.isOpen()
                                        ? this.close()
                                        : this.open());
                            }),
                            (e.prototype.open = function () {
                                this.isOpen() || this.trigger("query", {});
                            }),
                            (e.prototype.close = function () {
                                this.isOpen() && this.trigger("close", {});
                            }),
                            (e.prototype.isOpen = function () {
                                return this.$container.hasClass(
                                    "select2-container--open"
                                );
                            }),
                            (e.prototype.hasFocus = function () {
                                return this.$container.hasClass(
                                    "select2-container--focus"
                                );
                            }),
                            (e.prototype.focus = function (a) {
                                this.hasFocus() ||
                                    (this.$container.addClass(
                                        "select2-container--focus"
                                    ),
                                    this.trigger("focus", {}));
                            }),
                            (e.prototype.enable = function (a) {
                                this.options.get("debug") &&
                                    window.console &&
                                    console.warn &&
                                    console.warn(
                                        'Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'
                                    ),
                                    (null != a && 0 !== a.length) || (a = [!0]);
                                var b = !a[0];
                                this.$element.prop("disabled", b);
                            }),
                            (e.prototype.data = function () {
                                this.options.get("debug") &&
                                    arguments.length > 0 &&
                                    window.console &&
                                    console.warn &&
                                    console.warn(
                                        'Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'
                                    );
                                var a = [];
                                return (
                                    this.dataAdapter.current(function (b) {
                                        a = b;
                                    }),
                                    a
                                );
                            }),
                            (e.prototype.val = function (b) {
                                if (
                                    (this.options.get("debug") &&
                                        window.console &&
                                        console.warn &&
                                        console.warn(
                                            'Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'
                                        ),
                                    null == b || 0 === b.length)
                                )
                                    return this.$element.val();
                                var c = b[0];
                                a.isArray(c) &&
                                    (c = a.map(c, function (a) {
                                        return a.toString();
                                    })),
                                    this.$element.val(c).trigger("change");
                            }),
                            (e.prototype.destroy = function () {
                                this.$container.remove(),
                                    this.$element[0].detachEvent &&
                                        this.$element[0].detachEvent(
                                            "onpropertychange",
                                            this._syncA
                                        ),
                                    null != this._observer
                                        ? (this._observer.disconnect(),
                                          (this._observer = null))
                                        : this.$element[0]
                                              .removeEventListener &&
                                          (this.$element[0].removeEventListener(
                                              "DOMAttrModified",
                                              this._syncA,
                                              !1
                                          ),
                                          this.$element[0].removeEventListener(
                                              "DOMNodeInserted",
                                              this._syncS,
                                              !1
                                          ),
                                          this.$element[0].removeEventListener(
                                              "DOMNodeRemoved",
                                              this._syncS,
                                              !1
                                          )),
                                    (this._syncA = null),
                                    (this._syncS = null),
                                    this.$element.off(".select2"),
                                    this.$element.attr(
                                        "tabindex",
                                        this.$element.data("old-tabindex")
                                    ),
                                    this.$element.removeClass(
                                        "select2-hidden-accessible"
                                    ),
                                    this.$element.attr("aria-hidden", "false"),
                                    this.$element.removeData("select2"),
                                    this.dataAdapter.destroy(),
                                    this.selection.destroy(),
                                    this.dropdown.destroy(),
                                    this.results.destroy(),
                                    (this.dataAdapter = null),
                                    (this.selection = null),
                                    (this.dropdown = null),
                                    (this.results = null);
                            }),
                            (e.prototype.render = function () {
                                var b = a(
                                    '<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'
                                );
                                return (
                                    b.attr("dir", this.options.get("dir")),
                                    (this.$container = b),
                                    this.$container.addClass(
                                        "select2-container--" +
                                            this.options.get("theme")
                                    ),
                                    b.data("element", this.$element),
                                    b
                                );
                            }),
                            e
                        );
                    }
                ),
                b.define("select2/compat/utils", ["jquery"], function (a) {
                    function b(b, c, d) {
                        var e,
                            f,
                            g = [];
                        (e = a.trim(b.attr("class"))),
                            e &&
                                ((e = "" + e),
                                a(e.split(/\s+/)).each(function () {
                                    0 === this.indexOf("select2-") &&
                                        g.push(this);
                                })),
                            (e = a.trim(c.attr("class"))),
                            e &&
                                ((e = "" + e),
                                a(e.split(/\s+/)).each(function () {
                                    0 !== this.indexOf("select2-") &&
                                        null != (f = d(this)) &&
                                        g.push(f);
                                })),
                            b.attr("class", g.join(" "));
                    }
                    return { syncCssClasses: b };
                }),
                b.define(
                    "select2/compat/containerCss",
                    ["jquery", "./utils"],
                    function (a, b) {
                        function c(a) {
                            return null;
                        }
                        function d() {}
                        return (
                            (d.prototype.render = function (d) {
                                var e = d.call(this),
                                    f =
                                        this.options.get("containerCssClass") ||
                                        "";
                                a.isFunction(f) && (f = f(this.$element));
                                var g = this.options.get(
                                    "adaptContainerCssClass"
                                );
                                if (((g = g || c), -1 !== f.indexOf(":all:"))) {
                                    f = f.replace(":all:", "");
                                    var h = g;
                                    g = function (a) {
                                        var b = h(a);
                                        return null != b ? b + " " + a : a;
                                    };
                                }
                                var i = this.options.get("containerCss") || {};
                                return (
                                    a.isFunction(i) && (i = i(this.$element)),
                                    b.syncCssClasses(e, this.$element, g),
                                    e.css(i),
                                    e.addClass(f),
                                    e
                                );
                            }),
                            d
                        );
                    }
                ),
                b.define(
                    "select2/compat/dropdownCss",
                    ["jquery", "./utils"],
                    function (a, b) {
                        function c(a) {
                            return null;
                        }
                        function d() {}
                        return (
                            (d.prototype.render = function (d) {
                                var e = d.call(this),
                                    f =
                                        this.options.get("dropdownCssClass") ||
                                        "";
                                a.isFunction(f) && (f = f(this.$element));
                                var g = this.options.get(
                                    "adaptDropdownCssClass"
                                );
                                if (((g = g || c), -1 !== f.indexOf(":all:"))) {
                                    f = f.replace(":all:", "");
                                    var h = g;
                                    g = function (a) {
                                        var b = h(a);
                                        return null != b ? b + " " + a : a;
                                    };
                                }
                                var i = this.options.get("dropdownCss") || {};
                                return (
                                    a.isFunction(i) && (i = i(this.$element)),
                                    b.syncCssClasses(e, this.$element, g),
                                    e.css(i),
                                    e.addClass(f),
                                    e
                                );
                            }),
                            d
                        );
                    }
                ),
                b.define(
                    "select2/compat/initSelection",
                    ["jquery"],
                    function (a) {
                        function b(a, b, c) {
                            c.get("debug") &&
                                window.console &&
                                console.warn &&
                                console.warn(
                                    "Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"
                                ),
                                (this.initSelection = c.get("initSelection")),
                                (this._isInitialized = !1),
                                a.call(this, b, c);
                        }
                        return (
                            (b.prototype.current = function (b, c) {
                                var d = this;
                                if (this._isInitialized)
                                    return void b.call(this, c);
                                this.initSelection.call(
                                    null,
                                    this.$element,
                                    function (b) {
                                        (d._isInitialized = !0),
                                            a.isArray(b) || (b = [b]),
                                            c(b);
                                    }
                                );
                            }),
                            b
                        );
                    }
                ),
                b.define("select2/compat/inputData", ["jquery"], function (a) {
                    function b(a, b, c) {
                        (this._currentData = []),
                            (this._valueSeparator =
                                c.get("valueSeparator") || ","),
                            "hidden" === b.prop("type") &&
                                c.get("debug") &&
                                console &&
                                console.warn &&
                                console.warn(
                                    "Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."
                                ),
                            a.call(this, b, c);
                    }
                    return (
                        (b.prototype.current = function (b, c) {
                            function d(b, c) {
                                var e = [];
                                return (
                                    b.selected || -1 !== a.inArray(b.id, c)
                                        ? ((b.selected = !0), e.push(b))
                                        : (b.selected = !1),
                                    b.children &&
                                        e.push.apply(e, d(b.children, c)),
                                    e
                                );
                            }
                            for (
                                var e = [], f = 0;
                                f < this._currentData.length;
                                f++
                            ) {
                                var g = this._currentData[f];
                                e.push.apply(
                                    e,
                                    d(
                                        g,
                                        this.$element
                                            .val()
                                            .split(this._valueSeparator)
                                    )
                                );
                            }
                            c(e);
                        }),
                        (b.prototype.select = function (b, c) {
                            if (this.options.get("multiple")) {
                                var d = this.$element.val();
                                (d += this._valueSeparator + c.id),
                                    this.$element.val(d),
                                    this.$element.trigger("change");
                            } else
                                this.current(function (b) {
                                    a.map(b, function (a) {
                                        a.selected = !1;
                                    });
                                }),
                                    this.$element.val(c.id),
                                    this.$element.trigger("change");
                        }),
                        (b.prototype.unselect = function (a, b) {
                            var c = this;
                            (b.selected = !1),
                                this.current(function (a) {
                                    for (var d = [], e = 0; e < a.length; e++) {
                                        var f = a[e];
                                        b.id != f.id && d.push(f.id);
                                    }
                                    c.$element.val(d.join(c._valueSeparator)),
                                        c.$element.trigger("change");
                                });
                        }),
                        (b.prototype.query = function (a, b, c) {
                            for (
                                var d = [], e = 0;
                                e < this._currentData.length;
                                e++
                            ) {
                                var f = this._currentData[e],
                                    g = this.matches(b, f);
                                null !== g && d.push(g);
                            }
                            c({ results: d });
                        }),
                        (b.prototype.addOptions = function (b, c) {
                            var d = a.map(c, function (b) {
                                return a.data(b[0], "data");
                            });
                            this._currentData.push.apply(this._currentData, d);
                        }),
                        b
                    );
                }),
                b.define("select2/compat/matcher", ["jquery"], function (a) {
                    function b(b) {
                        function c(c, d) {
                            var e = a.extend(!0, {}, d);
                            if (null == c.term || "" === a.trim(c.term))
                                return e;
                            if (d.children) {
                                for (
                                    var f = d.children.length - 1;
                                    f >= 0;
                                    f--
                                ) {
                                    var g = d.children[f];
                                    b(c.term, g.text, g) ||
                                        e.children.splice(f, 1);
                                }
                                if (e.children.length > 0) return e;
                            }
                            return b(c.term, d.text, d) ? e : null;
                        }
                        return c;
                    }
                    return b;
                }),
                b.define("select2/compat/query", [], function () {
                    function a(a, b, c) {
                        c.get("debug") &&
                            window.console &&
                            console.warn &&
                            console.warn(
                                "Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."
                            ),
                            a.call(this, b, c);
                    }
                    return (
                        (a.prototype.query = function (a, b, c) {
                            (b.callback = c),
                                this.options.get("query").call(null, b);
                        }),
                        a
                    );
                }),
                b.define("select2/dropdown/attachContainer", [], function () {
                    function a(a, b, c) {
                        a.call(this, b, c);
                    }
                    return (
                        (a.prototype.position = function (a, b, c) {
                            c.find(".dropdown-wrapper").append(b),
                                b.addClass("select2-dropdown--below"),
                                c.addClass("select2-container--below");
                        }),
                        a
                    );
                }),
                b.define("select2/dropdown/stopPropagation", [], function () {
                    function a() {}
                    return (
                        (a.prototype.bind = function (a, b, c) {
                            a.call(this, b, c);
                            var d = [
                                "blur",
                                "change",
                                "click",
                                "dblclick",
                                "focus",
                                "focusin",
                                "focusout",
                                "input",
                                "keydown",
                                "keyup",
                                "keypress",
                                "mousedown",
                                "mouseenter",
                                "mouseleave",
                                "mousemove",
                                "mouseover",
                                "mouseup",
                                "search",
                                "touchend",
                                "touchstart",
                            ];
                            this.$dropdown.on(d.join(" "), function (a) {
                                a.stopPropagation();
                            });
                        }),
                        a
                    );
                }),
                b.define("select2/selection/stopPropagation", [], function () {
                    function a() {}
                    return (
                        (a.prototype.bind = function (a, b, c) {
                            a.call(this, b, c);
                            var d = [
                                "blur",
                                "change",
                                "click",
                                "dblclick",
                                "focus",
                                "focusin",
                                "focusout",
                                "input",
                                "keydown",
                                "keyup",
                                "keypress",
                                "mousedown",
                                "mouseenter",
                                "mouseleave",
                                "mousemove",
                                "mouseover",
                                "mouseup",
                                "search",
                                "touchend",
                                "touchstart",
                            ];
                            this.$selection.on(d.join(" "), function (a) {
                                a.stopPropagation();
                            });
                        }),
                        a
                    );
                }),
                (function (c) {
                    "function" == typeof b.define && b.define.amd
                        ? b.define("jquery-mousewheel", ["jquery"], c)
                        : "object" == typeof exports
                        ? (module.exports = c)
                        : c(a);
                })(function (a) {
                    function b(b) {
                        var g = b || window.event,
                            h = i.call(arguments, 1),
                            j = 0,
                            l = 0,
                            m = 0,
                            n = 0,
                            o = 0,
                            p = 0;
                        if (
                            ((b = a.event.fix(g)),
                            (b.type = "mousewheel"),
                            "detail" in g && (m = -1 * g.detail),
                            "wheelDelta" in g && (m = g.wheelDelta),
                            "wheelDeltaY" in g && (m = g.wheelDeltaY),
                            "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
                            "axis" in g &&
                                g.axis === g.HORIZONTAL_AXIS &&
                                ((l = -1 * m), (m = 0)),
                            (j = 0 === m ? l : m),
                            "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
                            "deltaX" in g &&
                                ((l = g.deltaX), 0 === m && (j = -1 * l)),
                            0 !== m || 0 !== l)
                        ) {
                            if (1 === g.deltaMode) {
                                var q = a.data(this, "mousewheel-line-height");
                                (j *= q), (m *= q), (l *= q);
                            } else if (2 === g.deltaMode) {
                                var r = a.data(this, "mousewheel-page-height");
                                (j *= r), (m *= r), (l *= r);
                            }
                            if (
                                ((n = Math.max(Math.abs(m), Math.abs(l))),
                                (!f || n < f) &&
                                    ((f = n), d(g, n) && (f /= 40)),
                                d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
                                (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
                                (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
                                (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
                                k.settings.normalizeOffset &&
                                    this.getBoundingClientRect)
                            ) {
                                var s = this.getBoundingClientRect();
                                (o = b.clientX - s.left),
                                    (p = b.clientY - s.top);
                            }
                            return (
                                (b.deltaX = l),
                                (b.deltaY = m),
                                (b.deltaFactor = f),
                                (b.offsetX = o),
                                (b.offsetY = p),
                                (b.deltaMode = 0),
                                h.unshift(b, j, l, m),
                                e && clearTimeout(e),
                                (e = setTimeout(c, 200)),
                                (a.event.dispatch || a.event.handle).apply(
                                    this,
                                    h
                                )
                            );
                        }
                    }
                    function c() {
                        f = null;
                    }
                    function d(a, b) {
                        return (
                            k.settings.adjustOldDeltas &&
                            "mousewheel" === a.type &&
                            b % 120 == 0
                        );
                    }
                    var e,
                        f,
                        g = [
                            "wheel",
                            "mousewheel",
                            "DOMMouseScroll",
                            "MozMousePixelScroll",
                        ],
                        h =
                            "onwheel" in document || document.documentMode >= 9
                                ? ["wheel"]
                                : [
                                      "mousewheel",
                                      "DomMouseScroll",
                                      "MozMousePixelScroll",
                                  ],
                        i = Array.prototype.slice;
                    if (a.event.fixHooks)
                        for (var j = g.length; j; )
                            a.event.fixHooks[g[--j]] = a.event.mouseHooks;
                    var k = (a.event.special.mousewheel = {
                        version: "3.1.12",
                        setup: function () {
                            if (this.addEventListener)
                                for (var c = h.length; c; )
                                    this.addEventListener(h[--c], b, !1);
                            else this.onmousewheel = b;
                            a.data(
                                this,
                                "mousewheel-line-height",
                                k.getLineHeight(this)
                            ),
                                a.data(
                                    this,
                                    "mousewheel-page-height",
                                    k.getPageHeight(this)
                                );
                        },
                        teardown: function () {
                            if (this.removeEventListener)
                                for (var c = h.length; c; )
                                    this.removeEventListener(h[--c], b, !1);
                            else this.onmousewheel = null;
                            a.removeData(this, "mousewheel-line-height"),
                                a.removeData(this, "mousewheel-page-height");
                        },
                        getLineHeight: function (b) {
                            var c = a(b),
                                d =
                                    c[
                                        "offsetParent" in a.fn
                                            ? "offsetParent"
                                            : "parent"
                                    ]();
                            return (
                                d.length || (d = a("body")),
                                parseInt(d.css("fontSize"), 10) ||
                                    parseInt(c.css("fontSize"), 10) ||
                                    16
                            );
                        },
                        getPageHeight: function (b) {
                            return a(b).height();
                        },
                        settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
                    });
                    a.fn.extend({
                        mousewheel: function (a) {
                            return a
                                ? this.bind("mousewheel", a)
                                : this.trigger("mousewheel");
                        },
                        unmousewheel: function (a) {
                            return this.unbind("mousewheel", a);
                        },
                    });
                }),
                b.define(
                    "jquery.select2",
                    [
                        "jquery",
                        "jquery-mousewheel",
                        "./select2/core",
                        "./select2/defaults",
                    ],
                    function (a, b, c, d) {
                        if (null == a.fn.select2) {
                            var e = ["open", "close", "destroy"];
                            a.fn.select2 = function (b) {
                                if ("object" == typeof (b = b || {}))
                                    return (
                                        this.each(function () {
                                            var d = a.extend(!0, {}, b);
                                            new c(a(this), d);
                                        }),
                                        this
                                    );
                                if ("string" == typeof b) {
                                    var d,
                                        f = Array.prototype.slice.call(
                                            arguments,
                                            1
                                        );
                                    return (
                                        this.each(function () {
                                            var c = a(this).data("select2");
                                            null == c &&
                                                window.console &&
                                                console.error &&
                                                console.error(
                                                    "The select2('" +
                                                        b +
                                                        "') method was called on an element that is not using Select2."
                                                ),
                                                (d = c[b].apply(c, f));
                                        }),
                                        a.inArray(b, e) > -1 ? this : d
                                    );
                                }
                                throw new Error(
                                    "Invalid arguments for Select2: " + b
                                );
                            };
                        }
                        return (
                            null == a.fn.select2.defaults &&
                                (a.fn.select2.defaults = d),
                            c
                        );
                    }
                ),
                { define: b.define, require: b.require }
            );
        })(),
        c = b.require("jquery.select2");
    return (a.fn.select2.amd = b), c;
});

!(function (t) {
    var e = window;
    Object.keys ||
        (Object.keys = (function () {
            "use strict";
            var t = Object.prototype.hasOwnProperty,
                e = !{ toString: null }.propertyIsEnumerable("toString"),
                a = [
                    "toString",
                    "toLocaleString",
                    "valueOf",
                    "hasOwnProperty",
                    "isPrototypeOf",
                    "propertyIsEnumerable",
                    "constructor",
                ],
                i = a.length;
            return function (s) {
                if (
                    "object" != typeof s &&
                    ("function" != typeof s || null === s)
                )
                    throw new TypeError("Object.keys called on non-object");
                var n,
                    r,
                    o = [];
                for (n in s) t.call(s, n) && o.push(n);
                if (e) for (r = 0; r < i; r++) t.call(s, a[r]) && o.push(a[r]);
                return o;
            };
        })());
    var a = !1;
    location.hash;
    var i = ["Days", "Hours", "Minutes", "Seconds"],
        s = {
            Seconds: "Minutes",
            Minutes: "Hours",
            Hours: "Days",
            Days: "Years",
        },
        n = {
            Seconds: 1,
            Minutes: 60,
            Hours: 3600,
            Days: 86400,
            Months: 2678400,
            Years: 31536e3,
        };
    function r() {
        return Math.floor(65536 * (1 + Math.random()))
            .toString(16)
            .substring(1);
    }
    function o(t, e, a, i, s) {
        for (
            var r = {}, o = {}, h = {}, d = {}, u = {}, l = {}, c = null, f = 0;
            f < i.length;
            f++
        ) {
            var m,
                p = i[f];
            m = null === c ? a / n[p] : n[c] / n[p];
            var _ = t / n[p],
                b = e / n[p];
            s &&
                ((_ = _ > 0 ? Math.floor(_) : Math.ceil(_)),
                (b = b > 0 ? Math.floor(b) : Math.ceil(b))),
                "Days" !== p && ((_ %= m), (b %= m)),
                (r[p] = _),
                (h[p] = Math.abs(_)),
                (o[p] = b),
                (l[p] = Math.abs(b)),
                (d[p] = Math.abs(_) / m),
                (u[p] = Math.abs(b) / m),
                (c = p);
        }
        return {
            raw_time: r,
            raw_old_time: o,
            time: h,
            old_time: l,
            pct: d,
            old_pct: u,
        };
    }
    Array.prototype.indexOf ||
        (Array.prototype.indexOf = function (t) {
            var e = this.length >>> 0,
                a = Number(arguments[1]) || 0;
            for (
                (a = a < 0 ? Math.ceil(a) : Math.floor(a)) < 0 && (a += e);
                a < e;
                a++
            )
                if (a in this && this[a] === t) return a;
            return -1;
        });
    var h = {};
    function d() {
        void 0 !== e.TC_Instance_List
            ? (h = e.TC_Instance_List)
            : (e.TC_Instance_List = h),
            (function (t) {
                for (
                    var e = ["webkit", "moz"], a = 0;
                    a < e.length && !t.requestAnimationFrame;
                    ++a
                )
                    (t.requestAnimationFrame =
                        t[e[a] + "RequestAnimationFrame"]),
                        (t.cancelAnimationFrame =
                            t[e[a] + "CancelAnimationFrame"]);
                (t.requestAnimationFrame && t.cancelAnimationFrame) ||
                    ((t.requestAnimationFrame = function (e, a, i) {
                        void 0 === i && (i = { data: { last_frame: 0 } });
                        var s = new Date().getTime(),
                            n = Math.max(0, 16 - (s - i.data.last_frame)),
                            r = t.setTimeout(function () {
                                e(s + n);
                            }, n);
                        return (i.data.last_frame = s + n), r;
                    }),
                    (t.cancelAnimationFrame = function (t) {
                        clearTimeout(t);
                    }));
            })(e);
    }
    var u = function (t, e) {
        (this.element = t),
            this.container,
            (this.listeners = null),
            (this.data = {
                paused: !1,
                last_frame: 0,
                animation_frame: null,
                interval_fallback: null,
                timer: !1,
                total_duration: null,
                prev_time: null,
                drawn_units: [],
                text_elements: {
                    Days: null,
                    Hours: null,
                    Minutes: null,
                    Seconds: null,
                },
                attributes: {
                    canvas: null,
                    context: null,
                    item_size: null,
                    line_width: null,
                    radius: null,
                    outer_radius: null,
                },
                state: {
                    fading: { Days: !1, Hours: !1, Minutes: !1, Seconds: !1 },
                },
            }),
            (this.config = null),
            this.setOptions(e),
            this.initialize();
    };
    (u.prototype.clearListeners = function () {
        this.listeners = { all: [], visible: [] };
    }),
        (u.prototype.addTime = function (t) {
            if (this.data.attributes.ref_date instanceof Date) {
                var e = this.data.attributes.ref_date;
                e.setSeconds(e.getSeconds() + t);
            } else
                isNaN(this.data.attributes.ref_date) ||
                    (this.data.attributes.ref_date += 1e3 * t);
        }),
        (u.prototype.initialize = function (i) {
            this.data.drawn_units = [];
            for (var s = 0; s < Object.keys(this.config.time).length; s++) {
                var n = Object.keys(this.config.time)[s];
                this.config.time[n].show && this.data.drawn_units.push(n);
            }
            t(this.element).children("div.time_circles").remove(),
                void 0 === i && (i = !0),
                (i || null === this.listeners) && this.clearListeners(),
                (this.container = t("<div>")),
                this.container.addClass("time_circles"),
                this.container.appendTo(this.element);
            var r = this.element.offsetHeight,
                o = this.element.offsetWidth;
            0 === r && (r = t(this.element).height()),
                0 === o && (o = t(this.element).width()),
                0 === r && o > 0
                    ? (r = o / this.data.drawn_units.length)
                    : 0 === o &&
                      r > 0 &&
                      (o = r * this.data.drawn_units.length);
            var h = document.createElement("canvas");
            (h.width = o),
                (h.height = r),
                (this.data.attributes.canvas = t(h)),
                this.data.attributes.canvas.appendTo(this.container);
            var d,
                u = !(
                    !(d = document.createElement("canvas")).getContext ||
                    !d.getContext("2d")
                );
            u ||
                "undefined" == typeof G_vmlCanvasManager ||
                (G_vmlCanvasManager.initElement(h), (a = !0), (u = !0)),
                u && (this.data.attributes.context = h.getContext("2d")),
                (this.data.attributes.item_size = Math.min(
                    o / this.data.drawn_units.length,
                    r
                )),
                (this.data.attributes.line_width =
                    this.data.attributes.item_size * this.config.fg_width),
                (this.data.attributes.radius =
                    (0.8 * this.data.attributes.item_size -
                        this.data.attributes.line_width) /
                    2),
                (this.data.attributes.outer_radius =
                    this.data.attributes.radius +
                    0.5 *
                        Math.max(
                            this.data.attributes.line_width,
                            this.data.attributes.line_width *
                                this.config.bg_width
                        ));
            s = 0;
            for (var l in this.data.text_elements)
                if (this.config.time[l].show) {
                    var c = t("<div>");
                    c.addClass("textDiv_" + l),
                        c.css(
                            "top",
                            Math.round(0.35 * this.data.attributes.item_size)
                        ),
                        c.css(
                            "left",
                            Math.round(s++ * this.data.attributes.item_size)
                        ),
                        c.css("width", this.data.attributes.item_size),
                        c.appendTo(this.container);
                    var f = t("<h4>");
                    f.text(this.config.time[l].text),
                        f.css(
                            "font-size",
                            Math.round(
                                this.config.text_size *
                                    this.data.attributes.item_size
                            )
                        ),
                        f.appendTo(c);
                    var m = t("<span>");
                    m.css(
                        "font-size",
                        Math.round(
                            this.config.number_size *
                                this.data.attributes.item_size
                        )
                    ),
                        m.appendTo(c),
                        (this.data.text_elements[l] = m);
                }
            this.start(), this.config.start || (this.data.paused = !0);
            var p = this;
            this.data.interval_fallback = e.setInterval(function () {
                p.update.call(p, !0);
            }, 100);
        }),
        (u.prototype.update = function (t) {
            if (void 0 === t) t = !1;
            else if (t && this.data.paused) return;
            var s, r;
            a &&
                this.data.attributes.context.clearRect(
                    0,
                    0,
                    this.data.attributes.canvas[0].width,
                    this.data.attributes.canvas[0].hright
                );
            var h = this.data.prev_time,
                d = new Date();
            if (
                ((this.data.prev_time = d),
                null === h && (h = d),
                !this.config.count_past_zero &&
                    d > this.data.attributes.ref_date)
            ) {
                for (var u = 0; u < this.data.drawn_units.length; u++) {
                    var l = this.data.drawn_units[u];
                    this.data.text_elements[l].text("0");
                    var c =
                            u * this.data.attributes.item_size +
                            this.data.attributes.item_size / 2,
                        f = this.data.attributes.item_size / 2,
                        m = this.config.time[l].color;
                    this.drawArc(c, f, m, 0);
                }
                this.stop();
            } else {
                (s = (this.data.attributes.ref_date - d) / 1e3),
                    (r = (this.data.attributes.ref_date - h) / 1e3);
                var p = "smooth" !== this.config.animation,
                    _ = o(
                        s,
                        r,
                        this.data.total_duration,
                        this.data.drawn_units,
                        p
                    ),
                    b = o(s, r, n.Years, i, p),
                    v = ((u = 0), 0),
                    g = null,
                    y = this.data.drawn_units.slice();
                for (var u in i) {
                    l = i[u];
                    if (
                        (Math.floor(b.raw_time[l]) !==
                            Math.floor(b.raw_old_time[l]) &&
                            this.notifyListeners(
                                l,
                                Math.floor(b.time[l]),
                                Math.floor(s),
                                "all"
                            ),
                        !(y.indexOf(l) < 0))
                    ) {
                        if (
                            (Math.floor(_.raw_time[l]) !==
                                Math.floor(_.raw_old_time[l]) &&
                                this.notifyListeners(
                                    l,
                                    Math.floor(_.time[l]),
                                    Math.floor(s),
                                    "visible"
                                ),
                            !t)
                        ) {
                            this.data.text_elements[l].text(
                                Math.floor(Math.abs(_.time[l]))
                            );
                            (c =
                                v * this.data.attributes.item_size +
                                this.data.attributes.item_size / 2),
                                (f = this.data.attributes.item_size / 2),
                                (m = this.config.time[l].color);
                            "smooth" === this.config.animation
                                ? (null === g ||
                                      a ||
                                      (Math.floor(_.time[g]) >
                                      Math.floor(_.old_time[g])
                                          ? (this.radialFade(c, f, m, 1, l),
                                            (this.data.state.fading[l] = !0))
                                          : Math.floor(_.time[g]) <
                                                Math.floor(_.old_time[g]) &&
                                            (this.radialFade(c, f, m, 0, l),
                                            (this.data.state.fading[l] = !0))),
                                  this.data.state.fading[l] ||
                                      this.drawArc(c, f, m, _.pct[l]))
                                : this.animateArc(
                                      c,
                                      f,
                                      m,
                                      _.pct[l],
                                      _.old_pct[l],
                                      new Date().getTime() + 200
                                  );
                        }
                        (g = l), v++;
                    }
                }
                if (!this.data.paused && !t) {
                    var w = this,
                        M = function () {
                            w.update.call(w);
                        };
                    if ("smooth" === this.config.animation)
                        this.data.animation_frame = e.requestAnimationFrame(
                            M,
                            w.element,
                            w
                        );
                    else {
                        var x = (s % 1) * 1e3;
                        x < 0 && (x = 1e3 + x),
                            (x += 50),
                            (w.data.animation_frame = e.setTimeout(function () {
                                w.data.animation_frame =
                                    e.requestAnimationFrame(M, w.element, w);
                            }, x));
                    }
                }
            }
        }),
        (u.prototype.animateArc = function (t, a, i, s, n, r) {
            if (null !== this.data.attributes.context) {
                var o = n - s;
                if (Math.abs(o) > 0.5)
                    0 === s
                        ? this.radialFade(t, a, i, 1)
                        : this.radialFade(t, a, i, 0);
                else {
                    var h = (200 - (r - new Date().getTime())) / 200;
                    h > 1 && (h = 1);
                    var d = n * (1 - h) + s * h;
                    if ((this.drawArc(t, a, i, d), h >= 1)) return;
                    var u = this;
                    e.requestAnimationFrame(function () {
                        u.animateArc(t, a, i, s, n, r);
                    }, this.element);
                }
            }
        }),
        (u.prototype.drawArc = function (t, e, i, s) {
            if (null !== this.data.attributes.context) {
                var n,
                    r,
                    o,
                    h = Math.max(
                        this.data.attributes.outer_radius,
                        this.data.attributes.item_size / 2
                    );
                a ||
                    this.data.attributes.context.clearRect(
                        t - h,
                        e - h,
                        2 * h,
                        2 * h
                    ),
                    this.config.use_background &&
                        (this.data.attributes.context.beginPath(),
                        this.data.attributes.context.arc(
                            t,
                            e,
                            this.data.attributes.radius,
                            0,
                            2 * Math.PI,
                            !1
                        ),
                        (this.data.attributes.context.lineWidth =
                            this.data.attributes.line_width *
                            this.config.bg_width),
                        (this.data.attributes.context.strokeStyle =
                            this.config.circle_bg_color),
                        this.data.attributes.context.stroke());
                var d = -0.5 * Math.PI,
                    u = 2 * Math.PI;
                n = d + (this.config.start_angle / 360) * u;
                var l = 2 * s * Math.PI;
                "Both" === this.config.direction
                    ? ((o = !1), (r = (n -= l / 2) + l))
                    : "Clockwise" === this.config.direction
                    ? ((o = !1), (r = n + l))
                    : ((o = !0), (r = n - l)),
                    this.data.attributes.context.beginPath(),
                    this.data.attributes.context.arc(
                        t,
                        e,
                        this.data.attributes.radius,
                        n,
                        r,
                        o
                    ),
                    (this.data.attributes.context.lineWidth =
                        this.data.attributes.line_width),
                    (this.data.attributes.context.strokeStyle = i),
                    this.data.attributes.context.stroke();
            }
        }),
        (u.prototype.radialFade = function (t, a, i, s, n) {
            var r = (function (t) {
                var e = /^rgba?\(([\d]+),([\d]+),([\d]+)(,([\d\.]+))?\)$/;
                if (e.test(t)) {
                    var a = e.exec(t);
                    return {
                        r: parseInt(a[1]),
                        g: parseInt(a[2]),
                        b: parseInt(a[3]),
                        a: parseInt(a[5] ? a[5] : 1),
                    };
                }
                return (
                    (t = t.replace(
                        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                        function (t, e, a, i) {
                            return e + e + a + a + i + i;
                        }
                    )),
                    (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t))
                        ? {
                              r: parseInt(a[1], 16),
                              g: parseInt(a[2], 16),
                              b: parseInt(a[3], 16),
                          }
                        : null
                );
            })(i);
            if (r) {
                var o,
                    h = this,
                    d = 0.2 * (1 === s ? -1 : 1);
                for (o = 0; s <= 1 && s >= 0; o++)
                    !(function () {
                        var i = 50 * o,
                            n =
                                "rgba(" +
                                r.r +
                                ", " +
                                r.g +
                                ", " +
                                r.b +
                                ", " +
                                Math.round(10 * s) / 10 +
                                ")";
                        e.setTimeout(function () {
                            h.drawArc(t, a, n, 1);
                        }, i);
                    })(),
                        (s += d);
                void 0 !== typeof n &&
                    e.setTimeout(function () {
                        h.data.state.fading[n] = !1;
                    }, 50 * o);
            }
        }),
        (u.prototype.timeLeft = function () {
            if (this.data.paused && "number" == typeof this.data.timer)
                return this.data.timer;
            var t = new Date();
            return (this.data.attributes.ref_date - t) / 1e3;
        }),
        (u.prototype.start = function () {
            e.cancelAnimationFrame(this.data.animation_frame),
                e.clearTimeout(this.data.animation_frame);
            var a = t(this.element).data("date");
            if (
                (void 0 === a && (a = t(this.element).attr("data-date")),
                "string" == typeof a)
            )
                this.data.attributes.ref_date = (function (t) {
                    var e = t.match(
                        /^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/
                    );
                    if (null !== e && e.length > 0) {
                        var a = t.split(" "),
                            i = a[0].split("-"),
                            s = a[1].split(":");
                        return new Date(i[0], i[1] - 1, i[2], s[0], s[1], s[2]);
                    }
                    var n = Date.parse(t);
                    return isNaN(n)
                        ? ((n = Date.parse(
                              t.replace(/-/g, "/").replace("T", " ")
                          )),
                          isNaN(n) ? new Date() : n)
                        : n;
                })(a);
            else if ("number" == typeof this.data.timer)
                this.data.paused &&
                    (this.data.attributes.ref_date =
                        new Date().getTime() + 1e3 * this.data.timer);
            else {
                var i = t(this.element).data("timer");
                void 0 === i && (i = t(this.element).attr("data-timer")),
                    "string" == typeof i && (i = parseFloat(i)),
                    "number" == typeof i
                        ? ((this.data.timer = i),
                          (this.data.attributes.ref_date =
                              new Date().getTime() + 1e3 * i))
                        : (this.data.attributes.ref_date =
                              this.config.ref_date);
            }
            (this.data.paused = !1), this.update.call(this);
        }),
        (u.prototype.restart = function () {
            (this.data.timer = !1), this.start();
        }),
        (u.prototype.stop = function () {
            "number" == typeof this.data.timer &&
                (this.data.timer = this.timeLeft(this)),
                (this.data.paused = !0),
                e.cancelAnimationFrame(this.data.animation_frame);
        }),
        (u.prototype.destroy = function () {
            this.clearListeners(),
                this.stop(),
                e.clearInterval(this.data.interval_fallback),
                (this.data.interval_fallback = null),
                this.container.remove(),
                t(this.element).removeAttr("data-tc-id"),
                t(this.element).removeData("tc-id");
        }),
        (u.prototype.setOptions = function (a) {
            if (
                (null === this.config &&
                    ((this.default_options.ref_date = new Date()),
                    (this.config = t.extend(!0, {}, this.default_options))),
                t.extend(!0, this.config, a),
                (e = this.config.use_top_frame ? window.top : window),
                d(),
                (this.data.total_duration = this.config.total_duration),
                "string" == typeof this.data.total_duration)
            )
                if (void 0 !== n[this.data.total_duration])
                    this.data.total_duration = n[this.data.total_duration];
                else if ("Auto" === this.data.total_duration)
                    for (
                        var i = 0;
                        i < Object.keys(this.config.time).length;
                        i++
                    ) {
                        var r = Object.keys(this.config.time)[i];
                        if (this.config.time[r].show) {
                            this.data.total_duration = n[s[r]];
                            break;
                        }
                    }
                else
                    (this.data.total_duration = n.Years),
                        console.error(
                            "Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto"
                        );
        }),
        (u.prototype.addListener = function (t, e, a) {
            "function" == typeof t &&
                (void 0 === a && (a = "visible"),
                this.listeners[a].push({ func: t, scope: e }));
        }),
        (u.prototype.notifyListeners = function (t, e, a, i) {
            for (var s = 0; s < this.listeners[i].length; s++) {
                var n = this.listeners[i][s];
                n.func.apply(n.scope, [t, e, a]);
            }
        }),
        (u.prototype.default_options = {
            ref_date: new Date(),
            start: !0,
            animation: "smooth",
            count_past_zero: !0,
            circle_bg_color: "#60686F",
            use_background: !0,
            fg_width: 0.1,
            bg_width: 1.2,
            text_size: 0.07,
            number_size: 0.28,
            total_duration: "Auto",
            direction: "Clockwise",
            use_top_frame: !1,
            start_angle: 0,
            time: {
                Days: { show: !0, text: "Days", color: "#FC6" },
                Hours: { show: !0, text: "Hours", color: "#9CF" },
                Minutes: { show: !0, text: "Minutes", color: "#BFB" },
                Seconds: { show: !0, text: "Seconds", color: "#F99" },
            },
        });
    var l = function (t, e) {
        (this.elements = t), (this.options = e), this.foreach();
    };
    (l.prototype.getInstance = function (e) {
        var a,
            i = t(e).data("tc-id");
        if (
            (void 0 === i &&
                ((i =
                    r() +
                    r() +
                    "-" +
                    r() +
                    "-" +
                    r() +
                    "-" +
                    r() +
                    "-" +
                    r() +
                    r() +
                    r()),
                t(e).attr("data-tc-id", i)),
            void 0 === h[i])
        ) {
            var s = this.options,
                n = t(e).data("options");
            "string" == typeof n && (n = JSON.parse(n)),
                "object" == typeof n && (s = t.extend(!0, {}, this.options, n)),
                (a = new u(e, s)),
                (h[i] = a);
        } else
            (a = h[i]), void 0 !== this.options && a.setOptions(this.options);
        return a;
    }),
        (l.prototype.addTime = function (t) {
            this.foreach(function (e) {
                e.addTime(t);
            });
        }),
        (l.prototype.foreach = function (t) {
            var e = this;
            return (
                this.elements.each(function () {
                    var a = e.getInstance(this);
                    "function" == typeof t && t(a);
                }),
                this
            );
        }),
        (l.prototype.start = function () {
            return (
                this.foreach(function (t) {
                    t.start();
                }),
                this
            );
        }),
        (l.prototype.stop = function () {
            return (
                this.foreach(function (t) {
                    t.stop();
                }),
                this
            );
        }),
        (l.prototype.restart = function () {
            return (
                this.foreach(function (t) {
                    t.restart();
                }),
                this
            );
        }),
        (l.prototype.rebuild = function () {
            return (
                this.foreach(function (t) {
                    t.initialize(!1);
                }),
                this
            );
        }),
        (l.prototype.getTime = function () {
            return this.getInstance(this.elements[0]).timeLeft();
        }),
        (l.prototype.addListener = function (t, e) {
            void 0 === e && (e = "visible");
            var a = this;
            return (
                this.foreach(function (i) {
                    i.addListener(t, a.elements, e);
                }),
                this
            );
        }),
        (l.prototype.destroy = function () {
            return (
                this.foreach(function (t) {
                    t.destroy();
                }),
                this
            );
        }),
        (l.prototype.end = function () {
            return this.elements;
        }),
        (t.fn.TimeCircles = function (t) {
            return new l(this, t);
        });
})(jQuery);

/*! smooth-scroll v10.0.1 | (c) 2016 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
!(function (e, t) {
    "function" == typeof define && define.amd
        ? define([], t(e))
        : "object" == typeof exports
        ? (module.exports = t(e))
        : (e.smoothScroll = t(e));
})(
    "undefined" != typeof global ? global : this.window || this.global,
    function (e) {
        "use strict";
        var t,
            n,
            o,
            r,
            a,
            i,
            u,
            c = {},
            l = "querySelector" in document && "addEventListener" in e,
            s = {
                selector: "[data-scroll]",
                selectorHeader: null,
                speed: 500,
                easing: "easeInOutCubic",
                offset: 0,
                callback: function () {},
            },
            f = function () {
                var e = {},
                    t = !1,
                    n = 0,
                    o = arguments.length;
                "[object Boolean]" ===
                    Object.prototype.toString.call(arguments[0]) &&
                    ((t = arguments[0]), n++);
                for (
                    var r = function (n) {
                        for (var o in n)
                            Object.prototype.hasOwnProperty.call(n, o) &&
                                (t &&
                                "[object Object]" ===
                                    Object.prototype.toString.call(n[o])
                                    ? (e[o] = f(!0, e[o], n[o]))
                                    : (e[o] = n[o]));
                    };
                    o > n;
                    n++
                ) {
                    var a = arguments[n];
                    r(a);
                }
                return e;
            },
            d = function (e) {
                return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight);
            },
            h = function (e, t) {
                var n,
                    o,
                    r = t.charAt(0),
                    a = "classList" in document.documentElement;
                for (
                    "[" === r &&
                    ((t = t.substr(1, t.length - 2)),
                    (n = t.split("=")),
                    n.length > 1 &&
                        ((o = !0),
                        (n[1] = n[1].replace(/"/g, "").replace(/'/g, ""))));
                    e && e !== document && 1 === e.nodeType;
                    e = e.parentNode
                ) {
                    if ("." === r)
                        if (a) {
                            if (e.classList.contains(t.substr(1))) return e;
                        } else if (
                            new RegExp(
                                "(^|\\s)" + t.substr(1) + "(\\s|$)"
                            ).test(e.className)
                        )
                            return e;
                    if ("#" === r && e.id === t.substr(1)) return e;
                    if ("[" === r && e.hasAttribute(n[0])) {
                        if (!o) return e;
                        if (e.getAttribute(n[0]) === n[1]) return e;
                    }
                    if (e.tagName.toLowerCase() === t) return e;
                }
                return null;
            },
            m = function (e) {
                "#" === e.charAt(0) && (e = e.substr(1));
                for (
                    var t,
                        n = String(e),
                        o = n.length,
                        r = -1,
                        a = "",
                        i = n.charCodeAt(0);
                    ++r < o;

                ) {
                    if (((t = n.charCodeAt(r)), 0 === t))
                        throw new InvalidCharacterError(
                            "Invalid character: the input contains U+0000."
                        );
                    a +=
                        (t >= 1 && 31 >= t) ||
                        127 == t ||
                        (0 === r && t >= 48 && 57 >= t) ||
                        (1 === r && t >= 48 && 57 >= t && 45 === i)
                            ? "\\" + t.toString(16) + " "
                            : t >= 128 ||
                              45 === t ||
                              95 === t ||
                              (t >= 48 && 57 >= t) ||
                              (t >= 65 && 90 >= t) ||
                              (t >= 97 && 122 >= t)
                            ? n.charAt(r)
                            : "\\" + n.charAt(r);
                }
                return "#" + a;
            },
            g = function (e, t) {
                var n;
                return (
                    "easeInQuad" === e && (n = t * t),
                    "easeOutQuad" === e && (n = t * (2 - t)),
                    "easeInOutQuad" === e &&
                        (n = 0.5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t),
                    "easeInCubic" === e && (n = t * t * t),
                    "easeOutCubic" === e && (n = --t * t * t + 1),
                    "easeInOutCubic" === e &&
                        (n =
                            0.5 > t
                                ? 4 * t * t * t
                                : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
                    "easeInQuart" === e && (n = t * t * t * t),
                    "easeOutQuart" === e && (n = 1 - --t * t * t * t),
                    "easeInOutQuart" === e &&
                        (n =
                            0.5 > t
                                ? 8 * t * t * t * t
                                : 1 - 8 * --t * t * t * t),
                    "easeInQuint" === e && (n = t * t * t * t * t),
                    "easeOutQuint" === e && (n = 1 + --t * t * t * t * t),
                    "easeInOutQuint" === e &&
                        (n =
                            0.5 > t
                                ? 16 * t * t * t * t * t
                                : 1 + 16 * --t * t * t * t * t),
                    n || t
                );
            },
            p = function (e, t, n) {
                var o = 0;
                if (e.offsetParent)
                    do (o += e.offsetTop), (e = e.offsetParent);
                    while (e);
                return (o = Math.max(o - t - n, 0)), Math.min(o, v() - b());
            },
            b = function () {
                return Math.max(
                    document.documentElement.clientHeight,
                    e.innerHeight || 0
                );
            },
            v = function () {
                return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                );
            },
            y = function (e) {
                return e &&
                    "object" == typeof JSON &&
                    "function" == typeof JSON.parse
                    ? JSON.parse(e)
                    : {};
            },
            O = function (e) {
                return e ? d(e) + e.offsetTop : 0;
            },
            H = function (t, n, o) {
                o ||
                    (t.focus(),
                    document.activeElement.id !== t.id &&
                        (t.setAttribute("tabindex", "-1"),
                        t.focus(),
                        (t.style.outline = "none")),
                    e.scrollTo(0, n));
            };
        c.animateScroll = function (n, o, i) {
            var c = y(o ? o.getAttribute("data-options") : null),
                l = f(t || s, i || {}, c),
                d =
                    "[object Number]" === Object.prototype.toString.call(n)
                        ? !0
                        : !1,
                h = d || !n.tagName ? null : n;
            if (d || h) {
                var m = e.pageYOffset;
                l.selectorHeader &&
                    !r &&
                    (r = document.querySelector(l.selectorHeader)),
                    a || (a = O(r));
                var b,
                    I,
                    S = d ? n : p(h, a, parseInt(l.offset, 10)),
                    E = S - m,
                    A = v(),
                    j = 0,
                    L = function (t, r, a) {
                        var i = e.pageYOffset;
                        (t == r || i == r || e.innerHeight + i >= A) &&
                            (clearInterval(a), H(n, r, d), l.callback(n, o));
                    },
                    w = function () {
                        (j += 16),
                            (b = j / parseInt(l.speed, 10)),
                            (b = b > 1 ? 1 : b),
                            (I = m + E * g(l.easing, b)),
                            e.scrollTo(0, Math.floor(I)),
                            L(I, S, u);
                    },
                    C = function () {
                        clearInterval(u), (u = setInterval(w, 16));
                    };
                0 === e.pageYOffset && e.scrollTo(0, 0), C();
            }
        };
        var I = function (t) {
                e.location.hash;
                n &&
                    ((n.id = n.getAttribute("data-scroll-id")),
                    c.animateScroll(n, o),
                    (n = null),
                    (o = null));
            },
            S = function (r) {
                if (
                    0 === r.button &&
                    !r.metaKey &&
                    !r.ctrlKey &&
                    ((o = h(r.target, t.selector)),
                    o &&
                        "a" === o.tagName.toLowerCase() &&
                        o.hostname === e.location.hostname &&
                        o.pathname === e.location.pathname &&
                        /#/.test(o.href))
                ) {
                    var a = m(o.hash);
                    if ("#" === a) {
                        r.preventDefault(), (n = document.body);
                        var i = n.id ? n.id : "smooth-scroll-top";
                        return (
                            n.setAttribute("data-scroll-id", i),
                            (n.id = ""),
                            void (e.location.hash.substring(1) === i
                                ? I()
                                : (e.location.hash = i))
                        );
                    }
                    (n = document.querySelector(a)),
                        n &&
                            (n.setAttribute("data-scroll-id", n.id),
                            (n.id = ""),
                            o.hash === e.location.hash &&
                                (r.preventDefault(), I()));
                }
            },
            E = function (e) {
                i ||
                    (i = setTimeout(function () {
                        (i = null), (a = O(r));
                    }, 66));
            };
        return (
            (c.destroy = function () {
                t &&
                    (document.removeEventListener("click", S, !1),
                    e.removeEventListener("resize", E, !1),
                    (t = null),
                    (n = null),
                    (o = null),
                    (r = null),
                    (a = null),
                    (i = null),
                    (u = null));
            }),
            (c.init = function (n) {
                l &&
                    (c.destroy(),
                    (t = f(s, n || {})),
                    (r = t.selectorHeader
                        ? document.querySelector(t.selectorHeader)
                        : null),
                    (a = O(r)),
                    document.addEventListener("click", S, !1),
                    e.addEventListener("hashchange", I, !1),
                    r && e.addEventListener("resize", E, !1));
            }),
            c
        );
    }
);

/**
 * segment - A little JavaScript class (without dependencies) to draw and animate SVG path strokes
 * @version v0.0.2
 * @link https://github.com/lmgonzalves/segment
 * @license MIT
 */
function Segment(t, e, n) {
    (this.path = t),
        (this.length = t.getTotalLength()),
        (this.path.style.strokeDashoffset = 2 * this.length),
        (this.begin = e ? this.valueOf(e) : 0),
        (this.end = n ? this.valueOf(n) : this.length),
        (this.timer = null),
        this.draw(this.begin, this.end);
}
Segment.prototype = {
    draw: function (t, e, n, i) {
        if (n) {
            var s = i.hasOwnProperty("delay") ? 1e3 * parseFloat(i.delay) : 0,
                a = i.hasOwnProperty("easing") ? i.easing : null,
                h = i.hasOwnProperty("callback") ? i.callback : null,
                r = this;
            if ((this.stop(), s))
                return (
                    delete i.delay,
                    (this.timer = setTimeout(function () {
                        r.draw(t, e, n, i);
                    }, s)),
                    this.timer
                );
            var l = new Date(),
                o = 1e3 / 60,
                g = this.begin,
                f = this.end,
                u = this.valueOf(t),
                d = this.valueOf(e);
            !(function p() {
                var t = new Date(),
                    e = (t - l) / 1e3,
                    i = e / parseFloat(n),
                    s = i;
                return (
                    "function" == typeof a && (s = a(s)),
                    i > 1 ? (r.stop(), (s = 1)) : (r.timer = setTimeout(p, o)),
                    (r.begin = g + (u - g) * s),
                    (r.end = f + (d - f) * s),
                    r.begin < 0 && (r.begin = 0),
                    r.end > r.length && (r.end = r.length),
                    r.begin < r.end
                        ? r.draw(r.begin, r.end)
                        : r.draw(
                              r.begin + (r.end - r.begin),
                              r.end - (r.end - r.begin)
                          ),
                    i > 1 && "function" == typeof h ? h.call(r.context) : void 0
                );
            })();
        } else this.path.style.strokeDasharray = this.strokeDasharray(t, e);
    },
    strokeDasharray: function (t, e) {
        return (
            (this.begin = this.valueOf(t)),
            (this.end = this.valueOf(e)),
            [this.length, this.length + this.begin, this.end - this.begin].join(
                " "
            )
        );
    },
    valueOf: function (t) {
        var e = parseFloat(t);
        if (("string" == typeof t || t instanceof String) && ~t.indexOf("%")) {
            var n;
            ~t.indexOf("+")
                ? ((n = t.split("+")),
                  (e = this.percent(n[0]) + parseFloat(n[1])))
                : ~t.indexOf("-")
                ? ((n = t.split("-")),
                  (e = this.percent(n[0]) - parseFloat(n[1])))
                : (e = this.percent(t));
        }
        return e;
    },
    stop: function () {
        clearTimeout(this.timer), (this.timer = null);
    },
    percent: function (t) {
        return (parseFloat(t) / 100) * this.length;
    },
};

!(function (n, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? t(exports)
        : "function" == typeof define && define.amd
        ? define(["exports"], t)
        : t((n.ease = {}));
})(this, function (n) {
    "use strict";
    function t(n, t) {
        return null == n || isNaN(n) ? t : +n;
    }
    function u(n, u) {
        (n = Math.max(1, t(n, 1))), (u = t(u, 0.3) * A);
        var i = u * Math.asin(1 / n);
        return function (t) {
            return n * Math.pow(2, 10 * --t) * Math.sin((i - t) / u);
        };
    }
    function i(n, u) {
        (n = Math.max(1, t(n, 1))), (u = t(u, 0.3) * A);
        var i = u * Math.asin(1 / n);
        return function (t) {
            return n * Math.pow(2, -10 * t) * Math.sin((t - i) / u) + 1;
        };
    }
    function r(n, u) {
        (n = Math.max(1, t(n, 1))), (u = 1.5 * t(u, 0.3) * A);
        var i = u * Math.asin(1 / n);
        return function (t) {
            return (
                (n *
                    ((t = 2 * t - 1) < 0
                        ? Math.pow(2, 10 * t) * Math.sin((i - t) / u)
                        : Math.pow(2, -10 * t) * Math.sin((t - i) / u) + 2)) /
                2
            );
        };
    }
    function o(n) {
        return (
            (n = t(n, 1.70158)),
            function (t) {
                return t * t * ((n + 1) * t - n);
            }
        );
    }
    function e(n) {
        return (
            (n = t(n, 1.70158)),
            function (t) {
                return --t * t * ((n + 1) * t + n) + 1;
            }
        );
    }
    function c(n) {
        return (
            (n = 1.525 * t(n, 1.70158)),
            function (t) {
                return (
                    ((t *= 2) < 1
                        ? t * t * ((n + 1) * t - n)
                        : (t -= 2) * t * ((n + 1) * t + n) + 2) / 2
                );
            }
        );
    }
    function a(n) {
        return 1 - f(1 - n);
    }
    function f(n) {
        return B > n
            ? L * n * n
            : D > n
            ? L * (n -= C) * n + E
            : G > n
            ? L * (n -= F) * n + H
            : L * (n -= J) * n + K;
    }
    function h(n) {
        return ((n *= 2) <= 1 ? 1 - f(1 - n) : f(n - 1) + 1) / 2;
    }
    function s(n) {
        return 1 - Math.sqrt(1 - n * n);
    }
    function M(n) {
        return Math.sqrt(1 - --n * n);
    }
    function p(n) {
        return (
            ((n *= 2) <= 1
                ? 1 - Math.sqrt(1 - n * n)
                : Math.sqrt(1 - (n -= 2) * n) + 1) / 2
        );
    }
    function l(n) {
        return Math.pow(2, 10 * n - 10);
    }
    function w(n) {
        return 1 - Math.pow(2, -10 * n);
    }
    function b(n) {
        return (
            ((n *= 2) <= 1
                ? Math.pow(2, 10 * n - 10)
                : 2 - Math.pow(2, 10 - 10 * n)) / 2
        );
    }
    function d(n) {
        return 1 - Math.cos(n * R);
    }
    function y(n) {
        return Math.sin(n * R);
    }
    function x(n) {
        return (1 - Math.cos(Q * n)) / 2;
    }
    function q(n) {
        return n * n * n;
    }
    function k(n) {
        return --n * n * n + 1;
    }
    function m(n) {
        return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
    }
    function v(n) {
        return n * n;
    }
    function P(n) {
        return n * (2 - n);
    }
    function O(n) {
        return ((n *= 2) <= 1 ? n * n : --n * (2 - n) + 1) / 2;
    }
    function g(n) {
        return +n;
    }
    function I(n) {
        return (
            (n = t(n, 3)),
            function (t) {
                return Math.pow(t, n);
            }
        );
    }
    function N(n) {
        return (
            (n = t(n, 3)),
            function (t) {
                return 1 - Math.pow(1 - t, n);
            }
        );
    }
    function j(n) {
        return (
            (n = t(n, 3)),
            function (t) {
                return (
                    ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) /
                    2
                );
            }
        );
    }
    function z(n, t, u) {
        var i = (n += "").indexOf("-");
        return (
            0 > i && (n += "-in"),
            arguments.length > 1 && T.hasOwnProperty(n)
                ? T[n](t, u)
                : S.hasOwnProperty(n)
                ? S[n]
                : g
        );
    }
    var A = 1 / (2 * Math.PI),
        B = 4 / 11,
        C = 6 / 11,
        D = 8 / 11,
        E = 0.75,
        F = 9 / 11,
        G = 10 / 11,
        H = 0.9375,
        J = 21 / 22,
        K = 63 / 64,
        L = 1 / B / B,
        Q = Math.PI,
        R = Q / 2,
        S = {
            "linear-in": g,
            "linear-out": g,
            "linear-in-out": g,
            "quad-in": v,
            "quad-out": P,
            "quad-in-out": O,
            "cubic-in": q,
            "cubic-out": k,
            "cubic-in-out": m,
            "poly-in": q,
            "poly-out": k,
            "poly-in-out": m,
            "sin-in": d,
            "sin-out": y,
            "sin-in-out": x,
            "exp-in": l,
            "exp-out": w,
            "exp-in-out": b,
            "circle-in": s,
            "circle-out": M,
            "circle-in-out": p,
            "bounce-in": a,
            "bounce-out": f,
            "bounce-in-out": h,
            "back-in": o(),
            "back-out": e(),
            "back-in-out": c(),
            "elastic-in": u(),
            "elastic-out": i(),
            "elastic-in-out": r(),
        },
        T = {
            "poly-in": I,
            "poly-out": N,
            "poly-in-out": j,
            "back-in": o,
            "back-out": e,
            "back-in-out": c,
            "elastic-in": u,
            "elastic-out": i,
            "elastic-in-out": r,
        };
    n.ease = z;
});

/**
 * @preserve
 * Sharer.js
 *
 * @description Create your own social share buttons
 * @version 0.3.5
 * @author Ellison Leao <ellisonleao@gmail.com>
 * @license GPLv3
 *
 */

(function (p, r) {
    "use strict";
    var i = function (t) {
        this.elem = t;
    };
    i.init = function () {
        var t = r.querySelectorAll("[data-sharer]"),
            e,
            a = t.length;
        for (e = 0; e < a; e++) {
            t[e].addEventListener("click", i.add);
        }
    };
    i.add = function (t) {
        var e = t.currentTarget || t.srcElement;
        var a = new i(e);
        a.share();
    };
    i.prototype = {
        constructor: i,
        getValue: function (t) {
            var e = this.elem.getAttribute("data-" + t);
            if (!e) return;
            if (t === "hashtag") {
                if (!e.startsWith("#")) {
                    e = "#" + e;
                }
            }
            return e;
        },
        share: function () {
            var t = this.getValue("sharer").toLowerCase(),
                e = {
                    facebook: {
                        shareUrl: "https://www.facebook.com/sharer/sharer.php",
                        params: {
                            u: this.getValue("url"),
                            hashtag: this.getValue("hashtag"),
                        },
                    },
                    linkedin: {
                        shareUrl: "https://www.linkedin.com/shareArticle",
                        params: { url: this.getValue("url"), mini: true },
                    },
                    twitter: {
                        shareUrl: "https://twitter.com/intent/tweet/",
                        params: {
                            text: this.getValue("title"),
                            url: this.getValue("url"),
                            hashtags: this.getValue("hashtags"),
                            via: this.getValue("via"),
                        },
                    },
                    email: {
                        shareUrl: "mailto:" + this.getValue("to"),
                        params: {
                            subject: this.getValue("subject"),
                            body:
                                this.getValue("title") +
                                "\n" +
                                this.getValue("url"),
                        },
                        isLink: true,
                    },
                    whatsapp: {
                        shareUrl: "whatsapp://send",
                        params: {
                            text:
                                this.getValue("title") +
                                " " +
                                this.getValue("url"),
                        },
                        isLink: true,
                    },
                    telegram: {
                        shareUrl: "tg://msg_url",
                        params: {
                            text:
                                this.getValue("title") +
                                " " +
                                this.getValue("url"),
                        },
                        isLink: true,
                    },
                    viber: {
                        shareUrl: "viber://forward",
                        params: {
                            text:
                                this.getValue("title") +
                                " " +
                                this.getValue("url"),
                        },
                        isLink: true,
                    },
                    line: {
                        shareUrl:
                            "http://line.me/R/msg/text/?" +
                            encodeURIComponent(
                                this.getValue("title") +
                                    " " +
                                    this.getValue("url")
                            ),
                        isLink: true,
                    },
                    pinterest: {
                        shareUrl:
                            "https://www.pinterest.com/pin/create/button/",
                        params: {
                            url: this.getValue("url"),
                            media: this.getValue("image"),
                            description: this.getValue("description"),
                        },
                    },
                    tumblr: {
                        shareUrl: "http://tumblr.com/widgets/share/tool",
                        params: {
                            canonicalUrl: this.getValue("url"),
                            content: this.getValue("url"),
                            posttype: "link",
                            title: this.getValue("title"),
                            caption: this.getValue("caption"),
                            tags: this.getValue("tags"),
                        },
                    },
                    hackernews: {
                        shareUrl: "https://news.ycombinator.com/submitlink",
                        params: {
                            u: this.getValue("url"),
                            t: this.getValue("title"),
                        },
                    },
                    reddit: {
                        shareUrl: "https://www.reddit.com/submit",
                        params: { url: this.getValue("url") },
                    },
                    vk: {
                        shareUrl: "http://vk.com/share.php",
                        params: {
                            url: this.getValue("url"),
                            title: this.getValue("title"),
                            description: this.getValue("caption"),
                            image: this.getValue("image"),
                        },
                    },
                    xing: {
                        shareUrl: "https://www.xing.com/app/user",
                        params: {
                            op: "share",
                            url: this.getValue("url"),
                            title: this.getValue("title"),
                        },
                    },
                    buffer: {
                        shareUrl: "https://buffer.com/add",
                        params: {
                            url: this.getValue("url"),
                            title: this.getValue("title"),
                            via: this.getValue("via"),
                            picture: this.getValue("picture"),
                        },
                    },
                    instapaper: {
                        shareUrl: "http://www.instapaper.com/edit",
                        params: {
                            url: this.getValue("url"),
                            title: this.getValue("title"),
                            description: this.getValue("description"),
                        },
                    },
                    pocket: {
                        shareUrl: "https://getpocket.com/save",
                        params: { url: this.getValue("url") },
                    },
                    digg: {
                        shareUrl: "http://www.digg.com/submit",
                        params: { url: this.getValue("url") },
                    },
                    stumbleupon: {
                        shareUrl: "http://www.stumbleupon.com/submit",
                        params: {
                            url: this.getValue("url"),
                            title: this.getValue("title"),
                        },
                    },
                    flipboard: {
                        shareUrl:
                            "https://share.flipboard.com/bookmarklet/popout",
                        params: {
                            v: 2,
                            title: this.getValue("title"),
                            url: this.getValue("url"),
                            t: Date.now(),
                        },
                    },
                    weibo: {
                        shareUrl: "http://service.weibo.com/share/share.php",
                        params: {
                            url: this.getValue("url"),
                            title: this.getValue("title"),
                            pic: this.getValue("image"),
                            appkey: this.getValue("appkey"),
                            ralateUid: this.getValue("ralateuid"),
                            language: "zh_cn",
                        },
                    },
                    renren: {
                        shareUrl: "http://share.renren.com/share/buttonshare",
                        params: { link: this.getValue("url") },
                    },
                    myspace: {
                        shareUrl: "https://myspace.com/post",
                        params: {
                            u: this.getValue("url"),
                            t: this.getValue("title"),
                            c: this.getValue("description"),
                        },
                    },
                    blogger: {
                        shareUrl: "https://www.blogger.com/blog-this.g",
                        params: {
                            u: this.getValue("url"),
                            n: this.getValue("title"),
                            t: this.getValue("description"),
                        },
                    },
                    baidu: {
                        shareUrl: "http://cang.baidu.com/do/add",
                        params: {
                            it: this.getValue("title"),
                            iu: this.getValue("url"),
                        },
                    },
                    douban: {
                        shareUrl: "https://www.douban.com/share/service",
                        params: {
                            name: this.getValue("title"),
                            href: this.getValue("url"),
                            image: this.getValue("image"),
                        },
                    },
                    okru: {
                        shareUrl: "https://connect.ok.ru/dk",
                        params: {
                            "st.cmd": "WidgetSharePreview",
                            "st.shareUrl": this.getValue("url"),
                            title: this.getValue("title"),
                        },
                    },
                    mailru: {
                        shareUrl: "http://connect.mail.ru/share",
                        params: {
                            share_url: this.getValue("url"),
                            linkname: this.getValue("title"),
                            linknote: this.getValue("description"),
                            type: "page",
                        },
                    },
                },
                a = e[t];
            if (a) {
                a.width = this.getValue("width");
                a.height = this.getValue("height");
            }
            return a !== undefined ? this.urlSharer(a) : false;
        },
        urlSharer: function (t) {
            var e = t.params || {},
                a = Object.keys(e),
                r,
                i = a.length > 0 ? "?" : "";
            for (r = 0; r < a.length; r++) {
                if (i !== "?") {
                    i += "&";
                }
                if (e[a[r]]) {
                    i += a[r] + "=" + encodeURIComponent(e[a[r]]);
                }
            }
            t.shareUrl += i;
            if (!t.isLink) {
                var s = t.width || 600,
                    l = t.height || 480,
                    h = p.innerWidth / 2 - s / 2 + p.screenX,
                    u = p.innerHeight / 2 - l / 2 + p.screenY,
                    n =
                        "scrollbars=no, width=" +
                        s +
                        ", height=" +
                        l +
                        ", top=" +
                        u +
                        ", left=" +
                        h,
                    g = p.open(t.shareUrl, "", n);
                if (p.focus) {
                    g.focus();
                }
            } else {
                p.location.href = t.shareUrl;
            }
        },
    };
    if (r.readyState === "complete" || r.readyState !== "loading") {
        i.init();
    } else {
        r.addEventListener("DOMContentLoaded", i.init);
    }
    p.addEventListener("page:load", i.init);
    p.Sharer = i;
})(window, document);
