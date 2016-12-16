(function () {
    "use strict";

    // Page Objects
    var AlertsPage = require("../page-objects/alerts.js");
    var page;

    describe("Alerts page", function () {
        page = new AlertsPage();

        it("should have a title", function () {
            browser.get("http://localhost:9000/#/main/alerts");
            expect(browser.getTitle()).toEqual("http://localhost:9000/#/");
        });

        it("should have a global logo", function () {
            expect(page.globalLogo).toBeDefined();
        });

        it("should be able to navigate to Alerts", function () {
            page.navigateToAlerts();

            expect(page.h2Header.getText()).toEqual("Sample 01\n\Edit Dashboard\n\Refresh");
        });
    });
})();
