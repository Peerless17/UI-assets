(function () {
  function registerComponent(tagName, path) {
    class RemoteComponent extends HTMLElement {
      connectedCallback() {
        if (this._loaded) return;
        this._loaded = true;

        fetch(path)
          .then(resp => {
            if (!resp.ok) throw new Error('Network response not ok: ' + resp.status);
            return resp.text();
          })
          .then(html => {
            this.innerHTML = html;
          })
          .catch(err => {
            console.error('Failed to load component:', path, err);
            this.innerHTML = `<div style="color:crimson">Failed to load component</div>`;
          });
      }
    }

    if (!customElements.get(tagName)) {
      customElements.define(tagName, RemoteComponent);
    }
  }

  registerComponent('app-sidebar', 'components/sidebar.html');
  registerComponent('image-enlarge', '/components/imageenlarge.html');
  registerComponent('mobile-sidebar', '/components/mobilesidebar.html');
})();
