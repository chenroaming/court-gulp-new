//轮播图模块
$(document).ready(function () {
//   const mySwiper = new Swiper('.swiper-container', {
//     direction: 'horizontal',
//     loop: true,
//     autoplay: {
//       disableOnInteraction: false,
//     },
//     // 如果需要分页器
//     pagination: {
//         el: '.swiper-pagination',
//         clickable :true
//     }
// })
    // const picNews = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{pagesize:3,newsType:1});
    // const mySwiper2 = new Swiper('.swiper-container2', {
    //   direction: 'horizontal',
    //   loop: true,
    //   autoplay: {
    //     disableOnInteraction: false,
    //   },
    //   // 如果需要分页器
    //   pagination: {
    //       el: '.swiper-pagination2',
    //       clickable :true
    //   },
    //   //前进后退按钮
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    //   observer: true,
    //   observeParents: false
    // });
    // mySwiper2.el.onmouseover = function(){
    //   mySwiper2.autoplay.stop();
    // }
    // mySwiper2.el.onmouseleave = function(){
    //   mySwiper2.autoplay.start();
    // }

    // let bigDiv = '';
    // for(let item of picNews.content){
    //   bigDiv = ('<div class="swiper-slide"><a href="news.html?id='+item.unique_id+'" target="_Blank"><img src="'+item.home_img_url+'" alt="banner" width="100%" height="100%"><div class="news-title">'+item.news_title+'</div></a></div>');
    //   mySwiper2.appendSlide(bigDiv);
    // }
    // mySwiper2.updateSlides();
    // mySwiper2.pagination.render();
    // mySwiper2.pagination.update();
    const holdCourts = ajaxGet('/api/main/homeNews/getHoldCourts.jhtml');
    const courtNewsList = ajaxGet('api/main/homeNews/getTopNews.jhtml',{count:5});
    const wordNews = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{pagesize:3,newsType:2});
    const personalNotice = ajaxGet('/api/main/homeNews/getSendNoticeList.jhtml',{pagesize:4,pageSize:4});
    const courtNewsAll = ajaxGet('api/main/homeNews/getTopNews.jhtml',{count:3});
    console.log(courtNewsList);
    $('#news-pic').attr('src',courtNewsList.homeNews[0].home_imgUrl);
    for (const item of courtNewsList.homeNews){
      const content = ('<div class="court-news-title"><a imgUrl="'+item.home_imgUrl+'" href="news.html?id='+item.id+'">'+item.newsTitle+'</a></div>');
      $('#topNewsList').append(content);
    }
    for(const item of holdCourts.data){
      const content = ('<div class="notice-item"><div><img src="../images/hammer.png" alt=""><span title="'+item.content+'">'+item.content+'</span></div><p>特此公告。</p><p>'+item.openTime+'</p></div>');
      $('#box').append(content);
      $('#box2').append(content);
    }
    for(const item of wordNews.content){
      const time = new Date(item.create_date);
      const content = ('<div class="notice-item2"><img src="../images/mark.png" alt=""><a href="news.html?id='+item.unique_id+'" class="wordNews" title="'+item.news_title+'" target="_blank">'+item.news_title+'</a><span>'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日</span></div>');
      $('#caseList').append(content);
    }
    for(const item of courtNewsAll.homeNews){
      const time = new Date(item.createDate);
      const content = ('<div class="notice-item2"><img src="../images/mark.png" alt=""><a href="news.html?id='+item.id+'" class="wordNews" title="'+item.newsTitle+'" target="_blank">'+item.newsTitle+'</a><span>'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日</span></div>');
      $('#courtAllNews').append(content);
    }
    for(const item of personalNotice.date){
      const content = ('<div class="notice-item2"><img src="../images/laba.png" alt=""><a href="pdfDetail.html?url='+item.address+'" class="wordNews" target="_blank" title="致'+item.litigant_name+'公告">致'+item.litigant_name+'公告</a><span>'+item.holdTime+'</span></div>');
      $('#personalNotice').append(content);
    }
    //公告栏滚动效果
    let top = 0;
    let top2 = 1000;
    console.log(parseInt(-$('.info-content-box').height()*1.5));
    setInterval(function(){
      top --;
      top2 --;
      $('#box').css('top',top);
      $('#box2').css('top',top2);
      if(top == parseInt(-$('.info-content-box').height()*1.5)){
        top2 = $('.info-content-box').height();
      }
      if(top2 == parseInt(-$('.info-content-box').height()*1.5)){
        top = $('.info-content-box').height();
      }
    },30);
    $('.login-wrapper').hover(function() {
      // 鼠标移入时添加hover类
      $(this).addClass('login-wrapper-hover')
      }, function() {
      // 鼠标移出时移出hover类
      $(this).removeClass('login-wrapper-hover')
    });

    $('.court-news-title a').mouseover(function(){
      $('#news-pic').attr('src',$(this).attr('imgUrl'));
    })
})

//ajax的小封装
function ajaxGet(url,data =''){
  let response = '';
  $.ajax({
    url: url,
    type: 'get',
    async: false,
    data:data,
    success: (res)=> {
      response = res;
    },
    error: ()=> {
      sweetAlert({
          title: '网络错误，请重试！',
          type: "warning",
          timer: 1500
        });
    }
  });
  return response;
}

function ajaxPost(url,data){
  let response = '';
  $.ajax({
    url: url,
    type: 'post',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: false,
    data:JSON.stringify(data),
    success:(res)=> {
      response = res;
    },
    error: ()=> {
      sweetAlert({
          title: '网络错误，请重试！',
          type: "warning",
          timer: 1500
        });
    }
  });
  return response;
}
