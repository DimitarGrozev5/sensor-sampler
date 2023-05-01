import { StyleSheet, View, Pressable, Text } from 'react-native';
import { appColors } from '../../style/colors';

type Props = {
  children: string;
  onPress: () => void;
  plain?: boolean;
};

const Button: React.FC<Props> = ({ children, onPress, plain }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.pressable, plain ? styles.plainPressable : null]}
        onPress={onPress}
        android_ripple={{
          color: appColors.orange.main,
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

  plainPressable: {
    backgroundColor: '#00000000',
    elevation: 0,
  },
});
