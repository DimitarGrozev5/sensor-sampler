import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Button from './button';
import { useState } from 'react';
import { appColors } from '../../style/colors';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const NumberInput: React.FC<Props> = ({ value, onChange }) => {
  const handleButtonChange = (direction: -1 | 1) => () => {
    setInternalValue((value + direction * 100).toString());
    onChange(value + direction * 100);
  };

  const [internalValue, setInternalValue] = useState(value.toString());

  const handleChange = (value: string) => {
    setInternalValue(value);
    onChange(Number(value));
  };

  return (
    <View style={styles.container}>
      {(Number.isNaN(value) || value < 1) && (
        <Text style={styles.invalidInput}>Invalid value</Text>
      )}
      <View style={styles.inputContainer}>
        <Button plain onPress={handleButtonChange(-1)}>
          -100ms
        </Button>
        <TextInput
          style={styles.input}
          value={internalValue}
          onChangeText={handleChange}
        />
        <Button plain onPress={handleButtonChange(1)}>
          +100ms
        </Button>
      </View>
    </View>
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: appColors.beige.light,
    borderWidth: 1,
    borderColor: appColors.orange.main,
  },
  input: {
    textAlign: 'center',
    flex: 1,
    backgroundColor: appColors.beige.light,
    padding: 5,
  },
  invalidInput: {
    color: 'red',
  },
});
