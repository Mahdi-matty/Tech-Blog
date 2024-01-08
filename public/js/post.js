let currUser_1;
let postUrl;
let userNewid;
fetch("/sessiondata").then(res=>res.json()).then(res2=>{
    console.log(res2.user.id);
    currUser_1 = res2.user.id;
});


document.querySelector("#submitBtn").addEventListener("click",e=>{
    e.preventDefault();
    const postObj = {
        title:document.querySelector(".titleSearchProf").value,
        content:document.querySelector(".blogPostContent").value,
        user_id:currUser_1,
    }
    console.log(postObj);
    console.log(postObj);
    fetch("/api/BlogPost",{
        method:"POST",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            alert("post successful !");
            location.reload();
        }else{
            alert("Something went wrong, Please try again !");
        }
    });
});