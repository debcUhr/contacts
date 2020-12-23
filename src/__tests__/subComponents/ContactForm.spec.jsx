import React from "react";
import 'jest';
import { cleanup } from "@testing-library/react";
import ContactForm from "../../components/subComponents/ContactForm";
import store from "../../stores/ContactStore";
import { runInAction } from "mobx";
import { mount } from 'enzyme';


describe("ContactForm rendering", () => {
    it("renders form", () => {
        var contactForm = mount(<ContactForm />);

        runInAction(() => store.isAddEditFormActive = true)

        const form = contactForm.find(".contact-form");
        const cancelBtn = contactForm.find(".form-btn-cancel");
        const saveBtn = contactForm.find('.form-btn-save')
        const firstName = contactForm.find('First Name')
        const lastName = contactForm.find('Last Name')
        const emailAddress = contactForm.find('Email Address')
        const phoneNumber = contactForm.find('Phone Number')
        const homeAddress = contactForm.find('Home Address')

        expect(form).toBeTruthy();
        expect(saveBtn).toBeTruthy();
        expect(cancelBtn).toBeTruthy();
        expect(firstName).toBeTruthy();
        expect(lastName).toBeTruthy();
        expect(emailAddress).toBeTruthy();
        expect(phoneNumber).toBeTruthy();
        expect(homeAddress).toBeTruthy();
    });;


    it("populate form fields then trigger cancel", () => {
        var contactForm = mount(<ContactForm />);

        runInAction(() => store.selectedOperation = "add")

        const modalStatusSpy = jest.spyOn(store, "handleModalStatus");
        const onChangeSpy = jest.spyOn(store, "setContactItem");
        const onBlurSpy = jest.spyOn(store, "validateForm");

        const firstName = contactForm.find('input').at(0)
        const lastName = contactForm.find('input').at(1)
        const emailAddress = contactForm.find('input').at(2)
        const phoneNumber = contactForm.find('input').at(3)
        const homeAddress = contactForm.find('input').at(4)

        firstName.simulate('change', { target: { value: 'sample' } })
        lastName.simulate('change', { target: { value: '' } })
        emailAddress.simulate('change', { target: { value: 'sample' } })
        phoneNumber.simulate('change', { target: { value: 'sample' } })
        homeAddress.simulate('change', { target: { value: ' ' } })
        homeAddress.simulate('blur');


        expect(onChangeSpy).toHaveBeenCalled()
        expect(onBlurSpy).toHaveBeenCalled()

        contactForm.find(".form-btn-cancel").at(0).simulate('click')

        
        expect(modalStatusSpy).toHaveBeenCalled()
        expect(store.fieldErrors).toEqual([])
        expect(store.errorStatus).toBe("")

    })

    it("edit form fields", () => {
        cleanup()

        runInAction(() => {
            store.selectedOperation = "edit"
            store.isAddEditFormActive = true
            store.isSaveDisabled = false
            store.prevSelectedContact.emailAddress = "irenejacobson@lingoage.com"
        })

        var editContactForm = mount(<ContactForm />);

        const modalStatusSpy = jest.spyOn(store, "handleModalStatus");
        const onChangeSpy = jest.spyOn(store, "setContactItem");
        const updateTableSpy = jest.spyOn(store, "updateContactsTable");
        const newContactSpy = jest.spyOn(store, "processNewContact");
        const addEditSpy = jest.spyOn(store, "handleAddEditContact");

        const firstName = editContactForm.find('input').at(0)
        const lastName = editContactForm.find('input').at(1)
        const emailAddress = editContactForm.find('input').at(2)
        const phoneNumber = editContactForm.find('input').at(3)
        const homeAddress = editContactForm.find('input').at(4)

        firstName.simulate('change', { target: { value: 'sample1' } })
        lastName.simulate('change', { target: { value: 'asdasdasd' } })
        emailAddress.simulate('change', { target: { value: 'sampleasdasdasd@gmail.com' } })
        phoneNumber.simulate('change', { target: { value: 'sampleasdasd' } })
        homeAddress.simulate('change', { target: { value: 'asdasdasd' } })

        expect(onChangeSpy).toHaveBeenCalled()

        editContactForm.find(".form-btn-save").at(0).simulate('click')

        editContactForm.update()

        expect(addEditSpy).toHaveBeenCalled()
        expect(newContactSpy).toHaveBeenCalled()
        expect(modalStatusSpy).toHaveBeenCalled()
        expect(updateTableSpy).toHaveBeenCalled()
    })

    it("save new contact", () => {
        cleanup()

        runInAction(() => {
            store.selectedOperation = "add"
            store.isAddEditFormActive = true
            store.isSaveDisabled = false
        })

        var form = mount(<ContactForm />);

        const onChangeSpy = jest.spyOn(store, "setContactItem");
        const onBlurSpy = jest.spyOn(store, "validateForm");
        const addEditSpy = jest.spyOn(store, "handleAddEditContact");

        const firstName = form.find('input').at(0)
        const lastName = form.find('input').at(1)
        const emailAddress = form.find('input').at(2)
        const phoneNumber = form.find('input').at(3)
        const homeAddress = form.find('input').at(4)

        firstName.simulate('change', { target: { value: 'name' } })
        lastName.simulate('change', { target: { value: 'surname' } })
        emailAddress.simulate('change', { target: { value: 'sample@sample1.com' } })
        phoneNumber.simulate('change', { target: { value: 'phone' } })
        homeAddress.simulate('change', { target: { value: 'home' } })
        homeAddress.simulate('blur');

        expect(onChangeSpy).toHaveBeenCalled()
        expect(onBlurSpy).toHaveBeenCalled()

        form.find(".form-btn-save").at(0).simulate('click')

        form.update()

        expect(addEditSpy).toHaveBeenCalled()
    })
})