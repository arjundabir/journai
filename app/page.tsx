import GeminiForm from "@/components/landingpage/GeminiForm";

interface Data {
  prompt: string;
  answers: string[];
}

export default async function Home() {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "make 4 prompts to figure out a student's vibe in relation to an exploring game that explores their campus. These questions should tailor our understanding of them at the end and create a persona that we can analyze what type of adventure we should take them around campus. These should have multiple choice answers 4 of them. make the response in the json array. Don't add any extra characters that invalidate this as a json when parsing. you MUST keep the objects in the array {prompt: string, answer: array}. do not include anything else other than the array",
              },
            ],
          },
        ],
      }),
      next: { revalidate: 1 },
    }
  );
  let data = await response.json();
  data = data.candidates[0].content.parts[0].text;
  const jsonPart = JSON.parse(data.replace(/```json|```/g, "").trim());

  let message =
    "Find 4 locations at UCLA that match this person's personality given this data:\n\n";
  jsonPart.forEach((item, index) => {
    message += `${index + 1}. **Prompt**: ${item.prompt}\n   **Answer**: ${
      item.answer
    }\n\n`;
  });
  message +=
    "Please list the four best matching locations at UCLA based on these preferences.";
  console.log(message);

  return (
    <main className="container mx-auto h-dvh">
      <h1 className="text-center pt-8 text-7xl">
        Journ
        <span className="bg-gradient-to-r from-blue-600 to-green-500 inline-block text-transparent bg-clip-text">
          AI
        </span>
      </h1>
      <p className="text-center text-2xl py-2">
        Campus Exploration, <span className="text-green-500">your way.</span>
      </p>

      <GeminiForm data={jsonPart} />
    </main>
  );
}
