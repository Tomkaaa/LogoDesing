$(document).ready(function() {
	
	var sections = $('section')
	var nav = $('nav[role="navigation"]');
	var clickScrollEnded = true
	var winHeight = $(window).height()
	var halfW = winHeight / 2

	// Fancybox
	$('.work-box').fancybox();

	// Flexslider
	$('.flexslider').flexslider({
		animation: "fade",
		directionNav: false,
	});

	// Page Scroll
	$(window).on('scroll', function () {
		//header
		var scroll = $(window).scrollTop();
		
		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
		//end header
		
		if (clickScrollEnded == false) return;
	  	var cur_pos = $(this).scrollTop();
		var mid = cur_pos + halfW
		var ends = new Array(sections.length)
		var s = 0
		
	  	sections.each(function() {
			var top = $(this).offset().top
			var h = $(this).outerHeight()
			ends[s++] = top + h
		});
	
		var len = ends.length
		sect = 0
		for (i=0;i<len;i++) {
			if (mid > ends[i]) sect++
		};
		console.log("c: "+cur_pos+" all: "+(cur_pos+halfW)+" end: "+ends[len-1])
		console.log("a: "+(cur_pos + halfW)+" b: "+(ends[len-1] - 100))
		if (mid + halfW >= ends[len-1] - 100) {
			sect = sections.length - 1
		}
		nav.find('a').removeClass('active');
		section = sections.get(sect)
	    nav.find('a[href="#'+$(section).attr('id')+'"]').addClass('active');
	});
	
	$(window).on("scrollstop", {latency: 50}, function() {
		clickScrollEnded = true
	});
	
	nav.find('a').on('click', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		clickScrollEnded = false
		nav.find('a').removeClass('active');
	    nav.find('a[href="'+$(this).attr('href')+'"]').addClass('active');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 500);
	  return false;
	});

	// Mobile Navigation
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});	
	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});
});