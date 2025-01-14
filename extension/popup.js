document.getElementById("extractText").addEventListener("click", () => {
<<<<<<< HEAD
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
        alert("No active tab found!");
        return;
    }

    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
            return document.body.innerText;
=======
    // Query the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Inject the content script into the active tab
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          // Extract text from the page
        return document.body.innerText;
>>>>>>> parent of 63648b6 (Merge branch 'main' of https://github.com/VirreT/BioLearn-AI)
        },
    }, (results) => {
        // Display the extracted text in the popup
        console.log(results[0].result);

        const encodedText = encodeURIComponent(extractText);

<<<<<<< HEAD
        const extractedText = results[0].result;
        console.log("Extracted Text:", extractedText);

        const encodedText = encodeURIComponent(extractedText);

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
            const responseText = encodeURIComponent(data.choices[0].message.content);
            window.open(`textDisplay.html?response=${responseText}`, '_blank');
        })
        .catch((error) => {
            console.error('Error:', error.message);
            alert('Error: ' + error.message);
        });
=======
        // Open the new window and pass the extracted text
        window.open(`textDisplay.html?text=${encodedText}`, '_blank', 'width=600,height=400');
>>>>>>> parent of 63648b6 (Merge branch 'main' of https://github.com/VirreT/BioLearn-AI)
    });
    });
}); 