import { GraphQLClient } from 'graphql-request'

export function createGql () {
  let gql
  if (localStorage.authToken) {
     gql = new GraphQLClient("/graphql", { headers: {Authorization: "Bearer " + localStorage.authToken}})
  } else {
     gql = new GraphQLClient("/graphql", { headers: {}})
  }
  return gql
}

export function searchRegExp(str) {
  return JSON.stringify([{$or:[
  		{originalFileName: "/" + str.trim().split(/\s+/).join('|') + "/"},
  		{"id3.album": "/" + str.trim().split(/\s+/).join('|') + "/"},
  		{name: "/" + str.trim().split(/\s+/).join('|') + "/"}
]}])
}