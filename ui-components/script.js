/* ---------- Manifest: add/adjust items here ---------- */
const COMPONENTS = [
  // From resume-site
  { name: "Navbar", file: "nav.bar.html", tags: ["layout", "navigation", "resume-site"] },
  { name: "Button", file: "button.html", tags: ["controls", "resume-site"] },
  { name: "Card", file: "card.html", tags: ["content", "resume-site"] },

  // Suggested extras—create files under /demos when ready
  { name: "Footer", file: "footer.html", tags: ["layout", "resume-site-only"], optional: true },
  { name: "Hero", file: "hero.html", tags: ["section", "resume-site-only"], optional: true },
  { name: "Project Card", file: "project-card.html", tags: ["content", "resume-site"], optional: true },
  { name: "Contact Form", file: "contact.html", tags: ["forms", "resume-site"], optional: true },
  { name: "Timeline", file: "timeline.html", tags: ["content", "resume-site-only"], optional: true },
  { name: "Gallery", file: "gallery.html", tags: ["media", "resume-site-only"], optional: true },
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
