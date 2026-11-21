# Laboratório Interativo de Cálculo Diferencial e Integral

**Projeto acadêmico AP2 — Engenharia de Software — 2026.2**

**Integrante:** Paulo Ricardo Alves Nunes  
**Turma:** TURMA A

**Aplicação:** https://impauloalves4.github.io/laboratorio-de-calculo/index.html  
**Código-fonte:** https://github.com/impauloalves4/laboratorio-de-calculo

## 1\. Problema e objetivo

No início do estudo de Cálculo Diferencial e Integral, nem sempre é fácil relacionar expressões algébricas aos gráficos e aos resultados numéricos. O Laboratório Interativo de Cálculo foi desenvolvido para permitir que o estudante experimente funções, altere parâmetros e observe visualmente os conceitos estudados.

O objetivo é oferecer uma ferramenta educacional, executada no navegador, que reúna funções, limites, derivadas e integrais em uma interface simples, com explicações e gráficos interativos.

## 2\. Tecnologias utilizadas

* **HTML5:** estrutura e organização dos módulos.
* **CSS3:** identidade visual escura e layout responsivo.
* **JavaScript:** interação, validação das entradas e atualização dos resultados.
* **Math.js 13.2.0:** interpretação e avaliação de expressões matemáticas.
* **Nerdamer 1.1.13:** operações simbólicas, como derivação e integração.
* **Plotly.js 2.35.2:** visualização e interação com os gráficos.

A aplicação não exige servidor de aplicação ou banco de dados. As bibliotecas são carregadas pela internet; portanto, é necessária conexão para seu funcionamento completo.

## 3\. Como executar

**Pelo navegador:** acesse o link da aplicação informado no início deste documento.

**Localmente:** baixe os arquivos do repositório e abra `index.html` em um navegador atualizado, com acesso à internet. Se houver restrições à abertura local, utilize um servidor simples, como a extensão Live Server do VS Code ou `python -m http.server 8000` na pasta do projeto.

Na página inicial, digite uma função em termos de `x`, utilizando `\*` para multiplicação e `^` para potência. Exemplo: `x^2+3\*x-5`. Clique em **Analisar função** e navegue pelos módulos. O módulo de Limites possui campos próprios; Derivadas e Integrais usam a função informada na calculadora principal.

## 4\. Funcionalidades e fundamentos matemáticos

### 4.1 Funções

Apresenta o gráfico de `f(x)`, tabela de valores, avaliação em `x=2`, classificação indicativa e, quando possível, domínio e imagem. O ponto móvel permite explorar a relação entre entrada e saída. Há exemplos de funções constante, afim, linear, quadrática, modular, exponencial, logarítmica e trigonométrica.

### 4.2 Limites

Estima limites pela aproximação numérica à esquerda e à direita de um ponto. O gráfico auxilia na observação de continuidade, descontinuidades removíveis e comportamentos divergentes. O resultado é uma **estimativa numérica**, não uma demonstração matemática formal.

### 4.3 Derivadas

Calcula simbolicamente a derivada quando a biblioteca consegue processar a expressão. Mostra a função, a derivada e uma reta tangente móvel. A inclinação da tangente ajuda a interpretar crescimento, decrescimento e taxa de variação instantânea. Inclui exemplos das regras da constante, potência, soma, produto, quociente e cadeia.

### 4.4 Integrais

Apresenta uma primitiva simbólica, quando disponível, e calcula integrais definidas numericamente pela **regra de Simpson**. A região preenchida no gráfico representa a acumulação com sinal: trechos abaixo do eixo horizontal contribuem negativamente. Os limites de integração podem ser ajustados interativamente.

## 5\. Organização dos arquivos

* `index.html` — estrutura da página e dos módulos.
* `style.css` — aparência e adaptação da interface.
* `app.js` — cálculos, validações e gráficos.
* `panels.js` — painéis de resultados e atualizações interativas.
* `favicon.svg` — ícone da aplicação.
* `README.md` — documentação do projeto.
* `TESTES.md` — roteiro de verificação e resultados observados, a ser adicionado ao repositório.

**Fluxo geral:** entrada do usuário → validação e interpretação → cálculo matemático → atualização dos gráficos e painéis.

## 6\. Validação realizada no navegador

Durante a revisão da versão publicada, foram conferidos os seguintes casos por meio de capturas de tela:

|Módulo|Entrada|Resultado observado|
|-|-|-|
|Funções|`x^2+3\*x-5`|`f(2)=5`, vértice `(-1,5; -7,25)`, domínio real e imagem `\[-7,25; +∞)`|
|Funções — interação|ponto movido para `x=4`|`f(4)=23`, com atualização do gráfico e painel|
|Limites|`sin(x)/x`, aproximação em `0`|limite estimado `≈1`, laterais `1` e valor da função indefinido em `0`|
|Derivadas|`x^2`|derivada `2\*x`|
|Derivadas — interação|tangente em `x=2`|`f(2)=4` e inclinação `4`|
|Integral indefinida|`x^2`|`F(x)=(1/3)\*x^3+C`|
|Integral definida|`x^2`, intervalo `\[0,2]`|`≈2,666667`, com área preenchida|

Esses testes verificam exemplos representativos; **não garantem o funcionamento de todas as expressões possíveis**. O roteiro detalhado e testes adicionais estão previstos em `TESTES.md`.

## 7\. Limitações e tratamento de erros

* O programa reconhece um conjunto limitado de operadores e funções matemáticas.
* Domínio e imagem gerais não são determinados automaticamente para qualquer expressão.
* Limites são estimados numericamente; oscilações, singularidades e convergência lenta podem causar resultados inconclusivos.
* Algumas funções não possuem primitivas elementares encontradas pelo mecanismo simbólico.
* A regra de Simpson fornece aproximações e não deve ser considerada confiável em intervalos com singularidades internas; algumas singularidades podem não ser detectadas pela amostragem.
* Entradas inválidas são sinalizadas, e o carregamento das bibliotecas externas depende de internet.

## 8\. Uso de inteligência artificial e validação humana

**Ferramenta utilizada:** ChatGPT, da OpenAI.

**Finalidade:** apoio ao planejamento da aplicação, elaboração e revisão do código HTML/CSS/JavaScript, explicações matemáticas, documentação e elaboração de exemplos de teste.

**Orientação central fornecida durante o desenvolvimento:** criar uma aplicação web educacional para estudar funções, limites, derivadas e integrais por meio de expressões digitadas, gráficos e resultados numéricos ou simbólicos, com interface simples e interativa.

**Ajustes realizados durante o processo:** refinamento do tema visual escuro; inclusão de pontos móveis e painéis de resultados; publicação pelo GitHub Pages; retirada do seletor de idiomas; revisão da documentação.

**Validação humana:** o estudante executou exemplos no site publicado e compartilhou capturas de tela dos resultados. Foram conferidos os valores apresentados na seção 6, comparando-os aos resultados matemáticos esperados. Essa conferência não substitui testes exaustivos nem a compreensão dos conceitos envolvidos.

**Observação:** a descrição acima resume o processo conhecido. Caso a professora exija a transcrição literal dos prompts utilizados, eles devem ser recuperados do histórico real da conversa, sem inventar falas ou etapas.

## 9\. Entrega

O projeto está disponível em repositório público no GitHub e em página web acessível pelo navegador. Para a entrega, conferir as orientações mais recentes da disciplina, informar a turma e anexar o link solicitado no ambiente da faculdade.

**Prazos anotados na documentação anterior:** Turma A — 03/12/2026; Turma B — 30/11/2026. Confirmar no comunicado oficial da professora.

