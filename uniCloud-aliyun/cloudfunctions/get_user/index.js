'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id = ''
	} = event
	
	if (user_id === '') {
		return {
			code: 201,
			msg: '获取用户信息失败'
		}
	}
	
	let userInfo = await db.collection('user').doc(user_id).get()
	
	
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: userInfo.data[0]
	}
};
