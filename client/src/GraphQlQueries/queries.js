import { gql } from '@apollo/client'

gql`
query posts{
    getPosts{
      id
      body
      createdAt
      username
      comments {
        id
        username
        body
      }
      likes{
        id
        username
      }
      likeCount
      commentCount
    }
  }
  
  mutation comment{
  createComment(postId:"621579ff038bd11ee31897e4" body:"2do new comment"){
    id
    body
    comments {
      id
      createdAt
      username
      body
    }
  }

}
  
  
mutation{
  register(registerInput:{
    username:"user3"
    password:"123456"
    confirmPassword: "123456"
    email: "user3@email.com"
  }){
    id
    email
    token
    username
    createdAt
  }
}
  
  
mutation{
  login(username:"LexferRam",password:"123456"){
    id
    email
    username
    createdAt
    token
  }
}



query{
  getPost(postId:"621d71bb734865522b5f9d55"){
          id
            body 
            createdAt 
            username 
            likeCount     
            likes{
                username
            }
            commentCount
            comments{
                id 
                username 
                createdAt 
                body
                }
  }
}



mutation{
  createPost(body:"LexferRam new post"){
    id
    body
    createdAt
    username
  }
}

mutation{
  deletePost(postId:"6212b2188a92d0aa8bf1d570")
}




mutation {
  deleteComment(postId: "621579ff038bd11ee31897e4" commentId: "62181092486942906a367879"){
    id
    comments{
      id
      username
      body
    }
  }
}
}

mutation{
  likePost(postId:"621579ff038bd11ee31897e4"){
    id
    body
    likes{
      id
      username
    }
  }
}
  `