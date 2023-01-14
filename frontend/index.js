let createnotebtn=document.getElementById("submit-btn")

createnotebtn.addEventListener('click',(event)=>{
    event.preventDefault()
    let title=document.getElementById('title')
    let note=document.getElementById('note')
    let cat=document.getElementById('category')
    let obj={
        title:title.value,
        note:note.value,
        category:cat.value
    }
   createnote(obj)
})

async function createnote(obj){
    try {
        let data=await fetch("https://tame-pear-bull-veil.cyclic.app/notes/create",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization":localStorage.getItem('token')
            },
            body:JSON.stringify(obj)
        })
        if(data.ok){
            alert("note created")
        }else{
            alert("login first")
        }

    } catch (error) {
        console.log(error)
    }
}


let all_notes_btn=document.getElementById('all-notes')

all_notes_btn.addEventListener("click",(event)=>{
  let check=localStorage.getItem('token')
  if(check){
    showAllNotes()
  }else{
    alert("login first")
  }

})

async function showAllNotes(){
    try {
        let data=await fetch("https://tame-pear-bull-veil.cyclic.app/notes",{
            headers:{
                "Authorization":localStorage.getItem('token')
            }
        })
        if(data.ok){
            data.json()
            .then(res=>
                renderAllData(res)
            )
        }else{
            alert("login first")
        }

    } catch (error) {
        console.log(error)
    }
}

let all_notes_div=document.getElementById("all-notes-show")

function renderAllData(data){
 all_notes_div.innerHTML=""
 let mapping_allData=data.map(elem=>{
    return`
    <div class="all-notes">
            <h1>Title:${elem.title}</h1>
            <p>Note:${elem.note}</p>
            <p>Category:${elem.category}</p>
            <button class="delete-note" data-id=${elem._id}>Delete</button>
            <button class="update-note" data-id=${elem._id}>Update</button>
            <hr>
        </div> `
 })
 all_notes_div.innerHTML=mapping_allData.join("")

 let delete_btn=document.querySelectorAll('.delete-note')
 for(let btn of delete_btn){
        btn.addEventListener("click",(event)=>{ 
        let data_id = event.target.dataset.id;
        deleteNote(data_id)
  });
}

let update_btn=document.querySelectorAll('.update-note')
for(let btn of update_btn){
    btn.addEventListener('click',(event)=>{
        let data_id=event.target.dataset.id;
        getNote(data_id,event.path[1]) 
    })
}
}

async function getNote(id,updateDiv){
    try {
        let data=await fetch(`https://tame-pear-bull-veil.cyclic.app/notes/${id}`,{
            headers:{
                "Authorization":localStorage.getItem('token')
            }
        })
        if(data.ok){
            let temp=data.json().then(res=>{
                if(res.msg){
                    alert("Not allowed")
                }else{
                    showupform(id,res,updateDiv)
                }
        })
            
        }else{
            alert("you are not allowed")
        }

    } catch (error) {
        console.log(error)
    }
}

function showupform(id,data,updateDiv){
   updateDiv.innerHTML=`
   <form id="updated-form">
      <label for="title">Title</label>
      <input
        type="text"
        id="up-title"
        name="title"
        value="${data.title}"
        required
      />
      <label for="note">Note</label>
      <input
        type="text"
        name="note"
        id="up-note"
        value="${data.note}"
        required
      />
      <label for="cat">Category</label>
      <input type="text"
       id="up-category"
       value="${data.category}"
       required />
      <button id="save-btn">save</button>
    </form>
    <hr>
   `
   let up_save=document.getElementById("save-btn")
   up_save.addEventListener("click",(event)=>{
    event.preventDefault()
    let newtitle=document.getElementById('up-title')
    let newnote=document.getElementById('up-note')
    let newcat=document.getElementById('up-category')
    let obj={
        title:newtitle.value,
        note:newnote.value,
        category:newcat.value
    }
  updateNote(id,obj)
   })
}

async function  updateNote(id,obj){
    try {
        let data=await fetch(`https://tame-pear-bull-veil.cyclic.app/notes/update/${id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json",
                "Authorization":localStorage.getItem('token')
            },
            body:JSON.stringify(obj)
        })
        if(data.ok){
            let msg=await data.json().then(
                res=>res.msg
            )
           if(msg=="you are allowed"){
            alert('Note is updated')
            showAllNotes()
           }else{
            alert('Note is not updated')
           }
        }else{
            alert("you are note authorised")
        }

    } catch (error) {
        console.log(error)
    }
}



async function deleteNote(id){
    try {
        let data=await fetch(`https://tame-pear-bull-veil.cyclic.app/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":localStorage.getItem('token')
            }
        })
        if(data.ok){
            let msg=await data.json().then(
                res=>(res.msg)
            )
            if(msg==="you are not allowed"){
                alert("You are not allowed")
            }else{
                alert("Data is deleted")
                showAllNotes()
            }
        }else{
            alert("you are note authorised")
        }

    } catch (error) {
        console.log(error)
    }
}