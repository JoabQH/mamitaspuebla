document.addEventListener("DOMContentLoaded", function () {
    const message = document.getElementById("message");
    const logPanel = document.getElementById("logPanel");
  
    function ajustarHoraConConfig(config) {
      window.TimeSync.init(config, function (statusMsg) {
        message.innerHTML = statusMsg;
        config.lastUpdate = new Date().toISOString();
        LocalStorageManager.saveConfig(config);
        LogManager.writeLog("Hora sincronizada correctamente.");
      });
    }
  
    ConfigManager.loadConfig()
      .then((config) => {
        LogManager.writeLog("Configuración cargada desde config.json.");
        ajustarHoraConConfig(config);
      })
      .catch((err) => {
        LogManager.writeLog("Fallo al cargar config.json: " + err);
        message.innerHTML = "Cargando configuración local...";
        LocalStorageManager.loadConfig((error, savedConfig) => {
          if (error) {
            message.innerHTML = "Sin conexión y sin configuración local";
            LogManager.writeLog("Error cargando configuración local: " + error);
          } else {
            LogManager.writeLog("Configuración cargada desde almacenamiento local.");
            ajustarHoraConConfig(savedConfig);
          }
        });
      });
  
    setTimeout(function () {
      console.log("Cerrando la aplicación...");
      LogManager.writeLog("Aplicación cerrada automáticamente tras sincronización.");
      tizen.application.getCurrentApplication().exit();
    }, 10000);
  });
  
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 403) { // Tecla roja
      const logPanel = document.getElementById("logPanel");
      const message = document.getElementById("message");
  
      if (logPanel.style.display === "none") {
        LogManager.readLog(function (contenido) {
          logPanel.innerHTML = typeof contenido === "string" ? contenido : "No hay logs.";
          logPanel.style.display = "block";
          message.style.display = "none";
        });
      } else {
        logPanel.style.display = "none";
        message.style.display = "block";
      }
    }
  });
  
