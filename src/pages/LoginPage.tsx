import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@tanstack/react-query';

import ky from 'ky';

import type { Response } from 'response';

import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import Layout from '@/components/Layout';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { mutate, isLoading } = useMutation<Response, Error, LoginForm>({
    mutationFn: (data) => ky.post(`/api/login`, { json: data }).json(),
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        if (response.success) navigate('/', { replace: true });
        else setErrorMessage(response.message);
      },
    });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center mx-auto pb-4">
        <span className="uppercase select-none text-center text-7xl text-primary font-semibold drop-shadow-[0_6px_5px_rgba(0,0,0,0.25)] my-32">
          tambang
        </span>
        <form
          className="flex flex-col gap-3 w-full max-w-xs"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="이름"
            type="text"
            placeholder="아이디를 입력하세요."
            register={register('email', { required: '아이디를 입력하세요.' })}
          />
          <FormInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요."
            register={register('password', {
              required: '비밀번호를 입력하세요.',
            })}
          />
          <div className="flex text-center text-xs text-grey mt-4">
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
            {errors.email?.message || errors.password?.message || errorMessage}
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
