import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../components/Cover'

const CoverLetter = () => {
  return (
    <>
      <Helmet>
        <title>AI Cover Letter Generator | JobTracker</title>
        <meta
          name="description"
          content="Generate compelling, personalized cover letters tailored to your target job and company in seconds."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>
      <div><Cover/></div>
    </>
  )
}

export default CoverLetter;