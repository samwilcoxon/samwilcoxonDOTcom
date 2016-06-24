$(document).ready(function() {


	var start = false;
	setTimeout(firstAnimation, 1000);

	function firstAnimation() {
		$($('.cube')[0]).css('transform', 'rotateX(0deg) rotateY(30deg) rotateZ(0deg)', '-webkit-transform', 'rotateX(0deg) rotateY(30deg) rotateZ(0deg)');
		setTimeout(secondAnimation, 1500);
	}

	function secondAnimation() {
		$($('.cube')[0]).css('transform', 'rotateX(0deg) rotateY(390deg) rotateZ(0deg)', '-webkit-transform', 'rotateX(0deg) rotateY(390deg) rotateZ(0deg)');
		setTimeout(thirdAnimation, 1500);
	}

	function thirdAnimation() {
		$($('.cube')[0]).css('transform', 'rotateX(-45deg) rotateY(390deg) rotateZ(0deg)', '-webkit-transform', 'rotateX(-45deg) rotateY(390deg) rotateZ(0deg)');
		setTimeout(cleanupAnimation, 1500);
	}

	function cleanupAnimation() {
		$($('.cube')[0]).css('transition', 'transform .6s', '-webkit-transition', '-webkit-transform .6s ease 0s');
		start = true;
	}



	var $cube = $('.cube')[0];
	var xRot = -45;
	var yRot = 390;
	var zRot = 0;

	var tilesPerEdge = 8;
	var pixelsPerTile = 256/tilesPerEdge;
	var maxPixelPosition = 256 - pixelsPerTile;

	
	setupCube();
	function setupCube() {
		var $front = $('.cube-face-front')[0];

		for (var i = 0; i < tilesPerEdge; i++) {
			for (var j = 0; j < tilesPerEdge; j++) {
				var $newDiv = $('<div/>');
				$newDiv.addClass('tile');
				var color = 'rgb(' + pixelsPerTile*i + ', ' + pixelsPerTile*j + ', 0)';
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
				var color = 'rgb(' + pixelsPerTile*i + ', 0, ' + pixelsPerTile*j + ')';
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
				var color = 'rgb(255, ' + pixelsPerTile*j + ', ' + pixelsPerTile*i + ')';
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
				var color = 'rgb(' + pixelsPerTile*i + ', 255,' + pixelsPerTile*j + ')';
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
				var color = 'rgb(0, ' + pixelsPerTile*j + ', ' + pixelsPerTile*i + ')';
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
				var color = 'rgb(' + pixelsPerTile*i + ', ' + pixelsPerTile*j + ', 255)';
				$newDiv.css('background-color', color);
				$newDiv.css('top', pixelsPerTile*i);
				$newDiv.css('left', maxPixelPosition-(pixelsPerTile*j));

				$newDiv.appendTo($back);
			}
		}
	}

	var isDragging = false;
	var startPoint = 0;
	var endPoint = 0;
	var timer;
	var pause = false;
	$('.cube').on("dragstart", function(even) {
        return false;
	});
	$('.scene').on("dragstart", function(eve) {
        return false;
	});
	$(window).mousedown(function(eve) {
		if (!start) return;
		isDragging = true;
		startPoint = eve;
	}).mousemove(function(e) {
		if (!start) return;

		// $('#focuser').focus();

    	if (!isDragging) {
    		return;
    		// startPoint = e;
    	} else {
    		endPoint = e;
        	pause = true;
        	clearTimeout(timer);
    		if (distanceBetweenPoints(startPoint, endPoint) > 40) {
    			transformCube(startPoint, endPoint);
        		startPoint = endPoint;
    		}
    	}
        // isDragging = true;
        // $(window).unbind("mousemove");
    }).mouseup(function(event) {
    	if (!start) return;
	    var wasDragging = isDragging;
	    isDragging = false;
	    // pause = false;
	    timer = setTimeout(function() {
			pause = false;
		}, 500);
	    // $(window).unbind("mousemove");
	    // if (wasDragging) { //was clicking
	    // 	endPoint = event;
	    // 	transformCube(startPoint, endPoint);
	    //     startPoint = 0;
	    // }
	});

	function transformCube(start, end) {
		var region = angleToCoordinateRegion(angleFromPoints(start, end))
        var numCubes = distanceBetweenPoints(start, end)/250;
        var degrees = 90*numCubes;
        if (region) {
        	degrees = region > 0 ? degrees : -degrees;

        	region = Math.abs(region);
        	if (region === 1) {
        		xRot = (xRot + degrees);
        	} else if (region === 2) {
        		yRot = (yRot + degrees);
        	} else if (region === 3) {
        		zRot = (zRot + degrees);
        	} else {
        		return;
        	}

        	var transformString = 'rotateX('+xRot+'deg) rotateY('+yRot+'deg) rotateZ('+zRot+'deg)';
        	$cube.style.webkitTransform = transformString;
        	$cube.style.MozTransform = transformString;
        	$cube.style.msTransform = transformString;
        	$cube.style.transform = transformString;

        }
	}

	function angleFromPoints(start, end) {
		var xDiff = end.clientX - start.clientX;
		var yDifff = end.clientY - start.clientY;

		return -180*Math.atan2(yDifff, xDiff)/Math.PI;
	}

	function distanceBetweenPoints(start, end) {
		var xDiff = end.clientX - start.clientX;
		var yDifff = end.clientY - start.clientY;

		return Math.sqrt((xDiff*xDiff) + (yDifff*yDifff));
	}

	function angleToCoordinateRegion(angle) {

		if (angle > 180 || angle < -180) {
			return 0;
		}

		// x directions
		if (angle > 60 && angle <= 120) {
			return 1;
		}
		if (angle > -120 && angle <= -60) {
			return -1;
		}

		// y directions
		if (angle > -30 && angle <= 30) {
			return 2;
		}
		if (angle > 150 || angle <= -150) {
			return -2;
		}

		//z directions
		if ((angle > 30 && angle <= 60) || (angle > -60 && angle <= -30)) {
			return -3;
		}
		if  ((angle > 120 && angle <= 150) || (angle > -150 && angle <= -120)) {
			return 3;
		}

		return 0;
	}

	// var cubeLinks= ['work.html', 'resume.html', 'design.html', 'contact.html', 'about.html'];

	// cubeLinkSetup();

	// function cubeLinkSetup() {
	// 	$('.cube-face').bind('click', function () {
	// 		if (!start) return;
	// 		cubeClick(this);
	// 	})
	// }

	// function cubeClick(aCube) {
	// 	if (!pause) {
	// 		var cubeIndex = $('.cube-face').index(aCube);
	// 		window.location.href = cubeLinks[cubeIndex];
	// 	}
	// }


});