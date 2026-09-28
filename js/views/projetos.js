// Marcação fixa da view; não recebe valores do formulário nem trechos da URL.
export function criarProjetos() {
  const template = document.createElement('template');
  template.innerHTML = String.raw`
    <p><span class="selo">Propostas demonstrativas</span></p>
    <h1>Projetos de inclusão digital</h1>
    <p>Estas propostas são demonstrativas e fazem parte de uma organização fictícia. Não representam turmas, atendimentos ou inscrições reais.</p>
    <section class="grade projetos-grade" aria-labelledby="oficinas">
      <h2 id="oficinas" class="col-12">Oficinas propostas</h2>
      <article class="projeto col-4" aria-labelledby="primeiros-passos">
        <img class="projeto__imagem" src="assets/imagens/inclusao-digital.svg" width="224" height="126" loading="lazy" alt="">
        <p><span class="selo">Iniciação digital</span></p>
        <h3 id="primeiros-passos" tabindex="-1">Primeiros passos digitais</h3>
        <p>Uma introdução ao uso do computador, à organização de arquivos e à navegação na internet, com atividades para quem está começando.</p>
        <p><strong>Público da proposta:</strong> pessoas com pouca experiência no uso de computadores.</p>
        <a href="#cadastro">Demonstrar interesse em primeiros passos digitais</a>
      </article>
      <article class="projeto col-4" aria-labelledby="html-para-todos">
        <img class="projeto__imagem" src="assets/imagens/inclusao-digital.svg" width="224" height="126" loading="lazy" alt="">
        <p><span class="selo">Criação de páginas</span></p>
        <h3 id="html-para-todos" tabindex="-1">HTML para todos</h3>
        <p>Uma proposta de oficina para construir uma primeira página com títulos, parágrafos, links e imagens, compreendendo a função de cada elemento.</p>
        <p><strong>Público da proposta:</strong> iniciantes interessados na criação de páginas para a web.</p>
        <a href="#cadastro">Demonstrar interesse em HTML para todos</a>
      </article>
      <article class="projeto col-4" aria-labelledby="aprender-em-rede">
        <img class="projeto__imagem" src="assets/imagens/inclusao-digital.svg" width="224" height="126" loading="lazy" alt="">
        <p><span class="selo">Colaboração</span></p>
        <h3 id="aprender-em-rede" tabindex="-1">Aprender em rede</h3>
        <p>Encontros propostos para trocar dúvidas e conhecimentos sobre tecnologia, com a colaboração de pessoas interessadas em atuar como voluntárias.</p>
        <p><strong>Público da proposta:</strong> aprendizes e voluntários que desejam compartilhar conhecimentos.</p>
        <a href="#cadastro">Demonstrar interesse em aprender em rede</a>
      </article>
    </section>
  `;
  return template.content;
}
