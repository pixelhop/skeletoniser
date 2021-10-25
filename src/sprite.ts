export class Sprite {
    public image: HTMLImageElement;
    public loaded: Promise<boolean>;
  
    constructor(private src: string) {
      this.image = new Image();
      this.loaded = new Promise((resolve) => {
        this.image.onload = () => resolve(true);
      });
      this.image.src = src;
    }
  }
  