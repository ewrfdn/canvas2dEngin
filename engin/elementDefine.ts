interface elementInfo {
    w: number;
    h: number;
    x: number;
    y: number;
    z: number;
    Vx: number;
    Vy: number;
}
abstract class elementObject {
    width: number;
    height: number;
    x: number;
    y: number;
    z: number;
    Vx: number;
    Vy: number;
    canvas: any
    abstract draw(): void;
    move(dt: number) {
        this.x += ~~(this.Vx * dt);
        this.y += ~~(this.Vy * dt);
    }
    step(dt: number, that: any) {
        this.move(dt);
        this.onStep(dt);
    }
    constructor(info: elementInfo, canvas: any) {
        this.width = info.w || 100;
        this.height = info.h || 100;
        this.Vx = info.Vx || 100 ;
        this.Vy = info.Vy || 100 ;
        this.x = info.x || 0;
        this.y = info.y || 0;
        this.z = info.z || 0
        this.canvas = canvas;
        this.created();
    }
    destoryed(elementObj: elementObject,) {
        this.beforeDestoryed(elementObj)
        this.canvas.remove(elementObj)
    }
    abstract created(): void
    abstract onStep(dt: number): void
    abstract beforeDestoryed(elementObj: elementObject): void
    abstract afterDestoryed(elementObj: elementObject): void
}
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
class rectangleObject extends elementObject {
    color: string;
    TargetLifeCycle: number = Infinity;
    lifeCycle: number = 0;
    draw() {
        this.canvas.ctx.fillStyle = this.color;
        this.canvas.ctx.rect(this.x, this.y, this.width, this.height)
        this.canvas.ctx.fill()
    }
    beforeDestoryed() {

    }
    afterDestoryed() {

    }
    created() {
    }
    onStep(dt: number) {
    }
    constructor(info: any, canvas: any) {
        super(info, canvas)
        this.color = info.color || "rgb(245, 240, 240)"
    }
}
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
class spriteObject extends elementObject {
    sprite: any;
    offscreen: number;
    draw() {
        if (!this.canvas.offScreen[this.offscreen].isBuild) {
            this.canvas.offScreen[this.offscreen].isBuild = true;
            this.canvas.offScreen[this.offscreen].canvas.width = this.width;
            this.canvas.offScreen[this.offscreen].canvas.height = this.height;
            this.canvas.offScreen[this.offscreen].canvas.getContext('2d').drawImage(this.sprite.Img, this.sprite.sx, this.sprite.sy,
                this.sprite.w, this.sprite.h, 0, 0, this.width, this.height);
        }
        this.canvas.ctx.drawImage(this.canvas.offScreen[this.offscreen].canvas, this.x, this.y)
    }
    beforeDestoryed() {

    }
    afterDestoryed() {

    }
    created() {
    }
    step(dt: number, canvas: any) {
        this.move(dt)
        this.onStep(dt)
    }
    onStep(dt: number) {

    }
    constructor(info: any, sprite: any, offscreen: number, canvas: any) {
        super(info, canvas);
        this.offscreen = offscreen;
        this.sprite = sprite;
    }
}
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
class textObject extends elementObject {
    color: string;
    fontSize: number;
    borderColor: string;
    borderWidth: number;
    draw(): void {

    }
    beforeDestoryed() {

    }
    afterDestoryed() {

    }
    created() {
    }
    onStep(dt: number) {

    }
    constructor(info: any, canvas: any) {
        super(info, canvas)
        this.color = info.color;
        this.fontSize = info.fontSize;
        this.borderColor = info.fontSize;
        this.borderWidth = info.borderWidth;
    }
}

export default {
    textObject,
    // seqSpriteObject,
    // roundObject,
    // triangleObject,
    spriteObject
}