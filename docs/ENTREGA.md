# Entrega e versionamento

Cada etapa foi construída em branch própria e integrada por pull request em `develop`, com commits semânticos, autorrevisão e evidências reais. `main` recebe o conjunto revisado pela branch `release/1.0.0`; depois da conferência do commit, a tag anotada `v1.0.0` identifica a primeira versão. Mudanças da release devem retornar a `develop`.

MAJOR identifica mudanças incompatíveis, MINOR funcionalidades compatíveis e PATCH correções. Não existe branch de hotfix demonstrativa: `hotfix/*` só será usada para uma correção urgente real após publicação.

## Publicação

A aplicação é estática, sem build. GitHub Pages pode publicar a raiz de uma branch; `.nojekyll` mantém os arquivos sem processamento Jekyll. A candidata pode ser verificada pela branch de release antes da troca da origem para `main`. Não é necessário domínio próprio, serviço pago ou backend. [Documentação oficial da publicação por branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Os caminhos de CSS, módulos e SVG são relativos, adequados à subpasta do repositório. As rotas usam hash, dispensando redirecionamento do servidor. Após publicar, conferir documento, módulos sob demanda, imagens, navegação, link direto do cadastro e persistência na origem HTTPS. Registros locais de desenvolvimento não migram para a origem publicada.

## Revisão da candidata

Conferir alterações e árvore de arquivos, links locais da documentação, arquivos JSON/PNG das evidências, recursos da aplicação e W3C das views. A validação final deve registrar o commit e hashes dos arquivos examinados. Só criar tag/release após conferir a versão integrada. A candidata foi publicada e verificada no endereço abaixo, sem alteração do código da aplicação durante a finalização documental.

A entrega na plataforma acadêmica continua sob responsabilidade do estudante. O repositório fornece código, documentação e evidências; não houve envio automático a portal acadêmico ou preenchimento de campos cujos limites e enunciados não foram disponibilizados.

## Resultado da publicação

[Demonstração HTTPS](https://samuelescoval-tech.github.io/ohtmlt-front-end-ATT-Cruzeiro/) · [execução da publicação verificada](https://github.com/samuelescoval-tech/ohtmlt-front-end-ATT-Cruzeiro/actions/runs/36498525065).

A candidata `ec72d89f80f964be4a58986d1bc05fcf55fde496` foi publicada com sucesso. Os 20 casos no endereço público passaram: views, referências acessíveis, layout em duas larguras, navegação sem recarga, oficina, validação, gravação e recuperação, cancelamento do modal, rota desconhecida e arquivos HTTP 200 com hashes iguais aos locais. [Relatório e hashes](evidencias/release/publicado.json). Dados fictícios foram removidos do perfil de teste ao final.

A origem de publicação definitiva é a raiz de `main`. Mudanças apenas em documentação na finalização não alteram os hashes da aplicação examinada. Tag e notas da [release v1.0.0](https://github.com/samuelescoval-tech/ohtmlt-front-end-ATT-Cruzeiro/releases/tag/v1.0.0) identificam o commit final da versão.
