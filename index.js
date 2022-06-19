/* Your Code Here */
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays){
    let employees = []
    for(const array of arrays){
        employees.push(createEmployeeRecord(array))
    }
    return employees
}

function createTimeInEvent(timeStamp) {
    const date = timeStamp.split(" ")[0]
    const hour = parseInt(timeStamp.split(" ")[1])
    let obj = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    this["timeInEvents"].push(obj)
    return this
}

function createTimeOutEvent(timeStamp) {
    const date = timeStamp.split(" ")[0]
    const hour = parseInt(timeStamp.split(" ")[1])
    let obj = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    this["timeOutEvents"].push(obj)
    return this
}

function getHours(array, date){
    for(let i=0; i<array.length; i++) {
        if(array[i].date === date){
            return array[i].hour
        }
    }
}

function hoursWorkedOnDate(date) {
    const timeIn = getHours(this.timeInEvents, date)
    const timeOut = getHours(this.timeOutEvents, date)
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    const rate = this["payPerHour"]
    return hoursWorked * rate
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(employee){
        return employee.firstName === firstName
    })
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

