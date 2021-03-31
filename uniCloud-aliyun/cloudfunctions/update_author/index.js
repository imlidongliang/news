'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		author_id
	} = event
	
	let userInfo  = await db.collection('user').doc(user_id).get()
	const author_likes_ids = userInfo.data[0].author_likes_ids
	
	let author_ids = ''
	
	if (author_likes_ids.includes(author_id)) {
		author_ids = dbCmd.pull(author_id)
	} else {
		author_ids = dbCmd.addToSet(author_id)
	}
	
	await db.collection('user').doc(user_id).update({
		author_likes_ids: author_ids
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功'
	}
};
