/* ---------- Manifest: add/adjust items here ---------- */
const COMPONENTS = [
  {name:'Button', file:'components/button.html', tags:['controls','ui']},
  {name:'Card', file:'components/card.html', tags:['layout','content']},
  {name:'Contact', file:'components/contact.html', tags:['forms','section']},
  {name:'Footer', file:'components/footer.html', tags:['layout']},
  {name:'Form', file:'components/form.html', tags:['forms','inputs']},
  {name:'Gallery', file:'components/gallery.html', tags:['media','grid']},
  {name:'Grid', file:'components/grid.html', tags:['layout','utility']},
  {name:'Hero', file:'components/hero.html', tags:['section','landing']},
  {name:'Icon Set', file:'components/iconset.html', tags:['icons','assets']},
  {name:'Modal', file:'components/modal.html', tags:['overlay','dialog']},
  {name:'Navbar', file:'components/nav.bar.html', tags:['navigation','header']},
  {name:'Project Card', file:'components/project-card.html', tags:['cards','projects']},
  {name:'Resume', file:'components/resume.html', tags:['section','cv']},
  {name:'Section', file:'components/section.html', tags:['content','layout']},
  {name:'Sidebar', file:'components/sidebar.html', tags:['navigation','layout']},
  {name:'Testimonial', file:'components/testimonial.html', tags:['content','social-proof']},
  {name:'Timeline', file:'components/timeline.html', tags:['content','chronology']},
  {name:'Typography', file:'components/typography.html', tags:['type','styleguide']},
];

/* ---------- Utilities ---------- */
const $ = (q, el = document) => el.querySelector(q);
const grid = $("#grid");
const tpl = $("#card-tpl");

/** Build a single card */
function makeCard({ name, file, tags = [] }) {
  const node = tpl.content.cloneNode(true);
  $(".title", node).textContent = name;

  const srcPath = `demos/${file}`;
  $(".preview", node).src = srcPath;

  const open = $(".open", node);
  open.href = srcPath;

  const src = $(".src", node);
  // raw view is useful when you want to see the exact HTML
  src.href = srcPath;

  const copyBtn = $(".copy", node);
  copyBtn.addEventListener("click", async () => {
    try {
      const res = await fetch(srcPath);
      const html = (await res.text()).trim();
      await navigator.clipboard.writeText(html);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy HTML"), 1200);
    } catch (err) {
      alert("Could not copy. See console.");
      console.error(err);
    }
  });

  // store searchable text
  const article = $("article.card", node);
  article.dataset.search = [name, ...tags, file].join(" ").toLowerCase();
  return node;
}

/** Render all (filtered) */
function render(filter = "") {
  grid.innerHTML = "";
  const q = filter.trim().toLowerCase();
  const list = COMPONENTS.filter(c =>
    !q || (c.name + " " + c.tags.join(" ") + " " + c.file).toLowerCase().includes(q)
  );
  if (!list.length) {
    grid.innerHTML = `<p style="grid-column:1/-1;color:var(--muted)">No results for "<strong>${filter}</strong>".</p>`;
    return;
    }
  list.forEach(item => grid.appendChild(makeCard(item)));
}

/* ---------- Search ---------- */
const search = $("#search");
search.addEventListener("input", () => render(search.value));

/* ---------- Init ---------- */
render();
