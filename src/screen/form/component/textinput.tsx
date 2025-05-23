import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import type {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string;
};

const Input: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
}) => {
  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        mode="outlined"
        style={styles.input}
        error={!!error}
        theme={{
          roundness: 10,
          colors: {
            primary: '#9b4dca',
            background: '#fff',
            placeholder: '#999',
          },
        }}
      />
      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 12,
    marginTop: 5
  }
});

export default Input;