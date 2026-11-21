'use strict';
const $=id=>document.getElementById(id);
const functionCases=[['Constante','5'],['Afim','2*x+1'],['Linear','3*x'],['Quadrática','x^2+3*x-5'],['Modular','abs(x)'],['Exponencial','exp(x)'],['Logarítmica','log(x)'],['Trigonométrica','sin(x)']];
const limitCases=[['Contínua','x^2+3*x-5','2'],['Indeterminação removível','(x^2-1)/(x-1)','1'],['Laterais diferentes','abs(x)/x','0'],['Infinito','1/x^2','0']];
const derivativeCases=[['Constante','5','0','A derivada de uma constante é zero.'],['Potência','x^4','4*x^3','Multiplicamos pelo expoente e diminuímos o expoente em 1.'],['Soma/subtração','x^3-2*x','3*x^2-2','Derivamos cada parcela separadamente.'],['Produto','x^2*sin(x)','2*x*sin(x)+x^2*cos(x)','(uv)\u2032 = u\u2032v + uv\u2032.'],['Quociente','x/(x+1)','1/(x+1)^2','(u/v)\u2032 = (u\u2032v-uv\u2032)/v².'],['Cadeia','(2*x+1)^3','6*(2*x+1)^2','Derivamos a função externa e multiplicamos pela derivada interna.']];
const integralCases=[['Constante','5','5*x','A integral de uma constante k é kx + C.'],['Potência','x^3','x^4/4','Aumentamos o expoente em 1 e dividimos pelo novo expoente.'],['Soma/subtração','x^2-2*x','x^3/3-x^2','Integramos cada parcela separadamente.'],['Exponencial','exp(x)','exp(x)','A integral de e^x é e^x + C.'],['Trigonométrica','cos(x)','sin(x)','A integral de cos(x) é sin(x) + C.'],['Substituição','2*x*cos(x^2)','sin(x^2)','Tomando u=x², du=2x dx.']];
const mathOpts={responsive:true,displayModeBar:true,displaylogo:false,scrollZoom:true,modeBarButtonsToRemove:['lasso2d','select2d'],toImageButtonOptions:{format:'png',filename:'laboratorio-calculo',scale:2}};
const layout=(title='')=>({dragmode:'pan',hovermode:'closest',title:{text:title,font:{size:13,color:'#aaaaaa'}},paper_bgcolor:'#171717',plot_bgcolor:'#171717',font:{color:'#c9c9c9'},margin:{l:48,r:15,t:35,b:42},xaxis:{gridcolor:'#363636',zerolinecolor:'#696969',title:'x'},yaxis:{gridcolor:'#363636',zerolinecolor:'#696969',title:'y'},showlegend:true,legend:{orientation:'h',y:1.13}});
const snap=n=>{const nearest=Math.round(n);return Math.abs(n-nearest)<=0.12?nearest:Math.round(n*100)/100};
const num=n=>Number.isFinite(n)?(Math.abs(n)<1e-10?'0':Number(n.toPrecision(7)).toString()):'indefinido';
const normalize=s=>s.replace(/\u2212/g,'-').replace(/\u00d7/g,'*').replace(/\u00f7/g,'/').replace(/\u03c0/g,'pi').replace(/\bln\s*\(/gi,'log(').trim();
function compiled(s){s=normalize(s);if(!s||s.length>180)throw Error('Digite uma expressão com até 180 caracteres.');const node=math.parse(s);const allowed=new Set(['x','pi','e','sin','cos','tan','asin','acos','atan','sinh','cosh','tanh','exp','log','log10','sqrt','abs','floor','ceil','round']);node.traverse(n=>{if(n.isSymbolNode&&!allowed.has(n.name))throw Error('Símbolo não suportado: '+n.name);if(n.isFunctionNode&&!allowed.has(n.fn.name))throw Error('Função não suportada.');if(n.isAssignmentNode||n.isAccessorNode)throw Error('Expressão não permitida.');});const fn=node.compile();return x=>{let v=fn.evaluate({x});if(typeof v!=='number'||!Number.isFinite(v))return NaN;return v;};}
// Após recalcular, restaura o enquadramento recomendado. O usuário ainda pode
// aplicar zoom/pan manualmente entre recálculos. Cada gráfico mantém seu próprio estado.
const plotSequence={};
function plot(id,series,extra={}){
  const seq=plotSequence[id]=(plotSequence[id]||0)+1;
  const desired=extra.xaxis?.range;
  const options={...layout(),...extra};
  if(desired)options.xaxis={...options.xaxis,range:[...desired],autorange:false};
  return Plotly.react(id,series,options,mathOpts).then(()=>{
    if(seq!==plotSequence[id]||!desired)return;
    if(id==='integral-plot')setTimeout(()=>{if(seq===plotSequence[id])Plotly.relayout(id,{'xaxis.range':[...desired],'xaxis.autorange':false});},100);
    return Plotly.relayout(id,{'xaxis.range':[...desired],'xaxis.autorange':false,'yaxis.autorange':true});
  });
}
const trace=(c,name,color)=>({...c,type:'scatter',mode:'lines',name,line:{color,width:3},connectgaps:false,hovertemplate:'x = %{x:.3f}<br>y = %{y:.3f}<extra>'+name+'</extra>'});
function quadratic(s){try{const f=compiled(s);const y0=f(0),y1=f(1),ym1=f(-1),y2=f(2),y3=f(3);const a=(y1+ym1-2*y0)/2,b=(y1-ym1)/2,c=y0;const eps=1e-7*Math.max(1,...[y0,y1,ym1,y2,y3].map(Math.abs));if(Math.abs(a)<1e-10||Math.abs(f(2)-(4*a+2*b+c))>eps||Math.abs(f(3)-(9*a+3*b+c))>eps)return null;const t=normalize(s).replace(/\s/g,'');if(/sin|cos|tan|abs|log|exp|sqrt|\//.test(t)||/x\^[3-9]/.test(t))return null;return {a,b,c,vx:-b/(2*a),vy:c-b*b/(4*a)};}catch{return null}}

function curve(f,min=-6,max=6,n=280){let x=[],y=[];for(let i=0;i<=n;i++){const v=min+(max-min)*i/n;let r;try{r=f(v)}catch{r=NaN}x.push(v);y.push(Number.isFinite(r)&&Math.abs(r)<1000?r:null)}return{x,y}}
function detect(s){const t=normalize(s).replace(/\s+/g,'');if(/^[-+]?\d+(\.\d+)?$/.test(t))return ['Constante','ℝ','{'+t+'}'];if(/^[-+]?\d*(\*?)x$/.test(t)||t==='x'||t==='-x')return ['Linear','ℝ','ℝ'];if(/abs\(/.test(t))return ['Modular','Depende da expressão','Depende da expressão'];if(/(^|[^a-z])log\(/.test(t))return ['Logarítmica','Argumento > 0','Depende da expressão'];if(/exp\(/.test(t))return ['Exponencial','Depende da expressão','Depende da expressão'];if(/sin\(|cos\(|tan\(/.test(t))return ['Trigonométrica','Depende da expressão','Depende da expressão'];if(/x\^2/.test(t)&&!(/x\^3|x\^4|\/|sqrt\(/.test(t)))return ['Possível quadrática','ℝ','Calcular pelo vértice'];if(/x/.test(t)&&!(/\^|\/|sqrt\(/.test(t)))return ['Possível afim','ℝ','ℝ ou constante'];return ['Expressão geral','Verificar restrições','Não determinada automaticamente'];}
function setText(id,v){$(id).textContent=v;if(window.scheduleResultPanels)window.scheduleResultPanels()}
function clearPlot(id,message){
  plotSequence[id]=(plotSequence[id]||0)+1;
  const target=$(id);
  if(!target)return;
  Plotly.react(id,[],{...layout(),annotations:[{xref:'paper',yref:'paper',x:.5,y:.5,showarrow:false,text:message,font:{size:14,color:'#e5e5e5'}}]},mathOpts);
}
function integralError(message){
  const card=document.querySelector('#integrais .result-dashboard');
  card?.classList.add('calculation-error');
  $('definite-result')?.classList.add('calculation-error-text');
  $('integral-note')?.classList.add('calculation-error-note');
  clearPlot('integral-plot','⚠ Gráfico indisponível para este intervalo');
  setText('integral-note','⚠ '+message);
  setText('definite-result','⚠ Não foi possível calcular a integral');
  window.scheduleResultPanels?.();
}
function safe(action,output){try{action()}catch(e){if(output)setText(output,'Não foi possível calcular: '+e.message);else setText('global-error',e.message)}}
function analyze(){safe(()=>{setText('global-error','');const s=$('expression').value,f=compiled(s);let [type,domain,range]=detect(s);const q=quadratic(s);if(q){type='Função quadrática';domain='ℝ';range=q.a>0?'['+num(q.vy)+', +∞)':'(-∞, '+num(q.vy)+']';}setText('type',type);setText('domain',domain);setText('range',range);setText('f2',num(f(2)));setText('domain-note','Domínio e imagem automáticos são apenas classificados nos casos simples. Para funções compostas, racionais e casos gerais, verifique matematicamente as restrições; o gráfico é uma amostra, não uma prova.');$('values').replaceChildren();for(const x of [-3,-2,-1,0,1,2,3]){const tr=document.createElement('tr');for(const val of [x,num(f(x))]){const td=document.createElement('td');td.textContent=val;tr.append(td)}$('values').append(tr)}const px=Number.isFinite(graphX)?graphX:2;const xmin=Math.min(-6,Math.floor(px)-1),xmax=Math.max(6,Math.ceil(px)+1);const c=curve(f,xmin,xmax);const py=f(px);const traces=[trace(c,'f(x)','#60a5fa')];if(Number.isFinite(py))traces.push(handleTrace(px,py,'Ponto arrastável','#34d399'));if(q)traces.push({x:[q.vx],y:[q.vy],type:'scatter',mode:'markers',name:'Vértice',marker:{size:11,color:'#fbbf24'},hovertemplate:'Vértice (%{x:.3f}, %{y:.3f})<extra></extra>'});plot('graph',traces,{xaxis:{...layout().xaxis,range:[xmin,xmax]}});setText('graph-point',`x = ${num(px)}   ·   f(x) = ${num(py)}`);setText('status','Função analisada. Explore os outros módulos abaixo.');},'global-error')}
function limit(){safe(()=>{const s=$('limit-expression').value,f=compiled(s),a=Number($('limit-point').value.replace(',','.'));if(!Number.isFinite(a))throw Error('Informe um ponto numérico válido.');const scale=Math.max(1,Math.abs(a)),hs=[1e-2,1e-3,1e-4,1e-5].map(k=>k*scale);const left=hs.map(h=>f(a-h)),right=hs.map(h=>f(a+h));const L=left.at(-1),R=right.at(-1);let result,explanation;const close=Number.isFinite(L)&&Number.isFinite(R)&&Math.abs(L-R)<Math.max(.002,Math.abs(L)*.002);const huge=(!Number.isFinite(L)||Math.abs(L)>1e4)&&(!Number.isFinite(R)||Math.abs(R)>1e4);const grows=side=>side.every(Number.isFinite)&&side.length>=3&&Math.abs(side.at(-1))>1e4&&Math.abs(side.at(-1))>Math.abs(side.at(-2))*3&&Math.abs(side.at(-2))>Math.abs(side.at(-3))*3;
const bothDiverge=grows(left)&&grows(right);
const sameInfinitySign=bothDiverge&&Math.sign(L)===Math.sign(R);
if(sameInfinitySign){result=L>0?'+∞':'−∞';explanation='As aproximações de ambos os lados crescem em módulo sem estabilizar e têm o mesmo sinal. O resultado indica um limite infinito (estimativa numérica; confirme analiticamente).'}else if(bothDiverge){result='Limite não existe (infinitos opostos)';explanation='Os dois lados divergem com sinais opostos; não há limite bilateral.'}else if(close){result='≈ '+num((L+R)/2);explanation='Os valores calculados pela esquerda e pela direita se aproximam do mesmo número. Esta é uma estimativa numérica, não uma prova formal.'}else if(huge){result='Possível divergência / infinito';explanation='Os valores crescem muito ou deixam de ser finitos. Analise os limites laterais e o sinal antes de concluir.'}else if(Number.isFinite(L)&&Number.isFinite(R)&&
  Math.abs(L-R)>Math.max(.01,.01*Math.max(Math.abs(L),Math.abs(R)))&&
  Math.abs(left.at(-1)-left.at(-2))<Math.max(.002,.002*Math.abs(L))&&
  Math.abs(right.at(-1)-right.at(-2))<Math.max(.002,.002*Math.abs(R))){
  result='Limite não existe (laterais diferentes)';
  explanation='As estimativas laterais se estabilizam em valores diferentes; o limite bilateral não existe neste exemplo. Verifique analiticamente em casos gerais.';
}else{result='Não confirmado numericamente';explanation='As aproximações laterais não coincidem com a precisão adotada, ou a função oscila. Pode ser um limite inexistente ou um caso que exige análise algébrica.'}setText('limit-result',result);$('limit-explanation').textContent=`Esquerda: ${num(L)} · Direita: ${num(R)}. ${explanation} Valor no ponto: ${num(f(a))}.`;const view=2;const lc=curve(f,a-view,a+view,400);for(let i=0;i<lc.x.length;i++)if(Math.abs(lc.x[i]-a)<view*.004)lc.y[i]=null;const lt=[trace(lc,'f(x)','#60a5fa')];const handleY=Number.isFinite(f(a))?f(a):(Number.isFinite(L)&&Number.isFinite(R)?(L+R)/2:0);lt.push(handleTrace(a,Number.isFinite(f(a))?handleY:0,
  Number.isFinite(f(a))?'Arraste o ponto a':'Ponto a (guia no eixo x; f(a) indefinida)',
  Number.isFinite(f(a))?'#34d399':'#fbbf24'));if(close&&!bothDiverge&&(!Number.isFinite(f(a))||Math.abs(f(a)-(L+R)/2)>0.01))lt.push({x:[a],y:[(L+R)/2],type:'scatter',mode:'markers',name:'Ponto não definido',marker:{size:12,color:'#171717',line:{color:'#fbbf24',width:3}},hovertemplate:'Limite ≈ %{y:.4f}<extra></extra>'});if(!close&&!bothDiverge&&Number.isFinite(L)&&Number.isFinite(R)&&!Number.isFinite(f(a))){
  lt.push({x:[a,a],y:[L,R],type:'scatter',mode:'markers',name:'Extremos abertos (não definidos)',
    marker:{size:11,color:'#171717',line:{color:'#fbbf24',width:2}},
    hovertemplate:'Valor lateral ≈ %{y:.4f}<extra></extra>'});
}
plot('limit-plot',lt,{xaxis:{...layout().xaxis,range:[a-view,a+view]}})},'limit-result')}
function nerd(s){return normalize(s).replace(/\babs\(/g,'abs(')}
function deriv(showDefault=true){safe(()=>{const s=$('expression').value;compiled(s);const expr=nerd(s);const d=nerdamer.diff(expr,'x').toString();compiled(d);setText('derivative-result',`f′(x) = ${d}`);setText('derivative-explanation','A derivada foi obtida simbolicamente. Confira as seis regras e exemplos abaixo; para funções com descontinuidades, a derivada pode não existir em certos pontos.');const f=compiled(s),df=compiled(d);const tx=Number($('tangent-x')?.value||0);const ty=f(tx),m=df(tx);
const step=1e-5*Math.max(1,Math.abs(tx));
const ml=(ty-f(tx-step))/step,mr=(f(tx+step)-ty)/step;
const corner=Number.isFinite(ml)&&Number.isFinite(mr)&&Math.abs(ml-mr)>Math.max(0.05,0.02*Math.max(Math.abs(ml),Math.abs(mr)));
const traces=[trace(curve(f),'f(x)','#60a5fa'),trace(curve(df),'f′(x)','#fbbf24')];if(!corner&&Number.isFinite(ty)&&Number.isFinite(m)){traces.push({x:[tx-2,tx+2],y:[ty-2*m,ty+2*m],type:'scatter',mode:'lines',name:'Tangente',line:{color:'#34d399',dash:'dash',width:2}});traces.push(handleTrace(tx,ty,'Arraste a tangente','#34d399'));setText('tangent-value',`Em x = ${num(tx)}: inclinação = ${num(m)}`)}else if(corner){setText('tangent-value',`Em x = ${num(tx)}: derivada não existe (inclinações laterais ≈ ${num(ml)} e ${num(mr)}).`)}else{setText('tangent-value',`Em x = ${num(tx)}: derivada indisponível.`)}plot('derivative-plot',traces,{xaxis:{...layout().xaxis,range:[-6,6]}});},'derivative-result')}
function renderTangent(f,df,x){const y=f(x),m=df(x);if(!Number.isFinite(y)||!Number.isFinite(m))return;const w=2;Plotly.addTraces('derivative-plot',[{x:[x-w,x+w],y:[y-m*w,y+m*w],type:'scatter',mode:'lines',name:'Tangente',line:{color:'#34d399',dash:'dash',width:2}},{x:[x],y:[y],type:'scatter',mode:'markers',name:'Ponto móvel',marker:{color:'#34d399',size:12}}]);setText('tangent-value',`Em x = ${num(x)}: inclinação = ${num(m)}`)}
function integ(){safe(()=>{const s=$('expression').value;compiled(s);const I=nerdamer.integrate(nerd(s),'x').toString();if(/integrate\(/i.test(I))throw Error('Não foi encontrada uma primitiva simbólica elementar para esta expressão. Tente uma das seis regras demonstradas.');compiled(I);setText('integral-result',`F(x) = ${I} + C`);setText('integral-explanation','C representa qualquer constante. A derivada de F(x) deve recuperar f(x) nos intervalos em que as expressões são válidas.');},'integral-result')}
function simpson(f,a,b,n=1200){if(n%2)n++;const h=(b-a)/n;let sum=f(a)+f(b);if(!Number.isFinite(sum))throw Error('Extremos fora do domínio; escolha outro intervalo.');for(let i=1;i<n;i++){const v=f(a+i*h);if(!Number.isFinite(v))throw Error('A função é indefinida ou singular dentro do intervalo.');sum+=(i%2?4:2)*v}return sum*h/3}
function definite(){try{const f=compiled($('expression').value),a=Number($('lower').value.replace(',','.')),b=Number($('upper').value.replace(',','.'));if(!Number.isFinite(a)||!Number.isFinite(b)||Math.abs(b-a)>1000)throw Error('Use extremos numéricos válidos e intervalo de tamanho até 1000.');const result=simpson(f,a,b);
document.querySelector('#integrais .result-dashboard')?.classList.remove('calculation-error');
$('definite-result')?.classList.remove('calculation-error-text');
$('integral-note')?.classList.remove('calculation-error-note');
setText('definite-result',`∫ de ${num(a)} a ${num(b)} ≈ ${num(result)}`);setText('integral-note','Resultado numérico aproximado pela regra de Simpson. A integral é uma área com sinal: partes abaixo do eixo x contribuem negativamente.');const lo=Math.min(a,b),hi=Math.max(a,b),pad=Math.max(.6,(hi-lo)*.25),c=curve(f,lo-pad,hi+pad),sh=curve(f,lo,hi,220);plot('integral-plot',[trace(c,'f(x)','#60a5fa'),{...trace(sh,'Área com sinal','#c4b5fd'),fill:'tozeroy',fillcolor:'rgba(196,181,253,.24)'},handleTrace(a,f(a),'Arraste a','#34d399'),handleTrace(b,f(b),'Arraste b','#fbbf24')],{xaxis:{...layout().xaxis,range:[lo-pad,hi+pad]}});}catch(e){integralError('Não foi possível calcular: '+e.message)} }
function addExample(parent,title,expr,fn){const b=document.createElement('button');b.className='example';const strong=document.createElement('strong'),code=document.createElement('code');strong.textContent=title;code.textContent=expr;b.append(strong,code);b.onclick=fn;$(parent).append(b)}
function ruleCards(parent,cases,kind){for(const [name,expr,expected,why] of cases){const el=document.createElement('div');el.className='rule';const title=document.createElement('strong'),formula=document.createElement('code'),detail=document.createElement('p'),btn=document.createElement('button');title.textContent=name;formula.textContent=`${expr} → ${expected}${kind==='integral'?'+C':''}`;detail.textContent=why;btn.textContent='Testar este exemplo';btn.style.marginTop='12px';btn.onclick=()=>{$('expression').value=expr;analyze();if(kind==='integral')integ();else deriv();document.getElementById(kind==='integral'?'integrais':'derivadas').scrollIntoView({behavior:'smooth'});};el.append(title,formula,detail,btn);$(parent).append(el)}}
function startup(){if(!window.math||!window.nerdamer||!window.Plotly){setText('global-error','Bibliotecas não carregadas. Verifique a conexão com a internet e atualize a página.');return}for(const [name,expr] of functionCases)addExample('function-examples',name,expr,()=>{$('expression').value=expr;analyze();$('funcoes').scrollIntoView({behavior:'smooth'})});for(const [name,expr,point] of limitCases)addExample('limit-examples',name,`lim x→${point}: ${expr}`,()=>{$('limit-expression').value=expr;$('limit-point').value=point;limit()});ruleCards('derivative-rules',derivativeCases,'derivative');ruleCards('integral-rules',integralCases,'integral');$('apply').onclick=analyze;$('expression').addEventListener('keydown',e=>{if(e.key==='Enter')analyze()});$('limit-calc').onclick=limit;$('derive').onclick=deriv;$('integrate').onclick=integ;$('definite').onclick=definite;const slider=$('tangent-x');if(slider)slider.oninput=()=>deriv();installDrags();analyze();limit();deriv();integ();definite()}

// V3: marcadores arrastáveis em todos os módulos. A curva não é alterada:
// o ponto percorre a função e os resultados são recalculados.
let graphX=2;
const handleTrace=(x,y,name,color)=>({x:[x],y:[y],type:'scatter',mode:'markers',name,marker:{size:16,color,line:{color:'#ffffff',width:2},symbol:'circle'},hovertemplate:'Arraste • x=%{x:.3f}<br>y=%{y:.3f}<extra></extra>'});
function installDrags(){
  for(const [id,mode] of [['graph','function'],['limit-plot','limit'],['derivative-plot','derivative'],['integral-plot','integral']]){
    const el=$(id);let drag=null;
    const coords=e=>{
      const rect=el.getBoundingClientRect(),ax=el._fullLayout?.xaxis,ay=el._fullLayout?.yaxis;
      if(!ax||!ay)return null;
      const px=e.clientX-rect.left-ax._offset,py=e.clientY-rect.top-ay._offset;
      return {x:ax.p2l(px),y:ay.p2l(py),px,py,ax,ay};
    };
    const targets=()=>{
      try{
        if(mode==='function'){const f=compiled($('expression').value);return [{x:graphX,y:f(graphX),key:'p'}]}
        if(mode==='limit'){const a=Number($('limit-point').value.replace(',','.')),f=compiled($('limit-expression').value);const v=f(a);return [{x:a,y:Number.isFinite(v)?v:0,key:'a'}]}
        if(mode==='derivative'){const x=Number($('tangent-x').value),f=compiled($('expression').value);return [{x,y:f(x),key:'p'}]}
        const f=compiled($('expression').value);return ['lower','upper'].map(key=>{const x=Number($(key).value.replace(',','.'));return {x,y:f(x),key}});
      }catch{return []}
    };
    el.addEventListener('pointerdown',e=>{
      if(e.button!==0)return;
      const c=coords(e);if(!c)return;
      let best=null,dist=Infinity;
      for(const t of targets()){
        if(!Number.isFinite(t.x)||!Number.isFinite(t.y))continue;
        const d=Math.hypot(c.ax.l2p(t.x)-c.px,c.ay.l2p(t.y)-c.py);
        if(d<dist){best=t;dist=d}
      }
      if(dist>27)return; // fora do marcador: mantém pan e zoom normais
      drag={key:best.key};e.preventDefault();e.stopPropagation();el.setPointerCapture(e.pointerId);el.style.cursor='grabbing';
    },true);
    el.addEventListener('pointermove',e=>{
      if(!drag)return;
      const c=coords(e);if(!c||!Number.isFinite(c.x))return;
      const x=snap(Math.max(-1000,Math.min(1000,c.x)));
      try{
        if(mode==='function'){
          graphX=x;const f=compiled($('expression').value),y=f(x);
          setText('graph-point',`x = ${num(x)}   ·   f(x) = ${num(y)}`);
          if(Number.isFinite(y))Plotly.restyle(el,{x:[[x]],y:[[y]]},[1]);
        }else if(mode==='limit'){
          $('limit-point').value=num(x);
          const f=compiled($('limit-expression').value),y=f(x);
          setText('limit-result',`Ponto a = ${num(x)} (solte para calcular)`);
          const index=1;if(Number.isFinite(y))Plotly.restyle(el,{x:[[x]],y:[[y]]},[index]);
        }else if(mode==='derivative'){
          $('tangent-x').value=String(Math.max(-5,Math.min(5,x)));
          const tx=Number($('tangent-x').value),f=compiled($('expression').value),df=compiled(nerdamer.diff(nerd($('expression').value),'x').toString()),y=f(tx),m=df(tx);
          if(Number.isFinite(y)&&Number.isFinite(m)){
            setText('tangent-value',`Em x = ${num(tx)}: inclinação = ${num(m)}`);
            Plotly.restyle(el,{x:[[tx-2,tx+2]],y:[[y-2*m,y+2*m]]},[2]);
            Plotly.restyle(el,{x:[[tx]],y:[[y]]},[3]);
          }
        }else{
          $(drag.key).value=num(x);
          const f=compiled($('expression').value),y=f(x);
          if(Number.isFinite(y))Plotly.restyle(el,{x:[[x]],y:[[y]]},[drag.key==='lower'?2:3]);
          const a=Number($('lower').value),b=Number($('upper').value);
          try{setText('definite-result',`∫ de ${num(a)} a ${num(b)} ≈ ${num(simpson(f,a,b,120))}`)}catch{setText('definite-result','Intervalo inválido ou singular')}
        }
      }catch(err){/* mantém a última visualização válida durante o arraste */}
    },true);
    const finish=()=>{
      if(!drag)return;drag=null;el.style.cursor='';
      if(mode==='function')analyze();
      else if(mode==='limit')limit();
      else if(mode==='derivative')deriv();
      else definite();
    };
    el.addEventListener('pointerup',finish,true);
    el.addEventListener('pointercancel',finish,true);
    el.addEventListener('lostpointercapture',finish);
  }
}

window.addEventListener('load',startup);
