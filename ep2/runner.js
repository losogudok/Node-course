function getNext(it, result, err) {
	var next;

	if (err) {
		it.throw(result);
	}
	else {
		next = it.next(result);
	}

	if (next.done === false) {
		next.value
			.then(function(result){
				getNext(it, result);
			},function(err){
				getNext(it, err, true)
			});
	}
}

module.exports = function(it) {
	if (it && it.next) {
		getNext(it);
	}
};