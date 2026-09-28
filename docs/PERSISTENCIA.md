# Persistência de demonstrações

`storage.js` concentra acesso ao `localStorage` na chave versionada `ohtmlt:cadastros:v1`. O valor é um array JSON de objetos com exatamente cinco strings: `nome` (até 100), `cpf` (14), `email` (254), `telefone` (14) e `cep` (9), não vazias. O formulário confere formatos antes de salvar; a recuperação verifica estrutura e limites, sem afirmar autenticidade ou existência dos dados.

`carregarCadastros` usa `getItem`, `JSON.parse` e validação da estrutura. Chave ausente retorna lista vazia. Erros não são apresentados como lista vazia normal. `salvarCadastro` relê a lista, acrescenta um registro e usa `JSON.stringify`/`setItem`. Leitura, conversão e escrita ficam em `try/catch`; resultados têm `ok` e `registros` ou uma mensagem. Não sobrescreve conteúdo inválido. O usuário pode apagá-lo explicitamente para recuperar a demonstração.

A view mostra uma lista com `textContent`; dados recuperados não viram HTML. `form.js` coordena salvamento, feedback e atualização. Evento `storage` atualiza a lista quando outra aba modifica a chave; os listeners são abortados ao sair da view. As operações são síncronas e não constituem transação entre abas: escritas simultâneas podem competir. Não é um banco de dados multiusuário.

“Apagar demonstrações salvas” usa confirmação nativa do navegador e `removeItem` somente na chave da aplicação. Cancelar preserva tudo; falha informa o problema; sucesso atualiza a lista e foca seu título. “Limpar campos” continua independente, com o modal já existente. Repetir um envio válido acrescenta outra demonstração; o formulário não é apagado automaticamente.

Use somente dados fictícios. A lista fica neste navegador/origem, sem backend, autenticação ou sincronização entre dispositivos. Pode ser removida pelas configurações do navegador ou pelo botão da aplicação. Não é armazenamento de credenciais nem cadastro real.

35 verificações no Chrome: chave ausente, gravação e recarga reais, dois registros, retorno de rota, cancelamento/exclusão restrita, sete conteúdos inválidos e proteção contra sobrescrita, HTML como texto, evento de armazenamento e quatro larguras. Quota e bloqueios foram simulados e restaurados. [Resultados](evidencias/etapa-8/navegador.json).
