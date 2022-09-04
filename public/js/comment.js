const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector(`input[name="comment"]`).value.trim();

    const post = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment, post) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment, post }),
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
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);