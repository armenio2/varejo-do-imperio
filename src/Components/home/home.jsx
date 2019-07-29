import React, { useState } from 'react';
import Clients from './clients/clients';
import Products from './products/products';
import Modal from './modal/modal';
import Cart from './cart/cart';

const Home = () => {
    const [clientName, client] = useState('Clientes');
    const [stage, step] = useState(0);
    const [item, nextItem] = useState(0);
    const [value, nextValue] = useState();
    const [amount, nextAmount] = useState();
    const [cartItem, addCartItem] = useState();
    const [isValid, changeValid] = useState(true);

    const onRowClickedClient = (props) => {
        client(props.name)
        step(1)
    }

    const onRowClickedProduct = (props) => {
        cleanInputs()
        step(2)
        nextItem(props)
    }

    const onModalClose = () => {
        step(1)
    }

    const submitIsValid = (props, quantity) => {
        if (parseInt(props.minToSell) >= 1) {
            const rest = parseInt(quantity) % parseInt(props.minToSell);
            if (rest === 0) {
                changeValid(true)
                return true
            } else {
                changeValid(false)
                return false
            }
        } else {
            changeValid(true)
            return true
        }
    }

    const cleanInputs = () => {
        nextAmount('')
        nextValue('')
    }

    const onModalSubmit = () => {
        if (submitIsValid(item, amount)) {
            step(1)
            if (cartItem) {
                let cart = [
                    ...cartItem,
                    {
                        ...item,
                        'itemValueToSell': value,
                        'itemAmount': amount,
                    },
                ]
                addCartItem(cart)
            } else {
                let cart = [
                    {
                        ...item,
                        'itemValueToSell': value,
                        'itemAmount': amount,
                    },
                ]
                addCartItem(cart)
            }
        }
    }

    return (
        <div className="container fullSize">
            <div className="row justify-content-center align-items-center" style={fullHeight}>
                <div className="col-lg-8 col-md-12" >
                    <Clients
                        clientName={clientName}
                        stage={stage}
                        styleShow={styleShow}
                        styleHide={styleHide}
                        dataTable={dataTable}
                        onRowClickedClient={onRowClickedClient}
                    />
                    <Products
                        stage={stage}
                        styleShow={styleShow}
                        styleHide={styleHide}
                        dataTable={dataTable}
                        onRowClickedProduct={onRowClickedProduct}
                    />
                    <Modal
                        stage={stage}
                        name={item.name}
                        value={value}
                        nextValue={nextValue}
                        amount={amount}
                        nextAmount={nextAmount}
                        isValid={isValid}
                        styleHide={styleHide}
                        styleShow={styleShow}
                        minToSell={item.minToSell}
                        onModalClose={onModalClose}
                        onModalSubmit={onModalSubmit}
                    />
                </div>
                <Cart
                    styleShow={styleShow}
                    styleHide={styleHide}
                    dataTable={dataTable}
                    cartItem={cartItem}
                />
            </div>
        </div >
    );
}

const dataTable = {
    border: 'black 1px solid',
    boxShadow: '1px 1px'
}

const styleHide = {
    display: 'none'
}

const styleShow = {
    display: 'initial'
}

const fullHeight = {
    height: '100vh'
}

export default Home;
