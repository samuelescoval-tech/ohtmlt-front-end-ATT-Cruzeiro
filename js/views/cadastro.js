// Marcação fixa da view; não recebe valores do formulário nem trechos da URL.
export function criarCadastro() {
  const template = document.createElement('template');
  template.innerHTML = String.raw`
    <div class="cadastro-conteudo">
      <h1>Cadastro demonstrativo de interessados</h1>
      <p id="aviso-demonstracao" class="aviso"><strong>Use somente dados fictícios.</strong> Este formulário é uma demonstração acadêmica: não realiza inscrições reais. As demonstrações ficam salvas somente neste navegador.</p>
      <p id="instrucao-envio">Todos os campos são obrigatórios. As mensagens junto aos campos orientam a correção. A verificação ocorre sem recarregar a página ou incluir dados na URL; não use informações pessoais reais. Ao sair desta tela, campos não salvos são descartados. A lista salva permanece nesta origem e não sincroniza entre navegadores ou dispositivos.</p>
      <section aria-labelledby="formulario">
        <h2 id="formulario">Preencha seus dados de demonstração</h2>
        <form id="form-cadastro" action="index.html#cadastro" method="get" autocomplete="off" aria-describedby="aviso-demonstracao instrucao-envio">
          <fieldset>
            <legend>Identificação</legend>
            <div class="grade campos">
              <p class="col-6">
                <label for="nome">Nome (obrigatório)</label>
                <input type="text" id="nome" name="nome" required maxlength="100" pattern=".*\S.*" inputmode="text" aria-describedby="ajuda-nome estado-nome" title="Digite um nome; somente espaços não são aceitos.">
                <small id="ajuda-nome">Digite um nome fictício. O campo não aceita somente espaços.</small>
                <span id="estado-nome" class="campo-status">
                  <small id="erro-nome" class="campo-feedback campo-feedback--erro"></small>
                  <small id="sucesso-nome" class="campo-feedback campo-feedback--sucesso">Formato aceito.</small>
                </span>
              </p>
              <p class="col-6">
                <label for="cpf">CPF (obrigatório)</label>
                <input type="text" id="cpf" name="cpf" required pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}" maxlength="14" inputmode="text" aria-describedby="ajuda-cpf estado-cpf" title="Use o formato 000.000.000-00.">
                <small id="ajuda-cpf">Formato: 000.000.000-00. Digite os pontos e o hífen. A verificação confere apenas o formato, não os dígitos verificadores nem a existência do CPF.</small>
                <span id="estado-cpf" class="campo-status">
                  <small id="erro-cpf" class="campo-feedback campo-feedback--erro"></small>
                  <small id="sucesso-cpf" class="campo-feedback campo-feedback--sucesso">Formato aceito.</small>
                </span>
              </p>
            </div>
          </fieldset>
          <fieldset>
            <legend>Contato e localização</legend>
            <div class="grade campos">
              <p class="col-12">
                <label for="email">E-mail (obrigatório)</label>
                <input type="email" id="email" name="email" required maxlength="254" inputmode="email" aria-describedby="ajuda-email estado-email">
                <small id="ajuda-email">Use um endereço fictício, como pessoa@example.com. A verificação não comprova que o endereço existe.</small>
                <span id="estado-email" class="campo-status">
                  <small id="erro-email" class="campo-feedback campo-feedback--erro"></small>
                  <small id="sucesso-email" class="campo-feedback campo-feedback--sucesso">Formato aceito.</small>
                </span>
              </p>
              <p class="col-6">
                <label for="telefone">Telefone celular (obrigatório)</label>
                <input type="tel" id="telefone" name="telefone" required pattern="\([0-9]{2}\)[0-9]{5}-[0-9]{4}" maxlength="14" inputmode="text" aria-describedby="ajuda-telefone estado-telefone" title="Use o formato (11)99999-9999, sem espaços.">
                <small id="ajuda-telefone">Formato: (11)99999-9999, sem espaços. Digite os parênteses e o hífen; a pontuação não é inserida automaticamente.</small>
                <span id="estado-telefone" class="campo-status">
                  <small id="erro-telefone" class="campo-feedback campo-feedback--erro"></small>
                  <small id="sucesso-telefone" class="campo-feedback campo-feedback--sucesso">Formato aceito.</small>
                </span>
              </p>
              <p class="col-6">
                <label for="cep">CEP (obrigatório)</label>
                <input type="text" id="cep" name="cep" required pattern="[0-9]{5}-[0-9]{3}" maxlength="9" inputmode="text" aria-describedby="ajuda-cep estado-cep" title="Use o formato 00000-000.">
                <small id="ajuda-cep">Formato: 00000-000. Digite o hífen. Não há consulta de endereço.</small>
                <span id="estado-cep" class="campo-status">
                  <small id="erro-cep" class="campo-feedback campo-feedback--erro"></small>
                  <small id="sucesso-cep" class="campo-feedback campo-feedback--sucesso">Formato aceito.</small>
                </span>
              </p>
            </div>
          </fieldset>
          <div class="acoes">
            <button type="submit" class="botao">Salvar demonstração</button>
            <button type="button" id="abrir-limpeza" class="botao botao--secundario" aria-haspopup="dialog" aria-controls="modal-limpeza" aria-describedby="ajuda-limpeza" hidden disabled>Limpar campos</button>
          </div>
          <small id="ajuda-limpeza" hidden>A limpeza fica disponível quando algum campo está preenchido e pede sua confirmação.</small>
        </form>
        <div id="status-cadastro" role="status" aria-atomic="true"></div>
        <dialog id="modal-limpeza" class="modal" aria-labelledby="titulo-limpeza" aria-describedby="descricao-limpeza">
          <h2 id="titulo-limpeza">Limpar os campos?</h2>
          <p id="descricao-limpeza">Os valores digitados serão removidos deste formulário. Você poderá começar uma nova demonstração.</p>
          <div class="acoes">
            <button type="button" id="cancelar-limpeza" class="botao botao--secundario" autofocus>Cancelar e voltar</button>
            <button type="button" id="confirmar-limpeza" class="botao">Confirmar limpeza</button>
          </div>
        </dialog>
      </section>
      <section aria-labelledby="cadastros-salvos">
        <h2 id="cadastros-salvos" tabindex="-1">Demonstrações salvas neste navegador</h2>
        <div id="lista-cadastros"></div>
        <button type="button" id="apagar-cadastros" class="botao botao--secundario" disabled>Apagar demonstrações salvas</button>
        <div id="status-armazenamento" role="status" aria-atomic="true"></div>
      </section>
    </div>
  `;
  return template.content;
}
