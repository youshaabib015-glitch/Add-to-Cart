let url = "https://fakestoreapi.com/products";
let card = document.getElementById("card-wrappers");
let showCartBtn = document.getElementById("showCart");
let Cartpanel = document.getElementById("Cartpanel");
let listCart = document.querySelector(".listCart");

async function getData() {
    let response = await fetch(url);
    let result = await response.json();
    let products = result;
    for (let product of products) {
        let div = document.createElement('div');
        let element = `
        <div class="row">
            <img src="${product.image}">
            <h2 style = "font-size: small">${product.title}</h2>
            <p>Price: $ ${product.price}</p>
            <button type="button" class="btn btn-primary mb-2 add">Add to Cart</button>
        </div>
        `
        div.innerHTML = element;
        card.appendChild(div);
        console.log(products);
    }

let addButtons = document.querySelectorAll(".add");
    addButtons.forEach(button => {
        button.addEventListener("click", function () {
            let productRow = button.parentElement;
            let title = productRow.querySelector("h2").innerText;
            let price = productRow.querySelector("p").innerText;
            let image = productRow.querySelector("img").src;

            let cartItem = document.createElement("div");
            cartItem.classList.add("item");
            let unitPrice = parseFloat(price.replace("Price: $","")); 
            cartItem.setAttribute("data-unitprice", unitPrice);
            cartItem.innerHTML = `
              <div class="image"><img src="${image}" height="50px"></div>
              <div class="name">${title}</div>
              <div class="totalPrice">${price}</div>
              <div class="quantity">
                <span class="minus"><</span>
                <span>1</span>
                <span class="plus">></span>
              </div>
            `;
            document.querySelector(".listCart").appendChild(cartItem);
        });
    });
}

showCartBtn.addEventListener('click', function () {
    Cartpanel.classList.toggle("showCart");
});

document.getElementById("delete").addEventListener('click',function(){
    listCart.innerHTML = "";
});

document.getElementById("promo").addEventListener('click',function(){
    let code = document.getElementById("promo-code").value.trim();
    if (code === "DISCOUNT10") {
        alert("Promo applied! 10% discount.");
        
    } else {
        alert("Invalid promo code.");
    }
});

listCart.addEventListener('click',function(e){
    if(e.target.classList.contains("plus")){
        let qtySpan = e.target.parentElement.querySelector("span:nth-child(2)");
        let currentQty = parseInt(qtySpan.innerText);
        qtySpan.innerText = currentQty + 1;
        let productRow = e.target.closest(".item");
        let totalPriceDiv = productRow.querySelector(".totalPrice");
        let unitPrice = parseFloat(totalPriceDiv.innerText.replace("Price: $",""));
        totalPriceDiv.innerText = "Price: $" + (unitPrice * (currentQty + 1));
    }

    if (e.target.classList.contains("minus")) {
    let qtySpan = e.target.parentElement.querySelector("span:nth-child(2)");
    let currentQty = parseInt(qtySpan.innerText);
    if (currentQty > 1) {
        qtySpan.innerText = currentQty - 1;
        let productRow = e.target.closest(".item");
        let totalPriceDiv = productRow.querySelector(".totalPrice");
        let unitPrice = parseFloat(productRow.getAttribute("data-unitprice"));
        totalPriceDiv.innerText = "Price: $" + (unitPrice * (currentQty - 1));
    }
}
});
getData();
