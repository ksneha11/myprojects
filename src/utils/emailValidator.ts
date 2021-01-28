// Function isn't super technical all it's looking for is if the email passed in is in a:
// @company.domain and that it doesn't start with a special character or period
export const isEmailAddressValid = (value: string): boolean => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,5})+$/gm.test(value)) {
        return true;
    } else {
        return false;
    }
};
