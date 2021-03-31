'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		name,
		page = 1,
		pageSize = 10
	} = event
	let matchOpt = {}
	
	if( name !== '全部') {
		matchOpt = {
			classify: name
		}
	}
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_id_ids = userInfo.data[0].article_likes_ids
	
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			is_like: $.in(['$_id', article_id_ids])
		})
		.match(matchOpt)
		.project({
			content: 0
		})
		.skip(pageSize * (page - 1) )
		.limit(pageSize)
		.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
