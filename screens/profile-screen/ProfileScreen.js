import React from "react";
import { SafeAreaView, View } from "react-native";
import {
  Avatar,
  Caption,
  Text,
  Title,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import styles from "./ProfileScreen.styles";

const ProfileScreen = () => {
  const { account } = useSelector((state) => state.login);
  const { deals } = useSelector((state) => state.deals);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri:
                account?.img_url ||
                "https://api.adorable.io/avatars/80/abott@adorable.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {" "}
              {account?.name}{" "}
            </Title>
            <Caption style={styles.caption}>
              {" "}
              {`@${account?.username}`}{" "}
            </Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {" "}
            {account?.address || "City"}{" "}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {" "}
            {account?.phone || "Phone"}{" "}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {" "}
            {account?.gmail || "Email"}{" "}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title> {account?.wallet || 0} </Title>
          <Caption>Ví</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title> {deals?.length || 0} </Title>
          <Caption>Đơn hàng</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Yêu Thích</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Thanh toán</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={myCustomShare}> */}
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Chia sẻ với bạn bè</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Hỗ trợ</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Cài đặt</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
