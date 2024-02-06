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
    EmployeeType: { type: GraphQLString },
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
