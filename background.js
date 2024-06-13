const input = document.querySelector("textarea");
const box = document.getElementById("box");
const key = "U5nAxC97WSQzn6NMOb06Vwtaq72I50jU";

document.getElementById("submit").addEventListener("click", async () => {
  let value = input.value;
  let result;

  await fetch("https://api.ai21.com/studio/v1/paraphrase", {
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "jamba-instruct",
      presence_penalty: 2,
      role: {
        system:
          "You are a chatbot specialized in humanizing texts created by AI, your role is to reformulate texts to resemble a human writing. The text must have the same meaning.",
      },
      text: value,
      style: "general",
      temperature: 2,
    }),
    method: "POST",
  }).then((res) =>
    res.json().then((json) => (result = json.suggestions[0].text))
  );

  box.appendChild(document.createElement("button")).setAttribute("id", "copy");
  document.getElementById("copy").appendChild(document.createTextNode("Copy"));
  document
    .getElementById("copy")
    .setAttribute(
      "class",
      "mt-4 w-2/6 font-poppins font-bold bg-white rounded-full text-hiapurple"
    );
  document.getElementById("copy").addEventListener("click", async () => {
    await navigator.clipboard.writeText(result);
  });
});
