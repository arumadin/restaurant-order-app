import React from "react";
import { formatCurrency } from "../utilities/formatCurrency";

export class Cart extends React.Component {
    constructor(props) {
        super(props)

        this.handleDiscount = this.handleDiscount.bind(this);
    }

    handleDiscount(e) {
        const discVal = e.target.value;
        this.props.selectDiscount(discVal)
    }

    render() {
        const totalPrice = (formatCurrency(
            this.props.itemInCart.reduce((total, cartItem) => {
            const product = this.props.productInfo.find(i => i.id === cartItem.id)
            
            let prod = ((product ? (product.price) : 0) * cartItem.quantity * this.props.discount)
            
            return total + prod
        }, 0)
        ));

        const cartItem =  (this.props.itemInCart.map((item, idx) => {
            const product = this.props.productInfo.find(i => i.id === item.id)

            return (
                <tr key={"key-" + idx}>
                    <td>{product.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency((product.price * item.quantity * this.props.discount))}</td>
                </tr>
            )})
        );

        return (
            <div className="cartWrap">
                <h2>Your Order</h2>
                <table>
                    <colgroup>
                        <col style={{width:"50%"}}/>
                        <col style={{width:"25%"}}/>
                        <col style={{width:"25%"}}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                        this.props.itemInCart.length !== 0 ? cartItem : (<p>No menu selected</p>)
                        
                        }
                    </tbody>
                </table>
                
                <label className="discountWrap">
                    Coupon
                    <select defaultValue="0" onChange={this.handleDiscount}>
                        <option value="0" disabled hidden>Select a coupon</option>
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="0">No Discount</option>
                    </select>
                </label>
                <div className="totalWrap">
                    <span>Total</span>
                    <span className="totalPrice">{totalPrice}</span>
                </div>
            </div>
        )
    }
}