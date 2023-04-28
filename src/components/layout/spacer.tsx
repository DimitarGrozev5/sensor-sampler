import { View } from 'react-native';

type Props = {
  gap: number;
};

const Spacer: React.FC<Props> = ({ gap }) => {
  return <View style={{ height: gap }} />;
};

export default Spacer;
