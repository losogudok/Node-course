//var it;
//
//function gen(path) {
//	var module = yield process.nextTick(function(){
//		it.next(require(path));
//	});
//	return module;
//}
//
//function* requireAsync() {
//	it = gen();
//	var value = it.next();
//}
//
//global.requireAsync = requireAsync;