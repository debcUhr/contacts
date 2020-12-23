import React from "react";
import 'jest';
import { cleanup } from "@testing-library/react";
import ContactHeader from "../../components/subComponents/ContactHeader";
import { mount } from 'enzyme';
import store from "../../stores/ContactStore";


describe("ContactHeader rendering", () => {
    beforeEach(() => cleanup());

    

    it("renders header contents", () => {
        var contactHeader = mount(<ContactHeader />);

        const leftHeader = contactHeader.find(".contact-left-header");
        const addSearchContainer = contactHeader.find(".add-search-container");
        const searchWrapper = contactHeader.find(".search-wrapper");
        const createButton = contactHeader.find(".create-contact-btn");
        const searchContainer = contactHeader.find(".search-container");

        expect(leftHeader).toBeTruthy();
        expect(addSearchContainer).toBeTruthy();
        expect(searchWrapper).toBeTruthy();
        expect(createButton).toBeTruthy();
        expect(searchContainer).toBeTruthy();
    });
    it("renders search", () => {
        cleanup()

        var searchContact = mount(<ContactHeader />);

        const searchContainer = searchContact.find(".search-container").at(0);

        searchContainer.simulate('change', { target: { value: 'search' } })
    });

    it("renders create button click", () => {
        cleanup()

        var createContact = mount(<ContactHeader />);

        const modalStatusSpy = jest.spyOn(store, "handleModalStatus");
        const createButton = createContact.find(".create-contact-btn").at(0);

        createButton.simulate('click')

        expect(modalStatusSpy).toHaveBeenCalled();
        expect(store.fieldErrors).toEqual([]);
        expect(store.isSaveDisabled).toEqual(true);
        expect(store.errorStatus).toEqual("");
    });


})