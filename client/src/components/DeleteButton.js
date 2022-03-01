import { Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation, gql } from '@apollo/client'
import { useState } from "react";
import ResponsiveDialog from "./ResponsiveDialog";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ postId }) => {

    const [openConfirm, setOpenConfirm] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            setOpenConfirm(false)

            // TODO: remove post from cache(ITS NOT WORKING REVIEW)
            // const data = proxy.readQuery({
            //     query: FETCH_POSTS_QUERY
            // });
            // data.getPosts = data.getPost.filter(p => p.id !== postId)
            // proxy.writeQuery({query: FETCH_POSTS_QUERY, data})
        },
        variables: {
            postId
        },
        refetchQueries: [
            FETCH_POSTS_QUERY, // DocumentNode object parsed with gql
            //'getPosts' // Query name
        ],
    })

    return (
        <>
            <Button
                color="secondary"
                startIcon={<DeleteForeverIcon />}
                variant='contained'
                style={{ textTransform: 'capitalize' }}
                onClick={() => setOpenConfirm(true)}
            >
                Delete
            </Button>
            <ResponsiveDialog
                openConfirm={openConfirm}
                setOpenConfirm={setOpenConfirm}
                deletePost={deletePost}
            />
        </>
    );
};

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id username createdAt body
            }
            commentCount
        }
    }
`

export default DeleteButton;
