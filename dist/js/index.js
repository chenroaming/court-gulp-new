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
    const courtNewsList = ajaxGet('api/main/homeNews/getHomeNews.jhtml',{count:5,newsType:'1',top:true});
    const personalNotice = ajaxGet('/api/main/homeNews/getSendNoticeList.jhtml',{pageSize:10});
    const wordNews = ajaxGet('api/main/homeNews/getHomeNews.jhtml',{count:3,newsType:'3',top:true});
    let unique_id = '';
    for (const item of courtNewsList.content){
      const content = ('<div class="court-news-title"><a imgUrl="'+item.img_url+'" href="news.html?id='+item.unique_id+'">'+item.news_title+'</a></div>');
      $('#topNewsList').append(content);
      unique_id = unique_id + item.unique_id + ',';
    }
    $('#news-pic').attr('src',courtNewsList.content[0].img_url);
    const courtNewsAll = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{count:5,newsType:'1,2',pageSize:4,top:true,ids:unique_id.slice(0,unique_id.length-1)});
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
    for(const item of courtNewsAll.content){
      const time = new Date(item.create_date);
      const content = ('<div class="notice-item2"><img src="../images/mark.png" alt=""><a href="news.html?id='+item.id+'" class="wordNews" title="'+item.news_title+'" target="_blank">'+item.news_title+'</a><span>'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日</span></div>');
      $('#courtAllNews').append(content);
    }
    for(const item of personalNotice.date){
      const content = ('<div class="notice-item2"><img src="../images/laba.png" alt=""><a href="pdfDetail.html?url='+item.address+'" class="wordNews" target="_blank" title="致'+item.litigant_name+'公告">致'+item.litigant_name+'公告</a><span>'+item.holdTime+'</span></div>');
      $('#personalNoticeBox').append(content);
      $('#personalNoticeBox2').append(content);
    }
    //公告栏滚动效果
    let top = 0;
    let top2 = 1000;
    setInterval(function(){
      top --;
      top2 --;
      $('#box').css('top',top);
      $('#personalNoticeBox').css('top',top);
      $('#box2').css('top',top2);
      $('#personalNoticeBox2').css('top',top2);
      if(top == parseInt(-$('.info-content-box').height()*1.5)){
        top2 = $('.info-content-box').height();
      }
      if(top2 == parseInt(-$('.info-content-box').height()*1.5)){
        top = $('.info-content-box').height();
      }
    },30);

    $('.court-news-title a').mouseover(function(){
      $('#news-pic').attr('src',$(this).attr('imgUrl'));
    })
    $('.unChoice-case').click(function(){
      $('.unChoice-case').removeClass('choice-case');
      $(this).addClass('choice-case');
      $('#personalNoticeBox').empty();
      $('#personalNoticeBox2').empty();
      if($(this).attr('id') == 'financialCase'){
        const financial = ajaxGet('/api/main/homeNews/getFinanceInfo.jhtml',{pageNum:1,pageSize:10});
        for(const item of financial.data.data){
          const content = ('<div class="notice-item2"><img src="../images/laba.png" alt=""><a class="wordNews financial-word" target="_blank" index="'+item.id+'" name="'+item.name+'" title='+item.noticeName+'>'+item.noticeName+'</a><span>'+item.date+'</span></div>');
          $('#personalNoticeBox').append(content);
          $('#personalNoticeBox2').append(content);
        }
      }else{
        const personalNotice = ajaxGet('/api/main/homeNews/getSendNoticeList.jhtml',{pageSize:10});
        for(const item of personalNotice.date){
          const content = ('<div class="notice-item2"><img src="../images/laba.png" alt=""><a href="pdfDetail.html?url='+item.address+'" class="wordNews" target="_blank" title="致'+item.litigant_name+'公告">致'+item.litigant_name+'公告</a><span>'+item.holdTime+'</span></div>');
          $('#personalNoticeBox').append(content);
          $('#personalNoticeBox2').append(content);
        }
      }
    })
    $('#personalNoticeBox').on('click','.financial-word',function(){
      const res = ajaxGet('/api/main/homeNews/getOutNotice.jhtml',{id:$(this).attr('index'),name:$(this).attr('name')});
      window.open(res.data,'_blank')
    })

    $('#personalNoticeBox2').on('click','.financial-word',function(){
      const res = ajaxGet('/api/main/homeNews/getOutNotice.jhtml',{id:$(this).attr('index'),name:$(this).attr('name')});
      window.open(res.data,'_blank')
    })
})
function ajaxGet(url,data =''){let response = '';$.ajax({url: url,type: 'get',async: false,data:data,success: (res)=> {response = res;},error: ()=> {sweetAlert({title: '网络错误，请重试！',type: "warning",timer: 1500});}});return response;}

