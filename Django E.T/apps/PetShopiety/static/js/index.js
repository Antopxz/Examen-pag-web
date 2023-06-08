//mapa apiss
function iniciarMap() {
  var coord = { lat: -33.500076234144586, lng: -70.61586364889015 };
  var map = new google.maps.Map(document.getElementById('mapa'), {
    zoom: 15,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}
//MODO OSCURO SCRIPT 

if (localStorage.getItem('theme') == 'dark') {
  setDarkMode();
  if (document.getElementById('checkbox').checked) {
    localStorage.setItem('checkbox', true)

  }

}
function setDarkMode() {
  let isDark = document.body.classList.toggle('darkmode');
  if (isDark) {
    setDarkMode.checked = true;
    localStorage.setItem('theme', 'dark')
    document.getElementById('checkbox').setAttribute('checked', 'checked');

  } else {
    setDarkMode.checked = true;
    localStorage.removeItem('theme', 'dark');
  }

}



//boton to top 
let mybutton = document.getElementById("btn-back-to-top");

// Al bajar 20px la pag aparecera el boton.
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// Boton BACK TO TOP PA ARRIBA
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//RELOJ DIGITAL TIME

function updateClock() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let ampm = hour >= 12 ? 'PM' : 'AM';

  // Convertir a formato 12 horas
  hour = hour % 12;
  hour = hour ? hour : 12;

  // Agregar un cero inicial si el número es menor a 10
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  // Actualizar la hora
  document.getElementById('clock').innerHTML = hour + ':' + minute + ':' + second;
  document.getElementById('ampm').innerHTML = ampm;

  // Actualizar la fecha
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let today = new Date();
  let date = today.toLocaleDateString('es-ES', options);
  document.getElementById('date').innerHTML = date;

  // Llamar a esta función cada segundo
  setTimeout(updateClock, 1000);
}

updateClock(); // Para iniciar la función
