import { Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation, gql } from '@apollo/client'
import { useState } from "react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteComment = ({ postId, commentId }) => {

    const [openConfirm, setOpenConfirm] = useState(false);

    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        update(proxy) {
            setOpenConfirm(false)
        },
        variables: {
            postId,
            commentId
        },
        refetchQueries: [
            FETCH_POSTS_QUERY, // DocumentNode object parsed with gql
        ]
        // TODO: colocar validacion cuando haya error o cuando el usuario no tenga autorizacion para eliminar comentario(mostrar por pantalla mensaje)
    })

    return (
        <>
            <Button
                color="secondary"
                startIcon={<DeleteForeverIcon />}
                variant='contained'
                style={{ textTransform: 'capitalize' }}
                // onClick={() => setOpenConfirm(true)}
                onClick={() => deleteComment()}
            >
                Delete
            </Button>
            {/* <ResponsiveDialog
                openConfirm={openConfirm}
                setOpenConfirm={setOpenConfirm}
                deletePost={deletePost}
            /> */}
        </>
    );
};

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

export default DeleteComment;
