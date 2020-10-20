import React from 'react';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from 'mdbreact';

import { ReactComponent as InfoIcon } from '../../assets/info.svg';

import './custom-popover.styles.css';

class CustomPopover extends React.Component {
    state = { visible: true };

    setVisible = () => {
        this.setState({ visible: true });
    };
    removeVisible = () => {
        this.setState({ visible: false });
    };

    componentDidMount() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <div onMouseEnter={() => this.setVisible()} onMouseLeave={() => this.removeVisible()}>
                <MDBPopover placement='left' popover clickable id='popper4' isVisible={this.state.visible}>
                    <MDBBtn>
                        <InfoIcon />
                    </MDBBtn>
                    <div>
                        <MDBPopoverHeader>{this.props.initials}</MDBPopoverHeader>
                        <MDBPopoverBody>
                            <div>Created On: {this.props.createdAt}</div>
                        </MDBPopoverBody>
                    </div>
                </MDBPopover>
            </div>
        );
    }
}

export default CustomPopover;
