function getCart(){

    return JSON.parse(localStorage.getItem("cart")) || [];

}



function saveCart(cart){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}




function addToCart(productName, price){

    let cart = getCart();


    let product = cart.find(
        item => item.name === productName
    );


    if(product){

        product.quantity++;

    }
    else{

        cart.push({

            name: productName,
            price: price,
            quantity: 1

        });

    }


    saveCart(cart);

    updateShopControls();

    loadCart();
    updateCartButton();

}






function increaseQuantity(productName){

    let cart = getCart();


    let product = cart.find(
        item => item.name === productName
    );


    if(product){

        product.quantity++;

    }


    saveCart(cart);

    updateShopControls();

    loadCart();
    updateCartButton();

}






function decreaseQuantity(productName){

    let cart = getCart();


    let product = cart.find(
        item => item.name === productName
    );


    if(product){

        product.quantity--;

    }


    cart = cart.filter(
        item => item.quantity > 0
    );


    saveCart(cart);


    updateShopControls();

    loadCart();
    updateCartButton();

}






function updateShopControls(){


    let cart = getCart();



    let products = {


        "Wooden Frame":{
            id:"wood-controls",
            price:25
        },


        "Metalic Frame":{
            id:"metal-controls",
            price:40
        },


        "Custom CNC Art":{
            id:"custom-controls",
            price:60
        },


        "Mini Name Tag":{
            id:"tag-controls",
            price:15
        }


    };





    for(let product in products){


        let box =
        document.getElementById(
            products[product].id
        );


        if(!box) continue;



        let item =
        cart.find(
            p=>p.name===product
        );



        if(item){


            box.innerHTML=`

            <div class="quantity-box">


            <button onclick="decreaseQuantity('${product}')">
            -
            </button>


            <span>
            ${item.quantity}
            </span>


            <button onclick="increaseQuantity('${product}')">
            +
            </button>


            </div>

            `;


        }

        else{


            box.innerHTML=`

            <button class="cart-btn"
            onclick="addToCart('${product}',${products[product].price})">

            Add To Cart

            </button>

            `;


        }


    }


}







function loadCart(){

    let container =
    document.getElementById("cart-items");

    if(!container) return;

    let cart = getCart();

    container.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item=>{

        subtotal += item.price * item.quantity;

        container.innerHTML +=`

        <div class="cart-item">

            <div>

                <h3>${item.name}</h3>

                <p>$${item.price}</p>

            </div>

            <div class="quantity-box">

                <button onclick="decreaseQuantity('${item.name}')">
                -
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity('${item.name}')">
                +
                </button>

            </div>

        </div>

        `;

    });

    let shipping = subtotal > 0 ? 5 : 0;
let total = subtotal + shipping;

    let subtotalElement =
    document.getElementById("cart-subtotal");

    let shippingElement =
    document.getElementById("cart-shipping");

    let totalElement =
    document.getElementById("cart-total");

    if(subtotalElement)
        subtotalElement.textContent =
        "$" + subtotal.toFixed(2);

    if(shippingElement)
    shippingElement.textContent =
    "$" + shipping.toFixed(2);

    if(totalElement)
        totalElement.textContent =
        "$" + total.toFixed(2);

}





window.onload = function() {

    loadCart();

    updateShopControls();

    loadCheckout();

    updateCartButton();

};

function loadCheckout() {

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutSubtotal =
        document.getElementById("checkout-subtotal");

    const checkoutShipping =
        document.getElementById("checkout-shipping");

    const checkoutTotal =
        document.getElementById("checkout-total");

    if (
        !checkoutItems ||
        !checkoutSubtotal ||
        !checkoutShipping ||
        !checkoutTotal
    ) return;

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;

    checkoutItems.innerHTML = "";

    cart.forEach(item => {

        let itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;

        checkoutItems.innerHTML += `

        <div class="checkout-item">

            <span>
                ${item.name} × ${item.quantity}
            </span>

            <span>
                $${itemTotal}
            </span>

        </div>

        `;

    });

    let shipping = subtotal > 0 ? 5 : 0;

    let total = subtotal + shipping;

    checkoutSubtotal.textContent =
        "$" + subtotal.toFixed(2);

    checkoutShipping.textContent =
        "$" + shipping.toFixed(2);

    checkoutTotal.textContent =
        "$" + total.toFixed(2);

}

document
.getElementById("place-order-btn")
?.addEventListener(
    "click",
    placeOrder
);

function placeOrder(){

    let name =
    document.getElementById("customer-name").value;


    let email =
    document.getElementById("customer-email").value;


    let phone =
    document.getElementById("customer-phone").value;


    let address =
    document.getElementById("customer-address").value;



    let cart = getCart();


    if(cart.length === 0){

        alert("Your cart is empty");
        return;

    }



    let products = "";


    let subtotal = 0;


    cart.forEach(item=>{

        products +=
        item.name + " x " + item.quantity + ", ";


        subtotal +=
        item.price * item.quantity;

    });



    let shipping =
    subtotal > 0 ? 5 : 0;


    let total =
    subtotal + shipping;



    let orderData = {


        name:name,

        email:email,

        phone:phone,

        address:address,

        products:products,

        total:"$" + total.toFixed(2)


    };



    fetch(
"https://script.google.com/macros/s/AKfycbx9S4rTwKUhak-DY0PsV35Nm60B2kAccJ_D6D9UYQeDbE4LOqSt5S9kfkkATqzZhaVE/exec",
{

method:"POST",

headers:{
    "Content-Type":"text/plain;charset=utf-8"
},

body:JSON.stringify(orderData)

})
    .then(response=>response.text())

    .then(data=>{


        alert("Order placed successfully!");


        localStorage.removeItem("cart");


        window.location.href="index.html";


    })

    .catch(error=>{


        alert("Something went wrong");

        console.log(error);


    });


}

document
.getElementById("place-order-btn")
?.addEventListener(
    "click",
    placeOrder
);

function updateCartButton(){

    let cart = getCart();

    let button =
    document.getElementById(
        "go-to-cart-btn"
    );

    if(!button) return;

    if(cart.length > 0){

        button.style.display =
        "block";

    }
    else{

        button.style.display =
        "none";

    }

}