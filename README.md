# jQuery.outSide

a simple designed api to detect a event outside an element, then trigger a callback

## Defaults settings

	{
		'event'    : 'click',
		'callback' : null,
		'once'     : true,
		'debug'    : false
		'outside'  : $(document)
	}

* __event__: binded event, by default "click", can be anything else as "mouseleave"
* __callback__: the function to execute, pass the event as first argument
* __once__: callback should be execute once or not
* __debug__: print some info in the console
* __outside__: a jQuery selector that listen event  


## API

Public methods are available through 

	var outsideApi = $('selector').data('outside-api');

	outsideApi.destroy();

### Methods

* __reinitialise__: reset settings
* __destroy__: unbind event

## Examples

	$('#inner li').outside(function(e) {
		console.log('OUTSIDE');
		console.log(e);
	});


	$('#inner li').outside({
		callback: function(e) {
			console.log('OUTSIDE');
			console.log(e);
		},
		once: false
	});

