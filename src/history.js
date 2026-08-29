export class BrowserHistory {
  constructor(onPopState) {
    this.onPopState = onPopState;
    window.addEventListener('popstate', (event) => {
      this.onPopState?.(event.state || null);
    });
  }

  replace(entry) {
    const state = { ...entry };
    window.history.replaceState(state, '', state.url);
  }

  push(entry) {
    const state = { ...entry };
    window.history.pushState(state, '', state.url);
  }

  current() {
    return window.history.state || null;
  }
}
