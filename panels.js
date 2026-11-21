"use strict";
// v3.6: high-contrast results, updated by the same calculations that drive the graphs.
const panelWords={
  pt:{"Resultado em destaque":"Resultado em destaque","Atualização interativa":"Atualização interativa","Posição x":"Posição x","Valor f(x)":"Valor f(x)","Tipo de função":"Tipo de função","Ponto a":"Ponto a","Pela esquerda":"Pela esquerda","Pela direita":"Pela direita","Limite estimado":"Limite estimado","Inclinação f′(x)":"Inclinação f′(x)","Limite inferior":"Limite inferior","Limite superior":"Limite superior","Integral definida":"Integral definida",up:'A função está crescendo neste ponto.',down:'A função está decrescendo neste ponto.',flat:'A tangente é horizontal neste ponto.',signed:'Resultado com sinal: regiões abaixo do eixo x contribuem negativamente.',bad:'Resultado indisponível para os valores atuais.'},
  en:{"Resultado em destaque":"Highlighted results","Atualização interativa":"Live updates","Posição x":"Position x","Valor f(x)":"Value f(x)","Tipo de função":"Function type","Ponto a":"Approach point a","Pela esquerda":"From the left","Pela direita":"From the right","Limite estimado":"Estimated limit","Inclinação f′(x)":"Slope f′(x)","Limite inferior":"Lower bound","Limite superior":"Upper bound","Integral definida":"Definite integral",up:'The function is increasing at this point.',down:'The function is decreasing at this point.',flat:'The tangent is horizontal at this point.',signed:'Signed result: regions below the x-axis contribute negatively.',bad:'Result unavailable for the current values.'},
  es:{"Resultado em destaque":"Resultados destacados","Atualização interativa":"Actualización interactiva","Posição x":"Posición x","Valor f(x)":"Valor f(x)","Tipo de função":"Tipo de función","Ponto a":"Punto de aproximación a","Pela esquerda":"Por la izquierda","Pela direita":"Por la derecha","Limite estimado":"Límite estimado","Inclinação f′(x)":"Pendiente f′(x)","Limite inferior":"Límite inferior","Limite superior":"Límite superior","Integral definida":"Integral definida",up:'La función es creciente en este punto.',down:'La función es decreciente en este punto.',flat:'La tangente es horizontal en este punto.',signed:'Resultado con signo: las regiones bajo el eje x contribuyen negativamente.',bad:'Resultado no disponible para los valores actuales.'}
};
let panelsQueued=false;
function panelLanguage(){return document.getElementById('language')?.value||'pt'}
function panelSet(key,value){const el=document.getElementById('metric-'+key);if(el){const s=String(value);if(el.textContent!==s)el.textContent=s}}
function panelText(id,value){const el=document.getElementById(id);if(el&&el.textContent!==value)el.textContent=value}
function panelNum(v){return Number.isFinite(v)?num(v):'—'}
function updateResultPanels(){
  panelsQueued=false;
  const lang=panelLanguage(),dict=panelWords[lang]||panelWords.pt;
  document.querySelectorAll('[data-panel-label]').forEach(el=>{const key=el.dataset.panelLabel;const t=dict[key]||key;if(el.textContent!==t)el.textContent=t});
  try{const f=compiled(document.getElementById('expression').value);const x=Number.isFinite(graphX)?graphX:2;panelSet('fx-x',panelNum(x));panelSet('fx-y',panelNum(f(x)));panelSet('fx-kind',document.getElementById('type').textContent)}catch{panelSet('fx-y','—')}
  try{
    const f=compiled(document.getElementById('limit-expression').value),a=Number(document.getElementById('limit-point').value.replace(',','.'));
    const h=Math.max(1,Math.abs(a))*1e-5;
    panelSet('lim-x',panelNum(a));panelSet('lim-left',panelNum(f(a-h)));panelSet('lim-right',panelNum(f(a+h)));
    panelSet('lim-result',document.getElementById('limit-result').textContent.trim());
  }catch{panelSet('lim-result','—')}
  try{
    const s=document.getElementById('expression').value,f=compiled(s),x=Number(document.getElementById('tangent-x').value);
    const d=compiled(nerdamer.diff(nerd(s),'x').toString()),slope=d(x);
    panelSet('der-x',panelNum(x));panelSet('der-y',panelNum(f(x)));panelSet('der-slope',panelNum(slope));
    panelText('der-meaning',!Number.isFinite(slope)?dict.bad:Math.abs(slope)<1e-8?dict.flat:slope>0?dict.up:dict.down);
  }catch{panelSet('der-slope','—');panelText('der-meaning',dict.bad)}
  try{
    const f=compiled(document.getElementById('expression').value),a=Number(document.getElementById('lower').value.replace(',','.')),b=Number(document.getElementById('upper').value.replace(',','.'));
    panelSet('int-a',panelNum(a));panelSet('int-b',panelNum(b));
    const result=simpson(f,a,b,120);panelSet('int-value',panelNum(result));panelText('int-meaning',dict.signed);
  }catch{panelSet('int-value','—');panelText('int-meaning',dict.bad)}
}
window.scheduleResultPanels=function(){if(!panelsQueued){panelsQueued=true;queueMicrotask(updateResultPanels)}};
window.addEventListener('load',()=>{
  window.scheduleResultPanels();
  document.getElementById('language')?.addEventListener('change',window.scheduleResultPanels);
  for(const id of ['expression','limit-expression','limit-point','tangent-x','lower','upper'])document.getElementById(id)?.addEventListener('input',window.scheduleResultPanels);
});
