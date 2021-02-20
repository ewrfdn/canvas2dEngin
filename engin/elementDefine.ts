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
    offscreenCache: any;
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
    constructor(info: elementInfo, canvas: any,offscreenCache:any) {
        this.width = info.w || 100;
        this.height = info.h || 100;
        this.Vx = info.Vx || 0 ;
        this.Vy = info.Vy || 0 ;
        this.x = info.x || 0;
        this.y = info.y || 0;
        this.z = info.z || 0
        this.canvas = canvas;
        this.offscreenCache=offscreenCache;
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
    constructor(info: any, canvas: any,offScreenCanvas:any) {
        super(info, canvas,offScreenCanvas)
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
    draw() {
        if (!this.offscreenCache.isBuild) {
            this.offscreenCache.isBuild = true;
            this.offscreenCache.canvas.width = this.width;
            this.offscreenCache.canvas.height = this.height;
            this.offscreenCache.canvas.getContext('2d').drawImage(this.sprite.Img, this.sprite.sx, this.sprite.sy,
                this.sprite.w, this.sprite.h, 0, 0, this.width, this.height);
        }
        this.canvas.ctx.drawImage(this.offscreenCache.canvas, this.x, this.y)
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
    constructor(info: any, sprite: any, offscreenCanvas: any, canvas: any) {
        super(info, canvas,offscreenCanvas);
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
    fontFamily:String
    borderColor: string;
    text:string;
    bordered:boolean;
    borderWidth: number;
    autoFeed:boolean;
    background:string;
    textAlign:string;
    draw(): void {
        if (!this.offscreenCache.isBuild) {
            this.offscreenCache.isBuild = true;
            this.offscreenCache.canvas.width = this.width;
            this.offscreenCache.canvas.height = this.height;
            let ctx=this.offscreenCache.canvas.getContext('2d')
            if(this.bordered){
                ctx.strokeStyle=this.borderColor;
                ctx.lineWidth=this.borderWidth;
                ctx.strokeRect(0,0,this.width,this.height)
            }
            if(this.background){
                ctx.fillStyle=this.background;
                ctx.fillRect(this.borderWidth,this.borderWidth,this.width-this.borderWidth*2,this.height-this.borderWidth*2)
            }
            ctx.font=this.fontSize+"px " +this.fontFamily;
            ctx.textAlign=this.textAlign;
            console.log(this.fontSize+" px " +this.fontFamily)
            ctx.fillStyle=this.color;
            if(this.autoFeed){// 自动换行
                let arr:string[] =this.getAutoFeed();
                console.log(arr)
                arr.forEach((element,index)=>{
                    if(this.textAlign==="center"){
                        ctx.fillText(element,this.width/2,(this.height/2-(this.fontSize*arr.length-1)/2+this.fontSize*(index+1)))
                        }else if(this.textAlign==="left"){
                        ctx.fillText(element,0,(0+2*this.fontSize*index)/2)
                        }else if(this.textAlign="right"){
                        ctx.fillText(element,this.width,(this.height/2+2*this.fontSize*index)/2);
                        }
                })
            }else{
            if(this.textAlign==="center"){
                ctx.fillText(this.text,this.width/2,(this.height+this.fontSize/2)/2);
            }else if(this.textAlign==="left"){
            ctx.fillText(this.text,0,(this.height+this.fontSize/2)/2);

            }else if(this.textAlign="right"){
            ctx.fillText(this.text,this.width,(this.height+this.fontSize/2)/2);
            }

            }
            console.log(this.offscreenCache)
        }
        this.canvas.ctx.drawImage(this.offscreenCache.canvas, this.x, this.y)
    }
    beforeDestoryed() {

    }
    getAutoFeed(){
        let res:string[]=[],widthCount=0,start=0;
        for(let i=0;i<this.text.length;i++){
            let unicode=this.text.charCodeAt(i);
            if((unicode>=0x4e00 && unicode<0x9fa5)||(unicode>=65281&&unicode<=65374)||unicode===12288){
                if(widthCount+this.fontSize>this.width){
                    res.push(this.text.substr(start,i-start-1))
                    start=i-1;
                    widthCount=0
                }
                widthCount+=this.fontSize;
            }else{
                if(widthCount+this.fontSize/2>this.width){
                    res.push(this.text.substr(start,i-start-1))
                    start=i-1;
                    widthCount=0
                }
                widthCount+=this.fontSize/2;
            }
        }
        if(start<this.text.length){
            res.push(this.text.substr(start,this.text.length-start))
        }
        return res
    }
    afterDestoryed() {

    }
    created() {
    }
    onStep(dt: number) {
    }
    constructor(info: any,offScreen:any, canvas: any) {
        super(info, canvas,offScreen)
        this.color = info.color||"#000";
        this.fontFamily=info.fontFamily|| "微软雅黑";
        this.textAlign=info.textAlign||"center"
        this.fontSize = info.fontSize||20;
        this.borderColor = info.borderColor||"#000";
        this.borderWidth = info.borderWidth||1;
        this.text=info.text;
        this.autoFeed=info.autoFeed||false;
        this.bordered=info.bordered||false;
        this.background=info.background||""
    }
}
export default {
    textObject,
    // seqSpriteObject,
    // roundObject,
    // triangleObject,
    spriteObject
}