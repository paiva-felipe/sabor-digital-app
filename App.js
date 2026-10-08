import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

// Endereço padrão para o Emulador Android acessar o computador do SENAI
const API_URL = 'http://10.0.2.2:3000'; 

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  const carregarProdutos = async () => {
    try {
      const resposta = await fetch(`${API_URL}/produtos`);
      const dados = await resposta.json();
      setProdutos(dados.dados || dados);
    } catch (erro) {
      console.log('Aguardando conexão com a API...');
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>🍝 Sabor Digital Mobile</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço (ex: 25.50)"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
        />
        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => Alert.alert('Aviso', 'Formulário pronto para conexão!')}
        >
          <Text style={styles.textoBotao}>Adicionar Produto</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item, index) => String(item.id || index)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nomeItem}>{item.nome}</Text>
            <Text style={styles.precoItem}>R$ {item.preco}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum produto carregado no momento.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', paddingTop: 50 },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  form: { marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 6, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  botao: { backgroundColor: '#28a745', padding: 14, borderRadius: 6, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  nomeItem: { fontSize: 16, fontWeight: 'bold' },
  precoItem: { color: '#28a745', fontWeight: 'bold' },
  vazio: { textAlign: 'center', color: '#888', marginTop: 20 }
});