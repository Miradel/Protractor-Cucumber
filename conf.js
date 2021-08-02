let browser = require("protractor");
let reporter = require('cucumber-html-reporter');


exports.config = {
    //Set to custom for cucumber framework
    framework: 'custom',
    //Path that is relative to current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    //Connection to selenium
    seleniumServerJar: './jars/selenium-server-standalone-3.141.59.jar',
    //seleniumAddress : 'http://localhost:4444/wd/hub',
    //directConnection : true

    //drivers
    chromeDriver: './jars/chromedriver',
    //geckoDriver: '',
    // if you need to test IE -
    // localSeleniumStandaloneOpts:{
    //     jvmArgs:["-Dwebdriver.ie.driver=./jars/IEDriverServer-3.4.0.exe"]
    // },
    ignoreUncaughtExceptions: true,

    //Feature file
    specs: [
        './test/features/*.feature'
    ],
    cucumberOpts: {
        //step definication
        require: [
            './test/step_definitions/*.js'
        ],
        tags: ['@test'],
        format: ['json:./report/cucumber_report.json']

    },
    beforeLaunch: () => {
        /*
        A callback function called once configs are read but before any 
        environment setup. This will only run once before onPrepare to bring
         up test dependencies.
         */

    },

    onPrepare: () => {
         /*A callback function called once protractor is ready and available,
          and before the tests are executed. If multiple capabilities are 
          being run, this will run once per capability.*/
         let globals = require('protractor');
         browser = globals.browser;
         browser.ignoreSynchronization = true;
         browser.waitForAngularEnabled();
         browser.waitForAngular(5000);
 
         //browser window setting
         browser.manage().window().maximize();
 
         // implicit wait
         browser.manage().timeouts().implicitlyWait(50000);
 
         //assertion library
         global.chai = require('chai');
         global.expect = chai.expect;
         var chaiAsPromised = require('chai-as-promised');
         chai.use(chaiAsPromised);

    },

    onComplete: function(){
        /*
        A callback function called once tests are finished. onComplete can optionally
         return a promise, which Protractor will wait for before shutting down
          webdriver. At this point, tests will be done but global objects will 
          still be available.*/
        let options = {
            theme: 'bootstrap',
            jsonFile: './report/cucumber_report.json',
            output: './report/cucumber_report.html',
            reportSuiteAsScenarios: true,
            scenarioTimestamp: true,
            launchReport: true,
            metadata:{
                "test environment": "UAT",
                "browser": "Chrome"
            }
        };
        reporter.generate(options);
    },

    onCleanUp: function() {
        /*
            A callback function called once the tests have finished running and
            the WebDriver instance has been shut down. This is called once per
            capability.
        */
    }, 
    afterLaunch: function() {
        /* A callback function called once all tests have finished running and
        the WebDriver instance has been shut down. It is passed the exit 
        code(0 if the tests passed). This is called only once before the program
        exits (after onCleanUp). */
        console.log('cleaning up')
    }



}