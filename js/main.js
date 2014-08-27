$(function(){

     window.onload = function(){
            $(".load").hide();

	var touchTarget=null,touchStartY=0,touchEndY=0,touchStartX=0,touchEndX=0,moveX=0,moveY=0,touchWap=1;
	var curPage=1;	
	var pageDownArrowTimer=null,pageUpArrowTimer=null;
	var changePage=false;
	var windowW=0,windowH=0
	
	
	$(".wrapper").on("touchstart",function(e) {		
		touchTarget = e.originalEvent.targetTouches[0]; 
		touchStartY = touchTarget.pageY;
		touchStartX = touchTarget.pageX;
             });

             $(".page-down").on("click",function(e){
             	nextPage();
             });
             $(".page-up").on("click",function(e){
             	prevPage();
             });

	$(".wrapper").on("touchmove",function(e) {
		touchTarget = e.originalEvent.targetTouches[0]; 
		touchEndY = touchTarget.pageY;
		touchEndX = touchTarget.pageX;
		
		moveX=Math.abs(touchEndX-touchStartX);
		moveY=Math.abs(touchEndY-touchStartY);
		if(moveY>moveX*1.2 && moveY>20){
			if(touchEndY-touchStartY>0)
				prevPage();
			else
				nextPage();
		}
            });

    //下一页箭头
            pageDownArrowTimer=setInterval(pageDownArrowInit,1000);
            function pageDownArrowInit(){
                $(".page-down .page-down-arrow").animate({top: '-30%' },500,"swing");
                $(".page-up .page-up-arrow").animate({top: '30%' },500,"swing");
                $(".page-down .page-down-arrow").animate({top: '30%' },500,"swing");
                $(".page-up .page-up-arrow").animate({top: '-30%' },500,"swing");
            }


	function pageInit(){
		TweenMax.to($(".index-title-box"),0.5,{css:{left:"0",opacity:1},ease:Power4.easeIn,onComplete:function(){
			TweenMax.staggerTo($(".index-title-box span"), .6, {marginLeft:'9%',onComplete:function(){$(".index-title-box .page-down").fadeIn(600);}}, 0.15);
		}});
	}

	pageInit();
	

            function nextPage(){

                if(changePage || curPage == $(".page").size())
                    return;

                changePage=true;

                var next_page = curPage + 1;

                //$(".page-bg").eq(-curPage).stop().animate({top:"-120%"},"slow","swing");


         	  $(".page").eq(-next_page).css({opacity:"1",display:"block"});

         	  var next_page_id = $(".page").eq(-next_page).attr("id");
         	  var cur_page_id = $(".page").eq(-curPage).attr("id");

         	  if(next_page_id=="activity" || next_page_id=="guest" || next_page_id=="highlight" || next_page_id=="moment"  || next_page_id=="media"){
         		show_activity_page(curPage);
         	  }else if(next_page_id=="place"){
         		show_place_page(curPage);
         	  }else if(next_page_id=="achieve" || next_page_id=="thanks"){
                            show_register_page(curPage);
                }

                    if(cur_page_id == "card"){
                        hide_card_page(curPage);
                    }

             	curPage = curPage + 1;
             	
             	$(".page-down").show();
        	$(".page-up").show();
                     $(".page").eq(-next_page).css({opacity:"1"});

                    if(curPage == $(".page").size())
                    $(".page-down").hide();

                }


        function show_activity_page(curPage){
    	$(".page").eq(-curPage-1).find(".page-title").first().css({left:"120%"});
     	$(".page").eq(-curPage-1).find(".page-flows-box").first().css({left:"120%"});

     	$(".page").eq(-curPage).stop().animate({top:"-120%"},"slow","swing",function(){
     		//alert($(".page").eq(-(curPage+1)).find(".page3-title").first().html());
			$(".page").eq(-(curPage+1)).find(".page-title").first().stop().animate({opacity:"1",left: '7.5%' },500,"swing");
			$(".page").eq(-(curPage+1)).find(".page-flows-box").first().stop().delay(300).animate({opacity:"1",left: '0' },300,"swing",function(){
				changePage=false;
			});
     	});
        }


        function show_register_page(curPage){
            $(".page").eq(-curPage-1).find(".page-title").first().css({left:"120%"});
            $(".page").eq(-curPage).stop().animate({top:"-110%",display:"none"},"slow",function(){
                //alert($(".page").eq(-(curPage+1)).find(".page3-title").first().html());
                $(".page").eq(-(curPage+1)).find(".page-title").first().stop().animate({opacity:"1",left: '7.5%' },500,"swing",function(){
                    changePage=false;
                });
            });
        }

        function show_place_page(curPage){
        	$(".page").eq(-curPage-1).find(".address-info").first().css({marginTop:"1010px"});
            $(".page").eq(-curPage).stop().animate({top:"-120%"},"slow","swing",function(){
      			$(".page").eq(-curPage-1).find(".address-info").first().stop().animate({opacity:"1",marginTop: '700px' },300,"swing",function(){
    				changePage=false;
    			});
           	});
        }

        function hide_index_page(curPage){
        	$(".page1-logo1").stop().animate({opacity:"0",top: '-10%' },600,"swing");
         	$(".index-title-box").stop().animate({opacity:"0",top: '-60%' },600,"swing");
        }

        function hide_contact_page(curPage){
            $(".page7-flows-box").stop().animate({opacity:"0",top: '-60%' },600,"swing");

            $(".page7-title").stop().animate({opacity:"0"},600,"swing");
        }

        function hide_card_page(curPage){
        	$(".card-xf-box").stop().animate({opacity:"0",bottom: '220%' },600,"swing");
         	$("#card .xf1").removeClass("on");
         	$("#card .card").removeClass("on");
        }

        function hide_activity_page(curPage){
         	$(".page").eq(-curPage).find(".page-flows-box").first().stop().animate({opacity:"0",top: '-60%' },600,"swing");
          	$(".page").eq(-curPage).find(".page-title").first().stop().animate({opacity:"0",bottom: '110%' },600,"swing");
        }

    

        function prevPage(){
            if(changePage || curPage ==1)
                return;
            changePage=true;
            var prev_page = curPage - 1;

            var prev_page_id = $(".page").eq(-prev_page).attr("id");
            var cur_page_id = $(".page").eq(-curPage).attr("id");


            if(curPage != $(".page").size())
                $(".page-down").show();


            if(prev_page_id=="index"){
                $(".index-title-box").css({left:"100%",top:"20%"});
                $(".index-title-box span").css({marginLeft:"100%"});
                $("#index .page-bg").stop().animate({top:"0",opacity:1},"slow","swing");
                $(".index-logo").stop().animate({opacity:"1",top: '0' },600,"swing");
                $(".page-up").hide();
                $(".page-down").hide();
                $(".index-title-box .page-down").show();

            }else if(prev_page_id=="activity" || prev_page_id=="guest" || prev_page_id=="highlight"  || prev_page_id=="moment"  || prev_page_id=="media"){
                $("#"+prev_page_id+" .page-title").css({left:"120%",top:"8%"});
                $("#"+prev_page_id+" .page-flows-box").css({left:"120%",top:"15%"});      
                $("#"+prev_page_id).css({display:""});
                $("#"+prev_page_id+" .page-bg").stop().animate({top:"0"},"slow","swing");
            }else if(prev_page_id=="achieve" || prev_page_id=="thanks"){
                 $("#"+prev_page_id+" .page-title").css({left:"120%",top:"8%"});
                $("#"+prev_page_id).css({display:""});
                $("#"+prev_page_id+" .page-bg").stop().animate({top:"0"},"slow","swing");
            }else if(prev_page_id=="place"){
                $("#"+prev_page_id+" .address-info").css({marginTop:"700px"});

            }
         

            $(".page").eq(-prev_page).stop().animate({top:"0",opacity:"show",display:""},"slow",function(){

                if(prev_page_id=="index"){
                   TweenMax.to($(".index-title-box"),0.5,{css:{left:"0",opacity:1},ease:Power4.easeIn,onComplete:function(){
                        TweenMax.staggerTo($(".index-title-box span"), .6, {marginLeft:'9%',onComplete:function(){$(".index-title-box .page-down").fadeIn(600);}}, 0.15);

                        setTimeout(function(){changePage=false;},600);
                        //$(".page-down").hide();
                        $("#card .xf1").removeClass("on");
                        $("#card .card").removeClass("on");
                    }});

                }else if(prev_page_id=="activity" || prev_page_id=="guest" || prev_page_id=="highlight" || prev_page_id=="moment"  || prev_page_id=="media"){
                    $("#"+prev_page_id+" .page-title").stop().animate({opacity:"1",left: '7.5%' },500,"swing");
                    $("#"+prev_page_id+" .page-flows-box").stop().delay(300).animate({opacity:"1",left: '0' },300,"swing",function(){
                        changePage=false;
                    });
                }else if(prev_page_id=="place"){
                    // $("#"+prev_page_id+" .address-info").stop().animate({opacity:"1",marginTop: '500px' },300,"swing",function(){
                    //     changePage=false;
                    // });

                    //$(".page").eq(-curPage).stop().animate({top:"-120%"},"slow","swing",function(){
                    //$("#"+prev_page_id+" .address-info").stop().animate({opacity:"1",marginTop: '500px' },300,"swing",function(){
                        changePage=false;
                    //});
                    //});
                }else if(prev_page_id=="achieve" || prev_page_id=="thanks"){
                    $("#"+prev_page_id+" .page-title").stop().animate({opacity:"1",left: '7.5%' },500,"swing");
                    changePage=false;
                }

            });
            curPage = curPage - 1;
        }


        page_home_init();


        function page_home_init(){
            var current_comp_index = parseInt($(".current-comp").html());
            to_page(current_comp_index);
        }


        function to_page(page){
    	$(".page").css({opacity:"0"});
    	$(".page").eq(-page-1).css({opacity:"1"});
    	var next_page_id = $(".page").eq(-page-1).attr("id");
     	var cur_page_id = $(".page").eq(-page).attr("id");

     	

     	if(next_page_id=="card"){
     		show_card_page(page);
     	}else if(next_page_id=="activity" || next_page_id=="guest" || next_page_id=="highlight" || next_page_id == "weather"){
     		show_activity_page(page);
     	}else if(next_page_id=="place"){
     		show_place_page(page);
     	}else if(next_page_id=="place-info"){
     		show_place_info_page(page);
     	}else if(next_page_id=="contact"){
     		show_contact_page(page);
     	}else if(next_page_id=="register"){
            show_register_page(page);
            }

     	if(page>1){
     	       $(".page-down").show();
	       $(".page-up").show();
	       curPage = page+1;
     	}
        }


        initFlows();

         function initFlows(){
            $(".owl-carousel").owlCarousel({
    	   navigation : true, 
    	   pagination:true,
                autoPlay: true,
                navigationText:["",""],
                slideSpeed : 300,
                paginationSpeed : 400,
                items:1,
                itemsTablet:[320,1],
                itemsMobile:[320,1],
                singleItem:true,
                goToFirst:true,
                afterInit:function(){}
            });
        }
    }
});