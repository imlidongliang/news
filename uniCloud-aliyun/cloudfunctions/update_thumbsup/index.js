const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	const {
		user_id,
		article_id
	} = event
	
	
	const userInfo = await db.collection('user').doc(user_id).get()
	const thumbs_up_article_ids = userInfo.data[0].thumbs_up_article_ids
	let dbCmdFunc = null
	if (thumbs_up_article_ids.includes(article_id)) {
		return {
			code: 200,
			msg: "你已经点过赞了",
			data: []
		}
	} else {
		dbCmdFunc = dbCmd.addToSet(article_id)
	}
	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids: dbCmdFunc
	})
	await db.collection('article').doc(article_id).update({
		//  减少一次请求
		thumbs_up_count: dbCmd.inc(1)
	})
	
	return {
		code: 200,
		msg: "数据请求成功",
		data: []
	}
}
