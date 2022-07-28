//Nav Menu
const openBottom = document.querySelector('.nav__menu');
const menu = document.querySelector('.nav__ul');
const closeMenu = document.querySelector('.nav__close');
openBottom.addEventListener('click',()=>{
    menu.classList.add('nav__link--show');
})

closeMenu.addEventListener('click', ()=>{
    menu.classList.remove('nav__link--show');
})



//IO
const socket = io.connect();

// form products
const formProduct = document.querySelector('#formProduct');


//ADD PRODUCT 
const addToProductList = e => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const price = Number(document.querySelector('#price').value);
    const thumbnail = document.querySelector('#thumbnail').value;
    const description = document.querySelector('#description').value;
    
    const product = {
        name,
        price,
        thumbnail,
        description
    }
    formProduct.reset();
    
    product && socket.emit('product', product)
}



//Event add product to products list
formProduct.addEventListener('submit', addToProductList);


//RENDER PRODUCTS
function renderCartProducts(data){
    const root = document.querySelector('#root2')
    const row  = document.createElement('tr')
    const html =` ${data.map(product=>{
                    return  (` 
                                <td>${product.name}</td>
                                <td>$ ${product.price}</td>
                                <td><img src=${product.thumbnail} class="product-img" alt="thumbnail"/></td>
                            `)})
                    }` 
                                
    row.innerHTML = html;
    root.appendChild(row)

    socket.emit('cartProducts2',data)
}



function renderProducts(data){

    const root = document.querySelector('#root3')
    const html =` ${data.map(product => {
                    return  (`  
                                <div class="card">
                                    <img src=${product.thumbnail} alt=${product.name} class="card-img"/>
                                    <h3 class="card-title">${product.name}</h3>
                                    <p class="card-desc">${product.description}</p>
                                    <strong class="card-price">$ ${product.price}</strong>
                                    <strong class="card-price">Stock ${product.stock}</strong>
                                    <em>Uploaded at ${product.timestamps}</em>
                                    <button class="addToCart" data-id=${product.id}>Add To Cart</button>
                                    <a class="edit">Edit</a>
                                    <a class="delete">Delete</a>
                                </div>
                            `)}).join(' ')}`    
    data.length > 0 ? root.innerHTML = html : null

    //ADD TO CART
    const add = document.querySelectorAll('.addToCart'); 
    
    
        add.forEach(node => {
            node.addEventListener('click', e => {
                e.preventDefault();
                
                    const id = node.getAttribute('data-id')
                    const product = data.find(product => product.id === id)
                    const cart = {
                        products:[product]
                    }
                    socket.emit('productCart', cart)
        })
    })
}


socket.on('products', data =>{
    renderProducts(data)
})

socket.on('cartProducts', data => renderCartProducts(data));

//show cart 
const cart = document.querySelector('.svg-image')
cart.addEventListener('click', () => {
    const cart = document.querySelector('.products-container')
    cart.classList.toggle('show')
})



