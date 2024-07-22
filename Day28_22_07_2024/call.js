const student={
    name:"Gangothri",
    printName : function(){
        console.log(this.name);
    }, 
};
student.printName();

const student1={
    name:"Neeruganti"
};

//the value of this can be modified using call method 
//invoke a function directly by passing in the reference which points to the this variable inside method.
student.printName.call(student1);

const name={
    firstname:"Gangothri",
    lastname:"Neeruganti"
};
let fullName=function(city,state){
    console.log(this.firstname+" "+this.lastname+" from "+city+" "+state);
}
 const name2={
    firstname:"MS",
    lastname:"Dhoni"
 };
 fullName.call(name, "penukonda", "Andhra Pradesh");
 fullName.call(name2, "Ranchi","Jharkhand");
//apply 
//the only difference between call and apply is in call we pass parameters by comma seperated values but in apply we use array of values to pass
fullName.apply(name,["penukonda","Andhra Pradesh"]);
fullName.apply(name2,["Ranchi","Jharkhand"]);

//bind method just keep a copy of method it will useful to use it later
let printFull=fullName.bind(name,"Penukonda","Andhra Pradesh");
printFull();
