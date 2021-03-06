/*
	Strata by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	var settings = {
		
		// Parallax background effect?
			parallax: true,

		// Parallax factor (lower = more intense, higher = less intense).
			parallaxFactor: 20

	};

	skel.init({
		reset: 'full',
		containers: '100%',
		breakpoints: {
			global: { href: 'css/style.css', grid: { gutters: ['2.5em', 0] } },
			xlarge: { media: '(max-width: 1800px)', href: 'css/style-xlarge.css' },
			large: { media: '(max-width: 1280px)', href: 'css/style-large.css', grid: { gutters: ['2em', 0] } },
			medium: { media: '(max-width: 980px)', href: 'css/style-medium.css'},
			small: { media: '(max-width: 736px)', href: 'css/style-small.css', grid: { gutters: ['1.5em', 0], zoom: 2 }, viewport: { scalable: false } },
			xsmall: { media: '(max-width: 480px)', href: 'css/style-xsmall.css', grid: { zoom: 3 } }
		}
	});

	$(function() {
		$("#header").load("header.html");
		//$("#footer").load("footer.html");

		var $window = $(window),
			$body = $('body'),
			$header = $('#header');

		//$header.load("header.html");
		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');
			
			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Touch?
			if (skel.vars.isMobile) {
			
				// Turn on touch mode.
					$body.addClass('is-touch');

				// Height fix (mostly for iOS).
					window.setTimeout(function() {
						$window.scrollTop($window.scrollTop() + 1);
					}, 0);
			
			}

		// Forms (IE<10).

			if (skel.vars.IEVersion < 10) {
				
				var $form = $('form');

				if ($form.length > 0) {

					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();

				}
			
			}
					
		// Header.

			// Parallax background.

				// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
					if (skel.vars.browser == 'ie'
					||	skel.vars.isMobile)
						settings.parallax = false;

				if (settings.parallax) {

					skel.change(function() {
						
						if (skel.isActive('medium')) {
							
							$window.off('scroll.strata_parallax');
							$header.css('background-position', 'top left, center center');
						
						}
						else {
							
							$header.css('background-position', 'left 0px');
					
							$window.on('scroll.strata_parallax', function() {
								$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
							});
							
						}
					
					});
					
				}

		// Main Sections: Two.
		
		// Lightbox gallery.
		// $('#two').poptrox({
		// 	caption: function($a) { return $a.next('h3').text(); },
		// 	overlayColor: '#2c2c2c',
		// 	overlayOpacity: 0.85,
		// 	popupCloserText: '',
		// 	popupLoaderText: '',
		// 	selector: '.work-item a',
		// 	usePopupCaption: true,
		// 	usePopupDefaultStyling: false,
		// 	usePopupEasyClose: false,
		// 	usePopupNav: true,
		// 	windowMargin: (skel.isActive('small') ? 0 : 50)
		// });
		//加载文章
		var getArticles = function(){
			var options = {
				id: 'top-progress-bar',
				color: '#F44336',
				height: '2px',
				duration: 2
			}
			var progressBar = new ToProgress(options);
			progressBar.increase(80);
			$.get('http://127.0.0.1:8081/listArticles',function(data){
				var content = "";
				for(var i in data){
					var date = data[i].create_time.substring(0,10);
					content += "<section id='"+data[i].id+"' data-date='"+date.replace('-','').substring(0,6)+"' class='article'>";
					content +=	"<header>";
					content +=	"<h3>"+data[i].name+"</h3>";
					content +=	"<p>";
					content +=	data[i].intro;
					content +=	"</p>";
					content +=	"<span>"+date+" 发布 | 浏览 "+data[i].pv+" 次</span>";
					content +=	"</header>";
					content +=	"<img class='cover' src='images/cover/"+data[i].cover+"' />";
					content +=	"</section>";
				}
				$('#main').append(content);
				progressBar.finish();
			});
		}
		getArticles();
		//点击文章
		$('div').delegate('.article','click',function(){
			var options = {
				id: 'top-progress-bar',
				color: '#F44336',
				height: '2px',
				duration: 2
			}
			var id = $(this).attr('id');
			var progressBar = new ToProgress(options);
			progressBar.increase(80);
			var url = 'articles/201703/'+id+'.html';
			$.get(url,function(data){
				$('#main').html(data);
				$.get('http://127.0.0.1:8081/addArticlePv/'+id,function(data){
					console.log(data);
					$('#article-pv').text(data[0].pv);
				});
				progressBar.finish();
			});
			//pv+1

		});
		$('div').delegate('.button-reback','click',function(){
			$('#main').empty();
			getArticles();
		})
	});

})(jQuery);