import {Fragment, FC, useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Post} from "../../store/features/posts/postsSlice";
import {fetchPost} from "../../store/features/post/postActions";
import {useAppSelector} from "../../hooks/useAppSelector";
import {RootState} from "../../store/rootReducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {Box, Checkbox, Divider} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {ModalUI, ToastUI} from "../ui";
import {AddUserForm} from "../AddUserForm";
import {LoaderUI} from "../ui/Loader";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

enum ModalMessageType {
  UserDeleted = 'user-deleted',
}

interface IPostItemProps {
  post: Post;
  handleDeletePost: (postId: number) => void;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomTypography = styled(Typography)(({theme}) => ({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '20px',
  color: '#424F5E',
}));

export const PostItem: FC<IPostItemProps> = ({post, handleDeletePost}) => {
  const {post: postItem, loading} = useAppSelector((state: RootState) => state.post);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const [modalMessageType, setModalMessageType] = useState<ModalMessageType | null>(null);
  const [open, setOpen] = useState(false);
  const [favoritePosts, setFavoritePosts] = useState<number[]>([]);

  useEffect(() => {
    const storedFavoritePosts = getFavoritePosts();
    setFavoritePosts(storedFavoritePosts);
  }, []);

  function saveFavoritePosts(posts: number[]) {
    localStorage.setItem('favoritePosts', JSON.stringify(posts));
  }

  function getFavoritePosts(): number[] {
    const favoritePostsData = localStorage.getItem('favoritePosts');
    return favoritePostsData ? JSON.parse(favoritePostsData) : [];
  }

  function addToFavorites(postId: number) {
    setFavoritePosts(prevFavoritePosts => [...prevFavoritePosts, postId]);

    saveFavoritePosts([...favoritePosts, postId]);
  }

  function removeFromFavorites(postId: number) {
    const updatedFavoritePosts = favoritePosts.filter(
      favoritePostId => favoritePostId !== postId
    );

    setFavoritePosts(updatedFavoritePosts);

    saveFavoritePosts(updatedFavoritePosts);
  }

  const handleExpandClick = (postId: number) => {
    dispatch(fetchPost(postId));
    setExpanded(!expanded);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpen = (messageType: ModalMessageType) => {
    setModalMessageType(messageType);
  };

  const handleClose = () => {
    setModalMessageType(null);
  };

  const handleDelete = () => {
    handleOpen(ModalMessageType.UserDeleted);
  }

  const styleBox = {
    width: '100%',
    '&:hover': {
      background: '#EFEFF6',
      cursor: 'hover',
    },
  };


  return (
    <Card sx={styleBox}>
      <CardHeader
        avatar={
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Checkbox/>
            <Avatar sx={{bgcolor: red[500]}}>
              {post.username?.charAt(0)}
            </Avatar>
          </Box>
        }
        action={
          <Box>
            <IconButton onClick={handleOpenModal} aria-label="settings">
              <EditIcon/>
            </IconButton>
            <IconButton onClick={handleDelete} aria-label="settings">
              <DeleteIcon/>
            </IconButton>
          </Box>
        }
        title={post.username}
      />
      <CardContent>
        {favoritePosts.includes(post.id) ? (
          <button onClick={() => removeFromFavorites(post.id)}>Remove from Favorites</button>
        ) : (
          <button onClick={() => addToFavorites(post.id)}>Add to Favorites</button>
        )}
        <CustomTypography>
          {post.title}
        </CustomTypography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={() => handleExpandClick(post.id)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon/>
        </ExpandMore>
        <CommentIcon/>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {postItem.map((item) => (
            <Fragment key={item.id}>
            <Divider sx={{mb: 1}}/>
              <Typography variant="h6" sx={{fontSize: '20px', fontWeight: 600}}>{item.name}</Typography>
              <Typography paragraph variant="subtitle1">
                {item.email}
              </Typography>
              <Typography paragraph variant="subtitle2">
                {item.body}
              </Typography>
            </Fragment>
          ))}
          {loading && <LoaderUI/>}
        </CardContent>
      </Collapse>
      <ToastUI
        open={modalMessageType !== null}
        title="Удалить пост?"
        onOk={() => handleDeletePost(post.id)}
        onClose={handleClose}
      />
      <ModalUI
        open={open}
        onClose={handleCloseModal}
      >
        <AddUserForm handleClose={handleCloseModal} editMode data={post}/>
      </ModalUI>
    </Card>
  );
}