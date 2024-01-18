importScripts("./thirdparty/browser-polyfill.js");

// https://developer.chrome.com/docs/extensions/reference/action/#emulating-pageactions-with-declarativecontent

// Wrap in an onInstalled callback in order to avoid unnecessary work
// every time the background script is run
browser.runtime.onInstalled.addListener(() => {
  // Page actions are disabled by default and enabled on select tabs
  browser.action.disable();

  // Clear all rules to ensure only our expected rules are set
  browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Declare a rule to enable the action on selected pages
    let rules = [{
      conditions: [
        new browser.declarativeContent.PageStateMatcher({
          pageUrl: {hostSuffix: '.lowendtalk.com'},
        })
      ],
      actions: [new browser.declarativeContent.ShowAction()],
    },{
      conditions: [
        new browser.declarativeContent.PageStateMatcher({
          pageUrl: {hostSuffix: '.lowendspirit.com'},
        })
      ],
      actions: [new browser.declarativeContent.ShowAction()],
    }];

    // Finally, apply our new array of rules
    browser.declarativeContent.onPageChanged.addRules(rules);
  });
});
