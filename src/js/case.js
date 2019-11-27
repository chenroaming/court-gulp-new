$(document).ready(function () {
    const type = window.location.href.split('newsType=')[1] == 1 ? '1,2' : 3;
    let nowPage = 1;
    let nowWord = '';
    type == '1,2' ? $('.m-title-text').text('法院新闻') : (type == 3 ? $('.m-title-text').text('典型案例') : window.location.href = 'index.html');
    transform();
    function transform(){
      $('#list').empty();
      const notice = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{pageNum:1,pageSize:7,keyWords:nowWord,newsType:'3'});
      if(typeof(notice) == 'string') return sweetAlert({title: '网络错误！',type: "warning",timer: 1500});
      if(notice.total == 0){
        sweetAlert({title: '查无数据！',type: "warning",timer: 1500});
        $("#Pagination").empty();
        return false;
      }
      const totalPage = Math.ceil(notice.total / 7);
      for (const item of notice.content){
        const time = new Date(item.create_date);
        if(type == 3){
          const div = ('<div class="content"><div><img src="../images/mark.png" alt=""></div><a href="docx.html?url=http://court1.ptnetwork001.com'+item.classic_path+'" target="_blank">'+item.classic_cases+'</a><p>'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+'</p></div>');
          $('#list').append(div);
        }
        // const div = ('<div class="content"><div><img src="../images/mark.png" alt=""></div><a href="news.html?id='+item.unique_id+'" target="_blank">'+item.news_title+'</a><p>'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+'</p></div>');
      }
      $("#Pagination").paging({
        nowPage: 1, // 当前页码,默认为1
        pageNum: totalPage, // 总页码
        buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
        callback: function(num) { //回调函数,num为当前页码
          if(nowPage == num) return;
          nowPage = num;
          const notice = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{pageNum:num,pageSize:7,keyWords:nowWord,newsType:'3'});
          $('#list').empty();
          for (const item of notice.content){
            const time = new Date(item.create_date);
            if(type == 3){
              const div = ('<div class="content"><div><img src="../images/mark.png" alt=""></div><a href="docx.html?url=http://court1.ptnetwork001.com'+item.classic_path+'" target="_blank">'+item.classic_cases+'</a><p>'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+'</p></div>');
              $('#list').append(div);
            }
            // const div = ('<div class="content"><div><img src="../images/mark.png" alt=""></div><a href="news.html?id='+item.unique_id+'" target="_blank">'+item.news_title+'</a><p>'+time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+'</p></div>');
            
          }
        }
      });
    }
    $('#searchIcon').click(() => {
      if(nowWord == $('#search').val()) return;
      $("#Pagination").empty();
      nowWord = $('#search').val();
      transform();
    })
})
//ajax的小封装
function ajaxGet(url,data =''){let response = '';$.ajax({url: url,type: 'get',async: false,data:data,success: (res)=> {response = res;},error: ()=> {sweetAlert({title: '网络错误，请重试！',type: "warning",timer: 1500});}});return response;}