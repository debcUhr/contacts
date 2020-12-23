
export const validateInputField = (fieldType, fieldValue) => {
    let newFieldValue = fieldValue ? fieldValue.trim() : ""

    if (fieldType === "emailAddress") {
        let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailFormat.test(newFieldValue.toLocaleLowerCase());
    }
    else {
        return newFieldValue ? true : false
    }

}

export const returnMatchedValue = (array, searchValue) => {
    const updatedList = array.filter((item) => {
        return Object.keys(item).some((key) => item[key] ? item[key].toString().toLocaleLowerCase().includes(searchValue) : false)
    })

    return updatedList;
}

export const checkIfPropertyExistsInArray = (array, object, columnChecker) => {
    const objectValue = object[columnChecker] ? object[columnChecker] : ""
    return array.some(item => item[columnChecker].toLocaleLowerCase() === objectValue.toLocaleLowerCase())
}

export const checkIfPropertyExistsInObject = (firstObj, secondObj, columnChecker) => {
    const objectValue = secondObj[columnChecker] ? secondObj[columnChecker] : ""
    return firstObj[columnChecker].toLocaleLowerCase() === objectValue.toLocaleLowerCase()
}