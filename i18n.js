
document.addEventListener("DOMContentLoaded", () => {
  const language = document.getElementById("language");
  if (!language) return;

  const translations = {
    en: {
      "Início": "Home",
      "Funções": "Functions",
      "Limites": "Limits",
      "Derivadas": "Derivatives",
      "Integrais": "Integrals",
      "Sobre": "About",
      "Idioma": "Language",
      "Explore o cálculo.": "Explore calculus.",
      "Entenda cada resultado.": "Understand every result.",
      "CALCULADORA INTERATIVA": "INTERACTIVE CALCULATOR",
      "4 módulos disponíveis": "4 modules available",
      "Expressão matemática f(x)": "Mathematical expression f(x)",
      "Analisar função": "Analyze function",
      "Resultado em destaque": "Highlighted result",
      "Atualização interativa": "Interactive update",
      "Posição x": "Position x",
      "Valor f(x)": "Value f(x)",
      "Tipo de função": "Function type",
      "Domínio": "Domain",
      "Imagem": "Range",
      "Ponto a": "Point a",
      "Pela esquerda": "From the left",
      "Pela direita": "From the right",
      "Limite estimado": "Estimated limit",
      "Calcular limite": "Calculate limit",
      "Derivar f(x) do topo": "Differentiate f(x) above",
      "Integrar f(x) do topo": "Integrate f(x) above",
      "Calcular integral definida": "Calculate definite integral",
      "Limite inferior": "Lower bound",
      "Limite superior": "Upper bound",
      "Integral definida": "Definite integral",
      "Sobre o laboratório": "About the laboratory",
      "DOCUMENTAÇÃO": "DOCUMENTATION",
      "Pronto para analisar.": "Ready to analyze.",
      "Função analisada. Explore os outros módulos abaixo.": "Function analyzed. Explore the other modules below."
    },
    es: {
      "Início": "Inicio",
      "Funções": "Funciones",
      "Limites": "Límites",
      "Derivadas": "Derivadas",
      "Integrais": "Integrales",
      "Sobre": "Acerca de",
      "Idioma": "Idioma",
      "Explore o cálculo.": "Explora el cálculo.",
      "Entenda cada resultado.": "Comprende cada resultado.",
      "CALCULADORA INTERATIVA": "CALCULADORA INTERACTIVA",
      "4 módulos disponíveis": "4 módulos disponibles",
      "Expressão matemática f(x)": "Expresión matemática f(x)",
      "Analisar função": "Analizar función",
      "Resultado em destaque": "Resultado destacado",
      "Atualização interativa": "Actualización interactiva",
      "Posição x": "Posición x",
      "Valor f(x)": "Valor f(x)",
      "Tipo de função": "Tipo de función",
      "Domínio": "Dominio",
      "Imagem": "Recorrido",
      "Ponto a": "Punto a",
      "Pela esquerda": "Por la izquierda",
      "Pela direita": "Por la derecha",
      "Limite estimado": "Límite estimado",
      "Calcular limite": "Calcular límite",
      "Derivar f(x) do topo": "Derivar f(x) de arriba",
      "Integrar f(x) do topo": "Integrar f(x) de arriba",
      "Calcular integral definida": "Calcular integral definida",
      "Limite inferior": "Límite inferior",
      "Limite superior": "Límite superior",
      "Integral definida": "Integral definida",
      "Sobre o laboratório": "Acerca del laboratorio",
      "DOCUMENTAÇÃO": "DOCUMENTACIÓN",
      "Pronto para analisar.": "Listo para analizar.",
      "Função analisada. Explore os outros módulos abaixo.": "Función analizada. Explora los otros módulos abajo."
    }
  };

  const elements = [...document.querySelectorAll(
    "h1, h2, h3, a, button, label, span, p, strong, .eyebrow"
  )];

  const original = new Map();
  elements.forEach(el => {
    if (el.children.length === 0) {
      original.set(el, el.textContent);
    }
  });

  function translate() {
    const dictionary = translations[language.value] || {};
    document.documentElement.lang =
      language.value === "en" ? "en" :
      language.value === "es" ? "es" : "pt-BR";

    original.forEach((text, element) => {
      const key = text.trim();
      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.textContent = dictionary[key];
      } else {
        element.textContent = text;
      }
    });
  }

  language.addEventListener("change", translate);
  translate();
});
