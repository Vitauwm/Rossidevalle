document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.getElementById("cart-btn");
    const cartPopup = document.getElementById("cart-popup");
    const closeCart = document.getElementById("close-cart");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    let cart = [];

    // Verifica se os botões de adicionar ao carrinho existem
    const addCartButtons = document.querySelectorAll(".add-cart");
    if (addCartButtons.length === 0) {
        console.error("Nenhum botão de 'Adicionar ao Carrinho' encontrado!");
    }

    addCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            const price = parseFloat(event.target.getAttribute("data-price"));

            if (!name || isNaN(price)) {
                console.error("Erro ao adicionar produto: Nome ou preço inválidos!", name, price);
                return;
            }

            console.log(`Produto Adicionado: ${name} - R$ ${price}`);

            cart.push({ name, price });
            updateCart();
        });
    });

    cartBtn.addEventListener("click", () => {
        cartPopup.style.display = "block";
    });

    closeCart.addEventListener("click", () => {
        cartPopup.style.display = "none";
    });

    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            cartItemsList.innerHTML += `
                <li>${item.name} - R$ ${item.price.toFixed(2)}
                    <button class="btn btn-sm btn-danger remove-item" data-index="${index}">X</button>
                </li>`;
        });

        cartTotal.innerText = total.toFixed(2);
        cartCount.innerText = cart.length;

        // Adiciona event listeners para os botões de remoção
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});
