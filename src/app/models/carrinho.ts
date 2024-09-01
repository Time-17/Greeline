import { ItemCarrinho } from "./item-carrinho";
import { Login } from "./login";
import { Usuario } from "./usuario";

export class Carrinho {
    
    idCarrinho!: number;
    descricaoCarrinho!: string;
    valorCarrinho!: number;
    itemCarrinho!: ItemCarrinho[];
    usuario!: Login;
    dataCarrinho!: any;
    status!: string;  

}
