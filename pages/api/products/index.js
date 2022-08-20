import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getProducts(req, res);
    case "POST":
      return await saveProduct(req, res);
  }
}

const getProducts = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM product");
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error })
  }
};

const saveProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {

    const [result] = await pool.query("INSERT INTO product SET ?", {
      name,
      description,
      price,
    });

    return res
      .status(200)
      .json({ name, description, price, id: result.insertId });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message })
  }
};
