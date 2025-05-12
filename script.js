const lista = document.getElementById("lista");
const totalA = document.getElementById("DianaM");
const totalB = document.getElementById("Angela");

const fechas = [];
let currentDate = new Date("2025-05-26");
for (let i = 0; i < 28; i++) {
    fechas.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 7);
}

function guardarEstado(fechaStr, persona, valor) {
    localStorage.setItem(fechaStr + "_" + persona, valor);
    calcularTotales();
}

function cargarEstado(fechaStr, persona) {
    return localStorage.getItem(fechaStr + "_" + persona) === "true";
}

function cargarComentario(fechaStr) {
    return localStorage.getItem(fechaStr + "_comentario") || "";
}

function guardarComentario(fechaStr, texto) {
    localStorage.setItem(fechaStr + "_comentario", texto);
}

function calcularTotales() {
    let total1 = 0, total2 = 0;
    fechas.forEach(fecha => {
        const key = fecha.toISOString().split("T")[0];
        if (cargarEstado(key, "A")) total1 += 50000;
        if (cargarEstado(key, "B")) total2 += 50000;
    });
    totalA.textContent = "$" + total1.toLocaleString();
    totalB.textContent = "$" + total2.toLocaleString();
}

fechas.forEach(fecha => {
    const fechaStr = fecha.toISOString().split("T")[0];
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
        <strong>${fechaStr}</strong><br>
        <label><input type="checkbox" id="${fechaStr}_A"> Pagó Persona A</label>
        <label><input type="checkbox" id="${fechaStr}_B"> Pagó Persona B</label>
        <label>Comentario:<br><textarea id="${fechaStr}_comentario"></textarea></label>
    `;
    lista.appendChild(div);

    const checkA = document.getElementById(`${fechaStr}_A`);
    const checkB = document.getElementById(`${fechaStr}_B`);
    const comentario = document.getElementById(`${fechaStr}_comentario`);

    checkA.checked = cargarEstado(fechaStr, "A");
    checkB.checked = cargarEstado(fechaStr, "B");
    comentario.value = cargarComentario(fechaStr);

    checkA.addEventListener("change", () => guardarEstado(fechaStr, "A", checkA.checked));
    checkB.addEventListener("change", () => guardarEstado(fechaStr, "B", checkB.checked));
    comentario.addEventListener("input", () => guardarComentario(fechaStr, comentario.value));
});

calcularTotales();
