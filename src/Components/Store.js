import React from "react";
import { Product } from './Product';
import { Cart } from './Cart';
import listProduct from '../data/prod.json';

export class Store extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart : [],
            products: listProduct,
            discount: 1
        }

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.changeState = this.changeState.bind(this);
        this.selectDiscount = this.selectDiscount.bind(this);
    }


    addItem(productId) {
        productId = Number(productId);
        let count = 1;

        this.changeState(productId, count)

    }

    // reduceItem(productId) {
    //     productId = Number(productId);
    //     let count = -1;

    //     this.changeState(productId, count)
    // }


    removeItem(productId) {
        productId = Number(productId);
        
        this.setState((prevState) => ({
            cart: prevState.cart.filter(item => item.id !== productId),
            products: prevState.products.map(item => (item.id === productId) ? {...item, cartQty: 0} : item),
        }))
    }

    selectDiscount(discount) {
        let intDiscount = parseInt(discount)
        let discVal = Number(((100 - intDiscount) / 100).toFixed(2));
    
        this.setState({
            discount: discVal,
        })

    }

    changeState(productId, qty) {
        
        let selectedItem = this.state.products.find(item => item.id === productId)

        let newCartObj = {
            id: selectedItem.id,
            quantity: selectedItem.cartQty + qty
        }

        let itemCart = this.state.cart.find(x => x.id === productId);
        let cartArr = [];

        if (itemCart === undefined) {
            // condition if selected item not in cart yet
            cartArr = [...this.state.cart, newCartObj]
        } else if ((itemCart.quantity === 1) && (qty === -1)) {
            // condition if user decrease number of selected item in cart
            cartArr = this.state.cart.filter(itemInCart => itemInCart.id !== itemCart.id)
        } else {
            // selected item is already in cart, update quantity only
            cartArr = this.state.cart.map(itemInCart => itemInCart.id === selectedItem.id ? {...itemInCart, quantity: itemInCart.quantity + qty} : itemInCart)
        }

        this.setState((prevState) => ({
            cart: cartArr,
            products: prevState.products.map(item => (item.id === selectedItem.id) ? {...item, cartQty: item.cartQty + qty} : item),
        }))
    }


    render() {
        return (
            <div className="container">
                <h1>Our Menu</h1>
                <div className="storeWrap">
                    <Product listProduct={this.state.products} addItem={this.addItem} removeItem={this.removeItem}/>
                    <Cart itemInCart={this.state.cart} selectDiscount={this.selectDiscount} productInfo={this.state.products} discount={this.state.discount}/>
                </div>
            </div>               
        )
    }
}