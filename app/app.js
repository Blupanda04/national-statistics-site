// Router and wiring for IndoStats. Hash routes only — the site is static
// files, so every page is one HTML file plus this module: the route picks
// which template from views.js goes into #view, then the page's controls
// (table sorting, menu, search) are wired up.

import {
  renderHome, renderPopulation, renderEconomy, renderPrices,
  renderLabour, renderMethodology, renderSearch, setProvinceSort,
} from './views.js';

const view = document.getElementById('view');
const nav = document.getElementById('site-nav');
const menuButton = document.getElementById('menu-button');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const ROUTES = {
  '': renderHome,
  'penduduk': renderPopulation,
  'ekonomi': renderEconomy,
  'harga': renderPrices,
  'tenaga-kerja': renderLabour,
  'metodologi': renderMethodology,
};

function render() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [route, query] = hash.split('?q=');
  if (route === 'cari') {
    view.innerHTML = renderSearch(decodeURIComponent(query ?? ''));
  } else {
    const page = ROUTES[route] ?? renderHome;
    view.innerHTML = page();
  }
  document.querySelectorAll('.site-nav a').forEach((a) => {
    a.classList.toggle('active', (a.dataset.route ?? '') === route);
  });
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
  wirePage();
}

function wirePage() {
  // Province table sorting: clicking a column header re-sorts and
  // re-renders just that page.
  const table = document.getElementById('province-table');
  if (table) {
    table.querySelectorAll('th button').forEach((button) => {
      button.addEventListener('click', () => {
        setProvinceSort(button.dataset.sort);
        view.innerHTML = renderPopulation();
        wirePage();
      });
    });
  }
}

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const q = searchInput.value.trim();
  if (q) location.hash = `#/cari?q=${encodeURIComponent(q)}`;
});

window.addEventListener('hashchange', render);
render();
