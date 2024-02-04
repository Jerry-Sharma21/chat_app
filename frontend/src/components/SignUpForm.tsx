import React, { FormEvent, useState } from 'react';

import { Link } from 'react-router-dom';

import GenderCheckBox from './GenderCheckBox';
import useSignup from '../hooks/useSignup';

export interface Inputs {
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const SignUpForm: React.FC = () => {
  const [inputs, setInputs] = useState<Inputs>({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const { signup, loading } = useSignup();

  const handleCheckboxChange = (gender: string) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Full Name</span>
        </label>
        <input
          type='text'
          value={inputs.fullName}
          placeholder='Enter full name'
          className='w-full input input-bordered h-10'
          onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
        />
      </div>

      <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Username</span>
        </label>
        <input
          type='text'
          value={inputs.userName}
          placeholder='Enter username'
          className='w-full input input-bordered h-10'
          onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
        />
      </div>

      <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Password</span>
        </label>
        <input
          type='password'
          value={inputs.password}
          placeholder='Password'
          className='w-full input input-bordered h-10'
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
      </div>

      <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Confirm Password</span>
        </label>
        <input
          type='password'
          value={inputs.confirmPassword}
          placeholder='Confirm Password'
          className='w-full input input-bordered h-10'
          onChange={(e) =>
            setInputs({ ...inputs, confirmPassword: e.target.value })
          }
        />
      </div>

      <GenderCheckBox
        onCheckboxChange={handleCheckboxChange}
        selectedGender={inputs.gender}
      />

      <Link
        to={'/login'}
        className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
      >
        Already have an account?
      </Link>

      <div>
        <button className='btn btn-block btn-sm mt-2 border border-slate-700'>
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
