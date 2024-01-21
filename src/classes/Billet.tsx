import Artiste from "./Artiste";
import Groupe from "./Groupe";

function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function(txt: string): string {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export default class Billet{
    dateDebutB: string;
    dateFinB: string;
    idB: number;
    duree: number;
    prix: number;
    quantite: number;

    constructor(dateDebutB: string, dateFinB: string, idB: number, duree: number, prix: number, quantite: number) {
        this.dateDebutB = dateDebutB;
        this.dateFinB = dateFinB;
        this.idB = idB;
        this.duree = duree;
        this.prix = prix;
        this.quantite = quantite;
    }

    static getDate(billet:Billet):string{
        // si c'est un billet un jour on retourne la date de début
        // sinon o nretourne la date de début et la date de fin
        if(billet.duree === 1){
            return toTitleCase(Groupe.getJourPassage(billet.dateDebutB));
        }
        else{
            return toTitleCase(Groupe.getJourPassage(billet.dateDebutB)) + " - " + toTitleCase(Groupe.getJourPassage(billet.dateFinB));
        }
    }
}
