// JavaScript source code

// d�finition des mots fran�ais et anglais, 

let frenchWordRandom ;
let englishWordRandom ;


// fonction newWord pour r�cup�rer de nouveaux mots

    let reponse;
    let apiRequest = new XMLHttpRequest();
    apiRequest.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            reponse = JSON.parse(this.responseText);
            console.log(reponse);

        }
    };

    apiRequest.open("GET", "https://api.sheety.co/eede0453ece453875813dd1ca1a7d3a4/vocabulary/total");
    apiRequest.send();

// ca commence � fonctionner, � voir pour faire un truc pour afficher le bouton tant que l'API n'est pas charg�
// voir pour compl�ter la premier sheet du fichier excel et si l'api est modifi�

function newWord() {
    let arrayPpal = reponse.total;

console.log(arrayPpal); // affiche comme au-dessus
let wordsTotal = arrayPpal.length // r�cup�re la longueur de l'array
console.log(wordsTotal); // affiche la longueur de l'array 

let randomIndex = Math.round(Math.random() * (wordsTotal - 1)); // r�cup�re un chiffre entre 0 et la total de l'array - 1
console.log(randomIndex);
let objectRandom = arrayPpal[randomIndex]; // s�lectionne l'objet correspondant au chiffre al�atoire r�cup�r�
console.log(objectRandom);
frenchWordRandom = objectRandom.frenchWord; // r�cup�re le mot fran�ais 
console.log(frenchWordRandom);
englishWordRandom = objectRandom.englishWord; // r�cup�re le mot anglais 
    console.log(englishWordRandom);
};



// commencer � jouer quand on clique 

let startPlay = document.getElementById('startPlay');
let scoreNb = 0;
let scoreCumuleNb = 0;

startPlay.addEventListener('click',  function (jouer) {
    jouer.preventDefault()

    // lance nouveau mot
    newWord();

    // fait disparaitre le bouton startPlay
    let startPlay = document.getElementById('startPlay');
    startPlay.classList.add('d-none');
    console.log(frenchWordRandom); // renvoie undefined car getWord pas encore lanc�


    // afficher le mot en fran�ais
    var play = document.getElementById('frenchWord');
    play.classList.remove('d-none');
    play.textContent = frenchWordRandom;


    // afficher le bouton "afficher la solution apr�s 1,5 secondes
    function solution() {
        var seeSolution = document.getElementById('seeSolution');
        seeSolution.classList.remove('d-none');
    }
    setTimeout(solution, 1500);
    
});


var showSolution = document.getElementById('seeSolution');
showSolution.addEventListener('click', function (traduction) {
    traduction.preventDefault()
    var traduction = document.getElementById('frenchWord');
    traduction.textContent = englishWordRandom;
    console.log(frenchWordRandom + "deuxi�me test mot fran�ais"); // ici c'est OK
    var hideSolution = document.getElementById('seeSolution');
    hideSolution.classList.add('d-none');

    // afficher les deux boutons avec les icones check et cross
    function btnRondFct() {
        var btnRond = document.getElementById('ifSolution');
        btnRond.classList.remove('d-none');
    }
    setTimeout(btnRondFct, 1000);
});

// mettre les variables scores dans le boutons score

var afficheScore = document.getElementById('score');
afficheScore.textContent = scoreNb;

var afficheScoreCumule = document.getElementById('scoreCumule');
afficheScoreCumule.textContent = scoreCumuleNb;

// quand on clique sur check, change le score et le score cumul�

var resultOk = document.getElementById('ok');

resultOk.addEventListener('click', function (event) {
    event.preventDefault();

    if (scoreCumuleNb < 19) {

        
        // lance nouveau mot
        newWord();

        scoreNb++;
        scoreCumuleNb++;
        var afficheScore = document.getElementById('score');
        afficheScore.textContent = scoreNb;
        var afficheScoreCumule = document.getElementById('scoreCumule');
        afficheScoreCumule.textContent = scoreCumuleNb;
;

        // affichage d'un nouveau mot fran�ais 
        var play = document.getElementById('frenchWord');
        play.textContent = frenchWordRandom;
        play.classList.remove('d-none');

        // afficher le bouton "afficher la solution apr�s 3 secondes
        function solution() {
            var seeSolution = document.getElementById('seeSolution');
            seeSolution.classList.remove('d-none');
        }
        setTimeout(solution, 1500);

        // faire disparatin les boutons check et cross
        var btnRond = document.getElementById('ifSolution');
        btnRond.classList.add('d-none');
    }
    else {
        
       

        scoreNb++;
        scoreCumuleNb++;
        var afficheScore = document.getElementById('score');
        afficheScore.textContent = scoreNb;
        var afficheScoreCumule = document.getElementById('scoreCumule');
        afficheScoreCumule.textContent = scoreCumuleNb;
        // faire disparatin les boutons check et cross
        var btnRond = document.getElementById('ifSolution');
        btnRond.classList.add('d-none');
        function zero() {
        scoreNb = 0;
        scoreCumuleNb = 0;
        let startPlay = document.getElementById('startPlay');
        startPlay.classList.remove('d-none');

        var play = document.getElementById('frenchWord');
        play.textContent = frenchWordRandom;
        play.classList.add('d-none');
        var afficheScore = document.getElementById('score');
        afficheScore.textContent = scoreNb;
        var afficheScoreCumule = document.getElementById('scoreCumule');
            afficheScoreCumule.textContent = scoreCumuleNb;
            
        }
        setTimeout(zero, 2000);

    };
});

// quand on clique sur cross, cela ne change que le score cumul�
var resultNotOk = document.getElementById('notOk');

resultNotOk.addEventListener('click', function (event) {
    event.preventDefault();

    if (scoreCumuleNb < 19) {
       
        // lance nouveau mot
        newWord();
        
        scoreCumuleNb++;
        var afficheScoreCumule = document.getElementById('scoreCumule');
        afficheScoreCumule.textContent = scoreCumuleNb;


        // affichage d'un nouveau mot fran�ais 
        var play = document.getElementById('frenchWord');

        play.textContent = frenchWordRandom;
        play.classList.remove('d-none');

        // afficher le bouton "afficher la solution apr�s 3 secondes
        function solution() {
            var seeSolution = document.getElementById('seeSolution');
            seeSolution.classList.remove('d-none');
        }
        setTimeout(solution, 1500);
        // faire disparatin les boutons check et cross
        var btnRond = document.getElementById('ifSolution');
        btnRond.classList.add('d-none');
    }
    else {
        
        

        scoreCumuleNb++;
        var afficheScore = document.getElementById('score');
        afficheScore.textContent = scoreNb;
        var afficheScoreCumule = document.getElementById('scoreCumule');
        afficheScoreCumule.textContent = scoreCumuleNb;
        // faire disparatin les boutons check et cross
        var btnRond = document.getElementById('ifSolution');
        btnRond.classList.add('d-none');
        function zero() {
            scoreNb = 0;
            scoreCumuleNb = 0;
            let startPlay = document.getElementById('startPlay');
            startPlay.classList.remove('d-none'); 

            var play = document.getElementById('frenchWord');
            play.textContent = frenchWordRandom;
            play.classList.add('d-none');
            var afficheScore = document.getElementById('score');
            afficheScore.textContent = scoreNb;
            var afficheScoreCumule = document.getElementById('scoreCumule');
            afficheScoreCumule.textContent = scoreCumuleNb;
            
        }
        setTimeout(zero, 2000);

    };

});






// reste � int�grer la fonction dans le reste de l'appli
// ajouter des lignes � l'API

