import { projetos } from '../data/projetos.js';
import { renderizarProjetos } from '../modules/templates.js';

// Marcação fixa da view; não recebe valores do formulário nem trechos da URL.
export function criarProjetos() {
  const template = document.createElement('template');
  template.innerHTML = String.raw`
    <p><span class="selo">Propostas demonstrativas</span></p>
    <h1>Projetos de inclusão digital</h1>
    <p>Estas propostas são demonstrativas e fazem parte de uma organização fictícia. Não representam turmas, atendimentos ou inscrições reais.</p>
    <section class="grade projetos-grade" aria-labelledby="oficinas">
    </section>
  `;
  renderizarProjetos(template.content.querySelector('.projetos-grade'), projetos);
  return template.content;
}
