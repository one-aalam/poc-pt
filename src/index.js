import Box from 't3js?window=this';

jQuery(document).ready(() => {	
	
	$('#btnLoadAsync').on('click', () => {
		const _c = confirm('Are you sure?');
		if(_c){
			require.ensure([], () => { 
	    		require('./hello'); 
	  		});
		}
	});

	console.log(Box);
	
	/*

	Box.Application.addBehavior('some-behavior', function(context) {
	    return {
	        init: function() {
	            console.log('foo');
	        }
	    };
	});

	Box.Application.addModule('my-module', function(context) {
	    return {
	        behavior: ['some-behavior'],
	        init: function() {
	            console.log('bar');
	        }
	    };
	});*/

	Box.Application.start('[data-module="my-module"]').bind(this);
});