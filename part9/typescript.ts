// type ObserverFunction<T extends (...args: any[]) => any> = T & {
//   functionName?: string;
//   functionArguments?: any[];
//   functionResult?: ReturnType<T>;
// };

// function observer<T extends (...args: any[]) => any>(fn: T): ObserverFunction<T> {
//   const observedFunction = ((...args: Parameters<T>): ReturnType<T> => {
//     observedFunction.functionName = fn.name;
//     observedFunction.functionArguments = args;

//     const result = fn(...args);
//     observedFunction.functionResult = result;

//     return result;
//   }) as ObserverFunction<T>;

//   return observedFunction;
// }

// // Example usage:

// function add(a: number, b: number): number {
//   return a + b;
// }

// const observedAdd = observer(add);

// const result = observedAdd(3, 5);

// console.log(result)

// console.log(`Function Name: ${observedAdd.functionName}`);
// console.log(`Arguments: ${JSON.stringify(observedAdd.functionArguments)}`);
// console.log(`Result: ${observedAdd.functionResult}`);


function observer(fn) {
  const observedFunction = function (...args) {
    observedFunction.functionName = fn.name;
    observedFunction.functionArguments = args;

    const result = fn(...args);
    observedFunction.functionResult = result;

    return result;
  };

  return observedFunction;
}

// Example usage:

function add(a, b) {
  return a + b;
}

const observedAdd = observer(add);

const result = observedAdd(3, 5);

console.log(`Function Name: ${observedAdd.functionName}`);
console.log(`Arguments: ${JSON.stringify(observedAdd.functionArguments)}`);
console.log(`Result: ${observedAdd.functionResult}`);
