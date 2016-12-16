(function () {
    "use strict";

    var AlertsPage = function () {
        browser.get("http://localhost:9000/#/main/alerts");
    };

    AlertsPage.prototype = Object.create({}, {
        globalLogo: {
            get: function () {
                return element(by.id("logo-img"));
            }
        },
        navigateToAlerts: {
            value: function () {
                browser.get("http://localhost:9000/#/");
            }
        },
        h2Header: {
            get: function () {
                return element(by.css("h2.dashboard-title")).getText();
            }
        }
    });

    module.exports = AlertsPage;
})();
