
jQuery(document).ready(() => {
	Box.Application.init();

	Box.Application.addModule('my-module', function(context) {

    return {
        onclick: function(event, element, elementType) {
        	alert('Hello from Stack of Future!');
        }
    };
});
	
});