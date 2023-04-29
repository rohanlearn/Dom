var form = document.querySelector("#myForm")
var adder = document.getElementById('items');
form.addEventListener('submit',addtostorage);
var srchbtn = document.getElementById("search-btn")

var filter = document.getElementById("search");
srchbtn.addEventListener("click",filterItems)



function addtostorage(e){   
      e.preventDefault()
    if(document.getElementById('name').value != ""){
        var name= document.getElementById('name').value;

    }else{
        alert("name is empty")
        return

    };
    
    if(document.getElementById('email').value != ""){
        var email = document.getElementById('email').value;

    }else{
        alert("email is empty")
        return

    };
    

    let myobj ={      name:name,        email:email
   }
   
   let myobj_serialized = JSON.stringify(myobj);
  
   localStorage.setItem(email,myobj_serialized);
   var object = localStorage.getItem(email)
   object = JSON.parse(object)
   var li = document.createElement('li')
   var Name = document.createTextNode("Name: "+object.name+"," ) ;
   var Email =  document.createTextNode(" Email: "+object.email);
  
   var dltbtn = document.createElement("button");
   var editbtn = document.createElement('button');
   li.className="list-group-item";
   li.appendChild(Name);
   li.appendChild(document.createElement("br"));
   li.appendChild(Email);
   li.appendChild(document.createElement("br"));
   editbtn.appendChild(document.createTextNode("Edit"));
   dltbtn.appendChild(document.createTextNode("Delete"));
   dltbtn.id="delete"
   editbtn.id="edit"
   editbtn.className="btn btn-outline-dark btn-sm float-right delete";
   dltbtn.className="btn btn-danger btn-sm float-right delete";
   
   dltbtn.addEventListener("click",(event)=>{
    deletion(event,object)
   });
   editbtn.addEventListener('click',(event)=>{
    edition(event,object)
   });
   li.appendChild(editbtn);
   li.appendChild(dltbtn);
   li.style.marginTop="10px"

   
   
   
   adder.appendChild(li);
   
   document.getElementById('name').value=""
   document.getElementById('email').value=""
   
   
 }

function deletion(e,object){


 if (e.target.id=="delete"){
   if (confirm(`Are you sure you want to delete the User ${object.name} ?`)){
    var p = e.target.parentElement;
    localStorage.removeItem(object.email);
    adder.removeChild(p);
}
 }
}

function edition(e,object){
  
  if (e.target.id=="edit"){

    var li = e.target.parentElement;
    
    var name=object.name;
    var email=object.email;


    localStorage.removeItem(object.email);
    adder.removeChild(li);
    

 }
 
 

}
function filterItems(e){
    e.preventDefault()
    if(adder.childElementCount===0){
        alert("there are no users added yet")
        return
    }
    if(filter.value==""){
        alert("search bar is empty")
        return
    }
    

    var content = filter.value.toLowerCase();

    listOfItems = adder.getElementsByTagName("li");

    Array.from(listOfItems).forEach((item)=>{
        var name = item.firstChild.textContent;
        name = name.slice(5,name.length-1);
        let arr = item.childNodes;
         
        email = arr[2].textContent;
        email = email.slice(8,email.length)

        finalContent = name+" "+email
        
        if(finalContent.toLowerCase().indexOf(content)!=-1){
            item.style.display="block";
        }else{
            item.style.display="none";
        }
        
    })
    
    
}