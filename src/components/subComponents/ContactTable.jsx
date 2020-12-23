import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import store from '../../stores/ContactStore'
import Pagination from '../generic/Pagination';
import FormLabels from '../../data/ContactFields.json'

const ContactTable = observer(() => {
    const tableHeaders = FormLabels.fieldLabels;

    const renderTableHeader = () => {
        return (
            <li className="table-header">
                {
                    tableHeaders.map((item, index) =>
                        <div key={index} className={"col col-" + index} onClick={() => store.sortColumn(item.id)}>
                            {item.label}
                        </div>
                    )
                }

            </li>
        )
    }

    const renderAddAndSearchContainer = (item) => {
        return (
            <div className="add-delete-icon-container">
                <IconButton aria-label="edit" onClick={() => store.handleModalStatus(item)}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => store.handleRemoveContact(item)}>
                    <Delete />
                </IconButton>
            </div>
        )
    }

    const renderTableBody = () => {
        return (
            store.contactList.map((item, index) =>
                <li key={index} className="table-row">
                    <div className={"col col-0"}> {item.firstName} </div>
                    <div className={"col col-1"}> {item.lastName} </div>
                    <div className={"col col-2"}> {item.emailAddress} </div>
                    <div className={"col col-3"}> {item.phoneNumber} </div>
                    <div className={"col col-4 last-column"}>
                        <div className="home-address">
                            {item.homeAddress}
                        </div>
                        {renderAddAndSearchContainer(item)}
                    </div>
                </li>
            )
        )
    }



    return (
        <div className="contact-table">
            <ul className="responsive-table">
                {renderTableHeader()}
                {renderTableBody()}
            </ul>
            <Pagination />
        </div>

    )


});

export default ContactTable;