let td = document.getElementById("data");

function fetchAllData() {
    fetch("http://192.168.1.10:80/api/users")
    .then(response=> {
      console.log(response); 
      if(!response.ok){
           throw Error("error occoucred")
       }     
       return response.json();
    }).then(data => console.log(data));
  
  }
  
  fetchAllData()