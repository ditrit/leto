import getDatas from 'hcl/src/plugins/terraform/index';

onmessage = function(event) {
	var datas = getDatas(event.data)
	postMessage(datas);
}