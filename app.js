document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle with SVG icons
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = moonIcon;
        themeToggleBtn.setAttribute('title', 'Activar tema oscuro');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = sunIcon;
        themeToggleBtn.setAttribute('title', 'Activar tema claro');
      }
    }
  }

  const savedTheme = localStorage.getItem('verni_legal_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const nextTheme = isLight ? 'dark' : 'light';
      localStorage.setItem('verni_legal_theme', nextTheme);
      applyTheme(nextTheme);
    });
  }

  // Back to top
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // TOC Active ScrollSpy
  const sections = document.querySelectorAll('.legal-section');
  const tocLinks = document.querySelectorAll('.toc-item a');

  function highlightTOC() {
    let index = sections.length;
    while (--index && window.scrollY + 140 < sections[index].offsetTop) {}

    tocLinks.forEach((link) => link.classList.remove('active'));
    if (sections[index]) {
      const activeId = sections[index].getAttribute('id');
      const activeLink = document.querySelector(`.toc-item a[href="#${activeId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }

  if (sections.length > 0 && tocLinks.length > 0) {
    highlightTOC();
    window.addEventListener('scroll', highlightTOC);
  }
});
