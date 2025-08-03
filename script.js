
const input = document.getElementById('textInput');
const answerBox = document.getElementById('answerBox');

const topics = ["GK", "English", "Assamese", "Hindi", "Bengali", "NET", "SLET", "TET", "CAT", "Science", "Math"];
let topicIndex = 0, charIndex = 0;

function animatePlaceholder() {
  if (charIndex <= topics[topicIndex].length) {
    input.placeholder = "Ask about: " + topics[topicIndex].substring(0, charIndex++);
    setTimeout(animatePlaceholder, 100);
  } else {
    setTimeout(() => {
      charIndex = 0;
      topicIndex = (topicIndex + 1) % topics.length;
      animatePlaceholder();
    }, 1000);
  }
}
animatePlaceholder();

document.getElementById('imageUpload').addEventListener('change', function () {
  const fileLabel = document.getElementById('fileName');
  if (this.files.length > 0) {
    fileLabel.textContent = `✅ Selected: ${this.files[0].name}`;
  } else {
    fileLabel.textContent = '';
  }
});

document.getElementById('getSolutionBtn').addEventListener('click', async () => {
  const question = input.value.trim();
  if (!question) {
    answerBox.textContent = "⚠️ Please ask a question or upload an image.";
    return;
  }

  answerBox.textContent = "⏳ Thinking...";
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });
    const data = await response.json();
    answerBox.textContent = data.choices?.[0]?.message?.content || "⚠️ Could not get a response.";
  } catch (err) {
    answerBox.textContent = "❌ Error: " + err.message;
  }
});
