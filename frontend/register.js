//register data
let reg_form=document.getElementById("reg-form")
let submit_btn=document.getElementById("submit-btn")

submit_btn.addEventListener("click",(event)=>{
    event.preventDefault();
    let name=document.getElementById('name')
    let email=document.getElementById('email')
    let pass=document.getElementById('password')
    let age=document.getElementById("age")
    let obj={
        name:name.value,
        email:email.value,
        pass:pass.value,
        age:age.value
    }
    adduser(obj)
})

async function adduser(obj){
    try {
        let data=await fetch("https://tame-pear-bull-veil.cyclic.app/users/register",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        if(data.ok){
            alert("Succesfully user registered")
        }else{
            alert("Not registered")
        }

    } catch (error) {
        console.log(error)
    }
}


