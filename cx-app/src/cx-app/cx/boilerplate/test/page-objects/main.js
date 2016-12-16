(function () {
    "use strict";

    var MainPage = function () {
        browser.get("http://localhost:9000/#/main");
    };

    MainPage.prototype = Object.create({}, {
        globalLogo: {
            get: function () {
                return element(by.id("logo-img"));
            }
        },
        loginUserName: {
            get: function () {
                return element(by.model("_username"));
            }
        },
        loginPassword: {
            get: function () {
                return element(by.model("_password"));
            }
        },
        loginSubmitButton: {
            get: function () {
                return element(by.id("login"));
            }
        },
        loginSetUser: {
            value: function (keys) {
                return this.loginUserName.sendKeys(keys);
            }
        },
        loginSetPassword: {
            value: function (keys) {
                return this.loginPassword.sendKeys(keys);
            }
        },
        loginSubmitForm: {
            value: function () {
                this.loginSubmitButton.click();
            }
        },
        loginSuccessHeader: {
            get: function () {
                return element(by.css("h2.text-success")).getText();
            }
        },
        navigateToAlerts: {
            value: function () {
                browser.get("http://localhost:9000/#/main/alerts");
            }
        },
        h2Header: {
            get: function () {
                return element(by.css("h2")).getText();
            }
        }

        //  ,
        //  greeting: {
        //      get: function () {
        //          return element(by.binding("yourName")).getText();
        //      }
        //  },
        //  todoList: {
        //      get: function () {
        //          return element.all(by.repeater("todo in todos"));
        //      }
        //  },
        //  typeName: {
        //      value: function (keys) {
        //          return this.yourName.sendKeys(keys);
        //      }
        //  },
        //  todoAt: {
        //      value: function (idx) {
        //          return this.todoList.get(idx).getText();
        //      }
        //  },
        //  addTodo: {
        //      value: function (todo) {
        //          this.todoText.sendKeys(todo);
        //          this.addButton.click();
        //      }
        //  }
    });

    module.exports = MainPage;
})();
