export default function validationService(application){

	return {
		isFilled(val){
			return $.trim(val) != '' ? true : false;
		},

		isEmail(val){
			return val.indexOf('@') != -1 ? true : false;
		}
	};
}