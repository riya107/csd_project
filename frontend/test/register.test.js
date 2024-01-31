const assert = require("assert");

const { verifyRegisterData } = require("../src/utils");

const phone_numbers = [
    "abc",
    "890890",
    "9898786745"
]

const roles = [
    "abc",
    "customer",
    "shop"
]

describe("RegisterData", () => {
    describe("phone number", () => {
        for(let i=0;i<3;i++){
            it(`${phone_numbers[i]}`, () => {
                assert.equal(true,verifyRegisterData({phone_number:phone_numbers[i],password:"Abc@1234", email:"abc@gmail.com", role:"shop", name:"Aditi"}));
            });
            
        }
    })
    describe("roles", () => {
        for(let i=0;i<3;i++){
            it(`${roles[i]}`, () => {
                assert.equal(true,verifyRegisterData({phone_number:"8784683490",password:"Abc@1234", email:"abc@gmail.com", role:roles[i], name:"Aditi"}));
            });
            
        }
    })
});