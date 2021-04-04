// variables for game logic

let words = ["mikorleszdndbucsi", "könyv", "alma", "kertész", "ceruza", "liba", "metró", "kávé", "kémia", "szó", "tavasziszünet"];
let random = Math.floor(Math.random() * (words.length)); 
let megoldas = words[random];
let megoldnyilv = "";
let hibak = 0;
let hibalista = []
let ill = document.getElementById("illusztracio");
let feladva = document.getElementById("feladv");
let hibakelem = document.getElementById("hibak");
let hibalistaelem = document.getElementById("hibalista");

//variables for timer

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
let interv = setInterval(setTime, 1000);

//------------Timer---------------

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function stopTimer(){
  clearInterval(interv);
}

//-------------Game logic-------------

function feladvanyGenerator(){
  for(let i = 0; i < megoldas.length; i++) {
    megoldnyilv += "#";
  }
  feladva.innerHTML = "A feladvány: " + megoldnyilv
}

function Tipp(){
  if(hibalista.indexOf(document.getElementById("megoldas").value) != -1){
    alert("Ezt már egyszer tippelted és akkor sem volt jó! :c")
  } else {
    if(document.getElementById("megoldas").value.length == 1){
      let van = false
      let kar = document.getElementById("megoldas").value;
      console.log(megoldas) //ezt ki kéne majd törölni tho
      for(let i = 0; i < megoldas.length;i++) {
        if(kar == megoldas[i]){
          megoldnyilv = megoldnyilv.substring(0,i) + kar + megoldnyilv.substring(i+1,megoldas.length)
          feladva.innerHTML = "A feladvány: " + megoldnyilv

          van = true;
        }
      }
        if(!van){
        alert("Ez a karakter nem szerepel a szóban!")
        hibalista.push(document.getElementById("megoldas").value)
        hibalistaelem.innerHTML += hibalista[hibak] + ", "
        hibak++
        hibakelem.innerHTML = "Hibás tippek száma: " + hibak
        if(hibak==11){
          alert("Vesztettél! :(")
          document.getElementById("kuldes").disabled = true;
          stopTimer()
        }
        ill.src = "src/af" + hibak + ".png"
      }
      if(megoldas == megoldnyilv){
            alert("Győztél!")
            stopTimer()
            document.getElementById("kuldes").disabled = true;
      }
    }
    else {
      alert("Írj be valamit!")
    }
  }
}

function newGame(){
  random = Math.floor(Math.random() * (words.length)); 
  megoldas = words[random];
  megoldnyilv = "";
  hibak = 0;
  hibakelem.innerHTML = "Hibás tippek száma: " + hibak
  hibalista = []
  hibalistaelem.innerHTML = "Hibás betűk: "
  totalSeconds = 0;
  feladvanyGenerator();
  setTime();
  document.getElementById("kuldes").disabled = false;
  ill.src = "src/af0.png"
}

//----------működés és annak hiánya-----------

feladvanyGenerator();