let cart = [];
let cartCount = 0;

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");

  if (body.getAttribute("data-theme") === "dark") {
    body.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  const themeToggle = document.querySelector(".theme-toggle");

  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  }
});

let currentSlide = 0;
const slides = document.querySelectorAll(".gallery-slide");

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(nextSlide, 2000);

function addToCart(name, price, image) {
  const button = event.target;
  button.classList.add("loading");
  button.textContent = "";

  setTimeout(() => {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1,
      });
    }

    cartCount++;
    updateCartUI();

    button.classList.remove("loading");
    button.textContent = "Додано! ✓";
    button.style.background = "#34d399";

    setTimeout(() => {
      button.textContent = "Додати в кошик";
      button.style.background = "";
    }, 1500);
  }, 800);
}

function updateCartUI() {
  document.getElementById("cartCount").textContent = cartCount;

  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Кошик порожній</p>';
    checkoutBtn.style.display = "none";
    totalPrice.textContent = "Загалом: ₴0";
    return;
  }

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
                    <div class="cart-item-image" style="background-image: url('${
                      item.image
                    }')"></div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">₴${item.price.toLocaleString()}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                `;
    cartItems.appendChild(cartItem);
  });

  totalPrice.textContent = `Загалом: ₴${total.toLocaleString()}`;
  checkoutBtn.style.display = "block";
}

function changeQuantity(index, change) {
  const item = cart[index];
  item.quantity += change;

  if (item.quantity <= 0) {
    cartCount -= cart[index].quantity;
    cart.splice(index, 1);
  } else {
    cartCount += change;
  }

  updateCartUI();
}

function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.querySelector(".cart-overlay");

  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

function showCheckout() {
  document.getElementById("checkoutForm").classList.add("active");
  document.getElementById("checkoutBtn").style.display = "none";
}

function completeOrder() {
  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;

  if (!name || !email) {
    alert("Будь ласка, заповніть всі поля");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  alert(
    `Дякуємо за замовлення, ${name}!\n\nВаше замовлення на суму ₴${total.toLocaleString()} прийнято.\nДеталі надіслано на ${email}`
  );

  cart = [];
  cartCount = 0;
  updateCartUI();
  toggleCart();

  document.getElementById("customerName").value = "";
  document.getElementById("customerEmail").value = "";
  document.getElementById("checkoutForm").classList.remove("active");
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    if (document.body.getAttribute("data-theme") === "dark") {
      header.style.background = "rgba(26, 26, 26, 0.95)";
    }
  } else {
    header.style.background = "rgba(255, 255, 255, 0.8)";
    if (document.body.getAttribute("data-theme") === "dark") {
      header.style.background = "rgba(26, 26, 26, 0.8)";
    }
  }
});
