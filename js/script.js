/* Author: 
	Konstantin Sokhan
*/
var imgholder = $('#main');

var shapes_x = [306,330,272];
var shapes_y = [175,280,287];

var shapes = [];

function Shape(x,y)
{
	this.x = x;
	this.y = y;
}

shapes[0] = new Shape(
	[306,330,272],
	[175,280,287]
);
shapes[1] = new Shape(
	[306,323,460,419],
	[175,251,270,152]
);
shapes[2] = new Shape(
	[551,557,485,419],
	[202,263,342,152]
);
shapes[3] = new Shape(
	[330,446,431],
	[280,315,356]
);
shapes[4] = new Shape(
	[487,573,600],
	[114,117,268]
);
shapes[5] = new Shape(
	[551,419,487],
	[202,152,114]
);
shapes[6] = new Shape(
	[330,475,453],
	[280,385,452]
);
shapes[7] = new Shape([],[]); //skip this one cause its flash... thumbnail is white
shapes[8] = new Shape(
	[405,487,419],
	[113,114,152]
);
shapes[9] = new Shape(
	[306,405,419],
	[175,113,152]
);
shapes[10] = new Shape(
	[418,405,490,500],
	[70,113,67,26]
);
shapes[11] = new Shape(
	[306,292,318],
	[175,136,128]
);
shapes[12] = new Shape(
	[306,362,318],
	[175,140,128]
);
shapes[13] = new Shape([],[]); //skip this one cause its flash... thumbnail is white
shapes[14] = new Shape([],[]); //skip this one cause its flash... thumbnail is white
shapes[15] = new Shape([],[]); //skip this one cause its flash... thumbnail is white
shapes[16] = new Shape([],[]); //skip this one cause its flash... thumbnail is white
shapes[16] = new Shape(
	[306,292,252,302],
	[175,136,132,186]
);

var imagedata = null;
var g_data = null;


var model = {
	animate_obj: null,
	numberlist: new Array(),
	checknumber: function(num) 
	{
		for (var i in model.numberlist)
		{
			console.log(model.numberlist[i]);
			if (num != model.numberlist[i]) {
				model.numberlist.push(num);
				return true;
			}
		}
	},
	fetch_feeds: function()
	{
		$('#loading p').html('fetching feeds...');
		$.getJSON('js/delicious.php', 
		function(data)
		{
			//$.get('imgs.php')
			//return data;
			
			for (var j = 0; j < 20; j++)
			{
				
				for (var rand = Math.floor(Math.random()*data.length); rand == model.numberlist[j]; rand = Math.floor(Math.random()*data.length));
				model.numberlist.push(rand);
				
			    //$('#hidebox').append('<img src="http://immediatenet.com/t/l?Size=1024x768&URL=' + data[j].u + '" />');
			    $('#hidebox').append('<img src="imgs.php?fl=' + data[rand].u + '" />');
			}
			
			console.log(model.numberlist.length);
			
			$('#hidebox').waitForImages(
			function() {
				//console.log('all loaded');
				g_data = data;
			    model.render_images(data);
			    $('#loading').fadeOut();
			    
			}, function(loaded, count, success) {
				//console.log("loaded == " + loaded);
			   $('#loading p').html('<strong>' + loaded + '</strong> of ' + count + ' images loaded');
			
			});
			
			
			
		});	
		
	},
	
	
	render_images: function(data)
	{	
		// get canvas
		var c2 = document.getElementById('c').getContext('2d');
		
		var imagemapval = "";
		
		for (e = 0; e < shapes.length; e++)
		{
			//console.log('running main loop...')
			// setup image
			var img = new Image();
			//img.src = 'imgs.php?fl=' + data[e].u;
			img.src = 'imgs.php?fl=' + data[model.numberlist[e]].u;
			//console.log(img.src);
			var ptrn = c2.createPattern(img,'repeat');

			// draw shape
			c2.fillStyle = ptrn;
			c2.beginPath();
			// set first point to first array val
			c2.moveTo(shapes[e]['x'][0], shapes[e]['y'][0]);
			imagemapval += shapes[e]['x'][0] + "," + shapes[e]['y'][0] + ",";
			
			
			for (i = 1; i < shapes[e]['x'].length; i++)
			{
				c2.lineTo(shapes[e]['x'][i], shapes[e]['y'][i]);
				imagemapval += shapes[e]['x'][i] + "," + shapes[e]['y'][i] + ",";
			}
			c2.closePath();
			c2.fill();
			
			imagemapval = imagemapval.substring(0, imagemapval.length-1);
			$('#clickmap').append('<area class="click_shape" rel="' + model.numberlist[e] + '" shape="poly" coords="' + imagemapval  + '" href="#shape' + e + '" alt="" />');
			//console.log(imagemapval);
			imagemapval = '';
		}
		
		
		
		/*Caman("#c", function () {
			// manipulate canvas here
			this.brightness(50);
			this.render(function () {
			    console.log("Finished!");
			 });
		});*/
		
		
		
		
		var alpha = 0.1;
		
		var imageData = c2.getImageData(0, 0, 900, 600);
		
		var pixels = imageData.data, r, g, b;
		
		//console.log(pixels.length);
		
		for (var i = 0, il = pixels.length; i < il; i += 4) {
			
			pixels [i] /= 2;
			pixels [i + 1] /= 2;
			pixels [i + 2] /= 2; 
			
			
			// generate "noise" pixel
			var color = Math.random() * 255;
			
			// Calculate the target color in Multiply blending mode without alpha composition
			r = pixels[i] * color / 255;
			g = pixels[i + 1] * color / 255;
			b = pixels[i + 2] * color / 255;
			
			// alpha compositing
			pixels[i] =     r * alpha + pixels[i] * (1 - alpha);
			pixels[i + 1] = g * alpha + pixels[i + 1] * (1 - alpha);
			pixels[i + 2] = b * alpha + pixels[i + 2] * (1 - alpha);
		}
		
		c2.putImageData(imageData, 0, 0);
		
		imagedata = imageData;
		//console.log('image edit complete');
	},
	
	set_hover: function() {
	
		$('#clickmap AREA').live('mouseover', function() {
			var el = $(this).attr('href').replace('#shape', '');
			var c2 = document.getElementById('c').getContext('2d');
			c2.fillStyle = '#da0a45';
			c2.beginPath();
			c2.moveTo(shapes[el]['x'][0], shapes[el]['y'][0]);
			for (i = 1; i < shapes[el]['x'].length; i++)
			{
				c2.lineTo(shapes[el]['x'][i], shapes[el]['y'][i]);
			}
			c2.closePath();
			c2.fill();
			
		}).live('mouseout', function() {
			var c2 = document.getElementById('c').getContext('2d');
			c2.putImageData(imagedata, 0, 0);	
		}).live('click', function(e) {
			$('.detailsbox').remove();
			var el = $(this);
			var obj_id = el.attr('rel');
			
			$('#main').append('<div class="detailsbox"><h4>' + g_data[obj_id]['d'] + '</h4><p>'  + g_data[obj_id]['n'] +  '</p><a target="_blank" href="'  + g_data[obj_id]['u'] +  '">visit website</a><a class="btn_close">&times;</a></div>')
			$('.detailsbox').css({
				top: e.pageY + 40,
				left: e.pageX - 550
			});
			$('.btn_close').click(function() {$(this).parents('.detailsbox').remove();});
			
		});
		
		
	},
	
	start_anim: function() {
		setInterval(function() {
			$('#main').animate({left: -10 }, 1800).animate({ left: 10 }, 1900).animate({ left: 0 }, 1500);
		}, 5200);
		$('#main').animate({left: -10 }, 1800).animate({ left: 10 }, 1900).animate({ left: 0 }, 1500);
		
		var moveBg0 = {type: 'backgroundx', to: 805, step: 0, delay: 130}
		//$fx('#bod').fxAdd(moveBg0).fxRun(null, -1);
		
		
		$fx('#clouds_big').fxAdd({type: 'backgroundx', to: -950, step: -2, delay: 90}).fxRun(null, -1);
		$fx('#clouds_small').fxAdd({type: 'backgroundx', to: -950, step: -1, delay: 90}).fxRun(null, -1);
	}
}
model.fetch_feeds();
model.set_hover();
model.start_anim();



	

 