const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const title = document.getElementById('title').value;
  const introduction = document.getElementById('introduction').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').value;

  if (!title || !introduction || !price || !image) {
    alert('Please fill out all fields!');
    return;
  }

  const product = { title, introduction, price, image };

  const products = JSON.parse(localStorage.getItem('products')) || [];

  products.push(product);

  localStorage.setItem('products', JSON.stringify(products));

  form.reset();

  alert('Product added successfully!');
});
