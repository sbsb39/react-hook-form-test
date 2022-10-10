import React, { memo, useReducer } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { merge } from 'lodash';
import { number, object, string } from 'yup';

const Sample = () => {
  const steps = [StepOne, StepTwo];
  const [state, dispatch] = useStepper({ steps });

  const getDefaultValues = steps => {
    let defaultValues = {};
    steps.forEach(step => {
      defaultValues = merge(defaultValues, step.defaultValues);
    });

    return { ...defaultValues };
  };

  const methods = useForm({
    defaultValues: getDefaultValues(steps),
    resolver: yupResolver(steps[state.activeStep].validationSchema)
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      {/*<Stepper activeStep={state.activeStep}>
          {steps.map((step) => (
              <Step key={`multistep_header_${step.key}`}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
          ))}
        </Stepper>*/}
      <div>
        <button
          onClick={() => {
            console.log('fsdfsdfsdfaaaaaaaa');
            handleSubmit(values => console.log('fsdfsdfsdf', values))();
          }}>
          test
        </button>
      </div>
      <div>
        {steps.map(
          (Step, index) => state.activeStep === index && <Step key={`multistep_${Step.key}`} values={state.data[Step.key] || Step.defaultValues} />
        )}
      </div>
      <StepperActions state={state} dispatch={dispatch} steps={steps} handleSubmit={handleSubmit} />
      <div>
        <div>
          <div>
            <div>
              <pre>
                {JSON.stringify(
                  {
                    state
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

const useStepper = () => {
  return useReducer(
    (state, { type, payload }) => {
      switch (type) {
        case 'next':
          return {
            ...state,
            activeStep: state.activeStep + 1
          };
        case 'prev':
          return {
            ...state,
            activeStep: state.activeStep - 1
          };
        case 'setData':
          return {
            ...state,
            data: {
              ...state.data,
              ...payload
            }
          };
        default:
          throw new Error(`${type} action not supported`);
      }
    },
    {
      activeStep: 0,
      data: {}
    }
  );
};

const StepperActions = ({ state, dispatch, handleSubmit, steps }) => {
  return (
    <div className="d-flex">
      <button disabled={state.activeStep === 0} onClick={() => dispatch({ type: 'prev' })}>
        Prev
      </button>
      <button
        disabled={state.activeStep === steps.length - 1}
        onClick={() => {
          handleSubmit(values => {
            console.log('values', values);
            dispatch({
              type: 'setData',
              payload: values
            });
            dispatch({ type: 'next' });
          })();
        }}>
        Next
      </button>
      {state.activeStep === steps.length - 1 && (
        <button
          onClick={() => {
            handleSubmit(values => {
              console.log('values', values);
              dispatch({
                type: 'setData',
                payload: values
              });
            })();
          }}>
          Save
        </button>
      )}
    </div>
  );
};

const StepOne = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div>
      <div>
        <input name="firstName" placeholder="First Name" ref={register} />
        <p>{errors.firstName?.message}</p>
      </div>
      <div>
        <input name="lastName" placeholder="Last Name" ref={register} />
        <p>{errors.lastName?.message}</p>
      </div>
    </div>
  );
};
StepOne.key = 'stepOne';
StepOne.label = 'Step One';
StepOne.validationSchema = object().shape({
  firstName: string().required().label('First Name'),
  lastName: string().required().label('Last Name')
});
StepOne.defaultValues = {
  firstName: 'Test',
  lastName: ''
};

const StepTwo = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div>
      <div>
        <input name="age" placeholder="Age" type="number" ref={register} />
        <p>{errors.age?.message}</p>
      </div>
      <div>
        <input name="address" placeholder="Address" ref={register} />
        <p>{errors.address?.message}</p>
      </div>
    </div>
  );
};
StepTwo.key = 'stepOne';
StepTwo.label = 'Step One';
StepTwo.validationSchema = object().shape({
  age: number().required().min(18).label('Age'),
  address: string().nullable().label('Address')
});
StepTwo.defaultValues = {
  age: 0,
  address: ''
};

export default memo(Sample);
