export default function userClick(context){

	var analyticsSrvc;
	return {
		onclick: function(event, element, elementType){
			// Code
			analyticsSrvc.userClicked('something')
		},
		init: function(){
			analyticsSrvc = context.getService('analytics');
		}
	}

}