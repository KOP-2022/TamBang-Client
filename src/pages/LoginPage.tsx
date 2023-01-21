import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';

import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';

interface LoginForm {
  id: string;
  password: string;
}

interface LoginResponse {
  ok: boolean;
  message?: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { mutateAsync, isLoading } = useMutation<
    LoginResponse,
    AxiosError,
    LoginForm
  >({
    mutationFn: (data) =>
      axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/login`, data),
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    console.log(data);
    await mutateAsync(data, {
      onSuccess: (response) => {
        alert('request success');
        if (!response.ok) setErrorMessage(response.message);
      },
      onError: () => {
        alert('request failed');
      },
    });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center mx-auto">
        <span className="uppercase select-none text-center text-7xl text-primary font-semibold drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)] my-32">
          tambang
        </span>
        <form
          className="flex flex-col gap-6 w-full max-w-xs"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="아이디를 입력하세요."
            register={register('id', { required: '아이디를 입력하세요.' })}
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요."
            register={register('password', {
              required: '비밀번호를 입력하세요.',
            })}
          />
          <div className="flex text-center text-xs text-grey">
            <Link to="/find/id" className="flex-1 border-r border-grey2">
              아이디 찾기
            </Link>
            <Link to="/find/password" className="flex-1 border-r border-grey2">
              비밀번호 찾기
            </Link>
            <Link to="/register" className="flex-1">
              회원가입
            </Link>
          </div>
          <span className="h-6 text-center text-red mt-4">
            {errors.id?.message || errors.password?.message || errorMessage}
          </span>
          <Button className="mt-8" disabled={isLoading}>
            {isLoading ? (
              <FontAwesomeIcon
                icon={['fas', 'spinner']}
                size="xl"
                className="animate-spin"
              />
            ) : (
              '로그인'
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
