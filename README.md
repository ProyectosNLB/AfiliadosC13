# Formulario Web para Lectura de DNI Argentino (Extracción Selectiva)

## Descripción

Este proyecto tiene como objetivo desarrollar un formulario web que permita leer automáticamente el código de barras PDF417 del reverso del DNI argentino y extraer únicamente los siguientes datos personales:

- Apellido y nombre
- Número de documento
- Fecha de nacimiento

El usuario podrá cargar una imagen del DNI o escanearlo, y el sistema completará los campos del formulario con la información extraída de manera automática.

## Funcionalidades principales

- Interfaz web simple y responsiva.
- Opción para cargar o escanear la imagen del reverso del DNI argentino.
- Decodificación del código de barras PDF417 según el estándar argentino.
- Extracción automática y autocompletado de los campos: apellido y nombre, número de documento, y fecha de nacimiento.
- Permitir corrección manual de los datos en caso de errores de lectura.

## Tecnologías sugeridas

- **Frontend:** HTML5, CSS3, JavaScript (React, Vue, Angular, o Vanilla JS)
- **Librerías para decodificar PDF417:** [zxing-js/library](https://github.com/zxing-js/library), [pdf417-js](https://github.com/jbialobr/pdf417-js) u otra similar.
- **Backend (opcional):** Node.js, Python Flask, etc. (si se requiere procesamiento en servidor)

## Modelo de referencia

Se incluye como ejemplo una imagen del DNI argentino (imagen 1) para guiar el desarrollo y las pruebas del formulario.

---

¡Contribuciones y sugerencias son bienvenidas!