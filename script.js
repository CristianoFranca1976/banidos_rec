const webhookURL =
  "https://banidos-rec.vercel.app/api/sendWebhook";

document
  .getElementById("webhookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const qra = document.getElementById("qra").value.trim();
    const id = document.getElementById("id").value.trim();
    const responsavel = document.getElementById("responsavel").value.trim();
    const responsavelID = document.getElementById("responsavelID").value.trim();
    const motivo = document.getElementById("motivo").value.trim();
    const link = "https://banidos-rec.vercel.app/";

    const content = `
    **Banido Registrado**\n
    **QRA:** ${qra}\n
    **ID:** ${id}\n
    **RESPONSÁVEL:** ${responsavel}\n
    **RESPONSÁVEL ID:** ${responsavelID}\n
    **MOTIVO:** ${motivo}\n\n
    ***${link}***
    `;

    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        username: responsavel, // Nome do usuário no Discord será o que ele preencher no QRA
        avatar_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bras%C3%A3o_Nacional_PCSP.png/1024px-Bras%C3%A3o_Nacional_PCSP.png", // avatar genérico opcional
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Mensagem enviada com sucesso!");
          document.getElementById("webhookForm").reset();
        } else {
          alert("Erro ao enviar a mensagem.");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao enviar a mensagem.");
      });
  });
