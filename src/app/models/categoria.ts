export class Categoria {
    idCategoria!: number;
    descricao!: string;

    constructor(idCategoria: number, descricao: string){
        this.idCategoria = idCategoria;
        this.descricao = descricao;
    }
}
