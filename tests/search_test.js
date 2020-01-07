Feature("Search");

Scenario("Open app", I => {
  I.amOnPage("/");
  I.see("Search Yelp");
});

Scenario("Change location to NYC", I => {
  I.amOnPage("/");
  I.see("Search Yelp");
  I.see("Search");
  I.click("//ion-button");
  I.waitForText("Setup location", 5);
  I.click("Custom location");
  I.see("Enter location");
  I.fillField("Enter location", "NYC");
  I.seeElement("//ion-button");
  I.click("//ion-button[@type='submit']");
  I.seeElement("//ion-searchbar");
});

Scenario("Search results", I => {
  I.amOnPage("/");
  I.see("Search Yelp");
  I.see("Search");
  I.click("//ion-button");
  I.waitForText("Setup location", 5);
  I.click("Custom location");
  I.see("Enter location");
  I.fillField("Enter location", "NYC");
  I.seeElement("//ion-button");
  I.click("//ion-button[@type='submit']");
  I.seeElement("//ion-searchbar");
  //ion-searchbar becomes unfocusable if it's not waited with plain wait() function
  I.wait(3);
  I.fillField("Search", "apple");
  I.waitForElement("//app-business");
  I.seeElement("//app-business");
});

Scenario("View details", I => {
  //For some reason codeceptjs throws an error when trying to click on search result
  //therefore we navigate directly
  //should be solved later
  I.amOnPage("/details/hNUPtvhc4VyD5bOVwnTulA");
  I.see("Business details");
  I.see("Apple");
});
