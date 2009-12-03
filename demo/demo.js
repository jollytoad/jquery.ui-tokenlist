jQuery(function($) {

	var data = ['one','two','three','four','five','six','seven','eight','nine','ten'];

	$('#enhance').one('click', function() {
		$('.test')
			// Convert the element to a token list
			.tokenlist({ validate: data })

			.filter('.autocomplete')
			
			.each(function() {
				var items = $(this).tokenlist('items');
				
				// Add the Autocomplete to the input field of the tokenlist
				$(this)
					.tokenlist('input')
					.autocomplete({
						source: function(request, response) {
							// escape regex characters
							var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
							return $.grep(data, function(value) {
								// also filter out existing items
								return matcher.test(value) && $.inArray(value, items) < 0;
							});
						},
						delay: 0,
						change: function() {
							$(this).trigger('change');
						}
					});
			});
		
		// Toggle the original input fields
		$('#toggle').attr('disabled', false).bind('click', function() {
			$('.test:text').toggle();
		});
	});
});
