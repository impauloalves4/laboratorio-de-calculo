# Registro de testes — Laboratório Interativo de Cálculo

Projeto AP2 — Engenharia de Software — 2026.2

## Como interpretar

**Conferido por captura de tela:** o estudante executou o exemplo no navegador e apresentou a tela com os resultados. **Pendente:** teste adicional ainda não confirmado nesta revisão. Os resultados são específicos dos casos listados e não garantem correção geral.

## Testes conferidos

| ID | Módulo | Procedimento | Resultado esperado | Evidência observada | Situação |
|---|---|---|---|---|---|
| F01 | Funções | Analisar `x^2+3*x-5` | `f(2)=5`; vértice `(-1,5; -7,25)`; imagem `[-7,25; +∞)` | Painel e gráfico exibiram esses valores | Conferido por captura de tela |
| F02 | Funções | Arrastar o ponto até `x=4` | `f(4)=23` | Ponto e painel atualizaram para `(4,23)` | Conferido por captura de tela |
| L01 | Limites | `sin(x)/x` com `a=0` | Limite `1`; função indefinida no ponto | Laterais `1`, limite `≈1` e f(0) indefinido | Conferido por captura de tela |
| D01 | Derivadas | Função principal `x^2`; clicar em derivar | `f'(x)=2*x` | Resultado `2*x` e gráfico correspondente | Conferido por captura de tela |
| D02 | Derivadas | Mover tangente até `x=2` | `f(2)=4`; `f'(2)=4` | Painel mostrou posição `2`, valor `4` e inclinação `4` | Conferido por captura de tela |
| I01 | Integrais | Integrar simbolicamente `x^2` | `F(x)=x^3/3+C` | Resultado `(1/3)*x^3+C` | Conferido por captura de tela |
| I02 | Integrais | Integral de `x^2` de `0` a `2` | `8/3 ≈ 2,666667` | Painel e gráfico mostraram `2,666667` e região preenchida | Conferido por captura de tela |

## Testes adicionais recomendados

| ID | Procedimento | Resultado matemático esperado | Situação |
|---|---|---|---|
| L02 | `abs(x)/x`, `a=0` | Limite bilateral não existe (`-1` à esquerda e `1` à direita) | Pendente nesta revisão |
| L03 | `1/x^2`, `a=0` | Diverge para `+∞` | Pendente nesta revisão |
| D03 | `abs(x)` em `x=0` | Não derivável no ponto | Pendente nesta revisão |
| I03 | `sin(x)` entre `0` e `2` | `1-cos(2) ≈ 1,416147` | Pendente nesta revisão |
| E01 | Digitar expressão inválida | Mensagem de erro clara, sem resultado matemático falso | Pendente nesta revisão |
| R01 | Abrir em tela pequena | Campos e gráficos utilizáveis, sem sobreposição relevante | Pendente nesta revisão |

## Evidências

Os testes conferidos foram documentados por capturas de tela compartilhadas durante a revisão. As sete capturas reais estão preparadas na pasta `evidencias/` deste pacote. Ao enviar a pasta ao GitHub, os links de imagens do README passarão a funcionar. Não considerar o envio concluído antes da confirmação no repositório.

## Conclusão

Os quatro módulos passaram nos testes matemáticos principais registrados acima. O sistema utiliza aproximações numéricas em limites e integrais definidas; resultados de casos especiais exigem cuidado e verificações complementares.
