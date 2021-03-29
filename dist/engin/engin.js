var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./elementDefine/bacicElementDefine", "./elementDefine/advanceElementDefine"], function (require, exports, bacicElementDefine_1, advanceElementDefine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    bacicElementDefine_1 = __importDefault(bacicElementDefine_1);
    advanceElementDefine_1 = __importDefault(advanceElementDefine_1);
    var canvas2d = /** @class */ (function () {
        function canvas2d(el, width, height) {
            this.x = 0;
            this.y = 0;
            this.displayFrameRate = true;
            this.rate = 0;
            this.clickThrough = false;
            this.lastTime = 0;
            this.maxTime = 1 / 30;
            this.offScreen = [];
            this.interval = 0;
            this.gameBoard = [];
            this.background = [];
            this.gengratorImg = {};
            this.canvas = document.createElement("canvas");
            this.canvas.id = "mainCanvas";
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.style.border = "solid 1px #666";
            this.width = width;
            this.height = height;
            this.root = document.getElementById(el);
            this.root.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
        }
        canvas2d.prototype.allowDrop = function (event) {
            event.preventDefault();
        };
        canvas2d.prototype.stopLoop = function () {
            window.cancelAnimationFrame(this.t);
        };
        canvas2d.prototype.enableKeyupEventLisener = function () {
            var _this = this;
            document.addEventListener("keyup", function (e) {
                if (e.key === 'Delete') {
                    _this.gameBoard = _this.gameBoard.filter(function (element) {
                        return !element.focused;
                    });
                }
            });
        };
        canvas2d.prototype.enableClickEventLisener = function () {
            var _this = this;
            console.log("23-----3");
            console.log(this.canvas);
            this.root.ondragover = this.allowDrop;
            this.root.style.overflow = "hidden";
            this.root.style.position = 'relative';
            this.canvas.addEventListener("click", function (e) {
                console.log(_this.canvas.getBoundingClientRect());
                var left = e.clientX - _this.canvas.getBoundingClientRect().x;
                var top = e.clientY - _this.canvas.getBoundingClientRect().y;
                var clickFlag = true;
                var controlDiv = document.getElementById("control-div");
                if (controlDiv) {
                    _this.root.removeChild(controlDiv);
                }
                console.log(left, top);
                if (_this.clickThrough) {
                    for (var i = _this.gameBoard.length - 1; i > -1; i--) {
                        if (top > _this.gameBoard[i].y && top < (_this.gameBoard[i].y + _this.gameBoard[i].height) && left > _this.gameBoard[i].x && (_this.gameBoard[i].x + _this.gameBoard[i].width) > left) {
                            _this.gameBoard[i].focused = true;
                        }
                        else {
                            _this.gameBoard[i].focused = false;
                        }
                    }
                }
                else {
                    for (var i = _this.gameBoard.length - 1; i > -1; i--) {
                        if (clickFlag && top > _this.gameBoard[i].y && top < (_this.gameBoard[i].y + _this.gameBoard[i].height) && left > _this.gameBoard[i].x && (_this.gameBoard[i].x + _this.gameBoard[i].width) > left) {
                            _this.gameBoard[i].focused = true;
                            clickFlag = false;
                            _this.createHtmlDom(i);
                        }
                        else {
                            _this.gameBoard[i].focused = false;
                        }
                    }
                }
            });
        };
        canvas2d.prototype.createHtmlDom = function (elementIndex) {
            var _this = this;
            var appendDiv = document.createElement('div');
            appendDiv.style.position = "absolute";
            appendDiv.id = "control-div";
            appendDiv.style.width = this.gameBoard[elementIndex].width;
            appendDiv.style.height = this.gameBoard[elementIndex].height;
            appendDiv.style.left = this.gameBoard[elementIndex].x;
            appendDiv.style.top = this.gameBoard[elementIndex].y;
            appendDiv.style.border = "#0F0 solid 1px";
            appendDiv.setAttribute("bindIndex", elementIndex.toString());
            appendDiv.draggable = true;
            appendDiv.style.cursor = "move";
            appendDiv.ondragstart = function (el) { return _this.elementOnDragStart(el, _this); };
            appendDiv.ondragend = function (el) { return _this.elementOnDragEnd(el, _this.gameBoard[elementIndex], _this); };
            appendDiv.ondrag = function (el) { return _this.elementOnDrag(el, _this.gameBoard[elementIndex]); };
            this.root.appendChild(appendDiv);
            appendDiv.appendChild(this.createControlPoint(0, this.gameBoard[elementIndex].height / 2, 'w-resize', elementIndex));
            appendDiv.appendChild(this.createControlPoint(this.gameBoard[elementIndex].width, this.gameBoard[elementIndex].height / 2, 'e-resize', elementIndex));
            appendDiv.appendChild(this.createControlPoint(this.gameBoard[elementIndex].width / 2, 0, 'n-resize', elementIndex));
            appendDiv.appendChild(this.createControlPoint(this.gameBoard[elementIndex].width / 2, this.gameBoard[elementIndex].height, 's-resize', elementIndex));
        };
        canvas2d.prototype.createControlPoint = function (x, y, cursorType, elementIndex) {
            var _this = this;
            var controlPoint = document.createElement('div');
            controlPoint.style.width = "10px";
            controlPoint.style.height = '10px';
            controlPoint.style.borderRadius = "5px";
            controlPoint.style.border = "#666 solid 1px";
            controlPoint.style.position = "absolute";
            controlPoint.style.top = y - 5 + "px";
            controlPoint.style.left = x - 5 + "px";
            controlPoint.draggable = true;
            controlPoint.id = cursorType;
            controlPoint.style.cursor = cursorType;
            controlPoint.ondragstart = function (el) { return _this.onResizeStart(el, _this); };
            controlPoint.ondrag = function (el) { return _this.onResize(el, _this.gameBoard[elementIndex], cursorType); };
            controlPoint.ondragend = function (el) { return _this.onResizeEnd(el, _this.gameBoard[elementIndex], cursorType, _this); };
            return controlPoint;
        };
        canvas2d.prototype.elementOnDragStart = function (event, that) {
            // event.preventDefault()
            // event.dataTransfer.dropEffect = "copy";
            event.cancelBubble = true;
            console.log(event);
            // that.loop()
        };
        canvas2d.prototype.onResizeStart = function (event, that) {
            // that.loop()
            // event.dataTransfer.dropEffect = "copy";
            event.cancelBubble = true;
            console.log(event.target.id);
            event.dataTransfer.setData("text/plain", event.target.id);
        };
        canvas2d.prototype.onResize = function (event, changElement, cursorType) {
            event.cancelBubble = true;
            // if(cursorType==="n-resize"){
            //     changElement.height+=(event.offsetY/100)
            //     if(changElement.height<50){
            //         changElement.height=50
            //     }
            // }else if(cursorType=="e-resize"){
            //     changElement.width+=(event.offsetX/100)
            //     if(changElement.width<50){
            //         changElement.width=50
            //     }
            // }
        };
        canvas2d.prototype.onResizeEnd = function (event, changElement, cursorType, that) {
            event.cancelBubble = true;
            console.log(event);
            console.log(event.dataTransfer.getData("text"));
            var dom = document.getElementById(event.dataTransfer.getData("Text"));
            if (dom) {
                dom.style.left = event.clientX;
                dom.style.top = event.clientY;
                changElement.x = event.clientX - changElement.width / 2;
                changElement.y = event.clientY - changElement.height / 2;
                // dom.style.left =changElement.x.toString();
                // dom.style.top = changElement.y.toString()
            }
            if (cursorType === "n-resize") {
                console.log(event.offsetY);
                changElement.height -= event.offsetY;
                changElement.y += event.offsetY;
                if (changElement.height < 50) {
                    changElement.height = 50;
                }
            }
            else if (cursorType == "e-resize") {
                changElement.width += event.offsetX;
                if (changElement.width < 50) {
                    changElement.width = 50;
                }
            }
            else if (cursorType == "w-resize") {
                changElement.width -= event.offsetX;
                changElement.x += event.offsetX;
                if (changElement.width < 50) {
                    changElement.width = 50;
                }
            }
            else if (cursorType == "s-resize") {
                changElement.height += event.offsetY;
                if (changElement.width < 50) {
                    changElement.width = 50;
                }
            }
            var typeList = [{ key: "s-resize", x: changElement.width / 2, y: changElement.height },
                { key: "e-resize", x: changElement.width, y: changElement.height / 2 },
                { key: "n-resize", x: changElement.width / 2, y: 0 },
                { key: "w-resize", x: 0, y: changElement.height / 2 }];
            typeList.forEach(function (ele) {
                var dom = document.getElementById(ele.key);
                if (dom) {
                    dom.style.top = ele.y - 5 + "px";
                    dom.style.left = ele.x - 5 + "px";
                }
            });
            dom = document.getElementById('control-div');
            if (dom) {
                dom.style.width = changElement.width;
                dom.style.height = changElement.height;
            }
            // window.setInterval(()=>{
            //     that.stopLoop()
            // },5000)
        };
        canvas2d.prototype.elementOnDrag = function (event, changElement) {
            event.preventDefault();
            event.cancelBubble = true;
            changElement.x = event.clientX - changElement.width / 2;
            changElement.y = event.clientY - changElement.height / 2;
        };
        canvas2d.prototype.elementOnDragEnd = function (event, changElement, that) {
            event.cancelBubble = true;
            var dom = document.getElementById('control-div');
            if (dom) {
                dom.style.left = event.clientX;
                dom.style.top = event.clientY;
                changElement.x = event.clientX - changElement.width / 2;
                changElement.y = event.clientY - changElement.height / 2;
                dom.style.left = changElement.x.toString();
                dom.style.top = changElement.y.toString();
            }
            // window.setInterval(()=>{
            //     that.stopLoop()
            // },5000)
        };
        canvas2d.prototype.disableClickEventLisener = function () {
        };
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
        canvas2d.prototype.createElement = function (type, info) {
            var obj = {};
            if (type === "round") {
                //    this.offScreen.push(new offscreenCanvas(document.createElement('canvas')))
                //    obj=new element.roundObject(info,this.offScreen.length-1)
            }
            else if (type === "spite") {
                // if (info.targerFrame) {
                //     // obj=new element.seqSpriteObject(info,sprite,this)
                // } else {
                var offScreenCanavs = new offscreenCanvas();
                this.offScreen.push(offScreenCanavs);
                obj = new bacicElementDefine_1.default.spriteObject(info, offScreenCanavs, this);
                // }
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
                obj = new bacicElementDefine_1.default.textObject(info, offscreenCache, this);
            }
            else if (type === "barcode") {
                var offscreenCache = new offscreenCanvas();
                this.offScreen.push(offscreenCache);
                obj = new advanceElementDefine_1.default.barcodeObject(info, offscreenCache, this);
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
        canvas2d.prototype.getElementToJson = function () {
            var resList = [];
            this.gameBoard.forEach(function (e) {
                var res = {};
                res.w = e.width;
                res.h = e.height;
                res.x = e.x;
                res.y = e.y;
                res.z = e.z;
                if (e instanceof bacicElementDefine_1.default.spriteObject) {
                    res.type = "sprite";
                    res.spiteInfo = res.spiteInfo;
                }
                else if (e instanceof bacicElementDefine_1.default.textObject) {
                    res.type = "text";
                    res.bordered = e.bordered;
                    res.borderWidth = e.borderWidth;
                    res.textAligne = e.textAlign;
                    res.color = e.color;
                    res.background = e.borderWidth;
                }
                resList.push(res);
            });
            console.log(resList);
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
