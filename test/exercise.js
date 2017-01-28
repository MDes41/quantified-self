var assert     = require('chai').assert;
var expect     = require('chai').expect;
var webdriver  = require('selenium-webdriver');
var test       = require('selenium-webdriver/testing');

test.describe('testing exercises.html', function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.xit('should allow me to add a name and calories for an exercise', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name     = driver.findElement({id: 'exercise-name-input'})
    var calories = driver.findElement({id: 'exercise-calories-input'})

    name.sendKeys('running');

    name.getAttribute('value').then(function(value) {
      assert.equal(value, 'running');
    });

    calories.sendKeys('300');

    calories.getAttribute('value').then(function(value){
      assert.equal(value, '300');
    });
  });

  test.xit('should allow me to create an exercise', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name     = driver.findElement({id: 'exercise-name-input'});
    var calories = driver.findElement({id: 'exercise-calories-input'});
    var submitButton   = driver.findElement({id: 'add-exercise'});

    name.sendKeys('running');
    calories.sendKeys('300');
    submitButton.click();

    driver.findElement({css: '#exercise-table tbody tr td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'running');
    })

    driver.findElement({css: '#exercise-table tbody tr td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '300');
    })
  });

  test.xit('my exercises exist when I visit the site', function(){
    driver.get('http://localhost:8080/exercises.html');

    var data = JSON.stringify([{name: 'running', calories: '300'}]);

    driver.executeScript("window.localStorage.setItem('exercises','" + data+ "');");

    driver.get('http://localhost:8080/exercises.html');

    driver.findElement({css: '#exercise-table tbody tr td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'running');
    })

    driver.findElement({css: '#exercise-table tbody tr td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '300');
    })
  });

  test.xit('the calorie field is validated', function(){
    driver.get('http://localhost:8080/exercises.html');

    var calories       = driver.findElement({id: 'exercise-calories-input'});
    var submitButton   = driver.findElement({id: 'add-exercise'});

    calories.sendKeys('300');
    submitButton.click();

    driver.findElement({css: '.form-error'}).getText().then(function(textValue) {
      assert.equal(textValue, 'Please enter an exercise name');
    })
  });

  test.xit('the name field is validated', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name           = driver.findElement({id: 'exercise-name-input'});
    var submitButton   = driver.findElement({id: 'add-exercise'});

    name.sendKeys('running');
    submitButton.click();

    driver.findElement({css: '.form-error'}).getText().then(function(textValue) {
      assert.equal(textValue, 'Please enter a calorie amount');
    })
  });

  test.xit("doesn't allow an exercise to be created if a field is invalid", function(){
    driver.get('http://localhost:8080/exercises.html');

    var name           = driver.findElement({id: 'exercise-name-input'});
    var submitButton   = driver.findElement({id: 'add-exercise'});

    name.sendKeys('running');
    submitButton.click();

    driver.findElement({id: 'table-body'}).getText().then(function(value){
      expect(value).to.be.empty;
    });
  });

  test.xit('maintains order when refreshed', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name     = driver.findElement({id: 'exercise-name-input'});
    var calories = driver.findElement({id: 'exercise-calories-input'});
    var submitButton   = driver.findElement({id: 'add-exercise'});

    name.sendKeys('running');
    calories.sendKeys('300');
    submitButton.click();

    name.sendKeys('basketball');
    calories.sendKeys('23');
    submitButton.click();

    driver.findElement({css: '#exercise-table tbody tr:nth-of-type(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'basketball');
    })

    driver.findElement({css: '#exercise-table tbody tr:nth-of-type(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '23');
    })

    driver.findElement({css: '#exercise-table tbody tr:nth-of-type(2) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'running');
    })

    driver.findElement({css: '#exercise-table tbody tr:nth-of-type(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '300');
    })

    driver.get('http://localhost:8080/exercises.html');

    driver.findElement({css: '#exercise-table tbody tr:nth-of-type(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'basketball');
    })

    driver.findElement({css: '#exercise-table tbody tr:nth-of-type(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '23');
    })

    driver.findElement({css: '#exercise-table tbody tr:nth-of-type(2) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'running');
    })

    driver.findElement({css: '#exercise-table tbody tr:nth-of-type(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '300');
    })
  })

  test.xit('can delete an exercise', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name     = driver.findElement({id: 'exercise-name-input'});
    var calories = driver.findElement({id: 'exercise-calories-input'});
    var submitButton   = driver.findElement({id: 'add-exercise'});

    name.sendKeys('running');
    calories.sendKeys('300');
    submitButton.click();

    driver.findElement({css: '.delete-exercise'}).click();

    driver.findElement({id: 'table-body'}).getText().then(function(value){
      expect(value).to.be.empty;
    });
  })

  test.xit('lets you click on name or calories and they become input fields containing the current values', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name     = driver.findElement({id: 'exercise-name-input'});
    var calories = driver.findElement({id: 'exercise-calories-input'});
    var submitButton   = driver.findElement({id: 'add-exercise'});

    name.sendKeys('running');
    calories.sendKeys('300');
    submitButton.click();

    var exerciseName = driver.findElement({css: '#exercise-table tbody tr:nth-of-type(1) td:nth-child(1)'});

    // excerciseName.click();

    // driver.sleep(1000000)
  })

  test.xit('lets you change the exercise name inline', function() {
    driver.get('http://localhost:8080/exercises.html');

    var name           = driver.findElement({id: 'exercise-name-input'});
    var calories       = driver.findElement({id: 'exercise-calories-input'});
    var submitButton   = driver.findElement({id: 'add-exercise'});
    var elseWhere      = driver.findElement({css: '.container'});

    name.sendKeys('running');
    calories.sendKeys('300');
    submitButton.click();

    var exerciseName = driver.findElement({css: '#exercise-table tbody tr:nth-of-type(1) td:nth-child(1)'});

    exerciseName.click();
    exerciseName.sendKeys(' hard');
    elseWhere.click();

    driver.findElement({css: '#exercise-table tbody tr:nth-of-type(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'running hard');
    })
  })

  test.xit('persists the inline change after refresh', function() {
    driver.get('http://localhost:8080/exercises.html');

    var name           = driver.findElement({id: 'exercise-name-input'});
    var calories       = driver.findElement({id: 'exercise-calories-input'});
    var submitButton   = driver.findElement({id: 'add-exercise'});
    var elseWhere      = driver.findElement({css: '.container'});

    name.sendKeys('running');
    calories.sendKeys('300');
    submitButton.click();

    var exerciseName = driver.findElement({css: '#exercise-table tbody tr:nth-of-type(1) td:nth-child(1)'});

    exerciseName.click();
    exerciseName.sendKeys(' hard');
    elseWhere.click();

    driver.get('http://localhost:8080/exercises.html');

    driver.findElement({css: '#exercise-table tbody tr:nth-of-type(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'running hard');
    })
  })

  test.it('can filter by name', function() {
    driver.get('http://localhost:8080/exercises.html');

    var data = JSON.stringify([{name: 'running', calories: '300'}, {name: 'swimming', calories: '400'}]);

    driver.executeScript("window.localStorage.setItem('exercises','" +data+ "');");

    driver.get('http://localhost:8080/exercises.html');

    var filterInput = driver.findElement({css: '#name-filter'});
    filterInput.click();
    filterInput.sendKeys('s');

    driver.findElement({css: '#table-body'}).getText().then(function(textValue) {
      assert.include(textValue, 'swimming');
      assert.notInclude(textValue, 'running');
    })
  })
});
