import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Alert, Stack, IconButton, Collapse, Grid } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation, gql } from '@apollo/client'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import CloseIcon from '@mui/icons-material/Close';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const schema = yup.object().shape({
    body: yup.string().required("Post description is required!"),
})

const PostForm = () => {

    const [postData, setPostData] = useState({})
    const [errorsForm, setErrorsForm] = useState({})
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    })

    const [createPost, {error, loading}] = useMutation(CREATE_POST_MUTATION,{
        variables: postData,
        //ACCION que realiza despues de crear el post
        // update(proxy,result){
        //     const data = proxy.readQuery({
        //         query: FETCH_POSTS_QUERY
        //     })
        //     // console.log(data.getPosts)
        //     // console.log(result.data.createPost)
        //     data.getPosts = [result.data.createPost, ...data.getPosts]
        //     proxy.writeQuery({query:FETCH_POSTS_QUERY,data})
        //     // console.log(result)
        // }
        onError(errors) {
            console.log(errors.graphQLErrors[0].message)
            setErrorsForm(errors.graphQLErrors[0].message)
            setOpen(true)
        },
        refetchQueries: [
            FETCH_POSTS_QUERY, // DocumentNode object parsed with gql
            //'getPosts' // Query name
        ],
    })

    const onSubmit = (data) => {
        setPostData(data)
        createPost(data)
        // console.log(data)
        reset();
    }

    return (
        <>
         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center', height: '100%' }}>
                <Grid container direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} >
                        <Stack sx={{ width: '100%' }} spacing={2}>
                                <Collapse in={open}>
                                    <Alert 
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    } severity="error">
                                        {error?.graphQLErrors[0].message}
                                  </Alert>
                                </Collapse>
                            {/* )} */}
                        </Stack>
                    </Grid>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'start', height: '100%' }}>

                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <h2 style={{margin:0}} >Create Post</h2>
                        </div>

                        <TextField
                            margin="normal"
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
                            style={{ marginTop: 10, marginBottom: 10, textTransform:'capitalize' }}
                        >
                            Submit
                        </LoadingButton>
                    </div>
                </form>


            </div>
            </>
    );
};

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username 
            likes{id username createdAt} 
            likeCount
            comments{id body username createdAt}
            commentCount
        }
    }
`

export default PostForm;
