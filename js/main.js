import { iniciarNavegacao } from './modules/navigation.js';
import { iniciarRoteador } from './router.js';

const fecharMenus = iniciarNavegacao();
iniciarRoteador({ fecharMenus });
