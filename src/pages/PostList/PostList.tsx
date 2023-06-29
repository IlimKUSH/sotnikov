import {FC, useEffect, useState} from 'react';
import {RootState} from '../../store/rootReducer';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {Box, Divider, IconButton, Typography, styled} from '@mui/material';
import {AddUserForm} from '../../components/AddUserForm';
import {ModalUI} from '../../components/ui/Modal/Modal';
import {ButtonUI} from '../../components/ui';
import {BurgerIcon} from '../../components/icons/burger';
import {LoaderUI} from '../../components/ui/Loader';
import {deletePost, fetchPosts} from "../../store/features/posts/postsActions";
import {PostItem} from "../../components";
import Grid from "@mui/material/Grid";
import {SelectChangeEvent} from "@mui/material/Select";
import {MyPagination} from "../../components/Pagination";

const CustomBox = styled(Box)(({
  background: '#F9FAFB',
  borderRadius: '15px',
  padding: '15px 0px',
  margin: '40px',

  '@media (max-width: 800px)': {
    margin: '0',
  },
}));

export const PostList: FC = () => {
  const [open, setOpen] = useState(false);
  const {posts, total, loading} = useAppSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(() => {
    const storedPage = localStorage.getItem('postsPage');
    return storedPage ? parseInt(storedPage, 10) : 1;
  });
  const [limit, setLimit] = useState<number>(() => {
    const storedLimit = localStorage.getItem('postsLimit');
    return storedLimit ? parseInt(storedLimit, 10) : 10;
  });

  const handlePageChange = (event: unknown, page: number) => {
    setPage(page);
    localStorage.setItem('postsPage', page.toString());
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(+event.target.value);
    localStorage.setItem('postsLimit', event.target.value.toString());
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchPosts({page, limit}));
  }, [dispatch, page, limit]);

  const handleDeletePost = (postId: number) => {
    dispatch(deletePost(postId));
  };

  return (
    <CustomBox>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: '15px 30px',
          flexDirection: {xs: 'column', sm: 'row'},
          '@media (max-width: 800px)': {
            px: '10px',
          },
        }}
      >
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          pb: '1'
        }}>
          <IconButton sx={{display: {sm: 'none'}}}><BurgerIcon/></IconButton>
          <Typography variant="h4">Посты</Typography>
        </Box>
        <ButtonUI
          variant="contained"
          sx={{width: {xs: '100%', sm: '30%'}, textWrap: 'nowrap'}}
          color="secondary"
          onClick={handleOpen}
        >
          Добавить пост
        </ButtonUI>
      </Box>
      <Divider/>
      {loading ? <LoaderUI/> :
        <Grid overflow='hidden'
         sx={{
           maxHeight: '500px',
           minHeight: '500px',
           overflowY: 'scroll',
           padding: '15px',
           gap: '20px',
           justifyContent: 'space-between'
         }} container columns={2}>
          {posts.map(post => (
            <PostItem key={post.id} post={post} handleDeletePost={handleDeletePost}/>
          ))}
        </Grid>
      }
      <Divider sx={{mb: 1}}/>

      <MyPagination
        limit={limit}
        total={total}
        page={page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />

      <ModalUI
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <AddUserForm handleClose={handleClose}/>
      </ModalUI>
    </CustomBox>
  );
};