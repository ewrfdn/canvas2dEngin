interface elementInfo{
    w:number;
    h:number;
    x:number;
    y:number;
    z:number;
    Vx:number;
    Vy:number;
}
abstract class elementObject{
    public  width:number;
    public height:number;
    public  x:number;
    public  y:number;
    public  z:number;
    public   Vx:number;
    public Vy:number;
   public canvas:any
    abstract draw():void;
    move(dt:number){
        this.x+=~~(this.Vx*dt);
        this.y+=~~(this.Vy*dt);
    }
    step(dt:number){
        this.move(dt);
        this.onStep(dt)
    }
    constructor(info:elementInfo,canvas:any){
        this.width=info.w||100;
        this.height=info.h||100;
        this.Vx=info.Vx||100
        this.Vy=info.Vy||100
        this.x=info.x||0;
        this.y=info.y||0;
        this.z=info.z||0
        this.canvas=canvas;
        this.created()
    }
    destoryed(elementObj:elementObject,){
        this.beforeDestoryed(elementObj)
        this.canvas.remove(elementObj)
    }
    abstract created():void
    abstract onStep(dt:number):void
    abstract beforeDestoryed(elementObj:elementObject ):void
    abstract afterDestoryed(elementObj:elementObject):void
}
 class rectangleObject extends elementObject{
    color:string;
    TargetLifeCycle:number=Infinity;
    lifeCycle:number=0;
    draw(){
        this.canvas.ctx.fillStyle=this.color;
        this.canvas.ctx.rect(this.x,this.y,this.width,this.height)
        this.canvas.ctx.fill()
    }
    beforeDestoryed(){

    }
    afterDestoryed(){

    }
    created(){
    }
    onStep(dt:number){
    }
    constructor(info:any,canvas:any){
        super(info,canvas)
        this.color=info.color||"rgb(245, 240, 240)"
    }
 }
 class spriteObject extends elementObject{
    sprite:any;
    offscreen:number;
    draw(){
        if(!this.canvas.offScreen[this.offscreen].isBuild){
            this.canvas.offScreen[this.offscreen].isBuild=true;
            this.canvas.offScreen[this.offscreen].canvas.width=this.width;
            this.canvas.offScreen[this.offscreen].canvas.height=this.height;
            this.canvas.offScreen[this.offscreen].canvas.getContext('2d').drawImage(this.sprite.Img, this.sprite.sx, this.sprite.sy,
            this.sprite.w, this.sprite.h, 0,0, this.width, this.height);
        }
        this.canvas.ctx.drawImage(this.canvas.offScreen[this.offscreen].canvas,this.x,this.y)
    }
    beforeDestoryed(){

    }
    afterDestoryed(){

    }
    created(){
    }
    onStep(dt:number){
    }
    constructor(info:any,sprite:any,offscreen:number,canvas:any){
        super(info,canvas);
        this.offscreen=offscreen;
        this.sprite=sprite;
    }
 }
 class textObject extends elementObject{
    color:string;
    fontSize:number;
    borderColor:string;
    borderWidth:number;
    draw():void{

    }
    beforeDestoryed(){

    }
    afterDestoryed(){

    }
    created(){
    }
    onStep(dt:number){

    }
     constructor(info:any,canvas:any){
        super(info,canvas)
        this.color=info.color;
        this.fontSize=info.fontSize;
        this.borderColor=info.fontSize;
        this.borderWidth=info.borderWidth;
     }
 }

export default class canvas2d{
    x:number=0;
    y:number=0;
    width:number;
    height:number;
    ctx:any;
    displayFrameRate:boolean=true;
    rate:number=0;
    root:any;
    canvas:any;
    lastTime:number=0;
    maxTime:number=1/30;
    offScreen:any[]=[];
    t:any;
    interval:number=0;
    gameBoard:any[]=[];
    background:any[]=[];
    frameRate(dt:number){
        this.interval+=dt;
        if(this.interval>2){
        this.interval=0;
        this.rate=~~(1/dt);
        }
        this.ctx.fillStyle="rgb(0,255,0)"
        this.ctx.font="40px Verdana";
        this.ctx.fillText("FPS:"+this.rate,40,40)
       
    }
    push(obj:any,type?:string):void{
        if(type==="bg"){
            this.background.push()
        }
        this.gameBoard.push(obj)
    }
    removeBg(obj:any){
        let p=this.background.indexOf(obj)
        this.background.splice(p,1);
    }
    remove(obj:any,index?:number):void{
        if(index!==undefined){
            this.gameBoard.splice(index,1);
        }else{
            let p=this.gameBoard.indexOf(obj)
            this.gameBoard.splice(p,1);
        }
    }
   createElement(type:string,info:object,sprite?:any):object{
    var obj:object={}
    if(type==="round"){
    //    this.offScreen.push(new offscreenCanvas(document.createElement('canvas')))
    //    obj=new element.roundObject(info,this.offScreen.length-1)
    }else if(type==="spite"&&sprite!==undefined){
        if(sprite.targerFrame){
            // obj=new element.seqSpriteObject(info,sprite,this)

        }else{
            this.offScreen.push(new offscreenCanvas(document.createElement('canvas')))
            obj=new spriteObject(info,sprite,this.offScreen.length-1,this)
        }
    }else if(type==="rect"){
        // obj=new element.rectangleObject(info,this)
    }
    // else if(type==="triangel"){
    //     obj=new element.rectangleObject(info)
    // }
    else if(type==="text"){
        obj=new textObject(info,this)
    }
      return obj
    }
    constructor(el:string,width:number,height:number){
        this.canvas=document.createElement("canvas");
        this.canvas.width=width;
        this.canvas.height=height;
        this.width=width;
        this.height=height;
        this.root=document.getElementById(el)
        this.root.appendChild(this.canvas)
        this.ctx=this.canvas.getContext('2d')
     }
     loop(){
        var dt=this.lastTime
        this.lastTime = new Date().getTime()
        dt=(this.lastTime-dt)/ 1000;
        let tempDt=dt;
        if (dt > this.maxTime) {
            dt = this.maxTime
        }
        this.canvas.width=this.width;
        for(let j=0;j<this.background.length;j++){
            this.background[j].draw();
            this.background[j].step(dt)
        }
        for(let i=0;i<this.gameBoard.length;i++){
            this.gameBoard[i].draw();
            this.gameBoard[i].step(dt);
        }
        if(this.displayFrameRate){
            this.frameRate(tempDt);
        }
        this.t=requestAnimationFrame(()=>{
            this.loop()
        })

     }
}
 class audio{
    el:any;
    currentTime:number=0;
    playTime:number=0;
    sustainTime:number=-1;
    loop:boolean=false;
    volume:number=1;
    constructor(src:string,currentTime?:number,sustainTime?:number){
        this.el=new Audio();
        this.el.src=src;
        if(currentTime!==undefined){
            this.currentTime=currentTime
        }
        if(sustainTime!==undefined){
            this.sustainTime=sustainTime
        }
    }
    play():void{
        this.el.currentTime=this.currentTime;
        this.playTime=0
        if(this.loop){
            this.el.loop=true;
        }
        // this.el.fastSeek(1)
        this.el.play()
    }
    pause():void{
        this.el.pause()
    }
 }
 class control{
     
 }
 class collision{
     type:number;
     mode:string;
     Collision:any[]=[];
     isCollision:boolean;
     overlape(obj1:any,obj2:any):boolean{
         return !((obj1.x+obj1.width)<obj2.x||(obj1.y+obj1.height)<obj2.y||
         (obj2.x+obj2.width)<obj1.x||(obj2.y+obj2.height)<obj1.y)
     }
     checkCollision(obj1:any,that:any):void{
            for(let i=0;i<that.gameBoard.length;i++){
                if(that.gameBoard[i].col&&obj1.col.type===that.gameBoard[i].col.type&&obj1!==that.gameBoard[i]){
                    if(this.overlape(obj1,that.gameBoard[i])){
                        obj1.col.isCollision=true
                        that.gameBoard[i].col.isCollision=true;
                        // this.Collision.push(that.gameBoard[i])
                        if(this.mode==="single"){
                            break;
                        }
                    }
                    else{
                        obj1.col.isCollision=false

                    }
                }

            }
     }
     constructor(type:number,mode?:string){
        this.type=type;
        this.mode=mode||"single";
        this.isCollision=false;
     }
 }
 class offscreenCanvas{
      canvas:any;
      isBuild:boolean=false
      constructor(canvas:any){
          this.canvas=canvas;
      }
 }


 