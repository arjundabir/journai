import GeminiForm from "@/components/landingpage/GeminiForm";

interface Data {
  prompt: string;
  options: string[];
}

export default async function Home() {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
                text: "keep coming up with new ones. make 4 prompts to figure out a student's vibe in relation to an exploring game that explores their campus. These questions should tailor our understanding of them at the end and create a persona that we can analyze what type of adventure we should take them around campus. These should have multiple choice answers 4 of them. make the response in the json array. Don't add any extra characters that invalidate this as a json when parsing. make the objects in the array {prompt: string, answer: array}",
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
  const jsonPart = data.replace(/```json|```/g, "").trim();
  const newText = JSON.parse(jsonPart);

  console.log(newText);

  return (
    <main className="container h-screen mx-auto">
      <h1 className="text-center pt-8 text-7xl">
        Journ
        <span className="bg-gradient-to-r from-blue-600 to-green-500 inline-block text-transparent bg-clip-text">
          AI
        </span>
      </h1>
      <p className="text-center text-2xl py-2">
        Campus Exploration, <span className="text-green-500">your way.</span>
      </p>

      <GeminiForm data={newText} />
    </main>
  );
}
