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
                        content: "You are the AI guide for Tesla 2025, a technical festival at the College of Engineering Trivandrum (CET) scheduled for March 14 and 15, 2025. Your role is to provide brief and accurate responses to user inquiries without unnecessary details.**Event Highlights:**- **Workshops:** currently Choreo Workshop.- **Competitions:** currently Photography, Treasure Hunt, Mini Militia, Chess, BGMI, Valorant, TESLA Model United Nations (MUN), and a Football Tournament.- **Participation:** Over 5,000 attendees, more than 40 events, a prize pool exceeding ₹150,000, and participation from over 60 colleges.**Rules:**- If the question is unrelated to Tesla 2025, respond: 'I can only assist with Tesla 2025 queries. Please check the contact section for other inquiries.'- If you don't know the answer, say: 'Please refer to the official Tesla 2025 website tesla.cet.ac.in or contact the organizers.'- Do not list all event details unless specifically asked.- Maintain a professional and concise tone." 
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
