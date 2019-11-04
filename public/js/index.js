$(function() {
	//轮播背景图   到换大小图临界点760会闪白屏一下。不知道怎么优化
	let small = 0;
	let big = 0;
	$(window).resize(function() {
		let clientW = $(window).width();
		let showBigPic = clientW > 760;
		$('#lk_carousel .item').each(function() {
			if(showBigPic) {
				//src改成背景大图并且加上指定类
				small = 0;
				if(big < 3) {
					//					console.log(1);
					let src = $(this).data('lg-src');
					$(this)
						.empty()
						.addClass('showbig')
						.css({
							backgroundImage: 'url(' + src + ')'
						});
					big++;
				}
			} else {
				//插入小图而且百分百
				big = 0;
				if(small < 3) {
					//					console.log(2);				
					let src = $(this).data('xs-src');
					$(this)
						.removeClass('showbig')
						.append("<img src='" + src + "'>")
						.css({
							backgroundImage: 'url()'
						});
					small++;
				}
			}
		})
	})
	//轮播背景图
	//尾部工具提示
	$('[data-toggle="tooltip"]').tooltip();
	//动态设置标签页ui宽度
	$(window).resize(function() {
		//取到Li ul ul的父标签宽度
		let $ul = $('#lk_product .product-nav .nav-tabs');
		let $li = $('[role="presentation"]', $ul);
		let $lipw = $ul.parent().width();
		//		console.log($lipw);

		//遍历获取总宽度
		let aliw = 0;
		$li.each(function(index, item) {
			aliw += $(item).width();
		})
		//		console.log(aliw);

		//比较宽度决定是否设置宽度
		if($lipw < aliw) {
			$ul.css({
				width: aliw + "px"
			});
		} else {
			$ul.css({
				width: "100%"
			});
		}
	})
	$(window).trigger('resize');
	//导航栏处理
	//获取导航栏li
	let $nav_li = $('.nav-bar .navbar-lk .navbar-nav li');
	//	console.log($nav_li);
	$nav_li.eq(1).click(function() {
		//		alert(1);
		$('html,body').animate({scrollTop:$('#lk_hot').offset().top},1000);

	})
})