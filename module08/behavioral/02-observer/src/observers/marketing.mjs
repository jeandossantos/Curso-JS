export default class Marketing {
  // importante lembrar que o update é responsável por gerenciar seus errors
  // não deve-se ter await no  notify porque a responsabilidade do notify é só
  // emitir eventos. só notificar todo mundo
  update({ id, username }) {
    console.log(
      `[${id}] [marketing] will send an welcome email to ${username}`
    );
  }
}
