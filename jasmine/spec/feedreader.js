/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

"use strict";
/* By placing all test in the $(function() this ensure the test don't run until the DOM is ready. */
$(function() {

    /* This is the first test suite about RSS feeds.  */
    describe('RSS Feeds', function() {
        /*
         * This test is to see that all feeds are to be defined and not empty 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* 
         * This test to make sure that all URL feeds are defined and not empty 
         */

        it('all URL feeds are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /*
         * This test makes sure that all feeds have a defined name and are not empty 
         */
        it('all feeds have a defined name and are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });



    /* A new test suite called the menu */
    describe('The Menu', function() {



        /* 
         * This test makes sure that the menu is hidden by default
         */
        it('menu hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* This test ensures that the menu changes
         * visibility when the menu icon is clicked.
         * 
         */
        it('menu shows on click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });
});

/* A new test wuite called initial entries */
describe('Initial entries', function() {
    /* This test ensures that when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    beforeEach(function(done) {
        loadFeed(0, done);
    });

    it('at least one feed element is found when called and done', function() {
        let entry = document.querySelectorAll('.feed .entry');
        expect(entry.length).toBeGreaterThan(0);
    });
});

/*A new test suite called New Feed Section */
describe('New Feed Selection', function() {

    let firstFeed;
    let secondFeed;

    /* This test ensures that when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */

    /*looks at the first feeds html */
    beforeEach(function(done) {
        loadFeed(0, function() {
            firstFeed = $('.feed').html();
            done();
        });

        /* looks at the second feeds html */
        loadFeed(1, function(done) {
            secondFeed = $('.feed').html();
            done();
        });
    });

    /* Makes sure that the first feeds html is not equal to the second feeds html*/
    it('changes the loaded content', function() {
        expect(firstFeed).not.toBe(secondFeed);
    });
});