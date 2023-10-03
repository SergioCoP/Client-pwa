console.log('APPJS')
const url = window.location.href;
const API = `http://localhost:3000/api`;
let sWlocation = '/reportes/sw.js';
if(navigator.serviceWorker){
    if(url.includes('localhost') || url.includes('127.0.0.1')){
        sWlocation = '/sw.js';
    }
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register(sWlocation).then((reg)=>{
            //Code
        });
    })
    
}