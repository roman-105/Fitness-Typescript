import React from 'react';
import formatMessage from 'format-message';
import { SelfCenter } from '../../../components/Layout/Layout';
import Typography from '../../../components/Typography';

const Favourites = () => {
  return (
    <SelfCenter>
      <Typography
        fontSize={12}
        lineHeight={14}
        style={{ marginTop: 32 }}
        fontFamily="trebleRegular"
      >
        {formatMessage('Favourites screen')}
      </Typography>
    </SelfCenter>
  );
};

export default Favourites;
