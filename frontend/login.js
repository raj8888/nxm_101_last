//login data
let login=document.getElementById('login-btn')
login.addEventListener("click",(event)=>{
    event.preventDefault();
    let email=document.getElementById('email')
    let pass=document.getElementById('password')
    let obj={
        email:email.value,
        pass:pass.value
    }
    loginsuser(obj)
})

let notepage=document.getElementById("create-note-page")
async function loginsuser(obj){
    try {
        let data=await fetch("https://tame-pear-bull-veil.cyclic.app/users/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        if(data.ok){
            let temp=data.json()
            .then(res=>
            localStorage.setItem("token",res.token),
            alert("login successfull"), 
            notepage.innerHTML=`
            <p>for creating note <a href="./createnote.html">click here</a></p>
            `   
            ).catch(err=>alert("wrong credentials"))
            
        }else{
            alert("wrong credintials")
        }

    } catch (error) {
        console.log(error)
    }
}