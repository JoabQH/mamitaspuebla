window.LocalStorageManager = {
    saveConfig: function (config) {
      try {
        const documentsDir = tizen.filesystem.resolve('documents');
        documentsDir.listFiles(function(files) {
          const existingFile = files.find(file => file.name === 'saved_config.json');
          if (existingFile) {
            existingFile.parent.deleteFile('saved_config.json');
          }
          const file = documentsDir.createFile('saved_config.json');
          file.openStream(
            'w',
            function (stream) {
              stream.write(JSON.stringify(config));
              stream.close();
              console.log("Configuración guardada localmente");
            },
            function (e) {
              console.error("Error al escribir configuración:", e.message);
            },
            'UTF-8'
          );
        });
      } catch (err) {
        console.error("Error al acceder al sistema de archivos:", err.message);
      }
    },
  
    loadConfig: function (callback) {
      try {
        tizen.filesystem.resolve(
          'documents/saved_config.json',
          function (file) {
            file.readAsText(function (str) {
              try {
                const config = JSON.parse(str);
                callback(null, config);
              } catch (e) {
                callback("JSON inválido");
              }
            });
          },
          function () {
            callback("No existe configuración guardada");
          },
          'r'
        );
      } catch (err) {
        callback("Error accediendo a archivo: " + err.message);
      }
    }
  };
  
