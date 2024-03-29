const { projects, clients } = require("../SampleData");

// Mongoose models
const Client = require("../model/Client");
const Project = require("../model/Project");
const Employee = require("../model/Employee");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLBoolean,
} = require("graphql");

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Employee Type
const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLString },
    dateOfJoining: { type: GraphQLString },
    title: { type: GraphQLString },
    department: { type: GraphQLString },
    employeeType: { type: GraphQLString },
    currentStatus: { type: GraphQLBoolean },
  }),
});

// root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve(parent, args) {
        return Employee.find();
      },
    },
    employee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Employee.findById(args.id);
      },
    },
    searchEmployee: {
      type: new GraphQLList(EmployeeType),
      args: {
        searchTerm: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (!args.searchTerm) {
          return []; // Return an empty array if no searchTerm is provided
        }

        // // Case-insensitive regex
        // const regex = new RegExp(args.searchTerm, "i");
        // console.log(
        //   "ref",
        //   Employee.find({
        //     firstName: { $regex: regex },
        //     // { lastName: { $regex: regex } },
        //     // { age: { $regex: regex } },
        //     // { dateOfJoining: { $regex: regex } },
        //     // { title: { $regex: regex } },
        //     // { department: { $regex: regex } },
        //     // { employeeType: { $regex: regex } },
        //     // { currentStatus: { $regex: regex } },
        //     // Add more fields as needed
        //   })
        // );

        return Employee.find({
          $or: [
            { firstName: { $regex: String(args.searchTerm), $options: 'i' } },
            { lastName: { $regex: String(args.searchTerm), $options: 'i' } },
            // Use $eq for non-string fields like age and currentStatus
            { age: { $eq: args.searchTerm } },
            { dateOfJoining: { $regex: String(args.searchTerm), $options: 'i' } },
            { title: { $regex: String(args.searchTerm), $options: 'i' } },
            { department: { $regex: String(args.searchTerm), $options: 'i' } },
            { employeeType: { $regex: String(args.searchTerm), $options: 'i' } },
            // Use $eq for non-string fields like currentStatus
            { currentStatus: { $eq: args.searchTerm.toLowerCase() === 'true' } },
          ],
        });
      },
    },
  },
});

// Mutation
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add a client
    addClient: {
      type: ClientType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
        phone: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },

    // delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndDelete(args.id);
      },
    },

    // add Project

    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },

    // update project

    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        const updateProject = Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );

        return updateProject;
      },
    },

    // delete project
    deleteProject: {
      type: ProjectType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },

    // add Employee
    addEmployee: {
      type: EmployeeType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLString) },
        dateOfJoining: { type: GraphQLNonNull(GraphQLString) },
        title: {
          type: new GraphQLEnumType({
            name: "EmployeeTitle",
            values: {
              employee: { value: "Employee" },
              manager: { value: "Manager" },
              director: { value: "Director" },
              vp: { value: "VP" },
            },
          }),
          defaultValue: "Employee",
        },
        department: {
          type: new GraphQLEnumType({
            name: "EmployeeDepartment",
            values: {
              it: { value: "IT" },
              marketing: { value: "Marketing" },
              hr: { value: "HR" },
              engineering: { value: "Engineering" },
            },
          }),
          defaultValue: "IT",
        },
        employeeType: {
          type: new GraphQLEnumType({
            name: "EmployeeType",
            values: {
              full: { value: "FullTime" },
              part: { value: "PartTime" },
              contract: { value: "Contract" },
              seasonal: { value: "Seasonal" },
            },
          }),
          defaultValue: "Full Time",
        },
        currentStatus: {
          type: GraphQLNonNull(GraphQLBoolean),
        },
      },
      resolve(parent, args) {
        const employee = new Employee({
          firstName: args.firstName,
          lastName: args.lastName,
          age: args.age,
          dateOfJoining: args.dateOfJoining,
          title: args.title,
          department: args.department,
          employeeType: args.employeeType,
          currentStatus: args.currentStatus,
        });

        return employee.save();
      },
    },

    // update Employee
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLString },
        dateOfJoining: { type: GraphQLString },
        title: {
          type: new GraphQLEnumType({
            name: "EmployeeTitleUpdate",
            values: {
              employee: { value: "Employee" },
              manager: { value: "Manager" },
              director: { value: "Director" },
              vp: { value: "VP" },
            },
          }),
        },
        department: {
          type: new GraphQLEnumType({
            name: "EmployeeDepartmentUpdate",
            values: {
              it: { value: "IT" },
              marketing: { value: "Marketing" },
              hr: { value: "HR" },
              engineering: { value: "Engineering" },
            },
          }),
        },
        employeeType: {
          type: new GraphQLEnumType({
            name: "EmployeeTypeUpdate",
            values: {
              full: { value: "FullTime" },
              part: { value: "PartTime" },
              contract: { value: "Contract" },
              seasonal: { value: "Seasonal" },
            },
          }),
        },
        currentStatus: {
          type: GraphQLBoolean,
        },
      },
      resolve(parent, args) {
        const employeeUpdate = Employee.findByIdAndUpdate(
          args.id,
          {
            $set: {
              firstName: args.firstName,
              lastName: args.lastName,
              age: args.age,
              dateOfJoining: args.dateOfJoining,
              title: args.title,
              department: args.department,
              employeeType: args.employeeType,
              currentStatus: args.currentStatus,
            },
          },
          {
            new: true,
          }
        );

        return employeeUpdate;
      },
    },
    // delete employee
    deleteEmployee: {
      type: EmployeeType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        return Employee.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
