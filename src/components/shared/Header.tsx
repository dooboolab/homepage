import React, {FC} from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 24px;

  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
`;

type Props = {
  title?: string;
};

const Header: FC<Props> = ({title}) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
