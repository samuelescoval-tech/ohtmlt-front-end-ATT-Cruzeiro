// Marcação fixa da view; não recebe valores do formulário nem trechos da URL.
export function criarInicio() {
  const template = document.createElement('template');
  template.innerHTML = String.raw`
    <div class="grade apresentacao">
      <div class="col-6">
        <h1>Aprender tecnologia, ampliar possibilidades</h1>
        <p>A OHTMLT propõe um espaço de aprendizado digital para quem deseja dar os primeiros passos com computadores e com a criação de páginas para a web.</p>
      </div>
      <figure class="col-6">
        <img src="assets/imagens/inclusao-digital.svg" width="224" height="126" alt="Ilustração de duas pessoas aprendendo juntas diante de um computador.">
        <figcaption>Aprendizado digital com colaboração e troca de conhecimentos.</figcaption>
      </figure>
    </div>
    <div class="grade secoes-inicio">
      <section class="col-6" aria-labelledby="quem-somos">
        <h2 id="quem-somos">Quem somos</h2>
        <p>A Organização HTML para Todos é uma ONG fictícia criada para este projeto acadêmico. Sua missão proposta é tornar o aprendizado digital mais acessível, com linguagem clara e atividades práticas.</p>
        <p>O público da proposta inclui pessoas que estão começando a usar a tecnologia e voluntários interessados em compartilhar conhecimentos.</p>
      </section>
      <section class="col-6" aria-labelledby="como-participar">
        <h2 id="como-participar">Como participar</h2>
        <p>Conheça as propostas de oficinas e experimente o formulário de interesse com dados fictícios. Este site não oferece inscrições em atividades reais.</p>
        <ul class="acoes">
          <li><a class="botao botao--secundario" href="#projetos">Conhecer os projetos</a></li>
          <li><a class="botao" href="#cadastro">Experimentar o cadastro demonstrativo</a></li>
        </ul>
      </section>
    </div>
  `;
  return template.content;
}
