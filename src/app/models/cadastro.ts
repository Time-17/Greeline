export class Cadastro {
    idUsuario!: number;
    emailUsuario!: string;
    senhaUsuario!: string;
    confirmacaoSenha!:string;
    role!: string;
    
    constructor(idUsuario: number, emailUsuario: string, senhaUsuario: string, confirmacaoSenha:string) {
      this.idUsuario = idUsuario;
      this.emailUsuario = emailUsuario;
      this.senhaUsuario = senhaUsuario;
      this.confirmacaoSenha = confirmacaoSenha;
    }
}
