interface shape {
  draw(): void
}

export class Rectangle implements shape {
  public draw() {
    console.log('shape reactangle');
  }
}


export class Circle implements shape {
  public draw() {
    console.log('shape Circle');
  }
}

export abstract class ShapeDecorator implements shape {
  protected decoratedShape!: shape

  constructor(decoratedShape: shape) {
    this.decoratedShape = decoratedShape;
  }

  public draw() {
    console.log('shape Circle');
  }
}

export class RedShapeDecorator extends ShapeDecorator {

  constructor(decoratedShape: shape) {
    super(decoratedShape)
  }
  
  public draw() {
    this.decoratedShape.draw()

    this.setRedBorder(this.decoratedShape)
  }

  public setRedBorder(decoratedShape: shape){
    console.log("Border Color: Red");
  }
}

class DecoratorPatternDemo {

  private circle = new Circle();

  private redCircle = new RedShapeDecorator(new Circle());

  private redRectangle = new RedShapeDecorator(new Rectangle());

  constructor() {
    this.redCircle.draw();
    this.circle.draw();
    this.redRectangle.draw();
  }
}

new DecoratorPatternDemo();