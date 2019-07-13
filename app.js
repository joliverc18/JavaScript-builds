// Use IIFE
var budgetController = (function() {
    
    // Function constructor for Expense & Income objects
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        }
    };
    
    return {
        addItem: function(type, des, val) {
          var newItem, ID, lastInArray; 
          
          // Getting the last element's index in array
          lastInArray = data.allItems[type].length-1;
          
          // Creating a unique ID
          if (data.allItems[type].length > 0) {
            ID = data.allItems[type][lastInArray].id + 1;
          } else {
              ID = 0;
          }
          
          // Create new Item based on 'inc' or 'exp' type
          if (type === 'exp') {
              newItem = new Expense(ID, des, val);
          } else if (type === 'inc') {
              newItem = new Income(ID, des, val);
          }
          
          // Push item to data structure
          data.allItems[type].push(newItem);
          
          // Return the new item
          return newItem;
        },
        testing: function() {
            console.log(data);
        }
    };
    
})();

var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    
    return {
        getInput: function() {
            // Return an object containing three properties, instead of returning 3 properties itself
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either 'inc' or 'exp'
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        
        addListItem: function(obj, type) {
            var html, newHtml;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">+ %value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            } else if (type === 'exp') {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace the placeholder text with some actual data
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // Insert the HTML into the DOM
            
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
    
})();
                    

var controller = (function(budgetCtrl, UICtrl) {
    
    var setUpEventListeners = function () {
        
        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event) {
        
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        
        });
    };

    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get input data
        
        input = UICtrl.getInput();
        
        // 2. Add item to the budget controller
        
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        // 3. Add the new item to the UI
        
        
        
        // 4. Calculate the budget
        
        // 5. Display the budget on the UI
        
    };
    
    return {
        init: function() {
            console.log('Initialized, program is running.');
            setUpEventListeners();
        }
    };
   
})(budgetController, UIController);

controller.init();