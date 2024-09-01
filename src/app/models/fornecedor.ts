import { Produto } from "./produto";

export class Fornecedor {

    idFornecedor!: number;
    nomeFornecedor!: string;
    cnpj!: string;
    emailFornecedor!: string;
    produto!: Produto[];
}
