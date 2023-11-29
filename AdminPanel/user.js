//==================================== Ham User=================================//

// Truyen ApI
var userApi ='http://localhost:3000/user'

function start() {
  getUser(renderUser);

  handleCreateForm();    

}


start();

//Function

function getUser(callback){
  fetch(userApi)
    .then(function(response){
      return response.json();
   })
   .then(callback);
}

//=========================== Ham Tao Moi ===================================//
function createUser(data, callback) {
  var options = {
      method: 'pOST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  };
  fetch(userApi, options)
    .then(function(response){
      response.json();  
    })
    .then(callback);
}

function handleCreateForm() {
  var createBtn = document.querySelector('#create');

    createBtn.onclick = function(){
      var full_name = document.querySelector('input[name="full_name"]').value;
      var date_of_birth =document.querySelector('input[name="date_of_birth"]').value;
      var phone_number =document.querySelector('input[name="phone_number"]').value;
      var create_at =document.querySelector('input[name="create_at"]').value;

      var formData ={
        full_name: full_name,
        date_of_birth:  date_of_birth,
        phone_number: phone_number,
        create_at: create_at
      };

      createUser(formData, function(){
        getUser(renderUser);
      });
    }  

}
//============================== Ham Xoa =================================//

function handledeleteUser(id){
  var options = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
   
};
  fetch(userApi + '/' + id, options)
    .then(function(response){
     response.json();  
    })
    .then(function(){
     var userItem = document.querySelector('.user-item-'+ id);
     if (userItem){
         userItem.remove();
     }

    });
}

//============================== Ham Sua ==============================//

function editFormUser(id, data, callback) {
  var options = {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  };
  fetch(userApi + '/' + id, options)
      .then(function(response){
          response.json();
      })
      .then(callback)
}

function handleEditFormUser(id){
  // lấy class cho từng phần tử name và description
  var full_name = document.querySelector(".full_name-" + id);
  var date_of_birth = document.querySelector(".date_of_birth-" + id);
  var phone_number= document.querySelector(".phone_number-" + id);
  var create_at = document.querySelector(".create_at-" + id);
  var btnEdit = document.querySelector('#create');

     // lấy ra ô input
  var full_nameInput = document.querySelector('input[name="full_name"]');
  var date_of_birthInput =document.querySelector('input[name="date_of_birth"]');
  var phone_numberInput =document.querySelector('input[name="phone_number"]');
  var create_atInput =document.querySelector('input[name="create_at"]');

  if (full_name  && date_of_birth && phone_number && create_at) { // nếu có 
    full_nameInput.value = full_name.innerText;   // gán ô input = giá trị của name
    date_of_birthInput.value = date_of_birth.innerText;
    phone_numberInput.value = phone_number.innerText;
    create_atInput.value = create_at.innerText;
    btnEdit.innerText = "Save";
  }
  btnEdit.onclick = function() {
    var formData = {
        full_name: full_nameInput.value,
        date_of_birth: date_of_birthInput.value,
        phone_number: phone_numberInput.value,
        create_at: create_atInput.value

    }
    editFormUser(id, formData, function () {
        getUser(renderUser);
    })

    // edit xong thì trả về lại tạo form
    btnEdit.innerText = "Create";
    full_nameInput.value = '';
    date_of_birthInput.value = '';
    phone_numberInput.value = '';
    create_atInput.value = '';
    handleCreateForm()  
}
}

//============================ Ham Render =============================//

function renderUser(user){
  var listUserBlock =
  document.querySelector('#list-user');
  var htmls = user.map(function(user){
    return `
     <div class="user-item-${user.id} ">
     <tr>
        <td class="full_name-${user.id}">${user.full_name}</td>   
        <td class="date_of_birth-${user.id}">${user.date_of_birth}</td>
        <td class="phone_number-${user.id}">${user.phone_number}</td>
        <td class="create_at-${user.id}">${user.create_at}</td>
        <td>
        <button onclick="handledeleteUser(${user.id})">Delete</button></td>
        <td>
         <button onclick="handleEditFormUser(${user.id})">Edit</button></td>
      </tr>   
     </div>
    `;
  });
  listUserBlock.innerHTML = htmls.join('');
}
      /*<p>${user.full_name}</p>
        <p>${user.date_of_birth}</p>
        <p>${user.phone_number}</p>
        <p>${user.create_at}</p>*/
 //==================== Bat loi chua nhap ===============================//

 /*var myForm =document.forms.myForm;
 var message = document.getElementById("message");

 myForm.onsubmit =function(){
  if(myForm.full_name.value ==""){
      message.innerHTML ="Vui long nhap ten";
      return false;
    }else{
      message.innerHTML="";
       return true;
    }
 } */
