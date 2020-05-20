export{}

interface Eat {
  eat(food: string): void
}
interface Run {
  run(distance: number): void
}

class Person implements Eat, Run {
  eat(food: string): void {
    console.log(food);
  }
  run(distance:number): void {
    console.log(distance);
  }
}