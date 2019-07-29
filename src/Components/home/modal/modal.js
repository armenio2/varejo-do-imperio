import React from 'react';
import NumberFormat from 'react-number-format';

function modal(props) {
    return (
        <div style={props.stage === 2 ? props.styleShow : props.styleHide} className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.name}</h5>
                        <button onClick={props.onModalClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-xl-6 col-md-12" >
                                <p>Qual o valor de compra do item?</p>
                            </div>
                            <div className="col-xl-6 col-md-12" >
                                <NumberFormat value={props.value} onChange={e => props.nextValue(e.target.value)} />
                            </div>
                        </div>
                        <div className="row justify-content-between align-items-center">
                            <div className="col-xl-6 col-md-12" >
                                <p>Quantos itens?</p>
                            </div>
                            <div className="col-xl-6 col-md-12" >
                                <NumberFormat value={props.amount} onChange={e => props.nextAmount(e.target.value)} />
                            </div>
                            <div style={props.isValid ? props.styleHide : props.styleShow}>
                                <div className="col-12" style={fontError} >
                                    <p>Esse item só pode ser vendido em multiplos de {props.minToSell}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={props.onModalClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button onClick={props.onModalSubmit} type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const fontError = {
    fontSize: 'bold',
    color: 'red'
}

export default modal;
