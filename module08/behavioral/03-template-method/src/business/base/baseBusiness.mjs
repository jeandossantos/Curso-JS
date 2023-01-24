import { NotImplementedException } from '../../utils/exception.mjs';

export default class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name);
  }

  _create(data) {
    throw new NotImplementedException(this._create.name);
  }

  /**
   * Padrão do Martin Fowler
   * a proposta padrão é garantir um fluxo de métodos, definindo uma sequencia a
   * ser executada
   *
   * essa é a definição ativado do template method
   */
  create(data) {
    const isValid = this._validateRequiredFields(data);

    if (!isValid) throw new Error('Invalid data!');

    return this._create(data);
  }
}
