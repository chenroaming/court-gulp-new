const newsId = window.location.href.split('?id=',2)[1];
if (newsId == undefined) {
    window.location.href = 'index.html';
}
$('.backup').click(function(){
    window.location.href = 'index.html';
})

const res = ajaxGet('/api/main/homeNews/getHomeNewsInfo.jhtml',{newsId:newsId});
if(res.state == 101){
  window.location.href = 'index.html';
}
$('#newsTitle').text(res.data.newsTitle);
if(res.data.imgUrl){
  const picArr = res.data.imgUrl.split(',');
  for (const item of picArr) {
    let pic = ('<img src="'+item+'" class="img-responsive" alt="">');
    $('.pic-box2').append(pic);
  }
}
const newsContent = res.data.content.replace(/(\r\n|\n|\r)/gm, '<br>');//换行符正则替换
$('.content').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+newsContent);
const time = new Date(res.data.createDate);

$('.login-wrapper').hover(function() {
  // 鼠标移入时添加hover类
  $(this).addClass('login-wrapper-hover')
  }, function() {
  // 鼠标移出时移出hover类
  $(this).removeClass('login-wrapper-hover')
});
$('#newsTime').text('发布时间：'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日');
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
