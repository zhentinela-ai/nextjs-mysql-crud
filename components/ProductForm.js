import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (router.query.id) {
        await axios.put("/api/products/" + router.query.id, product);
        toast.success("Product updated successfully!");
      } else {
        await axios.post("/api/products", product);
        toast.success("Product create successfully!");
      }

      router.push("/");
    } catch (error) {
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const handleChange = ({ target: { name, value } }) =>
    setProduct({ ...product, [name]: value });

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get("/api/products/" + router.query.id);
      setProduct({
        name: data.name,
        description: data.description,
        price: data.price,
      });
      // setProduct(data);
      console.log(data);
    };

    if (router.query?.id) {
      getProduct();
    }
  }, []);

  return (
    <div className="w-full max-w-xs text-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none w-full leading-tight border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            onChange={handleChange}
            value={product.name}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            className="shadow appearance-none w-full leading-tight border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            type="text"
            name="price"
            onChange={handleChange}
            value={product.price}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            className="shadow appearance-none w-full leading-tight border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            name="description"
            onChange={handleChange}
            value={product.description}
            rows="3"
          ></textarea>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none font-bold text-white">
          {router.query.id ? "Update Product" : "Save Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
