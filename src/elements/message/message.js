import React, {Component} from 'react';
import './message.css';
import utils from '../../utils/utils';

class Message extends Component {
    constructor(props) {
        super(props);
        this.timeString = utils.timestampToString(this.props.time);
    }
    render() {
        return (
            <li className="left clearfix row">
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            {this.props.username}:
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <small className="pull-right text-muted">
                                {this.timeString}
                            </small>
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="row"><p className="message">{this.props.message}</p></div>
                </div>
            </li>
        );
    }
}

export default Message;