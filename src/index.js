import Box from 't3js?$=jquery';

const requireAsync = () => {
	const _c = confirm('Are you sure?');
	if(_c){
		require.ensure([], () => { 
	    	require('./hello'); 
	  	});
	}
};

jQuery(document).ready(() => {	

    Box.Application.addModule('my-module', function(context) {
		'use strict';

	    return {
	    	onclick: function(event, element, elementType) {
	    		var moduleEl = context.getElement();

	    		if (elementType === 'btn-load-async') {
	    			requireAsync();
	    			event.preventDefault();
	    		}
            
        	},
	        behavior: ['making-el-ready'],
	        init: function() {},
	        destroy: function(){}
	    };
	});

    // Just some logging...so we know...
	Box.Application.addBehavior('making-el-ready', function(context) {
	    return {
	        init: function() {
	            console.log('Booting up!');
	        }
	    };
	});

	// Enable Debug mode
	Box.Application.init({
		debug: true
	});
});