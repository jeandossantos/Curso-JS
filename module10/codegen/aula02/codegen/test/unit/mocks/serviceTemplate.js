export default `export class ProductService {
  constructor({ repository: productRepository }) {
    this.productRepository = productRepository;
  }

  create(data) {
    return this.productRepository.create;
  }

  read(query) {
    return this.productRepository.read(query);
  }

  update(id, data) {
    return this.productRepository.update(id, data);
  }

  delete(id) {
    return this.productRepository.delete(id);
  }
}`;
