
let pdfUrl = window.location.href.split('url=')[1];
if(!pdfUrl){
    window.location.href = 'index.html';
}
if(pdfUrl.indexOf('dqfile.hlcourt.gov.cn') != -1){
    pdfUrl = pdfUrl.replace('http://dqfile.hlcourt.gov.cn','https://hlcourt.obs.cn-south-1.myhuaweicloud.com:443');
}
console.log(pdfUrl);
PDFObject.embed(pdfUrl, "#content");