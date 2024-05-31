import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";

function Products() {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        //code to be triggered in the side effect
        if (isAuthenticated) {
            axios.get("http://localhost:8080/products", config)
                .then(function (response) {
                    setProducts(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios.get("http://localhost:8080/categories", config)
                .then(function (response) {
                    setCategories(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }, [isAuthenticated]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [edit, setEdit] = useState(null);

    function handleName(event) {
        setName(event.target.value);
    }

    function handlePrice(event) {
        setPrice(event.target.value);
    }

    function handleQuantity(event) {
        setQuantity(event.target.value);
    }

    function handleCategory(event) {
        setCategory(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            name: name,
            price: price,
            quantity: quantity,
            categoryId: category,
        }

        axios.post("http://localhost:8080/products", data, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getProducts() {
        axios.get("http://localhost:8080/products",config)
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleUpdate(event) {
        event.preventDefault();

        const data = {
            name: name,
            price: price,
            quantity: quantity,
            categoryId: category,
        }

        axios.put("http://localhost:8080/products/" + edit, data, config)
            .then(function (response) {
                getProducts();
            }).catch(function (error) {
                console.log(error);
            });
    }


    return (
        <div>
            <h1>Products</h1>

            <table width="100%">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category?.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => {
                                    setEdit(product.id);
                                    setName(product.name);
                                    setPrice(product.price);
                                    setQuantity(product.quantity);
                                    setCategory(product.category.id);
                                }}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {!edit &&
                <form onSubmit={handleSubmit}>
                    <h2>Create Product</h2>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={handleName} required />
                    </div>

                    <div>
                        <label>Price</label>
                        <input type="text" onChange={handlePrice} required />
                    </div>

                    <div>
                        <label>quantity</label>
                        <input type="text" onChange={handleQuantity} required />
                    </div>

                    <div>
                        <label>Category</label>
                        <select onChange={handleCategory} required>
                            <option value="">Select Category</option>

                            {categories && categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">Add Product</button>
                </form>
            }

            {edit &&
                <form onSubmit={handleUpdate}>
                    <h2>Edit Product</h2>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={handleName} value={name} required />
                    </div>

                    <div>
                        <label>Price</label>
                        <input type="text" onChange={handlePrice} value={price} required />
                    </div>

                    <div>
                        <label>quantity</label>
                        <input type="text" onChange={handleQuantity} value={quantity} required />
                    </div>

                    <div>
                        <label>Category</label>
                        <select onChange={handleCategory} value={category} required>
                            <option value="">Select Category</option>

                            {categories && categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">Update Product</button>
                </form>
            }
        </div>
    )
}

export default Products;