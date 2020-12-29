import { useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text } from "react-native";
import styles from "./NotificationItemDetails.styles";
import { WebView } from 'react-native-webview';
export default function NotificationItemDetailsScreen() {
  const route = useRoute();
  const { item } = route.params;
  return (
    <WebView
    source={{ uri: item.url }}
    style={{ marginTop: 20, flex: 1, }}
    />
    // <ScrollView style={styles.container}>
      /* <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
        {item.title}
      </Text>
      <Text>{item.details}</Text> */
      
    // </ScrollView>
  );
}
