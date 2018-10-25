/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {

  alert(`Markmiðið er að svara eins mörgum af ${GAMES_TO_PLAY} dæmum rétt eins hratt og mögulegt er.`);

  do {
    play();
  } while (confirm(`Viltu spila annan leik?`));
  
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. 
 * 
 * Þegar leik er lokið eða honum er hætt eru birt skilaboð. 
 */
function play() {
    var startGame = new Date();
    var startTime = startGame.getTime();
    let countRight = 0;
    var stopGame = false;

  for(var i = 0; i < GAMES_TO_PLAY; i++) {
    const answer = ask();
    if(answer === null) {
      stopGame = true;
      break;
    }
    if(answer){
      countRight++;      
    }
  }
  showEndResult(startTime, countRight, stopGame);
}

/**
 * Tekur inn startTime sem tölu sem táknar tíma þegar leikmaður byrjaði leikinn. 
 * Tekur inn countRight sem tölu sem segir til um fjölda réttra svara í leiknum. 
 * Tekur inn stopGame sem boolean gildi sem er true ef leikmaður stöðvaði leikinn
 * en false ef leikmaður kláraði að leika leikinn. 
 * 
 * Fallið birtir upplýsingar eftir að leik hefur verið lokið. 
 * Ef notandi hætti í leik með því að ýta á Cancel byrtast skilaboðin "Hætt í leik"
 * Ef notandi klátaði leikinn byrtst upplýsingar um niðurstöðu: 
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 */
function showEndResult(startTime, countRight, stopGame){
  if(stopGame) {
    alert(`Hætt í leik.`);
  } else { 
    var endGame = new Date();
    var endTime = endGame.getTime();

    const totalTime= ((endTime - startTime)/1000); 
    const mean = countRight/totalTime;

    alert(`Þú svaraðir ${countRight} af ${GAMES_TO_PLAY} dæmum rétt á ${totalTime.toFixed(2)} sekúndum. 
Meðalrétt svör á sekúndu eru ${mean.toFixed(2)}`);
  }
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem seinni tala er á bilinu `[2, 10]` og fyrri talan er seinni
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
  const mathFunction = randomNumber(1, 4);

  //Samlanging
  if(mathFunction === 1){
    var fyrstNumber = randomNumber(1, 100);
    var secondNumber = randomNumber(1, 100);
    const input = prompt(`Hvað er ${fyrstNumber} + ${secondNumber}?`);
    //Ef notandi vill hætta í leik
    if(input === null) {return null;}
    //Breytum input út streng í tölu
    const parsedInput = parseGuess(input);
    // Skilum hvort svarið var rétt eða rangt
    return ((parsedInput) === (fyrstNumber + secondNumber));    
  }
  //Frádráttur
  if(mathFunction === 2){
    var fyrstNumber = randomNumber(1, 100);
    var secondNumber = randomNumber(1, 100);
    const input = prompt(`Hvað er ${fyrstNumber} - ${secondNumber}?`);
    if(input === null) {return null;}
    const parsedInput = parseGuess(input);
    return ((parsedInput) === (fyrstNumber - secondNumber));
  }
  //Margföldun
  if(mathFunction === 3){
    var fyrstNumber = randomNumber(1, 10);
    var secondNumber = randomNumber(1, 10);
    const input = prompt(`Hvað er ${fyrstNumber} * ${secondNumber}?`);
    if(input === null) {return null;}      
    const parsedInput = parseGuess(input);
    return ((parsedInput) === (fyrstNumber * secondNumber));
  }
  //Deiling
  var secondNumber = randomNumber(2, 10);
  var fyrstNumber = randomNumber(2, 10)* secondNumber;
  const input = prompt(`Hvað er ${fyrstNumber} / ${secondNumber}?`);
  if(input === null) {return null;}
  const parsedInput = parseGuess(input);
  return ((parsedInput) === (fyrstNumber/secondNumber));
} 

/**
 * Tekur inn input sem streng og skiilar þeirri tölu sem hægt er að ná þar út. 
 * Ef ekki er hægt að ná tölu út input er null skilað. 
 */
function parseGuess(input) {
  const parsed = parseInt(input, 10);

  if (isNaN(parsed)) {
    return null;
  }

  return parsed;
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
