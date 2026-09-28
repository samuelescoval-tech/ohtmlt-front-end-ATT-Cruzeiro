# Otimização medida

O cadastro e seus módulos, incluindo Vue, eram importados mesmo no início e nos projetos. `router.js` agora importa a view e o formulário sob demanda. A distribuição Vue de produção, o SVG local, dimensões explícitas de imagens e `loading="lazy"` dos cards permanecem.

Medição em 28/09/2026, mesmo Chrome e servidor Python, cache HTTP desabilitado via CDP. Resource Timing somou o corpo decodificado dos recursos da origem, sem o documento principal:

| Tela inicial | Antes | Depois | Requisições antes/depois |
| --- | ---: | ---: | ---: |
| Início | 156.145 bytes | 28.913 bytes | 20 / 12 |
| Projetos | 156.145 bytes | 28.913 bytes | 20 / 12 |
| Cadastro | 155.058 bytes | 156.938 bytes | 19 / 19 |

Início e projetos reduziram aproximadamente 81,5% dos bytes medidos. O cadastro mantém seus recursos e acrescenta o tratamento do carregamento. A primeira entrada no cadastro precisa aguardar os módulos; a aplicação mostra “Carregando cadastro…” e `aria-busy`. Importações subsequentes no mesmo documento reutilizam os módulos. Não foram alegados ganho de tempo em rede real, nota Lighthouse ou Core Web Vitals. [Medições por recurso](evidencias/etapa-10/recursos.json).

Um contador de renderização impede que uma resposta atrasada sobrescreva uma navegação mais recente. Falhas mostram uma tela com opção de recarregar; o foco vai ao conteúdo e o estado ocupado é removido. Foram aprovados 11 casos: ausência de módulos desnecessários no início, carregamento sem reload, histórico, validação, link direto, doze ciclos, atraso deliberado, mudança de rota durante espera, falha de download e recuperação. [Relatório](evidencias/etapa-10/navegador.json).
