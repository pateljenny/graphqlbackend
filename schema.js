const { GraphQLObjectType, GraphQLInt, GraphQLString,
    GraphQLList, GraphQLSchema, GraphQLBoolean,
    GraphQLNonNull } = require('graphql');
const conn = require('./sequelize');

const User = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(user) {
                    return user.id
                }
            },
            name: {
                type: GraphQLString,
                resolve(user) {
                    return user.name
                }
            },
            email: {
                type: GraphQLString,
                resolve(user) {
                    return user.email
                }
            },
            gender: {
                type: GraphQLString,
                resolve(user) {
                    return user.gender
                }
            },
            isDeleted: {
                type: GraphQLBoolean,
                resolve(user) {
                    return user.isDeleted;
                }
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is the root query',
    fields: () => {
        return {
            users: {
                type: new GraphQLList(User),
                resolve(root, args) {
                    return conn.models.user.findAll({ where: { isDeleted: false } });
                }
            },
            user: {
                type: GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
                    return conn.models.user.findAll({ where: { ...args, isDeleted: false } });
                }
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'This is the root mutation',
    fields: () => {
        return {
            addUser: {
                type: User,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    gender: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, args) {
                    return conn.models.user.create(args)
                }
            },
            
            updateUser: {
                type: User,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    name: {
                        type: GraphQLString
                    },
                    gender: {
                        type: GraphQLString
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(root, { id, name, email, gender, isDeleted }) {
                    conn.models.user.update({ name, email, gender }, { where: { id: id, isDeleted: false } });
                    return { id, name, email, gender, isDeleted }
                }
            },
            deleteUser: {
                type: User,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, { id }) {
                    conn.models.user.update({ isDeleted: true }, { where: { id: id } });
                    return { id };
                }
            }
        }
    }

})

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

module.exports = Schema;