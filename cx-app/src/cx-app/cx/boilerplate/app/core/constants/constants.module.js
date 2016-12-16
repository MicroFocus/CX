// jscs:disable 

(function () { "use strict"; 
 angular.module('app.core.constants', [])

.constant('config', {"appTitle":"MAIN APP","application":"##PROGRAM_NAME##","version":"##VERSION##","title":"##TITLE##","refresh":120000,"env":{"linters":{"continueOnError":false,"maxErrors":2}},"paths":{"app":"app","build":"build","tmp":".tmp","test":"test","tasks":"tasks","i18n":"i18n","locale":"en-US","deploy":"../target","assets":"/_assets/","api":"/_assets/api","bower":"/_assets/bower","sass":"/_assets/sass","css":"/_assets/css","fonts":"/_assets/fonts","img":"/_assets/img","componentSass":"/components/**/*.scss","jade":"/**/*.scss","ngdocTemplate":"./config/templates"},"urls":{"dashboardService":"/SentinelRESTServices/objects/dashboard","dashboardSeedData":"/core/dashboard/data/dashboard-seed.data.json"}})

.constant('appConfig', {"appTitle":"MAIN APP","application":"##PROGRAM_NAME##","version":"##VERSION##","title":"##TITLE##","refresh":120000,"env":{"linters":{"continueOnError":false,"maxErrors":2}},"paths":{"app":"app","build":"build","tmp":".tmp","test":"test","tasks":"tasks","i18n":"i18n","locale":"en-US","deploy":"../target","assets":"/_assets/","api":"/_assets/api","bower":"/_assets/bower","sass":"/_assets/sass","css":"/_assets/css","fonts":"/_assets/fonts","img":"/_assets/img","componentSass":"/components/**/*.scss","jade":"/**/*.scss","ngdocTemplate":"./config/templates"},"urls":{"dashboardService":"/SentinelRESTServices/objects/dashboard","dashboardSeedData":"/core/dashboard/data/dashboard-seed.data.json"}})

.value('debug', true)

; 

 })(); 

// jscs:enable
