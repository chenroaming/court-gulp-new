
const docUrl = window.location.href.split('url=')[1];
if(!docUrl){
    window.location.href = 'index.html';
}
$('#wordSrc').attr('src','https://view.officeapps.live.com/op/view.aspx?src=' + docUrl);