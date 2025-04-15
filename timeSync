window.TimeSync = {
  init: function (config, onStatus) {
    const { lat, lng, expectedTimezone } = config;
    const apiUrl = `https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lng}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);

            if (!data.dateTime || !data.timeZone) {
              throw new Error("Respuesta inválida de timeapi.io");
            }

            const utcTime = luxon.DateTime.fromISO(data.dateTime, {
              zone: data.timeZone,
            }).toUTC();

            const targetTime = utcTime.setZone(expectedTimezone);

            const currentLocalTime = new Date();
            const adjustedDate = new Date(targetTime.toISO());

            const info = `
              Hora actual: ${currentLocalTime.toLocaleString()}<br>
              Nueva hora: ${adjustedDate.toLocaleString()}<br>
              Zona ajustada: ${expectedTimezone}
            `;

            console.log("Hora ajustada a:", adjustedDate.toString());

  
            try {
              tizen.time.setCurrentDateTime(adjustedDate);
              if (onStatus) onStatus(info + "<br>Hora ajustada correctamente");
            } catch (e) {
              console.error("Error al ajustar la hora:", e);
              if (onStatus) {
              
                onStatus(info + "<br><span style='color:orange'>Simulación: no se puede ajustar hora en emulador</span>");
              }
            }
          } catch (err) {
            console.error("Error al procesar la respuesta:", err);
            if (onStatus) onStatus("Error al procesar respuesta");
          }
        } else {
          console.error("Error al consultar timeapi.io:", xhr.status);
          if (onStatus) onStatus("Error al consultar timeapi.io");
        }
      }
    };

    xhr.send();
  },
};
