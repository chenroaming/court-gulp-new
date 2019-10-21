
$(document).ready(function () {
    // const mySwiper = new Swiper('.swiper-container', {
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

    const type = window.location.href.split('newsType=')[1];
    if(type == 1){
        $('.m-title-text').text('法院新闻');
    }else if(type == 2){
        $('.m-title-text').text('典型案例');
    }else{
        window.location.href = 'index.html';
        return false;
    }
    const notice = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{pageNum:1,pageSize:7,newsType:type});
    console.log(notice);
    const totalPage = Math.ceil(notice.total / 7);
    for (const item of notice.content){
        const time = new Date(item.create_date);
        const div = ('<div class="content"><div><img src="../images/mark.png" alt=""></div><a href="news.html?id='+item.unique_id+'" target="_blank">'+item.news_title+'</a><p>'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+'</p></div>');
        $('#list').append(div);
    }
    $("#Pagination").paging({
      nowPage: 1, // 当前页码,默认为1
      pageNum: totalPage, // 总页码
      buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
      callback: function(num) { //回调函数,num为当前页码
        console.log(num);
        const notice = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{pageNum:num,pageSize:7,newsType:type});
        $('#list').empty();
        for (const item of notice.content){
          const time = new Date(item.create_date);
          const div = ('<div class="content"><div><img src="../images/mark.png" alt=""></div><a href="news.html?id='+item.unique_id+'" target="_blank">'+item.news_title+'</a><p>'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+'</p></div>');
          $('#list').append(div);
        }
        console.log(num);
      }
    });
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