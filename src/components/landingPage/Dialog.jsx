import React from 'react';

class Dialog extends React.Component {
    render () {
        let dialog = (
            <div className="dialogWindow">
                <button className="dialogButton" 
                        onClick={this.props.onClose}>
                            X
                </button>
                <div>
                    {this.props.children}
                </div>
            </div>
        );

        if(!this.props.isOpen) {
            dialog = null;
        }
    return (
           <div>
               {dialog}
           </div> 
        );
    };
};

export default Dialog;