// arquivo que vai adicionar a tipagem de 'user' para dentro da biblioteca Express

declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      // user vai receber uma propriedade 'id' do tipo 'string'
      id: string;
    };
  }
}
