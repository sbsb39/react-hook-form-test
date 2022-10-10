import React, { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { date, string, number, object } from 'yup';
import styled from 'styled-components';

const FocusDiv = styled.div`
  :focus {
    color: red;
    border: thin solid black;
  }
  :focus-within {
    color: red;
    border: thin solid black;
  }
`;

const Component = () => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    formState: { isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      age: 'test',
      datedate: null,
      date: null,
      select: null
    },
    // criteriaMode: 'all',
    resolver: yupResolver(
      object().shape({
        age: number().positive('age must be greater than zero').required('age is required'),
        datedate: date().required(),
        date: date().required(),
        select: object().required()
      })
    )
  });
  const onSubmit = data => console.log(data);

  console.log('errors', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>testtsettesttestsetset</div>
      <input name="age" ref={register} />
      <p>{errors.age?.message}</p>
      <Controller
        name="datedate"
        control={control}
        render={({ onChange, value, ref }) => (
          <FocusDiv ref={ref} tabIndex={0}>
            <DatePicker tabIndex={-1} selected={value} onChange={onChange} />
          </FocusDiv>
        )}
      />
      <p>{errors.datedate?.message}</p>
      <Controller
        name="date"
        control={control}
        render={({ onChange, value, ref }) => (
          <div>
            <input style={{ color: 'red' }} ref={ref} />
            <DatePicker selected={value} onChange={onChange} />
          </div>
        )}
      />
      <p>{errors.date?.message}</p>
      <Controller
        name="select"
        control={control}
        options={[
          { value: 'chocolate', label: 'Chocolate' },
          { value: 'strawberry', label: 'Strawberry' },
          { value: 'vanilla', label: 'Vanilla' }
        ]}
        as={Select}
      />
      <p>{errors.select?.message}</p>
      <button type="submit" disabled={!isDirty || !isValid}>
        submit
      </button>
    </form>
  );
};

export default memo(Component);
