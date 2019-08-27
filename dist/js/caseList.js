$(document).ready(function () {
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

    let notice = ajaxGet('/api/main/homeNews/getHoldCourts.jhtml',{pageSize:7});
    console.log(notice);
    for (const item of notice.data){
        let div = ('<div class="content"><div><img src="../images/way-4.png" alt=""></div><p>'+item.content+'</p><p>特此公告</p><p>'+item.openTime+'</p></div>');
        $('#list').append(div);
    }
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