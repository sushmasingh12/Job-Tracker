import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Interview from '../components/Interview'
const Interviews = () => {
  return (
    <>
      <Helmet>
        <title>Interview Prep Coach | JobTracker</title>
        <meta
          name="description"
          content="Practice with AI-generated interview questions and get real-time feedback to win your next job offer."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>
      <div><Interview/></div>
    </>
  )
}

export default Interviews