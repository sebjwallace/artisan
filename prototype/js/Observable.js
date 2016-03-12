var Observable = (function () {
    function Observable() {
        this.subscribers = [];
        this.counter = 0;
    }
    Observable.prototype.observe = function (fn, key) {
        if (this.subscribers[key]) {
            this.subscribers[key].push(fn);
        }
        else {
            this.subscribers[key] = [];
            this.subscribers[key].push(fn);
        }
    };
    Observable.prototype.update = function (key, argA, argB, argC, argD) {
        for (var _key in this.subscribers[key]) {
            this.subscribers[key][_key](argA, argB, argC, argD);
        }
    };
    return Observable;
}());
//# sourceMappingURL=Observable.js.map