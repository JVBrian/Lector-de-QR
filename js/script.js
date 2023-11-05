// Constantes
const wrapper = document.querySelector(".wrapper"),
  form = document.querySelector("form"),
  infoText = form.querySelector("p"),
  fileInp = form.querySelector("input"),
  closeBtn = document.querySelector(".close"),
  copyBtn = document.querySelector(".copy");

// Consumo de la API
function fetchRequest(file, formData) {
  infoText.innerText = "Escaneando...";
  fetch("https://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  }).then((res) =>
    res
      .json()
      .then((result) => {
        result = result[0].symbol[0].data;
        infoText.innerText = result
          ? "Se ha subido la imagen"
          : "No se ha subido la imagen";
        if (!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
      })
      .catch(() => {
        infoText.innerText = "Se ha producido un error";
      })
  );
}

// Función para capturar los datos
fileInp.addEventListener("change", async (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(file, formData);
});

// Función para mostrar la imágen
form.addEventListener("click", () => fileInp.click());

// Función para copiar
copyBtn.addEventListener("click", () => {
  let text = document.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});

// Función para cerrar
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
