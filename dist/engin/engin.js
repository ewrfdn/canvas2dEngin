var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./elementDefine"], function (require, exports, elementDefine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    elementDefine_1 = __importDefault(elementDefine_1);
    var canvas2d = /** @class */ (function () {
        function canvas2d(el, width, height) {
            this.x = 0;
            this.y = 0;
            this.displayFrameRate = true;
            this.rate = 0;
            this.lastTime = 0;
            this.maxTime = 1 / 30;
            this.offScreen = [];
            this.interval = 0;
            this.gameBoard = [];
            this.background = [];
            this.canvas = document.createElement("canvas");
            this.canvas.width = width;
            this.canvas.height = height;
            this.width = width;
            this.height = height;
            this.root = document.getElementById(el);
            this.root.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
        }
        canvas2d.prototype.frameRate = function (dt) {
            this.interval += dt;
            if (this.interval > 2) {
                this.interval = 0;
                this.rate = ~~(1 / dt);
            }
            this.ctx.fillStyle = "rgb(0,255,0)";
            this.ctx.font = "40px Verdana";
            this.ctx.fillText("FPS:" + this.rate, 40, 40);
        };
        canvas2d.prototype.push = function (obj, type) {
            if (type === "bg") {
                this.background.push();
            }
            this.gameBoard.push(obj);
        };
        canvas2d.prototype.removeBg = function (obj) {
            var p = this.background.indexOf(obj);
            this.background.splice(p, 1);
        };
        canvas2d.prototype.remove = function (obj, index) {
            if (index !== undefined) {
                this.gameBoard.splice(index, 1);
            }
            else {
                var p = this.gameBoard.indexOf(obj);
                this.gameBoard.splice(p, 1);
            }
        };
        canvas2d.prototype.createElement = function (type, info, sprite) {
            var obj = {};
            if (type === "round") {
                //    this.offScreen.push(new offscreenCanvas(document.createElement('canvas')))
                //    obj=new element.roundObject(info,this.offScreen.length-1)
            }
            else if (type === "spite" && sprite !== undefined) {
                if (sprite.targerFrame) {
                    // obj=new element.seqSpriteObject(info,sprite,this)
                }
                else {
                    var offScreenCanavs = new offscreenCanvas();
                    this.offScreen.push(offScreenCanavs);
                    obj = new elementDefine_1.default.spriteObject(info, sprite, offScreenCanavs, this);
                }
            }
            else if (type === "rect") {
                // obj=new element.rectangleObject(info,this)
            }
            // else if(type==="triangel"){
            //     obj=new element.rectangleObject(info)
            // }
            else if (type === "text") {
                var offscreenCache = new offscreenCanvas();
                this.offScreen.push(offscreenCache);
                obj = new elementDefine_1.default.textObject(info, offscreenCache, this);
            }
            return obj;
        };
        canvas2d.prototype.loop = function () {
            var _this = this;
            var dt = this.lastTime;
            this.lastTime = new Date().getTime();
            dt = (this.lastTime - dt) / 1000;
            var tempDt = dt;
            if (dt > this.maxTime) {
                dt = this.maxTime;
            }
            this.canvas.width = this.width;
            for (var j = 0; j < this.background.length; j++) {
                this.background[j].draw();
                this.background[j].step(dt);
            }
            for (var i = 0; i < this.gameBoard.length; i++) {
                this.gameBoard[i].draw();
                this.gameBoard[i].step(dt);
            }
            if (this.displayFrameRate) {
                this.frameRate(tempDt);
            }
            this.t = requestAnimationFrame(function () {
                _this.loop();
            });
        };
        return canvas2d;
    }());
    exports.default = canvas2d;
    var audio = /** @class */ (function () {
        function audio(src, currentTime, sustainTime) {
            this.currentTime = 0;
            this.playTime = 0;
            this.sustainTime = -1;
            this.loop = false;
            this.volume = 1;
            this.el = new Audio();
            this.el.src = src;
            if (currentTime !== undefined) {
                this.currentTime = currentTime;
            }
            if (sustainTime !== undefined) {
                this.sustainTime = sustainTime;
            }
        }
        audio.prototype.play = function () {
            this.el.currentTime = this.currentTime;
            this.playTime = 0;
            if (this.loop) {
                this.el.loop = true;
            }
            // this.el.fastSeek(1)
            this.el.play();
        };
        audio.prototype.pause = function () {
            this.el.pause();
        };
        return audio;
    }());
    var control = /** @class */ (function () {
        function control() {
        }
        return control;
    }());
    var collision = /** @class */ (function () {
        function collision(type, mode) {
            this.Collision = [];
            this.type = type;
            this.mode = mode || "single";
            this.isCollision = false;
        }
        collision.prototype.overlape = function (obj1, obj2) {
            return !((obj1.x + obj1.width) < obj2.x || (obj1.y + obj1.height) < obj2.y ||
                (obj2.x + obj2.width) < obj1.x || (obj2.y + obj2.height) < obj1.y);
        };
        collision.prototype.checkCollision = function (obj1, that) {
            for (var i = 0; i < that.gameBoard.length; i++) {
                if (that.gameBoard[i].col && obj1.col.type === that.gameBoard[i].col.type && obj1 !== that.gameBoard[i]) {
                    if (this.overlape(obj1, that.gameBoard[i])) {
                        obj1.col.isCollision = true;
                        that.gameBoard[i].col.isCollision = true;
                        // this.Collision.push(that.gameBoard[i])
                        if (this.mode === "single") {
                            break;
                        }
                    }
                    else {
                        obj1.col.isCollision = false;
                    }
                }
            }
        };
        return collision;
    }());
    var offscreenCanvas = /** @class */ (function () {
        function offscreenCanvas() {
            this.isBuild = false;
            this.canvas = document.createElement('canvas');
        }
        return offscreenCanvas;
    }());
});
