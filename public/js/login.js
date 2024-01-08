document.querySelector("#loginBtn").addEventListener("click",e=>{
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#exuserName").value,
        password:document.querySelector("#exPassword").value
    }
    fetch("/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/profile";
        } else {
            alert("user not found!")
        }
    })

});