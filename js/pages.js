$(document).ready(function() {

	function printHeightWidth() {
		console.log($(window).height());
		console.log($(window).width());
	}
	printHeightWidth();

	$(window).resize(function () {
		printHeightWidth();
	});

	// var $cube = $('.cube')[0];
	// var xRot = 85;
	// var yRot = 45;
	// var zRot = 0;

	var tilesPerEdge = 16;
	var pixelsPerTile = 4;
	var colorsPerTile = 256/tilesPerEdge
	var maxPixelPosition = 64 - pixelsPerTile;

	console.log('set it up');
	setupCube();

	function setupCube() {
		var $front = $('.cube-face-front')[0];

		for (var i = 0; i < tilesPerEdge; i++) {
			for (var j = 0; j < tilesPerEdge; j++) {
				var $newDiv = $('<div/>');
				$newDiv.addClass('tile');
				var color = 'rgb(' + colorsPerTile*i + ', ' + colorsPerTile*j + ', 0)';
				$newDiv.css('background-color', color);
				$newDiv.css('top', pixelsPerTile*i);
				$newDiv.css('left', pixelsPerTile*j);

				$newDiv.appendTo($front);
			}
		}

		var $left = $('.cube-face-left')[0];

		for (var i = 0; i < tilesPerEdge; i++) {
			for (var j = 0; j < tilesPerEdge; j++) {
				var $newDiv = $('<div/>');
				$newDiv.addClass('tile');
				var color = 'rgb(' + colorsPerTile*i + ', 0, ' + colorsPerTile*j + ')';
				$newDiv.css('background-color', color);
				$newDiv.css('top', pixelsPerTile*i);
				$newDiv.css('left', maxPixelPosition-(pixelsPerTile*j));

				$newDiv.appendTo($left);
			}
		}

		var $bottom = $('.cube-face-bottom')[0];

		for (var i = 0; i < tilesPerEdge; i++) {
			for (var j = 0; j < tilesPerEdge; j++) {
				var $newDiv = $('<div/>');
				$newDiv.addClass('tile');
				var color = 'rgb(255, ' + colorsPerTile*j + ', ' + colorsPerTile*i + ')';
				$newDiv.css('background-color', color);
				$newDiv.css('top', pixelsPerTile*i);
				$newDiv.css('left', pixelsPerTile*j);

				$newDiv.appendTo($bottom);
			}
		}


		var $right = $('.cube-face-right')[0];

		for (var i = 0; i < tilesPerEdge; i++) {
			for (var j = 0; j < tilesPerEdge; j++) {
				var $newDiv = $('<div/>');
				$newDiv.addClass('tile');
				var color = 'rgb(' + colorsPerTile*i + ', 255,' + colorsPerTile*j + ')';
				$newDiv.css('background-color', color);
				$newDiv.css('top', pixelsPerTile*i);
				$newDiv.css('left', pixelsPerTile*j);

				$newDiv.appendTo($right);
			}
		}

		var $top = $('.cube-face-top')[0];

		for (var i = 0; i < tilesPerEdge; i++) {
			for (var j = 0; j < tilesPerEdge; j++) {
				var $newDiv = $('<div/>');
				$newDiv.addClass('tile');
				var color = 'rgb(0, ' + colorsPerTile*j + ', ' + colorsPerTile*i + ')';
				$newDiv.css('background-color', color);
				$newDiv.css('top', maxPixelPosition-(pixelsPerTile*i));
				$newDiv.css('left', pixelsPerTile*j);

				$newDiv.appendTo($top);
			}
		}

		var $back = $('.cube-face-back')[0];

		for (var i = 0; i < tilesPerEdge; i++) {
			for (var j = 0; j < tilesPerEdge; j++) {
				var $newDiv = $('<div/>');
				$newDiv.addClass('tile');
				var color = 'rgb(' + colorsPerTile*i + ', ' + colorsPerTile*j + ', 255)';
				$newDiv.css('background-color', color);
				$newDiv.css('top', pixelsPerTile*i);
				$newDiv.css('left', maxPixelPosition-(pixelsPerTile*j));

				$newDiv.appendTo($back);
			}
		}
	}


	$('#cubeCover').click(function() {
		window.location.href='index.html';
	});

	$('#cubeCover').hover(function() {
		$('#cubeNav').addClass('extra');
	}, function () {
		$('#cubeNav').removeClass('extra');
	});

	var startClass = $('#cubeNav').attr('class');
	var navArr = ['about', 'work', 'blog', 'resume', 'contact'];

	$('.navItem').hover(function () {
		$('#cubeNav').attr('class', '');
		var navIndex = $('.navItem').index(this);
		$('#cubeNav').addClass(navArr[navIndex]);
	}, function() {
		$('#cubeNav').attr('class', '');
		$('#cubeNav').attr('class', startClass);
	});

});