document.querySelector("#signUpForm").addEventListener("click" ,e=>{
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#exampleEmail1").value,
        password:document.querySelector("#exampleInputPassword1").value,
        email:document.querySelector("#exampleInputEmail1").value
    }
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/";
        } else {
            alert("trumpet sound")
        }
    })

})