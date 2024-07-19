document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Kopitiam Beans', img: '1.jpg', price: 65000 },
      { id: 2, name: 'Kopi-O Ping Beans', img: '2.jpg', price: 50000 },
      { id: 3, name: 'Coffe Latte Beans', img: '3.jpg', price: 70000 },
      { id: 4, name: 'Tea-O Beans', img: '4.jpg', price: 25000 },
      { id: 5, name: 'Tea-C Beans', img: '5.jpg', price: 20000 },
      { id: 6, name: 'Tea-C Ping Beans', img: '6.jpg', price: 35000 },
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
