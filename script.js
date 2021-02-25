let table = document.getElementById("tableDesign");
let td = document.getElementById("data");
let temp = "";
let postItem = document.getElementById("postMethod");
let showResult = document.getElementById("showResult");
let url = "http://192.168.1.10:80/api/users";
let submitBtn = document.getElementById("submitBtn");
let fName = document.getElementById("fname");
let email = document.getElementById("email");
let address = document.getElementById("Address");
let pass = document.getElementById("pass");
let gen = document.getElementById("gen");
let phone = document.getElementById("Phone");
let country = document.getElementById("country");
let state = document.getElementById("state");
let editFormDiv = document.querySelector(".editFormDiv");
const addPost = document.querySelector(".addPost");
const postURL = "http://192.168.1.10:80/api/auth/register";
const delteURL = " http://192.168.1.10:80/api/user/delete/";
const putUrl = "http://192.168.1.10:80/api/user/update/";

//get method
fetch(url)
  .then((response) => {
    console.log(response);
    if (!response.ok) {
      throw Error("error occoucred");
    }
    return response.json();
  })
  .then((element) => viewData(element));

const viewData = (element) => {
  let arr = element.result;
  x = console.log(arr);

  arr.forEach((e) => {
    temp += `
        <tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td> 
        <ul class="btnGroup">
        
        <li class="view">
        <button type="button" id=${e.id} class="btn btn-primary allBtns" onclick="showData(this.id)">View</button>
        </li>
        <li class="Delete">
        <button type="button" class="btn btn-danger allBtns" id=${e.id} onclick="removeItem()">Delete</button>
        </li>
        <li class="EDIT">
        <button type="button" class="btn btn-info allBtns editPost" id="${e.id}" onclick="editItems(this.id)">Edit</button>
        </li>
       
        
        </ul> </td>
        </tr>
        `;
  });

  td.innerHTML = temp;
};

//get info of current user
function showData(ID) {
  var currentId = ID;
  console.log(currentId);
  fetch(url)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw Error("error occoucred");
      }
      return response.json();
    })
    .then((element) => {
      let arr = element.result;
      let filterData = arr.filter((e) => e.id == currentId);

      let filter = filterData
        .map((fd) => {
          return `
    
                        <h5>Name : <span> ${filterData[0].name}  </span></h5>
                        <h5>ID : <span> ${filterData[0].id}  </span></h5>
                        <h5>address : <span> ${filterData[0].address}  </span></h5>
                        <h5>Email: <span> ${filterData[0].email}  </span></h5> 
                        <h5>Gender: <span> ${filterData[0].gender}  </span></h5> 
     
        
    
                
                    `;
        })
        .join();
      showResult.innerHTML = filter;
      table.style.display = "none";
    });
}

//Add new Data button
function editData() {
  postItem.style.display = "block";
  table.style.display = "none";
}

function addNewData() {
  addPost.style.display = "block";
  //POST METHOD
  addPost.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(postURL, {
      method: "POST",
      body: JSON.stringify({
        name: fName.value,
        email: email.value,
        password: pass.value,
        address: address.value,
        phone: phone.value,
        gender: gen.value,
        country: country.value,
        state: state.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        viewData(data);
      });
  });
}

//delte api 
function removeItem() {
  td.addEventListener("click", (e) => {
    e.preventDefault();
    let delteBtn = e.target.id;
    let editBtn = e.target.id;
    //Delte Req
    fetch(`${delteURL}${delteBtn}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => location.reload());
  });
}

//Edit Items

function editItems(ID) {
  editFormDiv.style.display = "block";
  let fName2 = document.getElementById("name2");
  let email2 = document.getElementById("email2");
  let address2 = document.getElementById("Address2");
  let pass2 = document.getElementById("pa2ss2");
  let gen2 = document.getElementById("gen");
  let phone2 = document.getElementById("Phone2");
  let country2 = document.getElementById("country2");
  let state2 = document.getElementById("state2");
  let form2 = document.getElementById("form2");
  let editBtnForm = document.getElementById("465");
  var currentId = ID;
  console.log(currentId);
  fetch(url)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw Error("error occoucred");
      }
      return response.json();
    })
    .then((element) => {
      let arr = element.result;
      let filterData = arr.filter((e) => e.id == currentId);

      let filter = filterData
        .map((fd) => {
          (fName2.value = fd.name),
            (email2.value = fd.email),
            (address2.value = fd.address),
            (phone2.value = fd.phone);
        })
        .join();
      showResult.innerHTML = filter;
    });

  td.addEventListener("click", (e) => {
    e.preventDefault();

    let editBtn = e.target.id;
    //Delte Req
    editBtnForm.addEventListener("click", (e) => {
      console.log(editBtn);
      e.preventDefault;
      fetch(`${putUrl}${editBtn}`, {
        method: "put",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: fName2.value,
          email: email2.value,
          address: address2.value,
          phone: phone2.value,
        }),
      })
        .then((response) => response.json())
        .then(() => location.reload());
    });
  });
}
