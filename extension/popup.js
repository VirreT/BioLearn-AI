document.getElementById("extractText").addEventListener("click", () => {
  // Query the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
          alert("No active tab found!");
          return;
      }

      // Inject the content script into the active tab
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
              // Extract text from the page
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

          const extractedText = results[0].result; // Use extracted text
          console.log("Extracted Text:", extractedText);

          // Encode the extracted text for safe use in a URL
          const encodedText = encodeURIComponent(extractedText);

          // Send the extracted text to the API
          fetch('http://localhost:8080/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an experienced biology teacher for advanced highschool biology students. Respond to user inputs with a summary and a few bullet points to focus on. If you get a question go through it in steps and dont give the complete answer, hint towards it instead. Get rid of all text formatting in your response. Dont ask if the user wants to discuss the topic further, instead, ask the user a question about the topic. Use | instead of - in the key points part.'
                    },
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
            const responseText = encodeURIComponent(data.choices[0].message.content); // Encode properly
            window.open(`textDisplay.html?response=${responseText}`, '_blank');
        })
        .catch((error) => {
            console.error('Error:', error.message);
            alert('Error: ' + error.message);
        });
      });
    });

});
