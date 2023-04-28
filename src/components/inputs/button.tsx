import { StyleSheet, View, Pressable, Text } from 'react-native';
import { appColors } from '../../style/colors';

type Props = {
  children: string;
  onPress: () => void;
};

const Button: React.FC<Props> = ({ children, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={onPress}
        android_ripple={{
          color: appColors.peach.main,
        }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    margin: 4,
  },
  pressable: {
    backgroundColor: appColors.peach.main,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 2,
  },
  text: {
    color: appColors.blue.main,
    textAlign: 'center',
  },
});
