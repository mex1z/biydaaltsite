const getCart = () => JSON.parse(localStorage.getItem("technest_cart") || "[]");
const saveCart = (cart) => {
  localStorage.setItem("technest_cart", JSON.stringify(cart));
  updateCartCount();
};
function showToast(msg) {
  let box = document.getElementById("toast-box");
  if (!box) {
    box = document.createElement("div");
    box.id = "toast-box";
    document.body.appendChild(box);
  }
  const n = document.createElement("div");
  n.className = "alert alert-success shadow";
  n.textContent = msg;
  box.appendChild(n);
  setTimeout(() => n.remove(), 2200);
}
function addToCart(id, name, price, image, qty = 1) {
  const cart = getCart(),
    found = cart.find((x) => x.id === id);
  if (found) found.qty += qty;
  else cart.push({ id, name, price: Number(price), image, qty });
  saveCart(cart);
  showToast("Бүтээгдэхүүн сагсанд нэмэгдлээ");
}
function removeFromCart(id) {
  saveCart(getCart().filter((x) => x.id !== id));
  renderCart();
}
function updateQty(id, delta) {
  const cart = getCart(),
    item = cart.find((x) => x.id === id);
  if (item) item.qty += delta;
  saveCart(cart.filter((x) => x.qty > 0));
  renderCart();
}
function updateCartCount() {
  const count = getCart().reduce((s, x) => s + x.qty, 0),
    el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}
function productCard(p) {
  return `<div class="col-6 col-md-4 col-lg-3"><div class="card product-card h-100"><a href="product-detail.html?id=${encodeURIComponent(p.id)}"><img src="${p.image}" class="card-img-top" alt="${p.name}"></a><div class="card-body d-flex flex-column"><h6 class="card-title"><a class="text-decoration-none text-dark" href="product-detail.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h6><p class="text-muted small mb-2">${p.brand} · ${Object.values(p.specs)[2]}</p><div class="mt-auto"><span class="fw-bold text-primary">${p.price.toLocaleString("mn-MN")}₮</span><div class="d-flex gap-1 mt-2"><button class="btn btn-sm btn-primary flex-grow-1 add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}"><i class="bi bi-cart-plus"></i> Сагсанд</button><button class="btn btn-sm btn-outline-secondary add-to-wishlist" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}"><i class="bi bi-heart"></i></button></div></div></div></div></div>`;
}
function renderCategory(containerId, categoryKey) {
  const el = document.getElementById(containerId);
  if (el)
    el.innerHTML = PRODUCTS.filter((p) => p.category === categoryKey)
      .map(productCard)
      .join("");
}
function renderCart() {
  const body = document.getElementById("cart-body");
  if (!body) return;
  const cart = getCart();
  if (!cart.length) {
    body.innerHTML =
      '<div class="text-center p-5"><i class="bi bi-cart-x display-4 text-secondary"></i><p class="mt-3">Таны сагс хоосон байна.</p><a class="btn btn-primary" href="index.html">Худалдан авалт үргэлжлүүлэх</a></div>';
    const summary = document.getElementById("order-summary");
    if (summary) summary.innerHTML = "";
    return;
  }
  body.innerHTML = `<div class="table-responsive"><table class="table align-middle"><thead><tr><th>Бүтээгдэхүүн</th><th>Үнэ</th><th>Тоо</th><th>Дүн</th><th></th></tr></thead><tbody>${cart.map((x) => `<tr><td><img class="thumb me-2" src="${x.image}">${x.name}</td><td>${x.price.toLocaleString()}₮</td><td><button class="btn btn-sm btn-light qty-btn" data-id="${x.id}" data-delta="-1">−</button> ${x.qty} <button class="btn btn-sm btn-light qty-btn" data-id="${x.id}" data-delta="1">+</button></td><td>${(x.price * x.qty).toLocaleString()}₮</td><td><button class="btn btn-sm btn-outline-danger remove-cart" data-id="${x.id}"><i class="bi bi-trash"></i></button></td></tr>`).join("")}</tbody></table></div>`;
  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0),
    shipping = 20000;
  const summary = document.getElementById("order-summary");
  if (summary)
    summary.innerHTML = `<h5>Захиалгын дүн</h5><div class="d-flex justify-content-between py-2"><span>Барааны дүн</span><span>${subtotal.toLocaleString()}₮</span></div><div class="d-flex justify-content-between py-2"><span>Хүргэлт</span><span>${shipping.toLocaleString()}₮</span></div><hr><div class="d-flex justify-content-between fw-bold"><span>Нийт</span><span>${(subtotal + shipping).toLocaleString()}₮</span></div><a class="btn btn-primary w-100 mt-3" href="checkout.html">Худалдан авах</a>`;
}
function renderWishlist() {
  const el = document.getElementById("wishlist-grid");
  if (!el) return;
  const ids = JSON.parse(localStorage.getItem("technest_wishlist") || "[]");
  const items = PRODUCTS.filter((p) => ids.includes(p.id));
  el.innerHTML = items.length
    ? items.map(productCard).join("")
    : '<div class="col-12 text-center p-5 text-secondary">Хүслийн жагсаалт одоогоор хоосон байна.</div>';
}
function renderOrderHistory() {
  const el = document.getElementById("order-history");
  if (!el) return;
  const orders = [
    ["TN-2026-1042", "2026-10-18", "1,499,000₮", "Хүргэгдсэн"],
    ["TN-2026-0987", "2026-09-29", "689,000₮", "Хүргэгдсэн"],
    ["TN-2026-0831", "2026-08-12", "329,000₮", "Хүргэгдсэн"],
  ];
  el.innerHTML = `<table class="table"><thead><tr><th>Захиалгын дугаар</th><th>Огноо</th><th>Дүн</th><th>Төлөв</th></tr></thead><tbody>${orders.map((o) => `<tr>${o.map((v) => `<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
document.addEventListener("click", (e) => {
  const c = e.target.closest(".add-to-cart");
  if (c)
    addToCart(
      c.dataset.id,
      c.dataset.name,
      c.dataset.price,
      c.dataset.image,
      c.closest("#product-detail")
        ? Math.max(1, Number(document.getElementById("detail-qty")?.value || 1))
        : 1,
    );
  const w = e.target.closest(".add-to-wishlist");
  if (w) {
    const ids = JSON.parse(localStorage.getItem("technest_wishlist") || "[]"),
      i = ids.indexOf(w.dataset.id);
    if (i < 0) ids.push(w.dataset.id);
    else ids.splice(i, 1);
    localStorage.setItem("technest_wishlist", JSON.stringify(ids));
    showToast(
      i < 0 ? "Хүслийн жагсаалтад нэмлээ" : "Хүслийн жагсаалтаас хаслаа",
    );
    renderWishlist();
  }
  const q = e.target.closest(".qty-btn");
  if (q) updateQty(q.dataset.id, Number(q.dataset.delta));
  const r = e.target.closest(".remove-cart");
  if (r) removeFromCart(r.dataset.id);
});
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
  renderWishlist();
  renderOrderHistory();
  document
    .querySelectorAll("[data-render-category]")
    .forEach((el) => renderCategory(el.id, el.dataset.renderCategory));
  document
    .querySelectorAll("[data-render-featured]")
    .forEach(
      (el) => (el.innerHTML = PRODUCTS.slice(0, 8).map(productCard).join("")),
    );
  const search = document.getElementById("search-results");
  if (search) {
    const q = new URLSearchParams(location.search).get("q") || "";
    const found = PRODUCTS.filter((p) =>
      `${p.name} ${p.brand} ${p.description}`
        .toLowerCase()
        .includes(q.toLowerCase()),
    );
    document.getElementById("search-term").textContent = q;
    document.getElementById("search-count").textContent =
      `${found.length} бүтээгдэхүүн`;
    search.innerHTML = found.length
      ? found.map(productCard).join("")
      : '<div class="col-12 p-5 text-center text-secondary">Тохирох бүтээгдэхүүн олдсонгүй.</div>';
  }
  const detail = document.getElementById("product-detail");
  if (detail) {
    const id = new URLSearchParams(location.search).get("id"),
      p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
    detail.innerHTML = `<div class="col-md-6"><img class="product-photo" src="${p.image}" alt="${p.name}"></div><div class="col-md-6"><div class="text-warning">★★★★★ <span class="text-muted">${p.rating} / 5</span></div><h1 class="h2 mt-2">${p.name}</h1><p class="text-muted">${p.brand}</p><div class="h3 text-primary fw-bold">${p.price.toLocaleString()}₮</div><p>${p.description}</p><div class="d-flex align-items-center gap-2 my-3"><label for="detail-qty">Тоо ширхэг</label><input id="detail-qty" class="form-control" type="number" min="1" value="1" style="width:90px"></div><button class="btn btn-primary btn-lg add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}">Сагсанд нэмэх</button> <button class="btn btn-outline-secondary btn-lg add-to-wishlist" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}"><i class="bi bi-heart"></i></button><h5 class="mt-4">Техникийн үзүүлэлт</h5><table class="table">${Object.entries(
      p.specs,
    )
      .map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`)
      .join("")}</table></div>`;
    const related = document.getElementById("related-products");
    if (related)
      related.innerHTML = PRODUCTS.filter(
        (x) => x.category === p.category && x.id !== p.id,
      )
        .slice(0, 4)
        .map(productCard)
        .join("");
  }
  const applyFilters = () => {
    const grid = document.querySelector("[data-render-category]");
    if (!grid) return;
    const category = grid.dataset.renderCategory;
    const selected = [
      ...document.querySelectorAll(".filter-brand:checked"),
    ].map((x) => x.value);
    let list = PRODUCTS.filter(
      (x) =>
        x.category === category &&
        (!selected.length || selected.includes(x.brand)),
    );
    const max = Number(document.getElementById("max-price")?.value || 0);
    if (max) list = list.filter((x) => x.price <= max);
    grid.innerHTML = list.map(productCard).join("");
  };
  document
    .querySelectorAll(".filter-brand")
    .forEach((box) => box.addEventListener("change", applyFilters));
  document.getElementById("max-price")?.addEventListener("input", applyFilters);
  document.querySelectorAll("form[data-toast]").forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast(f.dataset.toast);
      f.reset();
    }),
  );
  const checkout = document.getElementById("checkout-form");
  if (checkout)
    checkout.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.setItem("technest_cart", "[]");
      location.href = "order-confirmation.html";
    });
  document.querySelectorAll("form[data-redirect]").forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      location.href = f.dataset.redirect;
    }),
  );
});
