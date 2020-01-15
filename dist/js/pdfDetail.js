
const fileType = window.location.href.split('.')[window.location.href.split('.').length-1];
if(fileType == 'pdf'){
    let pdfUrl = window.location.href.split('url=')[1];
    if(!pdfUrl){
        window.location.href = 'index.html';
    }
    if(pdfUrl.indexOf('dqfile.hlcourt.gov.cn') != -1){
        pdfUrl = pdfUrl.replace('http://dqfile.hlcourt.gov.cn','https://hlcourt.obs.cn-south-1.myhuaweicloud.com:443');
    }
    PDFObject.embed(pdfUrl, "#content");
}else{
    let docUrl = window.location.href.split('url=')[1];
    if(docUrl.indexOf('court1.ptnetwork001.com') != -1){
        $('#wordSrc').attr('src','https://view.officeapps.live.com/op/view.aspx?src=' + docUrl);
    }else{
        docUrl = 'https://court1.ptnetwork001.com/' + docUrl;
        $('#wordSrc').attr('src','https://view.officeapps.live.com/op/view.aspx?src=' + docUrl);
    }
    $('#wordSrc').show();
}
