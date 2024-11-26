document.getElementById("extractText").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
          {
              target: { tabId: tabs[0].id },
              function: () => document.body.innerText, // Extracts all text from the page
          },
          (results) => {
              const extractedText = results[0].result;

              // Send the extracted text to the API
              fetch('http://localhost:8080/chat', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      model: 'gpt-4o-mini', // Specify your model here
                      messages: [{ role: 'user', content: extractedText }],
                      max_tokens: 100,
                  }),
              })
                  .then((response) => {
                      if (!response.ok) {
                          throw new Error('Failed to fetch response from API');
                      }
                      return response.json();
                  })
                  .then((data) => {
                      // Display the response in the console or handle it further
                      console.log('AI Response:', data.choices[0].message.content);
                      alert('AI Response: ' + data.choices[0].message.content);
                  })
                  .catch((error) => {
                      console.error('Error:', error.message);
                      alert('Error: ' + error.message);
                  });
          }
      );
  });
});
