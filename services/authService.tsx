import api from './api';

type LoginResponse = {
  token: string;
};

// Fungsi login
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/user/login', { username, password });
  return response.data;
};

type RegisterResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
};

// Fungsi register
export const register = async ({
  name,
  email,
  password,
  image,
}: {
  name: string;
  email: string;
  password: string;
  image?: string;
}): Promise<RegisterResponse> => {
  const payload: any = {
    name,
    email,
    password,
  };

  if (image) {
    payload.image = image;
  }

  console.log('Register payload:', payload);
  const response = await api.post('/user', payload);
  console.log('Response dari register:', response.data);
  return response.data;
};
