 export interface basicElementInterface {
    w: number;
    h: number;
    x: number;
    y: number;
    z: number;
    Vx: number;
    Vy: number;
    type:string,
}
export interface spriteElementInterface extends basicElementInterface{
    spriteInfo:{
        Img: any,
        sx: number,
        sy: number,
        w: number,
        h: number,
    }
}
 export interface textElementInterface extends basicElementInterface{
    text:string,
    fontSize:string,
    bordered:boolean,
    autoFeed:boolean,
    borderWidth:number,
    borderColor:string,
    textAlign:string,
    color:string,
    background:string,
}
