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
Object.defineProperty(exports, "__esModule", { value: true });
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
    elementObject.prototype.step = function (dt, that) {
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
//  class seqSpriteObject extends elementObject{
//     interval:number;
//     targerFrame:number;
//     nowFrame:number=0;
//     loop:boolean;
//     sx:number;
//     sy:number;
//     count:number=0;
//     sprite:any;
//     draw(dt:number,that:canvas){
//        that.ctx.drawImage(this.sprite.Img, this.sprite.sx, this.sprite.sy,
//         this.sprite.w, this.sprite.h, this.x, this.y, this.width, this.height);
//         this.count++;
//         if(this.count===this.interval){
//             this.count=0
//             this.nowFrame++;
//             this.sx+=this.sprite.width;
//             this.sy+=this.sprite.height;
//             if(this.loop&&this.nowFrame>=this.targerFrame){
//                 this.nowFrame=0;
//                 this.sx=this.sprite.sx;
//                 this.sy=this.sprite.sy;
//             }
//         }
//     }
//     step(dt:number,canvas:any){
//         this.move(dt)
//     }
//     onStep(dt:number,canvas:any){
//     }
//     constructor(info:any,sprite:any){
//         super(info)
//         this.sprite=sprite;
//         this.loop=sprite.loop||false;
//         this.interval=sprite.inveral||1;
//         this.targerFrame=sprite.targerFrame||1;
//         this.sx=sprite.sx||0;
//         this.sy=sprite.sy||0;
//     }
//  }
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
exports.default = { textObject: textObject,
    // seqSpriteObject,
    // roundObject,
    // triangleObject,
    spriteObject: spriteObject };
