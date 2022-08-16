const PART_TIME_HOURS=4;
const FULL_TIME_HOURS=8;
const WAGE_PER_HOUR=20;
const NUM_OF_WORKING_DAYS=20;
const MAX_HRS_IN_MONTH=160;
let empDailyWageMap=new Map();
let empDailyHrsMap=new Map();
function getWorkingHours(empCheck){
switch(empCheck){
    case 0: console.log("Employee worked as part-time employee\nWorking hours: "+PART_TIME_HOURS);
    empHrs=PART_TIME_HOURS;
    return PART_TIME_HOURS;
    break;
    case 1: console.log("Employee worked as full-time employee\nWorking hours: "+FULL_TIME_HOURS);
    empHrs=FULL_TIME_HOURS;
    return FULL_TIME_HOURS;
    break;
    default: console.log("Employee is absent\nWorking hours: 0");
    empHrs=0;
    return 0;
    }
}
function calculateDailyWage(empHrs){
    return empHrs*WAGE_PER_HOUR;
}
let totalEmpHrs=0,totalWorkingDays=0;
let empDailyWageArr=new Array();
let empDailyHrsAndWageArr=new Array();
while( totalEmpHrs <= MAX_HRS_IN_MONTH && totalWorkingDays < NUM_OF_WORKING_DAYS)
{   totalWorkingDays++;
    let empCheck=Math.floor(Math.random()*10)%3;
    let empHrs=getWorkingHours(empCheck);
    totalEmpHrs+=empHrs;
    empDailyWageArr.push(calculateDailyWage(empHrs));
    empDailyHrsMap.set(totalWorkingDays,empHrs);
    empDailyWageMap.set(totalWorkingDays, calculateDailyWage(empHrs));
    empDailyHrsAndWageArr.push({
        dayNum:totalWorkingDays,
        dailyHours:empHrs,
        dailyWage: calculateDailyWage(empHrs),
        toString(){
            return '\nDay'+this.dayNum + '=> Working Hours is '+ this.dailyHours+'\tAnd\t Wage Earned= '+this.dailyWage
        },
    });
}
//Array Helper Functions
let totEmpWage=0;
function sum(dailyWage){
    totEmpWage+=dailyWage;
}
empDailyWageArr.forEach(sum);
let empWage= calculateDailyWage(totalEmpHrs);
console.log("Total Days: \t "+totalWorkingDays+"\tTotal hours: \t "+totalEmpHrs+"\tEmployee Wage: \t "+totEmpWage);
function totalWages(totalWage, dailyWage){
    return totalWage+dailyWage;
}
console.log("Employee Wage with reduce: "+empDailyWageArr.reduce(totalWages,0));
//Show the Day along with Daily Wage using Array map helper function
let dailyCntr=0;
function mapDayWithWage(dailyWage){
    dailyCntr++;
    return dailyCntr+" = "+dailyWage;
}
let mapDayWithWageArr=empDailyWageArr.map(mapDayWithWage);
console.log("Daily Wage Map:------------------------------------------");
console.log(mapDayWithWageArr);
//Show Days when Full time wage of 160 were earned using filter function
function fullTimeWage(dailyWage){
    return dailyWage.includes("160");
}
let fullDayWageArr=mapDayWithWageArr.filter(fullTimeWage);
console.log("Daily wage filter when full-time wage Earned:-----------------------------------");
console.log(fullDayWageArr);
//Find the first occurrence when Full Time Wage was earned using find function
function findFullTimeWage(dailyWage){
    return dailyWage.includes("160");
}
console.log("First time Full-time wage was earned on Day: "+mapDayWithWageArr.find(findFullTimeWage));
//Check if Every Element of Full Time Wage is truly holding Full time wage
function isAllFullTimeWage(dailyWage){
    return dailyWage.includes("160");
}
console.log("Check All element have full-time wage: "+fullDayWageArr.every(isAllFullTimeWage));
//Check if there is any Part Time Wage
function isAnyPartTimeWage(dailyWage){
    return dailyWage.includes("80");
}
console.log("Check if there is any Part Time Wage: "+mapDayWithWageArr.some(isAnyPartTimeWage));
//Find the number of days the Employee Worked
function totalDaysWorked(numOfDays,dailyWage){
    if(dailyWage>0) return numOfDays+1;
    return numOfDays;
}
console.log("Number of days the Employee Worked: "+empDailyWageArr.reduce(totalDaysWorked,0));
console.log(empDailyWageMap);
function totalWages(totalWage,dailyWage){
    return totalWage+dailyWage;
}
console.log("Emp Wage Map totalHrs: "+Array.from(empDailyWageMap.values()).reduce(totalWages,0));
//UC9 Arrow Functions
const findTotal=(totalVal,dailyVal)=>{
    return totalVal+dailyVal;
}
let count=0;
let totalHours=Array.from(empDailyHrsMap.values()).reduce(findTotal,0);
let totalSalary=empDailyWageArr.filter(dailyWage => dailyWage > 0).reduce(findTotal,0);
console.log("Emp wage with Arrow : -----------\t"+"Total Hours: \t"+totalHours+"\t Total Wage: "+totalSalary);
let nonWorkingDays=new Array();
let partWorkingDays=new Array();
let fullWorkingDays=new Array();
empDailyHrsMap.forEach((value,key,map)=>{
    if(value == 8) fullWorkingDays.push(key);
    else if(value ==4) partWorkingDays.push(key);
    else nonWorkingDays.push(key);
});
console.log("Full Working Days: \t"+fullWorkingDays);
console.log("Part Working Days: \t"+partWorkingDays);
console.log("Non Working Days: \t"+nonWorkingDays);
//UC10 Object Creation
console.log("UC 10 Showing Daily Hours Worked and Wage Earned: "+empDailyHrsAndWageArr);
//UC11A to UCD using Object functions along with Arrow functions
totalWages=empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage>0).reduce((totalWage,dailyHrsAndWage) => totalWage+=dailyHrsAndWage.dailyWage,0);
totalHours=empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage>0).reduce((totalHours,dailyHrsAndWage) => totalHours+=dailyHrsAndWage.dailyHours,0);
console.log("UC11A Total Hours: \t"+totalHours+"\tTotal Wages: \t"+totalWages);
console.log("UC11B Logging Full work days");
empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours==8).forEach(dailyHrsAndWage => console.log(dailyHrsAndWage.toString()));
let partWorkingDayStrArr=empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours==4).map(dailyHrsAndWage => dailyHrsAndWage.toString());
console.log("\nUC11C PartWorkingDayStrings: "+partWorkingDayStrArr);
let nonWorkingDayNums=empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 0).map(dailyHrsAndWage => dailyHrsAndWage.dayNum);
console.log("UC11D NonWorkingDayNums: "+nonWorkingDayNums);