import React from "react";
import { formatCurrency } from "../utilities/formatCurrency";

export class Product extends React.Component {
    
    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleAdd(e) {
        const el = e.target;
        const id = el.closest('li').id;
        this.props.addItem(id)
    }

    handleRemove(e) {
        const el = e.target;
        const id = el.closest('li').id;
        this.props.removeItem(id)
    }

    render() {
        return (
            <ul className="productWrap">
                { this.props.listProduct.map((item, idx) => (
                    <li key={'key' + idx} id={item.id} className="productItem">
                        <div className="productImageWrap">
                            <img className="productImage" src={process.env.PUBLIC_URL + item.imgURL} alt={item.productName}></img>
                        </div>
                        <div className="productInfo">
                            <span className="productName">{item.productName}</span>
                            <span className="productPrice">{formatCurrency(item.price)}</span>
                        </div>
                        <button className="addButton" onClick={this.handleAdd}>Add</button>
                        {(item.cartQty > 0 && <button className="removeButton" onClick={this.handleRemove}>Remove All</button>)}
                    </li>
                ))}
            </ul>
        )
    }
}