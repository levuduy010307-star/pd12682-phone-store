/* admin-seo.js — bảng cấu hình SEO sản phẩm / SEO bài viết / SEO hệ thống / Facebook
   Chạy độc lập, không phụ thuộc app.js. Có thể lưu vào json-server (localhost:3000)
   hoặc lưu nháp vào localStorage khi mở bản tĩnh trên GitHub Pages. */
"use strict";

const API = "http://localhost:3000";
const LS_KEY = "pd_aseo_draft_v1";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => Number(n || 0).toLocaleString("vi-VN") + " ₫";
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nowISO = () => new Date().toISOString().slice(0, 19);

function slugify(s) {
  return String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70);
}

/* ---------- dữ liệu ---------- */
let DB = { seo: {}, facebook: {}, products: [], posts: [] };
let SERVER_OK = false;
let DRAFT = loadDraft();
const CUR = { sp: null, bv: null };

function loadDraft() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}") || {}; } catch { return {}; }
}
function saveDraft() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(DRAFT)); } catch { }
}
function mergeDraft() {
  if (DRAFT.seo) Object.assign(DB.seo, DRAFT.seo);
  if (DRAFT.facebook) Object.assign(DB.facebook, DRAFT.facebook);
  (DRAFT.products || []).forEach(x => {
    const p = DB.products.find(i => String(i.id) === String(x.id));
    if (p) p.seo = Object.assign({}, p.seo || {}, x.seo);
  });
  (DRAFT.posts || []).forEach(x => {
    const p = DB.posts.find(i => String(i.id) === String(x.id));
    if (p) p.seo = Object.assign({}, p.seo || {}, x.seo);
  });
}

async function getJSON(name) {
  try {
    const r = await fetch(API + "/" + name, { cache: "no-store" });
    if (r.ok) { SERVER_OK = true; return await r.json(); }
  } catch { }
  const r2 = await fetch("data/" + name + ".json", { cache: "no-store" });
  if (!r2.ok) throw new Error("Không đọc được data/" + name + ".json");
  return await r2.json();
}

async function loadAll() {
  const [seo, fb, products, posts] = await Promise.all([
    getJSON("seo").catch(() => ({})),
    getJSON("facebook").catch(() => ({})),
    getJSON("products").catch(() => []),
    getJSON("posts").catch(() => [])
  ]);
  DB.seo = seo || {};
  DB.facebook = fb || {};
  DB.products = Array.isArray(products) ? products : [];
  DB.posts = Array.isArray(posts) ? posts : [];
  mergeDraft();
  setConn();
}

function setConn() {
  const dot = $("#connDot"), txt = $("#connText"), note = $("#aseoNote");
  if (SERVER_OK) {
    dot.classList.add("ok");
    txt.textContent = "Đã kết nối json-server";
    note.classList.add("hidden");
  } else {
    dot.classList.add("off");
    txt.textContent = "Bản tĩnh — lưu tạm";
    note.classList.remove("hidden");
    note.innerHTML = '<b>Chế độ xem trước.</b> Trang đang mở bản tĩnh (GitHub Pages) nên không có server để ghi <code>db.json</code>. '
      + 'Thay đổi vẫn được lưu trong trình duyệt và hiện ngay ở phần xem trước. Muốn ghi thật: bấm <b>Xuất JSON</b> rồi chạy '
      + '<code>python apply-seo.py seo-export.json</code>, hoặc mở trang này qua <code>json-server --port 3000</code>.';
  }
}

/* ---------- lưu ---------- */
async function put(path, body, method = "PATCH") {
  const r = await fetch(API + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return r.json().catch(() => ({}));
}

async function saveSeoObject(patch) {
  Object.assign(DB.seo, patch, { updatedAt: nowISO() });
  DRAFT.seo = Object.assign({}, DRAFT.seo, patch, { updatedAt: DB.seo.updatedAt });
  saveDraft();
  if (!SERVER_OK) return "local";
  try { await put("/seo", DB.seo, "PUT"); return "server"; } catch { return "local"; }
}

async function saveFbObject(patch) {
  Object.assign(DB.facebook, patch, { updatedAt: nowISO() });
  DRAFT.facebook = Object.assign({}, DRAFT.facebook, patch, { updatedAt: DB.facebook.updatedAt });
  saveDraft();
  if (!SERVER_OK) return "local";
  try { await put("/facebook", DB.facebook, "PUT"); return "server"; } catch { return "local"; }
}

async function saveEntitySeo(kind, id, seo) {
  const list = kind === "sp" ? DB.products : DB.posts;
  const item = list.find(x => String(x.id) === String(id));
  if (!item) return "local";
  item.seo = Object.assign({}, item.seo || {}, seo);
  const bucket = kind === "sp" ? "products" : "posts";
  DRAFT[bucket] = DRAFT[bucket] || [];
  const hit = DRAFT[bucket].find(x => String(x.id) === String(id));
  if (hit) hit.seo = item.seo; else DRAFT[bucket].push({ id: String(id), seo: item.seo });
  saveDraft();
  if (!SERVER_OK) return "local";
  try {
    await put("/" + bucket + "/" + encodeURIComponent(id), { seo: item.seo });
    return "server";
  } catch { return "local"; }
}

function say(el, text, isErr) {
  if (!el) return;
  el.textContent = text;
  el.className = "message" + (isErr ? " error" : "");
}

/* ---------- tab ---------- */
function showTab(name) {
  const btn = $('.aseo-tab[data-tab="' + name + '"]');
  if (!btn) return false;
  $$(".aseo-tab").forEach(b => b.classList.toggle("active", b === btn));
  $$(".aseo-panel").forEach(p => p.classList.toggle("hidden", p.dataset.panel !== name));
  return true;
}

function initTabs() {
  $$(".aseo-tab").forEach(btn => {
    btn.onclick = () => {
      showTab(btn.dataset.tab);
      if (history.replaceState) history.replaceState(null, "", "#" + btn.dataset.tab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });
  const h = (location.hash || "").replace("#", "");
  if (h) showTab(h);
}

/* ---------- editor dùng chung cho sản phẩm & bài viết ---------- */
function editorMarkup(P, kind) {
  const isSp = kind === "sp";
  return `
  <div class="aseo-split">
    <aside class="aseo-list">
      <p class="aseo-list-head">${isSp ? "Danh sách sản phẩm" : "Danh sách bài viết"} <span id="${P}_count"></span></p>
      <div class="aseo-items" id="${P}_items"></div>
    </aside>
    <div class="aseo-form">
      <div class="aseo-form-head">
        <div class="afh-l">
          <div class="afh-thumb" id="${P}_thumb"></div>
          <div>
            <p class="eyebrow">ĐANG CẤU HÌNH</p>
            <h2 id="${P}_name">Chọn một mục ở cột bên trái</h2>
            <p class="muted" id="${P}_meta"></p>
          </div>
        </div>
        <div class="afh-r">
          <button class="btn small secondary" id="${P}_auto" type="button">Tạo tự động</button>
          <button class="btn small" id="${P}_save" type="button">Lưu cấu hình</button>
        </div>
      </div>

      <label>Tiêu đề SEO <span class="cnt" id="${P}_tCnt">0/60</span>
        <input id="${P}_title" maxlength="90" placeholder="${isSp ? "iPhone 16 Pro Max 256GB chính hãng — giá 32.990.000₫" : "Tiêu đề bài viết chuẩn SEO"}">
      </label>
      <label>Meta description <span class="cnt" id="${P}_dCnt">0/160</span>
        <textarea id="${P}_desc" rows="3" maxlength="220" placeholder="Mô tả 120–160 ký tự, có từ khoá chính và lợi ích."></textarea>
      </label>
      <div class="two">
        <label>Từ khoá (keywords)
          <input id="${P}_kw" placeholder="từ khoá 1, từ khoá 2, …">
        </label>
        <label>Slug (đường dẫn thân thiện)
          <input id="${P}_slug" placeholder="${isSp ? "iphone-16-pro-max-256gb" : "chon-dien-thoai-theo-ngan-sach"}">
        </label>
      </div>
      <label>Ảnh chia sẻ OG (URL)
        <input id="${P}_og" placeholder="https://…/img/og-cover.png">
      </label>
      <label class="check"><input type="checkbox" id="${P}_noindex"> <span>noindex — không cho Google lập chỉ mục trang này</span></label>
      <p class="message" id="${P}_msg"></p>

      <div class="aseo-preview">
        <div class="pv-col">
          <p class="pv-h">Kết quả tìm kiếm Google</p>
          <div class="serp">
            <p class="serp-url" id="${P}_serpUrl">—</p>
            <p class="serp-title" id="${P}_serpTitle">—</p>
            <p class="serp-desc" id="${P}_serpDesc">—</p>
          </div>
        </div>
        <div class="pv-col">
          <p class="pv-h">Chia sẻ lên Facebook</p>
          <div class="fbp">
            <div class="fbp-img" id="${P}_fbImg"></div>
            <div class="fbp-body">
              <p class="fbp-dom" id="${P}_fbDom">—</p>
              <p class="fbp-title" id="${P}_fbTitle">—</p>
              <p class="fbp-desc" id="${P}_fbDesc">—</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function initEditor(P, kind) {
  const wrap = $("#editor" + (kind === "sp" ? "Sp" : "Bv"));
  if (!wrap) return;
  wrap.innerHTML = editorMarkup(P, kind);

  const list = kind === "sp" ? DB.products : DB.posts;
  const searchIn = $("#" + P + "_search");
  const itemsBox = $("#" + P + "_items");
  const countEl = $("#" + P + "_count");
  const badge = $("#badge" + (kind === "sp" ? "Sp" : "Bv"));

  const label = it => kind === "sp" ? it.name : it.title;
  const sub = it => kind === "sp"
    ? (it.brand || "") + " · " + money(it.price)
    : (it.category || "") + " · " + (it.publishedAt || "").slice(0, 10);
  const thumb = it => kind === "sp" ? it.image : it.coverImage;

  function statusOf(it) {
    const s = it.seo || {};
    const t = (s.title || "").length, d = (s.description || "").length;
    if (!t || !d) return ["miss", "Thiếu"];
    if (t > 65 || d < 80 || d > 170) return ["warn", "Cần chỉnh"];
    return ["ok", "Đạt"];
  }

  function drawList() {
    const q = (searchIn.value || "").trim().toLowerCase();
    const rows = list.filter(it => !q || String(label(it) || "").toLowerCase().includes(q));
    countEl.textContent = rows.length + "/" + list.length;
    itemsBox.innerHTML = rows.map(it => {
      const st = statusOf(it);
      const on = String(it.id) === String(CUR[kind]);
      return `<button class="aseo-item${on ? " on" : ""}" data-id="${esc(it.id)}" type="button">
        <span class="ai-thumb">${thumb(it) ? `<img src="${esc(thumb(it))}" alt="">` : ""}</span>
        <span class="ai-body"><b>${esc(label(it))}</b><i>${esc(sub(it))}</i></span>
        <em class="st-${st[0]}">${st[1]}</em>
      </button>`;
    }).join("") || '<p class="muted pad">Không tìm thấy mục nào.</p>';
    itemsBox.querySelectorAll(".aseo-item").forEach(b => b.onclick = () => select(b.dataset.id));
    const done = list.filter(it => statusOf(it)[0] === "ok").length;
    if (badge) badge.textContent = done + "/" + list.length;
  }

  function select(id) {
    CUR[kind] = id;
    const it = list.find(x => String(x.id) === String(id));
    if (!it) return;
    const s = it.seo || {};
    $("#" + P + "_name").textContent = label(it);
    $("#" + P + "_meta").textContent = "Mã #" + it.id + " · " + sub(it);
    $("#" + P + "_thumb").innerHTML = thumb(it) ? `<img src="${esc(thumb(it))}" alt="">` : "";
    $("#" + P + "_title").value = s.title || "";
    $("#" + P + "_desc").value = s.description || "";
    $("#" + P + "_kw").value = s.keywords || "";
    $("#" + P + "_slug").value = s.slug || "";
    $("#" + P + "_og").value = s.ogImage || "";
    $("#" + P + "_noindex").checked = !!s.noindex;
    say($("#" + P + "_msg"), "");
    drawList();
    refreshPreview();
  }

  function refreshPreview() {
    const it = list.find(x => String(x.id) === String(CUR[kind]));
    if (!it) return;
    const t = $("#" + P + "_title").value.trim();
    const d = $("#" + P + "_desc").value.trim();
    const slug = $("#" + P + "_slug").value.trim();
    const og = $("#" + P + "_og").value.trim();
    const base = (DB.seo.canonicalBase || "https://levuduy010307-star.github.io/pd12682-phone-store/").replace(/\/?$/, "/");
    const fallbackTitle = label(it);
    const url = slug ? base + (kind === "sp" ? "san-pham/" : "bai-viet/") + slug
      : base + (kind === "sp" ? "product.html?id=" : "post.html?id=") + it.id;

    $("#" + P + "_tCnt").textContent = t.length + "/60";
    $("#" + P + "_tCnt").className = "cnt" + (t.length === 0 ? "" : t.length > 65 ? " bad" : t.length < 30 ? " warn" : " ok");
    $("#" + P + "_dCnt").textContent = d.length + "/160";
    $("#" + P + "_dCnt").className = "cnt" + (d.length === 0 ? "" : d.length > 170 ? " bad" : d.length < 80 ? " warn" : " ok");

    $("#" + P + "_serpUrl").textContent = url.replace(/^https?:\/\//, "").replace(/\//g, " › ");
    $("#" + P + "_serpTitle").textContent = t || fallbackTitle;
    $("#" + P + "_serpDesc").textContent = d || "Chưa có meta description — Google sẽ tự cắt đoạn đầu của trang, tỉ lệ click sẽ thấp hơn.";

    const img = og || thumb(it) || "";
    $("#" + P + "_fbImg").innerHTML = img ? `<img src="${esc(img)}" alt="">` : "";
    $("#" + P + "_fbDom").textContent = url.replace(/^https?:\/\//, "").split("/")[0].toUpperCase();
    $("#" + P + "_fbTitle").textContent = t || fallbackTitle;
    $("#" + P + "_fbDesc").textContent = d || (DB.facebook.shareText || "PD12682 — điện thoại chính hãng, giá tốt");
  }

  ["title", "desc", "slug", "og", "kw"].forEach(k => {
    const el = $("#" + P + "_" + k);
    if (el) el.addEventListener("input", refreshPreview);
  });

  $("#" + P + "_auto").onclick = () => {
    const it = list.find(x => String(x.id) === String(CUR[kind]));
    if (!it) return;
    if (kind === "sp") {
      const off = it.oldPrice && it.oldPrice > it.price ? Math.round((it.oldPrice - it.price) / it.oldPrice * 100) : 0;
      $("#" + P + "_title").value = `${it.name} chính hãng — ${money(it.price)} | PD12682`;
      $("#" + P + "_desc").value = `Mua ${it.name} chính hãng tại PD12682: giá ${money(it.price)}${off ? ` (giảm ${off}%)` : ""}, bảo hành 12 tháng, giao 2 giờ nội thành, trả góp 0%. Còn ${it.stock} máy.`.slice(0, 165);
      $("#" + P + "_kw").value = [it.name, it.brand, it.category, "giá tốt", "chính hãng", "pd12682"].filter(Boolean).join(", ");
      $("#" + P + "_slug").value = slugify(it.name);
      $("#" + P + "_og").value = it.image || DB.seo.ogImage || "";
    } else {
      $("#" + P + "_title").value = `${it.title} | PD12682`;
      $("#" + P + "_desc").value = (it.excerpt || it.title).slice(0, 165);
      $("#" + P + "_kw").value = (it.tags && it.tags.length ? it.tags : [it.category, "pd12682"]).filter(Boolean).join(", ");
      $("#" + P + "_slug").value = it.slug || slugify(it.title);
      $("#" + P + "_og").value = it.coverImage || DB.seo.ogImage || "";
    }
    refreshPreview();
    say($("#" + P + "_msg"), "Đã tạo tự động từ dữ liệu sản phẩm/bài viết. Kiểm tra lại rồi bấm Lưu cấu hình.");
  };

  $("#" + P + "_save").onclick = async () => {
    if (!CUR[kind]) { say($("#" + P + "_msg"), "Hãy chọn một mục ở cột bên trái trước.", true); return; }
    const seo = {
      title: $("#" + P + "_title").value.trim(),
      description: $("#" + P + "_desc").value.trim(),
      keywords: $("#" + P + "_kw").value.trim(),
      slug: $("#" + P + "_slug").value.trim() || slugify($("#" + P + "_title").value),
      ogImage: $("#" + P + "_og").value.trim(),
      noindex: $("#" + P + "_noindex").checked
    };
    if (!seo.title) { say($("#" + P + "_msg"), "Tiêu đề SEO không được để trống.", true); return; }
    const where = await saveEntitySeo(kind, CUR[kind], seo);
    say($("#" + P + "_msg"), where === "server"
      ? "Đã lưu vào db.json. Mở lại trang để thấy thẻ meta mới."
      : "Đã lưu nháp trong trình duyệt. Bấm Xuất JSON để ghi vào data/ và db.json.");
    drawList();
  };

  searchIn.addEventListener("input", drawList);
  drawList();
  if (list.length) select(list[0].id);
}

/* ---------- tab 3: hệ thống ---------- */
function initSystem() {
  const map = ["siteName", "titleTemplate", "homeTitle", "description", "keywords", "canonicalBase", "ogImage",
    "locale", "robots", "twitterCard", "googleAnalytics", "searchConsole", "organizationName", "phone", "email", "address"];
  map.forEach(k => {
    const el = $("#ht_" + k);
    if (el && DB.seo[k] != null) el.value = DB.seo[k];
  });
  $("#ht_sitemapEnabled").checked = DB.seo.sitemapEnabled !== false;

  const collect = () => ({
    siteName: $("#ht_siteName").value.trim(),
    titleTemplate: $("#ht_titleTemplate").value.trim(),
    homeTitle: $("#ht_homeTitle").value.trim(),
    description: $("#ht_description").value.trim(),
    keywords: $("#ht_keywords").value.trim(),
    canonicalBase: $("#ht_canonicalBase").value.trim(),
    ogImage: $("#ht_ogImage").value.trim(),
    locale: $("#ht_locale").value,
    robots: $("#ht_robots").value,
    twitterCard: $("#ht_twitterCard").value,
    googleAnalytics: $("#ht_googleAnalytics").value.trim(),
    searchConsole: $("#ht_searchConsole").value.trim(),
    sitemapEnabled: $("#ht_sitemapEnabled").checked,
    organizationName: $("#ht_organizationName").value.trim(),
    phone: $("#ht_phone").value.trim(),
    email: $("#ht_email").value.trim(),
    address: $("#ht_address").value.trim()
  });

  function score() {
    const v = collect();
    const checks = [
      ["Meta description 120–160 ký tự", v.description.length >= 120 && v.description.length <= 165, 15],
      ["Có từ khoá, tối thiểu 5 cụm", v.keywords.split(",").filter(x => x.trim()).length >= 5, 10],
      ["Mẫu tiêu đề có %s", v.titleTemplate.includes("%s"), 10],
      ["Canonical base là https và có / cuối", /^https:\/\/.+\/$/.test(v.canonicalBase), 15],
      ["Ảnh OG là https", /^https:\/\/.+\.(png|jpe?g|webp)$/i.test(v.ogImage), 10],
      ["Robots cho phép index", v.robots.startsWith("index"), 10],
      ["Sitemap đang bật", v.sitemapEnabled, 10],
      ["Đủ thông tin tổ chức (JSON-LD)", !!(v.organizationName && v.phone && v.email && v.address), 20]
    ];
    const total = checks.reduce((s, c) => s + (c[1] ? c[2] : 0), 0);
    $("#scoreNum").textContent = total;
    $("#scoreBar").style.width = total + "%";
    $("#scoreBar").className = total >= 80 ? "good" : total >= 50 ? "mid" : "low";
    $("#scoreList").innerHTML = checks.map(c =>
      `<li class="${c[1] ? "ok" : "no"}"><span>${c[1] ? "✓" : "✕"}</span>${esc(c[0])}<em>${c[2]}</em></li>`
    ).join("");
    $("#ht_dCnt").textContent = v.description.length + "/160";

    $("#metaPrev").textContent = [
      `<title>${v.homeTitle || v.siteName}</title>`,
      `<meta name="description" content="${v.description.slice(0, 70)}…">`,
      `<meta name="keywords" content="${v.keywords.slice(0, 50)}…">`,
      `<meta name="robots" content="${v.robots}">`,
      `<link rel="canonical" href="${v.canonicalBase}">`,
      `<meta property="og:site_name" content="${v.siteName}">`,
      `<meta property="og:locale" content="${v.locale}">`,
      `<meta property="og:image" content="${v.ogImage}">`,
      `<meta name="twitter:card" content="${v.twitterCard}">`,
      v.googleAnalytics ? `<script src="…gtag/js?id=${v.googleAnalytics}">` : `<!-- GA: chưa cấu hình -->`
    ].join("\n");
    return v;
  }

  ["ht_description", "ht_keywords", "ht_canonicalBase", "ht_ogImage", "ht_titleTemplate", "ht_homeTitle", "ht_siteName"]
    .forEach(id => { const el = $("#" + id); if (el) el.addEventListener("input", score); });
  ["ht_locale", "ht_robots", "ht_twitterCard", "ht_sitemapEnabled"].forEach(id => {
    const el = $("#" + id); if (el) el.addEventListener("change", score);
  });

  $("#htSave").onclick = async () => {
    const v = collect();
    const where = await saveSeoObject(v);
    say($("#htMsg"), where === "server"
      ? "Đã lưu vào db.json — tải lại trang chủ để thấy tiêu đề và meta mới."
      : "Đã lưu nháp trong trình duyệt. Bấm Xuất JSON để ghi thật vào data/seo.json.");
    score();
  };

  score();

  fetch("sitemap.xml", { cache: "no-store" }).then(r => r.ok ? r.text() : "").then(t => {
    const n = (t.match(/<loc>/g) || []).length;
    $("#fileSitemap").textContent = n ? n + " URL" : "chưa có";
  }).catch(() => { $("#fileSitemap").textContent = "chưa có"; });
  fetch("robots.txt", { cache: "no-store" }).then(r => r.ok ? r.text() : "").then(t => {
    $("#fileRobots").textContent = t ? "OK" : "chưa có";
  }).catch(() => { $("#fileRobots").textContent = "chưa có"; });
}

/* ---------- tab 4: facebook ---------- */
function initFacebook() {
  const keys = ["pageName", "pageId", "pageUrl", "messengerUsername", "appId", "pixelId", "domainVerification", "shareText"];
  keys.forEach(k => {
    const el = $("#fb_" + k);
    if (el && DB.facebook[k] != null) el.value = DB.facebook[k];
  });
  ["enableMessengerBubble", "enableShareButton", "enableCommentBox", "enablePixel"].forEach(k => {
    const el = $("#fb_" + k);
    if (el) el.checked = !!DB.facebook[k];
  });

  const collect = () => ({
    pageName: $("#fb_pageName").value.trim(),
    pageId: $("#fb_pageId").value.trim(),
    pageUrl: $("#fb_pageUrl").value.trim(),
    messengerUsername: $("#fb_messengerUsername").value.trim(),
    appId: $("#fb_appId").value.trim(),
    pixelId: $("#fb_pixelId").value.trim(),
    domainVerification: $("#fb_domainVerification").value.trim(),
    enableMessengerBubble: $("#fb_enableMessengerBubble").checked,
    enableShareButton: $("#fb_enableShareButton").checked,
    enableCommentBox: $("#fb_enableCommentBox").checked,
    enablePixel: $("#fb_enablePixel").checked,
    shareText: $("#fb_shareText").value.trim()
  });

  function refresh() {
    const v = collect();
    $("#demoBubble").classList.toggle("off", !v.enableMessengerBubble);
    $("#demoShare").classList.toggle("off", !v.enableShareButton);
    $("#demoComment").classList.toggle("off", !v.enableCommentBox);
    const on = [];
    if (v.enableMessengerBubble) on.push("bong bóng nhắn tin");
    if (v.enableShareButton) on.push("nút chia sẻ");
    if (v.enableCommentBox) on.push("khung bình luận");
    if (v.enablePixel && v.pixelId) on.push("Pixel");
    $("#demoState").textContent = on.length ? "Đang bật: " + on.join(", ") + "." : "Tất cả đang tắt — website sẽ không có yếu tố Facebook nào.";
    $("#fbPageLink").href = v.pageUrl || "https://www.facebook.com/";

    $("#fbMetaPrev").textContent = [
      `<meta property="fb:app_id" content="${v.appId || "(trống)"}">`,
      `<meta name="facebook-domain-verification" content="${v.domainVerification || "(trống)"}">`,
      `<meta property="og:site_name" content="${DB.seo.siteName || "PD12682"}">`,
      `<meta property="og:image" content="${DB.seo.ogImage || "…"}">`,
      v.enablePixel && v.pixelId ? `fbq('init', '${v.pixelId}'); fbq('track', 'PageView');` : `<!-- Pixel: ${v.enablePixel ? "bật nhưng thiếu Pixel ID" : "đang tắt"} -->`,
      `<!-- Messenger: ${v.enableMessengerBubble ? "bật" : "tắt"} · Share: ${v.enableShareButton ? "bật" : "tắt"} · Comment: ${v.enableCommentBox ? "bật" : "tắt"} -->`
    ].join("\n");
    return v;
  }

  ["fb_pageName", "fb_pageId", "fb_pageUrl", "fb_messengerUsername", "fb_appId", "fb_pixelId", "fb_domainVerification", "fb_shareText"]
    .forEach(id => { const el = $("#" + id); if (el) el.addEventListener("input", refresh); });
  ["fb_enableMessengerBubble", "fb_enableShareButton", "fb_enableCommentBox", "fb_enablePixel"]
    .forEach(id => { const el = $("#" + id); if (el) el.addEventListener("change", refresh); });

  $("#fbSave").onclick = async () => {
    const v = collect();
    if (v.enablePixel && !v.pixelId) {
      say($("#fbMsg"), "Bạn đã bật Pixel nhưng chưa nhập Pixel ID — Pixel sẽ không chạy.", true);
      return;
    }
    const where = await saveFbObject(v);
    say($("#fbMsg"), where === "server"
      ? "Đã lưu vào db.json — tải lại một trang bất kỳ để thấy nút và thẻ meta mới."
      : "Đã lưu nháp trong trình duyệt. Bấm Xuất JSON để ghi thật vào data/facebook.json.");
    refresh();
  };

  refresh();
}

/* ---------- xuất JSON ---------- */
function initExport() {
  $("#exportBtn").onclick = () => {
    const payload = {
      _note: "Chạy: python apply-seo.py seo-export.json  — để ghi vào data/seo.json, data/facebook.json và db.json",
      exportedAt: nowISO(),
      seo: DB.seo,
      facebook: DB.facebook,
      products: DB.products.map(p => ({ id: p.id, name: p.name, seo: p.seo || null })),
      posts: DB.posts.map(p => ({ id: p.id, title: p.title, seo: p.seo || null }))
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "seo-export.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    const note = $("#aseoNote");
    note.classList.remove("hidden");
    note.innerHTML = '<b>Đã tải seo-export.json.</b> Đặt file vào thư mục dự án rồi chạy <code>python apply-seo.py seo-export.json</code> '
      + 'để ghi vào <code>data/seo.json</code>, <code>data/facebook.json</code> và <code>db.json</code>. Sau đó commit và push như bình thường.';
  };
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", async () => {
  initTabs();
  initExport();
  await loadAll();
  initEditor("sp", "sp");
  initEditor("bv", "bv");
  initSystem();
  initFacebook();
});
