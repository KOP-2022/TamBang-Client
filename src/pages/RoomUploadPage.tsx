import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@tanstack/react-query';

import ky from 'ky';
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { Response } from 'response';

import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import 'swiper/css';
import 'swiper/css/virtual';
import Layout from '@/components/Layout';
import { cls } from '@/libs/utils';

interface RoomUploadForm {
  sigungu: string;
  roadname: string;
  buildtype: '빌라' | '아파트' | '오피스텔';
  floor: string;
  area: number;
  dealtype: '매매' | '전세' | '월세';
  price: number;
  deposit: number;
  monthlypay: number;
  description: string;
  image: FileList;
  // 위도 경도 추가
}

interface RoomUploadResponse {
  real_estate_id: number;
}

const BUILD_TYPE: readonly RoomUploadForm['buildtype'][] = [
  '빌라',
  '아파트',
  '오피스텔',
] as const;
const DEAL_TYPE: readonly RoomUploadForm['dealtype'][] = [
  '매매',
  '전세',
  '월세',
] as const;

const RoomUploadPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<RoomUploadForm>({
    defaultValues: { deposit: 0, monthlypay: 0, price: 0, area: 0 },
  });
  const { mutate, isLoading, data } = useMutation<
    Response<RoomUploadResponse>,
    Error,
    FormData
  >({
    mutationFn: (data) => ky.post(`/api/real-estate`, { body: data }).json(),
  });
  const dataTransferRef = useRef(new DataTransfer());
  const navigate = useNavigate();

  const images = watch('image') ?? [];
  const dealType = watch('dealtype');

  const onSubmit = ({ image, ...data }: RoomUploadForm) => {
    const formData = new FormData();
    for (const file of image) {
      formData.append('image', file);
    }
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'number') {
        formData.append(key, value + '');
      } else formData.append(key, value);
    });
    mutate(formData);
  };
  const onImagesChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter(
      (_, index) => index < 15 - images.length
    );
    if (!files.length) return;
    files.forEach((imageFile) => dataTransferRef.current.items.add(imageFile));
    setValue('image', dataTransferRef.current.files);
  };
  const onPictureDelete =
    (index: number): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.preventDefault();
      dataTransferRef.current.items.remove(index);
      setValue('image', dataTransferRef.current.files);
    };

  useEffect(() => {
    if (data && data.success) {
      navigate('/');
    }
  }, [data, navigate]);

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  return (
    <Layout title="매물 등록">
      <div className="flex flex-col items-center pb-4">
        <form
          className="flex flex-col gap-3 w-full max-w-xs"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="시군구"
            type="text"
            placeholder="시군구를 입력해 주세요."
            register={register('sigungu', {
              required: '시군구를 입력해 주세요.',
            })}
          />
          <FormInput
            label="도로명"
            type="text"
            placeholder="도로명을 입력해 주세요."
            register={register('roadname', {
              required: '도로명을 입력해 주세요.',
            })}
          />
          <div>
            <label>건물 유형</label>
            <div className="flex">
              {BUILD_TYPE.map((value, index) => (
                <label
                  key={index}
                  className="label cursor-pointer gap-2 flex-1 justify-start"
                >
                  <input
                    type="radio"
                    className="radio checked:bg-primary"
                    {...register('buildtype', { required: true })}
                    value={value}
                  />
                  <span className="label-text">{value}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label>층수</label>
            <select
              className="h-10 px-4 form-input"
              {...register('floor', { required: '건물 층수를 선택해 주세요.' })}
            >
              <option className="text-grey" value="">
                선택해 주세요.
              </option>
              <option value="반지하">반지하</option>
              <option value="옥탑방">옥탑방</option>
              {Array(80)
                .fill(undefined)
                .map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </select>
          </div>
          <FormInput
            label="면적"
            type="number"
            min={0}
            placeholder="면적을 입력해 주세요."
            register={register('area', {
              required: '면적을 입력해 주세요.',
            })}
          />
          <div>
            <label>거래 유형</label>
            <div className="flex">
              {DEAL_TYPE.map((value, index) => (
                <label
                  key={index}
                  className="label cursor-pointer gap-2 flex-1 justify-start"
                >
                  <input
                    type="radio"
                    className="radio checked:bg-primary"
                    {...register('dealtype', {
                      required: true,
                      onChange: () => {
                        resetField('price');
                        resetField('monthlypay');
                      },
                    })}
                    value={value}
                  />
                  <span className="label-text">{value}</span>
                </label>
              ))}
            </div>
          </div>
          {dealType === '월세' ? (
            <FormInput
              label="월세"
              type="number"
              min={0}
              placeholder="월세를 입력해 주세요."
              register={register('monthlypay', {
                required: '월세를 입력해 주세요.',
              })}
            />
          ) : (
            <FormInput
              label="매매/전세 가격"
              type="number"
              min={0}
              placeholder="매매/전세 가격을 입력해 주세요."
              register={register('price', {
                required: '매매/전세 가격을 입력해 주세요.',
              })}
            />
          )}
          <FormInput
            label="계약금(보증금)"
            type="number"
            min={0}
            placeholder="계약금(보증금)을 입력해 주세요."
            register={register('deposit', { required: true })}
          />
          <div>
            <label>설명</label>
            <textarea
              className="px-4 py-2 form-input"
              rows={5}
              placeholder={`해당 방의 대한 특징과 소개를 입력해 주세요.\n\n방의 위치와 교통, 주변 편의시설, 방의 특징과 장점, 보안시설, 옵션, 주차, 전체적인 방의 느낌 등을 작성해 주세요.`}
              {...register('description', { required: true })}
            />
          </div>
          <div className="flex flex-col w-full">
            <FormInput
              label="사진"
              type="file"
              id="images"
              accept="image/*"
              multiple
              register={register('image', {
                onChange: onImagesChange,
              })}
              hidden
            />
            <label
              htmlFor="images"
              className={cls(
                images.length < 15
                  ? ''
                  : 'pointer-events-none cursor-not-allowed',
                'select-none border border-grey2 text-black hover:border-primary transition-all rounded-lg shadow-md h-10 aspect-square cursor-pointer flex gap-2 items-center justify-center'
              )}
            >
              <FontAwesomeIcon icon={['fas', 'images']} size="xl" />
              {images.length}/15
            </label>
            <Swiper
              modules={[Virtual]}
              slidesPerView={2}
              virtual
              className="w-full"
            >
              {Array.from(images).map((image, index) => (
                <SwiperSlide
                  key={index}
                  virtualIndex={index}
                  className="pt-4 flex"
                >
                  <div className="relative flex">
                    <img
                      className="border-grey h-32 w-32 rounded-lg border object-cover select-none"
                      src={URL.createObjectURL(image)}
                      alt="image"
                    />
                    <button
                      className="bg-white text-black absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full"
                      onClick={onPictureDelete(index)}
                    >
                      <FontAwesomeIcon
                        icon={['fas', 'circle-xmark']}
                        size="xl"
                      />
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Button className="mt-8" disabled={isLoading}>
            {isLoading ? (
              <FontAwesomeIcon
                icon={['fas', 'spinner']}
                size="xl"
                className="animate-spin"
              />
            ) : (
              '방 내놓기'
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default RoomUploadPage;
