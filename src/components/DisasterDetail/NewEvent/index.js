import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

import { db } from '../../../firebase'

export default class NewDisaster extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            disasterId: this.props.disasterId,
            title: '',
            date: '4/7/18',
            desc: '',
            org: '',
            status: 'incomplete'
        };
    }

    handleSubmitEvent = () => {
        db.doCreateEvent(this.state.disasterId, this.state.title, this.state.date, this.state.desc, this.state.org, this.state.status)
        this.props.handleCloseDialog()
    }


    render() {
        return (
            <Dialog
                title="Add Event"
                actions={
                    [
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onClick={this.props.handleCloseDialog}
                        />,
                        <FlatButton
                            label="Submit"
                            primary={true}
                            keyboardFocused={true}
                            onClick={() => this.handleSubmitEvent()}
                        />,
                    ]
                }
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleCloseDialog}
                style={{ textAlign: "center" }}
            >
                <DatePicker
                    hintText="Select Date"
                    container="inline"
                    onChange={(evt, date) => {
                        var month = date.getUTCMonth() + 1; //months from 1-12
                        var day = date.getUTCDate();
                        var year = date.getUTCFullYear();
                        this.setState({ date: year + "/" + month + "/" + day })
                        console.log(this.state.date)
                    }}
                />
                <TextField
                    hintText="Title"
                    style={{ margin: "10px" }}
                    onChange={(evt) => this.setState({ title: evt.target.value })}
                />
                <TextField
                    hintText="Description"
                    style={{ margin: "10px" }}
                    onChange={(evt) => this.setState({ desc: evt.target.value })}
                />
                <TextField
                    hintText="Organization"
                    style={{ margin: "10px" }}
                    onChange={(evt) => this.setState({ org: evt.target.value })}
                />

            </Dialog>

        )
    }
}