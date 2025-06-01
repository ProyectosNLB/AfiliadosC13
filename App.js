import React, { useRef, useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import logo from "./logo.png";
import "./App.css";

export default function App() {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [dniData, setDniData] = useState({
    apellidoNombre: "",
    numeroDocumento: "",
    fechaNacimiento: ""
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Escaneo en tiempo real con cámara
  useEffect(() => {
    let codeReader;
    if (scanning) {
      codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          const datos = parsePDF417(result.getText());
          setDniData(datos);
          setScanning(false);
          codeReader.reset();
        }
      });
    }
    return () => {
      if (codeReader) codeReader.reset();
    };
  }, [scanning]);

  // Procesamiento de imagen estática
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    const imageBitmap = await createImageBitmap(file);
    const codeReader = new BrowserMultiFormatReader();
    try {
      const result = await codeReader.decodeFromImage(imageBitmap);
      const datos = parsePDF417(result.getText());
      setDniData(datos);
    } catch (err) {
      alert("No se pudo leer el código PDF417 del DNI. Intenta con otra imagen.");
    }
  };

  // Parser básico para PDF417 del DNI argentino (ajustar según formato real)
  function parsePDF417(text) {
    /*
      El texto del PDF417 del DNI argentino puede variar según el modelo, 
      pero normalmente los datos están separados por el carácter "@".
      Ejemplo de cadena ficticia:
      "LOPEZ VITAR@IAN LUCAS@M@AR@43036774@20010304@..."
    */
    let apellidoNombre = "";
    let numeroDocumento = "";
    let fechaNacimiento = "";
    if (text.includes("@")) {
      const parts = text.split("@");
      apellidoNombre = `${parts[0] ?? ""} ${parts[1] ?? ""}`.trim();
      numeroDocumento = parts[4] ?? "";
      fechaNacimiento = formatFecha(parts[5]);
    }
    return { apellidoNombre, numeroDocumento, fechaNacimiento };
  }

  function formatFecha(yyyymmdd) {
    // Convierte "20010304" a "04/03/2001"
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    const anio = yyyymmdd.slice(0, 4);
    const mes = yyyymmdd.slice(4, 6);
    const dia = yyyymmdd.slice(6, 8);
    return `${dia}/${mes}/${anio}`;
  }

  function handleInputChange(e) {
    setDniData({ ...dniData, [e.target.name]: e.target.value });
  }

  return (
    <div className="container">
      <header>
        <img src={logo} alt="Logo La Libertad Avanza" className="logo" />
        <h1>Formulario de Lectura de DNI Argentino</h1>
        <p>
          Escanea o sube una imagen del reverso de tu DNI argentino y extrae automáticamente tus datos.
        </p>
      </header>
      <div className="scanner-section">
        <button
          type="button"
          onClick={() => setScanning((v) => !v)}
          className={scanning ? "stop" : "start"}
        >
          {scanning ? "Detener escaneo" : "Escanear DNI"}
        </button>
        {scanning && (
          <div className="video-container">
            <video ref={videoRef} style={{ width: "100%" }} />
          </div>
        )}
      </div>
      <form className="form" autoComplete="off">
        <label>
          Imagen del reverso del DNI (PDF417):
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="DNI preview" />
          </div>
        )}
        <label>
          Apellido y Nombre:
          <input
            type="text"
            name="apellidoNombre"
            value={dniData.apellidoNombre}
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
      </form>
      <footer>
        <p>Proyecto de ejemplo - Solo para fines educativos</p>
      </footer>
    </div>
  );
}
