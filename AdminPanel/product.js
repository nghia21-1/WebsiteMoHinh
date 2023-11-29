var productApi ='http://localhost:3000/product'

function start() {
    getProduct(renderProduct);
  
    handleCreateForm();    
  
  }

  start();

//Function

function getProduct(callback){
    fetch(productApi)
      .then(function(response){
        return response.json();
     })
     .then(callback);
  }

//=========================== Ham Tao Moi ===================================//
function createProduct(data, callback) {
    var options = {
        method: 'pOST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch(productApi, options)
      .then(function(response){
        response.json();  
      })
      .then(callback);
  }
  
  function handleCreateForm() {
    var createBtn = document.querySelector('#create');
  
      createBtn.onclick = function(){
        var name_product = document.querySelector('input[name="name_product"]').value;
        var image =document.querySelector('input[name="image"]').value;
        var description =document.querySelector('input[name="description"]').value;
        var price =document.querySelector('input[name="price"]').value;
        var stock =document.querySelector('input[name="stock"]').value;
  
        var formData ={
          name_product: name_product,
          image: image,
          description: description,
          price: price,
          stock: stock
        };
  
        createProduct(formData, function(){
          getProduct(renderProduct);
        });
      }  
  }

  //============================== Ham Xoa =================================//

function handledeleteProduct(id){
    var options = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
     
  };
    fetch(productApi + '/' + id, options)
      .then(function(response){
       response.json();  
      })
      .then(function(){
       var productItem = document.querySelector('.product-item-'+ id);
       if (productItem){
        productItem.remove();
       }
      });
    }

//============================== Ham Sua ==============================//

function editFormProduct(id, data, callback) {
    var options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    fetch(productApi + '/' + id, options)
        .then(function(response){
            response.json();
        })
        .then(callback)
  }
  
  function handleEditFormProduct(id){
    // lấy class cho từng phần tử name và description
    var name_product = document.querySelector(".name_product-" + id);
    var image = document.querySelector(".image-" + id);
    var description= document.querySelector(".description-" + id);
    var price = document.querySelector(".price-" + id);
    var stock = document.querySelector(".stock-" + id);
    var btnEdit = document.querySelector('#create');
  
       // lấy ra ô input
    var name_productInput = document.querySelector('input[name="name_product"]');
    var imageInput =document.querySelector('input[name="image"]');
    var descriptionInput =document.querySelector('input[name="description"]');
    var priceInput =document.querySelector('input[name="price"]');
    var stockInput =document.querySelector('input[name="stock"]');
  
    if (name_product  && image && description && price && stock) { // nếu có 
      name_productInput.value = name_product.innerText;   // gán ô input = giá trị của name
      imageInput.value = image.innerText;
      descriptionInput.value = description.innerText;
      priceInput.value = price.innerText;
      stockInput.value = stock.innerText;
      btnEdit.innerText = "Save";
    }
    btnEdit.onclick = function() {
      var formData = {
          name_product: name_productInput.value,
          image: imageInput.value,
          description: descriptionInput.value,
          price: priceInput.value,
          stock: stockInput.value
  
      }
      editFormProduct(id, formData, function () {
          getProduct(renderProduct);
      })
  
      // edit xong thì trả về lại tạo form
      btnEdit.innerText = "Create";
      name_productInput.value = '';
      imageInput.value = '';
      descriptionInput.value = '';
      priceInput.value = '';
      handleCreateForm()  
    }
  }
//===================== Ham render =====================//
function renderProduct(product){
    var listProductBlock =
    document.querySelector('#list-product');
    var htmls = product.map(function(product){
      return `
       <div class="product-item-${product.id} ">
       <tr>
          <td class="name_product-${product.id}">${product.name_product}</td>   
          <td class="image-${product.id}">${product.image}</td>
          <td class="description-${product.id}">${product.description}</td>
          <td class="price-${product.id}">${product.price}</td>
          <td class="stock-${product.id}">${product.stock}</td>
          <td>
          <button onclick="handledeleteProduct(${product.id})">Delete</button></td>
          <td>
           <button onclick="handleEditFormProduct(${product.id})">Edit</button></td>
        </tr>   
       </div>
      `;
    });
    listProductBlock.innerHTML = htmls.join('');
}
