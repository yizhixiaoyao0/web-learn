export class Subject {
  private observers :Observer[] = [];

  private state: number = 0;

  /**
   * getState
   */
  public getState() {
    return this.state;
  }

  /**
   *  setState
   */
  public setState(state: number): void{
    this.state = state;
    this.notifyAllObservers();
  }

  public attach(observer: Observer): void {
    this.observers.push(observer);
  }


  /**
   * notifyAllObservers
   */
  public notifyAllObservers() {
    this.observers.forEach(observer => {
      observer.update();
    })
  }



}

export abstract class Observer {

  protected subject!: Subject;

  /**
   * update
   */
  public abstract update(): void;
}

export class BinaryObservser extends Observer {

  constructor(subject: Subject) {
    super()

    this.subject = subject;
    this.subject.attach(this);
  }

  public update(): void{
    console.log( `Binary String:   ${this.subject.getState()}`); 
 }
}

export class OctalObservser extends Observer {

  constructor(subject: Subject) {
    super()

    this.subject = subject;
    this.subject.attach(this);
  }

  public update(): void{
    console.log( `Octal String:   ${this.subject.getState()}`); 
 }
}

export class ObserverPatternDemo {
  constructor () {
    let subject = new Subject();

    new BinaryObservser(subject);
    new OctalObservser(subject);

    subject.setState(15)
  }
}