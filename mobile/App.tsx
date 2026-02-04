import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  RefreshControl,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Investment } from "./src/types";
import NewInvestmentModal from "./src/NewInvestmentModal";
import { AntDesign } from "@expo/vector-icons";

const BACKEND_URL = "http://192.168.8.120:3000";
const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row with spacing

export default function App() {
  const [data, setData] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/investments`);
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load investments");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={{
            uri: "https://farminginvestment.io/wp-content/uploads/2025/06/farming-investment-logo-white-2.png",
          }} 
          style={styles.logo}
        />
        <Text style={styles.title}>Farm Investment Lite</Text>
      </View>
      
      <TouchableOpacity
        style={styles.newInvestmentButton}
        onPress={() => setShowModal(true)}
      >
        <AntDesign
          name="plus"
          size={20}
          color="#4CAF50"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.newInvestmentButtonText}>New Investment</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAf5TwHAvV-yL8m6QDM4N6s4sGFevA2BZ7gw&s",
              }} // hard-coded image for all cards
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>{item.farmer_name}</Text>
            <Text style={styles.cardText}>{item.crop}</Text>
            <Text style={styles.cardAmount}>Rs. {item.amount}</Text>
          </TouchableOpacity>
        )}
      />
      <NewInvestmentModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAdd={(newItem: Investment) => setData([newItem, ...data])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  newInvestmentButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  borderColor: "#4CAF50",
  borderWidth: 2,
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 16,
  marginBottom: 16,
},
newInvestmentButtonText: {
  color: "#4CAF50",
  fontWeight: "bold",
  fontSize: 16,
},
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    color: "red",
    marginVertical: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardText: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 8,
    marginTop: 8,
  },
  cardAmount: {
    fontSize: 14,
    color: "#4CAF50",
    marginHorizontal: 8,
    marginBottom: 8,
    marginTop: 4,
  },
});