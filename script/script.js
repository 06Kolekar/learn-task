// On Page Load, load the default form (Sign In or Sign Up)
window.addEventListener("load", function() {
    // Set the initial form to display
    const signinForm = document.getElementById("signin-form");
    const signupForm = document.getElementById("signup-form");

    // Default to show the Sign In form on page load
    signinForm.style.display = "block";
    signupForm.style.display = "none";  // Hide Sign Up form initially

    // If you want to show the Sign Up form by default, switch these values
    // signinForm.style.display = "none";
    // signupForm.style.display = "block";
});

// Toggle password visibility
function togglePassword(eyeOpen, eyeClose, passwordField) {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeOpen.style.display = "none";
        eyeClose.style.display = "block";
    } else {
        passwordField.type = "password";
        eyeOpen.style.display = "block";
        eyeClose.style.display = "none";
    }
}

// Sign In Password Toggle
document.getElementById("open-eye").addEventListener("click", function() {
    togglePassword(document.getElementById("open-eye"), document.getElementById("close-eye"), document.getElementById("loginPassword"));
});

document.getElementById("close-eye").addEventListener("click", function() {
    togglePassword(document.getElementById("open-eye"), document.getElementById("close-eye"), document.getElementById("loginPassword"));
});

// Sign Up Password Toggle
document.getElementById("s-open-eye").addEventListener("click", function() {
    togglePassword(document.getElementById("s-open-eye"), document.getElementById("s-close-eye"), document.getElementById("password"));
});

document.getElementById("s-close-eye").addEventListener("click", function() {
    togglePassword(document.getElementById("s-open-eye"), document.getElementById("s-close-eye"), document.getElementById("password"));
});

// Single Toggle Button Logic
const toggleFormBtn = document.getElementById("toggle-form-btn");
const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");

toggleFormBtn.addEventListener("click", function() {
    if (signinForm.style.display === "block") {
        signinForm.style.display = "none";
        signupForm.style.display = "block";
        toggleFormBtn.textContent = "Sign In";
    } else {
        signinForm.style.display = "block";
        signupForm.style.display = "none";
        toggleFormBtn.textContent = "Sign Up";
    }
});

// Close Buttons
document.getElementById("close-signin").addEventListener("click", function() {
    signinForm.style.display = "none";
});

document.getElementById("close-signup").addEventListener("click", function() {
    signupForm.style.display = "none";
});

// Switch Between Forms
document.getElementById("switch-to-signup").addEventListener("click", function(event) {
    event.preventDefault();
    signinForm.style.display = "none";
    signupForm.style.display = "block";
    toggleFormBtn.textContent = "Sign In";
});

document.getElementById("switch-to-signin").addEventListener("click", function(event) {
    event.preventDefault();
    signinForm.style.display = "block";
    signupForm.style.display = "none";
    toggleFormBtn.textContent = "Sign Up";
});

// Prevent Form Submission
document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Sign In Form Submitted");
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Sign Up Form Submitted");
});

// cart

document.addEventListener("DOMContentLoaded", function () {
    const cartOverlay = document.getElementById("cart-overlay");
    const cartItemsList = document.getElementById("cart-items");
    const cartBtn = document.getElementById("cart-btn");
    const cartCount = document.getElementById("cart-count");
    const closeCartBtn = document.getElementById("close-cart");
    const checkoutBtn = document.getElementById("checkout-btn");
    const addToCartButtons = document.querySelectorAll(".btn[data-name]");

    let cartItemCount = 0; // Track cart items count

    // Function to update cart count
    function updateCartCount() {
        cartCount.textContent = cartItemCount;
        cartCount.style.display = cartItemCount > 0 ? "inline-block" : "none"; // Hide if empty
    }

    // Function to add item to cart
    function addToCart(event) {
        event.preventDefault();
        const itemName = event.target.getAttribute("data-name");
        const itemPrice = event.target.closest(".card-body").querySelector(".fw-bold").innerText;

        // Check if item already exists
        let existingItem = [...cartItemsList.children].find(item => item.dataset.name === itemName);
        if (existingItem) {
            let quantityElem = existingItem.querySelector(".quantity");
            quantityElem.innerText = parseInt(quantityElem.innerText) + 1;
        } else {
            // Create new cart item
            const cartItem = document.createElement("li");
            cartItem.classList.add("fs-4", "mb-2", "d-flex", "justify-content-between", "align-items-center");
            cartItem.dataset.name = itemName;
            cartItem.innerHTML = `
                <span>${itemName} - ${itemPrice} (x <span class="quantity">1</span>)</span>
                <button class="btn btn-danger btn-sm remove-item">×</button>
            `;

            cartItemsList.appendChild(cartItem);

            // Attach remove event
            cartItem.querySelector(".remove-item").addEventListener("click", function () {
                cartItem.remove();
                cartItemCount--;
                updateCartCount();
            });
        }

        cartItemCount++;
        updateCartCount();
        cartOverlay.classList.add("active"); // Show cart
    }

    // Attach event listeners
    addToCartButtons.forEach(button => button.addEventListener("click", addToCart));
    cartBtn.addEventListener("click", () => cartOverlay.classList.add("active"));
    closeCartBtn.addEventListener("click", () => cartOverlay.classList.remove("active"));
    checkoutBtn.addEventListener("click", function () {
        if (cartItemCount === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Proceeding to checkout...");
            cartItemsList.innerHTML = "";
            cartItemCount = 0;
            updateCartCount();
            cartOverlay.classList.remove("active");
        }
    });

    updateCartCount(); // Hide cart count if empty
});
