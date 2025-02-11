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
                messages: [
                    {
                        role: 'system',
                        content: 'You are an experienced biology teacher for advanced highschool biology students. Respond to user inputs with a summary and a few bullet points to focus on. If you get a question go through it in steps and dont give the complete answer, hint towards it instead. Get rid of all text formatting in your response. Dont ask if the user wants to discuss the topic further, instead, ask the user a question about the topic. Use | instead of - in the key points part. If the request is not related to biology in any way, do not answer and instead mention that the request is not biology related.'
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
