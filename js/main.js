$(function(){

	//未完成

	var $flow_search_type_box = $('.flow_search_box .flow_con .flow_search .search_type');
	var $flow_search_type = $('.flow_search_box .flow_con .flow_search .search_type ul');
	var $flow_bd = $('.flow_search_box .flow_con .flow_search .bd');
	var $flow_search_type_b = false;
	$flow_search_type.hover(function(){
		if($flow_search_type_b==false){
			$flow_search_type_box.css({'overflow':'visible','z-index':89});
			$flow_search_type_b = true;
		};
	},function(){
		$flow_bd.mouseleave(function(){
			$flow_search_type_b = false;
		})

		if($flow_search_type_b==false){
			$flow_search_type_box.css({'overflow':'hidden','z-index':91});
		}
		
	});


	/*---------------分割线-----------------*/
	
	var $visib = $('.menu_top .visib');
	
	$visib.hover(function(){
		$(this).next().show();
	},function(){
		$(this).next().hide();
	});

	$visib.next().hover(
		function(){
		$(this).show();
	},function(){
		$(this).hide();
	});

	/*---------------分割线-----------------*/

	var $search_tab = $('.menu_center .search_before li');
	var $search_btn = $('.menu_center .btn input');
	var $txt = $('.menu_center .txt');
	var $phone = $('.menu_center .phone');
	var $search_after = $('.menu_center .search_after');

	$search_tab.click(function(){
		$(this).addClass('current').siblings().removeClass('current');

		if($(this).html()=='天猫'){
			$search_btn.css({'background':'#ff5400'});
			$txt.css({'border':'2px solid #ff5400'});
			$search_after.hide();
		}
		else{
			$search_btn.css({'background':'#ff9000'});
			$txt.css({'border':'2px solid #ff9000'});
			$search_after.show();
		}

		if($(this).html()!='宝贝'){
			$phone.hide();
		}
		else{
			$phone.show();
		}
	});

	var $center_close = $('.menu_center .close');

	$center_close.click(function(){
		$(this).parent().hide();
	})



	var $main_title = $('.main .title_list li a');
	var $kid = $('.main .title_list .kid');
	var $main_title_offset = null;
	var $main_title_list_offset = $('.main .title_list').offset().left;
	var $kid_offset =null;

	$main_title.hover(function(){
		$main_title_offset = $(this).offset().left;
		$kid_offset = $main_title_offset - $main_title_list_offset + ($(this).outerWidth()-24)/2;
		$kid.css({'left':$kid_offset+'px'});	
		$kid.show();
	},function(){
		$kid.hide();
	});


	/*----------------------分割线------------------------*/
	var $points = $('.main .center_left .huandengpian .points ul li');
	var $prev = $('.main .center_left .huandengpian .prev_txt');
	var $next = $('.main .center_left .huandengpian .next_txt');
	var $photos = $('.main .center_left .huandengpian .photos li');
	var $len = $photos.length;

	var $now = 0;
	var $last = 0;
	//定义小圆点点击事件
	$points.click(function(){
		$last = $(this).parent().find('.current').index();
		$now = $(this).index();

		move($(this));

	})
	//解决暴力操作的BUG
	var $has_moved = true;
	//定义向前事件
	$prev.click(function(){
		if($has_moved==false){
			return;
		}
		$has_moved = false;
		$last = $now;
		$now --;
		if($now>=0){
			var $now_point = $points.eq($now);
			move($now_point);
		}
		else{
			move();
		}

	})
	//定义向后事件
	$next.click(function(){
		if($has_moved==false){
			return;
		}
		$has_moved = false;
		$last = $now;
		$now ++;
		if($now>=0){
			var $now_point = $points.eq($now);
			move($now_point);
		}
		else{
			move();
		}
	})
	//设置自动播放幻灯片定时器
	var $timer1 = setInterval(autoplay,3000);
	var $box = $('.main .center_left .huandengpian');

	//设置鼠标放在图片上，自动播放停止
	$box.mouseenter(function(){
		clearInterval($timer1);
	})
	
	//设置鼠标移开图片，自动播放开始
	$box.mouseleave(function(){
		$timer1 = setInterval(autoplay,3000);
	})


	//设置自动播放的函数
	function autoplay(){
		$last = $now;
		$now ++;
		if($now>=0){
			var $now_point = $points.eq($now);
			move($now_point);
		}
		else{
			move();
		}
	};
	//设置动画移动效果函数
	function move(t){
		if($now<0){
			$now = $len - 1;
			$photos.eq($last).stop().animate({'left':520});
			$photos.eq($now).css({'left':-520});
			$photos.eq($now).stop().animate({'left':0},function(){
				$has_moved = true;
			});
			$points.eq($now).addClass('current').siblings().removeClass('current');
			return;

		}
		if($now>$len-1){
			$now = 0;
			$photos.eq($last).stop().animate({'left':-520});
			$photos.eq($now).css({'left':520});
			$photos.eq($now).stop().animate({'left':0},function(){
				$has_moved = true;
			});
			$points.eq($now).addClass('current').siblings().removeClass('current');
			return;

		}

		if($now>$last){
			$photos.eq($last).stop().animate({'left':-520});
			$photos.eq($now).css({'left':520});
			$photos.eq($now).stop().animate({'left':0},function(){
				$has_moved = true;
			});
			t.addClass('current').siblings().removeClass('current');
		}
		else if($now<$last){
			$photos.eq($last).stop().animate({'left':520});
			$photos.eq($now).css({'left':-520});
			$photos.eq($now).stop().animate({'left':0},function(){
				$has_moved = true;
			});
			t.addClass('current').siblings().removeClass('current');
		}
	};

/*------------------------------分割线---------------------------*/
	var $like_unlike = $('.main .center_left .huandengpian .like-unlike');
	var $adv_logo = $('.main .center_left .huandengpian .adv_logo');

	$adv_logo.mouseenter(function(){
		$(this).hide();
		$like_unlike.show();
	})

	$like_unlike.mouseleave(function(){
		$(this).hide();
		$adv_logo.show();
	})


/*------------------------------------分割线------------------------------*/
	var $prev1 = $('.main .center_left .TM .TM_photos .prev_txt');
	var $next1 = $('.main .center_left .TM .TM_photos .next_txt');
	var $photos1 = $('.main .center_left .TM .TM_photos ul');
	var $len1 = $photos1.length;
	var $TM_title_page = $('.main .center_left .TM .current_page .current');
	var $jindutiao = $('.main .center_left .TM .jindutiao li');

	var $now1 = 0;
	var $last1 = 0;
	//解决暴力操作的BUG
	var $has_moved1 = true;
	//定义向前事件
	$prev1.click(function(){
		if($has_moved1==false){
			return;
		}
		$has_moved1 = false;
		$last1 = $now1;
		$now1 --;
		move1();
	});

	//定义向后事件
	$next1.click(function(){
		if($has_moved1==false){
			return;
		}
		$has_moved1 = false;
		$last1 = $now1;
		$now1 ++;
		move1();
	});
	
	//设置自动播放幻灯片定时器
	var $timer2 = setInterval(autoplay1,3000);
	var $box1 = $('.main .center_left .TM .TM_photos');

	//设置鼠标放在图片上，自动播放停止
	$box1.mouseenter(function(){
		clearInterval($timer2);
	});
	
	//设置鼠标移开图片，自动播放开始
	$box1.mouseleave(function(){
		$timer2 = setInterval(autoplay1,3000);
	});

	//设置自动播放的函数
	function autoplay1(){
		$last1 = $now1;
		$now1 ++;
		move1();
	};
	


	function move1(){
		if($now1<0){
			$now1 = $len1 - 1;
			$photos1.eq($last1).stop().animate({'left':520});
			$photos1.eq($now1).css({'left':-520});
			$photos1.eq($now1).stop().animate({'left':0},function(){
				$has_moved1 = true;
			});
			$TM_title_page.html($now1+1);
			$jindutiao.eq($now1).addClass('current').siblings().removeClass('current');
			return;

		}
		if($now1>$len1-1){
			$now1 = 0;
			$photos1.eq($last1).stop().animate({'left':-520});
			$photos1.eq($now1).css({'left':520});
			$photos1.eq($now1).stop().animate({'left':0},function(){
				$has_moved1 = true;
			});
			$TM_title_page.html($now1+1);
			$jindutiao.eq($now1).addClass('current').siblings().removeClass('current');

			return;

		}

		if($now1>$last1){
			$photos1.eq($last1).stop().animate({'left':-520});
			$photos1.eq($now1).css({'left':520});
			$photos1.eq($now1).stop().animate({'left':0},function(){
				$has_moved1 = true;
			});
			$TM_title_page.html($now1+1);
			$jindutiao.eq($now1).addClass('current').siblings().removeClass('current');

			
		}
		else if($now1<$last1){
			$photos1.eq($last1).stop().animate({'left':520});
			$photos1.eq($now1).css({'left':-520});
			$photos1.eq($now1).stop().animate({'left':0},function(){
				$has_moved1 = true;
			});
			$TM_title_page.html($now1+1);
			$jindutiao.eq($now1).addClass('current').siblings().removeClass('current');

			
		}
	};

	/*------------------------------------分割线------------------------------*/
	var $logo_icons = $('.main .menu_bottom_box .right .AL_APP .logo_icons li a');
	$logo_icons.hover(function(){
		$(this).prev().show();
	},function(){
		$(this).prev().hide();
	});	


	/*------------------------------------分割线------------------------------*/
	var $select_class = $('.main .menu_bottom_box .right .center .select .class span');
	var $border_bottom = $('.main .menu_bottom_box .right .center .select .border_bottom');
	var $info = $('.main .menu_bottom_box .right .center .info .information');
	var $current_select_class = 0;
	var $timer3 = null;
	$select_class.hover(function(){
		$(this).css({'color':"#f40"});
		if($(this).parent().parent().index()!=$current_select_class){

			$border_bottom.eq($current_select_class).removeClass('current');
			$info.eq($current_select_class).hide();
			$current_select_class = $(this).parent().parent().index();
			$border_bottom.eq($current_select_class).addClass('current');
			$info.eq($(this).parent().parent().index()).show();
	
		}
		
		
	},function(){
		$(this).css({'color':'#3c3c3c'});
	});

	/*------------------------------------分割线------------------------------*/


})

