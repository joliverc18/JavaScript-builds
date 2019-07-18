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
    
    var calculateTotal = function(type) {
        var sum = 0;
        
        data.allItems[type].forEach(function(current){
            sum += current.value;
        });
        
        data.total[type] = sum;
    }
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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
        
        calculateBudget: function() {
            
            // Calculate total income and total expenses
            
            calculateTotal('exp');
            calculateTotal('inc');
            
            // Calculate budget 
            
            data.budget = data.total.inc - data.total.exp;
            
            // Calculate the percentage of income spent
            
            if (data.total.inc > 0) {
                data.percentage = Math.round(data.total.exp / data.total.inc * 100);
            }
            
        },
        
        getBudget: function() {
            // This is returning an object because we want to return more than 1 value
            return {
                budget: data.budget,
                totalIncome: data.total.inc,
                totalExpense: data.total.exp,
                percentage: data.percentage
            };
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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    };
    
    return {
        getInput: function() {
            // Return an object containing three properties, instead of returning 3 properties itself
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either 'inc' or 'exp'
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">+ %value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace the placeholder text with some actual data
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // Insert the HTML into the DOM
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },
        
        clearFields: function() {
            var fields, fieldsArray;
            
            // Selecting the necessary field
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArray = Array.prototype.slice.call(fields);
            
            fieldsArray.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArray[0].focus();
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

    var updateBudget = function() {
        // 1. Calculate the budget
        
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget

        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on the UI
        
        console.log(budget);
        
    };
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get input data
        
        input = UICtrl.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0 ) {

            // 2. Add item to the budget controller

            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the new item to the UI

            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields

            UICtrl.clearFields();

            // 5. Calculate and update budget

            updateBudget();
        }
        
    };
    
    return {
        init: function() {
            console.log('Initialized, program is running.');
            setUpEventListeners();
        }
    };
   
})(budgetController, UIController);

controller.init();