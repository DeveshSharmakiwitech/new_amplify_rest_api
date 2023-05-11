// import logo from './logo.svg';
import './App.css';
import { Amplify, API } from 'aws-amplify';

import React, { useEffect, useState } from 'react';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
  const [awsappName, setawsappName] = useState('')
  const [awsappEmail, setawsappEmail] = useState('')
  const [awsappAddress, setawsappAddress] = useState('')

  useEffect(()=>{
    API.get('awsappapi', '/awsapp/email').then((awsappRes) => console.log('awsappRes >> ', awsappRes)).catch((err)=> console.log('err :>> ', err)); 
  },[])

  const handelSubmit = e =>{
    e.preventDefault()
    API.put('awsappapi', '/awsapp', {
      body: {
        name: awsappName,
        email: awsappEmail,
        address: awsappAddress
      }
    }).then( resData => console.log('resData :>> ', resData))
    .catch(err=>console.log('errRes :>> ', err));
  }

  const handelSubmit1 = e => {
    e.preventDefault()
    API.del('awsappapi', '/awsapp?name='+awsappName, {
      // body: {
      //   email: awsappEmail,
      // }
    }).then( resData => console.log('Delete resData :>> ', resData))
    .catch(err=>console.log('errRes:>> ', err));
  }
  return (
    <div className='App'>
      <header className='App-header'>
          <Authenticator>
      {({ signOut, user }) => {
        return (
        <main>
          <form onSubmit={(event) =>handelSubmit(event)}>
            <input value={awsappName} placeholder='name' onChange={(e)=>setawsappName(e.target.value)}/>
            <input value={awsappEmail} placeholder='email' onChange={(e)=>setawsappEmail(e.target.value)}/>
            <input value={awsappAddress} placeholder='address' onChange={(e)=>setawsappAddress(e.target.value)}/>
            <Button style={{backgroundColor: '#fff'}} type='submit'>Add</Button>
          </form>
          <form onSubmit={(event) =>handelSubmit1(event)}>
          <input value={awsappName} placeholder='name' onChange={(e)=>setawsappName(e.target.value)}/>
            <Button style={{backgroundColor: '#fff'}} type='submit'>Delete</Button>
          </form>
          <h1>Hello {user.attributes.email}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}}
    </Authenticator>
      </header>
    </div>

  )
}

export default App;
