const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const _ = require('lodash');
 
// 加载所有的 schema
const typeDefs = require('./schema');
 
// 加载所有的 resolver
const resolvers = require('./resolver');

// 加载自定义类型
// 自定义类型，其本质也是个resolve
const scalar = require('./scalar.js');
// 将自定义类型合并到resolver中
_.merge(resolvers, scalar);

// mock 数据
const mocks = require('./mock');
 
const app = new Koa();
 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks,            // 配置mock数据
    playground: true, // 开启开发UI调试工具
});
 
server.applyMiddleware({ app });
 
const port = 8000;
app.listen({ port }, () => console.log(`graphql server start at http://localhost:${port}${server.graphqlPath}`));