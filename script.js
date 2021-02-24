let table = document.getElementById("tableDesign");
let td = document.getElementById("data");
let temp = ''
let postItem = document.getElementById("postMethod");
let showResult = document.getElementById('showResult');
let url = "http://192.168.1.10:80/api/users"

fetch(url)
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw Error("error occoucred")
        }
        return response.json();
    }).then((element) => viewData(element))


    function showData(ID) {
        var currentId = ID;
        console.log(currentId)
        fetch(url)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw Error("error occoucred")
                }
                return response.json();
            }).then((element) => {
                let arr = element.result
                let filterData = arr.filter((e) =>e.id == currentId);
                
              let filter =  filterData.map((fd) => {
                    return `
    
                        <h5>Name : <span> ${filterData[0].name}  </span></h5>
                        <h5>ID : <span> ${filterData[0].id}  </span></h5>
                        <h5>address : <span> ${filterData[0].address}  </span></h5>
                        <h5>Email: <span> ${filterData[0].email}  </span></h5> 
                        <h5>Gender: <span> ${filterData[0].gender}  </span></h5> 
     
        
    
                
                    `
    
                }).join()
                showResult.innerHTML = filter
                table.style.display = "none"
            })
    }


const viewData = (element) =>  {let arr = element.result
x = console.log(arr)

arr.forEach(e => {
    temp += `
<tr>
<td>${e.id}</td>
<td>${e.name}</td>
<td> 
<ul class="btnGroup">

<li class="view">
<button type="button" id=${e.id} class="btn btn-primary allBtns" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="showData(this.id)">View</button>
</li>
<li class="Delete">
<button type="button" class="btn btn-danger allBtns">Delete</button>
</li>
<li class="EDIT">
<button type="button" class="btn btn-info allBtns">Update</button>
</li>
<li class="EDIT">
<button type="button" class="btn btn-success allBtns" onclick="editData()">Edit</button>
</li>

</ul> </td>
</tr>
`
});

td.innerHTML = temp;
}
