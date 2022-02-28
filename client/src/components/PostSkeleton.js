import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';

export default function PostSkeleton() {
    return (
        <Container >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center" spacing={5}
            >

                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Grid key={i} item xs={11} sm={6} md={4} xlg={3}>
                        <Skeleton variant="text" />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={210} height={118} />
                    </Grid>
                ))}

            </Grid>
        </Container>
    );
}