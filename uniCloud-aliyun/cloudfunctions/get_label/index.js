'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		type
	} = event
	let matchObj = {}
	if (type !== 'all') {
		matchObj = {
			my_label: true
		}
	}
	
	let userInfo = await db.collection('user').doc(user_id).get();
	userInfo = userInfo.data[0]
	
	const label = await db.collection('label')
	.aggregate()
	.addFields({
		my_label: $.in(['$_id', $.ifNull([userInfo.label_ids, []])])
	})
	.match(matchObj)
	.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: label.data
	}
};
