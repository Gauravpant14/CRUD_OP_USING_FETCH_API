let td = document.getElementById("data");
let temp = ''
function fetchAllData() {
    fetch("http://192.168.1.10:80/api/users")
    .then(response=> {
      console.log(response); 
      if(!response.ok){
           throw Error("error occoucred")
       }     
       return response.json();
    }).then( (element) => {
        
        
    let arr = element.result
   x=  console.log(arr)

    arr.forEach(e => {
       temp += `
       <tr>
       <td>${e.id}</td>
       <td>${e.name}</td>
       <td> 
       <ul class="btnGroup">
       <li class="view">
       <button type="button" class="btn btn-primary" onClick="show">View</button>
       </li>
       <li class="Delete">
       <button type="button" class="btn btn-danger">Delete</button>
       </li>
       <li class="EDIT">
       <button type="button" class="btn btn-info">Update</button>
       </li>

   </ul> </td>
       </tr>
       `
    });

    td.innerHTML = temp;
       
        
    })
   
    
}
    
  
  
  fetchAllData()