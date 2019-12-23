
let pdfUrl = window.location.href.split('url=')[1];
if(!pdfUrl){
    window.location.href = 'index.html';
}
if(pdfUrl.indexOf('dqfile.hlcourt.gov.cn') != -1){
    pdfUrl = pdfUrl.replace('dqfile.hlcourt.gov.cn','hlcourt.obs.cn-south-1.myhuaweicloud.com:443');
}else if(pdfUrl.indexOf('hlcourt.obs.cn-south-1.myhuaweicloud.com:443') != -1){
    
}else{
    pdfUrl = 'https://hlcourt.obs.cn-south-1.myhuaweicloud.com:443' + pdfUrl;
}
console.log(pdfUrl);
PDFObject.embed(pdfUrl, "#content");