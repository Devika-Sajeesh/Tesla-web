async function sendMessage() {
    let inputField = document.getElementById("chatbot-input");
    let userMessage = inputField.value.trim();
    if (!userMessage) return;

    let messagesDiv = document.getElementById("chatbot-messages");
    messagesDiv.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    inputField.value = "";

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768",
                messages: [
                    { 
                        role: "system", 
                        content: `You are the AI guide for Tesla 2025, a technical festival at the College of Engineering Trivandrum (CET) on 14th and 15th march of 2025.  
                        Your job is to answer user questions **briefly and accurately** without unnecessary details.  

                        **Rules:**  
                        - **Only answer what is asked**; do not add extra information.  
                        - **If the question is unrelated to Tesla 2025**, say: "I can only assist with Tesla 2025 queries. Please check the contact section for other inquiries."  
                        - **If you don't know the answer**, say: "Please refer to the official Tesla 2025 website or contact the organizers."  
                        - **Do NOT list all event details unless specifically asked.**  
                        - **Be professional and concise.**` 
                    },
                    { role: "user", content: userMessage }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        let botReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand.";

        messagesDiv.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
        console.error("Chatbot Error:", error);
        messagesDiv.innerHTML += `<p><strong>Bot:</strong> Error: ${error.message}</p>`;
    }
}
