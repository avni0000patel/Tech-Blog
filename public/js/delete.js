const delButtonHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment, post) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ post: id }),
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
    .querySelector('.delete-button')
    .addEventListener('click', delButtonHandler);