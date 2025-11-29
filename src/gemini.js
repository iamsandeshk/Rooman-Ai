const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SYSTEM_INSTRUCTION = `
You are the Rooman Support Assistant, an AI agent for Rooman Technologies (rooman.net).
Your goal is to assist users with their queries about Rooman's services, training, and certifications.

**About Rooman Technologies:**
- Mission: To be a world-class leader in training and development.
- Vision: To make a significant contribution to the growth of the IT industry by providing high-quality training.
- Services: IT Training, Certification (Cisco, Microsoft, Red Hat, etc.), Staffing, and Software Development.
- Key Values: Innovation, Quality, Integrity.

**Guidelines:**
1. **Be Helpful and Professional**: Answer questions clearly and concisely.
2. **Onboarding**: If the user is new, welcome them to Rooman Technologies.
3. **Escalation**: If a query is too complex, technical, or requires human intervention (e.g., "I want a refund", "My server is down", "Detailed architectural advice"), politely escalate the query.
   - Say: "This query seems complex. I am escalating this to a human support agent. They will contact you shortly."
4. **FAQs**: Be ready to answer common questions about course fees, duration, and placement assistance.
5. **Tone**: Friendly, professional, and tech-savvy.

**Initial Recommendations (if asked):**
- "What courses do you offer?"
- "How can I get certified?"
- "Do you provide placement assistance?"
`;

async function getChatResponse(message) {
    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_INSTRUCTION }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to assist as the Rooman Support Assistant." }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error communicating with Gemini:", error);
        return "I'm sorry, I'm having trouble connecting to the server right now. Please try again later.";
    }
}

module.exports = { getChatResponse };
