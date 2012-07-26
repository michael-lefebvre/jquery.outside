/*!
 * jQuery.outside - v0.1.0 - 2012-02-12
 * https://github.com/michael-lefebvre/jquery.outside
 *
 * Copyright (c) 2012 Michael Lefebvre
 * Dual licensed under the MIT and GPL licenses.
 */

(function( $ )
{
	$.fn.outside = function(options)
	{
		// onTheOutside "class" - public methods are available through $('selector').data('outside-api')
		function onTheOutside($elem, settings)
		{
			var out     = this,
				s	    = settings,
				trigger = true;
			
			var listener = function(event)
			{
				var $target = $(event.target);
				
				if($target.is($elem))
				{
					if(s.debug)
					{
						console.log('is $elem');
					}
					
					return;
				}

				$elem.each(function()
				{
					if($target.parents().index(this) > 0)
					{
						trigger = false;
						return false; // break loop
					}
				});				

				if(trigger)
				{
					if(typeof(s.callback) == 'function')
					{
						s.callback(event);

						if(s.once)
						{
							destroy();
						}
					}
				}

				
				if(s.debug)
				{
					console.log($target);
					console.log($elem);
					console.log($target.is($elem));
					// console.log($target.parents().index($elem));
					// console.log($.contains($target, $elem))
					console.log("trigger: %b", trigger)
				}
				trigger = true;
			};
			
			var destroy = function()
			{
				s.outside.unbind(s.event, listener);
			};
			
			var initialise = function(s)
			{
				if(typeof(s.callback) == 'function')
				{
					s.outside.bind(s.event, listener);
				}
			}
			
			// Public API
			$.extend(
				out,
				{
					reinitialise: function(settings)
					{
						s = $.extend({}, defaults, settings);
						initialise(s);
					},
					
					destroy: function()
					{
						destroy();
					}
				}
			);
			
			initialise(s);
			
		}
		
		if(typeof(options) == 'function')
		{
			var fn = options;
			options = {
				callback: fn
			};
			
			delete fn;
		}
		
		var defaults = 
			{
				'event'		: 'click',
				'callback'	: null,
				'once'		: true,
				'debug'		: false,
				'outside'	: $(document)
			},
			settings	= $.extend({}, defaults, options),
			$elem		= this, 
			api			= $elem.data('outside-api');
			
		if(api) 
		{
			api.reinitialise(settings);
		}
		else
		{
			api = new onTheOutside($elem, settings);
			$elem.data('outside-api', api);
		}

	};
})( jQuery );
