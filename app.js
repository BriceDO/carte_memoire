const cartes = document.querySelectorAll('.carte');

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verrouillage = false;

cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})

function retourneCarte() {

    // On s'assure qu'on ait pas déjà cliqué sur deux cartes
    if(verrouillage === true) return;

    // childNodes cible les noeuds enfants
    // this.childNodes[1] cible la div double face parce que les retours à la ligne sont comptés en tant que texte
    // On va faire prendre la classe active sur la div double de la carte sur laquelle on vient de cliquer
    this.childNodes[1].classList.toggle('active');

    if(!carteRetournee){

        // on passe à true pour empecher de revenir à cette condition vu que carteRetournee que ce sera déjà true
        // la condition sera exécutée une fois sur deux
        carteRetournee = true;

        // on donne à premiereCarte la carte sur laquelle on vient de cliquer
        premiereCarte = this;
        return

    }

    // La deuxième carte sera également stockée
    carteRetournee = false;
    secondeCarte = this;

    correspondance();

}

function correspondance(){

    // Si les deux cartes correspondent, on ne pourra plus cliquer dessus
    if(premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')) {

        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);

    } else {
        // Si cela ne fonctionne pas, on laisse les deux cartes visibles 1,5sec et dévérouille et les retourne après
        verrouillage = true;
        setTimeout(() => {

            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');

            verrouillage = false;
        }, 1500)
    }

}

function aleatoire() {

    // position aleatoire des cartes
    carte.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })

}