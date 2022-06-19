function attachEvents() {
    let baseUrl = 'http://localhost:3030/jsonstore/messenger';
    let textArea = document.getElementById('messages');
    let sendButton = document.getElementById('submit');
    let refreshButton = document.getElementById('refresh');
    let nameInput = document.querySelector('[name="author"]');
    let messageInput = document.querySelector('[name="content"]');
    let allMessages = '';
    
    fetch(baseUrl)
        .then((res) => res.json())
        .then((data) => {
                for (each of Object.keys(data)) {
                    allMessages += `${data[each].author}: ${data[each].content}\n`;
                }
            }
        );

    sendButton.addEventListener('click', createMessages);
    refreshButton.addEventListener('click', showMessages);

    function createMessages() {

        let data = {
            author: nameInput.value,
            content: messageInput.value
        };

        allMessages += `${data.author}: ${data.content}\n`;
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    }

    function showMessages() {
        textArea.textContent = allMessages;
        console.log(textArea);
        nameInput.value = '';
        messageInput.value = '';
    }

}

attachEvents();