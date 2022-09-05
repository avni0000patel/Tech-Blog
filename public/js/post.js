const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector(`input[name="title"]`).value.trim();
    const content = document.querySelector(`input[name="content"]`).value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);