/**
 * file: js.js
 * purpose: interactivity
 **/
console.log("Stardate 235678.89: JavaScript from js/js.js is up and running.");

/*
Jeg bruge en Jq til at bruge window.scroll metoden i en function til at på en scroll, værdi på sitet
 her efter laver en en variable som har denne værdi i sig, den tager via dommen "background-size: som er sat til 100 og + værdien fra scroll - oversat til procent.
 Det skaber zoom effekt på det bagerste billede på starten af skærmen*/
var start = 100;

$(window).scroll(function() {
  var scrollPos = $(this).scrollTop();
  $(".hero-back").css({
    "background-size": 100 + scrollPos + 10 + "%"
  });
  //console.log(scrollPos);
});

/*
Funktion for at finde en værdi, for hvor meget der bliver scrolllet i vinduet, 
hermed kan jeg via opcity ( css value)* med mængden af scrolls ( via scrollPos) 
og gør filmen gradvist synlig
*/

$(window).scroll(function() {
  var scrollPos = $(this).scrollTop();
  $(".video").css({
    opacity: 0.01 + scrollPos / 200
  });
});

/*
Document.getelemtbyclass -> henter via dommen "billedskift"
intervals functionnen er et loop, så går igennem alle objecterne i billedskift et og laver et array af slides
Der bliver loopet ingennem, cia v i =0; i < slides.lenght; ++1
når tallet i, som starter på 0 bliver større en længden på arrayet, skifter I til 0 og dermed kommer opacity også ned til 0 igen.
*/

///////////////////////////////////////////////

var current = 0,
  slides = document.getElementsByClassName("billedeskift1");

setInterval(function() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0;
  }
  current = current != slides.length - 1 ? current + 1 : 0;
  slides[current].style.opacity = 1;
}, 3000);

/////////////////

/*
jeg har to variabler, som jeg store igennem dommen ( billede2, Billede3)
Via en evnetlistner som lytter efter scroll, ( y værdi på siden), kan jeg bruge This.scrollY til at 
bruge metoden translate3d ( px, px, px) til at bevæge billederne, når der scrolles. Scroll, værdien gange jeg med 0.4, for at mindske den ønskede værdig i Px
*/

var moveScroll = document.getElementById("billede2");
var moveScroll1 = document.getElementById("billede3");

window.addEventListener("scroll", function(event) {
  var scroll = this.scrollY * 0.4;
  console.log(scroll);
  moveScroll.style.transform = "translate3d(0px, -" + scroll + "px, 0px)";
});

////////////
/* øger hastigheden på billedet ved at ændre this.scrolly  gange 0.8 */
window.addEventListener("scroll", function(event) {
  var scroll2 = this.scrollY * 0.8;
  console.log(scroll);
  moveScroll1.style.transform = "translate3d(0px, -" + scroll2 + "px, 0px)";
});

////////////////////////////////////////////

$(function() {
  var sliding = (startClientX = startPixelOffset = pixelOffset = currentSlide = 0);
  slideCount = $(".slide").length;

  $("html").on("mousedown touchstart", slideStart);
  $("html").on("mouseup touchend", slideEnd);
  $("html").on("mousemove touchmove", slide);

  /**
  / Triggers when slide event started
  */
  function slideStart(event) {
    if (event.originalEvent.touches) event = event.originalEvent.touches[0];
    if (sliding == 0) {
      sliding = 1;
      startClientX = event.clientX;
    }
  }

  /** Occurs when image is being slid.
   */
  function slide(event) {
    event.preventDefault();
    if (event.originalEvent.touches) event = event.originalEvent.touches[0];
    //  hvor lang slides der
    var deltaSlide = event.clientX - startClientX;
    if (sliding == 1 && deltaSlide != 0) {
      sliding = 2; // staus for hvornår der bevæges
      startPixelOffset = pixelOffset; // x værdien bliver gemt
    }

    //  Når der bliver bevæget et billlede
    if (sliding == 2) {
      // her bevæges billedet med en px - når mussen bevæges med 1px
      var touchPixelRatio = 1;
      // Er tjekker jeg om vi stadig er idenfor boksen, som hives i
      if (
        (currentSlide == 0 && event.clientX > startClientX) ||
        (currentSlide == slideCount - 1 && event.clientX < startClientX)
      )
        // hver gang at useren flytter musen med 1px , rykkes billedet med 3px - rubberband
        touchPixelRatio = 3;
      // hvor lang flyttes der
      pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
      // tilføjer css classes for bevægekse translate og transform
      $("#slides")
        .css("transform", "translateX(" + pixelOffset + "px")
        .removeClass();
    }
  }

  function slideEnd(event) {
    if (sliding == 2) {
      // genstart sliding
      sliding = 0;
      // her udregnes hvilken slide der skal være i view
      currentSlide =
        pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
      // Her sikre jeg mig at de slides man ikke kan se ikke kan vælges
      currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
      // Fordi at slide er i Full viewport, skal jeg være sikker på at sliden dækker omårdet, der kan trykkes på.
      pixelOffset = currentSlide * -$("body").width();
      // Reset dom.. Slide
      $("#temp").remove();
      // JQ bruges til at tilføje translate x value
      $(
        '<style id="temp">#slides.animate{transform:translateX(' +
          pixelOffset +
          "px)}</style>"
      ).appendTo("head");
      // Her adder jeg så css - class - animate og transform til " slides"
      $("#slides")
        .addClass("animate")
        .css("transform", "");
    }
  }
});

//JEsson tekst to speeech!

//tekster der skal vises på browseren
const words = [
  "Det faglige kan man få alle steder",
  "Universitetet, gymnasiet, folkeskolen",
  "Det personlige, hvem man er",
  "Forskellige talenter blandt folk",
  "Det findes her",
  "Og man finder ud af hvem man er"
];

let count = 0; //tæller hver sætning en ad gang
let index = 0; // tæller hver ord en ad gang
let textSentence = ""; // teksten der bliver valgt - når funktionen går igang
let charText = ""; // hver bogstave skal være -når funktion går igang

//(self invoking function) indlæser objekter og aktiver samtid - hele funktion sat op i en start og lukket () parantese

(function writing() {
  //if statement for hvis antallet af index passer samme med længde af teksten så hele indhold vises med start fra 0 ved index

  if (count === words.length) {
    count = 0;
  }
  textSentence = words[count];
  // alle bogstaver passe sammen med teksten indhold, går videre til næste tekst
  charText = textSentence.slice(0, ++index);

  // printer resultaten på browseren på hver tekst indhold
  document.querySelector("#typing").textContent = charText;
  if (charText.length === textSentence.length) {
    count++;
    index = 0;
  }
  //putter og kalder hele funktion med skriving på 100 milisekond
  setTimeout(writing, 100);
})();

//onload lyd

var clickFunction = function() {
  var mySound = document.getElementById("tale"); // select audio id
  console.log("tale"); // test

  if (tale) {
    // if the #lyd div is visible then
    if (!(mySound.curentTime > 0)) {
      mySound.play(); // play audio
    }
  } else {
    mySound.pause();
    mySound.currentTime = 0; // rewind the sound
  }
  window.removeEventListener("scroll", clickFunction, false);
};
window.addEventListener("scroll", clickFunction, false);

////////////////In view video start/
