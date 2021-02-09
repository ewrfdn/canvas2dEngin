"use strict";
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
var elementObject = /** @class */ (function () {
    function elementObject(info, canvas) {
        this.width = info.w || 100;
        this.height = info.h || 100;
        this.Vx = info.Vx || 100;
        this.Vy = info.Vy || 100;
        this.x = info.x || 0;
        this.y = info.y || 0;
        this.z = info.z || 0;
        this.canvas = canvas;
        this.created();
    }
    elementObject.prototype.move = function (dt) {
        this.x += ~~(this.Vx * dt);
        this.y += ~~(this.Vy * dt);
    };
    elementObject.prototype.step = function (dt) {
        this.move(dt);
        this.onStep(dt);
    };
    elementObject.prototype.destoryed = function (elementObj) {
        this.beforeDestoryed(elementObj);
        this.canvas.remove(elementObj);
    };
    return elementObject;
}());
// class roundObject extends elementObject{
//     color:string;
//     r:number=10;
//     offscreen:number;
//     CreatCache:number=0;
//     // createCache(that:any){
//     // }
//     draw(that:any){
//         if(!that.offScreen[this.offscreen].isBuild){
//             that.offScreen[this.offscreen].isBuild=true
//             that.offScreen[this.offscreen].canvas.width=this.width;
//             that.offScreen[this.offscreen].canvas.height=this.height;
//             that.offScreen[this.offscreen].canvas.getContext('2d').save()
//             that.offScreen[this.offscreen].canvas.getContext('2d').fillStyle=this.color;
//             that.offScreen[this.offscreen].canvas.getContext('2d').beginPath();
//             that.offScreen[this.offscreen].canvas.getContext('2d').arc(this.r, this.r, this.r, 0, 2 * Math.PI, true)
//             that.offScreen[this.offscreen].canvas.getContext('2d').stroke()
//             that.offScreen[this.offscreen].canvas.getContext('2d').closePath()
//             that.offScreen[this.offscreen].canvas.getContext('2d').fill()
//             that.offScreen[this.offscreen].canvas.getContext('2d').restore()
//             }
//         that.ctx.drawImage(that.offScreen[this.offscreen],this.x,this.y)
//     }
//     step(dt:number,that:any){
//         this.move(dt);
//     }
//     onStep(dt:number,canvas:any){
//     }
//     constructor(info:any,offscreen:number){
//         super(info)
//         this.offscreen=offscreen;
//         this.r=info.r||20;
//         this.color=info.color||"rgb(0, 100, 0)"
//         this.width=info.r*2||10;
//         this.height=info.r*2||10;
//     }
//  }
var rectangleObject = /** @class */ (function (_super) {
    __extends(rectangleObject, _super);
    function rectangleObject(info, canvas) {
        var _this = _super.call(this, info, canvas) || this;
        _this.TargetLifeCycle = Infinity;
        _this.lifeCycle = 0;
        _this.color = info.color || "rgb(245, 240, 240)";
        return _this;
    }
    rectangleObject.prototype.draw = function () {
        this.canvas.ctx.fillStyle = this.color;
        this.canvas.ctx.rect(this.x, this.y, this.width, this.height);
        this.canvas.ctx.fill();
    };
    rectangleObject.prototype.beforeDestoryed = function () {
    };
    rectangleObject.prototype.afterDestoryed = function () {
    };
    rectangleObject.prototype.created = function () {
    };
    rectangleObject.prototype.onStep = function (dt) {
    };
    return rectangleObject;
}(elementObject));
//  class triangleObject extends elementObject{
//     color:string;
//     TargetLifeCycle:number=Infinity;
//     lifeCycle:number=0;
//     draw(that:any){
//         that.ctx.fillStyle=this.color;
//         that.ctx.rect(this.x,this.y,this.width,this.height)
//         that.ctx.fill()
//     }
//     step(dt:number,that:any){
//    }
//    onStep(dt:number,canvas:any){
//    }
//     constructor(info:any){
//         super(info)
//         this.color=info.color||"rgb(245, 240, 240)"
//     }
//  }
var spriteObject = /** @class */ (function (_super) {
    __extends(spriteObject, _super);
    function spriteObject(info, sprite, offscreen, canvas) {
        var _this = _super.call(this, info, canvas) || this;
        _this.offscreen = offscreen;
        _this.sprite = sprite;
        return _this;
    }
    spriteObject.prototype.draw = function () {
        if (!this.canvas.offScreen[this.offscreen].isBuild) {
            this.canvas.offScreen[this.offscreen].isBuild = true;
            this.canvas.offScreen[this.offscreen].canvas.width = this.width;
            this.canvas.offScreen[this.offscreen].canvas.height = this.height;
            this.canvas.offScreen[this.offscreen].canvas.getContext('2d').drawImage(this.sprite.Img, this.sprite.sx, this.sprite.sy, this.sprite.w, this.sprite.h, 0, 0, this.width, this.height);
        }
        this.canvas.ctx.drawImage(this.canvas.offScreen[this.offscreen].canvas, this.x, this.y);
    };
    spriteObject.prototype.beforeDestoryed = function () {
    };
    spriteObject.prototype.afterDestoryed = function () {
    };
    spriteObject.prototype.created = function () {
    };
    spriteObject.prototype.step = function (dt, canvas) {
        this.move(dt);
        this.onStep(dt);
    };
    spriteObject.prototype.onStep = function (dt) {
    };
    return spriteObject;
}(elementObject));
var textObject = /** @class */ (function (_super) {
    __extends(textObject, _super);
    function textObject(info, canvas) {
        var _this = _super.call(this, info, canvas) || this;
        _this.color = info.color;
        _this.fontSize = info.fontSize;
        _this.borderColor = info.fontSize;
        _this.borderWidth = info.borderWidth;
        return _this;
    }
    textObject.prototype.draw = function () {
    };
    textObject.prototype.beforeDestoryed = function () {
    };
    textObject.prototype.afterDestoryed = function () {
    };
    textObject.prototype.created = function () {
    };
    textObject.prototype.onStep = function (dt) {
    };
    return textObject;
}(elementObject));
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
                this.offScreen.push(new offscreenCanvas(document.createElement('canvas')));
                obj = new spriteObject(info, sprite, this.offScreen.length - 1, this);
            }
        }
        else if (type === "rect") {
            // obj=new element.rectangleObject(info,this)
        }
        // else if(type==="triangel"){
        //     obj=new element.rectangleObject(info)
        // }
        else if (type === "text") {
            obj = new textObject(info, this);
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
    function offscreenCanvas(canvas) {
        this.isBuild = false;
        this.canvas = canvas;
    }
    return offscreenCanvas;
}());
