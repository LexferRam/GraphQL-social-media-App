import { useQuery, gql } from '@apollo/client'
import { Grid } from '@mui/material';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';

const Home = () => {

    const {loading, data} = useQuery(FETCH_POSTS_QUERY)

    if(data){
        console.log(data)
    }

    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <h1 style={{textAlign: 'center'}}>Recent Posts</h1>
            </Grid>
            {
                loading ? (<PostSkeleton/>) : (
                    data.getPosts && data.getPosts.map(post => (
                        <Grid key={post.id} item xs={12} sm={6} md={4} xlg={3}>
                            <PostCard post={post} />
                        </Grid>
                    ))
                )
            }
        </Grid>
    );
};

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
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

export default Home;
