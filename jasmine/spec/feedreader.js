/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
  describe('RSS Feeds', () => {
    /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
    it('are defined', () => {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
    it('have URLs', () => {
      allFeeds.forEach((feed) => {
        expect(feed.url).toBeDefined();

        expect(feed.url.length).not.toBe(0);

        expect(feed.url).toMatch(/^(http|https):\/\//);
      });
    });

    /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

    it('have names', () => {
      allFeeds.forEach((feed) => {
        expect(feed.name).toBeDefined();

        expect(typeof feed.name).toBe('string');

        expect(feed.name.length).not.toBe(0);
      });
    });
  });
  /* TODO: Write a new test suite named "The menu" */
  describe('The menu', () => {
    const body = document.body;
    const menuIcon = document.querySelector('.menu-icon-link');

    /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
    it("body has 'menu-hidden' initially", () => {
      expect(body.className).toContain('menu-hidden');
    });
    /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
    it("body toggles the class 'menu-hidden' on clicking menu icon", () => {
      menuIcon.click();

      expect(body.className).not.toContain('menu-hidden');


      menuIcon.click();

      expect(body.className).toContain('menu-hidden');
    });
  });
  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', () => {
  /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    beforeEach((done) => {
      loadFeed(0, () => {
        done();
      });
    });

    it('has at least 1 entry after loadFeed function is called', (done) => {
      const numEntries = document.querySelector('.feed').getElementsByClassName('entry').length;

      expect(numEntries).toBeGreaterThan(0);

      done();
    });

    it("has a entry that has a link starting with 'http(s)://'", (done) => {
      const entries = document.querySelector('.feed').getElementsByClassName('entry-link');

      for (let i = 0; i < entries.length; i++) {
        expect(entries[i].href).toMatch(/^(http|https):\/\//);
      }

      done();
    });
  });
  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', () => {
  /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    let initFeedSelection;

    beforeEach((done) => {
      loadFeed(0, () => {
        initFeedSelection = document.querySelector('.feed').innerHTML;
        loadFeed(1, () => {
          done();
        });
      });
    });

    // Make sure when new feed is loaded using loadFeed function,
    // the content changes

    it('changes its loaded content', (done) => {
      const newFeedSelection = document.querySelector('.feed').innerHTML;

      expect(initFeedSelection).not.toBe(newFeedSelection);

      done();
    });
  });
}());
