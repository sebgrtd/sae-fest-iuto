export default class Artiste {
    idMG: number;
    idG: number;
    nomMG: string;
    prenomMG: string;
    nomDeSceneMG: string;
    horairePassage: string;
    datePassage: string;
    genresMusicaux: string[];
    scene: string;

    constructor(idMG: number, idG: number, nomMG: string, prenomMG: string, nomDeSceneMG: string, horairePassage: string, datePassage: string, genresMusicaux: string[], scene: string) {
        this.idMG = idMG;
        this.idG = idG;
        this.nomMG = nomMG;
        this.prenomMG = prenomMG;
        this.nomDeSceneMG = nomDeSceneMG;
        this.horairePassage = horairePassage;
        this.datePassage = datePassage;
        this.genresMusicaux = genresMusicaux;
        this.scene = scene;
    }
}