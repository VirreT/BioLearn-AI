document.getElementById("extractText").addEventListener("click", () => {
    document.getElementById("extractText").disabled = true;
    document.getElementById("extractText").style.display = "none";
    document.getElementById("loading").style.display = "flex";
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
          alert("No active tab found!");
          return;
      }

      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
                console.log(document.body.innerText)
              return document.body.innerText;
          },
      }, (results) => {
          if (chrome.runtime.lastError) {
              console.error("Script injection failed:", chrome.runtime.lastError.message);
              alert("Failed to extract text. Check console for details.");
              return;
          }

          if (!results || !results[0]) {
              alert("No text was extracted.");
              return;
          }

          const extractedText = results[0].result;
          console.log("Extracted Text:", extractedText);


          fetch('http://localhost:8080/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                temperature: 0.02,
                messages: [
                    {
                        role: 'system',
                        content: `You are an experienced biology teacher. Provide a concise HTML-formatted summary using only these tags: <p>, <ul>, <ol>, <li>, <strong>, <em>. Wrap the HTML output between the literal markers <!--BEGIN--> and <!--END-->. If you cannot produce HTML, output <!--BEGIN--><!--END-->.

                              INSTRUCTIONS:
                              - Write a coherent summary with no bullet points.
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
                              - Do NOT use headings, tables, or any HTML tags other than those explicitly allowed.`                    },
                    {
                        role: 'user',
                        content: extractedText
                    }
                ],
                max_tokens: 1000,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch response from API');
            }
            return response.json();
        })
        .then((data) => {
            const responseText = encodeURIComponent(data.choices[0].message.content);
            window.open(`textDisplay.html?response=${responseText}`, '_blank');
        })
        .catch((error) => {
            console.error('Error:', error.message);
            alert('Error: ' + error.message);
        });
      });
    });
});
