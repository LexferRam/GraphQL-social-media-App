import { useQuery } from '@apollo/client'
import { Grid } from '@mui/material';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import PostSkeleton from '../components/PostSkeleton';
import { useAuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const Home = () => {

    const { user } = useAuthContext()

    const { loading, data } = useQuery(FETCH_POSTS_QUERY)

    if (data) {
        console.log(data)
    }

    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <h1 style={{ textAlign: 'center' }}>Recent Posts</h1>
            </Grid>
            {
                loading ? (<PostSkeleton />) : (
                    <>
                        {user && (
                            <Grid item xs={12} sm={6} md={4} xlg={3}>
                                <PostForm />
                            </Grid>)}
                        {data.getPosts && data.getPosts.map(post => (
                            <Grid key={post.id} item xs={12} sm={6} md={4} xlg={3}>
                                <PostCard post={post} />
                            </Grid>
                        ))}
                    </>
                )
            }
        </Grid>
    );
};

export default Home;
