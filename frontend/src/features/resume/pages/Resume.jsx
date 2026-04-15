import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CustomizeResume from '../components/CustomizeResume'

const Resume = () => {
  return (
    <>
      <Helmet>
        <title>Customize Resume | JobTracker</title>
        <meta
          name="description"
          content="Upload your resume and paste a job description. AI will analyze and optimize it for ATS systems."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>
      <div><CustomizeResume /></div>
    </>
  )
}

export default Resume