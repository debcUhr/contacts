import React from "react";
import 'jest';
import { render, cleanup } from "@testing-library/react";
import Contacts from "../components/Contacts";



describe("Contact rendering", () => {

    var contacts = render(<Contacts  />);

    function updateWrapper() {
        cleanup();
        contacts = render(<Contacts  />);
    }

    it("renders contact page", async() => {
        const header = contacts.container.querySelectorAll(".contact-header");
        const table = contacts.container.querySelectorAll(".contact-table");
        const pagination = contacts.container.querySelectorAll(".contact-header");

        expect(header).toHaveLength(1);
        expect(table).toHaveLength(1);
    });


})