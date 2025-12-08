import html2pdf from "html2pdf.js";


const options = {
  margin: [10, 20, 10, 20],
  filename: 'html_content.pdf',
  image: { type: 'jpeg', quality: 100 },
  html2canvas: { scale: 1.5 },
  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
};
export default async function text_to_pdf({ string_data = "" }) {
  var l = []
  const date = new Date();
  l.push(date.getDate());
  l.push(date.getMonth());
  l.push(date.getUTCFullYear());
  l.push(date.getUTCMilliseconds());
  const dateForBlobName = l.join("")

  const htmlContent = `<div style={{fontSize: '16px', width: '100%', padding: '40px'}}>
      ${string_data}
    </div>`

  const pdfBlob = await html2pdf().from(htmlContent).set(options).outputPdf('blob');

  return { name: dateForBlobName, blob: pdfBlob, };

}