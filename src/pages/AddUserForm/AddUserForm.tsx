import { FC, useEffect, useState } from 'react';
import { createUser } from '../../store/features/users/usersActions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ButtonUI } from '../../components/ui/Button';
import { TextFieldUI } from '../../components/ui/TextField';
import { Box, Typography } from '@mui/material';
import { MultipleSelect } from '../../components/ui/MultiSelect';
import { ACCESS_PERMISSION } from '../../constants';
import { updateUser } from '../../store/features/users/usersSlice';

interface IAddUserFormProps {
  handleClose: () => void;
  editMode?: boolean;
  user?: User;
}

type Errors = {
  name: string;
  email: string;
  permissions: string;
  image: string | null;
}

export const AddUserForm: FC<IAddUserFormProps> = ({ handleClose, editMode = false, user }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>();

  useEffect(() => {
    if (editMode && user) {
      setName(user.name);
      setEmail(user.email);
      setPermissions(user.permissions);
    }
  }, [editMode, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors: Errors = {
      name: '',
      email: '',
      permissions: '',
      image: null
    };

    if (!name) {
      formIsValid = false;
      newErrors.name = 'Заполните имя';
    }

    if (!email) {
      formIsValid = false;
      newErrors.email = 'Заполните почту';
    }

    if (permissions.length === 0) {
      formIsValid = false;
      newErrors.permissions = 'Выберите роль';
    }

    if (previewImage === null) {
      formIsValid = false;
      newErrors.image = 'Выберите фото';
    }

    if (formIsValid) {
      const userData = {
        name,
        email,
        permissions,
        image: previewImage || '',
      };

      if (editMode && user) {
        dispatch(updateUser({ id: user.id, userData }));
      } else {
        dispatch(createUser(userData));
      }

      setName('');
      setEmail('');
      setPermissions([]);
      setErrors(undefined);
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };

  const onChange = (options: string[]) => {
    setPermissions(options);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
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
          value={name}
          onChange={e => setName(e.target.value)}
          error={!!errors?.name}
          helperText={errors?.name}
        />
        <TextFieldUI
          type="email"
          placeholder="Почта"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={!!errors?.email}
          helperText={errors?.email}
        />
        {editMode && (
          <MultipleSelect
            label="Выберите права доступа"
            options={ACCESS_PERMISSION}
            onChange={onChange}
            error={!!errors?.permissions}
          />
        )}
        {errors?.permissions && <Typography ml={2} color="red" fontSize={12}>{errors.permissions}</Typography>}
        <TextFieldUI 
          type="file" 
          onChange={handleImageChange} 
          error={!!errors?.image}
          helperText={errors?.image}
        />
        {previewImage && <img src={previewImage} alt="Preview" style={{ objectFit: 'contain' }} height={250} />}
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