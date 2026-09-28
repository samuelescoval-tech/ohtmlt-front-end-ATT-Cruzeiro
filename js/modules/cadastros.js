import { createApp, h, shallowRef } from '../vendor/vue-3.5.43.runtime.esm-browser.prod.js';

const rotulos = { cpf: 'CPF', email: 'E-mail', telefone: 'Telefone', cep: 'CEP' };

// Vue controla somente este contêiner; as demais views continuam independentes.
export function iniciarListaCadastros(container) {
  const registros = shallowRef(null);
  const app = createApp({
    name: 'ListaCadastros',
    setup() {
      return () => {
        if (registros.value === null) return null;
        if (!registros.value.length) return h('p', 'Nenhuma demonstração salva neste navegador.');
        return h('ul', { class: 'cadastros-salvos' }, registros.value.map((registro, indice) =>
          h('li', { key: indice }, [
            h('h3', registro.nome),
            h('dl', Object.entries(rotulos).flatMap(([campo, rotulo]) => [
              h('dt', rotulo), h('dd', registro[campo]),
            ])),
          ])));
      };
    },
  });
  app.mount(container);
  return {
    atualizar(novosRegistros) { registros.value = novosRegistros; },
    desmontar() { app.unmount(); },
  };
}
