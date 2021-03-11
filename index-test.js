// JavaScript source code

// définition des mots français et anglais, 

let frenchWordRandom ;
let englishWordRandom;
let play = document.getElementById("play");




async function test(){
if (localStorage.getItem("berthotVocab2") === null) { // si la clé berthotvocab n'est pas créé // équivalent panier vide
    return fetch("https://api.sheety.co/eede0453ece453875813dd1ca1a7d3a4/vocabulary/total")
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            return reponse_json = JSON.stringify(data); // transforme en texte l'array reponse    
            
        })
        .catch(function (error) {
            console.log("erreur de chargement de l'API" + error);
        })
}
};

let vocablist;

async function test2() {
    const result = await test();
    localStorage.setItem("berthotVocab3", result); // le met dans le local storage
    vocablist = JSON.parse(localStorage.getItem("berthotVocab3"));
    console.log(vocablist);
}

test2();

// si je clique vite sur le bouton commencer avant que l'API soit chargée, cela ne fonctionnera pas


/*

let vocablist;

async function init() {
    if (localStorage.getItem("berthotVocab3") === null) {
        const response = await fetch('https://api.sheety.co/eede0453ece453875813dd1ca1a7d3a4/vocabulary/total');
        const response_json = await response.json();
        localStorage.setItem("berthotVocab3", JSON.stringify(response_json));
        vocablist = await JSON.parse(localStorage.getItem("berthotVocab3")); // récupère berthot dans le localStorage et le transforme en JSON
        play.classList.remove("d-none");
        
    }
    else {
        vocablist = JSON.parse(localStorage.getItem("berthotVocab3")); // récupère berthot dans le localStorage et le transforme en JSON
        play.classList.remove("d-none");
    }
};



init();


console.log("test récup vocablist " + vocablist);
*/

play.classList.remove("d-none");

// fonction newWord pour récupérer de nouveaux mots
 
function newWord() {


    
let arrayPpal = vocablist.total;

console.log(arrayPpal); // affiche comme au-dessus
let wordsTotal = arrayPpal.length // récupère la longueur de l'array
console.log(wordsTotal); // affiche la longueur de l'array 

let randomIndex = Math.round(Math.random() * (wordsTotal - 1)); // récupère un chiffre entre 0 et la total de l'array - 1
console.log(randomIndex);
let objectRandom = arrayPpal[randomIndex]; // sélectionne l'objet correspondant au chiffre aléatoire récupéré
console.log(objectRandom);
frenchWordRandom = objectRandom.frenchWord; // récupère le mot français 
console.log(frenchWordRandom);
englishWordRandom = objectRandom.englishWord; // récupère le mot anglais 
    console.log(englishWordRandom);
};



// commencer à jouer quand on clique 

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
    console.log(frenchWordRandom); // 


    // afficher le mot en français
    var play = document.getElementById('frenchWord');
    play.classList.remove('d-none');
    play.textContent = frenchWordRandom;


    // afficher le bouton "afficher la solution après 1,5 secondes
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
    console.log(frenchWordRandom + "deuxième test mot français"); 
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

// quand on clique sur check, change le score et le score cumulé

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

        // affichage d'un nouveau mot français 
        var play = document.getElementById('frenchWord');
        play.textContent = frenchWordRandom;
        play.classList.remove('d-none');

        // afficher le bouton "afficher la solution après 3 secondes
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

// quand on clique sur cross, cela ne change que le score cumulé
var resultNotOk = document.getElementById('notOk');

resultNotOk.addEventListener('click', function (event) {
    event.preventDefault();

    if (scoreCumuleNb < 19) {
       
        // lance nouveau mot
        newWord();
        
        scoreCumuleNb++;
        var afficheScoreCumule = document.getElementById('scoreCumule');
        afficheScoreCumule.textContent = scoreCumuleNb;


        // affichage d'un nouveau mot français 
        var play = document.getElementById('frenchWord');

        play.textContent = frenchWordRandom;
        play.classList.remove('d-none');

        // afficher le bouton "afficher la solution après 3 secondes
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







