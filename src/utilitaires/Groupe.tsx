export default class Groupe{
    idG: number;
    nomG: string;
    descriptionG: string;
    datePassage: string;
    heurePassage: string;
    isSaved: boolean = false;
    genresMusicaux: string[] = [];
    scene: string = "";

    constructor(idG: number, nomG: string, descriptionG: string, datePassage: string, heurePassage: string) {
        this.idG = idG;
        this.nomG = nomG;
        this.descriptionG = descriptionG;
        this.datePassage = datePassage;
        this.heurePassage = heurePassage;
    }

    static getJourPassage(laDate: string, lowerCase?: boolean) : string {
        // on a ça: 2024-07-21 on veut le convertir en 21 juillet, comment faire
        const date = new Date(laDate)
        const jour = date.getDate()
        const mois = date.getMonth()

        const moisEnLettre = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout","Septembre", "Octobre", "Novembre", "Décembre"]

        return `${jour} ${lowerCase ? moisEnLettre[mois] : moisEnLettre[mois].toUpperCase()}`
    }

    static getHeurePassage(heure: string) : string{
        const timeParts = heure.split(':');
        return timeParts.slice(0, 2).join(':');
    }
}