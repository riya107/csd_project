const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
const phoneNumberRegex = /^\d{10}$/;

const verifyRegisterData = (data) => {
    const {name, role, email, password, phone_number} = data;
    if(!name || !role || !email || !password || !phone_number){
        return false;
    }
    if(role!=="customer" && role!=="shop"){
        return false;
    }
    return emailRegex.test(email) && passwordRegex.test(password) && phoneNumberRegex.test(phone_number);
};

module.exports = {verifyRegisterData};