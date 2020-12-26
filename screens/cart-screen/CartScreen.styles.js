import { Dimensions, StyleSheet } from "react-native";
export default StyleSheet.create({
  centeredView: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalView: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  modalText: {
    marginBottom: 15,
    color: "black",
  },
});
