
interface Shape {
  draw(): void;
}

class Rectangle implements Shape {
  public draw() {
    console.log(`Inside Rectangle::draw() method.`);
  }
}

class Square implements Shape {
  public draw() {
    console.log(`Inside Square::draw() method.`);
  }
}

class ShapeFactory {

  public getShape(shapeType: string) {
    if(shapeType == null){
      return null;
   }        
   if(shapeType.toLocaleUpperCase(shapeType) === 'RECTANGLE'){
      return new Rectangle();
   } else if(shapeType.toLocaleUpperCase(shapeType) ===  "SQUARE"){
      return new Square();
   } 
   return null;
  }
}

export class FactoryPatternDemo {

  constructor() {
    let shapeFactory = new ShapeFactory();

    let shape = shapeFactory.getShape('Square');

    shape?.draw();
  }
}