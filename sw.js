console.log('SERVICEWORKWER');

const STATIC = 'staticv1';
const STATIC_LIMIT = 15;
const INMUTABLE = 'inmutablev1';
const DYNAMIC = 'dynamic1';
const DYNAMIC_LIMIT = 30;

  //Todos los recursos propios de la aplicacion
  const APP_SHELL = [
    '/',
    '/index.html',
    'css/styles.css', 
    'img/fondo.jpg',
    'js/app.js'
];
//Todos aquellos recursos que nunca cambian
const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
];

///libreria de http-server npm i -g http-server
self.addEventListener('install',e=>{
    //e.skipWaiting();//se activa automaticamente el serviceworker
    console.log("Instalado") 
    const staticCache =caches.open(STATIC).then(cache=>{
        cache.addAll(APP_SHELL);
    }) //se obtiene apartado de static en cache
    const inmutableCache =caches.open(INMUTABLE).then(cache=>{
        cache.addAll(APP_SHELL_INMUTABLE);
    }) //se obtiene apartado de static en cache
    e.waitUntil(Promise.all([staticCache,inmutableCache])); //esperar a que se guarden los recursos
})

self.addEventListener('activate',e=>{
    console.log("Activado")
})

self.addEventListener('fetch',e=>{
//1. Cache Only
//e.respondWith(caches.match(e.request));//hace que url de request haga match con lo que hay en cache

//2. Cache with network fallback
// const source = caches.match(e.request).then(res=>{
//     if(res) return res;
//     return fetch(e.request).then(resFetch => {
//         caches.open(DYNAMIC).then(cache=>{//en cache dinamico por no saber si es inmutable o no el cache
//             cache.put(e.request,resFetch)
//         });
//         return resFetch.clone()//retornar la respuesta clonandola
//     });
// });
// e.respondWith(source);

//3. Network with cache fallback
// const source = fetch(e.request).then(res=>{
//     if(!res) throw Error("NotFound");
//     //validar si el recurso ya existe en algun cache
//     caches.open(DYNAMIC).then(cache=>{
//         cache.put(e.request,res);//meter una validacion extra
//     });
//     return res.clone();
// }).catch(err=>{
//     return caches.match(e.request);
// });
// e.respondWith(source);


//4.Cache with network update//aplicacion siempre actualizada
//si no esta en cache lo agrega
//para rendimiento critico, si el rendimiento es bajo.
//Toda la aplicacion mesta un paso atras.
//Siempre devuelve desde cache lo antiguo
if(e.request.url.includes('bootstrap')){
    return e.respondWith(caches.match(e.request));
    const source = caches.open(STATIC).then(cache=>{
        fetch(e.request).then(res=>{
            cache.put(e.request,res);
        });
        return cache.match(e.request);
    });
    e.respondWith(source);
}
});

self.addEventListener('push',e=>{
    console.log("Notificación push")
})

self.addEventListener('sync',e=>{
    console.log("SYNC EVENT")
})