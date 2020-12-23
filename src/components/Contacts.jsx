import React from 'react';
import ContactHeader from './subComponents/ContactHeader';
import ContactTable from './subComponents/ContactTable';
import '../styles/Contacts.scss';
import ContactForm from './subComponents/ContactForm';
import { observer } from 'mobx-react';


const Contacts = observer(() => {
    return (
        <React.Fragment>
            <ContactHeader />
            <ContactTable />
            <ContactForm />
        </React.Fragment>
    )
});

export default Contacts;