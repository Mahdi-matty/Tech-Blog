
let deleteBtns =document.querySelectorAll('#deleteBtn');
document.addEventListener('DOMContentLoaded', async function() {
deleteBtns.forEach(deleteBtn=>{
    deleteBtn.addEventListener("click", async function(event) {
        event.preventDefault();
    const profileElement = this.closest(".list-group");
    if (profileElement) {
        try {
           let postId = this.parentElement.dataset.postId;
           console.log(profileElement.dataset)
           console.log(postId);
           const response = await fetch(`/api/BlogPost/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            profileElement.remove();
        } else {
            console.log("Error deleting post");
        }
    } catch (error) {
        console.error('Error during delete operation', error);
    }
}
});
});
})
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const sessionData = await fetch("/sessiondata");
        const res2 = await sessionData.json();
        console.log(res2);
        currUser = res2.user.id;
        console.log(currUser)

        const commentInput = document.querySelector('.commentinput'); // Update selector
        const commentButton = document.querySelectorAll('.likeBtn'); // Update selector

        commentButton.forEach(button => {
            button.addEventListener('click', async function() {
                const potId = this.parentElement.dataset.postId;
                console.log(potId)
                // if (commentInput.value.trim() !== '') {
                //     this.disabled = false;
                // } else {
                //     this.disabled = true;
                // }
                const postObj = {
                    text: commentInput.value, // Use value property
                    users_id: currUser,
                    post_id: potId,
                };
                try {
                    const response = await fetch(`/api/Comments`, {
                        method: "POST",
                        body: JSON.stringify(postObj),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.ok) {
                        alert("Post successful!");
                        location.reload();
                    } else {
                        alert("Something went wrong, Please try again!");
                    }
                } catch (error) {
                    console.error('Error posting comment', error);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching session data', error);
    }
});

