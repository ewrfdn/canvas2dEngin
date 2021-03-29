var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var elementObject = /** @class */ (function () {
        function elementObject(info, canvas, offscreenCache) {
            this._width = info.w || 100;
            this._height = info.h || 100;
            this.Vx = info.Vx || 0;
            this.Vy = info.Vy || 0;
            this.x = info.x || 0;
            this.y = info.y || 0;
            this.z = info.z || 0;
            this.canvas = canvas;
            this.offscreenCache = offscreenCache;
            this.created();
            this.focused = false;
        }
        Object.defineProperty(elementObject.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(elementObject.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this.offscreenCache.isBuild = false;
                this._height = height;
            },
            enumerable: false,
            configurable: true
        });
        elementObject.prototype.draw = function () {
            if (!this.offscreenCache.isBuild) {
                this.offscreenCache.canvas.width = this.width;
                this.offscreenCache.canvas.height = this.height;
                var ctx = this.offscreenCache.canvas.getContext('2d');
                this.onDraw(ctx);
                this.offscreenCache.isBuild = true;
            }
            if (this.focused) {
                this.canvas.ctx.strokeStyle = "#F00";
                this.canvas.ctx.lineWidth = "2";
                this.canvas.ctx.strokeRect(this.x, this.y, this.width, this.height);
            }
            this.canvas.ctx.drawImage(this.offscreenCache.canvas, this.x, this.y);
        };
        ;
        elementObject.prototype.move = function (dt) {
            this.x += ~~(this.Vx * dt);
            this.y += ~~(this.Vy * dt);
        };
        elementObject.prototype.step = function (dt) {
            // this.watchData()
            this.move(dt);
            this.onStep(dt);
        };
        elementObject.prototype.destoryed = function (elementObj) {
            this.beforeDestoryed(elementObj);
            this.canvas.remove(elementObj);
        };
        return elementObject;
    }());
    var rectangleObject = /** @class */ (function (_super) {
        __extends(rectangleObject, _super);
        function rectangleObject(info, canvas, offScreenCanvas) {
            var _this = _super.call(this, info, canvas, offScreenCanvas) || this;
            _this.TargetLifeCycle = Infinity;
            _this.lifeCycle = 0;
            _this.color = info.color || "rgb(245, 240, 240)";
            return _this;
        }
        rectangleObject.prototype.beforeDestoryed = function () {
        };
        rectangleObject.prototype.afterDestoryed = function () {
        };
        rectangleObject.prototype.created = function () {
        };
        rectangleObject.prototype.onStep = function (dt) {
        };
        rectangleObject.prototype.onDraw = function () {
        };
        return rectangleObject;
    }(elementObject));
    var spriteObject = /** @class */ (function (_super) {
        __extends(spriteObject, _super);
        function spriteObject(info, offscreenCanvas, canvas) {
            var _this = _super.call(this, info, canvas, offscreenCanvas) || this;
            _this.sprite = info.spriteInfo;
            return _this;
        }
        spriteObject.prototype.onDraw = function (ctx) {
            ctx.drawImage(this.sprite.Img, this.sprite.sx, this.sprite.sy, this.sprite.w, this.sprite.h, 0, 0, this.width, this.height);
        };
        spriteObject.prototype.beforeDestoryed = function () {
        };
        spriteObject.prototype.afterDestoryed = function () {
        };
        spriteObject.prototype.created = function () {
        };
        spriteObject.prototype.step = function (dt) {
            this.move(dt);
            this.onStep(dt);
        };
        spriteObject.prototype.onStep = function (dt) {
        };
        return spriteObject;
    }(elementObject));
    var textObject = /** @class */ (function (_super) {
        __extends(textObject, _super);
        function textObject(info, offScreen, canvas) {
            var _this = _super.call(this, info, canvas, offScreen) || this;
            _this._color = info.color || "#000";
            _this._fontFamily = info.fontFamily || "微软雅黑";
            _this._textAlign = info.textAlign || "center";
            _this._fontSize = info.fontSize || 20;
            _this._borderColor = info.borderColor || "#000";
            _this._borderWidth = info.borderWidth || 1;
            _this._text = info.text;
            _this._autoFeed = info.autoFeed || false;
            _this._bordered = info.bordered || false;
            _this._fontWidth = info.fontWidth || 100;
            _this._background = info.background || undefined;
            _this.focused = true;
            return _this;
        }
        Object.defineProperty(textObject.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (color) {
                this._color = color;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(textObject.prototype, "fontSize", {
            get: function () {
                return this._fontSize;
            },
            set: function (fontSize) {
                this._fontSize = fontSize;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(textObject.prototype, "fontFamily", {
            get: function () {
                return this._fontFamily;
            },
            set: function (fontFamily) {
                this._fontFamily = fontFamily;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(textObject.prototype, "borderColor", {
            get: function () {
                return this._borderColor;
            },
            set: function (_borderColor) {
                this._borderColor = _borderColor;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(textObject.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (text) {
                this._text = text;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(textObject.prototype, "bordered", {
            get: function () {
                return this._bordered;
            },
            set: function (_bordered) {
                this._bordered = _bordered;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(textObject.prototype, "borderWidth", {
            get: function () {
                return this._fontSize;
            },
            set: function (borderWidth) {
                this._borderWidth = borderWidth;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(textObject.prototype, "fontWidth", {
            get: function () {
                return this._fontWidth;
            },
            set: function (fontWidth) {
                this._fontWidth = fontWidth;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(textObject.prototype, "autoFeed", {
            get: function () {
                return this._autoFeed;
            },
            set: function (_autoFeed) {
                this._bordered = _autoFeed;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(textObject.prototype, "background", {
            get: function () {
                return this._background;
            },
            set: function (background) {
                this._background = background;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(textObject.prototype, "textAlign", {
            get: function () {
                return this._textAlign;
            },
            set: function (textAlign) {
                this._textAlign = textAlign;
                this.offscreenCache.isBuild = false;
            },
            enumerable: false,
            configurable: true
        });
        textObject.prototype.onDraw = function (ctx) {
            var _this = this;
            if (this._background) {
                ctx.fillStyle = this._background;
                ctx.fillRect(0, 0, this.width, this.height);
            }
            if (this._bordered) {
                ctx.strokeStyle = this._borderColor;
                ctx.lineWidth = this._borderWidth;
                ctx.strokeRect(0, 0, this.width, this.height);
            }
            ctx.font = this.fontSize + "px " + this.fontFamily;
            ctx.textAlign = this.textAlign;
            console.log(this.fontSize + " px " + this.fontFamily);
            ctx.fillStyle = this.color;
            if (this.autoFeed) { // 自动换行
                var arr_1 = this.getAutoFeed();
                console.log(arr_1);
                arr_1.forEach(function (element, index) {
                    if (_this.textAlign === "center") {
                        ctx.fillText(element, _this.width / 2, (_this.height / 2 - (_this.fontSize * arr_1.length - 1) / 2 + _this.fontSize * (index + 1)));
                        if (_this.fontWidth > 100) {
                            var count = ~~(_this.fontWidth / 100);
                            for (var i = 0; i < count; i += 3) {
                                var offset = i * 0.1;
                                var opacity = (count - i) / count;
                                _this.canvas.opacity = opacity;
                                ctx.fillText(element, _this.width / 2, (_this.height / 2 - (_this.fontSize * arr_1.length - 1) / 2 + offset + _this.fontSize * (index + 1)));
                            }
                            _this.canvas.opacity = 1;
                        }
                    }
                    else if (_this.textAlign === "left") {
                        ctx.fillText(element, _this.borderWidth / 2, (_this.height / 2 - (_this.fontSize * arr_1.length - 1) / 2 + _this.fontSize * (index + 1)));
                        if (_this.fontWidth > 100) {
                            var count = ~~(_this.fontWidth / 100);
                            for (var i = 0; i < count; i += 3) {
                                var offset = i * 0.1;
                                var opacity = (count - i) / count;
                                _this.canvas.opacity = opacity;
                                ctx.fillText(element, _this.borderWidth / 2, (_this.height / 2 - (_this.fontSize * arr_1.length - 1) / 2 + offset + _this.fontSize * (index + 1)));
                            }
                            _this.canvas.opacity = 1;
                        }
                    }
                    else if (_this.textAlign = "right") {
                        ctx.fillText(element, _this.width, (_this.height / 2 + 2 * _this.fontSize * index) / 2);
                        if (_this.fontWidth > 100) {
                            var count = ~~(_this.fontWidth / 100);
                            for (var i = 0; i < count; i += 3) {
                                var offset = i * 0.1;
                                var opacity = (count - i) / count;
                                _this.canvas.opacity = opacity;
                                ctx.fillText(element, _this.width, (_this.height / 2 + 2 * _this.fontSize * index) / 2 + offset);
                            }
                            _this.canvas.opacity = 1;
                        }
                    }
                });
            }
            else {
                if (this.textAlign === "center") {
                    ctx.fillText(this.text, this.width / 2, (this.height + this.fontSize / 2) / 2);
                }
                else if (this.textAlign === "left") {
                    ctx.fillText(this.text, 0, (this.height + this.fontSize / 2) / 2);
                }
                else if (this.textAlign = "right") {
                    ctx.fillText(this.text, this.width, (this.height + this.fontSize / 2) / 2);
                }
            }
        };
        textObject.prototype.beforeDestoryed = function () {
        };
        textObject.prototype.getAutoFeed = function () {
            var res = [], widthCount = 0, start = 0;
            for (var i = 0; i < this.text.length; i++) {
                var unicode = this.text.charCodeAt(i);
                if ((unicode >= 0x4e00 && unicode < 0x9fa5) || (unicode >= 65281 && unicode <= 65374) || unicode === 12288) {
                    if (widthCount + this.fontSize > this.width) {
                        res.push(this.text.substr(start, i - start - 1));
                        start = i - 1;
                        widthCount = 0;
                    }
                    widthCount += this.fontSize;
                }
                else {
                    if (widthCount + this.fontSize / 2 > this.width) {
                        res.push(this.text.substr(start, i - start - 1));
                        start = i - 1;
                        widthCount = 0;
                    }
                    widthCount += this.fontSize / 2;
                }
            }
            if (start < this.text.length) {
                res.push(this.text.substr(start, this.text.length - start));
            }
            return res;
        };
        textObject.prototype.afterDestoryed = function () {
        };
        textObject.prototype.created = function () {
        };
        textObject.prototype.onStep = function (dt) {
        };
        return textObject;
    }(elementObject));
    exports.default = {
        textObject: textObject,
        elementObject: elementObject,
        // seqSpriteObject,
        // roundObject,
        // triangleObject,
        spriteObject: spriteObject
    };
});
