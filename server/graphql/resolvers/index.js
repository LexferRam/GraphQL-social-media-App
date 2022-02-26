const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports = {
    //Modifiers(cada vez que se cualquier query, mutation o subscription modifique un post se vuelve a ejecutar el sig. code)
    Post:{
        likeCount: (parent) => parent.likes.length,
        commentCount:(parent) => parent.comments.length
    },
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    // Subscription:{
    //     ...postsResolvers.Subscription
    // }
}


//2:03