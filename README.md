# Laboratório Interativo de Cálculo Diferencial e Integral

Projeto acadêmico AP2 — Engenharia de Software — 2026.2.

## Problema e objetivo

Estudantes iniciantes encontram dificuldade em conectar expressões de cálculo a gráficos e interpretações. Esta aplicação oferece entrada de funções, gráficos, tabela de valores, aproximação numérica de limites, derivadas e integrais simbólicas e integrais definidas numéricas.

## Integrantes

- [Preencher com os nomes reais dos integrantes e a turma]

## Tecnologias

- HTML5, CSS3 e JavaScript (sem servidor ou banco de dados)
- Math.js 13.2.0: avaliação de expressões
- Nerdamer 1.1.13 (core, Algebra, Calculus): derivação e integração simbólicas
- Plotly.js 2.35.2: gráficos interativos

As bibliotecas são carregadas por CDN: **é necessária conexão com a internet** para abrir o aplicativo.

## Como executar

1. Baixe os arquivos do repositório.
2. Abra `index.html` em um navegador atualizado com acesso à internet. Se o navegador restringir recursos locais, use a extensão Live Server do VS Code ou execute `python -m http.server 8000` nesta pasta e acesse `http://localhost:8000`.
3. Digite uma expressão usando `x`, `*` para multiplicar e `^` para potências, por exemplo `x^2+3*x-5`.
4. Clique em **Analisar função** e role para os quatro módulos.
5. Em Limites, use os campos próprios. Em Derivadas e Integrais, os botões usam a função do topo.

## Arquitetura

- `index.html`: conteúdo semântico, entradas, saídas e seções.
- `style.css`: identidade visual, layout responsivo.
- `app.js`: validação, cálculo, regras demonstrativas, tabelas e gráficos.
- `TESTES.md`: casos de teste e resultados esperados.

Fluxo: entrada do usuário → análise sintática e validação de símbolos → cálculo (Math.js/Nerdamer/Simpson) → resultados e visualização (Plotly).

## Conteúdo matemático e interpretação

### Aula 1 — Funções

Oito exemplos clicáveis, cobrindo constante, afim, linear, quadrática, modular, exponencial, logarítmica e trigonométrica. O programa mostra o gráfico, uma tabela de entradas/saídas, `f(2)` e uma **classificação indicativa**. Domínio e imagem são exibidos apenas para casos simples; para expressões gerais, são marcados como dependentes da expressão ou não determinados. Isso evita apresentar inferências incorretas como exatas.

### Aula 2 — Limites

Calcula aproximações laterais com `a ± h`, para h decrescente, e exibe gráfico. Inclui exemplos: contínua `x^2+3*x-5` em 2 (limite 5); removível `(x^2-1)/(x-1)` em 1 (limite 2); laterais distintas `abs(x)/x` em 0 (limite inexistente); infinito `1/x^2` em 0 (tende a +∞). **Limites são estimativas numéricas, não provas simbólicas**; em casos oscilatórios, singularidades ou convergência lenta, o resultado pode ser inconclusivo.

### Aula 3 — Derivadas

Seis regras com exemplos executáveis: constante `5→0`; potência `x^4→4*x^3`; soma/subtração `x^3-2*x→3*x^2-2`; produto `x^2*sin(x)→2*x*sin(x)+x^2*cos(x)`; quociente `x/(x+1)→1/(x+1)^2`; cadeia `(2*x+1)^3→6*(2*x+1)^2`. A derivada mede a inclinação instantânea da função. A biblioteca produz a expressão derivada; o usuário deve considerar restrições de domínio e pontos não deriváveis.

### Aula 4 — Integrais

Seis regras com exemplos executáveis: constante `5→5*x+C`; potência `x^3→x^4/4+C`; soma/subtração `x^2-2*x→x^3/3-x^2+C`; exponencial `exp(x)→exp(x)+C`; trigonométrica `cos(x)→sin(x)+C`; substituição `2*x*cos(x^2)→sin(x^2)+C`. A integral indefinida é uma família de primitivas. A definida usa a regra numérica de Simpson para estimar a acumulação com sinal em um intervalo finito. Intervalos que incluem singularidades detectadas pela amostragem são rejeitados; singularidades entre amostras podem não ser detectadas.

## Limitações e tratamento de erros

- A expressão aceita símbolos e funções reconhecidos pela aplicação; não aceita literalmente toda função matemática imaginável.
- O sistema não determina domínio/imagem gerais nem demonstra limites simbolicamente.
- Nerdamer pode não encontrar primitivas elementares; o aplicativo mostra mensagem apropriada.
- A integral numérica é uma aproximação e **não deve ser utilizada para funções com singularidades internas**, mesmo quando a amostragem não detectá-las.
- As bibliotecas CDN exigem internet; entradas inválidas são sinalizadas.
- Expressões muito grandes, oscilações e descontinuidades podem comprometer a precisão numérica.

## Validação

Consulte `TESTES.md`. Antes de enviar, execute os testes no navegador, registre evidências (capturas de tela) e corrija qualquer falha. A documentação descreve resultados matemáticos esperados, não afirma que testes manuais foram executados.

## Registro de uso de IA (preencher e manter atualizado)

- **Ferramenta:** ChatGPT (OpenAI).
- **Objetivo:** planejar e implementar uma aplicação web acadêmica de cálculo com quatro módulos.
- **Prompt original do estudante:** "desenvolva tudo pra mim chat, dps vc me ensina como funciona pra eu passar pra professora" (após envio das aulas e das regras, e pedido de digitar funções livremente).
- **Resultado:** geração inicial dos arquivos HTML, CSS, JavaScript, documentação e casos de teste.
- **Ajustes e validação humana:** [Preencher após executar, revisar, compreender, corrigir e testar os resultados. Registrar novos prompts efetivamente usados.]

## GitHub e entrega

1. Crie um repositório e envie os arquivos.
2. Faça **commits reais, progressivos**, à medida que revisar e melhorar o código. Não invente histórico retroativo.
3. Adicione capturas reais do aplicativo em funcionamento ao README, se possível.
4. Complete integrantes, turma, testes e registro de IA.
5. Compartilhe o link do repositório público (ou acessível à professora) no Google Classroom.

**Prazos do documento:** Turma A: 03/12/2026; Turma B: 30/11/2026. Ao menos um integrante comparece para breve explicação; não há apresentação oral para a turma inteira.

## Interação direta — versão 3.0

Em cada gráfico, arraste o marcador colorido para modificar os parâmetros da análise. O resultado é atualizado enquanto o ponto se move e o gráfico é redesenhado ao soltar. Arrastar fora do marcador movimenta a visualização. O programa depende de acesso às bibliotecas externas (Math.js, Nerdamer, Plotly).

**Uso de IA:** esta versão foi gerada com auxílio do ChatGPT. O aluno deve testar manualmente no navegador, conferir os resultados e registrar ajustes e prompts efetivamente utilizados.


## Versão 3.3 — identidade visual
A interface utiliza um desenho original inspirado na organização de calculadoras matemáticas modernas, sem copiar logotipos ou elementos gráficos de terceiros. O ícone `favicon.svg` representa uma curva com ponto de análise. O enquadramento do gráfico de integrais foi refinado.


## Versão 3.4 — tema monocromático
A versão 3.4 adota preto, branco e tons de cinza. Mantém o mesmo `favicon.svg` da versão 3.3, bem como os quatro módulos e seus pontos interativos.


## Versão 3.5 — Idiomas
No topo, selecione Português, English ou Español. O navegador tenta lembrar a seleção. Expressões matemáticas continuam idênticas nos três idiomas. Os gráficos têm cores diferentes para facilitar a leitura. Algumas mensagens técnicas geradas diretamente pelas bibliotecas podem permanecer em inglês.


## Versão 3.6 — painéis de resultados
Abaixo de cada gráfico há cartões de resultados atualizados pelos cálculos e pontos interativos. As legendas acompanham o idioma selecionado. O resultado de limites é uma estimativa numérica e pode ser inconclusivo para algumas funções.

### Atualização automática (3.7)
Ao alterar expressões ou limites numéricos, aguarde cerca de 320 ms para o recálculo. Os botões continuam disponíveis. Expressões temporariamente incompletas não acionam novos gráficos.


### Novidade 3.8
Use o botão **Início** no cabeçalho para voltar à calculadora principal. O botão acompanha o idioma selecionado.


### Versão 3.9
Cabeçalho compacto com ícone de Início redesenhado.


### Novidade 4.0
O seletor de idiomas exibe bandeiras locais (SVG) e troca a bandeira conforme o idioma selecionado.
