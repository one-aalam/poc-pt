// Libraries
import Box from 't3js';
import dot from 'dot';

// Import services
// Services should return pure function
import validationService from './services/validation';
import analyticsService from './services/analytics';

// Import behaviors
import analyticsBehavior from './behaviors/analytics';

// Import modules
import asyncLoaderModule from './modules/async-loader';

jQuery(document).ready(() => {	

    // Services are needed to be registered in index file only as 
    // context, if not passed, might get lost in other JS files
	Box.Application.addService('validator', validationService);
	Box.Application.addService('analytics', analyticsService);

	// Just some logging...so we know...
	Box.Application.addBehavior('analytics', analyticsBehavior);

	// Going forward, it would be more effective to keep separate
	// module, behavior, and services directories and include
	// as above through a bootstrapper.js which will add them
	// to global `Box` instance

    Box.Application.addModule('async-loader', asyncLoaderModule);

	// Enable Debug mode
	Box.Application.init({
		debug: true
	});
});