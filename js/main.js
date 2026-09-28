import { projetos } from './data/projetos.js';
import { renderizarMenuProjetos } from './modules/templates.js';
import { iniciarNavegacao } from './modules/navigation.js';
import { iniciarRoteador } from './router.js';

renderizarMenuProjetos(document.querySelector('#submenu-oficinas'), projetos);
const fecharMenus = iniciarNavegacao();
iniciarRoteador({ fecharMenus });
