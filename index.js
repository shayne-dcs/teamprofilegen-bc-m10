const generateHTML = require('./src/generateHTML')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

const fs = require('fs')
const inquirer = require('inquirer')

const teamArray = [];

const addManager = () => {
    return inquirer.prompt([
        {
            message: 'Who is the Manager of this Team?',
            type: 'input',
            name: 'name'
        },
        {
            message: "Please enter the Manager's ID.",
            type: 'input',
            name: 'id'
        },
        {
            message: "Please enter the Manager's E-Mail.",
            type: 'input',
            name: 'email'
        },
        {
            message: "Please enter the Manager's Office number.",
            type: 'input',
            name: 'officeNumber'
        }
    ])
        .then(managerInput => {
            const { name, id, email, officeNumber } = managerInput;
            const manager = new Manager(name, id, email, officeNumber);

            teamArray.push(manager);
            console.log(manager);
        })
};

const addEmployee = () => {
    console.log(`Input Successful.`);

    return inquirer.prompt([
        {
            message: "Please choose your Employee's Role.",
            type: 'list',
            choices: ['Engineer', 'Intern'],
            name: 'role'
        },
        {
            message: "What's the name of the Employee?",
            type: 'input',
            name: 'name'
        },
        {
            message: "Please enter the Employee's ID.",
            type: 'input',
            name: 'id'
        },
        {
            message: "Please enter the Employee's E-Mail.",
            type: 'input',
            name: 'email'
        },
        {
            message: "Please enter the Employee's GitHub Username.",
            type: 'input',
            name: 'github'
        },
        {
            message: "Please enter the Intern's School",
            type: 'input',
            name: 'school'
        },
        {
            message: 'Would you like to add more Team Members?',
            type: 'confirm',
            default: false,
            name: 'confirmAddEmployee'
        }
    ])
        .then(employeeData => {

            let { name, id, email, role, github, school, confirmAddEmployee } = employeeData;
            let employee;

            if (role === "Engineer") {
                employee = new Engineer(name, id, email, github);
                console.log(employee);

            } else if (role === "Intern") {
                employee = new Intern(name, id, email, school);
                console.log(employee);
            }

            teamArray.push(employee);
            if (confirmAddEmployee) {
                return addEmployee(teamArray);
            } else {
                return teamArray;
            }
        })

};


const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Team Member Successfully Added.")
        }
    })
};

addManager()
    .then(addEmployee)
    .then(teamArray => {
        return generateHTML(teamArray);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });