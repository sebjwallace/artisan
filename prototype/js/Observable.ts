
abstract class Observable{

  protected subscribers = [];
  protected counter = 0;

  observe(fn,key){
    if (this.subscribers[key]) {
        this.subscribers[key].push(fn);
    } else {
        this.subscribers[key] = [];
        this.subscribers[key].push(fn);
    }
  }

  update(key, argA?, argB?, argC?, argD?){
    for (let _key in this.subscribers[key]) {
        this.subscribers[key][_key](argA, argB, argC, argD);
    }
  }

}
