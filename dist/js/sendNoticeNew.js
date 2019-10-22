let nowNum = 1;
let first = false;
$(document).ready(function () {
    search();
    first = true;
})

function transform(noticeList){
    $('#noticeList').empty();
    for (const item of noticeList){
        const tr = ('<tr align="center"><td><a href="pdfDetail.html?url='+item.address+'" target="_blank">'+item.caseNo+'</a></td><td><a href="pdfDetail.html?url='+item.address+'" target="_blank">'+item.litigant_name+'</a></td><td>'+item.briefName+'</td><td>'+item.holdTime+'</td><td><a href="'+item.address+'" target="_blank" download class="download-box"><i title="下载" class="download"></i></a></td></tr>');
        $('#noticeList').append(tr);
    }
}

function search(caseNo = '',litigantName = '',noticeType = ''){
    const notice = ajaxGet('/api/main/homeNews/getSendNoticeList.jhtml',{pageNum:1,pageSize:11,caseNo:caseNo,litigantName:litigantName,noticeType:noticeType});
    if(notice.state == 101){
        return sweetAlert({title: notice.message,type: "warning",timer: 1500});
    }
    if(notice.total == 0){
        return sweetAlert({title: '查无数据！',type: "warning",timer: 1500});
    }
    if(first){
        sweetAlert({title: notice.message,type: "success",timer: 1500});
    }
    transform(notice.date);
    $("#Pagination").paging({
        nowPage: 1, // 当前页码,默认为1
        pageNum: notice.totalPages, // 总页码
        buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
        callback: function(num) { //回调函数,num为当前页码
            if(nowNum == num) return;
            const notice = ajaxGet('/api/main/homeNews/getSendNoticeList.jhtml',{pageNum:num,pageSize:11,caseNo:caseNo,litigantName:litigantName,noticeType:noticeType});
            transform(notice.date);
            nowNum = num;
        }
    });
}

$('.title-icon').click(function(){
    $('.search-option').slideToggle(500);
    !$(this).hasClass('icon_arrowDown') && !$(this).hasClass('icon_arrowUp') ? 
    $(this).addClass('icon_arrowUp') : $(this).hasClass('icon_arrowUp') ? $(this).removeClass('icon_arrowUp').addClass('icon_arrowDown') 
    :$(this).removeClass('icon_arrowDown').addClass('icon_arrowUp');
})

$('#searchSubmit').click(() => {
    const caseNo = $('#years').val()+$('.search-option2 span')[0].innerText+$('#types').val()+$('#caseNum').val();
    const litigantName = $('#litigantName').val();
    const noticeType = $('#noticeType').val();
    search(caseNo,litigantName,noticeType);
})

$('.search-option li').click(function(){
    search('','',$(this)[0].innerText);
})

function ajaxGet(url,data =''){let response = '';$.ajax({url: url,type: 'get',async: false,data:data,success: (res)=> {response = res;},error: ()=> {sweetAlert({title: '网络错误，请重试！',type: "warning",timer: 1500});}});return response;}
