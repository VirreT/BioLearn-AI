
  document.getElementById('chatForm').onsubmit = async function(event) {
   event.preventDefault();
   
   const message = document.getElementById('msg').value;
   const outputDiv = document.getElementById('output');
   
   outputDiv.textContent = 'Loading...';

   try {
     const response = await fetch('http://localhost:8080/chat', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         model: 'gpt-4o-mini',
             messages: [
                 {
                     role: 'system',
                     content: 'You are an experienced biology teacher. Respond to user inputs with a summary and a few bullet points to focus on. Get rid of all text formatting in your response.'
                 },
                 {
                     role: 'user',
                     content: message
                 }
             ],
             max_tokens: 1000,
       })
     });

     if (!response.ok) {
       throw new Error('Failed to fetch response');
     }

     const data = await response.json();
     outputDiv.textContent = data.choices[0].message.content;

   } catch (error) {
     outputDiv.textContent = 'Error: ' + error.message;
   }
 };