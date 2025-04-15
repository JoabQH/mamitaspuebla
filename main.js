document.addEventListener("DOMContentLoaded", function () {
  const message = document.getElementById("message");

  function ajustarHoraConConfig(config) {
    window.TimeSync.init(config, function (statusMsg) {
      message.innerHTML = statusMsg;
    
      config.lastUpdate = new Date().toISOString();
      LocalStorageManager.saveConfig(config);
    });
  }

  ConfigManager.loadConfig()
    .then((config) => {
      ajustarHoraConConfig(config);
    })
    .catch((err) => {
      console.warn("Fallo al cargar config.json:", err);
      message.innerHTML = "Cargando configuración local...";

      LocalStorageManager.loadConfig((error, savedConfig) => {
        if (error) {
          message.innerHTML = "Sin conexión y sin configuración local";
          console.error(error);
        } else {
          ajustarHoraConConfig(savedConfig);
        }
      });
      
    });
    setTimeout(function () {
      console.log("Cerrando la aplicación...");
      tizen.application.getCurrentApplication().exit();
    }, 10000); 

});
