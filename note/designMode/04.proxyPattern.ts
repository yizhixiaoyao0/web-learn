interface Image {
  display() :void;
}

export class RealImage implements Image {

  private fileName: string = '';

  constructor(fileName: string) {
    this.fileName = fileName;
    this.loadFromDisk(fileName);

  }
  /**
   * display
   */
  public display() {
    console.log(`displaying ${this.fileName}`);
  }

  private loadFromDisk(fileName: string): void {

    console.log(`loading ${fileName}`);
    
  }
}

export class ProxyImage implements Image {
  private realImage!: RealImage;
  private fileName: string = '';

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  public display(): void{
    if(this.realImage == null){
      this.realImage = new RealImage(this.fileName);
    }
    this.realImage.display();
  }
}

export class ProxyPatternDemo {
  constructor() {
    let image:Image = new ProxyImage('TEXT');

    image.display();
  }
}
