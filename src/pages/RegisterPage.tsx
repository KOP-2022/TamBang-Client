import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';

import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import Layout from '@/components/Layout';

interface RegisterRequest {
  id: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
  email: string;
}
interface RegisterResponse {
  ok: boolean;
  message?: string;
}
interface RegisterForm extends RegisterRequest {
  passwordConfirm: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterForm>();

  const { mutateAsync, isLoading } = useMutation<
    RegisterResponse,
    AxiosError,
    RegisterRequest
  >({
    mutationFn: (data) =>
      axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/member`, data),
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm: _, ...request } = data;
    await mutateAsync(request, {
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
          className="flex flex-col gap-3 w-full max-w-xs"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="아이디"
            type="text"
            placeholder="예: tambang12"
            register={register('id', { required: '아이디는 필수입니다.' })}
          />
          <FormInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            register={register('password', {
              required: '비밀번호는 필수입니다.',
            })}
          />
          <FormInput
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요."
            register={register('passwordConfirm', {
              required: '비밀번호를 다시 입력하세요.',
              validate: {
                matchPassword: (password) =>
                  getValues().password === password ||
                  '비밀번호가 일치하지 않습니다.',
              },
            })}
          />
          <FormInput
            label="이름"
            type="text"
            placeholder="이름을 입력해주세요."
            register={register('name', {
              required: '이름은 필수입니다.',
            })}
          />
          <FormInput
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요."
            register={register('nickname', {
              required: '닉네임은 필수입니다.',
            })}
          />
          <FormInput
            label="이메일"
            type="email"
            placeholder="예: tambang@tambang.com"
            register={register('email', {
              required: '이메일은 필수입니다.',
              validate: {
                validateEmail: (email) =>
                  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
                    email
                  ) || '이메일 형식이 아닙니다.',
              },
            })}
          />
          <FormInput
            label="휴대전화"
            type="tel"
            placeholder="예: 010-0000-0000"
            register={register('phone', {
              required: '전화 번호는 필수입니다.',
              maxLength: 13,
              validate: {
                validatePhone: (phone) =>
                  /^010-[0-9]{3,4}-[0-9]{4}$/g.test(phone) ||
                  '전화번호 형식이 맞지 않습니다.',
              },
            })}
            maxLength={13}
          />
          <span className="h-6 text-center text-red mt-4">
            {errors.id?.message ||
              errors.password?.message ||
              errors.passwordConfirm?.message ||
              errors.name?.message ||
              errors.nickname?.message ||
              errors.email?.message ||
              errors.phone?.message ||
              errorMessage}
          </span>
          <Button className="mt-8" disabled={isLoading}>
            {isLoading ? (
              <FontAwesomeIcon
                icon={['fas', 'spinner']}
                size="xl"
                className="animate-spin"
              />
            ) : (
              '가입하기'
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
