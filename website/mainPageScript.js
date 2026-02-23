document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('chatForm').onsubmit = async function(event) {
        event.preventDefault();
        const globalButton = document.getElementById("generateButton");
        const loading = document.getElementById("loading");

        globalButton.disabled = true;
        globalButton.style.display = "none";
        loading.style.display = "flex";

        const message = document.getElementById('msg').value;

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
                            content: 'You are an experienced biology-teaching AI for advanced highschool biology students. Respond to user inputs with a summary with around 200 words and a few bullet points to focus on. If you get a question go through it in steps and dont give the complete answer, hint towards it instead. Get rid of all text formatting in your response. Dont ask if the user wants to discuss the topic further, instead, ask the user a question about the topic. Make the questions strictly objective and based on facts i.e. avoid using phrases like "what do you think...?". Use | instead of - in the key points part. If the request is not related to biology directly, do not answer and instead mention that the request is not biology related.'
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    max_tokens: 1000,
                })
            })
            
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch response from API');
                }
                return response.json();
            })
            .then((data) => {
                const responseText = encodeURIComponent(data.choices[0].message.content);
                window.open(`/extension/textDisplay.html?response=${responseText}`, '_blank');
            })
            .catch((error) => {
                console.error('Error:', error.message);
                alert('Error: ' + error.message);
            });

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
                    content: `You are an experienced biology teacher. Provide a concise HTML-formatted summary using only these tags: <p>, <ul>, <ol>, <li>, <strong>, <em>. Wrap the HTML output between the literal markers <!--BEGIN--> and <!--END-->. If you cannot produce HTML, output <!--BEGIN--><!--END-->.

                                INSTRUCTIONS:
                                - Extract ALL biologically relevant information from the provided article.
                                - Preserve accuracy and do NOT add information that is not present in the text.
                                - Organize the summary logically (definitions → processes → mechanisms → examples → significance).
                                - Include:
                                  - Key terms with brief definitions
                                  - Important processes and step-by-step mechanisms (use <ol> when sequential)
                                  - Cause–effect relationships
                                  - Comparisons (if present)
                                  - Examples and applications
                                  - Data, numbers, and experimental findings (if given)
                                - Highlight essential vocabulary using <strong>.
                                - Use <em> only for emphasis of critical concepts or distinctions.
                                - Use bullet points (<ul>) for grouped facts and numbered lists (<ol>) for sequences or stages.
                                - Keep wording concise but information-dense.
                                - Do NOT include commentary, explanations about formatting, or any text outside the required markers.
                                - Do NOT use headings, tables, or any HTML tags other than those explicitly allowed.`
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
