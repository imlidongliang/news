'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		article_id, // 文章id
		content, //评论内容
		comment_id = '', //回复的id
		reply_id = '', // 评论id
		is_reply = false // 是否子回复
	} = event

	let userInfo = await db.collection('user').doc(user_id).get()
	userInfo = userInfo.data[0]

	// 获取当前文章的信息
	const article = await db.collection('article').doc(article_id).get()
	// 获取文章下的所有评论
	const comments = article.data[0].comments


	let commentObj = {
		comment_id: genId(5),
		comment_content: content,
		creat_time: new Date().getTime(),
		is_reply: is_reply,
		author: {
			author_name: userInfo.author_name,
			author_id: userInfo._id,
			avatar: userInfo.avatar,
			professional: userInfo.professional
		},
		reply: []
	}

	// 评论文章
	if (comment_id === '') {
		commentObj.reply = []
		commentObj = dbCmd.unshift(commentObj)
	} else {
		// 获取评论索引
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)

		let commentAuthor = ""
		// 子回复
		if (is_reply) {
			commentAuthor = comments[commentIndex].reply.find(item => item.comment_id === reply_id)
		} else {
			// 主回复
			//  获取作者信息
			commentAuthor = comments.find(item => item.comment_id === comment_id)
		}
		
		commentAuthor = commentAuthor.author.author_name
		commentObj.to = commentAuthor

		commentObj = {
			[commentIndex]: {
				reply: dbCmd.unshift(commentObj)
			}
		}
	}


	await db.collection('article').doc(article_id).update({
		comments: commentObj
	})

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据更新成功'
	}
};

function genId(len) {
	return Number(Math.random().toString().substr(3, len) + new Date().getTime()).toString(36)
}
