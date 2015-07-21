/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined.', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Iterate through allFeeds array and make sure each url is
         * not undefined and not empty
         */
        it('URL is defined and not empty on all feed of allFeeds object.', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        /* TODO: Iterate through allFeeds array and make sure each feed name is
         * not undefined and not empty
         */
        it('name is defined and not empty on all feed of allFeeds object.', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* TODO: Write a few test cases to interact with "The menu" */
    describe('The menu', function() {
        // TODO: make sure <body class="menu-hidden"> is available upon page load
        it('is hidden by default.', function() {
            expect($('body.menu-hidden').length).not.toBe(0);
        });

        /* TODO: confirm if <body class="menu-hidden"> tag is removed when icon menu
         * is clicked. Confirm <body class="menu-hidden"> tag is now reappeared in the DOM
         * on second click of the icon menu
         */
        it('changes visibility when the menu icon is clicked.', function() {
            // click menu icon to open menu
            $('.icon-list').click();
            expect($('body.menu-hidden').length).toBe(0);

            // click menu icon again to close menu
            $('.icon-list').click();
            expect($('body.menu-hidden').length).not.toBe(0);
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" to test inital call to loadFeed() */
    describe('Initial Entries', function() {
        /* TODO: Write a test that makes async call to loadFeed and wait until the result is returned
         * Confirmed that the entry result is not empty.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has at least single .entry exists within .feed upon calling loadFeed().', function(done) {
            expect($('.entry').length).not.toBe(0);
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" and confirm various results from the change */
    describe('New Feed Selection', function() {
        /* TODO: Write a test to compare a first async call with second and confirmed that the return content
         * is not same.
         */
        // content receviced from 1st and 2nd call
        var previousContent;
        var currentContent;

        beforeEach(function(done) {
            loadFeed(0,function(){
                // first result
                previousContent = $('.feed').html();
                loadFeed(2,done);
            });
        });

        it('changes content from old feed.', function(done) {
            // second result
            currentContent = $('.feed').html();
            expect(currentContent).not.toBe(previousContent);
            done();
        });
        // reset feed back to first
        afterAll(function(done){
            loadFeed(0,done);
        });
    });
}());
