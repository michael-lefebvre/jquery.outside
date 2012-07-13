# jQuery.outSide

a simple designed api to detect a event outside an element, then trigger a callback

## Example

$('#inner li').outside(function(e) {
	console.log('OUTSIDE');
	console.log(e);
});

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
* __outside: a jQuery selector that listen event  