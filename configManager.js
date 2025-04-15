const ConfigManager = {
    loadConfig: function () {
      return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open("GET", "config.json", true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
              try {
                const config = JSON.parse(xhr.responseText);
                resolve(config);
              } catch (e) {
                reject("JSON mal formado");
              }
            } else {
              reject("No se pudo cargar config.json");
            }
          }
        };
        xhr.send();
      });
    },
  };
