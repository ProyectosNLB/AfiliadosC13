import React, { useRef, useState } from "react";
import "./App.css";
import logo from "./logo.png";

function App() {
  const fileInputRef = useRef(null);
  const [dniData, setDniData] = useState({
    apellido: "",
    nombre: "",
    numeroDocumento: "",
    fechaNacimiento: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Simulación de decodificación PDF417 (reemplazar por integración real)
  const mockDecodePDF417 = async (file) => {
    // Aquí iría la integración real con una librería como zxing-js/library
    // Por ahora, este mock devuelve datos de ejemplo
    return {
      apellido: "LOPEZ VITAR",
      nombre: "IAN LUCAS",
      numeroDocumento: "43.036.774",
      fechaNacimiento: "04/03/2001", // dd/mm/yyyy
    };
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    // Decodificar PDF417 (simulación)
    const data = await mockDecodePDF417(file);
    setDniData(data);
  };

  const handleInputChange = (e) => {
    setDniData({
      ...dniData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <header>
        <img src={logo} alt="Logo La Libertad Avanza" className="logo" />
        <h1>Formulario de Lectura de DNI Argentino</h1>
        <p>
          Subí una imagen del reverso de tu DNI argentino y extrae automáticamente tus datos.
        </p>
      </header>
      <form className="form">
        <label>
          Imagen del reverso del DNI (PDF417):
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="DNI preview" />
          </div>
        )}
        <label>
          Apellido:
          <input
            type="text"
            name="apellido"
            value={dniData.apellido}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={dniData.nombre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Número de Documento:
          <input
            type="text"
            name="numeroDocumento"
            value={dniData.numeroDocumento}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Fecha de Nacimiento (día/mes/año):
          <input
            type="text"
            name="fechaNacimiento"
            value={dniData.fechaNacimiento}
            onChange={handleInputChange}
            placeholder="dd/mm/aaaa"
          />
        </label>
        <button type="submit" disabled>
          Enviar
        </button>
      </form>
      <footer>
        <p>
          Proyecto de ejemplo - Solo para fines educativos
        </p>
      </footer>
    </div>
  );
}

export default App;