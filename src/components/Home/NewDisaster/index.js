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
            name: '',
            date: '4/7/18',
            desc: '',
            loc: '',
            lng: '',
            lat: '',
        };
    }

    handleSubmitDisaster = () => {
        db.doCreateDisaster(this.state.name, this.state.date, this.state.desc, this.state.loc, this.state.lng, this.state.lat)
        this.props.handleCloseDialog()
    }


    render() {
        return (
            <Dialog
                title="Add Disaster Event"
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
                            onClick={() => this.handleSubmitDisaster()}
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
                    hintText="Name"
                    style={{ margin: "10px" }}
                    onChange={(evt) => this.setState({ name: evt.target.value })}
                />
                <TextField
                    hintText="Description"
                    style={{ margin: "10px" }}
                    onChange={(evt) => this.setState({ desc: evt.target.value })}
                />
                <TextField
                    hintText="Location"
                    style={{ margin: "10px" }}
                    onChange={(evt) => this.setState({ loc: evt.target.value })}
                />
                <TextField
                    hintText="Longitude"
                    style={{ margin: "10px" }}
                    onChange={(evt) => this.setState({ lng: evt.target.value })}
                />
                <TextField
                    hintText="Latitude"
                    style={{ margin: "10px" }}
                    onChange={(evt) => this.setState({ lat: evt.target.value })}
                />

            </Dialog>

        )
    }
}