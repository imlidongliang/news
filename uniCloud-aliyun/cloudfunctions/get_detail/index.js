'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		article_id
	} = event
	let userInfo = await db.collection('user').doc(user_id).get()
	userInfo = userInfo.data[0]
	
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			// 是否关注作者
			is_author_like: $.in(['$author.id', userInfo.author_likes_ids]),
			// 有没有收藏
			is_like: $.in(['$_id', userInfo.article_likes_ids]),
			// 有没有点赞
			is_thumbs_up: $.in(['$_id', userInfo.thumbs_up_article_ids])
		})
		.match({
			_id: article_id
		})
		.project({
			coments: 0
		})
		.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data[0]
	}
};
