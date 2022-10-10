import React, { memo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { date, string, number, object, array } from 'yup';
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

const Nested = () => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    formState: { isDirty, isValid }
  } = useForm({
    // mode: 'onChange',
    defaultValues: {
      age: 'test',
      datedate: null,
      date: null,
      select: null,
      nestedArray: [{ name: 'aaaaaa' }]
    },
    // criteriaMode: 'all',
    resolver: yupResolver(
      object().shape({
        age: number().positive('age must be greater than zero').required('age is required'),
        datedate: date().required(),
        date: date().required(),
        select: object().required(),
        nestedArray: array().of(
          object().shape({
            name: string().required('Name is required').min(7, 'min7')
          })
        )
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
      <div>
        <h5>nested</h5>
        <FieldArray {...{ name: 'nestedArray', control, register, errors }} />
      </div>
      <button type="submit">submit</button>
      {/*<button type="submit" disabled={!isDirty || !isValid}>*/}
      {/*  submit*/}
      {/*</button>*/}
    </form>
  );
};

const FieldArray = ({ name, control, register, errors }) => {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name
  });

  console.log('fields', fields, errors[name]);

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input name={`${name}[${index}].name`} ref={register()} defaultValue={item.name} />
              {errors[name] && errors[name][index]?.name && <p>{errors[name][index]?.name?.message}</p>}
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({ name: 'append' });
          }}>
          append
        </button>
      </section>
    </>
  );
};

export default memo(Nested);
