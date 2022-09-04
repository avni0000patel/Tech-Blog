const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector(`input[name="title"]`).value.trim();
    const content = document.querySelector(`input[name="content"]`).value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (title, comment, id) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, comment, post: id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.edit-form')
    .addEventListener('submit', editFormHandler);