import element from "./elementDefine/bacicElementDefine"
import advanceElement from "./elementDefine/advanceElementDefine"
import { basicElementInterface, GroupElementInterface, spriteElementInterface, textElementInterface } from "./elementDefineInterface/basicElementDefineInterface"
export default class canvas2d {
    x: number = 0;
    y: number = 0;
    width: number;
    height: number;
    ctx: any;
    mutipleSelectModel: boolean = false;
    // displayFrameRate: boolean = true;
    rate: number = 0;
    root: any;
    canvas: any;
    clickThrough: boolean = false
    lastTime: number = 0;
    maxTime: number = 1 / 30;
    drawTimer:any=null
    gameBoard: any[] = [];
    allowDrop(event: any) {
        event.preventDefault()
    }
    // stopLoop() {
    //     window.cancelAnimationFrame(this.t)
    // }
    enableKeyupEventLisener() {//键盘事件监听
        document.addEventListener("keyup", (e: any) => {

            if (e.key === 'Delete') {
                this.gameBoard = this.gameBoard.filter(element => {
                    return !element.focused
                })
                this.draw()
            }
            if (e.key === 'Control') {
                this.mutipleSelectModel = false;
            }
        })
        document.addEventListener("keydown", (e: any) => {
            if (e.key === 'Control') {
                this.mutipleSelectModel = true;
            }
        })

    }
    enableClickEventLisener() {
        console.log("23-----3")
        console.log(this.canvas)
        this.root.ondragover = this.allowDrop;
        this.root.style.overflow = "hidden"
        this.root.style.position = 'relative'
        this.canvas.addEventListener("click", (e: any) => {
            let left = e.clientX - this.canvas.getBoundingClientRect().x
            let top = e.clientY - this.canvas.getBoundingClientRect().y
            let clickFlag = true;
            let controlDiv = document.getElementById("control-div")
            if (controlDiv) {
                this.root.removeChild(controlDiv)
            }
            if (this.clickThrough) {
                for (let i = this.gameBoard.length - 1; i > -1; i--) {
                    if (top > this.gameBoard[i].y && top < (this.gameBoard[i].y + this.gameBoard[i].height) && left > this.gameBoard[i].x && (this.gameBoard[i].x + this.gameBoard[i].width) > left) {
                        this.gameBoard[i].focused = true;
                    } else {
                        this.gameBoard[i].focused = false;

                    }
                }
            } else {
                for (let i = this.gameBoard.length - 1; i > -1; i--) {
                    if (clickFlag && top > this.gameBoard[i].y && top < (this.gameBoard[i].y + this.gameBoard[i].height) && left > this.gameBoard[i].x && (this.gameBoard[i].x + this.gameBoard[i].width) > left) {
                        this.gameBoard[i].focused = true;
                        clickFlag = false;
                        this.createHtmlDom(i);
                    } else {
                        console.log(this.mutipleSelectModel)
                        if (!this.mutipleSelectModel) {
                            this.gameBoard[i].focused = false;
                        }
                    }
                }
            }
            this.draw()
        })

    }
    createHtmlDom(elementIndex: number) {
        let appendDiv = document.createElement('div')
        appendDiv.style.position = "absolute";
        appendDiv.id = "control-div"
        appendDiv.style.width = this.gameBoard[elementIndex].width;
        appendDiv.style.height = this.gameBoard[elementIndex].height;
        appendDiv.style.left = this.gameBoard[elementIndex].x;
        appendDiv.style.top = this.gameBoard[elementIndex].y;
        appendDiv.style.border = "#0F0 solid 1px"
        appendDiv.setAttribute("bindIndex", elementIndex.toString());
        appendDiv.draggable = true;
        appendDiv.style.cursor = "move";
        appendDiv.ondragstart = (el: any) => this.elementOnDragStart(el, this)
        appendDiv.ondragend = (el) => this.elementOnDragEnd(el, this.gameBoard[elementIndex], this)
        appendDiv.ondrag = (el) => this.elementOnDrag(el, this.gameBoard[elementIndex])
        this.root.appendChild(appendDiv);
        appendDiv.appendChild(this.createControlPoint(0, this.gameBoard[elementIndex].height / 2, 'w-resize', elementIndex))
        appendDiv.appendChild(this.createControlPoint(this.gameBoard[elementIndex].width, this.gameBoard[elementIndex].height / 2, 'e-resize', elementIndex))
        appendDiv.appendChild(this.createControlPoint(this.gameBoard[elementIndex].width / 2, 0, 'n-resize', elementIndex))
        appendDiv.appendChild(this.createControlPoint(this.gameBoard[elementIndex].width / 2, this.gameBoard[elementIndex].height, 's-resize', elementIndex))
    }
    createControlPoint(x: number, y: number, cursorType: string, elementIndex: number) {
        let controlPoint = document.createElement('div')
        controlPoint.style.width = "10px"
        controlPoint.style.height = '10px'
        controlPoint.style.borderRadius = "5px"
        controlPoint.style.border = "#666 solid 1px"
        controlPoint.style.position = "absolute"
        controlPoint.style.top = y - 5 + "px"
        controlPoint.style.left = x - 5 + "px"
        controlPoint.draggable = true;
        controlPoint.id = cursorType
        controlPoint.style.cursor = cursorType;
        controlPoint.ondragstart = (el) => this.onResizeStart(el, this)
        controlPoint.ondrag = (el: any) => this.onResize(el, this.gameBoard[elementIndex], cursorType)
        controlPoint.ondragend = (el: any) => this.onResizeEnd(el, this.gameBoard[elementIndex], cursorType, this)
        return controlPoint
    }
    elementOnDragStart(event: any, that: any) {
        event.cancelBubble = true;

    }
    onResizeStart(event: any, that: any) {
        event.cancelBubble = true;
        console.log(event.target.id)
        event.dataTransfer.setData("text/plain", event.target.id)
        this.draw()
    }
    onResize(event: any, changElement: any, cursorType: string) {
        event.cancelBubble = true;

    }
    onResizeEnd(event: any, changElement: any, cursorType: string, that: any) {
        event.cancelBubble = true;
        console.log(event)
        console.log(event.dataTransfer.getData("text"))
        let dom = document.getElementById(event.dataTransfer.getData("Text"))
        if (dom) {
            dom.style.left = event.clientX;
            dom.style.top = event.clientY
            changElement.x = event.clientX - changElement.width / 2
            changElement.y = event.clientY - changElement.height / 2
            // dom.style.left =changElement.x.toString();
            // dom.style.top = changElement.y.toString()
        }
        if (cursorType === "n-resize") {
            console.log(event.offsetY)
            changElement.height -= event.offsetY
            changElement.y += event.offsetY
            if (changElement.height < 50) {
                changElement.height = 50
            }
        } else if (cursorType == "e-resize") {
            changElement.width += event.offsetX
            if (changElement.width < 50) {
                changElement.width = 50
            }
        } else if (cursorType == "w-resize") {
            changElement.width -= event.offsetX
            changElement.x += event.offsetX
            if (changElement.width < 50) {
                changElement.width = 50
            }
        } else if (cursorType == "s-resize") {
            changElement.height += event.offsetY
            if (changElement.width < 50) {
                changElement.width = 50
            }
        }
        let typeList = [{ key: "s-resize", x: changElement.width / 2, y: changElement.height },
        { key: "e-resize", x: changElement.width, y: changElement.height / 2 },
        { key: "n-resize", x: changElement.width / 2, y: 0 },
        { key: "w-resize", x: 0, y: changElement.height / 2 }]
        typeList.forEach(ele => {
            let dom = document.getElementById(ele.key)
            if (dom) {
                dom.style.top = ele.y - 5 + "px"
                dom.style.left = ele.x - 5 + "px"
            }
        })
        dom = document.getElementById('control-div')
        if (dom) {
            dom.style.width = changElement.width;
            dom.style.height = changElement.height;
        }
        this.draw()

    }
    elementOnDrag(event: any, changElement: any) {
        event.preventDefault()
        event.cancelBubble = true;
        changElement.x = event.clientX - changElement.width / 2
        changElement.y = event.clientY - changElement.height / 2
        this.draw()
    }
    elementOnDragEnd(event: any, changElement: any, that: any) {
        event.cancelBubble = true;
        let dom = document.getElementById('control-div')
        if (dom) {
            dom.style.left = event.clientX;
            dom.style.top = event.clientY
            changElement.x = event.clientX - changElement.width / 2
            changElement.y = event.clientY - changElement.height / 2
            dom.style.left = changElement.x.toString();
            dom.style.top = changElement.y.toString()
        }
        this.draw()
    }
    disableClickEventLisener() {
    }
    // frameRate(dt: number) {
    //     this.interval += dt;
    //     if (this.interval > 2) {
    //         this.interval = 0;
    //         this.rate = ~~(1 / dt);
    //     }
    //     this.ctx.fillStyle = "rgb(0,255,0)"
    //     this.ctx.font = "40px Verdana";
    //     this.ctx.fillText("FPS:" + this.rate, 40, 40)

    // }
    push(obj: any): void {
        this.gameBoard.push(obj)
        this.draw()
    }
    // removeBg(obj: any) {
    //     let p = this.background.indexOf(obj)
    //     this.background.splice(p, 1);
    // }
    remove(obj: any, index?: number): void {
        if (index !== undefined) {
            this.gameBoard.splice(index, 1);
        } else {
            let p = this.gameBoard.indexOf(obj)
            this.gameBoard.splice(p, 1);
        }
        this.draw()
    }
    createElement(info: any): object {
        var obj: object = {}
        let offscreenCache = new offscreenCanvas()
        if (info.type === "round") {
        } else if (info.type === "sprite") {
            obj = new element.SpriteObject(info, offscreenCache, this)
        } else if (info.type === "rect") {
        }

        else if (info.type === "text") {
            obj = new element.TextObject(info, offscreenCache, this)
        }
        else if (info.type === "barcode") {
            obj = new advanceElement.barcodeObject(info, offscreenCache, this)
        }
        else if (info.type === "group") {
            obj = new element.GroupElement(info, offscreenCache, this)
        }

        return obj
    }
    addElements(elementList: Array<basicElementInterface>): void {
        elementList.forEach(e => {
            this.push(this.createElement(e))
        })
    }
    constructor(el: string, width: number, height: number) {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "mainCanvas"
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.border = "solid 1px #666"
        this.width = width;
        this.height = height;
        this.root = document.getElementById(el)
        this.root.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
    }
    // loop() {
    //     let dt = this.lastTime
    //     this.lastTime = new Date().getTime()
    //     dt = (this.lastTime - dt) / 1000;
    //     let tempDt = dt;
    //     if (dt > this.maxTime) {
    //         dt = this.maxTime
    //     }
    //     this.canvas.width = this.width;
    //     for (let j = 0; j < this.background.length; j++) {
    //         this.background[j].draw();
    //         this.background[j].step(dt)
    //     }
    //     for (let i = 0; i < this.gameBoard.length; i++) {
    //         this.gameBoard[i].draw();
    //         this.gameBoard[i].step(dt);
    //     }
    //     if (this.displayFrameRate) {
    //         this.frameRate(tempDt);
    //     }
    //     this.t = requestAnimationFrame(() => {
    //         this.loop()
    //     })

    // }
    draw() {
        clearTimeout(this.drawTimer)
        this.drawTimer=setTimeout(()=>{
            this.canvas.width = this.width;
            for (let i = 0; i < this.gameBoard.length; i++) {
                this.gameBoard[i].draw();
            }
        },30)
        
    }
    public gengratorImg(scale: number): any {
        if (scale == undefined || scale < 0) {
            scale = 1
        }
        // this.stopLoop()
        this.canvas.width = this.width * scale;
        this.canvas.height = this.height * scale;
        if (scale != 1) {
            this.gameBoard.forEach(item => {
                item.x = item.x * scale;
                item.y = item.y * scale;
                item.width = item.width * scale;
                item.height = item.height * scale;
                if (item instanceof element.TextObject) {
                    item.fontSize = item.fontSize * scale;
                }
            })
        }
        this.gameBoard.forEach(element => {
            element.focused = false;
            element.draw()
        })
        let image = new Image();
        image.src = this.canvas.toDataURL("image/png");
        return image;
    }
    public getElementToJson(): Array<basicElementInterface> {
        return this.elementToJson(this.gameBoard)
    }
    public elementToJson(list: Array<any>): Array<basicElementInterface> {
        let resList: Array<basicElementInterface> = []
        list.forEach(e => {
            console.log(e)
            let res: any = {}
            res.w = e.width;
            res.h = e.height;
            res.x = e.x;
            res.y = e.y;
            res.z = e.z;
            if (e instanceof element.SpriteObject) {
                res.type = "sprite";
                res.spriteInfo = e.sprite;
            } else if (e instanceof element.TextObject) {
                res.type = "text"
                res.bordered = e.bordered || false;
                res.text = e.text;
                res.textAligne = e.textAlign;
                res.color = e.color;
                res.borderColor = e.borderColor;
                res.borderWidth = e.borderWidth || 0;
                res.fontFamily = e.fontFamily;
                res.fontWidth = e.fontWidth;
                res.fontSize = e.fontSize;
                res.background = e.background;
            }
            else if (e instanceof element.GroupElement) {
                res.type = "group";
                res.children = this.elementToJson(e.children);
            }
            resList.push(res)
        })
        console.log(JSON.stringify(resList))
        return resList
    }
    public groupElement() {
        let groupres = []
        let e =
            this.gameBoard = this.gameBoard.filter(e => {
                if (e.focused) {
                    groupres.push(e)
                }
                return !e.focused
            })

    }
    public group() {
        let groupList: Array<any> = []
        this.gameBoard = this.gameBoard.filter(e => {
            if (e.focused) {
                groupList.push(e)
            }
            return !e.focused
        })
        if (groupList.length == 0) {
            return
        }
        let xMax = groupList[0].x, xMin = groupList[0].x, yMax = groupList[0].y, yMin = groupList[0].y, maxWidth = groupList[0].width, maxHeight = groupList[0].height
        for (let i = 1; i < groupList.length; i++) {
            if (groupList[i].x > xMax) {
                xMax = groupList[i].x;
                maxWidth = groupList[i].width
            }
            if (groupList[i].y > yMax) {
                yMax = groupList[i].y
                maxHeight = groupList[i].height
            }
            if (groupList[i].x < xMin) {
                xMin = groupList[i].x;
            }
            if (groupList[i].y < yMin) {
                yMin = groupList[i].y
            }
        }
        let groupInfo: GroupElementInterface = {
            x: xMin,
            y: yMin,
            type: "group",
            w: xMax - xMin + maxWidth,
            h: yMax - yMin + maxHeight,
            Vx: 0,
            z: 0,
            Vy: 0,
            children: this.elementToJson(groupList)
        }
        groupInfo.children.forEach(e => {
            e.x = e.x - xMin;
            e.y = e.y - yMin;
        })
        this.push(this.createElement(groupInfo))

    }
    public disGroup() {
        this.gameBoard.forEach(e => {
            if (e.focused && e instanceof element.GroupElement) {
                e.disGroup()
            }
        })
    }
}
class offscreenCanvas {
    canvas: any;
    isBuild: boolean = false
    constructor() {
        this.canvas = document.createElement('canvas');
    }
}




