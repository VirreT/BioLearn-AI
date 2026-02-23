
  document.getElementById('chatForm').onsubmit = async function(event) {
    event.preventDefault();
    const globalButton = document.getElementById("globalButton");
    const loading = document.getElementById("loading");

   
    globalButton.disabled = true;
    globalButton.style.display = "none";
    loading.style.display = "flex";

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