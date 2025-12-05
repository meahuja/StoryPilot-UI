class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        nav {
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          position: sticky;
          top: 0;
          z-index: 50;
        }
.nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .nav-link:hover {
          color: #4f46e5;
        }
        .nav-link.active {
          color: #4f46e5;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .mobile-hidden {
            display: none;
          }
        }
      </style>
      <nav class="py-4">
        <div class="nav-container flex justify-between items-center">
</div>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);