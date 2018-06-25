import React, {Component} from 'react';
import utils from '../../utils/utils';

class SystemMessage extends Component {
    constructor(props) {
        super(props);
        this.timeString = utils.timestampToString(this.props.time);
    }
    render() {
        return (
            <li className="left clearfix">
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">{this.props.username}</strong>
                            <small className="pull-right text-muted">{this.timeString}</small>
                    </div>
                    <p><i>{this.props.message}</i></p>
                </div>
            </li>
        );
    }
}

export default SystemMessage;