// import JsBarcode from "jsbarcode"
import element from "./bacicElementDefine"
class barcodeObject extends element.ElementObject {
    private _barcodeText:string
    public get barcodeText(){
        return this._barcodeText
    }
    public set barcodeText(val){
        this._barcodeText=val
    }
    public getBarcodeImage(){
    }
    constructor(info: any, offscreenCanvas: any, canvas: any){
        super(info, canvas,offscreenCanvas)
        this._barcodeText=info.text
    }
    beforeDestoryed(){

    }
    afterDestoryed(){

    }
    onStep(){

    }
    created(){

    }
    onDraw(ctx:any){
        // JsBarcode(this.offscreenCache.canvas,this.barcodeText)
    }

}
export default {barcodeObject}