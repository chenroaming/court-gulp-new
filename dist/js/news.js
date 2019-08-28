const newsId = window.location.href.split('?id=',2)[1];
if (newsId == undefined) {
    window.location.href = 'index.html';
}
$('.backup').click(function(){
    window.location.href = 'index.html';
})

const res = ajaxGet('/api/main/homeNews/getHomeNewsInfo.jhtml',{newsId:newsId});
console.log(res);
$('#newsTitle').text(res.data.newsTitle);
$('#newsPic').attr('src',res.data.imgUrl);
$('.content').html(res.data.content);
const time = new Date(res.data.createDate);
$('#newsTime').text(time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+'  '+time.getHours()+':'+time.getMinutes());
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
