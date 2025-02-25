// screens/LandingScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fiesta de XV Años</Text>
      <Button
        title="Confirmar Asistencia"
        onPress={() => navigation.navigate('GuestSearch')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
