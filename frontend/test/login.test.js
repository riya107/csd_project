const assert = require("assert");

const { verifyLoginData } = require("../src/utils");

const emails = [
    "abc@",
    "pqr@gmail.com",
    "smb"
]

const passwords = [
    "abc",
    "Abc@1234",
    "12345678"
]

describe("LoginData", () => {
    describe("email", () => {
        for(let i=0;i<3;i++){
            it(`${emails[i]}`, () => {
                assert.equal(true,verifyLoginData({email:emails[i],password:"Abc@1234"}));
            });
            
        }
    })
    describe("password", () => {
        for(let i=0;i<3;i++){
            it(`${passwords[i]}`, () => {
                assert.equal(true,verifyLoginData({email:"abc@gmail.com",password:passwords[i]}));
            });
            
        }
    })
});