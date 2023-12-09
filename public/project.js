
const display_items_desc = [
	{
		section_id: "sofa",
		img: "images/frontpage-tiles/sofa.jpg",
		heading: "Modern Sofas",
		description: "Sofas Redefined: Modern Aesthetics, Lasting Comfort.",
	},
	{
		section_id: "dining",
		img: "images/frontpage-tiles/diningSet.jpeg",
		heading: "Elegant Dining-Sets",
		description: "Where Culinary Delights Meet Elegance: Experience Luxurious Dining."
	},
	{
		section_id: "bookshelf",
		img: "images/frontpage-tiles/bookshelf.jpg",
		heading: "Handcrafted Bookshelves",
		description: "Crafted for Book Lovers, Designed for You: Find Your Perfect Bookshelf Here."
	},
	{
		section_id: "light",
		img: "images/frontpage-tiles/light.jpg",
		heading: "Futuristic Lights",
		description: "Designing Destiny with Light: These Futuristic Illumination Creates an Atmosphere that Echoes Tomorrow's Vision, Today."
	},
	{
		section_id: "bed",
		img: "images/frontpage-tiles/bed.jpg",
		heading: "Luxurious Beds",
		description: "Discover the epitome of relaxation and luxury with exquisite beds."
	},

	{
		section_id: "wardrobe",
		img: "images/frontpage-tiles/wardrobe.jpg",
		heading: "Aesthetic Wardrobes",
		description: "Aesthetic Symphonies of Design: Our Wardrobes, Your Canvas."
	},

];

// get all elements

const display_container = document.getElementById("display-container");

const products_section = document.getElementsByClassName("products-section");

const titles = document.querySelectorAll('.animate');

const login = document.getElementById('login');

const signup = document.getElementById('signup');

const cart = document.getElementById('cart');

const sideLogin = document.getElementById('side-login');

const sideSignup = document.getElementById('side-signup');

const sideCart = document.getElementById('side-cart');

const showSideBarButton= document.getElementById("show-sidebar");

const hideSideBarButton= document.getElementById("hide-sidebar");

// login-logout display

const get_logged_user = async () => {
	try {
		const response = await fetch("/api/authStatus");
		const user = await response.json();

		if (user) modifyLinks(user);
	}
	catch (err) {
		console.log("Unable to fetch User session detatils:\n" + err);
	}
}

function modifyLinks(user) {

	login.innerHTML = `
		<a href="/logout">
			<span> Log Out </span>
			<i class="fa-solid fa-right-from-bracket fa-rotate-180" style="color: #000000;"></i>
		</a>`;

	signup.innerHTML = `
		<a href="user/profile">
            <span>${user.firstname}</span> 
            <i class="fa-solid fa-user" style="color: #000000;"></i>
        </a>`;

	cart.innerHTML = `
		<a href="/user/cart" >
            <span>My Cart</span> 	
			<i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>
			<span id="cartValue"></span>
          </a>`

	sideLogin.innerHTML=`
		<a href="/logout">
			<span> Log Out </span>
			<i class="fa-solid fa-right-from-bracket fa-rotate-180" style="color: #ffffff;"></i>
		</a>`;

	sideSignup.innerHTML = `
		<a href="user/profile">
            <span>View Profile</span> 
            <i class="fa-solid fa-user" style="color: #ffffff;"></i>
        </a>`;

	sideCart.innerHTML = `
		<a href="/user/cart" >
            <span>My Cart</span> 	
			<i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
			<span id="side-cartValue"></span>
          </a>`
}

get_logged_user();


// sidebar functions

const sideBar=document.getElementsByClassName("side-bar-content")[0]

const showSideBar= ()=>{
	sideBar.style.display="block";
	showSideBarButton.style.display="none";
}

const hideSidebar= ()=>{
	showSideBarButton.style.display="block";
	sideBar.style.display="none";
}

const handleResize=()=>{
	if (window.innerWidth>=800){		
		showSideBarButton.style.display="none";

		if (sideBar.style.display==="block"){
			sideBar.style.display="none";
		}
	}
	
	else{
		showSideBarButton.style.display="block";
	}
}

showSideBarButton.addEventListener('click',showSideBar);
hideSideBarButton.addEventListener('click',hideSidebar);
window.addEventListener('resize',handleResize);

// text Animations

window.addEventListener('scroll', titleAnimation);
titleAnimation();
function titleAnimation() {
	const triggerBottom = window.innerHeight * 0.75;
	titles.forEach(title => {
		const titleTop = title.getBoundingClientRect().top;
		if (titleTop < triggerBottom)
			title.classList.add('show');

		/*else
			title.classList.remove('show');*/
	})


}

// categories display

function display_tiles(item) {
	return `
	<a href= "#${item.section_id}" class="remove-link-dec cards">
		<div class="display-item">
			<img src="${item.img}"/>
			<div>
				<h2 class="tile-heading"> ${item.heading} </h2>
				<p class="description" id="cards-desc"> ${item.description} </p>
			</div>
		</div>
	</a>`
}
display_container.innerHTML += `${display_items_desc.map(display_tiles).join('')}`

//slideshow carousal

let slideIndex = 0;

function showSlides() {
	const slides = document.getElementsByClassName("ad-slide");
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) {
		slideIndex = 1;
	}
	slides[slideIndex - 1].style.display = "block";
	setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function changeSlide(n) {
	slideIndex += n;
	const slides = document.getElementsByClassName("ad-slide");
	if (slideIndex > slides.length) {
		slideIndex = 1;
	}
	if (slideIndex < 1) {
		slideIndex = slides.length;
	}
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex - 1].style.display = "block";
}

showSlides();


function display_stars(item) {

	let span = ``;

	for (let i = 0; i < Math.floor(item.rating); i++) {
		span += `<i class="fa fa-star /*checked*/"></i>`;
	}

	/*
	for (let i=0; i< 5-item.rating; i++){
		span += `<i class="fa fa-star"></i>`;
	}
	*/

	return span;
}

// product tiles items display

function get_description(item) {

	let desc = ``;

	if (item.features) {
		const features = item.features;
		for (let key in features) {
			desc += `${key}:${features[key]} | `;
		}
	}

	return desc;
}


function display_products(items) {

	let htmlText="";
	items.forEach((item)=> {
		htmlText+=
			`
			<div class="product-tile flex-col">
				<img src="${item.img}"/>
				<div class="tile-content">
					<h2 class="tile-heading"> ${item.heading}</h2>
					<p class="description capitalize"> ${get_description(item)}</p>
					<div>
						<span>${display_stars(item)}</span>
						<span><strong> ${item.rating}</strong> </span>
					</div>
					<div class="product-footer">
						<h2> &#x20b9; ${item.price} </h2>
						<button class="add-to-cart-btn" onclick="addToCart('${item._id}')">
							Add to Cart
							<i class="fa-solid fa-cart-plus" style="color: #000000;"></i>
						</button>
					</div>
				</div>
			</div> `

	});
	return htmlText;
}


// looping through the product object for displaying the products

const createCategories= ()=>{

	for (let category in products){
		const items= products[category];
	
		products_section[0].innerHTML+=`
		<section id="${category}">
			<h2 class="category-heading"> ${category.toUpperCase()} </h2>
			<div class="container tiles-container">
				${display_products(items)}
			</div>
		</section>
		`
		
	};
}

// api calls for product tiles

const products = {};

fetch('/api/products')
	.then(response => response.json())
	.then(data => {

		data.forEach((item) => {
			const category = item.category;
	
			if (!products[category]) {
				products[category] = [];
			}
			products[category].push(item);
		})

		createCategories();
	})
	.catch((error) => {
		console.log("There was an error displaying products: \n" + error);
	});



// add to cart

const addToCart = (id) => {
	const url = `/api/addProductToCart/${id}`;

	fetch(url, {
		method: 'POST'
	})
		.then(response => {
			if (response.ok) {
				console.log('Product added to cart successfully');

			} else {
				console.error('Failed to add the product to the cart');
				alert("Login to purchase");
			}
		})
		.then(updateCartCount)
		.catch(error => {
			console.error('Request failed:', error);
		});

};

const updateCartCount = async () => {

	const response = await fetch('/api/getCartCount');
	if (response.ok) {
		const data = await response.json();

		const cartCount = data.cartCount;

		const cartValue = document.getElementById("cartValue");
		const sideCartCount=document.getElementById("side-cartValue")
		cartValue.innerHTML = `(${cartCount})`;
		sideCartCount.innerHTML = `(${cartCount})`;
	}

};

updateCartCount();

