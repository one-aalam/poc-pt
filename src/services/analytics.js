export default function analyticsService(application){
	return {
		userClicked(o){
			console.log('Tracked:' + o);
		}
	};
}