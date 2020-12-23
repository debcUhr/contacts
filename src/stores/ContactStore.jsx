import { makeObservable, observable, runInAction, toJS } from "mobx";
import { checkIfPropertyExistsInArray, checkIfPropertyExistsInObject, validateInputField } from "../components/helpers/Helpers";
import ContactsMockData from "../data/ContactsMockData.json";


class ContactStore {
    _rawContactList = [];
    selectedOperation = "";
    isAddEditFormActive = false;
    fieldErrors = [];
    currentPagination = 0;
    rowsPerPage = 10;
    contactListCount = 0;
    sortDirection = "asc";
    sortField = "firstName";
    errorStatus = "";
    isSaveDisabled = true;

    prevSelectedContact = {};
    newContactItem = {};

    _contactList = [];

    constructor() {
        makeObservable(this, {
            _rawContactList: observable,
            selectedOperation: observable,
            isAddEditFormActive: observable,
            fieldErrors: observable,
            currentPagination: observable,
            rowsPerPage: observable,
            contactListCount: observable,
            sortDirection: observable,
            sortField: observable,
            errorStatus: observable,
            isSaveDisabled: observable,
            _contactList: observable,
            newContactItem: observable
        });

        this.getContactList();
        this.updateContactsTable();
    }

    get contactList() {
        return this._contactList
    }

    getContactList = () => {
        runInAction(() => this._rawContactList = ContactsMockData)
    }

    handleRemoveContact = (item) => {
        const contactIndex = this._contactList.indexOf(item)
        const rawIndex = this._rawContactList.indexOf(item)

        runInAction(() => {
            this._contactList.splice(contactIndex, 1)
            this._rawContactList.splice(rawIndex, 1)
        })

        this.updateContactsTable();
    }

    handleModalStatus = (selectedItem) => {
        this.handleResetForm();
        this.handleInitialFormState(selectedItem);
    }

    handleInitialFormState = (selectedItem) => {
        runInAction(() => {
            this.prevSelectedContact = selectedItem ? toJS(selectedItem) : {}
            this.isAddEditFormActive = !this.isAddEditFormActive
            this.selectedOperation = selectedItem ? "edit" : "add"
            this.newContactItem = this.prevSelectedContact
        })
    }

    setContactItem = (inputValue) => {
        runInAction(() => {
            var itemPlaceholder = this.newContactItem;
            itemPlaceholder[inputValue.name] = inputValue.value

            this.newContactItem = toJS(itemPlaceholder)
        })

    }

    validateForm = (fieldName) => {
        const fieldValue = this.newContactItem[fieldName]
        const isFieldValid = validateInputField(fieldName, fieldValue)
        let itemIndex = this.fieldErrors.indexOf(fieldName)

        runInAction(() =>
            isFieldValid && itemIndex !== -1 ? this.fieldErrors.splice(itemIndex, 1) : (!isFieldValid && itemIndex === -1 ? this.fieldErrors.push(fieldName) : false)
        )

        runInAction(() => {
            this.isSaveDisabled = this.fieldErrors.length > 0 || !(this.newContactItem.hasOwnProperty("firstName")) || !(this.newContactItem.hasOwnProperty("lastName")) 
            || !(this.newContactItem.hasOwnProperty("emailAddress")) || !(this.newContactItem.hasOwnProperty("phoneNumber") || !(this.newContactItem.hasOwnProperty("homeAddress")) ) ? true : false
            this.errorStatus = ""
        })
    }

    checkIfRecordExists = () => {
        const isEditing = this.prevSelectedContact.emailAddress ? !(checkIfPropertyExistsInObject(this.prevSelectedContact, this.newContactItem, "emailAddress")) : true
        const isExists = isEditing && checkIfPropertyExistsInArray(this._contactList, this.newContactItem, "emailAddress")
        
        return isExists;
    }

    handleAddEditContact = () => {
        if (this.checkIfRecordExists()) {
            runInAction(() => {
                this.isSaveDisabled = true
                this.errorStatus = "active"
            })
        }
        else {
            this.processNewContact();
            this.handleModalStatus();
            this.updateContactsTable();
        }
    }

    handleResetForm = () => {
        runInAction(() => {
            this.fieldErrors = [];
            this.isSaveDisabled = true;
            this.errorStatus = "";
        })
    }

    processNewContact() {
        const item = toJS(this.newContactItem)

        runInAction(() => {
            if (this.selectedOperation === "add") {
                runInAction(() => {
                    this._contactList.push(item)
                    this._rawContactList.push(item)
                })
            }
            else {
                for (var i in this._contactList) {
                    if (this._contactList[i].emailAddress === this.prevSelectedContact.emailAddress) {
                        this._contactList[i] = this.newContactItem;
                        break;
                    }
                }

                for (var index in this._rawContactList) {
                    if (this._rawContactList[index].emailAddress === this.prevSelectedContact.emailAddress) {
                        this._rawContactList[index] = this.newContactItem;
                        break;
                    }
                }
            }
        })
    }

    handlePageOnChange = (event, newPage) => {
        runInAction(() => this.currentPagination = newPage)

        this.updateContactsTable()
    }

    handleRowsPerPageChange = (event) => {
        runInAction(() => {
            this.rowsPerPage = parseInt(event.target.value, 10)
            this.currentPagination = 0;
        })

        this.updateContactsTable()
    }

    updateContactsTable = (searchValue) => {
        var searchResults = this.handleSearch(searchValue);
        var sortResults = this.sortResults(searchResults);
        runInAction(() => this.contactListCount = searchResults.length)

        this.updateTableResults(sortResults);
    }

    handleSearch = (value) => {
        if (value) {
            const searchValue = value.toString().toLowerCase();
            const updatedList = this._rawContactList.filter((item) => {
                return Object.keys(item).some((key) => item[key] ? item[key].toString().toLocaleLowerCase().includes(searchValue) : false)
            })

            runInAction(() => {
                this._contactList = updatedList
                this.currentPagination = 0
            })
        }
        else {
            runInAction(() => this._contactList = this._rawContactList)
        }
        
        return this._contactList
    }


    sortResults(list) {
        var sortField = this.sortField.charAt(0).toLocaleLowerCase() + this.sortField.slice(1);
        var sortDirection = this.sortDirection
        var results = Object.values(list).sort(function (a, b) {
            var c = a[sortField] === null || a[sortField] === undefined ? "" : a[sortField].toString()
            var d = b[sortField] === null || b[sortField] === undefined? "" : b[sortField].toString()
            if (sortDirection === "asc")
                return c.localeCompare(d, undefined, { numeric: true })

            return d.localeCompare(c, undefined, { numeric: true });
        });

        return results;
    }

    updateTableResults(list) {
        var start = (this.currentPagination) * this.rowsPerPage;
        var end = (+start + +this.rowsPerPage);
        var allResults = !list ? this._rawContactList : list;

        runInAction(() => this._contactList = allResults.slice(start, end))
    }

    sortColumn = (column) => {
        runInAction(() => {
            if (this.sortField === column) {
                const dir = this.sortDirection === "asc" ? "desc" : "asc";
                this.sortDirection = dir;
            }
            else {
                this.sortDirection = "asc";
            }
            this.currentPagination = 0;
            this.sortField = column;
        })

        this.updateContactsTable();
    }
}

export default new ContactStore();