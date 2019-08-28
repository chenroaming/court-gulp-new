//轮播图模块
$(document).ready(function () {
  alert(1);
  let mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      disableOnInteraction: false,
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable :true
    }
})
    let wordNews = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{pagesize:3,newsType:2});
    let picNews = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{pagesize:3,newsType:1});
    let mySwiper2 = new Swiper('.swiper-container2', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        disableOnInteraction: false,
      },
      // 如果需要分页器
      pagination: {
          el: '.swiper-pagination2',
          clickable :true
      },
      //前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer: true,
      observeParents: false
    });
    mySwiper2.el.onmouseover = function(){
      mySwiper2.autoplay.stop();
    }
    mySwiper2.el.onmouseleave = function(){
      mySwiper2.autoplay.start();
    }

    let bigDiv = '';
    for(let item of picNews.content){
      bigDiv = ('<div class="swiper-slide"><a href="news.html?id='+item.unique_id+'" target="_Blank"><img src="'+item.home_img_url+'" alt="banner" width="100%" height="100%"><div class="news-title">'+item.news_title+'</div></a></div>');
      mySwiper2.appendSlide(bigDiv);
    }
    mySwiper2.updateSlides();
    mySwiper2.pagination.render();
    mySwiper2.pagination.update();
    let holdCourts = ajaxGet('/api/main/homeNews/getHoldCourts.jhtml');
    for(const item of holdCourts.data){
      let content = ('<div class="notice-item"><span title="'+item.content+'"><img src="../images/way-4.png" alt="">'+item.content+'</span><p>特此公告。</p><p>'+item.openTime+'</p></div>');
      $('#box').append(content);
      $('#box2').append(content);
    }
    for(const item of wordNews.content){
      const time = new Date(item.create_date);
      const content = ('<div class="notice-item2"><img src="../images/way-2.png" alt=""><a href="news.html?id='+item.unique_id+'" class="wordNews" title="'+item.news_title+'" target="_blank">'+item.news_title+'</a><span>'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日</span></div>');
      $('#caseList').append(content);
    }
    let personalNotice = ajaxGet('/api/main/homeNews/getSendNoticeList.jhtml',{pagesize:4,pageSize:4});
    for(const item of personalNotice.date){
      let content = ('<div class="notice-item2"><img src="../images/way-2.png" alt=""><a href="'+item.address+'" class="wordNews" target="_blank" title="致'+item.litigant_name+'公告">致'+item.litigant_name+'公告</a><span>'+item.holdTime+'</span></div>');
      $('#personalNotice').append(content);
    }
    //公告栏滚动效果
    let top = 0;
    let top2 = 1000;
    setInterval(function(){
      top --;
      top2 --;
      $('#box').css('top',top);
      $('#box2').css('top',top2);
      if(top == -$('.info-content-box').height()*1.5){
        top2 = $('.info-content-box').height();
      }
      if(top2 == -$('.info-content-box').height()*1.5){
        top = $('.info-content-box').height();
      }
    },30);
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
