// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
document.querySelector('#hamburger-menu').addEventListener('click', () => {
  navbarNav.classList.toggle('active');
});

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
document.querySelector('#search-button').addEventListener('click', (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
});

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').addEventListener('click', (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
});

// Menutup elemen saat klik diluar
document.addEventListener('click', function (e) {
  if (!document.querySelector('#hamburger-menu').contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
  if (!document.querySelector('#search-button').contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }
  if (!document.querySelector('#shopping-cart-button').contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  });
});

// Tombol Close pada modal
document.querySelector('.close-icon').addEventListener('click', (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
});

// Menutup modal saat klik diluar modal
window.addEventListener('click', (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
});

document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Kopitiam', img: '77.jpg', price: 17000 },
      { id: 2, name: 'Toast With Butter', img: '88.jpg', price: 12000 },
      { id: 3, name: 'Pisang Coklat', img: '99.png', price: 10000 },
      { id: 4, name: 'Mie Pok', img: '10.jpg', price: 16000 },
      { id: 5, name: 'Kopi-O Gao', img: '11.jpg', price: 17000 },
      { id: 6, name: 'Tea-C Peng', img: '12.jpg', price: 14000 },
      { id: 7, name: 'Kopitiam Beans', img: '1.jpg', price: 65000 },
      { id: 8, name: 'Kopi-O Peng Beans', img: '2.jpg', price: 50000 },
      { id: 9, name: 'Coffe Latte Beans', img: '3.jpg', price: 70000 },
      { id: 10, name: 'Tea-O Beans', img: '4.jpg', price: 25000 },
      { id: 11, name: 'Tea-C Beans', img: '5.jpg', price: 20000 },
      { id: 6, name: 'Tea-C Peng Beans', img: '6.jpg', price: 35000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const existingItem = this.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total += newItem.price;
      } else {
        this.items.push({
          ...newItem,
          quantity: 1,
          total: newItem.price,
        });
      }
      this.quantity++;
      this.total += newItem.price;
      console.log(this.total);
    },
    remove(itemToRemove) {
      const itemIndex = this.items.findIndex((item) => item.id === itemToRemove.id);
      if (itemIndex !== -1) {
        const item = this.items[itemIndex];
        this.total -= item.price;
        if (item.quantity > 1) {
          item.quantity--;
          item.total -= item.price;
        } else {
          this.items.splice(itemIndex, 1);
        }
        this.quantity--;
      }
    },
  });
});

//  Konversi Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
