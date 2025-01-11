document.getElementById('sendMessage').addEventListener('click', async () => {
    const userMessage = document.getElementById('userMessage').value;
    if (!userMessage) return alert('Please enter a message');

    const responseBox = document.getElementById('responseBox');
    responseBox.innerText = 'Waiting for response...';

    try {
      const response = await fetch('http://192.168.0.127:8080/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }]
        })
      });

      const data = await response.json();
      const reply = data.choices[0].message.content;
      responseBox.innerText = reply;
    } catch (error) {
      responseBox.innerText = 'Error: ' + error.message;
    }
  });