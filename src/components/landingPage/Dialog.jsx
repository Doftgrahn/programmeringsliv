import React from 'react';

class Dialog extends React.Component {
    render () {
        let dialog = (
            <div className="dialogBackground">
            <div className="dialogWindow">
                <button className="dialogExitButton" 
                        onClick={this.props.onClose}>
                            X
                </button>
                <div>
                    {this.props.children}
                </div>
            </div>
            </div>
        );

        if(!this.props.isOpen && !this.props.user) {
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