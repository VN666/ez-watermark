export default class Watermark {
  constructor (el, options) {
    /** 初始化配置参数 */
    this.text = options.text || "ez-watermark"; // 水印文字
    this.lineSpace = options.lineSpace || 8; // 水印行间距，对于多行水印情况生效
    this.size = options.size || 16; // 水印字体大小
    this.family = options.family || "Times New Roman"; // 水印字体
    this.color = options.color || "#CFCFCF"; // 水印文字颜色
    this.angle = options.angle || 0; 
    this.offsetX = options.offsetX || 120; // 水印水平间距
    this.offsetY = options.offsetY || 120; // 水印垂直间距
    this.opacity = options.opacity || 0.5; // 水印透明度
    this.zIndex = options.zIndex || 10001;
    this.el = document.getElementById(el) || document.body;

    this.initCanvas();
    this.setBrush();
  }

  /** 画布设置 */
  initCanvas () {
    const width = this.el.offsetWidth;
    const height = this.el.offsetHeight;
    this.minSize = Math.SQRT2 * Math.max(width, height); // 画布最小尺寸
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.minSize;
    this.canvas.height = this.minSize;
  }

  /** 画笔设置 */
  setBrush () {
    this.context = this.canvas.getContext("2d");

    const clipStartX = Math.ceil((this.minSize - Math.max(this.el.offsetWidth, this.el.offsetHeight)) / 2);
    const clipStartY = Math.ceil((this.minSize - Math.max(this.el.offsetWidth, this.el.offsetHeight)) / 2); 

    this.context.font = `${this.size}px ${this.family}`;
    this.context.textAlign = "left";
    this.context.textBaseline = "top";
    this.context.fillStyle = this.hexToRGBA(this.color, this.opacity);
    this.context.translate(this.minSize / 2, this.minSize / 2);
    this.context.rotate(this.angle * Math.PI / 180);
    this.context.translate(-this.minSize / 2, -this.minSize / 2);
  }

  /** 十六进制转rgb */
  hexToRGBA (hex, opacity = 0.5) {
    // let h = hex.slice(hex[0] === "#" ? 1 : 0);
    let h = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (h.length === 3) h = [...h].map(x => x + x).join('');
    h = parseInt(h, 16);
    return ('rgba' + '(' + (h >>> 16) + ', ' + ((h & 0x00ff00) >>> 8) + ', ' + ((h & 0x0000ff) >>> 0) + (`, ${opacity}`) + ')');
  }

  /** 添加水印 */
  draw () {
    if (this.text.length === 0) throw new Error("text is need");
    const textArr = this.text.split(",").filter((item) => !!item.length);
    const len = textArr.length;
    const maxWidth = textArr.reduce((acc, cur) => this.context.measureText(cur).width > acc ? this.context.measureText(cur).width : acc, 0);
    const maxHeight = len * this.size + (len - 1) * this.lineSpace;
    const gridWidth = maxWidth + this.offsetX;
    const gridHeight = maxHeight + this.offsetY;
    const rowCount = Math.ceil(this.minSize / gridHeight);
    const colCount = Math.ceil(this.minSize / gridWidth);
    
    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        for (let i = 0; i < len; i++) {
          const posX = c * gridWidth;
          const posY =  maxHeight / 2  - (this.lineSpace + this.size) * (len - 1) / 2 + i * (this.size + this.lineSpace) + r * gridHeight;
          this.context.fillText(textArr[i], posX, posY);
        }
      }
    }
  }

  toBase64 () {
    this.draw();
    const canvasTemp = document.createElement("canvas");
    const contextTemp = canvasTemp.getContext("2d");
    const elTemp = document.getElementById("temp");
    canvasTemp.width = this.el.offsetWidth;
    canvasTemp.height = this.el.offsetHeight;

    const clipStartX = Math.ceil((this.minSize - Math.max(this.el.offsetWidth, this.el.offsetHeight)) / 2);
    const clipStartY = Math.ceil((this.minSize - Math.max(this.el.offsetWidth, this.el.offsetHeight)) / 2);
    
    contextTemp.drawImage(this.canvas, clipStartX, clipStartY, this.el.offsetWidth, this.el.offsetHeight, 0, 0, this.el.offsetWidth, this.el.offsetHeight);

    return canvasTemp.toDataURL();
  }

  add () {    
    if (!this.base64) this.base64 = this.toBase64();
    this.div = document.createElement("div");
    this.div.style.pointerEvents = "none";
    this.div.style.position = "absolute";
    this.div.style.left = "0px";
    this.div.style.top = "0px";
    this.div.style.width = this.el.offsetWidth + "px";
    this.div.style.height = this.el.offsetHeight + "px";
    this.div.style.zIndex = this.zIndex;
    this.div.style.background = `url('${this.base64}') left top no-repeat`;
    this.el.appendChild(this.div);
  }

  resize () {
    this.remove();
    this.add();   
  }

  remove () {
    if (!!this.div) {
      this.el.removeChild(this.div);
      this.div = null;
    }
  }
}