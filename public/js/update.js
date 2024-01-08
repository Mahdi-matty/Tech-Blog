let updateBtn = document.querySelector("#updateBtn");
function editPost(postId) {
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    const title = postElement.querySelector('h2').innerText;
    const content = postElement.querySelector('h4').innerText;

    postElement.innerHTML = `
        <input type="text" id="editTitle" value="${title}">
        <textarea id="editContent">${content}</textarea>
        <button class="save-btn" onclick="savePost('${postId}')">Save</button>
    `;

    const saveButton = postElement.querySelector('.save-btn');
    saveButton.addEventListener('click', () => savePost(postId));
}

async function savePost(postId) {
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    const updatedTitle = postElement.querySelector('#editTitle').value;
    const updatedContent = postElement.querySelector('#editContent').value;
    const upObj = {
        title: updatedTitle,
        content: updatedContent,
    };

    try {
        const response = await fetch(`/api/BlogPost/:${postElement}`, {
            method: "PUT",
            body: JSON.stringify(upObj),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            alert("updated successful!");
            location.reload();
        } else {
            alert("Something went wrong, Please try again!");
        }
    } catch (error) {
        console.error('Error posting comment', error);
    }
}

document.getElementById('postList').addEventListener('click', (event) => {
    if (event.target.classList.contains('update-btn')) {
        const postId = event.target.closest('[data-post-id]').getAttribute('data-post-id');
        editPost(postId);
    }
});

