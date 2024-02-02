import React from 'react';
import { Link } from 'react-router-dom';
import GenderCheckBox from './GenderCheckBox';

const SignUpForm: React.FC = () => {
  return (
    <form>
      <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Full Name</span>
        </label>
        <input
          type='text'
          placeholder='Enter full name'
          className='w-full input input-bordered h-10'
        />
      </div>

      <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Username</span>
        </label>
        <input
          type='text'
          placeholder='Enter username'
          className='w-full input input-bordered h-10'
        />
      </div>

      <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Password</span>
        </label>
        <input
          type='password'
          placeholder='Password'
          className='w-full input input-bordered h-10'
        />
      </div>

      <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Confirm Password</span>
        </label>
        <input
          type='password'
          placeholder='Confirm Password'
          className='w-full input input-bordered h-10'
        />
      </div>

      <GenderCheckBox />

      <Link
        to='/login'
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
