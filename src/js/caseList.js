
$(".time").flatpickr();
  transform();
$('#searchSubmit').click(() => {
  $("#Pagination").empty();
  $('#list').empty();
  transform();
})
let nowPage = 1;
function transform(){
  const caseNo = $('#years').val()+$('.search-option2 span')[1].innerText+$('#types').val()+$('#caseNum').val();
  const litigantName = $('#litigantName').val();
  const startT = $("#startTime").val();
  const enT = $('#endTime').val();
  const notice = ajaxGet('/api/main/homeNews/getHoldCourts.jhtml',{pageNum:1,pageSize:7,caseNo:caseNo,name:litigantName,startT:startT,endT:enT});
  if(notice.total == 0) {
    return sweetAlert({title: '查无数据！',type: "warning",timer: 1500});
  }
  const totalPage = Math.ceil(notice.total / 7);
  for (const item of notice.data){
      const div = ('<div class="content"><div><img src="../images/hammer.png" alt=""></div><p>'+item.content+'</p><p>承办法官：<span>'+item.judge+'</span><span>'+item.caseNo+'</span></p></div>');
      $('#list').append(div);
  }
  $("#Pagination").paging({
    nowPage: 1, // 当前页码,默认为1
    pageNum: totalPage, // 总页码
    buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
    callback: function(num) { //回调函数,num为当前页码
      if(nowPage == num) return;
      nowPage = num;
      const notice = ajaxGet('/api/main/homeNews/getHoldCourts.jhtml',{pageNum:num,pageSize:7,caseNo:caseNo,name:litigantName,startT:startT,endT:enT});
      $('#list').empty();
      for (const item of notice.data){
        const div = ('<div class="content"><div><img src="../images/hammer.png" alt=""></div><p>'+item.content+'</p><p>承办法官：<span>'+item.judge+'</span><span>'+item.caseNo+'</span></p></div>');
        $('#list').append(div);
      }
    }
  });
}
function ajaxGet(url,data =''){let response = '';$.ajax({url: url,type: 'get',async: false,data:data,success: (res)=> {response = res;},error: ()=> {sweetAlert({title: '网络错误，请重试！',type: "warning",timer: 1500});}});return response;}