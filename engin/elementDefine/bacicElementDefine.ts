import { basicElementInterface, GroupElementInterface } from "../elementDefineInterface/basicElementDefineInterface"
abstract class ElementObject {
    private _width: number;
    private _height: number;
    public get width() {
        return this._width
    }
    public set width(width: number) {
        this._width = width;
        this.offscreenCache.isBuild = false
    }
    public set height(height: number) {
        this.offscreenCache.isBuild = false
        this._height = height;
    }
    public get height() {
        return this._height;
    }
    focused: boolean;
    x: number;
    y: number;
    z: number;
    Vx: number;
    Vy: number;
    offscreenCache: any;
    canvas: any
    buildCache() {
        this.offscreenCache.canvas.width = this.width;
        this.offscreenCache.canvas.height = this.height;
        let ctx = this.offscreenCache.canvas.getContext('2d')
        this.onDraw(ctx)
        this.offscreenCache.isBuild = true;
    }
    draw() {
        if (!this.offscreenCache.isBuild) {
            this.buildCache()
        }
        if (this.focused) {
            this.canvas.ctx.strokeStyle = "#F00";
            this.canvas.ctx.lineWidth = "2";
            this.canvas.ctx.strokeRect(this.x, this.y, this.width, this.height)
        }
        this.canvas.ctx.drawImage(this.offscreenCache.canvas, this.x, this.y)
    };
    move(dt: number) {
        this.x += ~~(this.Vx * dt);
        this.y += ~~(this.Vy * dt);
    }
    step(dt: number) {
        // this.watchData()
        this.move(dt);
        this.onStep(dt);
    }
    constructor(info: basicElementInterface, canvas: any, offscreenCache: any) {
        this._width = info.w || 100;
        this._height = info.h || 100;
        this.Vx = info.Vx || 0;
        this.Vy = info.Vy || 0;
        this.x = info.x || 0;
        this.y = info.y || 0;
        this.z = info.z || 0
        this.canvas = canvas;
        this.offscreenCache = offscreenCache;
        this.created();
        this.focused = false
    }
    destoryed(elementObj: ElementObject,) {
        this.beforeDestoryed(elementObj)
        this.canvas.remove(elementObj)
    }
    abstract created(): void
    abstract onStep(dt: number): void
    abstract onDraw(ctx: any): void
    abstract beforeDestoryed(elementObj: ElementObject): void
    abstract afterDestoryed(elementObj: ElementObject): void
}
class RectangleObject extends ElementObject {
    color: string;
    TargetLifeCycle: number = Infinity;
    lifeCycle: number = 0;
    beforeDestoryed() {

    }
    afterDestoryed() {

    }
    created() {
    }
    onStep(dt: number) {
    }
    onDraw() {
    }
    constructor(info: any, canvas: any, offScreenCanvas: any) {
        super(info, canvas, offScreenCanvas)
        this.color = info.color || "rgb(245, 240, 240)"
    }
}
class GroupElement extends ElementObject {
    children: Array<ElementObject>
    constructor(groupInfo: GroupElementInterface, canvas: any, offscreenCache: any) {
        let xMax = 0, yMax = 0, xMin = Infinity, yMin = Infinity;
        groupInfo.children.forEach(e => {
            if (e.x > xMax) {
                xMax = e.x
            }
            if (e.y < yMin) {
                xMin = e.x
            }
            if (e.x > xMax) {
                yMax = e.y
            }
            if (e.y < yMin) {
                yMin = e.y
            }
        })
        let info: basicElementInterface = {
            x: xMin,
            y: yMin,
            z: 0,
            w: xMax - xMin,
            h: yMax - yMin,
            type: "group",
            Vy: 0,
            Vx: 0,
        }
        super(info, canvas, offscreenCache)
        this.children = []
    }
    beforeDestoryed() {

    }
    afterDestoryed() {
    }
    created() {
    }
    step(dt: number) {
        this.move(dt)
        this.onStep(dt)
    }
    onStep(dt: number) {
    }
    onDraw(ctx: any) {
        this.children.forEach(e => {
            ctx.drawImage(e.offscreenCache.canvas, e.x - this.x, e.y - this.y)
        })
    }
}
class SpriteObject extends ElementObject {
    sprite: any;
    onDraw(ctx: any) {
        ctx.drawImage(this.sprite.Img, this.sprite.sx, this.sprite.sy,
            this.sprite.w, this.sprite.h, 0, 0, this.width, this.height);
    }
    beforeDestoryed() {

    }
    afterDestoryed() {
    }
    created() {
    }
    step(dt: number) {
        this.move(dt)
        this.onStep(dt)
    }
    onStep(dt: number) {
    }
    constructor(info: any, offscreenCanvas: any, canvas: any) {
        super(info, canvas, offscreenCanvas);
        this.sprite = info.spriteInfo;
    }
}
class TextObject extends ElementObject {
    private _color: string;
    public get color() {
        return this._color
    }
    public set color(color: string) {
        this._color = color;
        this.offscreenCache.isBuild = false
    }
    private _fontSize: number;
    public get fontSize() {
        return this._fontSize
    }
    public set fontSize(fontSize: number) {
        this._fontSize = fontSize;
        this.offscreenCache.isBuild = false
    }
    private _fontFamily: string
    public get fontFamily() {
        return this._fontFamily
    }
    public set fontFamily(fontFamily: string) {
        this._fontFamily = fontFamily;
        this.offscreenCache.isBuild = false;
    }
    private _borderColor: string;
    public get borderColor() {
        return this._borderColor
    }
    public set borderColor(_borderColor: string) {
        this._borderColor = _borderColor;
        this.offscreenCache.isBuild = false;
    }
    private _text: string;
    public get text() {
        return this._text
    }
    public set text(text: string) {
        this._text = text;
        this.offscreenCache.isBuild = false;
    }
    private _bordered: boolean;
    public get bordered() {
        return this._bordered
    }
    public set bordered(_bordered: boolean) {
        this._bordered = _bordered;
        this.offscreenCache.isBuild = false;
    }
    private _borderWidth: number;
    public get borderWidth() {
        return this._fontSize
    }
    public set borderWidth(borderWidth: number) {
        this._borderWidth = borderWidth;
        this.offscreenCache.isBuild = false
    }
    private _fontWidth: number;
    public get fontWidth() {
        return this._fontWidth
    }
    public set fontWidth(fontWidth: number) {
        this._fontWidth = fontWidth;
        this.offscreenCache.isBuild = false
    }
    private _autoFeed: boolean;
    public get autoFeed() {
        return this._autoFeed
    }
    public set autoFeed(_autoFeed: boolean) {
        this._bordered = _autoFeed;
        this.offscreenCache.isBuild = false
    }
    private _background: string;
    public get background() {
        return this._background
    }
    public set background(background: string) {
        this._background = background;
        this.offscreenCache.isBuild = false;
    }
    private _textAlign: string;
    public get textAlign() {
        return this._textAlign
    }
    public set textAlign(textAlign: string) {
        this._textAlign = textAlign;
        this.offscreenCache.isBuild = false;
    }
    onDraw(ctx: any): void {

        if (this._background) {
            ctx.fillStyle = this._background;
            ctx.fillRect(0, 0, this.width, this.height)
        }
        if (this._bordered) {
            ctx.strokeStyle = this._borderColor;
            ctx.lineWidth = this._borderWidth;
            ctx.strokeRect(0, 0, this.width, this.height)
        }
        ctx.font = this.fontSize + "px " + this.fontFamily;
        ctx.textAlign = this.textAlign;
        console.log(this.fontSize + " px " + this.fontFamily)
        ctx.fillStyle = this.color;
        if (this.autoFeed) {// 自动换行
            let arr: string[] = this.getAutoFeed();
            console.log(arr)
            arr.forEach((element, index) => {
                if (this.textAlign === "center") {
                    ctx.fillText(element, this.width / 2, (this.height / 2 - (this.fontSize * arr.length - 1) / 2 + this.fontSize * (index + 1)))
                    if (this.fontWidth > 100) {
                        let count = ~~(this.fontWidth / 100)
                        for (let i = 0; i < count; i += 3) {
                            let offset: number = i * 0.1
                            let opacity = (count - i) / count
                            this.canvas.opacity = opacity;
                            ctx.fillText(element, this.width / 2, (this.height / 2 - (this.fontSize * arr.length - 1) / 2 + offset + this.fontSize * (index + 1)))
                        }
                        this.canvas.opacity = 1;
                    }
                } else if (this.textAlign === "left") {
                    ctx.fillText(element, this.borderWidth / 2, (this.height / 2 - (this.fontSize * arr.length - 1) / 2 + this.fontSize * (index + 1)))
                    if (this.fontWidth > 100) {
                        let count = ~~(this.fontWidth / 100)
                        for (let i = 0; i < count; i += 3) {
                            let offset: number = i * 0.1
                            let opacity = (count - i) / count
                            this.canvas.opacity = opacity;
                            ctx.fillText(element, this.borderWidth / 2, (this.height / 2 - (this.fontSize * arr.length - 1) / 2 + offset + this.fontSize * (index + 1)))
                        }
                        this.canvas.opacity = 1;
                    }
                } else if (this.textAlign = "right") {
                    ctx.fillText(element, this.width, (this.height / 2 + 2 * this.fontSize * index) / 2);
                    if (this.fontWidth > 100) {
                        let count = ~~(this.fontWidth / 100)
                        for (let i = 0; i < count; i += 3) {
                            let offset: number = i * 0.1
                            let opacity = (count - i) / count
                            this.canvas.opacity = opacity;
                            ctx.fillText(element, this.width, (this.height / 2 + 2 * this.fontSize * index) / 2 + offset);
                        }
                        this.canvas.opacity = 1;
                    }
                }
            })
        } else {
            if (this.textAlign === "center") {
                ctx.fillText(this.text, this.width / 2, (this.height + this.fontSize / 2) / 2);
            } else if (this.textAlign === "left") {
                ctx.fillText(this.text, 0, (this.height + this.fontSize / 2) / 2);
            } else if (this.textAlign = "right") {
                ctx.fillText(this.text, this.width, (this.height + this.fontSize / 2) / 2);
            }

        }
    }
    beforeDestoryed() {
    }
    getAutoFeed() {
        let res: string[] = [], widthCount = 0, start = 0;
        for (let i = 0; i < this.text.length; i++) {
            let unicode = this.text.charCodeAt(i);
            if ((unicode >= 0x4e00 && unicode < 0x9fa5) || (unicode >= 65281 && unicode <= 65374) || unicode === 12288) {
                if (widthCount + this.fontSize > this.width) {
                    res.push(this.text.substr(start, i - start - 1))
                    start = i - 1;
                    widthCount = 0
                }
                widthCount += this.fontSize;
            } else {
                if (widthCount + this.fontSize / 2 > this.width) {
                    res.push(this.text.substr(start, i - start - 1))
                    start = i - 1;
                    widthCount = 0
                }
                widthCount += this.fontSize / 2;
            }
        }
        if (start < this.text.length) {
            res.push(this.text.substr(start, this.text.length - start))
        }
        return res
    }
    afterDestoryed() {

    }
    created() {
    }
    onStep(dt: number) {
    }
    constructor(info: any, offScreen: any, canvas: any) {
        super(info, canvas, offScreen)
        this._color = info.color || "#000";
        this._fontFamily = info.fontFamily || "微软雅黑";
        this._textAlign = info.textAlign || "center"
        this._fontSize = info.fontSize || 20;
        this._borderColor = info.borderColor || "#000";
        this._borderWidth = info.borderWidth || 1;
        this._text = info.text;
        this._autoFeed = info.autoFeed || false;
        this._bordered = info.bordered || false;
        this._fontWidth = info.fontWidth || 100;
        this._background = info.background || undefined
        this.focused = true;
    }
}
export default {
    TextObject,
    ElementObject,
    GroupElement,
    // seqSpriteObject,
    // roundObject,
    // triangleObject,
    SpriteObject
}
