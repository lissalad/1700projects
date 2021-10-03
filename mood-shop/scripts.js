import data from './data.js'

const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const addForm = document.getElementById('add-form');
const itemName = document.getElementById('item-name');
const itemPrice = document.getElementById('item-price');

const cart = [];/* const means we cannot assign a new array to it, but CAN update it! */

// ---------------------------------------------------------------------- //
itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name;
        const qty = parseInt(e.target.value);
        updateCart(name, qty)
    }
}
// ---------------------------------------------------------------------- //
itemList.onclick = function (e) {
    console.log("clicked list!")
    // console.log(e.target)
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name; // data-name="???"
        removeItem(name);
    }
    if (e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name; // data-name="???"
        addItem(name);
        showCart();
    }
    if (e.target && e.target.classList.contains('remove-one')) {
        const name = e.target.dataset.name; // data-name="???"
        removeItem(name,1);
    }
}
// ---------------------------------------------------------------------- //
addForm.onsubmit = function (e) {
    e.preventDefault();
    const name = itemName.value;
    const price = itemPrice.value;
    addItem(name,price);
}
// ---------------------------------------------------------------------- //
const itemsContainer = document.querySelector('#items');

for (let i = 0; i < data.length; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.className = 'item';
    const img = document.createElement('img');
    img.src = data[i].image;
    img.width = 300;
    img.height = 300;
    newDiv.appendChild(img);
    console.log(img)
    itemsContainer.appendChild(newDiv);

    const desc = document.createElement('P');
    desc.innerText = data[i].desc;
    const price = document.createElement('P');
    price.innerText = data[i].price;

    newDiv.appendChild(desc);
    newDiv.appendChild(price);

    const button = document.createElement('button');
    button.id = data[i].name;

    button.dataset.price = data[i].price;
    button.innerHTML = "Add to Cart";
    newDiv.appendChild(button);
}

// ---------------------------------------------------------------------- //
function addItem(name,price) {
    console.log('add item');
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty++;
            return
        }
    }
    const item = { name,price,qty: 1 };
    cart.push(item);
}
// ---------------------------------------------------------------------- //
function getQuantity() {
    let qty = 0;
    for (let i = 0; i < cart.length; i++) {
        qty += cart[i].qty;
    }
    return qty;
}
// ---------------------------------------------------------------------- //
function getTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty;
    }
    return total.toFixed(2);
}
// ---------------------------------------------------------------------- //
function removeItem(name,qty = 0) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (qty > 0)
                cart[i].qty -= qty;
            if (cart[i].qty < 1 || qty === 0) {
                // alert('hi')
                cart.splice(i,1);
            }
            showCart();
            return;
        }
    }
}
// ---------------------------------------------------------------------- //
function updateCart ( name, qty) {
    for ( let i = 0; i < cart.length; i++) {
        if(cart[i].name===name) {
            if(qty<1) {
                removeItem(name);
                return;
            }
            cart[i].qty = qty;
            showItems();
            return;
        }
    }
} 
// ---------------------------------------------------------------------- //

console.log('go');
const all_items_button = Array.from(document.querySelectorAll("button"));
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
}))

function showItems() {
    showCart();
}

function showCart() {
    const qty = getQuantity();
    // console.log(`You have ${qty} items in your cart.`);
    cartQty.innerHTML = `You have ${getQuantity()} items in your cart`;

    let itemStr = '';
    for (let i = 0; i < cart.length; i += 1) {
        const { name,price,qty } = cart[i];

        itemStr += `<li>
        ${name} $${price} x ${qty} = $${price * qty}
        <button class = "remove" data-name="${name}">Remove</button>
        <button class = "add-one" data-name="${name}"> + </button>
        <button class = "remove-one" data-name="${name}"> - </button>
        <input class="update" type="number" data-name="${name}">
        </li>`;
    }
    cartTotal.innerHTML = `Total in cart: $${getTotal()}`;

    itemList.innerHTML = itemStr;
    
}
// ---------------------------------------------------------------------- //
// addItem('Apple',0.99);
// addItem('Orange',1.29);
// addItem('Apple',0.99);
// addItem('Garbage', 40.56);

showItems();
showCart();

// removeItem('Garbage');
// showItems();

