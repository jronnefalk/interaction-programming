//Shows detailed information about a specific repository
import React from "react";
import { View, Text } from "react-native";

const RepositoryDetail = ({ route }) => {
  const { repository } = route.params;

  return (
    <View>
      <Text>{repository.name}</Text>
      {repository.licenseInfo && (
        <Text>License: {repository.licenseInfo.name}</Text>
      )}
    </View>
  );
};

export default RepositoryDetail;
