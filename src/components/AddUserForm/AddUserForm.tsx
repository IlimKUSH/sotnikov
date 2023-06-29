import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Box, Typography } from '@mui/material';
import { ButtonUI, MultipleSelect, TextFieldUI } from '../ui';
import {Post} from "../../store/features/posts/postsSlice";
import {createPost, updatePostDetails} from "../../store/features/posts/postsActions";

interface IAddUserFormProps {
  handleClose: () => void;
  editMode?: boolean;
  data?: any;
}

type Errors = {
  username?: string;
  title?: string;
  body?: string;
}

export const AddUserForm: FC<IAddUserFormProps> = ({ handleClose, editMode = false, data }) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<Errors>();

  useEffect(() => {
    if (editMode && data) {
      setUsername(data.username)
      setTitle(data.title);
      setBody(data.body);
    }
  }, [editMode, data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors: Errors = {
      username: '',
      title: '',
      body: '',
    };

    if (!username) {
      formIsValid = false;
      newErrors.username = 'Заполните поле';
    }

    if (!title) {
      formIsValid = false;
      newErrors.title = 'Заполните поле';
    }

    if (!body) {
      formIsValid = false;
      newErrors.body = 'Заполните поле';
    } 

    if (formIsValid) {
      const postData = {
        username,
        title,
        body,
      };

      if (editMode && data) {
        dispatch(updatePostDetails({ id: data.id, ...postData }));
      } else {
        dispatch(createPost(postData));
      }

      setUsername('')
      setTitle('');
      setBody('');
      setErrors(undefined);
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Typography variant='h5' fontWeight={600} gutterBottom>
        {editMode ? 'Редактирование пользователя' : 'Добавление пользователя'}
      </Typography>
      <Box component="form" display="flex" flexDirection="column" gap="10px" onSubmit={handleSubmit}>
        <TextFieldUI
          type="text"
          placeholder="Имя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          error={!!errors?.username}
          helperText={errors?.username}
        />
        <TextFieldUI
          type="text"
          placeholder="Название"
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={!!errors?.title}
          helperText={errors?.title}
        />
        <TextFieldUI
          type="text"
          placeholder="Описание"
          value={body}
          onChange={e => setBody(e.target.value)}
          error={!!errors?.body}
          helperText={errors?.body}
        />
        <ButtonUI
          type="submit"
          variant="contained" 
          color="secondary"
        >
          {editMode ? 'Сохранить изменения' : 'Добавить пользователя'}
        </ButtonUI>
      </Box>
    </div>
  );
};