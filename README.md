# OHTMLT — Organização HTML para Todos

Projeto acadêmico da disciplina **Desenvolvimento Front-End**, da **Universidade Cruzeiro do Sul**. A proposta é reconstruir uma aplicação de uma organização fictícia voltada à inclusão e ao aprendizado digital, com apresentação, divulgação de projetos e cadastro demonstrativo de interessados.

**Estado: em reconstrução.** A etapa 0 prepara a documentação inicial e o versionamento. Esta base contém a apresentação do projeto e as regras de arquivos ignorados pelo Git. Ainda não há páginas HTML, estilos CSS, módulos JavaScript ou aplicação executável.

O repositório remoto foi conferido e clonado vazio em **28/09/2026**. Não havia código anterior disponível nesta cópia para reaproveitar.

[Repositório no GitHub](https://github.com/samuelescoval-tech/ohtmlt-front-end-ATT-Cruzeiro)

## Estrutura versionada

```text
ohtmlt-front-end-ATT-Cruzeiro/
├── .gitignore
└── README.md
```

As pastas e os arquivos de código serão acrescentados quando a etapa correspondente começar. As regras do `.gitignore` antecipam arquivos temporários e locais; elas não indicam uso de Node.js, build ou variáveis de ambiente.

## Como abrir esta base

Na pasta do projeto, executar:

```bash
code .
git status
```

Também é possível abrir a pasta pelo menu **File > Open Folder** do VS Code. Por enquanto, o conteúdo disponível para consulta é a apresentação do projeto. As instruções de execução no navegador serão adicionadas após a criação e verificação das páginas.

## Fluxo de desenvolvimento

O projeto adota `main` para o bootstrap documental e as versões aprovadas, `develop` para integração e `feature/*` para cada etapa de implementação. Os commits devem descrever mudanças reais; as features serão revisadas em pull requests com destino a `develop`.

Nenhuma versão funcional ou release foi publicada. O histórico desta reconstrução começa nesta base documental.

## Próxima etapa e pendências

A próxima etapa de implementação é a **1**, na branch `feature/estrutura-html`: criar `index.html`, `projetos.html` e `cadastro.html`, com navegação estática, conteúdo semântico e formulário com validação nativa. Verificar as páginas e registrar os resultados reais antes da integração.

A exigência de framework na terceira experiência e os enunciados detalhados de acessibilidade, otimização e deploy na quarta experiência ainda precisam ser confirmados. Nenhuma dependência ou licença foi escolhida nesta etapa.
