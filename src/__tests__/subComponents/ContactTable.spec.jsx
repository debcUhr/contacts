import React from "react";
import 'jest';
import { render, cleanup, screen, getByText, fireEvent } from "@testing-library/react";
import ContactTable from "../../components/subComponents/ContactTable";


describe("ContactTable rendering", () => {

    var contactTable = render(<ContactTable />);

    function updateWrapper() {
        cleanup();
        contactTable = render(<ContactTable />);
    }

    beforeEach(() => updateWrapper());

    it("renders table contents", () => {
        const table = contactTable.container.querySelectorAll(".contact-table");
        const responsiveTable = contactTable.container.querySelectorAll(".responsive-table");
        const tableHeader = contactTable.container.querySelectorAll(".table-header");
        const tableRow = contactTable.container.querySelectorAll(".table-row");
        const iconContainer = contactTable.container.querySelectorAll(".add-delete-icon-container");

        expect(table).toBeTruthy();
        expect(responsiveTable).toBeTruthy();
        expect(tableHeader).toBeTruthy();
        expect(tableRow).toBeTruthy();
        expect(iconContainer).toBeTruthy();
    });


    it("renders initial table contents", () => {
        const tableRow = contactTable.container.querySelectorAll(".table-row");

        expect(tableRow).toHaveLength(10);
    });

    it("renders row edit", () => {
        const editButton = screen.getAllByRole('button', {
            name: /edit/i
        })[1]

        fireEvent.click(editButton);

        const tableRow = contactTable.container.querySelectorAll(".table-row");
        expect(tableRow).toHaveLength(10);
    });

    it("renders row delete", () => {
        const editButton = screen.getAllByRole('button', {
            name: /delete/i
        })[1]

        fireEvent.click(editButton);

        const tableRow = contactTable.container.querySelectorAll(".table-row");

        expect(tableRow).toHaveLength(10);
    });


})