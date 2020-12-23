import React from 'react';
import {  Button, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import store from '../../stores/ContactStore';
import { observer } from 'mobx-react';

const ContactHeader = observer(() => {

    const handleSearch = (e) => {
        store.updateContactsTable(e.target.value)
    }

    const renderLeftHeader = () => {
        return (
            <div className="contact-left-header">My Contacts</div>
        )
    }

    const renderAddAndSearContainer = () => {
        return (
            <div className="add-search-container">
                <Button className="create-contact-btn" onClick={() => store.handleModalStatus()}>Create Contact</Button>
                <div className="search-wrapper">
                    <TextField className="search-container" label="Search Contact" variant="outlined" type="text" onChange={(e) => handleSearch(e)} />
                    <Search />
                </div>
                

            </div>

        )
    }

    return (
        <div className="contact-header">
            {renderLeftHeader()}
            {renderAddAndSearContainer()}
        </div>
    )
});

export default ContactHeader;