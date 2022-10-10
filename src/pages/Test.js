import React, {memo, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Test = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, errors } = useForm();
  const buttonRef = useRef();

  const onSubmit = data => console.log('onSubmit', buttonRef.current, data);

  console.log(watch('example')); // watch input value by passing the name of it

  const handleSubmitTest=(e)=>{
    buttonRef.current = e.target.name;
    handleSubmit(onSubmit);
  }
  /*const handleSubmit1=(e)=>{
    console.log('data11', e.target.name);
    buttonRef.current = e.target.name;
    handleSubmit(onSubmit);
    // handleSubmit(data => console.log('data1', data));
  }
  const handleSubmit2=(e)=>{
    console.log('data22', e.target.name);
    buttonRef.current = e.target.name;
    handleSubmit(onSubmit);
    // handleSubmit(data => console.log('data2', data));
  }*/

  return (
    <div>
      Test
      <form onSubmit={handleSubmit(onSubmit)}>
      {/*<form onSubmit={(e) => {
        console.log('form', e);
        buttonRef.current = e.target.name;
        handleSubmit(onSubmit)(e).catch(() => {});
      }}>*/}
        {/* register your input into the hook by invoking the "register" function */}
        <input name="example" defaultValue="test" ref={register} />

        {/* include validation with required or other standard HTML validation rules */}
        <input name="exampleRequired" ref={register({ required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" name="button" />

        <button
          onClick={handleSubmitTest}
          name="button1"
        >
          testtest1
        </button>
        <button
          onClick={handleSubmitTest}
          name="button2"
        >
          testtest2
        </button>
      </form>
      <button onClick={() => navigate('/sample')}>sample</button>
    </div>
  );
};

export default memo(Test);
