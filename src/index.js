function eval() {
    // Do not use eval!!!
    return;
}
const priority={
    '+': 1,
    "-": 1,
    "*": 2,
    "/": 2,
};
function expressionCalculator(expr) {
    let result=0,bracketsCounter=0;
    console.log(expr);
    expr=expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-|\(|\))/g, ' $& ');
    let arr=expr.split(" "),nums=[],signs=[];
    
    for(let i=0;i<arr.length;i++){
        if(arr[i]==="(")
         bracketsCounter++;
         if(arr[i]===")")
         bracketsCounter--;
        if(/\d/.test(arr[i])){
        nums.push(arr[i]);
        } 
        if(arr[i]==")"&&signs.includes("(")){
           let sign;
           while(sign!="("){
           sign=signs.pop();
           if(sign=="(")
           break;
           let arg1=nums.pop();
           let arg2=nums.pop();
           let el=calc(arg2,arg1,sign);
           nums.push(el);
           }
           continue;
        }
        if(priority[arr[i]]<=priority[signs[signs.length-1]]||arr.length-1==i&&nums.length>1){
            let arg1=nums.pop();
            let arg2=nums.pop();
            let sign=signs.pop();
            let el=calc(arg2,arg1,sign);
           
            nums.push(el);
            if(/(\*|\/|\+|\-|\(|\))/.test(arr[i])){
                signs.push(arr[i]);
              } 
            continue;
        } 
        if(/(\*|\/|\+|\-|\(|\))/.test(arr[i])){
        signs.push(arr[i]);
      } 
       
      
      
    }
    console.log("Signs: "+signs);
    console.log("NUMS: "+nums);
    while(nums.length>1){
        let arg1=nums.pop();
        let arg2=nums.pop();
        let sign=signs.pop();
        let el=calc(arg2,arg1,sign);
        nums.push(el);
        
    } 
    if(bracketsCounter!==0)
    throw Error("ExpressionError: Brackets must be paired");
    result=nums[0];
    console.log("Signs: "+signs);
    console.log("NUMS: "+nums);
    console.log("RESULT: "+result);
    return result;
}
function calc(a,b,sign){
   let result=0;
    if(sign=="*"){
        result+=multiply(a,b);
    }
    if(sign=="/"){
        result+=division(a,b);
        if(parseFloat(b,10)===0)
        throw Error("TypeError: Division by zero.");
     }
     if(sign=="+"){
        result+=sum(a,b);
     }
     if(sign=="-"){
        result+=subtract(a,b);
     }
    
     return result;
}
function sum(a,b){
    return parseFloat(a,10)+parseFloat(b,10);
}
function division(a,b){
    return parseFloat(a,10)/parseFloat(b,10);
}
function subtract(a,b){
    return parseFloat(a,10)-parseFloat(b,10);
}
function multiply(a,b){
    return parseFloat(a,10)*parseFloat(b,10);
}

module.exports = {
    expressionCalculator
};