import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  return (
    <form>
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
        <label className='label'>
          <span className='text-base label-text'>Password</span>
        </label>
        <input
          type='password'
          placeholder='Enter Password'
          className='w-full input input-bordered h-10'
        />
      </div>

      <Link
        to='/signup'
        className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
      >
        {"Don't"} have an account?
      </Link>

      <div>
        <button className='btn btn-block btn-sm mt-2'>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
