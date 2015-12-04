import Box from 't3js';

// Import services
// Services should return pure function
import validationService from './services/validation';

const requireAsync = () => {
	const _c = confirm('Are you sure?');
	if(_c){
		require.ensure([], () => { 
	    	require('./hello'); 
	  	});
	}
};

jQuery(document).ready(() => {	

    // Services are needed to be registered in index file only as 
    // context, if not passed, might get lost in other JS files
	Box.Application.addService('validator', validationService);

	// Going forward, it would be more effective to keep separate
	// module, behavior, and services directories and include
	// as above through a bootstrapper.js which will add them
	// to global `Box` instance

    Box.Application.addModule('my-module', function(context) {
		'use strict';

	    return {
	    	onclick: function(event, element, elementType) {
	    		var moduleEl = context.getElement();
	    		var service = context.getService('validator');

	    		console.log(service);
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