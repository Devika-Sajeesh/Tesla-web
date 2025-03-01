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
                        content: "You are the Tesla 2025 Tech Fest AI guide. Your job is to provide details about Tesla events, workshops, competitions, registration, and schedules. Respond in a friendly and professional tone, keeping answers short and informative." 
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
