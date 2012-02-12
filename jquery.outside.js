// JavaScript Document

(function( $ )
{
	var $object = null;
	var fnCallback = null;
	var defaults = {
		'event'		: 'click',
		'callback'	: null,
		'once'		: true
	};
	
	var methods = 
	{
		settings: 'ok',
		
    	init : function( options) 
		{
			methods.settings = $.extend({}, defaults, options);

			if(typeof(methods.settings.callback) == 'function')
			{				
				$object	= this;

				$(document).bind(methods.settings.event, methods.listener);
			}

			// maintain chainability
			return this;
		},
		
		listener: function(event)
		{
			var $target = $(event.target);
			
			console.log($object);
			console.log($target.is($object));
			console.log($target.parents().index($object));
			
			if($target.is($object))
			{
				return;
			}
			
			if($target.parents().index($object) < 0)
			{
				methods.settings.callback(event);
				if(methods.settings.once)
				{
					methods.destroy();
				}
			}
		},
		
		destroy: function()
		{
			$(document).unbind(methods.settings.event, methods.listener);
		}
	};
	
	$.fn.outside = function(method, options)
	{
		// Method calling logic
		if ( methods[method] )
		{
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof method === 'object' || ! method )
		{
			return methods.init.apply( this, arguments );
		}
		else
		{
			$.error( 'Method ' +  method + ' does not exist on jQuery.outside' );
		} 
	};
})( jQuery );
