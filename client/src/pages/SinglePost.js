import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Card, CardContent, Grid, Skeleton, TextField, Typography } from '@mui/material';
import { useAuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import moment from 'moment'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteComment from '../components/DeleteComment';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    body: yup.string().required("Post description is required!"),
})

const SinglePost = () => {
    const [comment, setComment] = useState({})
    const { user } = useAuthContext()
    const { postId } = useParams()
    const { data, loading } = useQuery(FECTH_POST_QUERY, {
        variables: {
            postId
        },
    })
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        // update() {
        //     setComment('')
        // },
        // variables: {
        //     postId,
        //     body: comment
        // }
        variables: {postId,body:comment}
    })

    if (data) {
        console.log(data)
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        setComment(data.body)
        submitComment({postId,...data})
        console.log({postId,...data})
        reset();
    }

    return (
        <>
            {loading ? (
                // TODO: put skeleton
                <Grid container sx={{ marginTop: 5 }} direction="row" justifyContent="center" alignItems="center" spacing={4}>

                    <Grid item xs={12} >
                        <Skeleton variant="text" />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width='100%' height={118} />
                    </Grid>

                    <Grid item xs={12} >
                        <Skeleton variant="rectangular" width='100%' height={118} />
                    </Grid>

                </Grid>
            ) : (
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} sx={{ marginTop: 5, marginBottom: 5 }}>
                        <PostCard post={data?.getPost} />
                    </Grid>

                    <Grid item xs={12}>
                        {user && (
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'start', height: '100%' }}>

                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                        <h2 style={{ margin: 0 }} >Add Comment</h2>
                                    </div>

                                    <TextField
                                        margin="normal"
                                        style={{ width: '100%'}}
                                        error={Boolean(errors.body)}
                                        helperText={errors.body?.message}
                                        variant="outlined" {...register("body")}
                                        type="text" placeholder="Write a Post!"
                                    />

                                    <LoadingButton
                                        loading={loading ? loading : false}
                                        loadingPosition="start"
                                        startIcon={<CreateRoundedIcon />}
                                        variant="contained"
                                        type="submit"
                                        fullWidth
                                        style={{ marginTop: 10, marginBottom: 10, textTransform: 'capitalize' }}
                                    >
                                        Submit
                                    </LoadingButton>
                                </div>
                            </form>
                        )}
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 5 }}>
                        {data?.getPost.comments.map((comment, i) => (
                            <Card key={comment.id} sx={{ marginTop: 2 }}>
                                <CardContent>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {comment.username}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {moment(comment.createdAt).fromNow()}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {comment.body}
                                            </Typography>
                                        </div>
                                        { user.username === comment.username && (
                                            <DeleteComment postId={data?.getPost.id} commentId={comment.id} />
                                         )}
                                        </div>
                                       
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>

                </Grid>
            )}
        </>
    );
};

const FECTH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
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
`

const SUBMIT_COMMENT_MUTATION = gql`
    mutation createComment($postId: String!, $body: String!){
        createComment(postId: $postId, body: $body){
            id 
            comments{
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`

export default SinglePost;
