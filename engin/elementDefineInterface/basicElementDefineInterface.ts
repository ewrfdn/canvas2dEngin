 export interface basicElementInterface {
    w: number;
    h: number;
    x: number;
    y: number;
    z: number;
    Vx: number;
    Vy: number;
}
export interface spriteElementInterface extends basicElementInterface{
    spiteInfo:{
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
