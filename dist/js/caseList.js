
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

    let notice = ajaxGet('/api/main/homeNews/getHoldCourts.jhtml',{pageNum:1,pageSize:7});
    console.log(notice);
    let totalPage = Math.ceil(notice.total / 7);
    for (const item of notice.data){
        let div = ('<div class="content"><div><img src="../images/way-4-new.png" alt=""></div><p>'+item.content+'</p><p>特此公告</p><p>'+item.openTime+'</p></div>');
        $('#list').append(div);
    }
    $("#Pagination").paging({
      nowPage: 1, // 当前页码,默认为1
      pageNum: totalPage, // 总页码
      buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
      callback: function(num) { //回调函数,num为当前页码
        let notice = ajaxGet('/api/main/homeNews/getHoldCourts.jhtml',{pageNum:num,pageSize:7});
        $('#list').empty();
        for (const item of notice.data){
          let div = ('<div class="content"><div><img src="../images/way-4-new.png" alt=""></div><p>'+item.content+'</p><p>特此公告</p><p>'+item.openTime+'</p></div>');
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