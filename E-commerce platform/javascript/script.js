/* =========================
   CONTACT FORM VALIDATION
========================= */

const contactForm =
document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            const name =
            document.getElementById("name").value.trim();

            const email =
            document.getElementById("email").value.trim();

            const message =
            document.getElementById("message").value.trim();

            const formMessage =
            document.getElementById("formMessage");

            if(
                name === "" ||
                email === "" ||
                message === ""
            ){

                formMessage.style.color = "#ef4444";

                formMessage.textContent =
                "Please fill all fields.";

                return;
            }

            formMessage.style.color = "#22c55e";

            formMessage.textContent =
            "Message sent successfully!";

            contactForm.reset();

        }
    );

}
/* =========================
   SHOPPING CART
========================= */

// Get cart from local storage
let cart =
JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart buttons
const addToCartButtons =
document.querySelectorAll(".add-to-cart");

// Update cart count
function updateCartCount(){

    const cartCount =
    document.getElementById("cart-count");

    if(cartCount){
        cartCount.textContent = cart.length;
    }

}

// Save cart
function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

}

// Add item
addToCartButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const product = {

                id:
                button.dataset.id,

                name:
                button.dataset.name,

                price:
                Number(button.dataset.price)

            };

            cart.push(product);

            saveCart();

            alert(
                `${product.name} added to cart`
            );

        }
    );

});

// Initial count
updateCartCount();
/* =========================
   DISPLAY CART
========================= */

const cartItemsContainer =
document.getElementById("cart-items");

if(cartItemsContainer){

    let subtotal = 0;

    cartItemsContainer.innerHTML = "";

    cart.forEach((item,index)=>{

        subtotal += item.price;

        cartItemsContainer.innerHTML += `

        <div class="cart-item">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>₦${item.price.toLocaleString()}</p>

            </div>

            <button
                class="remove-btn"
                onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;
    });

    const shipping = 5000;

    const total = subtotal + shipping;

    document.getElementById(
        "subtotal"
    ).textContent =
    `₦${subtotal.toLocaleString()}`;

    document.getElementById(
        "total"
    ).textContent =
    `₦${total.toLocaleString()}`;

}
/* =========================
   REMOVE ITEM
========================= */

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();

}