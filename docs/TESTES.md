# Verificações da OHTMLT

## Etapa 1 — estrutura HTML

Data: **28/09/2026**. Branch de implementação: `feature/estrutura-html`. Ambiente: Linux, Python 3 (`http.server`), Chrome/154.0.8037.57 em modo headless, Node.js v22.22.1. Endereço testado: `http://127.0.0.1:5500/`.

A automação acionou o Chrome pelo Chrome DevTools Protocol usando um script temporário, sem instalar dependências no projeto. Os passos abaixo permitem repetir as verificações manualmente. A execução concluída consta no [relatório do navegador](evidencias/etapa-1/navegador.json), com data, 37 casos aprovados e hashes SHA-256 dos HTML testados. O script temporário não é distribuído como suíte de testes do projeto.

### HTML e recursos

Os documentos completos foram enviados por HTTP POST ao [W3C Nu HTML Checker](https://validator.w3.org/nu/) com o tipo `text/html; charset=utf-8`. As respostas JSON originais estão preservadas:

| Documento | Erros | Avisos | Resposta |
| --- | --- | --- | --- |
| `index.html` | 0 | 0 | [W3C — início](evidencias/etapa-1/w3c-index.json) |
| `projetos.html` | 0 | 0 | [W3C — projetos](evidencias/etapa-1/w3c-projetos.json) |
| `cadastro.html` | 0 | 0 | [W3C — cadastro](evidencias/etapa-1/w3c-cadastro.json) |

Todos os links e os recursos referenciados pelas páginas responderam HTTP 200. A imagem carregou e possui texto alternativo. O navegador não registrou exceções JavaScript nem recursos com falha durante os casos executados. Não há scripts da aplicação nesta etapa.

### Casos de navegação e formulário

| Passos para reproduzir | Esperado | Observado |
| --- | --- | --- |
| Abrir cada página e conferir idioma, título e estrutura. | `pt-BR`, título específico, um `h1`, um `main`, IDs únicos. | Aprovado nas três páginas. |
| Conferir o link atual da navegação em cada página. | Apenas um link com `aria-current="page"`, correspondente à página. | Aprovado nas três páginas. |
| Pressionar Tab e Enter no link “Pular para o conteúdo”. | Primeiro foco no link; Enter move o foco ao `main`. | Aprovado. |
| Acionar Projetos por Enter e seguir o link de um projeto. | Carregar Projetos e depois Cadastro. | Aprovado. |
| Conferir rótulos, grupos e descrições dos campos. | Cinco campos obrigatórios com `label` associado; descrições apontam para elementos existentes. | Aprovado. |
| Enviar o formulário vazio. | Navegador bloqueia o envio e foca o nome. | Aprovado; cinco campos com `valueMissing`. |
| Preencher nome apenas com espaços. | Formato rejeitado. | Aprovado: `patternMismatch`. |
| Preencher e-mail com `email-invalido`. | Formato rejeitado. | Aprovado: `typeMismatch`. |
| Usar telefone `00000000000`, CPF `00000000000` ou CEP `00000000`. | Rejeitar ausência da pontuação exigida. | Aprovado: `patternMismatch` nos três campos. |
| Clicar no rótulo CPF. | Focar seu campo. | Aprovado. |
| Preencher os valores fictícios abaixo. | Navegador aceita os formatos; nenhuma verificação de existência. | Aprovado. |
| Pressionar Enter com foco no CEP após preencher os valores válidos. | Envio GET para a mesma página, valores na URL e âncora do formulário. | Aprovado; sem persistência em `localStorage`. |
| Abrir as três páginas com viewport de 320 px. | Largura do documento não excede a largura útil da janela. | Aprovado após ajuste da imagem inicial. |

Valores utilizados no caso válido: nome `Pessoa Demonstração`, e-mail `pessoa@example.com`, telefone `(00)00000-0000`, CPF `000.000.000-00` e CEP `00000-000`. São dados fictícios para verificar formato. A aceitação de `000.000.000-00` confirma que esta etapa não valida dígitos verificadores do CPF.

### Problema observado e correção

**Imagem na tela estreita.** Na primeira verificação de 320 px, a largura do documento excedeu a janela. A imagem tinha largura HTML de 288 px, somada às margens nativas de 40 px do elemento `figure` e às margens do documento. Ajustaram-se os atributos da imagem para 224 × 126 px, preservando a proporção. O reteste não detectou rolagem horizontal em nenhuma das três páginas; `index.html` também foi reenviado ao W3C após a alteração, sem apontamentos.

**Ajustes da automação.** A primeira simulação de Enter não produziu o envio porque o evento de teclado estava sem o texto de retorno de carro (`\r`). A automação foi corrigida e o envio passou, sem alteração no formulário. Na inspeção das capturas, foi corrigida a largura de captura para incluir toda a janela, evitando corte de texto na evidência. Esses ajustes são do procedimento de teste, não falhas de JavaScript da aplicação.

### Capturas

- [Início em desktop](evidencias/etapa-1/index-desktop.png).
- [Projetos em desktop](evidencias/etapa-1/projetos-desktop.png).
- [Cadastro em desktop](evidencias/etapa-1/cadastro-desktop.png).
- [Validação nativa do formulário vazio](evidencias/etapa-1/cadastro-validacao-nativa.png).
- [Início com viewport de 320 px](evidencias/etapa-1/inicio-320px.png).

As capturas foram produzidas no navegador, com conteúdo integral da página. As janelas usadas foram 1280 × 900 e 320 × 900 px; a altura dos PNGs pode ser maior por incluir o conteúdo fora da área inicial.

### Limitações

Não foram executados testes em Firefox, Safari, dispositivos físicos, leitores de tela ou auditorias completas de acessibilidade. A checagem de largura não valida um layout responsivo com breakpoints, pois CSS ainda não foi implementado. Formatos válidos não comprovam existência dos dados. O envio nativo inclui valores na URL e não mantém cadastros; utilizar somente valores fictícios. SPA, máscaras, feedback personalizado, armazenamento, desempenho e deploy não fazem parte desta etapa.
