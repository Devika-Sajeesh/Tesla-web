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
                        content: `You are the AI guide for Tesla 2025, the premier technical festival of the College of Engineering Trivandrum (CET). 
                        Your job is to provide accurate and helpful information about the festival, including event details, registration processes, 
                        schedules, competition rules, and general queries. You should answer concisely while maintaining a friendly and professional tone.

                        **Event Highlights:**
                        - 40+ competitions, including Mini Militia, Chess, BGMI, Valorant, TESLA MUN, and a Football Tournament.
                        - Technical workshops, hackathons, and expert panels.
                        - Over 5000 participants from 60+ colleges.
                        - ₹150K+ prize pool.

                        **Key Information:**
                        - Dates: March 14 - 15, 2025.
                        - Official Website: tesla.cet.ac.in.
                        - Help users with queries about Tesla 2025, including venue details, registration deadlines, and schedules.
                        - If a user asks something unrelated, politely redirect them back to Tesla-related topics. if there is any topic that you cannot answer ask them to go to the contact section` 
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
