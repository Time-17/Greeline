import { Categoria } from "./categoria";
import { ItemCarrinho } from "./item-carrinho";

export class Produto {
    idProduto!: number;
    nomeProduto!: string;
    valorProduto!: number;
    descricaoProduto!: string;

    fornecedor!: object;
    itemCarrinho!: ItemCarrinho;
    categoria!: Categoria;

}
