const form=document.getElementById('certForm');
const nameInput=document.getElementById('fullName'), cityInput=document.getElementById('city'), stateInput=document.getElementById('state');
const cert=document.getElementById('certificate'), statusEl=document.getElementById('status');
const certName=document.getElementById('certName'), certNameInline=document.getElementById('certNameInline'), certLocation=document.getElementById('certLocation');
let hasGenerated=false;
const months=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function todayText(){const d=new Date();return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;}
function safeText(v){return v.trim().replace(/\s+/g,' ');}
function fitName(){
  const el=certName; el.style.fontSize='';
  const max=cert.clientWidth*.84;
  let size=cert.clientWidth*.042;
  el.style.fontSize=size+'px';
  while((el.scrollWidth>max || el.scrollHeight>cert.clientHeight*.12) && size>cert.clientWidth*.022){size-=.5;el.style.fontSize=size+'px';}
}
function updateCertificate(){
 const name=safeText(nameInput.value), city=safeText(cityInput.value), state=stateInput.value;
 if(!name||!city||!state){statusEl.textContent='Confira os três campos obrigatórios.';return false;}
 certName.textContent=name; certNameInline.textContent=name;
 certLocation.textContent=`${city} — ${state}, ${todayText()}.`;
 requestAnimationFrame(fitName);
 hasGenerated=true;statusEl.textContent='Certificado atualizado. Você já pode baixar o arquivo.';
 return true;
}
form.addEventListener('submit',e=>{e.preventDefault();updateCertificate();});
[nameInput,cityInput,stateInput].forEach(el=>el.addEventListener('input',()=>{if(hasGenerated)updateCertificate();}));
document.getElementById('resetBtn').addEventListener('click',()=>{
 form.reset();hasGenerated=false;certName.textContent='NOME COMPLETO';certNameInline.textContent='NOME COMPLETO';certLocation.textContent=`CIDADE — ESTADO, ${todayText()}.`;
 certName.style.fontSize='';statusEl.textContent='Campos limpos. Preencha os dados para começar novamente.';
});
function filename(){let n=safeText(nameInput.value||'participante').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');return 'certificado_'+(n||'participante');}
async function renderCanvas(button){
 if(!hasGenerated&&!updateCertificate())return null;
 if(!window.html2canvas){statusEl.textContent='Não foi possível carregar a biblioteca de exportação. Verifique sua conexão e tente novamente.';return null;}
 const old=button.textContent;button.disabled=true;button.textContent='GERANDO…';statusEl.textContent='Preparando arquivo em alta resolução…';
 try{
   await document.fonts.ready;
   const canvas=await html2canvas(cert,{scale:3,backgroundColor:'#fffdf8',useCORS:true,allowTaint:false,logging:false,windowWidth:cert.scrollWidth});
   button.textContent=old;button.disabled=false;return canvas;
 }catch(err){console.error(err);statusEl.textContent='Ocorreu um erro ao gerar o arquivo. Atualize a página e tente novamente.';button.textContent=old;button.disabled=false;return null;}
}
document.getElementById('pngBtn').addEventListener('click',async function(){
 const canvas=await renderCanvas(this);if(!canvas)return;
 canvas.toBlob(blob=>{if(!blob){statusEl.textContent='Não foi possível criar o PNG.';return;}
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename()+'.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);statusEl.textContent='PNG pronto para salvar.';},'image/png');
});
document.getElementById('pdfBtn').addEventListener('click',async function(){
 const canvas=await renderCanvas(this);if(!canvas)return;
 if(!window.jspdf){statusEl.textContent='Não foi possível carregar a biblioteca de PDF. Verifique sua conexão e tente novamente.';return;}
 const {jsPDF}=window.jspdf;const pdf=new jsPDF({orientation:'portrait',unit:'mm',format:'a4',compress:true});
 const data=canvas.toDataURL('image/png');pdf.addImage(data,'PNG',0,0,210,297,undefined,'FAST');pdf.save(filename()+'.pdf');statusEl.textContent='PDF A4 pronto para salvar.';
});
window.addEventListener('resize',()=>{if(hasGenerated)fitName();});
certLocation.textContent=`CIDADE — ESTADO, ${todayText()}.`;
