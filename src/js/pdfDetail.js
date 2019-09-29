
const pdfUrl = window.location.href.split('url=')[1];
console.log(pdfUrl);
if(pdfUrl == undefined){
    window.location.href = 'index.html';
}
PDFObject.embed(pdfUrl, "#content");