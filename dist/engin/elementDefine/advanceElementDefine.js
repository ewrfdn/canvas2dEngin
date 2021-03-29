var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./bacicElementDefine"], function (require, exports, bacicElementDefine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    bacicElementDefine_1 = __importDefault(bacicElementDefine_1);
    var barcodeObject = /** @class */ (function (_super) {
        __extends(barcodeObject, _super);
        function barcodeObject(info, offscreenCanvas, canvas) {
            var _this = _super.call(this, info, canvas, offscreenCanvas) || this;
            _this._barcodeText = info.text;
            return _this;
        }
        Object.defineProperty(barcodeObject.prototype, "barcodeText", {
            get: function () {
                return this._barcodeText;
            },
            set: function (val) {
                this._barcodeText = val;
            },
            enumerable: false,
            configurable: true
        });
        barcodeObject.prototype.getBarcodeImage = function () {
        };
        barcodeObject.prototype.beforeDestoryed = function () {
        };
        barcodeObject.prototype.afterDestoryed = function () {
        };
        barcodeObject.prototype.onStep = function () {
        };
        barcodeObject.prototype.created = function () {
        };
        barcodeObject.prototype.onDraw = function (ctx) {
            // JsBarcode(this.offscreenCache.canvas,this.barcodeText)
        };
        return barcodeObject;
    }(bacicElementDefine_1.default.elementObject));
    exports.default = { barcodeObject: barcodeObject };
});
