(function() {

    'use strict';

	angular
		.module('app')
		.controller('CalculatorController', CalculatorController);

	function CalculatorController(){
		var vm = this;

		vm.start = function(){
			vm.availableOperations = ["+", "-", "*", "/"];
			vm.firstValue = "";
			vm.currentOperation = undefined;
			vm.secondValue = "";
			vm.result = undefined;
			vm.lastResult = "";
			vm.isFirstValueReady = false;
			vm.displayValue = "";
		}

		vm.start();

		vm.pressButton = function(key){
			if (vm.availableOperations.indexOf(key) >= 0){
				if (vm.currentOperation){
					vm.calculate();
				}

				vm.currentOperation = key;
				vm.isFirstValueReady = true;
			} else {
				if (vm.isFirstValueReady){
					if (key != "." || vm.secondValue.indexOf(".") < 0){
						vm.secondValue = vm.secondValue.concat(key);
						vm.displayValue = vm.secondValue;
					}
				} else {
					if (key != "." || vm.firstValue.indexOf(".") < 0){
						vm.firstValue = vm.firstValue.concat(key);
						vm.displayValue = vm.firstValue;
					}
				}
			}
		}

		vm.calculate = function(){
			if ((vm.firstValue.length > 0 || vm.lastResult.length > 0) && vm.currentOperation && vm.secondValue.length > 0){
				var firstValue = vm.firstValue ? parseFloat(vm.firstValue) : parseFloat(vm.lastResult),
					secondValue = parseFloat(vm.secondValue),
					result = eval(firstValue + vm.currentOperation + secondValue);

				vm.start();
				vm.result = result;
				vm.lastResult = String(result);
				vm.displayValue = String(result);
			}
		}
	}
})();