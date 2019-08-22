const newsId = window.location.href.split('?id=',2);
console.log(newsId[1]);
$('.backup').click(function(){
    window.location.href = 'index.html';
})
