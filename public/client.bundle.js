/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 210);
/******/ })
/************************************************************************/
/******/ ({

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global TrelloPowerUp */

// we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;

var HYPERDEV_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Fhyperdev.svg';
var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';

var randomBadgeColor = function randomBadgeColor() {
  return ['green', 'yellow', 'red', 'none'][Math.floor(Math.random() * 4)];
};

var getBadges = function getBadges(t) {
  return t.card('name').get('name').then(function (cardName) {
    console.log('We just loaded the card name for fun: ' + cardName);

    return [{
      // dynamic badges can have their function rerun after a set number
      // of seconds defined by refresh. Minimum of 10 seconds.
      dynamic: function dynamic() {
        // we could also return a Promise that resolves to this as well if we needed to do something async first
        return {
          title: 'Detail Badge', // for detail badges only
          text: 'Dynamic ' + (Math.random() * 100).toFixed(0).toString(),
          icon: HYPERDEV_ICON, // for card front badges only
          color: randomBadgeColor(),
          refresh: 10 // in seconds
        };
      }
    }, {
      // its best to use static badges unless you need your badges to refresh
      // you can mix and match between static and dynamic
      title: 'Detail Badge', // for detail badges only
      text: 'Static',
      icon: HYPERDEV_ICON, // for card front badges only
      color: null
    }, {
      // card detail badges (those that appear on the back of cards)
      // also support callback functions so that you can open for example
      // open a popup on click
      title: 'Popup Detail Badge', // for detail badges only
      text: 'Popup',
      icon: HYPERDEV_ICON, // for card front badges only
      callback: function callback(context) {
        // function to run on click
        return context.popup({
          title: 'Card Detail Badge Popup',
          url: './settings.html',
          height: 184 // we can always resize later, but if we know the size in advance, its good to tell Trello
        });
      }
    }, {
      // or for simpler use cases you can also provide a url
      // when the user clicks on the card detail badge they will
      // go to a new tab at that url
      title: 'URL Detail Badge', // for detail badges only
      text: 'URL',
      icon: HYPERDEV_ICON, // for card front badges only
      url: 'https://trello.com/home',
      target: 'Trello Landing Page' // optional target for above url
    }];
  });
};

var boardButtonCallback = function boardButtonCallback(t) {
  return t.popup({
    title: 'Popup List Example',
    items: [{
      text: 'Open Overlay',
      callback: function callback(t) {
        return t.overlay({
          url: './overlay.html',
          args: { rand: (Math.random() * 100).toFixed(0) }
        }).then(function () {
          return t.closePopup();
        });
      }
    }, {
      text: 'Open Board Bar',
      callback: function callback(t) {
        return t.boardBar({
          url: './board-bar.html',
          height: 200
        }).then(function () {
          return t.closePopup();
        });
      }
    }]
  });
};

var cardButtonCallback = function cardButtonCallback(t) {
  // Trello Power-Up Popups are actually pretty powerful
  // Searching is a pretty common use case, so why reinvent the wheel

  var items = ['acad', 'arch', 'badl', 'crla', 'grca', 'yell', 'yose'].map(function (parkCode) {
    var urlForCode = 'http://www.nps.gov/' + parkCode + '/';
    var nameForCode = '🏞 ' + parkCode.toUpperCase();
    return {
      text: nameForCode,
      url: urlForCode,
      callback: function callback(t) {
        // in this case we want to attach that park to the card as an attachment
        return t.attach({ url: urlForCode, name: nameForCode }).then(function () {
          // once that has completed we should tidy up and close the popup
          return t.closePopup();
        });
      }
    };
  });

  // we could provide a standard iframe popup, but in this case we
  // will let Trello do the heavy lifting
  return t.popup({
    title: 'Popup Search Example',
    items: items, // Trello will search client side based on the text property of the items
    search: {
      count: 5, // how many items to display at a time
      placeholder: 'Search National Parks',
      empty: 'No parks found'
    }
  });

  // in the above case we let Trello do the searching client side
  // but what if we don't have all the information up front?
  // no worries, instead of giving Trello an array of `items` you can give it a function instead
  /*
  return t.popup({
    title: 'Popup Async Search',
    items: function(t, options) {
      // use options.search which is the search text entered so far
      // and return a Promise that resolves to an array of items
      // similar to the items you provided in the client side version above
    },
    search: {
      placeholder: 'Start typing your search',
      empty: 'Huh, nothing there',
      searching: 'Scouring the internet...'
    }
  });
  */
};

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  // NOTE about asynchronous responses
  // If you need to make an asynchronous request or action before you can reply to Trello
  // you can return a Promise (bluebird promises are included at TrelloPowerUp.Promise)
  // The Promise should resolve to the object type that is expected to be returned
  'attachment-sections': function attachmentSections(t, options) {
    // options.entries is a list of the attachments for this card
    // you can look through them and 'claim' any that you want to
    // include in your section.

    // we will just claim urls for Yellowstone
    var claimed = options.entries.filter(function (attachment) {
      return attachment.url.indexOf('http://www.nps.gov/yell/') === 0;
    });

    // you can have more than one attachment section on a card
    // you can group items together into one section, have a section
    // per attachment, or anything in between.
    if (claimed && claimed.length > 0) {
      // if the title for your section requires a network call or other
      // potentially length operation you can provide a function for the title
      // that returns the section title. If you do so, provide a unique id for
      // your section
      return [{
        id: 'Yellowstone', // optional if you aren't using a function for the title
        claimed: claimed,
        icon: HYPERDEV_ICON,
        title: 'Example Attachment Section: Yellowstone',
        content: {
          type: 'iframe',
          url: t.signUrl('./section.html', { arg: 'you can pass your section args here' }),
          height: 230
        }
      }];
    } else {
      return [];
    }
  },
  'attachment-thumbnail': function attachmentThumbnail(t, options) {
    // options.url has the url of the attachment for us
    // return an object (or a Promise that resolves to it) with some or all of these properties:
    // url, title, image, openText, modified (Date), created (Date), createdBy, modifiedBy

    // You should use this if you have useful information about an attached URL
    // however, it doesn't warrant pulling it out into a section
    // for example if you just want to show a preview image and give it a better name

    return {
      url: options.url,
      title: '👉 ' + options.url + ' 👈',
      image: {
        url: HYPERDEV_ICON,
        logo: true // false if you are using a thumbnail of the content
      },
      openText: 'Open Sesame'
    };

    // if we don't actually have any valuable information about the url
    // we can let Trello know like so:
    // throw t.NotHandled();
  },
  'authorization-status': function authorizationStatus(t, options) {
    // return a promise that resolves to the object with
    // a property 'authorized' being true/false
    // you can also return the object synchronously if you know the answer synchronously
    return new TrelloPowerUp.Promise(function (resolve) {
      return resolve({ authorized: true });
    });
  },
  'board-buttons': function boardButtons(t, options) {
    return [{
      // we can either provide a button that has a callback function
      // that callback function should probably open a popup, overlay, or boardBar
      icon: WHITE_ICON,
      text: 'Popup',
      callback: boardButtonCallback
    }, {
      // or we can also have a button that is just a simple url
      // clicking it will open a new tab at the provided url
      icon: WHITE_ICON,
      text: 'URL',
      url: 'https://trello.com/inspiration',
      target: 'Inspiring Boards' // optional target for above url
    }];
  },
  'card-badges': function cardBadges(t, options) {
    return getBadges(t);
  },
  'card-buttons': function cardButtons(t, options) {
    return [{
      // usually you will provide a callback function to be run on button click
      // we recommend that you use a popup on click generally
      icon: GRAY_ICON, // don't use a colored icon here
      text: 'Open Popup',
      callback: cardButtonCallback
    }, {
      // but of course, you could also just kick off to a url if that's your thing
      icon: GRAY_ICON,
      text: 'Just a URL',
      url: 'https://developers.trello.com',
      target: 'Trello Developer Site' // optional target for above url
    }];
  },
  'card-detail-badges': function cardDetailBadges(t, options) {
    return getBadges(t);
  },
  'card-from-url': function cardFromUrl(t, options) {
    // options.url has the url in question
    // if we know cool things about that url we can give Trello a name and desc
    // to use when creating a card. Trello will also automatically add that url
    // as an attachment to the created card
    // As always you can return a Promise that resolves to the card details

    return new Promise(function (resolve) {
      resolve({
        name: '💻 ' + options.url + ' 🤔',
        desc: 'This Power-Up knows cool things about the attached url'
      });
    });

    // if we don't actually have any valuable information about the url
    // we can let Trello know like so:
    // throw t.NotHandled();
  },
  'format-url': function formatUrl(t, options) {
    // options.url has the url that we are being asked to format
    // in our response we can include an icon as well as the replacement text

    return {
      icon: GRAY_ICON, // don't use a colored icon here
      text: '👉 ' + options.url + ' 👈'
    };

    // if we don't actually have any valuable information about the url
    // we can let Trello know like so:
    // throw t.NotHandled();
  },
  'show-authorization': function showAuthorization(t, options) {
    // return what to do when a user clicks the 'Authorize Account' link
    // from the Power-Up gear icon which shows when 'authorization-status'
    // returns { authorized: false }
    // in this case we would open a popup
    return t.popup({
      title: 'My Auth Popup',
      url: './authorize.html', // this page doesn't exist in this project but is just a normal page like settings.html
      height: 140
    });
  },
  'show-settings': function showSettings(t, options) {
    // when a user clicks the gear icon by your Power-Up in the Power-Ups menu
    // what should Trello show. We highly recommend the popup in this case as
    // it is the least disruptive, and fits in well with the rest of Trello's UX
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184 // we can always resize later, but if we know the size in advance, its good to tell Trello
    });
  }
});

console.log('Loaded by: ' + document.referrer);

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(205);


/***/ })

/******/ });