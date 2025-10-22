import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

type MenuProps = {
  route?: { params?: { menuItems?: MenuItem[] } };
  navigation?: {
    goBack?: () => void;
    navigate?: (screen: string, params?: Record<string, any>) => void;
    popToTop?: () => void;
  };
};

export default function Menu({ route, navigation }: MenuProps) {
  // safe access in case route or navigation is undefined
  const menuItems = route?.params?.menuItems ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Christoffel’s Current Menu 🍽️</Text>

      {menuItems.length === 0 ? (
        <Text style={styles.empty}>No dishes added yet.</Text>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.dishName}>{item.dishName}</Text>
              <Text style={styles.course}>{item.course}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>R{item.price}</Text>
            </View>
          )}
        />
      )}

      <Pressable
        style={{
          backgroundColor: '#1166d6ff',
          padding: 12,
          borderRadius: 8,
          marginTop: 12,
        }}
        onPress={() => navigation?.goBack?.()}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Back to Add Dishes
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f8f8' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#074734ff', textAlign: 'center', marginBottom: 20 },
  empty: { textAlign: 'center', color: '#999', fontStyle: 'italic' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dishName: { fontSize: 18, fontWeight: 'bold', color: '#074734ff' },
  course: { color: '#1166d6ff', fontWeight: '600' },
  description: { color: '#444', marginTop: 4 },
  price: { marginTop: 6, fontWeight: 'bold', color: '#FF6F61' },
});
