const deleteItem = async (id) => {
    const response = await fetch(`/api/deleteItemFromCart/${id}`);
    if (response.ok) {
        alert("Item removed from cart");
        window.location.reload();
    }
    else {
        alert("Technical issue! Unable to remove product from cart.");
    }
}

const increaseCount = async (count, id) => {
    count = Number(count);
    count++;
    const response = await fetch(`/api/updateQuantity/${id}/${count}`);
    if (response.ok) {
        window.location.reload();
    }
    else {
        alert("Unable to update quantity!");
    }
}

const decreaseCount = async (count, id) => {
    count = Number(count);
    if (count > 1) {
        count--;
        const response = await fetch(`/api/updateQuantity/${id}/${count}`);
        if (response.ok) {
            window.location.reload();
        }
        else {
            alert("Unable to update quantity!");
        }
    }
    else if (count == 1) {
        deleteItem(id);
    }
}

const buyButton = document.getElementById("buy-btn");

const createCheckoutSession = async () => {
    const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
    });

    if (response.ok) {
        console.log("Proceeding to payment");
        const data = await response.json();
        window.location = data.url;

    } else {
        console.log("error");
    }
}

buyButton.addEventListener('click', createCheckoutSession);

