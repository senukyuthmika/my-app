import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:8080/orders")
        .then(function (response) {
            setOrders(response.data);        })
        .catch(function (error) {
            console.log(error);
        });

    },[]);

    const navigate = useNavigate();

    function createOrder() {
        axios.post("http://localhost:8080/orders")
        .then(function (response) {
            //redirect user to Edit Order page to add Products to order
            navigate(`/orders/${response.data.id}/products`);
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <h1>Orders</h1>

            <div className="text-end">
                <button type="button" onClick={createOrder} className="btn btn-primary">Add Order</button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order Date</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.orderDateTime}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                <button type="button" className="btn btn-primary btn-sm" onClick={() => {
                                    navigate(`/orders/${order.id}/products`);
                                }}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;