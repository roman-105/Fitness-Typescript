import formatMessage from 'format-message';
import React from 'react';
import { Spacer } from '../../../../components/Layout/Layout';
import Typography from '../../../../components/Typography';

interface LessonSingularAboutProps {
  description: string;
}

const LessonSingularAbout = ({ description }: LessonSingularAboutProps) => {
  return (
    <>
      <Typography fontFamily="trebleHeavy" uppercase>
        {formatMessage('About the class')}
      </Typography>
      <Spacer height={8} />
      <Typography type="regularbfa">{formatMessage(description)}</Typography>
    </>
  );
};

export default LessonSingularAbout;
