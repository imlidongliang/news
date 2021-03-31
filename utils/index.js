const polyfillZore = val => {
	return val < 10 ? ('0' + val) : val
}

export const parseTime = (time) => {
	const fmt = '{y}-{m}-{d} {h}:{i}:{s}'
	const date = new Date(time)
	
	
		const formatObj = {
			y: date.getFullYear(),
			m: polyfillZore(date.getMonth() + 1),
			d: polyfillZore(date.getDate()),
			h: polyfillZore(date.getHours()),
			i: polyfillZore(date.getMinutes()),
			s: polyfillZore(date.getSeconds())
			}
		
		const fmtDate = fmt.replace(/{(y|m|d|h|i|s)+}/g, (result, key) => {
			const val = formatObj[key]
			
			return val
		})
		
		return fmtDate
}
