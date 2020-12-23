import React from 'react';
import { observer } from 'mobx-react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import store from '../../stores/ContactStore'
import FormLabels from '../../data/ContactFields.json'

const ContactForm = observer(() => {
    const formFields = FormLabels.fieldLabels

    const modalTitle = store.selectedOperation === "add" ? "Add new contact" : "Edit contact"

    const hasError = (fieldName) => {
        return store.fieldErrors.some(item => item === fieldName);
    }

    const renderAddEditForm = () => {
        return (
            <Dialog open={store.isAddEditFormActive} aria-labelledby="form-dialog-title">
                <DialogTitle>{modalTitle}</DialogTitle>
                <DialogContent>
                    {
                        formFields.map((item, index) => {
                            return (
                                <TextField
                                    key={index}
                                    margin="dense"
                                    label={hasError(item.id) ? "Error" : item.label}
                                    value={store.newContactItem[item.id] || ""}
                                    fullWidth
                                    name={item.id}
                                    onChange={(e) => store.setContactItem(e.target)}
                                    type={item.id === "emailAddress" ? "email" : "text"}
                                    helperText={hasError(item.id) ? item.errorHelper : ""}
                                    error={hasError(item.id)}
                                    onBlur={(e) => store.validateForm(e.target.name)}
                                />
                            )
                        })
                    }
                    <div className={"error-validation-exists " + store.errorStatus}>
                        {
                            "Record already exists!"
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button className="form-btn-cancel" onClick={() => store.handleModalStatus()}>Cancel</Button>
                    <Button className="form-btn-save" disabled={store.isSaveDisabled} onClick={() => store.handleAddEditContact()}>Save</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <div className="contact-form">
            {renderAddEditForm()}
        </div>
    )


});

export default ContactForm;