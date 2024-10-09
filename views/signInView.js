import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Sign in");
    }

    async getHtml() {
        return `
          <h1>User signed in</h1>
        `;
    }

    async init() {
        const signInForm = document.getElementById("sign-in-form")
        signInForm.addEventListener("submit", function () {
            const usernameOrEmail = document.getElementById("usernameOrEmail").value
            const password = document.getElementById("password").value

            signIn(usernameOrEmail, password)
        })
    }
}