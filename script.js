let currentSection = 0;
const sections = document.querySelectorAll('.survey-section');

// Navegación entre secciones
function navigate(direction) {
    if (validateSection(currentSection)) {
        sections[currentSection].classList.remove('active');
        direction === 'next' ? currentSection++ : currentSection--;
        updateProgress();
        sections[currentSection].classList.add('active');
    }
}

// Validación de sección
function validateSection(sectionIndex) {
    const inputs = sections[sectionIndex].querySelectorAll('[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });
    
    return isValid;
}

// Añadir filas a tablas
function addFuenteRow() {
    const table = document.getElementById('fuentes-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.innerHTML = `
        <td>
            <select class="form-control" required>
                <option value="">Seleccione...</option>
                <option>Interna</option>
                <option>Externa</option>
            </select>
        </td>
        <td>
            <select class="form-control">
                <option value="">N/A</option>
                <option>Caja de Compensación</option>
                <!-- Más opciones -->
            </select>
        </td>
        <td>
            <select class="form-control" required>
                <option value="">Seleccione...</option>
                <option>1%-25%</option>
                <!-- Más opciones -->
            </select>
        </td>
        <td>
            <button class="btn-remove" onclick="deleteRow(this)">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
}

// Exportar a Excel
function exportToExcel() {
    const data = [];
    // Lógica para recolectar datos
    const csvContent = "data:text/csv;charset=utf-8," + data.map(row => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "encuesta_bienestar.csv");
    document.body.appendChild(link);
    link.click();
}

// Actualizar progreso
function updateProgress() {
    const progress = (currentSection / (sections.length - 1)) * 100;
    document.getElementById('progressBar').style.width = progress + "%";
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    sections[0].classList.add('active');
    updateProgress();
});