let cart = [];

// Add events for each childs of the dad <listaCompras>
const listaCompras = document.querySelector(".Content-List-products");
listaCompras.addEventListener("click", (e) => {
  if (e.target.classList.contains("button-remove")) {
    const title = e.target.dataset.title;
    removeItemLista(title);
  }
});

// Configura inicialização dos cards
document.querySelectorAll(".card").forEach((card) => {
  const title = card.querySelector(".title__card-food h4").textContent;
  const price = parseFloat(
    card.querySelector(".price-card p").textContent.replace("$", "")
  );

  // Atualiza a UI inicialmente
  updateCardUI(card, title, price);
});

function addToCart(title, price) {
  // Percore cada item do container card e atribui o titulo encontrado
  const existingItem = cart.find((item) => item.title === title);

  // Caso exista, basta incrementar +1 na quantity da nossa Lista
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ title, price, quantity: 1 });
    // Se não, vamos criar novos valores com uma chave que tenha o titulo já definido, preço e quantidade iniciada com 1. (Como todos as div dentro do card foram adicionaodos eventos de click, logo essa ação, o titulo é adicionado o que foi clicado)
  }
  console.log(cart);
}

function updateCardUI(card, title, price) {
  // Pega o container do add cart
  const container = card.querySelector(".add-card");
  // atribui para a variavel o titulo que foi clicado
  const cartItem = cart.find((item) => item.title === title);

  // Limpa eventos anteriores para evitar duplicação
  container.replaceWith(container.cloneNode(true));
  const newContainer = card.querySelector(".add-card");

  // se ainda não tiver nada na lista cart[], apenas deixe como estar
  if (!cartItem) {
    newContainer.innerHTML = `
            <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart">
            <h3>Add to Cart</h3>
        `;
    newContainer.style.backgroundColor = "var(--Rose-50)";

    // Adiciona evento único
    newContainer.addEventListener("click", () => {
      addToCart(title, price);
      updateCardUI(card, title, price);
      atualizarListaCompras();
    });
  } else {
    // Caso tenha, atualiza para o novor html com a quantidade dinamica
    newContainer.innerHTML = `
            <div class="controls">
                <button class="decrement"><img src="assets/images/icon-decrement-quantity.svg" alt="Decrease">
                </button>
                <span class="quantity">${cartItem.quantity}</span>
                <button class="increment"><img src="assets/images/icon-increment-quantity.svg" alt="Increase">
                </button>
            </div>
        `;

    // Eventos para incremento/decremento
    newContainer.querySelector(".increment").addEventListener("click", (e) => {
      // Evitar que o evento vá para os outros elementos pai
      e.stopPropagation();
      cartItem.quantity++;
      // Ao adicionar, atualiza para exibir conteúdo atualizado
      updateCardUI(card, title, price);
      // Chama a função para atualizar a lista de compras final
      atualizarListaCompras();
    });

    newContainer.querySelector(".decrement").addEventListener("click", (e) => {
      e.stopPropagation();
      cartItem.quantity--;

      if (cartItem.quantity <= 0) {
        cart = cart.filter((item) => item.title !== title);
      }
      updateCardUI(card, title, price);
      atualizarListaCompras();
    });
    newContainer.style.backgroundColor = "var(--Red)";
  }
}

// Essa função é chamada no início
function atualizarListaCompras() {
  let totalQuantity = 0;
  // Variáveis constantes
  const elemento = document.querySelector(".design-empty");
  const orderFinal = document.getElementById("orderFinal");
  const messageCarbon = document.querySelector(".message-carbon");
  const containerPay = document.querySelector("#pay-content");
  const listaCompras = document.querySelector(".Content-List-products");
  const confirmButton = document.getElementById("bnt-confirm-order");

  orderFinal.style.visibility = "visible";
  elemento.style.display = "none";
  messageCarbon.style.display = "flex";
  confirmButton.style.display = "block";

  cart.forEach((item) => (totalQuantity += item.quantity));
  if (totalQuantity === 0) {
    elemento.style.display = "flex";
    orderFinal.style.visibility = "hidden";
    messageCarbon.style.display = "none";
    confirmButton.style.display = "none";
  }

  containerPay.querySelector("h2").textContent = `Your Cart (${totalQuantity})`;

  // Garante que não duplicação de elementos ao adicionar novos
  listaCompras.innerHTML = "";
  orderFinal.innerHTML = "";

  let orderTotal = 0;
  // Loop for each element in the List
  cart.forEach(function (item) {
    const valorTotal = item.quantity * item.price;
    orderTotal += valorTotal;
    const elementoitem = document.createElement("div");
    elementoitem.classList.add("List-produts");
    // Inner HTML
    elementoitem.innerHTML = `
     <h3 class="title-Pay-List">
        ${item.title}
     </h3>
     <p class="button-remove" data-title="${item.title}">X</p>

     <p class="quantity-product">
     ${item.quantity}x  
     </p>
     <p class="price-product">
      @ $${item.price.toFixed(2)}
     </p>

     <p class="total-product">
      $${valorTotal.toFixed(2)}
     </p>
     `;
    // End of the InnerHtml
    listaCompras.appendChild(elementoitem);
  }); // end of the List

  // InnerHTML for the OrderFinal
  const orderElement = document.createElement("div");
  orderElement.classList.add("content-order-Final");
  orderElement.innerHTML = `
    <p>Order Total</p>
    <h1>
      R$${orderTotal.toFixed(2)}
    </h1>
     `;
  orderFinal.appendChild(orderElement);

  return orderTotal;
} // End of the -> Function AtualizarElementosLista

// Função para encontrar o card pelo o titulo
function encontrarCardPorTitulo(title) {
  const cards = document.querySelectorAll(".card");
  for (const card of cards) {
    const titleInCard = card.querySelector(".title__card-food h4").textContent;
    if (titleInCard === title) {
      console.log(card);
      return card;
    }
  }
  return null;
}

// Função para encontrar a img pelo o titulo
function encontrarimgPorTitulo(title) {
  const cards = document.querySelectorAll(".card");
  for (const card of cards) {
    const titleInCard = card.querySelector(".title__card-food h4").textContent;
    if (titleInCard === title) {
      console.log(card);
      return card.querySelector("img").getAttribute("src");
    }
  }
  return null;
}

function removeItemLista(title) {
  cart = cart.filter((item) => item.title !== title);

  const card = encontrarCardPorTitulo(title);

  if (card) {
    const precoTexto = card.querySelector(".price-card p").textContent;
    const preco = parseFloat(precoTexto.replace("$", ""));
    updateCardUI(card, title, preco);
  }

  atualizarListaCompras();
}

// Function para confirmação do pedido
function confirmButton() {
  const cardConfirmed = document.getElementById("CardConfirmed");
  cardConfirmed.style.display = "block";

  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  // Title & subtitle InnerHTML
  const popUpConfirmed = document.createElement("div");
  popUpConfirmed.classList.add("style-cardPay");
  popUpConfirmed.innerHTML = `
    <img src="./assets/images/icon-order-confirmed.svg" alt="icon-order-confirmed ">
    <h2 class="title__pay">Order Confirmed</h2>
    <p>We hope you enjoy your food</p>
  `;

  cardConfirmed.appendChild(popUpConfirmed);

  cart.forEach((item) => {
    // List of products InnerHTML
    const ListProductsFinal = document.createElement("div");
    ListProductsFinal.classList.add("list-itens");
    ListProductsFinal.innerHTML = `
    <div class="img__food">
    <img src=${encontrarimgPorTitulo(item.title)} alt="img-food-${item.title}">
        </div>
        <h1 class="title-food-list">${item.title}</h1>
        <p class="quantity-food-list">${item.quantity}x</p>
        <p class="unity-quantity">@ $${item.price.toFixed(2)}</p>
        <h3 class="price-total">$${item.price.toFixed(2)}</h3>
        </div>
        // `;

    popUpConfirmed.appendChild(ListProductsFinal);
  });

  const PriceFinalValue = document.createElement("div");
  PriceFinalValue.classList.add("style-order-final");
  PriceFinalValue.innerHTML = `
        <h3>Order Total</h3>
        <h1>$${atualizarListaCompras().toFixed(2)}</h1>
        <div class="div-button">
        <button class="btn-start-new-order" onclick="resetCart()">
          Start New Order
        </button>
      </div>
  `;
  popUpConfirmed.appendChild(PriceFinalValue);
}

// Função para resetar a lista card
function resetCart() {
  cart = [];
  const cardConfirmed = document.getElementById("CardConfirmed");
  cardConfirmed.style.display = "none";
  atualizarListaCompras();
  document.querySelectorAll(".card").forEach((card) => {
    const title = card.querySelector(".title__card-food h4").textContent;
    const price = parseFloat(
      card.querySelector(".price-card p").textContent.replace("$", "")
    );

    // Atualiza a UI inicialmente
    updateCardUI(card, title, price);
  });
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
}

function fecharPopUp() {
  document.getElementById("overlay").style.display = "none";
  const cardConfirmed = document.getElementById("CardConfirmed");
  cardConfirmed.style.display = "none";
}
