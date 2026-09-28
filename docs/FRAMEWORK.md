# Integração básica de Vue

Vue 3.5.43 controla somente o contêiner `#lista-cadastros`. Seu propósito é refletir o estado recuperado, salvo ou apagado em um componente reativo. `cadastros.js` usa `createApp`, `shallowRef` e funções de renderização `h`; `form.js` atualiza a lista e desmonta a aplicação Vue ao sair da view. Cards, roteamento, validação e armazenamento conservam seus módulos próprios.

A distribuição `vue.runtime.esm-browser.prod.js` está em `js/vendor/`, com versão no nome. É o runtime de produção sem compilador de templates, sem build e sem downloads externos durante o uso. Valores são filhos textuais de `h`, sem `innerHTML` ou `v-html`. O estado `null` deixa o contêiner vazio na falha de leitura; array vazio mostra a mensagem de primeira visita. Atualizações são agendadas pelo Vue e concluídas no próximo ciclo de microtarefas.

O pacote foi obtido do registro npm oficial e sua integridade SHA-512 foi conferida antes da extração. O runtime tem 111.433 bytes sem compressão. [Origem, versão e hashes](evidencias/framework/dependencia.json). A [licença MIT do Vue](../js/vendor/vue-LICENSE.txt) foi preservada; isso não define uma licença para o código autoral do projeto.

Referências oficiais: [uso sem build](https://vuejs.org/guide/quick-start), [distribuição de produção](https://vuejs.org/guide/best-practices/production-deployment) e [versão 3.5.43](https://github.com/vuejs/core/releases/tag/v3.5.43).

37 verificações no Chrome passaram, incluindo os casos de persistência, HTML como texto, atualização e desmontagem do componente. W3C do cadastro sem erros/avisos. [Relatório](evidencias/framework/navegador.json). A inclusão do runtime aumenta os recursos transferidos; o carregamento será medido na etapa de otimização.
