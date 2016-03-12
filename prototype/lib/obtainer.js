
function ___OBTAINER(){
	var _this = this;
	this.objs = {};
	this.register = function(key,obj){
		if(!_this.objs[key]){
			_this.objs[key] = obj;
		} else{
			console.log("Obtainer: cannot register object as it already exists - "+key);
		}
	}
	this.get = function(key){
		if(_this.objs[key]){
			return _this.objs[key];
		} else{
			console.log("Obtainer: cannot get object as it doesn't exist - "+key);
		}

	}
}

var __OBTAINER = new ___OBTAINER();

function REG(key,obj){
	__OBTAINER.register(key,obj);
}

function GET(key,a,b,c,d,e){
	var obj = __OBTAINER.get(key);
	if(typeof obj == "function"){
		return obj(a,b,c,d,e);
	} else{
		return obj;
	}
}
