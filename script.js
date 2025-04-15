//Fetch Post using fetch()

const fetchButton = document.getElementById("fetch");

fetchButton.addEventListener("click", func => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Response Failed')
            }
            return response.json()
        })
        .then(data => {
            console.log(data);
            readPost(data);
        })
        .catch(error => {
            console.error('Error While Fetching Data: ', error)
            postError(error);
        });
});

function readPost(data) {
    const title = document.getElementById("post_title");
    const body = document.getElementById("post_copy");

    title.innerHTML = ''
    body.innerHTML = ''

    title.textContent = data.title;
    body.textContent = data.body;
}

function postError(error) {
    const title = document.getElementById("post_title");
    title.innerHTML = ''

    title.textContent = `${error}`
    title.style.color = "red"
}

//Fetch Post using XHR

const xhrButton = document.getElementById("xhr")

xhrButton.addEventListener("click", func => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2')

    xhr.onreadystatechange = func => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                readPost(data);
            } else {
                console.error('Error While Fetching Data: ', error)
                postError(error);
            }
        }
    };
    xhr.send();
});

//Send Data using POST

const submit = document.getElementById("submit")
const titleBox = document.getElementById("post_name")
const bodyBox = document.getElementById("post_body")
const form = document.getElementById("post")

submit.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const newPost = {
            title: titleBox.value,
            body: bodyBox.value,
            userId: 1
        };

        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        const result = await response.json();
        console.log("Success:", result)
        document.getElementById("success").textContent = `Posted Sucessfully! ${result}. You can find your new post up top!`
        document.getElementById("success").style.color = "green"
        titleBox.value = ''
        bodyBox.value = ''
        readPost(newPost);
    } catch(error) {
        console.error('Error While Posting', error)
    }
});

//Update Data using PUT

const edit = document.getElementById("edit")
const id = document.getElementById("put_id")
const newTitle = document.getElementById("put_name")
const newBody = document.getElementById("put_body")
const updateForm = document.getElementById("put")

edit.addEventListener("click", async (event) => {
    event.preventDefault();
    const body = {
        title: newTitle.value,
        body: newBody.value,
        userId: 1
    };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id.value}`, true)

    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onload = func => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('Success:', xhr.responseText);
                document.getElementById("update_response").textContent = `Updated Sucessfully! You can find your updated post up top!`
                document.getElementById("update_response").style.color = "green"
                newTitle.value = ''
                newBody.value = ''
                id.value = ''
                readPost(body);
            } else {
                console.error('Error:', xhr.statusText)
                document.getElementById("update_response").textContent = `Failed to Update!`
                document.getElementById("update_response").style.color = "red"
            }
        }
    };
    xhr.send(JSON.stringify(body));
});

//CHALLENGE - Load All Posts
window.addEventListener('load', func => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response failed');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayPosts(data);
        })
        .catch(error => console.error('Error fetching posts:', error));
});

function displayPosts(data) {
    const section = document.getElementById("allposts");
    section.innerHTML = '';

    data.forEach(post => {
        const postLink = document.createElement('a');
        postLink.href = `https://jsonplaceholder.typicode.com/posts/${post.id}`
        postLink.textContent = post.title;
        postLink.id = 'post_link'

        section.appendChild(postLink);
    })
}
