import { createAppShell } from './ui.js';
import { OnionBrowser } from './browser.js';

const appRoot = document.getElementById('app');
const ui = createAppShell(appRoot);
const browser = new OnionBrowser(ui);

ui.addressInput.value = 'http://exampleabcdef1234567890abcdef1234567890abcdef1234567890abcdef.onion/';

void browser.start();
