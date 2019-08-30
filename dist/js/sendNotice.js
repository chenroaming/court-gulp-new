
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

    const notice = ajaxGet('/api/main/homeNews/getSendNoticeList.jhtml',{pageNum:1,pageSize:10});
    console.log(notice);
    const totalPage = Math.ceil(notice.total / 10);
    for (const item of notice.date){
        const div = ('<div class="content"><div><img src="../images/laba.png" alt=""></div><a href="'+item.address+'" target="_blank">致'+item.litigant_name+'公告</a><p>'+item.holdTime+'</p></div>');
        $('#list').append(div);
    }
    $("#Pagination").paging({
      nowPage: 1, // 当前页码,默认为1
      pageNum: totalPage, // 总页码
      buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
      callback: function(num) { //回调函数,num为当前页码
        const notice = ajaxGet('/api/main/homeNews/getSendNoticeList.jhtml',{pageNum:num,pageSize:10});
        $('#list').empty();
        for (const item of notice.date){
          const div = ('<div class="content"><div><img src="../images/laba.png" alt=""></div><a href="'+item.address+'" target="_blank">致'+item.litigant_name+'公告</a><p>'+item.holdTime+'</p></div>');
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