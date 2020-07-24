import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const product = await Product.findAll({
      attributes: ['id', 'name', 'description', 'price', 'un', 'available'],
    });

    return res.json(product);
  }

  async store(req, res) {
    const productExists = await Product.findOne({
      where: { name: req.body.name },
    });
    if (productExists) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    const {
      id,
      name,
      description,
      price,
      un,
      available,
    } = await Product.create(req.body);

    return res.json({
      id,
      name,
      description,
      price,
      un,
      available,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }

    if (name !== product.name) {
      const productExists = await Product.findOne({ where: { name } });
      if (productExists) {
        return res.status(400).json({ error: 'Product already exists' });
      }
    }

    const { description, price, un, available } = await product.update(
      req.body
    );

    return res.json({
      id,
      name,
      description,
      price,
      un,
      available,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }

    await product.destroy();

    return res.json(product);
  }
}

export default new ProductController();
