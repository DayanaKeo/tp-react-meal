import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { useRouter } from "expo-router";
import { foodByUpc } from "../../../lib/edamam";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  const handleBarCodeScanned = async (res: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);
    const food = await foodByUpc(res.data);
    if (food) {
      router.replace({ pathname: "/(main)/add", params: { food: JSON.stringify(food) } });
    } else {
      alert("Produit non trouvé");
      router.back();
    }
  };

  if (!permission?.granted)
    return (
      <View style={styles.center}>
        <Text>Permission caméra refusée ou en attente…</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["upc_a", "upc_e", "ean13"] }}
      />
      {scanned && (
        <TouchableOpacity style={styles.btn} onPress={() => setScanned(false)}>
          <Text style={styles.btnText}>Scanner de nouveau</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  btn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
  },
  btnText: { color: "white" },
});
