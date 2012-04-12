/* Author: 
	Konstantin Sokhan
*/
var imgholder = $('#main');

var model = {
	animate_obj: null,
	
	fetch_feeds: function() 
	{
		console.log('fetching');
		$.getJSON('js/delicious.php', 
		function(data) 
		{
			//console.log('recieved data');
			//return data;
			model.render_images(data);
		});	
		// second batch
		$.getJSON('js/delicious.php?two=1', 
		function(data) 
		{
			//console.log('recieved data');
			//return data;
			model.render_images(data);
		});
	},
	
	
	render_images: function(data)
	{
		for (i = 0; i < data.length; i++)
		{
			imgholder.append("<div class=\"web_slice two\" style=\"background-image: url(http://immediatenet.com/t/l?Size=1024x768&URL=" + data[i].u + ")\"/>");
			imgholder.append("<div class=\"web_slice\" id=\"slice" + i + "\" style=\"background-image: url(http://immediatenet.com/t/l?Size=1024x768&URL=" + data[i].u + ")\"/>");
			
		}
		//console.log(data.length);
		// arrange initial images
		var progress_x = -70;
		$('.web_slice.two').each(function(i) {
			if (i == 10) progress_x = 70;
			$(this).css({
				'left': 300 + i * 10 + progress_x,
				'top': 	100 + Math.random() * 300
			});
			progress_x *= 1.3;
		});
		
		//arrnage cropped imgs
		$('.web_slice').each(function(i) {

			var x = Math.random() * $(window).width();
			var y = Math.random() * $(window).height();
			
			$(this).css({
				'left': x,
				'top': y	
			});
		});
		
		
		model.animate_obj = $('.web_slice').first();
		
	},
	
	animate_random: function() {
		// randomize either positive or negative
		var x_sign = Math.random() < 0.5 ? "+=" : "-=";
		var y_sign = Math.random() < 0.5 ? "+=" : "-=";
		
		var x = x_sign + Math.random() * $(window).width() / 4;
		var y = y_sign + Math.random() * $(window).height() / 4;
		
		$(this).css({
			'left': x,
			'top': y
		});
		
		var pos = model.animate_obj.position()
		
		//if (pos.left < 0) model.animate_obj.animate({left: 
		
		model.animate_obj = model.animate_obj.next();
		
	}
	
}



model.fetch_feeds();


//var timeoutID = window.setInterval(model.animate_random, 2000);








