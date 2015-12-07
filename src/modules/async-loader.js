// Renderers
import userRenderer from '../renderers/list';

// Data
import users from '../static/users';

export default function asyncLoader(context) {
		'use strict';
		// Cache DOM
		var moduleEl;
		// Get services we are going to need
		var validatorSrvc = context.getService('validator');
        // User list
		var userList = userRenderer(users);

	    return {
	    	onclick: function(event, element, elementType) {
	    		if (elementType === 'btn-load-async') {
	    			this.requireAsync();
	    			event.preventDefault();
	    		}
        	},

	        behaviors: ['analytics'],
	        
	        init: function() {
	        	moduleEl = context.getElement();
	        	moduleEl.innerHTML += userList;

	        },

	        requireAsync(){
	        	const _c = confirm('Are you sure?');
				if(_c){
					require.ensure([], () => { 
				    	require('../hello'); 
				  	});
				}
	        },

	        destroy: function(){}
	    };
}