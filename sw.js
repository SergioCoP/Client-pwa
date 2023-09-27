console.log('SERVICEWORKWER');
///libreria de http-server npm i -g http-server
self.addEventListener('install',e=>{
    console.log("Instalado") 
})

self.addEventListener('activate',e=>{
    console.log("Activado")
})

self.addEventListener('fetch',e=>{
    console.log(e.request);
    if(e.request.url.includes('descarga.jpg')){
        e.respondWith(fetch('img/fondo.jpg'))
    }else{
        e.respondWith(fetch(e.request))
    }
  
})

self.addEventListener('push',e=>{
    console.log("Notificación push")
})

self.addEventListener('sync',e=>{
    console.log("SYNC EVENT")
})