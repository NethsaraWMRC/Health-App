import CountrySelect from "@/components/CountrySelect";
import GoalCard from "@/components/ItemCard";
import ProfileBar from "@/components/ProfileBar";
import { useCount } from "@/hooks/useCountIncrement";
import useFetchData from "@/hooks/useFetchList";
import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { CountProvider } from "@/hooks/useCountIncrement";

function HomeScreen() {
  const [selectedCountry, setSelectedCountry] = useState<string>("LK");

  const { data, loading, error } = useFetchData(selectedCountry);
  const { count, selectedIndex, setIndex } = useCount();

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setIndex(-1);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <View style={styles.container}>
      <ProfileBar />

      <View style={styles.subContainer}>
        <CountrySelect onSelect={handleCountrySelect} />
        <Text style={styles.topic}>Find your health provider.</Text>

        <FlatList
          data={data.results}
          renderItem={({ item, index }) => (
            <GoalCard
              first_name={
                item.basic.first_name ||
                item.basic.authorized_official_first_name
              }
              last_name={
                item.basic.last_name || item.basic.authorized_official_last_name
              }
              address={item.addresses[1]?.address_1 || "No Address"}
              city={item.addresses[1]?.city || "No City"}
              telephone_number={
                item.addresses[0]?.telephone_number ||
                item.addresses[1]?.telephone_number ||
                "No Phone"
              }
              isSelected={index === selectedIndex}
              index={index}
            />
          )}
          keyExtractor={(item) => item.number}
        />
      </View>

      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{count}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreenWrapper() {
  return (
    <CountProvider>
      <HomeScreen />
    </CountProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 16,
    gap: 15,
    backgroundColor: "#ededeb",
    height: "91%",
  },
  topic: {
    fontSize: 16,
    fontWeight: "500",
  },
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "green",
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
